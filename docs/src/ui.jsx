// Shared UI primitives for the CN26 app mock

// ─────────────── Icons ───────────────
function Icon({ name, size = 20, color = 'currentColor', stroke = 1.6 }) {
  const paths = {
    back: <path d="M15 6l-6 6 6 6" />,
    chevronR: <path d="M9 6l6 6-6 6" />,
    home: <path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" />,
    book: <path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM5 4v13a3 3 0 003 3h10" />,
    grid: (
      <g>
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </g>
    ),
    map: (
      <g>
        <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" />
        <path d="M9 4v16M15 6v16" />
      </g>
    ),
    bookmark: <path d="M6 4h12v17l-6-4-6 4V4z" />,
    bookmarkFilled: <path d="M6 4h12v17l-6-4-6 4V4z" fill="currentColor" />,
    sun: (
      <g>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
      </g>
    ),
    moon: <path d="M20 14.5A8 8 0 119.5 4a7 7 0 0010.5 10.5z" />,
    search: (
      <g>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.5-4.5" />
      </g>
    ),
    close: <path d="M6 6l12 12M18 6L6 18" />,
    share: (
      <g>
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M8.2 10.8l7.6-4M8.2 13.2l7.6 4" />
      </g>
    ),
    compass: (
      <g>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5.5-5 2 2-5.5z" fill="currentColor" strokeLinejoin="round" />
      </g>
    ),
    calendar: (
      <g>
        <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </g>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      {paths[name]}
    </svg>
  );
}

// ─────────────── Chinese seal (decorative) ───────────────
function Seal({ text = '游', color, size = 44 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 6,
        background: color,
        color: '#FAF5EC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, "Songti SC", serif',
        fontSize: size * 0.52,
        fontWeight: 700,
        letterSpacing: 0,
        boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.25)',
        transform: 'rotate(-2deg)',
        flexShrink: 0,
      }}
    >
      {text}
    </div>
  );
}

// ─────────────── Tab bar ───────────────
function TabBar({ active, onChange, theme }) {
  const { t } = window.CN26_I18N.useI18n();
  const { LanguageInlineControl } = window.CN26_I18N;
  const tabs = [
    { key: 'home', icon: 'home', label: t('tabHome') },
    { key: 'cities', icon: 'book', label: t('tabCities') },
    { key: 'itinerary', icon: 'calendar', label: t('tabItinerary') },
    { key: 'gallery', icon: 'grid', label: t('tabGallery') },
    { key: 'saved', icon: 'bookmark', label: t('tabSaved') },
  ];
  return (
    <div
      style={{
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 20,
        display: 'flex',
        gap: 3,
        padding: 6,
        borderRadius: 999,
        background: theme.paper + 'EE',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        border: `0.5px solid ${theme.rule}`,
        boxShadow: '0 8px 30px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)',
        zIndex: 40,
      }}
    >
      {tabs.map((t) => {
        const on = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            style={{
              flex: 1,
              border: 'none',
              background: on ? theme.ink : 'transparent',
              color: on ? theme.paper : theme.muted,
              padding: '10px 6px',
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              cursor: 'pointer',
              transition: 'all 240ms cubic-bezier(.2,.8,.2,1)',
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: 0.2,
              minWidth: 0,
            }}
          >
            <Icon name={t.icon} size={16} stroke={on ? 2 : 1.7} />
            {on && <span style={{ whiteSpace: 'nowrap' }}>{t.label}</span>}
          </button>
        );
      })}
      <LanguageInlineControl theme={theme} />
    </div>
  );
}

// ─────────────── Top chrome ───────────────
function TopBar({ title, onBack, right, theme, overlay = false, progress = 0 }) {
  const bg = overlay ? 'transparent' : theme.bg + 'F2';
  const ink = overlay ? '#FFFFFF' : theme.ink;
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: bg,
        backdropFilter: overlay ? 'none' : 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: overlay ? 'none' : 'blur(16px) saturate(180%)',
        borderBottom: overlay ? 'none' : `0.5px solid ${theme.rule}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px 12px',
          gap: 10,
          minHeight: 44,
        }}
      >
        <div style={{ width: 64, display: 'flex', alignItems: 'center' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                border: 'none',
                background: overlay ? 'rgba(0,0,0,0.35)' : theme.paper,
                color: ink,
                width: 36,
                height: 36,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: overlay ? 'blur(10px)' : 'none',
                WebkitBackdropFilter: overlay ? 'blur(10px)' : 'none',
                border: overlay ? '0.5px solid rgba(255,255,255,0.2)' : `0.5px solid ${theme.rule}`,
              }}
            >
              <Icon name="back" size={18} color={ink} />
            </button>
          )}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            color: overlay ? '#FFFFFFE0' : theme.muted,
          }}
        >
          {title}
        </div>
        <div style={{ width: 64, display: 'flex', justifyContent: 'flex-end', gap: 6 }}>{right}</div>
      </div>
      {progress > 0 && (
        <div style={{ height: 2, background: 'transparent' }}>
          <div
            style={{
              width: `${Math.min(100, progress * 100)}%`,
              height: '100%',
              background: theme.accent,
              transition: 'width 120ms linear',
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────── Kicker + rule ───────────────
function Kicker({ children, color, theme }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        color: color || theme.accent,
        fontFamily: window.CN26_THEME.fonts.sans,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 18,
          height: 1,
          background: color || theme.accent,
        }}
      />
      {children}
    </div>
  );
}

// ─────────────── Drop cap paragraph ───────────────
function DropCap({ text, theme, color }) {
  if (!text) return null;
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <>
      <p
        style={{
          fontFamily: window.CN26_THEME.fonts.serif,
          fontSize: 18,
          lineHeight: 1.55,
          color: theme.ink,
          margin: 0,
        }}
      >
        <span
          style={{
            float: 'left',
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 72,
            lineHeight: 0.88,
            padding: '6px 10px 0 0',
            color: color || theme.accent,
            fontWeight: 500,
          }}
        >
          {first}
        </span>
        {rest}
      </p>
      <div style={{ clear: 'both' }} />
    </>
  );
}

window.CN26_UI = { Icon, Seal, TabBar, TopBar, Kicker, DropCap };
