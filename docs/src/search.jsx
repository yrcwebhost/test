// Global search — overlays the device, searches all sections across all cities.

(function () {
  function SearchOverlay({ theme, onClose, onOpenSection }) {
    const { ALL_SECTIONS, CITIES } = window.CN26_DATA.useData();
    const { Icon } = window.CN26_UI;
    const { t } = window.CN26_I18N.useI18n();
    const [q, setQ] = React.useState('');
    const [filter, setFilter] = React.useState('all');
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 80);
      return () => clearTimeout(t);
    }, []);

    // Build a small search index
    const index = React.useMemo(() => {
      return ALL_SECTIONS.map((s) => {
        const haystack = [
          s.title,
          s.cityTitle,
          s.type,
          ...(s.body || []),
          ...(s.bullets || []),
          ...(s.asides || []).flatMap((a) => [a.title, ...(a.body || [])]),
        ].join(' \n ').toLowerCase();
        return { s, haystack };
      });
    }, [ALL_SECTIONS]);

    const results = React.useMemo(() => {
      if (!q || q.length < 2) return [];
      const needle = q.toLowerCase().trim();
      const hits = [];
      for (const { s, haystack } of index) {
        if (filter !== 'all' && s.cityId !== filter) continue;
        const pos = haystack.indexOf(needle);
        if (pos < 0) continue;
        // Title hits rank higher
        const titleHit = s.title.toLowerCase().includes(needle) ? 1000 : 0;
        hits.push({ s, pos, score: titleHit - pos, haystack });
      }
      hits.sort((a, b) => b.score - a.score);
      return hits.slice(0, 30);
    }, [q, index, filter]);

    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.bg,
          zIndex: 120,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 220ms cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 14px 12px',
            borderBottom: `0.5px solid ${theme.rule}`,
            background: theme.bg,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 14px',
              background: theme.paper,
              border: `0.5px solid ${theme.rule}`,
              borderRadius: 999,
            }}
          >
            <Icon name="search" size={16} color={theme.muted} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('searchPlaceholder')}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: theme.ink,
                fontFamily: window.CN26_THEME.fonts.serif,
                fontSize: 17,
                letterSpacing: -0.2,
              }}
            />
            {q && (
              <button
                onClick={() => setQ('')}
                style={{
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  cursor: 'pointer',
                  color: theme.muted,
                  display: 'flex',
                }}
              >
                <Icon name="close" size={14} stroke={2} />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              color: theme.ink,
              fontFamily: window.CN26_THEME.fonts.sans,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '8px 4px',
            }}
          >
            {t('searchCancel')}
          </button>
        </div>

        {/* City filter chips */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '10px 14px',
            overflowX: 'auto',
            borderBottom: `0.5px solid ${theme.rule}`,
          }}
        >
          {[{ id: 'all', title: t('searchAll'), accent: theme.ink }, ...CITIES].map((c) => {
            const on = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                style={{
                  flexShrink: 0,
                  padding: '6px 12px',
                  border: `0.5px solid ${on ? c.accent : theme.rule}`,
                  background: on ? c.accent : 'transparent',
                  color: on ? '#FAF5EC' : theme.inkSoft,
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontFamily: window.CN26_THEME.fonts.sans,
                  fontSize: 10.5,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {c.shortTitle || c.title}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {!q && <EmptyState theme={theme} />}
          {q && q.length < 2 && <Hint theme={theme} text={t('searchKeepTyping')} />}
          {q && q.length >= 2 && results.length === 0 && (
            <Hint theme={theme} text={t('searchNoMatches', { query: q })} />
          )}
          {results.map((r, i) => (
            <ResultRow
              key={i}
              result={r}
              query={q}
              theme={theme}
              onOpen={() => onOpenSection(r.s.cityId, r.s.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  function ResultRow({ result, query, theme, onOpen }) {
    const { t } = window.CN26_I18N.useI18n();
    const { s, haystack } = result;
    // Produce a snippet: ~120 chars around the first hit
    const needle = query.toLowerCase().trim();
    const pos = haystack.indexOf(needle);
    const start = Math.max(0, pos - 40);
    const end = Math.min(haystack.length, pos + needle.length + 80);
    const raw = haystack.slice(start, end).trim();
    const snippet = (start > 0 ? '…' : '') + raw + (end < haystack.length ? '…' : '');

    return (
      <button
        onClick={onOpen}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'left',
          padding: '14px 18px',
          border: 'none',
          borderBottom: `0.5px solid ${theme.rule}`,
          background: 'transparent',
          cursor: 'pointer',
          color: theme.ink,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 9,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            color: s.accent,
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          <span style={{ width: 14, height: 1, background: s.accent }} />
          {s.cityTitle} · {window.CN26_I18N.sectionTypeLabel(s.type, t)}
        </div>
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.display,
            fontSize: 19,
            lineHeight: 1.2,
            fontWeight: 500,
            letterSpacing: -0.4,
            color: theme.ink,
            marginBottom: 4,
          }}
          dangerouslySetInnerHTML={{ __html: highlight(s.title, query, s.accent) }}
        />
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.serif,
            fontSize: 13.5,
            lineHeight: 1.45,
            color: theme.inkSoft,
          }}
          dangerouslySetInnerHTML={{ __html: highlight(snippet, query, s.accent) }}
        />
      </button>
    );
  }

  function highlight(text, query, color) {
    if (!text || !query) return escapeHTML(text || '');
    const re = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    return escapeHTML(text).replace(re, `<mark style="background:${color}33;color:inherit;padding:0 2px;border-radius:2px;">$1</mark>`);
  }
  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function EmptyState({ theme }) {
    const { t } = window.CN26_I18N.useI18n();
    const suggestions = ['Forbidden City', 'Erhai', 'Panda Base', 'Hot pot', 'Jade Dragon', 'Naxi'];
    return (
      <div style={{ padding: '24px 22px' }}>
        <div
          style={{
            fontFamily: window.CN26_THEME.fonts.sans,
            fontSize: 9,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: theme.muted,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          {t('searchSuggestions')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {suggestions.map((s) => (
            <div
              key={s}
              style={{
                padding: '7px 12px',
                border: `0.5px solid ${theme.rule}`,
                background: theme.paper,
                borderRadius: 999,
                fontFamily: window.CN26_THEME.fonts.serif,
                fontStyle: 'italic',
                fontSize: 13,
                color: theme.inkSoft,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Hint({ theme, text }) {
    return (
      <div
        style={{
          padding: '32px 22px',
          fontFamily: window.CN26_THEME.fonts.serif,
          fontStyle: 'italic',
          fontSize: 15,
          color: theme.muted,
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    );
  }

  window.CN26_SEARCH = { SearchOverlay };
})();
