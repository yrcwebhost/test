// Type-specific section body renderers

function LongformBody({ section, city, theme }) {
  const { DropCap } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();
  const body = section.body || [];
  const pullIdx = body.length >= 4 ? Math.floor(body.length / 2) : -1;
  // Pick a pull quote: first long-ish sentence from middle paragraph
  const pullQuote = pullIdx >= 0 ? pickQuote(body[pullIdx]) : null;
  const bullets = section.bullets;

  return (
    <>
      {section.image && (
        <figure style={{ margin: '0 -24px 26px', position: 'relative' }}>
          <img
            src={section.image}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
          />
          <figcaption
            style={{
              padding: '10px 24px 0',
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 10,
              letterSpacing: 1.8,
              textTransform: 'uppercase',
              color: theme.muted,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 18, height: 1, background: city.accent }} />
            {t('storyBodyPlate')} · {section.title}
          </figcaption>
        </figure>
      )}
      {body.map((p, i) => (
        <React.Fragment key={i}>
          {i === 0 ? (
            <DropCap text={p} theme={theme} color={city.accent} />
          ) : (
            <p
              style={{
                fontFamily: window.CN26_THEME.fonts.serif,
                fontSize: 18,
                lineHeight: 1.55,
                color: theme.ink,
                margin: '18px 0 0',
              }}
            >
              {p}
            </p>
          )}
          {i === pullIdx && pullQuote && (
            <blockquote
              style={{
                margin: '28px -2px',
                padding: '22px 0',
                borderTop: `1px solid ${theme.ink}`,
                borderBottom: `1px solid ${theme.ink}`,
                fontFamily: window.CN26_THEME.fonts.display,
                fontSize: 26,
                lineHeight: 1.15,
                letterSpacing: -0.5,
                color: theme.ink,
                fontStyle: 'italic',
                fontWeight: 500,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -18,
                  left: 0,
                  background: theme.bg,
                  padding: '0 10px 0 0',
                  fontFamily: window.CN26_THEME.fonts.display,
                  fontSize: 42,
                  color: city.accent,
                  lineHeight: 1,
                }}
              >
                “
              </span>
              {pullQuote}
            </blockquote>
          )}
        </React.Fragment>
      ))}
      {bullets && bullets.length > 0 && <BulletList items={bullets} city={city} theme={theme} />}
      <AsideList section={section} city={city} theme={theme} />
    </>
  );
}

function WalksBody(props) { return <LongformBody {...props} />; }

