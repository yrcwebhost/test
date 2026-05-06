// Itinerary — a day-by-day timeline derived from each city's `schedule` section.

(function () {
  // Parse a day header like "DAY 1 — ARRIVAL, QIANMEN..."
  // Returns { dayN, title } or null.
  function parseDayHeader(line) {
    const L = line.trim();
    const m = L.match(/^DAY\s+(\d{1,2})\s*[—–-]\s*(.+)$/i);
    if (m) return { dayN: parseInt(m[1], 10), title: m[2].trim() };
    return null;
  }

  // Parse a leading tag like "AM:", "PM:", "EVE:", "DINNER:", "Early AM:", "8:00 PM:"
  function splitTag(line) {
    const m = line.match(/^([A-Za-z][A-Za-z0-9 :&]{0,18}):\s*(.+)$/);
    if (m) return { tag: m[1].trim(), text: m[2].trim() };
    return { tag: null, text: line.trim() };
  }

  // Build the canonical itinerary: [{ month, day, dow, cityId, cityTitle, cityAccent, title, items:[{tag,text}] }]
  function buildItinerary(CITIES) {
    const days = [];
    for (const city of CITIES) {
      if (!city.dateLabel || city.dateLabel === 'Trip-wide') continue;
      const sched = city.sections.find((s) => s.type === 'schedule');
      if (!sched || !sched.bullets) continue;

      let current = null;
      for (const line of sched.bullets) {
        const header = parseDayHeader(line);
        if (header) {
          current = {
            cityDayN: header.dayN,
            ...header,
            cityId: city.id,
            cityTitle: city.shortTitle,
            cityAccent: city.accent,
            items: [],
          };
          days.push(current);
        } else if (current) {
          current.items.push(splitTag(line));
        }
      }
    }
    // Add running trip index (cities are already in order in CN26_RAW)
    days.forEach((d, i) => { d.index = i; });
    return days;
  }

  // ─────────────── Screen ───────────────
  function ItineraryScreen({ theme, onOpenCity, onOpenSection }) {
    const { Kicker } = window.CN26_UI;
    const { t } = window.CN26_I18N.useI18n();
    const { CITIES } = window.CN26_DATA.useData();
    const days = React.useMemo(() => buildItinerary(CITIES), [CITIES]);
    const [activeDay, setActiveDay] = React.useState(0);
    const stripRef = React.useRef(null);

    // Scroll the strip so the active pill stays in view
    React.useEffect(() => {
      const el = stripRef.current;
      if (!el) return;
      const pill = el.children[activeDay];
      if (pill) pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, [activeDay]);

    const day = days[activeDay];

    return (
      <div style={{ minHeight: '100%', paddingBottom: 140 }}>
        {/* Masthead */}
        <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 22px) 22px 6px' }}>
          <Kicker theme={theme} color={theme.ink}>{t('itineraryKicker')}</Kicker>
          <h1
            style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 44,
              lineHeight: 0.95,
              fontWeight: 500,
              letterSpacing: -1.5,
              color: theme.ink,
              margin: '10px 0 4px',
            }}
          >
            {t('itineraryTitleMain')}
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>{t('itineraryTitleAccent')}</span>
          </h1>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.serif,
              fontStyle: 'italic',
              fontSize: 16,
              lineHeight: 1.4,
              color: theme.inkSoft,
              margin: '6px 0 0',
              maxWidth: 320,
            }}
          >
            {t('itineraryIntro')}
          </div>
        </div>

        {/* Day strip */}
        <div
          ref={stripRef}
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            padding: '18px 22px 14px',
            scrollSnapType: 'x proximity',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {days.map((d, i) => {
            const on = i === activeDay;
            return (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                style={{
                  flexShrink: 0,
                  width: 58,
                  height: 76,
                  border: on ? `1.5px solid ${d.cityAccent}` : `0.5px solid ${theme.rule}`,
                  background: on ? d.cityAccent : theme.paper,
                  color: on ? '#FAF5EC' : theme.ink,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  padding: 0,
                  scrollSnapAlign: 'center',
                  transition: 'all 200ms',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 8.5,
                    letterSpacing: 1.5,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    opacity: 0.8,
                  }}
                >
                  {t('itineraryDay')}
                </div>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.display,
                    fontSize: 26,
                    lineHeight: 1,
                    fontWeight: 500,
                    letterSpacing: -0.5,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 7.5,
                    letterSpacing: 1.2,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    opacity: 0.75,
                    marginTop: 2,
                  }}
                >
                  {d.cityTitle.slice(0, 6)}
                </div>
                {/* top tick mark if city transition */}
                {i === 0 || days[i - 1].cityId !== d.cityId ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: -6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: d.cityAccent,
                    }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Day detail */}
          {day && <DayCard day={day} theme={theme} onOpenCity={onOpenCity} onOpenSection={onOpenSection} />}

        {/* Nav arrows */}
        <div style={{ display: 'flex', gap: 10, padding: '0 22px', marginTop: 22 }}>
          <button
            onClick={() => setActiveDay((i) => Math.max(0, i - 1))}
            disabled={activeDay === 0}
            style={{
              flex: 1,
              padding: '12px 14px',
              border: `0.5px solid ${theme.rule}`,
              background: theme.paper,
              color: activeDay === 0 ? theme.muted : theme.ink,
              borderRadius: 3,
              cursor: activeDay === 0 ? 'default' : 'pointer',
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: activeDay === 0 ? 0.4 : 1,
            }}
          >
            {t('itineraryPrev')}
          </button>
          <button
            onClick={() => setActiveDay((i) => Math.min(days.length - 1, i + 1))}
            disabled={activeDay === days.length - 1}
            style={{
              flex: 1,
              padding: '12px 14px',
              border: `0.5px solid ${theme.rule}`,
              background: theme.paper,
              color: activeDay === days.length - 1 ? theme.muted : theme.ink,
              borderRadius: 3,
              cursor: activeDay === days.length - 1 ? 'default' : 'pointer',
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 600,
              opacity: activeDay === days.length - 1 ? 0.4 : 1,
            }}
          >
            {t('itineraryNext')}
          </button>
        </div>
      </div>
    );
  }

  function DayCard({ day, theme, onOpenCity }) {
    const { t } = window.CN26_I18N.useI18n();
    return (
      <div style={{ padding: '6px 22px 0' }}>
        {/* Header */}
        <div
          style={{
            padding: '18px 20px',
            background: day.cityAccent,
            color: '#FAF5EC',
            borderRadius: '3px 3px 0 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 9,
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  opacity: 0.75,
                  marginBottom: 6,
                }}
              >
                {t('itineraryDay')} {day.index + 1} · {day.cityTitle}
              </div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.display,
                  fontSize: 30,
                  lineHeight: 1,
                  fontWeight: 500,
                  letterSpacing: -0.8,
                }}
              >
                {t('itineraryDay')} {day.index + 1}
              </div>
            </div>
            <button
              onClick={() => onOpenCity(day.cityId)}
              style={{
                border: '0.5px solid rgba(255,255,255,0.4)',
                background: 'transparent',
                color: '#FAF5EC',
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: 999,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t('cityChapter')} ›
            </button>
          </div>
          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: '0.5px solid rgba(255,255,255,0.25)',
              fontFamily: window.CN26_THEME.fonts.serif,
              fontStyle: 'italic',
              fontSize: 17,
              lineHeight: 1.35,
            }}
          >
            {titleCase(day.title)}
          </div>
        </div>

        {/* Items */}
        <div
          style={{
            background: theme.paper,
            border: `0.5px solid ${theme.rule}`,
            borderTop: 'none',
            borderRadius: '0 0 3px 3px',
            padding: '8px 0',
          }}
        >
          {day.items.length === 0 && (
            <div style={{ padding: '18px 20px', color: theme.muted, fontSize: 13, fontStyle: 'italic', fontFamily: window.CN26_THEME.fonts.serif }}>
              {t('itineraryNoNotes')}
            </div>
          )}
          {day.items.map((it, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 20px',
                borderTop: i === 0 ? 'none' : `0.5px solid ${theme.rule}`,
              }}
            >
              <div
                style={{
                  width: 52,
                  flexShrink: 0,
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 9.5,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: day.cityAccent,
                  fontWeight: 700,
                  paddingTop: 2,
                }}
              >
                {it.tag || '·'}
              </div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.serif,
                  fontSize: 15,
                  lineHeight: 1.45,
                  color: theme.ink,
                  flex: 1,
                }}
              >
                {it.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function monthAbbr(m) {
    return ['', 'JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][m] || '';
  }
  function dowName(d) {
    return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d] || '';
  }
  function titleCase(s) {
    return s.split(' ').map((w) => {
      if (w.length <= 3) return w.toLowerCase();
      return w.charAt(0) + w.slice(1).toLowerCase();
    }).join(' ').replace(/^./, (c) => c.toUpperCase());
  }

  window.CN26_ITINERARY = { ItineraryScreen, buildItinerary };
})();
