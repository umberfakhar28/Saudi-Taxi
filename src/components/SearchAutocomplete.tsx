'use client';

import { useId, useRef, useState } from 'react';
import { MapPinIcon, PlaneIcon } from './Icons';
import { searchEntries, type SearchEntry } from '@/lib/searchIndex';
import styles from './SearchAutocomplete.module.css';

interface SearchAutocompleteProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    invalid?: boolean;
}

/**
 * From/To combobox for the homepage search bar (Homepage Hero + Multi-Mode
 * Search addendum, §2.2). Searches src/lib/searchIndex.ts (cities + airports
 * — see that file's header comment on why hotels/landmarks aren't included
 * yet), grouped by type, with full keyboard support and ARIA listbox
 * semantics rather than a plain unstyled <input>.
 */
export default function SearchAutocomplete({ label, placeholder, value, onChange, required, invalid }: SearchAutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const baseId = useId();
    const listboxId = `${baseId}-listbox`;
    const inputId = `${baseId}-input`;

    const results = searchEntries(value);
    const cities = results.filter((r) => r.type === 'city');
    const airports = results.filter((r) => r.type === 'airport');
    const flat = [...cities, ...airports];

    const commit = (entry: SearchEntry) => {
        onChange(entry.value);
        setOpen(false);
        setActiveId(null);
    };

    const moveActive = (dir: 1 | -1) => {
        if (flat.length === 0) return;
        const curIdx = flat.findIndex((e) => e.id === activeId);
        const nextIdx = curIdx === -1 ? (dir === 1 ? 0 : flat.length - 1) : (curIdx + dir + flat.length) % flat.length;
        setActiveId(flat[nextIdx].id);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            moveActive(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            moveActive(-1);
        } else if (e.key === 'Enter') {
            if (open && activeId) {
                e.preventDefault();
                const entry = flat.find((f) => f.id === activeId);
                if (entry) commit(entry);
            }
        } else if (e.key === 'Escape') {
            if (value) {
                onChange('');
            } else {
                setOpen(false);
            }
            setActiveId(null);
        }
    };

    const renderGroup = (title: string, icon: React.ReactNode, entries: SearchEntry[]) =>
        entries.length > 0 && (
            <div key={title} role="group" aria-label={title} className={styles.group}>
                <div className={styles.groupLabel}>{title}</div>
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        id={entry.id}
                        role="option"
                        aria-selected={activeId === entry.id}
                        className={`${styles.option} ${activeId === entry.id ? styles.optionActive : ''}`}
                        onMouseEnter={() => setActiveId(entry.id)}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            commit(entry);
                        }}
                    >
                        {icon}
                        <span>
                            <span className={styles.optionLabel}>{entry.label}</span>
                            <span className={styles.optionSublabel}>{entry.sublabel}</span>
                        </span>
                    </div>
                ))}
            </div>
        );

    return (
        <div className={styles.wrap}>
            <label htmlFor={inputId} className={styles.label}>{label}</label>
            <input
                ref={inputRef}
                id={inputId}
                type="text"
                role="combobox"
                aria-expanded={open}
                aria-controls={listboxId}
                aria-activedescendant={activeId ?? undefined}
                aria-autocomplete="list"
                aria-invalid={invalid || undefined}
                autoComplete="off"
                className={styles.input}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={(e) => {
                    onChange(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 120)}
                onKeyDown={onKeyDown}
            />
            {open && (
                <div id={listboxId} role="listbox" aria-label={label} className={styles.listbox}>
                    {flat.length === 0 ? (
                        <div className={styles.empty}>No matches — try a city name or airport code</div>
                    ) : (
                        <>
                            {renderGroup('Cities', <MapPinIcon size={14} className={styles.optionIcon} />, cities)}
                            {renderGroup('Airports', <PlaneIcon size={14} className={styles.optionIcon} />, airports)}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