function NoteBody({ section, city, theme }) {
  const { t } = window.CN26_I18N.useI18n();
  const body = section.body || [];
  return (
    <div
      style={{
        padding: '26px 22px',
        background: theme.paper,
        border: `0.5px solid ${theme.rule}`,
        borderLeft: `4px solid ${city.accent}`,
        borderRadius: 3,
      }}
    >
      <div
        style={{
          fontFamily: window.CN26_THEME.fonts.sans,
          fontSize: 10,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          color: city.accent,
          fontWeight: 700,
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ width: 14, height: 1, background: city.accent }} />
        {t('storyBodyAside')}
      </div>
      {body.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 17,
            lineHeight: 1.5,
            color: theme.inkSoft,
            fontStyle: 'italic',
            margin: i === 0 ? 0 : '14px 0 0',
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function ScheduleBody({ section, city, theme }) {
  const { t } = window.CN26_I18N.useI18n();
  // bullets: DAY HEADER (all caps, starts with 3-letter day) then indented items
  const bullets = section.bullets || [];
  const days = groupByDay(bullets);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {days.map((d, i) => (
        <div key={i}>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 10,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: city.accent,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            {t('contentDayLabel', { count: String(i + 1).padStart(2, '0') })}
          </div>
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.display,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: -0.4,
              color: theme.ink,
              lineHeight: 1.15,
              borderBottom: `0.5px solid ${theme.rule}`,
              paddingBottom: 10,
              marginBottom: 10,
            }}
          >
            {d.header}
          </div>
          {d.items.map((it, j) => {
            const { tag, text } = splitTag(it);
            return (
              <div
                key={j}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: j === d.items.length - 1 ? 'none' : `0.5px dashed ${theme.rule}`,
                }}
              >
                <div
                  style={{
                    width: 72,
                    flexShrink: 0,
                    fontFamily: window.CN26_THEME.fonts.sans,
                    fontSize: 10,
                    letterSpacing: 1.8,
                    textTransform: 'uppercase',
                    color: theme.muted,
                    fontWeight: 700,
                    paddingTop: 3,
                  }}
                >
                  {tag || '—'}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontFamily: window.CN26_THEME.fonts.serif,
                    fontSize: 15.5,
                    lineHeight: 1.5,
                    color: theme.inkSoft,
                  }}
                >
                  {text}
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <AsideList section={section} city={city} theme={theme} />
    </div>
  );
}

function HighlightsBody({ section, city, theme }) {
  const body = section.body || [];
  const bullets = section.bullets || [];
  return (
    <>
      {body.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 17,
            lineHeight: 1.5,
            color: theme.ink,
            margin: i === 0 ? 0 : '14px 0 0 0',
          }}
        >
          {p}
        </p>
      ))}
      <div style={{ marginTop: body.length ? 24 : 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {bullets.map((b, i) => {
          // "Name — Area: description"
          const m = b.match(/^([^—:]+?)(?:\s*—\s*([^:]+?))?\s*:\s*(.+)$/);
          const name = m ? m[1] : b;
          const area = m ? m[2] : '';
          const body = m ? m[3] : '';
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                paddingBottom: 14,
                borderBottom: i === bullets.length - 1 ? 'none' : `0.5px solid ${theme.rule}`,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 38,
                  fontFamily: window.CN26_THEME.fonts.display,
                  fontSize: 28,
                  fontStyle: 'italic',
                  color: city.accent,
                  fontWeight: 500,
                  lineHeight: 0.9,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.display,
                    fontSize: 20,
                    fontWeight: 500,
                    color: theme.ink,
                    lineHeight: 1.1,
                    letterSpacing: -0.3,
                  }}
                >
                  {name}
                </div>
                {area && (
                  <div
                    style={{
                      fontFamily: window.CN26_THEME.fonts.sans,
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: theme.muted,
                      fontWeight: 700,
                      marginTop: 4,
                    }}
                  >
                    {area}
                  </div>
                )}
                {body && (
                  <div
                    style={{
                      fontFamily: window.CN26_THEME.fonts.serif,
                      fontSize: 15.5,
                      lineHeight: 1.45,
                      color: theme.inkSoft,
                      marginTop: 6,
                    }}
                  >
                    {body}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <AsideList section={section} city={city} theme={theme} />
    </>
  );
}

function PracticalBody({ section, city, theme }) {
  const body = section.body || [];
  const bullets = section.bullets || [];
  return (
    <>
      {body.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 17,
            lineHeight: 1.55,
            color: theme.ink,
            margin: i === 0 ? 0 : '16px 0 0',
          }}
        >
          {p}
        </p>
      ))}
      {bullets.length > 0 && (
        <div
          style={{
            marginTop: body.length ? 24 : 0,
            border: `0.5px solid ${theme.rule}`,
            borderRadius: 3,
            background: theme.paper,
            overflow: 'hidden',
          }}
        >
          {bullets.map((b, i) => {
            const { tag, text } = splitTag(b);
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '14px 16px',
                  borderBottom: i === bullets.length - 1 ? 'none' : `0.5px solid ${theme.rule}`,
                  background: tag && tag === tag.toUpperCase() && !text ? theme.bg : 'transparent',
                }}
              >
                {tag ? (
                  <div
                    style={{
                      width: text ? 88 : 'auto',
                      flexShrink: 0,
                      fontFamily: window.CN26_THEME.fonts.sans,
                      fontSize: 10,
                      letterSpacing: 1.8,
                      textTransform: 'uppercase',
                      color: city.accent,
                      fontWeight: 700,
                      paddingTop: text ? 2 : 0,
                    }}
                  >
                    {tag}
                  </div>
                ) : null}
                {text && (
                  <div
                    style={{
                      flex: 1,
                      fontFamily: window.CN26_THEME.fonts.serif,
                      fontSize: 15.5,
                      lineHeight: 1.5,
                      color: theme.inkSoft,
                    }}
                  >
                    {text}
                  </div>
                )}
                {!tag && !text && (
                  <div
                    style={{
                      flex: 1,
                      fontFamily: window.CN26_THEME.fonts.serif,
                      fontSize: 15.5,
                      lineHeight: 1.5,
                      color: theme.inkSoft,
                    }}
                  >
                    {b}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <AsideList section={section} city={city} theme={theme} />
    </>
  );
}

function TimelineBody({ section, city, theme }) {
  const body = section.body || [];
  const bullets = section.bullets || [];
  return (
    <>
      {body.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 17,
            lineHeight: 1.55,
            color: theme.ink,
            margin: i === 0 ? 0 : '14px 0 0',
          }}
        >
          {p}
        </p>
      ))}
      <div style={{ marginTop: body.length ? 20 : 0, position: 'relative', paddingLeft: 22 }}>
        <div
          style={{
            position: 'absolute',
            left: 4,
            top: 8,
            bottom: 8,
            width: 1,
            background: theme.rule,
          }}
        />
        {bullets.map((b, i) => {
          // "Aug 2 — Beijing — Copper-pot lamb: description"
          const parts = b.split(/\s+—\s+/);
          const date = parts[0];
          const place = parts[1] || '';
          const rest = parts.slice(2).join(' — ');
          const [title, ...descParts] = rest.split(': ');
          return (
            <div
              key={i}
              style={{
                position: 'relative',
                paddingBottom: 18,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -22,
                  top: 6,
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: theme.bg,
                  border: `1.5px solid ${city.accent}`,
                }}
              />
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 10,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: city.accent,
                  fontWeight: 700,
                }}
              >
                {date}{place && <span style={{ color: theme.muted }}> · {place}</span>}
              </div>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.display,
                  fontSize: 18,
                  fontWeight: 500,
                  color: theme.ink,
                  lineHeight: 1.2,
                  letterSpacing: -0.2,
                  marginTop: 4,
                }}
              >
                {title}
              </div>
              {descParts.length > 0 && (
                <div
                  style={{
                    fontFamily: window.CN26_THEME.fonts.serif,
                    fontSize: 14.5,
                    lineHeight: 1.45,
                    color: theme.inkSoft,
                    marginTop: 4,
                  }}
                >
                  {descParts.join(': ')}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <AsideList section={section} city={city} theme={theme} />
    </>
  );
}

function PhrasesBody({ section, city, theme }) {
  const body = section.body || [];
  const bullets = section.bullets || [];
  return (
    <>
      {body.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 17,
            lineHeight: 1.55,
            color: theme.ink,
            margin: i === 0 ? 0 : '14px 0 0',
          }}
        >
          {p}
        </p>
      ))}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bullets.map((b, i) => (
          <div
            key={i}
            style={{
              padding: '14px 16px',
              background: theme.paper,
              border: `0.5px solid ${theme.rule}`,
              borderRadius: 3,
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: city.accent,
              fontWeight: 700,
            }}
          >
            {b}
          </div>
        ))}
      </div>
      <AsideList section={section} city={city} theme={theme} />
    </>
  );
}

