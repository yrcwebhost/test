// Home — editorial cover, trip ribbon, trip-wide reading, bookmarks peek.
// City list lives in the Chapters tab to avoid duplication.

function HomeScreen({ theme, dark, onOpenCity, onToggleDark, onOpenSection, onSwitchTab, savedIds }) {
  const { CITIES, ALL_SECTIONS } = window.CN26_DATA.useData();
  const { Kicker, Icon, Seal } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();

  const cityEntries = CITIES.filter((c) => c.category === 'city');
  const themeEntries = CITIES.filter((c) => c.category !== 'city');

  const featuredCity = cityEntries[0];
  const featured = featuredCity.sections[0];

  const savedSections = (savedIds || [])
    .map((id) => ALL_SECTIONS.find((s) => `${s.cityId}:${s.id}` === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div style={{ paddingBottom: 120 }}>
      {/* Masthead */}
      <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 60px) 22px 14px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 10.5, letterSpacing: 3, color: theme.muted,
              textTransform: 'uppercase', fontWeight: 600,
            }}>
              {t('homeSeasonMeta')}
            </div>
            <h1 style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 42, lineHeight: 0.92, letterSpacing: -1,
              fontWeight: 500, color: theme.ink, margin: '6px 0 0',
              fontStyle: 'italic',
            }}>
              China <span style={{ fontStyle: 'normal', letterSpacing: -1.5 }}>2026</span>
            </h1>
          </div>
          <button
            onClick={onToggleDark}
            style={{
              border: `0.5px solid ${theme.rule}`, background: theme.paper,
              width: 38, height: 38, borderRadius: 999, color: theme.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', marginTop: 2,
            }}
            aria-label={t('toggleTheme')}
          >
            <Icon name={dark ? 'sun' : 'moon'} size={17} />
          </button>
        </div>
        <div style={{
          marginTop: 12, paddingTop: 12, borderTop: `0.5px solid ${theme.rule}`,
          fontFamily: window.CN26_THEME.fonts.serif, fontStyle: 'italic',
          fontSize: 13.5, color: theme.inkSoft, lineHeight: 1.4,
        }}>
          {t('homeTagline')}
        </div>
      </div>

      {/* Featured cover */}
      <div style={{ padding: '0 22px' }}>
        <button
          onClick={() => onOpenSection(featuredCity.id, featured.id)}
          style={{
            width: '100%', textAlign: 'left', padding: 0, border: 'none',
            background: 'transparent', cursor: 'pointer', display: 'block',
          }}
        >
          <div style={{
            position: 'relative', height: 360, borderRadius: 4,
            overflow: 'hidden', background: '#000',
          }}>
            <img
              src={featured.image || featuredCity.hero}
              alt=""
              decoding="async"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', filter: 'saturate(1.05)',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)',
            }} />
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Seal text={featuredCity.seal} color={featuredCity.accent} size={36} />
              <div style={{ color: '#FFF' }}>
                <div style={{
                  fontFamily: window.CN26_THEME.fonts.sans, fontSize: 9.5,
                  letterSpacing: 2, textTransform: 'uppercase',
                  opacity: 0.85, fontWeight: 600,
                }}>
                  {t('homeCoverStory')}
                </div>
                <div style={{
                  fontFamily: window.CN26_THEME.fonts.sans, fontSize: 12,
                  fontWeight: 700, letterSpacing: 0.3,
                }}>
                  {featuredCity.title} · {featuredCity.dateLabel}
                </div>
              </div>
            </div>
            <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, color: '#FFF' }}>
              <div style={{
                fontFamily: window.CN26_THEME.fonts.display, fontSize: 32,
                lineHeight: 1, fontWeight: 500, letterSpacing: -0.5,
                textShadow: '0 2px 18px rgba(0,0,0,0.4)',
              }}>
                {featured.title}
              </div>
              <div style={{
                fontFamily: window.CN26_THEME.fonts.serif, fontSize: 15,
                lineHeight: 1.35, marginTop: 8, opacity: 0.95,
                fontStyle: 'italic', textShadow: '0 1px 10px rgba(0,0,0,0.4)',
              }}>
                {featuredCity.kicker}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Trip ribbon — 15 days at a glance */}
      <SectionHead
        theme={theme}
        kicker={t('homeAtAGlance')}
        right={t('homeOpenItinerary')}
        onRight={() => onSwitchTab && onSwitchTab('itinerary')}
      />
      <div style={{ padding: '0 22px' }}>
        <button
          onClick={() => onSwitchTab && onSwitchTab('itinerary')}
          style={{
            width: '100%', padding: 0, border: 'none', background: 'transparent',
            cursor: 'pointer', display: 'block', textAlign: 'left',
          }}
        >
          <TripRibbon cities={cityEntries} theme={theme} />
        </button>
      </div>

      {/* Trip-wide reading: Food + Practical */}
      {themeEntries.length > 0 && (
        <>
          <SectionHead theme={theme} kicker={t('homeReadNext')} />
          <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {themeEntries.map((entry) => (
              <ThemeTile key={entry.id} entry={entry} theme={theme} onClick={() => onOpenCity(entry.id)} />
            ))}
          </div>
        </>
      )}

      {/* Bookmarks peek */}
      {savedSections.length > 0 && (
        <>
          <SectionHead
            theme={theme}
            kicker={t('homeSavedPeek')}
            right={t('homeSeeAll')}
            onRight={() => onSwitchTab && onSwitchTab('saved')}
          />
          <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {savedSections.map((s) => (
              <button
                key={`${s.cityId}:${s.id}`}
                onClick={() => onOpenSection(s.cityId, s.id)}
                style={{
                  width: '100%', textAlign: 'left', cursor: 'pointer',
                  border: `0.5px solid ${theme.rule}`, background: theme.paper,
                  borderRadius: 4, padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <span style={{
                  width: 4, alignSelf: 'stretch', borderRadius: 2,
                  background: s.accent, flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: window.CN26_THEME.fonts.sans, fontSize: 9.5,
                    letterSpacing: 1.8, textTransform: 'uppercase',
                    color: theme.muted, fontWeight: 600,
                  }}>
                    {s.cityTitle}
                  </div>
                  <div style={{
                    fontFamily: window.CN26_THEME.fonts.serif, fontSize: 16,
                    color: theme.ink, marginTop: 2, lineHeight: 1.25,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {s.title}
                  </div>
                </div>
                <Icon name="chevronR" size={14} color={theme.muted} stroke={2} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SectionHead({ theme, kicker, right, onRight }) {
  const { Kicker } = window.CN26_UI;
  return (
    <div style={{
      padding: '32px 22px 12px', display: 'flex',
      alignItems: 'baseline', justifyContent: 'space-between',
    }}>
      <Kicker theme={theme}>{kicker}</Kicker>
      {right && (
        <button
          onClick={onRight}
          style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: window.CN26_THEME.fonts.serif, fontSize: 12.5,
            fontStyle: 'italic', color: theme.muted, padding: 0,
          }}
        >
          {right} →
        </button>
      )}
    </div>
  );
}

function TripRibbon({ cities, theme }) {
  const totalDays = cities.reduce((sum, c) => sum + (c.dayCount || 0), 0) || 1;
  return (
    <div style={{
      border: `0.5px solid ${theme.rule}`, borderRadius: 4,
      background: theme.paper, padding: 12,
    }}>
      <div style={{ display: 'flex', height: 38, gap: 4 }}>
        {cities.map((c) => {
          const flex = (c.dayCount || 1) / totalDays;
          return (
            <div
              key={c.id}
              style={{
                flex, background: c.accent, color: '#FFF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: window.CN26_THEME.fonts.sans, fontSize: 10.5,
                fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
                borderRadius: 3, minWidth: 0,
              }}
            >
              {c.shortTitle}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ThemeTile({ entry, theme, onClick }) {
  const { Icon } = window.CN26_UI;
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', cursor: 'pointer',
        border: `0.5px solid ${theme.rule}`, background: theme.paper,
        borderRadius: 4, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 4, flexShrink: 0,
        background: entry.accent, color: '#FFF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: window.CN26_THEME.fonts.display, fontSize: 22,
        fontWeight: 500, fontStyle: 'italic', letterSpacing: -0.5,
      }}>
        {entry.shortTitle.charAt(0)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: window.CN26_THEME.fonts.sans, fontSize: 9.5,
          letterSpacing: 1.8, textTransform: 'uppercase',
          color: theme.muted, fontWeight: 600,
        }}>
          {entry.dateLabel}
        </div>
        <div style={{
          fontFamily: window.CN26_THEME.fonts.display, fontSize: 22,
          color: theme.ink, fontWeight: 500, letterSpacing: -0.3,
          lineHeight: 1.05, marginTop: 2,
        }}>
          {entry.title}
        </div>
        <div style={{
          fontFamily: window.CN26_THEME.fonts.serif, fontSize: 13,
          color: theme.inkSoft, marginTop: 4, lineHeight: 1.35,
          fontStyle: 'italic',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {entry.kicker || entry.summary}
        </div>
      </div>
      <Icon name="chevronR" size={14} color={theme.muted} stroke={2} />
    </button>
  );
}

window.CN26_HOME = { HomeScreen };
