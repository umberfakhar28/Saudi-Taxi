import React from 'react';

type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

export const ShieldIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M11.236 1.132a2.3 2.3 0 0 1 1.528 0l6.398 2.378A2.3 2.3 0 0 1 20.6 5.666v4.618c0 5.48-3.327 10.39-8.23 12.358a2.3 2.3 0 0 1-1.74 0C5.728 20.672 2.4 15.764 2.4 10.284V5.666a2.3 2.3 0 0 1 1.438-2.156zM8.293 11.293a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0-1.414-1.414L10.086 13.086l-1.793-1.793z"/>
    </svg>
);

export const MessageIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2C6.477 2 2 6.03 2 11c0 2.87 1.558 5.42 4 7.08V22l3.89-2.22c.69.15 1.4.22 2.11.22 5.523 0 10-4.03 10-9S17.523 2 12 2z"/>
    </svg>
);

export const ClockIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 10.414V6a1 1 0 0 0-2 0v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414z"/>
    </svg>
);

export const TagIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M19.707 9.293l-8-8A1 1 0 0 0 11 1H4a1 1 0 0 0-1 1v7a1 1 0 0 0 .293.707l8 8a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0 0-1.414zM6.5 8A1.5 1.5 0 1 1 8 6.5 1.502 1.502 0 0 1 6.5 8z"/>
    </svg>
);

export const UserIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 12c-4.418 0-8 3.582-8 8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1c0-4.418-3.582-8-8-8z"/>
    </svg>
);

export const CarIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M19.8 8.6l-2-4.5A2 2 0 0 0 16 3H8a2 2 0 0 0-1.8 1.1l-2 4.5A2 2 0 0 0 4 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-.2-.4zM7.5 16A1.5 1.5 0 1 1 9 14.5 1.5 1.5 0 0 1 7.5 16zm9 0A1.5 1.5 0 1 1 18 14.5 1.5 1.5 0 0 1 16.5 16zM7 8l1-2.5h8L17 8z"/>
    </svg>
);

export const PlaneIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M21.9 11.2l-5.6-2.5-4.8-6.1c-.2-.3-.6-.5-1-.5-.5 0-.9.2-1.1.5l-1.3 2 4.4 3.7L7.2 9l-4-2.5c-.3-.2-.7-.3-1-.2-.4.1-.7.4-.8.7l-.3 1.5 5 3.5v5.8c0 .5.3.9.7 1.1l2.5 1.4c.4.2.9.2 1.3-.1l.5-4.5 5.2 2.8 4.2 1.3c.4 0 .7-.1 1-.3.3-.3.4-.6.4-1V12.2c0-.4-.2-.8-.6-1z"/>
    </svg>
);

export const LandmarkIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M11 2a1 1 0 0 1 2 0l9 5a1 1 0 0 1-.5 1.85H2.5a1 1 0 0 1-.5-1.85zM4 11h2v8H4zm6 0h2v8h-2zm6 0h2v8h-2zM2 21h20a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z"/>
    </svg>
);

export const StarIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.25l-6.18 3.25L7 13.63l-5-4.87 6.91-1L12 1.5z"/>
    </svg>
);

export const AwardIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 15.22l-4 2.11.76-4.45L5.5 9.73l4.47-.65L12 5l2.03 4.08 4.47.65-3.26 3.15.76 4.45-4-2.11z"/>
        <path d="M5 21v-4.5l-2-2L5 13l2 2 3.6-1.9L9.5 21H5zM19 21v-4.5l2-2-2-1.5-2 2-3.6-1.9L14.5 21h4.5z"/>
    </svg>
);

export const HotelIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M19 7h-8V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v18h2v-2h14v2h2V8a1 1 0 0 0-1-1zM7 6h2v2H7V6zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm10 0h-6v-2h6v2zm0-4h-6V8h6v2z"/>
    </svg>
);

export const CompassIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm4.4-12.4l-3 7L9 15.6l3-7 4.4-3.2zM12 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"/>
    </svg>
);

export const CheckCircleIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.7l-5 5a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 1 1 1.4-1.4l1.9 1.9 4.3-4.3a1 1 0 1 1 1.4 1.4z"/>
    </svg>
);

export const ArrowRightIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12.3 4.3a1 1 0 0 0-1.4 1.4L16.6 11H3a1 1 0 1 0 0 2h13.6l-5.7 5.3a1 1 0 1 0 1.4 1.4l7.5-7a1 1 0 0 0 0-1.4z"/>
    </svg>
);

export const TimerIcon = ClockIcon;
export const MessageSquareIcon = MessageIcon;
export const ShieldCheckIcon = ShieldIcon;

export const MenuIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"/>
    </svg>
);

export const XIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
);

export const ChevronDownIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
    </svg>
);

export const PhoneIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.39 21 3 13.61 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
);

export const MailIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
);

export const MapPinIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
);

export const HelpCircleIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
    </svg>
);

export const ThumbsUpIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05C22.95 12.65 23 12.35 23 12v-2z"/>
    </svg>
);

export const PackageIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 11.5L2 8v9l10 5 10-5V8l-10 5.5z"/>
    </svg>
);

export const MapIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M15 2L9 5 3.5 2C3.3 1.9 3 2.1 3 2.4V19c0 .2.1.4.3.4l5.7 2.6L15 19l5.5 3c.2.1.5-.1.5-.4V5c0-.2-.1-.4-.3-.4L15 2zM9 19.4l-4-1.8V4.6l4 1.8v13zM16 19.4l-5 2.2V6.6l5-2.2v15z"/>
    </svg>
);

export const MountainIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M8 3 1 18h22L15 5l-4 6-3-8zm0 5l1.5 4H5L8 8zm7 4l2.5-3.5L20 15h-5.5z"/>
    </svg>
);

export const TreePineIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M11 20V16h-4L12 2l5 14h-4v4h-2zM9.5 14h5.1L12 5.5 9.5 14z"/>
    </svg>
);

export const NavigationIcon = CompassIcon;

export const FileCheckIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-3.05 15.61l-3.32-3.32-.93.93 4.25 4.25 7.6-7.59-.93-.93-6.67 6.66zM13 9V3.5L18.5 9H13z"/>
    </svg>
);

export const TargetIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
);

export const GlobeIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c1.07-1.86 2.82-3.19 4.9-3.79-.69 1.31-1.24 2.7-1.58 4.15l-.37-.36zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
    </svg>
);

export const CalendarIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
    </svg>
);

export const ChevronRightIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
);

export const TrendingUpIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
);

export const HeartIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

export const CreditCardIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
);

export const LanguagesIcon = GlobeIcon; // Mapping Languages icon to Globe for simplicity

export const EyeIcon = ({ size = 24, className = "", style }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
);
