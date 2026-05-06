// Story reader — renders one section with a type-aware template.
// Supports: overview, note, schedule, highlights, walks, food, practical, culture, timeline, phrases.

function StoryScreen({ cityId, sectionId, theme, dark, savedIds, onToggleSaved, onBack, onOpenPhoto, onOpenSection }) {
  const { CITIES } = window.CN26_DATA.useData();
  const { Icon } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();

  const city = CITIES.find((c) => c.id === cityId);
  const sectionIdx = city.sections.findIndex((s) => s.id === sectionId);
  const section = city.sections[sectionIdx];
  const savedKey = `${cityId}:${sectionId}`;
  const saved = savedIds.includes(savedKey);

  const scrollRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? el.scrollTop / total : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [sectionId]);

  const next = city.sections[sectionIdx + 1];

  return (
    <div
      ref={scrollRef}
      style={{ height: '100%', overflowY: 'auto', background: theme.bg, position: 'relative' }}
    >
      {/* Floating back + progress */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
            left: 14,
            right: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pointerEvents: 'auto',
          }}
        >
          <button
            onClick={onBack}
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              border: `0.5px solid ${theme.rule}`,
              background: theme.paper + 'DD',
              backdropFilter: 'blur(14px) saturate(180%)',
              WebkitBackdropFilter: 'blur(14px) saturate(180%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: theme.ink,
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            }}
          >
            <Icon name="back" size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                padding: '9px 14px',
                borderRadius: 999,
                background: theme.paper + 'DD',
                border: `0.5px solid ${theme.rule}`,
                backdropFilter: 'blur(14px) saturate(180%)',
                WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                color: theme.ink,
                fontFamily: window.CN26_THEME.fonts.sans,
                fontSize: 10.5,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: theme.muted }}>{sectionIdx + 1} / {city.sections.length}</span>
              <span
                style={{
                  width: 44,
                  height: 2,
                  background: theme.rule,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: `${progress * 100}%`,
                    height: '100%',
                    background: city.accent,
                    transition: 'width 120ms linear',
                  }}
                />
              </span>
            </div>
            <button
              onClick={() => onToggleSaved(savedKey)}
              style={{
                width: 38,
                height: 38,
                borderRadius: 999,
                border: `0.5px solid ${theme.rule}`,
                background: theme.paper + 'DD',
                backdropFilter: 'blur(14px) saturate(180%)',
                WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: saved ? city.accent : theme.ink,
                boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
              }}
              aria-label={saved ? t('storyRemove') : t('storySave')}
            >
              <Icon name={saved ? 'bookmarkFilled' : 'bookmark'} size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Article header — always consistent */}
      <div style={{ padding: '110px 24px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 10.5,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: city.accent,
            fontWeight: 700,
          }}
        >
          <span>{city.shortTitle}</span>
          {section.day && (
            <>
              <span style={{ opacity: 0.4 }}>·</span>
              <span style={{ color: theme.muted }}>{section.day}</span>
            </>
          )}
        </div>
        <h1
          style={{
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 42,
            lineHeight: 1.0,
            fontWeight: 500,
            letterSpacing: -1,
            color: theme.ink,
            margin: '14px 0 10px',
          }}
        >
          {section.title}
        </h1>
        {section.subtitle && (
          <p
            style={{
              fontFamily: window.CN26_THEME.fonts.serif,
              fontStyle: 'italic',
              fontSize: 18,
              lineHeight: 1.35,
              color: theme.inkSoft,
              margin: 0,
            }}
          >
            {section.subtitle}
          </p>
        )}
      </div>

      {/* Byline rule */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: `0.5px solid ${theme.rule}`,
          borderBottom: `0.5px solid ${theme.rule}`,
          margin: '4px 24px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: window.CN26_THEME.fonts.sans,
          fontSize: 10,
          letterSpacing: 1.8,
          textTransform: 'uppercase',
          color: theme.muted,
          fontWeight: 600,
        }}
      >
        <span>{city.dateLabel}</span>
        <span>
          № {String(sectionIdx + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Type-aware body */}
      <div style={{ padding: '0 24px 180px' }}>
        <SectionBody section={section} city={city} theme={theme} />

        {/* End ornament */}
        <div
          style={{
            margin: '50px 0 24px',
            textAlign: 'center',
            color: theme.muted,
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 22,
            fontStyle: 'italic',
          }}
        >
          · § ·
        </div>

        {next && (
          <button
            onClick={() => onOpenSection && onOpenSection(city.id, next.id)}
            style={{
              width: '100%',
              marginTop: 8,
              padding: '16px 18px',
              background: theme.paper,
              border: `0.5px solid ${theme.rule}`,
              borderLeft: `3px solid ${city.accent}`,
              borderRadius: 3,
              textAlign: 'left',
              cursor: 'pointer',
              display: 'block',
            }}
          >
            <div
              style={{
                fontFamily: window.CN26_THEME.fonts.sans,
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: city.accent,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              {t('storyContinue')}
            </div>
            <div
              style={{
                fontFamily: window.CN26_THEME.fonts.display,
                fontSize: 22,
                lineHeight: 1.1,
                color: theme.ink,
                fontWeight: 500,
                letterSpacing: -0.4,
              }}
            >
              {next.title}
            </div>
            <div
              style={{
                fontFamily: window.CN26_THEME.fonts.sans,
                fontSize: 10,
                letterSpacing: 1.8,
                textTransform: 'uppercase',
                color: theme.muted,
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              {next.day || city.shortTitle}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────── Section body dispatcher ───────────────
function SectionBody({ section, city, theme }) {
  const B = window.CN26_STORY_BODY;
  const { type } = section;
  switch (type) {
    case 'note':          return <B.NoteBody section={section} city={city} theme={theme} />;
    case 'schedule':      return <B.ScheduleBody section={section} city={city} theme={theme} />;
    case 'highlights':    return <B.HighlightsBody section={section} city={city} theme={theme} />;
    case 'timeline':      return <B.TimelineBody section={section} city={city} theme={theme} />;
    case 'phrases':       return <B.PhrasesBody section={section} city={city} theme={theme} />;
    case 'practical':     return <B.PracticalBody section={section} city={city} theme={theme} />;
    case 'walks':         return <B.WalksBody section={section} city={city} theme={theme} />;
    case 'food':
    case 'overview':
    case 'culture':
    default:              return <B.LongformBody section={section} city={city} theme={theme} />;
  }
}

window.CN26_STORY = { StoryScreen, SectionBody };
