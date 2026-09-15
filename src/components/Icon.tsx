export function Icon({
  name,
  size = 24,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
        <path d="M8 8a3.5 3.5 0 0 1 4-1" />
      </>
    ),
    microscope: (
      <>
        <path d="m10 3 6 3-4 8-6-3zM12 2l5 2M5 21h15M8 17v4" />
        <path d="M15 10a6 6 0 0 1 0 11M4 15h9" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5zM20 2v4M18 4h4" />
      </>
    ),
    bolt: <path d="m13 2-9 12h7l-1 8L21 9h-8z" />,
    detective: (
      <>
        <path d="M4 12h16M6 12l2-8h8l2 8M8 4l4 2 4-2M6 15v2a6 6 0 0 0 12 0v-2" />
        <circle cx="9" cy="16" r="1" />
        <circle cx="15" cy="16" r="1" />
      </>
    ),
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    book: (
      <>
        <path d="M5 3h14v18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM7 3v18M11 8h4M11 12h4" />
      </>
    ),
    reset: (
      <>
        <path d="M3 10a9 9 0 1 1 1 8M3 4v6h6" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M17 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 4v2" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    lightbulb: (
      <>
        <path d="M9 18h6M10 22h4M8 14a7 7 0 1 1 8 0l-1 4H9z" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name] ?? paths.search}
    </svg>
  );
}