// ─────────────── Aside (merged note) block ───────────────
function AsideList({ section, city, theme }) {
  const asides = section.asides || [];
  if (asides.length === 0) return null;
  return (
    <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 }}>
      {asides.map((a, i) => (
        <div
          key={i}
          style={{
            padding: '22px 20px',
            background: theme.paper,
            border: `0.5px solid ${theme.rule}`,
            borderLeft: `3px solid ${city.accent}`,
            borderRadius: 3,
          }}
        >
          <div
            style={{
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 9.5,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: city.accent,
              fontWeight: 700,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 12, height: 1, background: city.accent }} />
            {a.title || 'Aside'}
          </div>
          {(a.body || []).map((p, j) => (
            <p
              key={j}
              style={{
                fontFamily: window.CN26_THEME.fonts.serif,
                fontStyle: 'italic',
                fontSize: 16,
                lineHeight: 1.5,
                color: theme.inkSoft,
                margin: j === 0 ? 0 : '12px 0 0',
              }}
            >
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─────────────── Helpers ───────────────

function BulletList({ items, city, theme }) {
  return (
    <ul
      style={{
        marginTop: 20,
        paddingLeft: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: 12,
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 16,
            lineHeight: 1.5,
            color: theme.ink,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: city.accent,
              marginTop: 10,
              flexShrink: 0,
            }}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function pickQuote(p) {
  if (!p) return null;
  const sentences = p.split(/(?<=[.!?])\s+/);
  const best = sentences.find((s) => s.length > 30 && s.length < 140);
  return best || null;
}

function groupByDay(bullets) {
  // Header = all uppercase, rest lowercase/mixed.
  const days = [];
  let cur = null;
  for (const b of bullets) {
    const looksLikeHeader = /^[A-Z0-9 ,—–\-.'&]{6,}$/.test(b);
    if (looksLikeHeader) {
      if (cur) days.push(cur);
      cur = { header: b, items: [] };
    } else {
      if (!cur) cur = { header: 'Day', items: [] };
      cur.items.push(b);
    }
  }
  if (cur) days.push(cur);
  return days;
}

function splitTag(line) {
  // "PM: Arrive at the airport" -> { tag: 'PM', text: 'Arrive...' }
  const m = line.match(/^([A-Z][A-Z &]{0,16}):\s*(.+)$/);
  if (m) return { tag: m[1], text: m[2] };
  // "DINNER — description"
  const m2 = line.match(/^([A-Z][A-Z &]{0,16})\s*[—–-]\s*(.+)$/);
  if (m2) return { tag: m2[1], text: m2[2] };
  return { tag: null, text: line };
}

window.CN26_STORY_BODY = {
  LongformBody, NoteBody, ScheduleBody, HighlightsBody,
  TimelineBody, PhrasesBody, PracticalBody, WalksBody,
};
