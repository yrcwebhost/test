// City chapter detail screen — parallax hero + ToC + gallery

function CityScreen({ cityId, theme, onBack, onOpenSection, onOpenPhoto }) {
  const { CITIES } = window.CN26_DATA.useData();
  const { Icon, Seal, Kicker } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();
  const city = CITIES.find((c) => c.id === cityId);
  const scrollRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // parallax
  const heroH = 420;
  const p = Math.min(1, scrollY / heroH);
  const imgY = scrollY * 0.45;
  const imgScale = 1 + Math.max(0, -scrollY / 1600);

  return (
    <div
      ref={scrollRef}
      style={{ height: '100%', overflowY: 'auto', background: theme.bg, position: 'relative' }}
    >
      {/* Floating back / save */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 10px)',
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
              border: 'none',
              background: p > 0.4 ? theme.paper : 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(14px) saturate(180%)',
              WebkitBackdropFilter: 'blur(14px) saturate(180%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: p > 0.4 ? theme.ink : '#FFF',
              transition: 'background 240ms',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            <Icon name="back" size={18} />
          </button>
          <div style={{ width: 38, height: 38 }} />
        </div>
      </div>

      {/* Hero */}
      <div style={{ position: 'relative', height: heroH, overflow: 'hidden', marginTop: -56 }}>
        <img
          src={city.hero}
          alt=""
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `translateY(${imgY}px) scale(${imgScale})`,
            transformOrigin: 'center top',
            filter: 'saturate(1.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%)',
          }}
        />
        {/* Title block */}
        <div
          style={{
            position: 'absolute',
            left: 22,
            right: 22,
            bottom: 30,
            color: '#FFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Seal text={city.chinese.charAt(0)} color={city.accent} size={42} />
            <div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 10,
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                  opacity: 0.8,
                  fontWeight: 600,
                }}
              >
                {t('cityChapter')} · {city.dateLabel}
              </div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.serif,
                  fontStyle: 'italic',
                  fontSize: 14,
                  opacity: 0.92,
                }}
              >
                {city.kicker}
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 72,
              fontWeight: 500,
              lineHeight: 0.9,
              letterSpacing: -2.5,
              textShadow: '0 3px 24px rgba(0,0,0,0.5)',
            }}
          >
            {city.title}
          </div>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 34,
              fontWeight: 500,
              opacity: 0.85,
              marginTop: 2,
            }}
          >
            {city.chinese}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ background: theme.bg, position: 'relative', paddingBottom: 140 }}>
        {/* Lede */}
        <div style={{ padding: '28px 22px 18px' }}>
          <p
            style={{
              fontFamily: window.CN26_THEME.fonts.serif,
              fontSize: 19,
              lineHeight: 1.45,
              color: theme.ink,
              margin: 0,
              fontStyle: 'italic',
            }}
          >
            {city.lede}
          </p>
        </div>

        {/* Gallery rail */}
        <div style={{ padding: '6px 0 26px' }}>
          <div style={{ padding: '0 22px 12px' }}>
            <Kicker theme={theme} color={city.accent}>{t('cityPhotography')}</Kicker>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 10,
              overflowX: 'auto',
              padding: '0 22px',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {city.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => onOpenPhoto(g.src)}
                style={{
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                  cursor: 'pointer',
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                  width: 220,
                }}
              >
                <div
                  style={{
                    width: 220,
                    height: 280,
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: theme.ruleSoft,
                  }}
                >
                  <img
                    src={g.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 10.5,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: theme.muted,
                    fontWeight: 600,
                  }}
                >
                  {String(i + 1).padStart(2, '0')} · {g.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Table of Contents */}
        <div style={{ padding: '18px 22px 6px' }}>
          <Kicker theme={theme} color={city.accent}>{t('cityInsideChapter')}</Kicker>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 34,
              color: theme.ink,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: -0.5,
              marginTop: 8,
            }}
          >
            {t('cityContents')}
          </div>
        </div>

        <div style={{ padding: '14px 22px 0' }}>
          {city.sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onOpenSection(city.id, s.id)}
              style={{
                display: 'flex',
                width: '100%',
                padding: '16px 0',
                border: 'none',
                background: 'transparent',
                borderTop: `0.5px solid ${theme.rule}`,
                borderBottom: i === city.sections.length - 1 ? `0.5px solid ${theme.rule}` : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 44,
                  fontFamily: window.CN26_THEME.fonts.display,
                  fontSize: 28,
                  color: city.accent,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  lineHeight: 0.9,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 9.5,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: theme.muted,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {estimateReadTime(s, t)}
                </div>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.display,
                    fontSize: 22,
                    color: theme.ink,
                    fontWeight: 500,
                    lineHeight: 1.1,
                    letterSpacing: -0.3,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: window.CN26_THEME.fonts.serif,
                    fontSize: 14,
                    fontStyle: 'italic',
                    color: theme.inkSoft,
                    lineHeight: 1.35,
                  }}
                >
                  {sectionPreview(s)}
                </div>
              </div>
              <div
                style={{
                  marginTop: 4,
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  border: `0.5px solid ${theme.rule}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.muted,
                  flexShrink: 0,
                }}
              >
                <Icon name="chevronR" size={12} stroke={2} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function estimateReadTime(s, t) {
  const words = (s.body || []).join(' ').split(/\s+/).length + (s.bullets || []).length * 8;
  const mins = Math.max(1, Math.round(words / 220));
  return t('cityReadMin', { count: mins });
}
function sectionPreview(s) {
  if (s.body && s.body[0]) {
    const p = s.body[0];
    const cut = p.split(/(?<=[.!?])\s+/)[0];
    return cut.length > 120 ? cut.slice(0, 117).trimEnd() + '…' : cut;
  }
  if (s.bullets && s.bullets[0]) {
    const b = s.bullets[0];
    return b.length > 100 ? b.slice(0, 97) + '…' : b;
  }
  return '';
}

window.CN26_CITY = { CityScreen };
