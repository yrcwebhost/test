// Home — magazine "issue" cover + chapter stack

function HomeScreen({ theme, dark, onOpenCity, onToggleDark, onOpenSection }) {
  const { CITIES } = window.CN26_DATA.useData();
  const { Kicker, Icon, Seal } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();

  const featured = CITIES[0].sections[0];
  const featuredCity = CITIES[0];

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Masthead */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 72px) 22px 18px', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: window.CN26_THEME.fonts.sans,
                fontSize: 10.5,
                letterSpacing: 3,
                color: theme.muted,
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {t('homeSeasonMeta')}
            </div>
            <h1
              style={{
                fontFamily: window.CN26_THEME.fonts.display,
                fontSize: 56,
                lineHeight: 0.92,
                letterSpacing: -1,
                fontWeight: 500,
                color: theme.ink,
                margin: '6px 0 0',
                fontStyle: 'italic',
              }}
            >
              China
              <br />
              <span style={{ fontStyle: 'normal', letterSpacing: -2 }}>2026</span>
            </h1>
          </div>
          <button
            onClick={onToggleDark}
            style={{
              border: `0.5px solid ${theme.rule}`,
              background: theme.paper,
              width: 40,
              height: 40,
              borderRadius: 999,
              color: theme.ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: 4,
            }}
            aria-label={t('toggleTheme')}
          >
            <Icon name={dark ? 'sun' : 'moon'} size={18} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 16,
            paddingTop: 14,
            borderTop: `0.5px solid ${theme.rule}`,
          }}
        >
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.serif,
              fontStyle: 'italic',
              fontSize: 14,
              color: theme.inkSoft,
              lineHeight: 1.4,
            }}
          >
            {t('homeTagline')}
          </div>
        </div>
      </div>

      {/* Featured story card */}
      <div style={{ padding: '0 22px' }}>
        <button
          onClick={() => onOpenSection(featuredCity.id, featured.id)}
          style={{
            width: '100%',
            textAlign: 'left',
            padding: 0,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'block',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: 420,
              borderRadius: 4,
              overflow: 'hidden',
              background: '#000',
            }}
          >
            <img
              src={featured.image || featuredCity.hero}
              alt=""
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'saturate(1.05)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.75) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Seal text="京" color={featuredCity.accent} size={38} />
              <div style={{ color: '#FFF' }}>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 9.5,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    opacity: 0.85,
                    fontWeight: 600,
                  }}
                >
                  {t('homeCoverStory')}
                </div>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.3,
                  }}
                >
                  {featuredCity.title} · {featuredCity.dateLabel}
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 20,
                right: 20,
                bottom: 18,
                color: '#FFF',
              }}
            >
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.display,
                  fontSize: 36,
                  lineHeight: 1,
                  fontWeight: 500,
                  letterSpacing: -0.5,
                  textShadow: '0 2px 18px rgba(0,0,0,0.4)',
                }}
              >
                {featured.title}
              </div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.serif,
                  fontSize: 16,
                  lineHeight: 1.35,
                  marginTop: 8,
                  opacity: 0.95,
                  fontStyle: 'italic',
                  textShadow: '0 1px 10px rgba(0,0,0,0.4)',
                }}
              >
                {featuredCity.kicker}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Index header */}
      <div
        style={{
          padding: '36px 22px 12px',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Kicker theme={theme}>{t('homeItinerary')}</Kicker>
        <span
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 13,
            fontStyle: 'italic',
            color: theme.muted,
          }}
        >
          {t('homeFiveChapters')}
        </span>
      </div>
      <div
        style={{
          padding: '0 22px',
          fontFamily: window.CN26_THEME.fonts.display,
          fontSize: 28,
          lineHeight: 1.08,
          color: theme.ink,
          fontWeight: 500,
          letterSpacing: -0.4,
          marginBottom: 18,
        }}
      >
        {t('homeIntro')}
      </div>

      {/* City stack */}
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CITIES.map((city, idx) => (
          <CityTile key={city.id} city={city} idx={idx} theme={theme} onClick={() => onOpenCity(city.id)} />
        ))}
      </div>


    </div>
  );
}

function CityTile({ city, idx, theme, onClick }) {
  const { Seal, Icon } = window.CN26_UI;
  const num = String(idx + 1).padStart(2, '0');
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: 0,
        border: 'none',
        background: theme.paper,
        cursor: 'pointer',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
        display: 'block',
      }}
    >
      <div style={{ position: 'relative', height: 170 }}>
        <img
          src={city.hero}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            color: '#FFF',
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 10,
            letterSpacing: 2,
            fontWeight: 700,
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          № {num}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 14,
            bottom: 12,
            color: '#FFF',
          }}
        >
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 34,
              fontWeight: 500,
              letterSpacing: -0.5,
              lineHeight: 1,
            }}
          >
            {city.title}
          </div>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.serif,
              fontStyle: 'italic',
              fontSize: 13,
              opacity: 0.85,
              marginTop: 2,
            }}
          >
            {city.kicker}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            color: '#FFF',
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            padding: '5px 9px',
            borderRadius: 3,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          {city.dateLabel}
        </div>
      </div>
      <div
        style={{
          padding: '14px 16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.serif,
              fontSize: 14,
              lineHeight: 1.4,
              color: theme.inkSoft,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {city.summary}
          </div>
          <div
            style={{
              marginTop: 9,
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 10.5,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: theme.muted,
              fontWeight: 600,
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <span>{city.dayCount}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{city.sectionCount} sections</span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 999,
            background: city.accent,
            color: '#FFF',
            flexShrink: 0,
          }}
        >
          <Icon name="chevronR" size={16} color="#FFF" stroke={2.2} />
        </div>
      </div>
    </button>
  );
}

window.CN26_HOME = { HomeScreen };
