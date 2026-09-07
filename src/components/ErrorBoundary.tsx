'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    /** Rendered in place of the children when they throw. */
    fallback: ReactNode;
    /** Shown in the console alongside the error, to locate the failure. */
    label: string;
}

interface State {
    hasError: boolean;
}

/**
 * Stops one broken widget from taking down the whole Admin Portal.
 *
 * A render error anywhere inside a client component unmounts the entire
 * React tree and leaves Next.js showing "Application error: a client-side
 * exception has occurred" — which is what clicking the notification bell
 * used to do. The underlying bugs are fixed at their source; this is the
 * containment so that a future one degrades to a single dead panel instead
 * of an unusable portal.
 *
 * It deliberately does NOT swallow the error silently: the real error and
 * component stack are logged to the console for diagnosis.
 */
export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error(`[ADMIN_UI_ERROR] ${this.props.label}`, error, info.componentStack);
    }

    render() {
        return this.state.hasError ? this.props.fallback : this.props.children;
    }
}
