(function () {
  const I18nContext = React.createContext(null);

  const DICTIONARY = {
    en: {
      langShort: 'EN',
      langName: 'English',
      langEnglish: 'English',
      langGerman: 'German',
      langChinese: 'Chinese',
      desktopTitle: 'China 2026 · Travel Companion',
      desktopSubtitle: 'A field companion for the 15-day journey.',
      homeSeasonMeta: 'Summer · 15 days · 5 cities',
      homeTagline: 'A field companion for the journey.',
      homeCoverStory: 'The Cover Story',
      homeItinerary: 'The Itinerary',
      homeFiveChapters: 'Five chapters',
      homeIntro: 'Fifteen days across the north-south axis — imperial courts, highland lakes, and Sichuan tea houses.',
      toggleTheme: 'Toggle day/night',
      tabHome: 'Issue',
      tabCities: 'Cities',
      tabItinerary: 'Days',
      tabGallery: 'Gallery',
      tabSaved: 'Saved',
      searchOpen: 'Search',
      searchPlaceholder: 'Search the guide…',
      searchCancel: 'Cancel',
      searchAll: 'All',
      searchEmptyTitle: 'Search the guide',
      searchEmptyBody: 'Look up places, meals, sights, or practical notes across the whole trip.',
      searchSuggestions: 'Try searching for',
      searchKeepTyping: 'Keep typing…',
      searchNoMatches: 'No matches for "{query}"',
      galleryKicker: 'The Plates',
      galleryTitle: 'Gallery',
      gallerySummary: '{photos} photographs across {cities} cities.',
      photoHint: 'Pinch to zoom',
      savedKicker: 'Your Reading List',
      savedTitle: 'Saved',
      savedEmpty: 'Tap the bookmark on any story to tuck it away for later. Your reading list lives on this device.',
      savedFallback: 'Saved for later.',
      savedRemove: 'Remove story from saved',
      storySave: 'Save story',
      storyRemove: 'Remove story from saved',
      storyContinue: 'Continue reading →',
      cityChapter: 'Chapter',
      cityPhotography: 'Photography',
      cityInsideChapter: 'Inside this chapter',
      cityContents: 'Contents',
      cityReadMin: '{count} min',
      itineraryKicker: 'China 2026 · Field Itinerary',
      itineraryTitleMain: 'Fifteen',
      itineraryTitleAccent: 'days.',
      itineraryIntro: 'A day-by-day read across Beijing, Kunming, Dali, Lijiang, and Chengdu.',
      itineraryDay: 'Day',
      itineraryPrev: '← Previous day',
      itineraryNext: 'Next day →',
      itineraryNoNotes: 'No specific itinerary notes for this day.',
      storyBodyPlate: 'Plate',
      storyBodyAside: 'Editorial aside',
      contentDayLabel: 'Day {count}',
      sectionOverview: 'Overview',
      sectionAside: 'Aside',
      sectionItinerary: 'Itinerary',
      sectionHighlights: 'Highlights',
      sectionWalk: 'A Walk',
      sectionFood: 'Food',
      sectionFieldNotes: 'Field Notes',
      sectionCulture: 'Culture',
      sectionTimeline: 'Timeline',
      sectionLanguage: 'Language',
    },
    de: {
      langShort: 'DE',
      langName: 'Deutsch',
      langEnglish: 'Englisch',
      langGerman: 'Deutsch',
      langChinese: 'Chinesisch',
      desktopTitle: 'China 2026 · Reisebegleiter',
      desktopSubtitle: 'Ein Begleiter für die 15-tägige Reise.',
      homeSeasonMeta: 'Sommer · 15 Tage · 5 Städte',
      homeTagline: 'Ein Begleiter für die Reise.',
      homeCoverStory: 'Titelgeschichte',
      homeItinerary: 'Die Route',
      homeFiveChapters: 'Fünf Kapitel',
      homeIntro: 'Fünfzehn Tage entlang der Nord-Süd-Achse — Kaiserhöfe, Hochlandseen und Teehäuser in Sichuan.',
      toggleTheme: 'Tag-/Nachtmodus umschalten',
      tabHome: 'Ausgabe',
      tabCities: 'Städte',
      tabItinerary: 'Tage',
      tabGallery: 'Galerie',
      tabSaved: 'Gespeichert',
      searchOpen: 'Suchen',
      searchPlaceholder: 'Im Guide suchen…',
      searchCancel: 'Abbrechen',
      searchAll: 'Alle',
      searchEmptyTitle: 'Guide durchsuchen',
      searchEmptyBody: 'Suche nach Orten, Essen, Sehenswürdigkeiten oder praktischen Hinweisen für die ganze Reise.',
      searchSuggestions: 'Suche zum Beispiel nach',
      searchKeepTyping: 'Weiter tippen…',
      searchNoMatches: 'Keine Treffer für „{query}“',
      galleryKicker: 'Die Bildstrecke',
      galleryTitle: 'Galerie',
      gallerySummary: '{photos} Fotografien aus {cities} Städten.',
      photoHint: 'Zum Zoomen spreizen',
      savedKicker: 'Deine Leseliste',
      savedTitle: 'Gespeichert',
      savedEmpty: 'Tippe auf das Lesezeichen bei einer Story, um sie für später zu speichern. Deine Leseliste bleibt auf diesem Gerät.',
      savedFallback: 'Für später gespeichert.',
      savedRemove: 'Story aus Gespeichert entfernen',
      storySave: 'Story speichern',
      storyRemove: 'Story aus Gespeichert entfernen',
      storyContinue: 'Weiterlesen →',
      cityChapter: 'Kapitel',
      cityPhotography: 'Fotografie',
      cityInsideChapter: 'In diesem Kapitel',
      cityContents: 'Inhalt',
      cityReadMin: '{count} Min.',
      itineraryKicker: 'China 2026 · Reiseroute',
      itineraryTitleMain: 'Fünfzehn',
      itineraryTitleAccent: 'tage.',
      itineraryIntro: 'Eine Tageslektüre durch Beijing, Kunming, Dali, Lijiang und Chengdu.',
      itineraryDay: 'Tag',
      itineraryPrev: '← Vorheriger Tag',
      itineraryNext: 'Nächster Tag →',
      itineraryNoNotes: 'Für diesen Tag gibt es keine spezifischen Notizen.',
      storyBodyPlate: 'Bild',
      storyBodyAside: 'Redaktionelle Randnotiz',
      contentDayLabel: 'Tag {count}',
      sectionOverview: 'Überblick',
      sectionAside: 'Randnotiz',
      sectionItinerary: 'Route',
      sectionHighlights: 'Höhepunkte',
      sectionWalk: 'Spaziergang',
      sectionFood: 'Essen',
      sectionFieldNotes: 'Praxishinweise',
      sectionCulture: 'Kultur',
      sectionTimeline: 'Zeitlinie',
      sectionLanguage: 'Sprache',
    },
    zh: {
      langShort: '中文',
      langName: '中文',
      langEnglish: '英文',
      langGerman: '德文',
      langChinese: '中文',
      desktopTitle: '中国 2026 · 旅行伴侣',
      desktopSubtitle: '这是一份陪伴 15 天旅程的随身手册。',
      homeSeasonMeta: '夏季 · 15天 · 5座城市',
      homeTagline: '一路同行的旅行手册。',
      homeCoverStory: '封面故事',
      homeItinerary: '行程',
      homeFiveChapters: '五个章节',
      homeIntro: '十五天纵贯南北轴线——皇城宫阙、高原湖泊与四川茶馆。',
      toggleTheme: '切换日间/夜间模式',
      tabHome: '首页',
      tabCities: '城市',
      tabItinerary: '天数',
      tabGallery: '图库',
      tabSaved: '收藏',
      searchOpen: '搜索',
      searchPlaceholder: '搜索这本旅行手册…',
      searchCancel: '取消',
      searchAll: '全部',
      searchEmptyTitle: '搜索手册',
      searchEmptyBody: '搜索地点、美食、景点或整段旅程中的实用信息。',
      searchSuggestions: '可以试着搜索',
      searchKeepTyping: '继续输入…',
      searchNoMatches: '没有找到“{query}”的结果',
      galleryKicker: '图集',
      galleryTitle: '图库',
      gallerySummary: '{photos} 张照片，覆盖 {cities} 座城市。',
      photoHint: '双指缩放',
      savedKicker: '你的阅读清单',
      savedTitle: '收藏',
      savedEmpty: '在任意故事页点击书签即可稍后阅读。你的收藏只保存在这台设备上。',
      savedFallback: '已保存以便稍后阅读。',
      savedRemove: '从收藏中移除故事',
      storySave: '收藏故事',
      storyRemove: '从收藏中移除故事',
      storyContinue: '继续阅读 →',
      cityChapter: '章节',
      cityPhotography: '摄影',
      cityInsideChapter: '本章内容',
      cityContents: '目录',
      cityReadMin: '{count} 分钟',
      itineraryKicker: '中国 2026 · 行程总览',
      itineraryTitleMain: '十五',
      itineraryTitleAccent: '天。',
      itineraryIntro: '按天阅读北京、昆明、大理、丽江与成都的旅程。',
      itineraryDay: '第',
      itineraryPrev: '← 前一天',
      itineraryNext: '后一天 →',
      itineraryNoNotes: '这一天暂无具体行程备注。',
      storyBodyPlate: '图版',
      storyBodyAside: '编者旁注',
      contentDayLabel: '第 {count} 天',
      sectionOverview: '概览',
      sectionAside: '旁注',
      sectionItinerary: '行程',
      sectionHighlights: '亮点',
      sectionWalk: '步行路线',
      sectionFood: '美食',
      sectionFieldNotes: '实用信息',
      sectionCulture: '文化',
      sectionTimeline: '时间线',
      sectionLanguage: '语言',
    },
  };

  function format(template, vars) {
    return String(template || '').replace(/\{(\w+)\}/g, (_, key) => vars && vars[key] != null ? vars[key] : '');
  }

  function translate(lang, key, vars) {
    const table = DICTIONARY[lang] || DICTIONARY.en;
    const fallback = DICTIONARY.en[key] || key;
    return format(table[key] || fallback, vars);
  }

  function sectionTypeLabel(type, t) {
    const map = {
      overview: 'sectionOverview',
      note: 'sectionAside',
      schedule: 'sectionItinerary',
      highlights: 'sectionHighlights',
      walks: 'sectionWalk',
      food: 'sectionFood',
      practical: 'sectionFieldNotes',
      culture: 'sectionCulture',
      timeline: 'sectionTimeline',
      phrases: 'sectionLanguage',
    };
    return t(map[type] || 'sectionOverview');
  }

  function useI18n() {
    return React.useContext(I18nContext);
  }

  function LanguageInlineControl({ theme }) {
    const { lang, setLang, t } = useI18n();
    const options = [
      { id: 'en', label: 'EN' },
      { id: 'de', label: 'DE' },
      { id: 'zh', label: '中文' },
    ];

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: 3,
          borderRadius: 999,
          background: theme.bg + '22',
          border: `0.5px solid ${theme.rule}`,
          flexShrink: 0,
        }}
      >
        {options.map((option) => {
          const on = lang === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setLang(option.id)}
              style={{
                border: 'none',
                background: on ? theme.ink : 'transparent',
                color: on ? theme.paper : theme.muted,
                minWidth: option.id === 'zh' ? 38 : 30,
                height: 30,
                padding: '0 8px',
                borderRadius: 999,
                fontFamily: window.CN26_THEME.fonts.sans,
                fontSize: option.id === 'zh' ? 10.5 : 10,
                fontWeight: 700,
                letterSpacing: option.id === 'zh' ? 0 : 0.8,
                cursor: 'pointer',
              }}
              aria-label={option.id === 'en' ? t('langEnglish') : option.id === 'de' ? t('langGerman') : t('langChinese')}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  window.CN26_I18N = { I18nContext, useI18n, translate, sectionTypeLabel, LanguageInlineControl };
})();
