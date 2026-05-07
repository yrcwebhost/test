// Gallery grid + pinch-zoom photo viewer

function GalleryScreen({ theme, onOpenPhoto }) {
  const { CITIES, ALL_PHOTOS } = window.CN26_DATA.useData();
  const { Kicker } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? ALL_PHOTOS : ALL_PHOTOS.filter((p) => p.cityId === filter);

  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 72px) 22px 18px' }}>
        <Kicker theme={theme}>{t('galleryKicker')}</Kicker>
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 44,
            lineHeight: 0.95,
            color: theme.ink,
            fontWeight: 500,
            letterSpacing: -1,
            marginTop: 10,
          }}
        >
          {t('galleryTitle')}
        </div>
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontStyle: 'italic',
            fontSize: 16,
            color: theme.inkSoft,
            marginTop: 6,
          }}
        >
          {t('gallerySummary', { photos: filtered.length, cities: new Set(filtered.map((p) => p.cityId)).size })}
        </div>
      </div>

      {/* Filter pills */}
      <div
        style={{
          padding: '0 22px',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          marginBottom: 18,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {[{ id: 'all', label: t('searchAll') }, ...CITIES.map((c) => ({ id: c.id, label: c.title, color: c.accent }))].map(
          (f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  border: `0.5px solid ${on ? (f.color || theme.ink) : theme.rule}`,
                  background: on ? f.color || theme.ink : 'transparent',
                  color: on ? '#FFF' : theme.ink,
                  padding: '8px 14px',
                  borderRadius: 999,
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {f.label}
              </button>
            );
          }
        )}
      </div>

      {/* Mosaic — alternating sizes for editorial rhythm */}
      <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {chunk(filtered, 3).map((row, ri) => {
          const pattern = ri % 2 === 0 ? [1.6, 1] : [1, 1.6];
          return (
            <div key={ri} style={{ display: 'flex', gap: 8 }}>
              <PhotoCell photo={row[0]} flex={pattern[0]} ratio={1.25} theme={theme} onOpen={onOpenPhoto} />
              <div style={{ flex: pattern[1], display: 'flex', flexDirection: 'column', gap: 8 }}>
                {row[1] && <PhotoCell photo={row[1]} ratio={0.62} theme={theme} onOpen={onOpenPhoto} />}
                {row[2] && <PhotoCell photo={row[2]} ratio={0.62} theme={theme} onOpen={onOpenPhoto} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function PhotoCell({ photo, flex = 1, ratio = 1, theme, onOpen }) {
  if (!photo) return null;
  return (
    <button
      onClick={() => onOpen(photo.src, photo.label)}
      style={{
        flex,
        border: 'none',
        padding: 0,
        background: theme.ruleSoft,
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 2,
        overflow: 'hidden',
        aspectRatio: ratio,
      }}
    >
      <img
        src={photo.src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 40%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 10,
          bottom: 9,
          color: '#FFF',
          fontFamily: window.CN26_THEME.fonts.sans,
          fontSize: 10,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: photo.accent,
          }}
        />
        {photo.label}
      </div>
    </button>
  );
}

// ─────────────── Photo viewer (pinch-zoom) ───────────────

function PhotoViewer({ src, label, onClose }) {
  const { t } = window.CN26_I18N.useI18n();
  const [scale, setScale] = React.useState(1);
  const [tx, setTx] = React.useState(0);
  const [ty, setTy] = React.useState(0);
  const state = React.useRef({
    touches: null,
    startDist: 0,
    startScale: 1,
    lastX: 0,
    lastY: 0,
    panStartX: 0,
    panStartY: 0,
  });

  const reset = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  const dist = (a, b) => {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      state.current.startDist = dist(e.touches[0], e.touches[1]);
      state.current.startScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      state.current.panStartX = e.touches[0].clientX - tx;
      state.current.panStartY = e.touches[0].clientY - ty;
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const d = dist(e.touches[0], e.touches[1]);
      const next = Math.max(1, Math.min(4, state.current.startScale * (d / state.current.startDist)));
      setScale(next);
    } else if (e.touches.length === 1 && scale > 1) {
      e.preventDefault();
      setTx(e.touches[0].clientX - state.current.panStartX);
      setTy(e.touches[0].clientY - state.current.panStartY);
    }
  };

  const onDoubleClick = (e) => {
    if (scale > 1) reset();
    else setScale(2);
  };

  // Mouse-wheel zoom (desktop)
  const onWheel = (e) => {
    e.preventDefault();
    const next = Math.max(1, Math.min(4, scale + (e.deltaY < 0 ? 0.12 : -0.12)));
    setScale(next);
    if (next === 1) { setTx(0); setTy(0); }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.96)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 200ms',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onDoubleClick={onDoubleClick}
        onWheel={onWheel}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          touchAction: 'none',
          cursor: scale > 1 ? 'grab' : 'zoom-in',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transition: state.current.touches ? 'none' : 'transform 180ms cubic-bezier(.2,.8,.2,1)',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Top chrome */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 0px) + 54px)',
          left: 14,
          right: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFF',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            opacity: 0.75,
            fontWeight: 600,
          }}
        >
          {label || t('galleryTitle')} · {t('photoHint')}
        </div>
        <button
          onClick={onClose}
          style={{
            pointerEvents: 'auto',
            width: 36,
            height: 36,
            borderRadius: 999,
            border: 'none',
            background: 'rgba(255,255,255,0.12)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <window.CN26_UI.Icon name="close" size={18} />
        </button>
      </div>

      {/* Bottom scale indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFF',
          fontFamily: window.CN26_THEME.fonts.mono,
          fontSize: 11,
          letterSpacing: 1,
          opacity: 0.6,
        }}
      >
        {scale.toFixed(2)}×
      </div>
    </div>
  );
}

// Saved tab
function SavedScreen({ theme, savedIds, onOpenSection, onToggleSaved }) {
  const { ALL_SECTIONS, CITIES } = window.CN26_DATA.useData();
  const { Kicker, Icon } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();
  const sectionMap = new Map(ALL_SECTIONS.map((s) => [`${s.cityId}:${s.id}`, s]));
  const cityMap = new Map(CITIES.map((c) => [c.id, c]));
  const saved = savedIds.map((id) => sectionMap.get(id)).filter(Boolean);
  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 72px) 22px 18px' }}>
        <Kicker theme={theme}>{t('savedKicker')}</Kicker>
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 44,
            lineHeight: 0.95,
            color: theme.ink,
            fontWeight: 500,
            letterSpacing: -1,
            marginTop: 10,
          }}
        >
          {t('savedTitle')}
        </div>
      </div>
      {saved.length === 0 ? (
        <div
          style={{
            margin: '8px 22px',
            padding: '24px 22px',
            border: `0.5px dashed ${theme.rule}`,
            borderRadius: 3,
            textAlign: 'center',
            fontFamily: window.CN26_THEME.fonts.serif,
            fontStyle: 'italic',
            fontSize: 15.5,
            color: theme.muted,
            lineHeight: 1.5,
          }}
        >
          {t('savedEmpty')}
        </div>
      ) : (
        <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {saved.map((s) => {
            const city = cityMap.get(s.cityId);
            return (
            <div
              key={`${s.cityId}:${s.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 8,
                border: `0.5px solid ${theme.rule}`,
                background: theme.paper,
                borderRadius: 3,
                textAlign: 'left',
              }}
            >
              <button
                onClick={() => onOpenSection(s.cityId, s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  flex: 1,
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <img
                  src={s.image || (city && city.hero)}
                  alt=""
                  style={{ width: 80, height: 100, objectFit: 'cover', flexShrink: 0, borderRadius: 2 }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: window.CN26_THEME.fonts.sans,
                      fontSize: 10,
                      letterSpacing: 1.8,
                      textTransform: 'uppercase',
                      color: s.accent,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {s.cityTitle} · {window.CN26_I18N.sectionTypeLabel(s.type, t)}
                  </div>
                  <div
                    style={{
                      fontFamily: window.CN26_THEME.fonts.display,
                      fontSize: 22,
                      color: theme.ink,
                      fontWeight: 500,
                      lineHeight: 1.05,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontFamily: window.CN26_THEME.fonts.serif,
                      fontStyle: 'italic',
                      fontSize: 13,
                      color: theme.muted,
                      marginTop: 4,
                    }}
                  >
                    {savedStoryPreview(s, t)}
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => {
                  onToggleSaved(`${s.cityId}:${s.id}`);
                }}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: `0.5px solid ${theme.rule}`,
                  background: 'transparent',
                  color: s.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                aria-label={t('savedRemove')}
              >
                <Icon name="bookmarkFilled" size={16} />
              </button>
            </div>
          );
          })}
        </div>
      )}
    </div>
  );
}

function savedStoryPreview(section, t) {
  if (section.subtitle) return section.subtitle;
  if (section.body && section.body[0]) return trimPreview(section.body[0], 110);
  if (section.bullets && section.bullets[0]) return trimPreview(section.bullets[0], 110);
  return t('savedFallback');
}

function trimPreview(text, max) {
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
}

// Cities index (simple list, all 5)
function CitiesScreen({ theme, onOpenCity }) {
  const { CITIES } = window.CN26_DATA.useData();
  const { Kicker, Icon } = window.CN26_UI;
  const { t } = window.CN26_I18N.useI18n();
  const cityList = CITIES.filter((c) => c.category === 'city');
  return (
    <div style={{ paddingBottom: 120 }}>
      <div style={{ padding: 'calc(env(safe-area-inset-top, 0px) + 72px) 22px 18px' }}>
        <Kicker theme={theme}>{t('tabCities')}</Kicker>
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 44,
            lineHeight: 0.95,
            color: theme.ink,
            fontWeight: 500,
            letterSpacing: -1,
            marginTop: 10,
          }}
        >
          {t('tabCities')}
        </div>
      </div>
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {cityList.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onOpenCity(c.id)}
            style={{
              position: 'relative',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              height: 130,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <img
              src={c.hero}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 80%)',
              }}
            />
            <div style={{ position: 'absolute', left: 18, top: 14, color: '#FFF' }}>
              <div
                style={{
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 10,
                  letterSpacing: 2,
                  fontWeight: 600,
                  opacity: 0.85,
                  textTransform: 'uppercase',
                }}
              >
                № {String(i + 1).padStart(2, '0')} · {c.dateLabel}
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 18,
                bottom: 14,
                color: '#FFF',
                fontFamily: window.CN26_THEME.fonts.display,
                fontSize: 34,
                fontWeight: 500,
                letterSpacing: -0.5,
                lineHeight: 1,
              }}
            >
              {c.title}
              <span
                style={{
                  fontFamily: window.CN26_THEME.fonts.serif,
                  fontStyle: 'italic',
                  fontSize: 14,
                  fontWeight: 400,
                  marginLeft: 10,
                  opacity: 0.85,
                }}
              >
                {c.kicker}
              </span>
            </div>
            <div
              style={{
                position: 'absolute',
                right: 14,
                bottom: 14,
                width: 32,
                height: 32,
                borderRadius: 999,
                background: c.accent,
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="chevronR" size={14} color="#FFF" stroke={2.3} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

window.CN26_EXTRA = { GalleryScreen, PhotoViewer, SavedScreen, CitiesScreen };
