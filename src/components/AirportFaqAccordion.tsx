'use client';

import { useState } from 'react';
import styles from './FAQSection.module.css';
import { ChevronDownIcon } from './Icons';

/**
 * Same accordion visuals/behavior as the homepage's FAQSection.tsx (reuses
 * its CSS module directly rather than duplicating the styles), but takes an
 * arbitrary {q, a}[] list as props instead of importing homeFaqs — used by
 * AirportPage.tsx §8 and any other page with its own FAQ set.
 */
export default function AirportFaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.q} className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}>
            <button
              className={styles.accordionTrigger}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className={styles.accordionQuestion}>{faq.q}</span>
              <ChevronDownIcon
                size={20}
                className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ''}`}
              />
            </button>
            <div className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ''}`}>
              <p className={styles.accordionAnswer}>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
