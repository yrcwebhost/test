// Merge raw guide content (window.CN26_RAW) with editorial metadata
// (Chinese characters, kicker, hero image, gallery thumbnails).

(function () {
  const RAW = window.CN26_RAW;
  const TRANSLATIONS = window.CN26_CONTENT_TRANSLATIONS || {};

  // Editorial metadata per chapter — things the raw TS doesn't carry.
  const META = {
    beijing: {
      chinese: '北京',
      seal: '京',
      kicker: 'The Imperial Capital',
      accentSoft: '#C87A6E',
      hero: 'assets/guide/beijing-hero.png',
      lede: 'Three days trace that authority through the capital: palace courts, lakeside gardens, hutong water lanes, and incense-heavy temple halls — before the route breaks south-west towards Yunnan.',
      gallery: [
        { src: 'assets/guide/beijing-hero.png', label: 'Forbidden City axis' },
        { src: 'assets/guide/gallery/beijing/forbidden_city_aerial.png', label: 'Palace from above' },
        { src: 'assets/guide/gallery/beijing/temple_heaven.png', label: 'Temple of Heaven' },
        { src: 'assets/guide/gallery/beijing/greatwall.png', label: 'Great Wall' },
        { src: 'assets/guide/gallery/beijing/summer_palace_lake.png', label: 'Summer Palace' },
        { src: 'assets/guide/gallery/beijing/jingshan_panorama.png', label: 'Jingshan panorama' },
        { src: 'assets/guide/gallery/beijing/hutong_alley_dusk.png', label: 'Hutong at dusk' },
        { src: 'assets/guide/gallery/beijing/bell_tower_dusk.png', label: 'Bell Tower' },
        { src: 'assets/guide/gallery/beijing/shichahai.png', label: 'Shichahai' },
        { src: 'assets/guide/gallery/beijing/yonghegong_incense.png', label: 'Yonghegong incense' },
        { src: 'assets/guide/gallery/beijing/seventeen_arch_bridge.png', label: 'Seventeen-Arch Bridge' },
        { src: 'assets/guide/gallery/beijing/siji_minfu_duck.png', label: 'Peking duck' },
      ],
    },
    kunming: {
      chinese: '昆明',
      seal: '昆',
      kicker: 'The Spring City',
      accent: '#5E7A3A',
      accentSoft: '#8DA968',
      hero: 'assets/guide/kunming-hero.png',
      lede: 'Green Lake, the Military Academy’s mustard yellow walls, and mushroom hotpots with strict timers on the table. This is Yunnan’s opening chapter.',
      gallery: [
        { src: 'assets/guide/gallery/kunming/green_lake_opener.png', label: 'Green Lake' },
        { src: 'assets/guide/gallery/kunming/dianchi_seagulls.png', label: 'Dianchi gulls' },
        { src: 'assets/guide/gallery/kunming/western_hills_view.png', label: 'Western Hills' },
        { src: 'assets/guide/gallery/kunming/jinmabiji_night.png', label: 'Jinmabiji at night' },
        { src: 'assets/guide/gallery/kunming/zhengyi_road.png', label: 'Zhengyi Road' },
        { src: 'assets/guide/gallery/kunming/sanshi_jie_street.png', label: 'Sanshi Jie' },
        { src: 'assets/guide/gallery/kunming/kunming_teahouse.png', label: 'Teahouse' },
        { src: 'assets/guide/gallery/kunming/mushroom_hotpot.png', label: 'Mushroom hotpot' },
        { src: 'assets/guide/gallery/kunming/cross_bridge_noodles.png', label: 'Cross-bridge noodles' },
        { src: 'assets/guide/gallery/kunming/steam_pot_chicken.png', label: 'Steam-pot chicken' },
        { src: 'assets/guide/gallery/kunming/dai_food_spread.png', label: 'Dai spread' },
      ],
    },
    dali: {
      chinese: '大理',
      seal: '理',
      kicker: 'Erhai & Cangshan',
      accent: '#2F6F8F',
      accentSoft: '#6EA3BD',
      hero: 'assets/guide/dali-hero.png',
      lede: 'Four days around Erhai: Xizhou for breakfast baba, Shuanglang for sunset, Cangshan’s ridge for the long view.',
      gallery: [
        { src: 'assets/guide/gallery/dali/erhai_sunset.png', label: 'Erhai sunset' },
        { src: 'assets/guide/gallery/dali/erhai_fisherman.png', label: 'Erhai fisherman' },
        { src: 'assets/guide/gallery/dali/xizhou_village_main.png', label: 'Xizhou village' },
        { src: 'assets/guide/gallery/dali/xizhou_baba_food.png', label: 'Xizhou baba' },
        { src: 'assets/guide/gallery/dali/cangshan_mountain.png', label: 'Cangshan ridge' },
        { src: 'assets/guide/gallery/dali/three_pagodas.png', label: 'Three Pagodas' },
        { src: 'assets/guide/gallery/dali/chongshengsi_pagodas.png', label: 'Chongsheng Temple' },
        { src: 'assets/guide/gallery/dali/dali_old_town_lane.png', label: 'Old Town lane' },
        { src: 'assets/guide/gallery/dali/bai_architecture_detail.png', label: 'Bai architecture' },
        { src: 'assets/guide/gallery/dali/bai_minority_dress.png', label: 'Bai dress' },
        { src: 'assets/guide/gallery/dali/torch_procession.png', label: 'Torch festival' },
        { src: 'assets/guide/gallery/dali/rushan_cheese.png', label: 'Rushan cheese' },
      ],
    },
    lijiang: {
      chinese: '丽江',
      seal: '丽',
      kicker: 'Naxi Country',
      accent: '#4A5D7A',
      accentSoft: '#8697B0',
      hero: 'assets/guide/lijiang-hero.png',
      lede: 'Four days between the old town lanes, Shuhe’s quieter canals, Baisha’s murals, and the ice cap above it all.',
      gallery: [
        { src: 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.png', label: 'Jade Dragon Snow Mountain' },
        { src: 'assets/guide/gallery/lijiang/mountain_peaks_view.png', label: 'Snow ridge' },
        { src: 'assets/guide/gallery/lijiang/lijiang_dawn_rooftops.png', label: 'Old town at dawn' },
        { src: 'assets/guide/gallery/lijiang/lijiang_old_town_canals.png', label: 'Old town canals' },
        { src: 'assets/guide/gallery/lijiang/shuhe_quiet_lane.png', label: 'Shuhe lane' },
        { src: 'assets/guide/gallery/lijiang/shuhe_night.png', label: 'Shuhe night' },
        { src: 'assets/guide/gallery/lijiang/naxi_elderly.png', label: 'Naxi elder' },
        { src: 'assets/guide/gallery/lijiang/naxi_outfit.png', label: 'Naxi dress' },
        { src: 'assets/guide/gallery/lijiang/naxi_instruments.png', label: 'Naxi music' },
        { src: 'assets/guide/gallery/lijiang/dongba_script.png', label: 'Dongba script' },
        { src: 'assets/guide/gallery/lijiang/cured_pork_ribs.png', label: 'Cured pork ribs' },
      ],
    },
    chengdu: {
      chinese: '成都',
      seal: '蜀',
      kicker: 'Land of Abundance',
      accent: '#B86D3B',
      accentSoft: '#D69975',
      hero: 'assets/guide/chengdu-hero.png',
      lede: 'Pandas, Wuhou Shrine, Wenshu Monastery, and a final Jinli evening under lantern light.',
      gallery: [
        { src: 'assets/guide/gallery/chengdu/panda_bamboo_hero.png', label: 'Giant panda' },
        { src: 'assets/guide/gallery/chengdu/panda_tree.png', label: 'Panda in a tree' },
        { src: 'assets/guide/gallery/chengdu/red_panda_walkway.png', label: 'Red panda' },
        { src: 'assets/guide/gallery/chengdu/wenshu_temple.png', label: 'Wenshu Monastery' },
        { src: 'assets/guide/gallery/chengdu/red_wall_bamboo_alley.png', label: 'Red wall bamboo alley' },
        { src: 'assets/guide/gallery/chengdu/kuan_alley_courtyard.png', label: 'Kuanzhai courtyard' },
        { src: 'assets/guide/gallery/chengdu/peoples_park_teahouse.png', label: 'People\u2019s Park teahouse' },
        { src: 'assets/guide/gallery/chengdu/jinli_lanterns.png', label: 'Jinli lanterns' },
        { src: 'assets/guide/gallery/chengdu/jinli_lanterns_2.png', label: 'Jinli at night' },
        { src: 'assets/guide/gallery/chengdu/sichuan_hotpot.png', label: 'Sichuan hotpot' },
        { src: 'assets/guide/gallery/chengdu/sweet_water_noodles.png', label: 'Sweet-water noodles' },
        { src: 'assets/guide/gallery/chengdu/face_changing_opera.png', label: 'Face-changing opera' },
      ],
    },
    food: {
      chinese: '食',
      seal: '食',
      kicker: 'A Thematic Index',
      accent: '#8C5A2B',
      accentSoft: '#B78858',
      hero: 'assets/guide/food-hero.png',
      lede: 'From copper-pot lamb to red-oil hotpot — the dining arc of the route.',
      gallery: [
        { src: 'assets/guide/food-hero.png', label: 'Dining arc' },
        { src: 'assets/guide/gallery/beijing/siji_minfu_duck.png', label: 'Peking duck' },
        { src: 'assets/guide/gallery/beijing/copper_pot_detail.png', label: 'Copper pot' },
        { src: 'assets/guide/gallery/kunming/mushroom_hotpot.png', label: 'Yunnan mushrooms' },
        { src: 'assets/guide/gallery/kunming/steam_pot_chicken.png', label: 'Steam-pot chicken' },
        { src: 'assets/guide/gallery/kunming/cross_bridge_noodles.png', label: 'Cross-bridge noodles' },
        { src: 'assets/guide/gallery/dali/xizhou_baba_food.png', label: 'Xizhou baba' },
        { src: 'assets/guide/gallery/dali/rushan_cheese.png', label: 'Rushan cheese' },
        { src: 'assets/guide/gallery/lijiang/cured_pork_ribs.png', label: 'Cured pork ribs' },
        { src: 'assets/guide/gallery/chengdu/sichuan_hotpot.png', label: 'Sichuan hotpot' },
        { src: 'assets/guide/gallery/chengdu/sweet_water_noodles.png', label: 'Sweet-water noodles' },
        { src: 'assets/guide/gallery/chengdu/fuqi_feipian.png', label: 'Fuqi feipian' },
      ],
    },
    practical: {
      chinese: '備',
      seal: '備',
      kicker: 'How to Travel This',
      accent: '#4A6B82',
      accentSoft: '#7A96AC',
      hero: 'assets/guide/beijing-map.png',
      lede: 'Payment, rail, reservations, translation, and the apps that replace cash — handled before departure, everything else disappears into the background.',
      gallery: [
        { src: 'assets/guide/beijing-map.png', label: 'Beijing map' },
        { src: 'assets/guide/dali-map.png', label: 'Dali map' },
        { src: 'assets/guide/lijiang-map.png', label: 'Lijiang map' },
      ],
    },
  };

  // Image pool — map of keyword → image path. Keys are lowercase tokens to match against section titles.
  const IMAGE_POOL = {
    // Beijing — landmarks
    'forbidden city': 'assets/guide/gallery/beijing/forbidden_city_aerial.png',
    'palace museum': 'assets/guide/gallery/beijing/forbidden_city_aerial.png',
    'imperial': 'assets/guide/beijing-hero.png',
    'tiananmen': 'assets/guide/beijing-hero.png',
    'temple of heaven': 'assets/guide/gallery/beijing/temple_heaven.png',
    'tiantan': 'assets/guide/gallery/beijing/temple_heaven.png',
    'great wall': 'assets/guide/gallery/beijing/greatwall.png',
    'mutianyu': 'assets/guide/gallery/beijing/greatwall.png',
    'badaling': 'assets/guide/gallery/beijing/greatwall.png',
    'jinshanling': 'assets/guide/gallery/beijing/greatwall.png',
    'summer palace': 'assets/guide/gallery/beijing/summer_palace_lake.png',
    'kunming lake': 'assets/guide/gallery/beijing/summer_palace_lake.png',
    'seventeen': 'assets/guide/gallery/beijing/seventeen_arch_bridge.png',
    'long corridor': 'assets/guide/gallery/beijing/summer_palace_lake.png',
    'jingshan': 'assets/guide/gallery/beijing/jingshan_panorama.png',
    'coal hill': 'assets/guide/gallery/beijing/jingshan_panorama.png',
    'hutong': 'assets/guide/gallery/beijing/hutong_alley_dusk.png',
    'alley': 'assets/guide/gallery/beijing/hutong_alley_dusk.png',
    'bell tower': 'assets/guide/gallery/beijing/bell_tower_dusk.png',
    'drum tower': 'assets/guide/gallery/beijing/bell_tower_dusk.png',
    'shichahai': 'assets/guide/gallery/beijing/shichahai.png',
    'houhai': 'assets/guide/gallery/beijing/shichahai.png',
    'yonghegong': 'assets/guide/gallery/beijing/yonghegong_incense.png',
    'lama temple': 'assets/guide/gallery/beijing/yonghegong_incense.png',
    'confucius': 'assets/guide/gallery/beijing/yonghegong_incense.png',
    'peking duck': 'assets/guide/gallery/beijing/siji_minfu_duck.png',
    'roast duck': 'assets/guide/gallery/beijing/siji_minfu_duck.png',
    'siji minfu': 'assets/guide/gallery/beijing/siji_minfu_duck.png',
    'da dong': 'assets/guide/gallery/beijing/siji_minfu_duck.png',
    'copper pot': 'assets/guide/gallery/beijing/copper_pot_detail.png',
    'lamb hot pot': 'assets/guide/gallery/beijing/copper_pot_detail.png',
    'instant-boiled': 'assets/guide/gallery/beijing/copper_pot_detail.png',

    // Kunming
    'green lake': 'assets/guide/gallery/kunming/green_lake_opener.png',
    'cuihu': 'assets/guide/gallery/kunming/green_lake_opener.png',
    'gulls': 'assets/guide/gallery/kunming/dianchi_seagulls.png',
    'seagull': 'assets/guide/gallery/kunming/dianchi_seagulls.png',
    'dianchi': 'assets/guide/gallery/kunming/dianchi_seagulls.png',
    'western hills': 'assets/guide/gallery/kunming/western_hills_view.png',
    'xishan': 'assets/guide/gallery/kunming/western_hills_view.png',
    'jinmabiji': 'assets/guide/gallery/kunming/jinmabiji_night.png',
    'golden horse': 'assets/guide/gallery/kunming/jinmabiji_night.png',
    'zhengyi': 'assets/guide/gallery/kunming/zhengyi_road.png',
    'sanshi': 'assets/guide/gallery/kunming/sanshi_jie_street.png',
    'teahouse': 'assets/guide/gallery/kunming/kunming_teahouse.png',
    'mushroom': 'assets/guide/gallery/kunming/mushroom_hotpot.png',
    'wild mushroom': 'assets/guide/gallery/kunming/mushroom_hotpot.png',
    'porcini': 'assets/guide/gallery/kunming/mushroom_hotpot.png',
    'cross-bridge': 'assets/guide/gallery/kunming/cross_bridge_noodles.png',
    'cross bridge': 'assets/guide/gallery/kunming/cross_bridge_noodles.png',
    'guoqiao': 'assets/guide/gallery/kunming/cross_bridge_noodles.png',
    'rice noodle': 'assets/guide/gallery/kunming/cross_bridge_noodles.png',
    'steam pot': 'assets/guide/gallery/kunming/steam_pot_chicken.png',
    'qiguo': 'assets/guide/gallery/kunming/steam_pot_chicken.png',
    'dai': 'assets/guide/gallery/kunming/dai_food_spread.png',
    'pineapple rice': 'assets/guide/gallery/kunming/dai_food_spread.png',
    'kunming': 'assets/guide/kunming-hero.png',
    'spring city': 'assets/guide/kunming-hero.png',

    // Dali
    'erhai': 'assets/guide/gallery/dali/erhai_sunset.png',
    'fisherman': 'assets/guide/gallery/dali/erhai_fisherman.png',
    'cormorant': 'assets/guide/gallery/dali/erhai_fisherman.png',
    'xizhou': 'assets/guide/gallery/dali/xizhou_village_main.png',
    'baba': 'assets/guide/gallery/dali/xizhou_baba_food.png',
    'bai minority': 'assets/guide/gallery/dali/bai_minority_dress.png',
    'bai people': 'assets/guide/gallery/dali/bai_minority_dress.png',
    'bai architecture': 'assets/guide/gallery/dali/bai_architecture_detail.png',
    'bai': 'assets/guide/gallery/dali/xizhou_village_main.png',
    'shuanglang': 'assets/guide/gallery/dali/erhai_sunset.png',
    'cangshan': 'assets/guide/gallery/dali/cangshan_mountain.png',
    'three pagodas': 'assets/guide/gallery/dali/three_pagodas.png',
    'chongsheng': 'assets/guide/gallery/dali/chongshengsi_pagodas.png',
    'old town': 'assets/guide/gallery/dali/dali_old_town_lane.png',
    'gucheng': 'assets/guide/gallery/dali/dali_old_town_lane.png',
    'rushan': 'assets/guide/gallery/dali/rushan_cheese.png',
    'cheese': 'assets/guide/gallery/dali/rushan_cheese.png',
    'torch': 'assets/guide/gallery/dali/torch_procession.png',
    'huoba': 'assets/guide/gallery/dali/torch_procession.png',
    'sanyuejie': 'assets/guide/gallery/dali/dali_old_town_lane.png',
    'dali': 'assets/guide/dali-hero.png',

    // Lijiang
    'jade dragon': 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.png',
    'snow mountain': 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.png',
    'yulong': 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.png',
    'glacier': 'assets/guide/gallery/lijiang/mountain_peaks_view.png',
    'blue moon': 'assets/guide/gallery/lijiang/mountain_peaks_view.png',
    'shuhe': 'assets/guide/gallery/lijiang/shuhe_quiet_lane.png',
    'naxi': 'assets/guide/gallery/lijiang/naxi_elderly.png',
    'naxi music': 'assets/guide/gallery/lijiang/naxi_instruments.png',
    'naxi orchestra': 'assets/guide/gallery/lijiang/naxi_instruments.png',
    'dongba': 'assets/guide/gallery/lijiang/dongba_script.png',
    'baisha': 'assets/guide/gallery/lijiang/shuhe_quiet_lane.png',
    'old town canals': 'assets/guide/gallery/lijiang/lijiang_old_town_canals.png',
    'rooftops': 'assets/guide/gallery/lijiang/lijiang_dawn_rooftops.png',
    'cured pork': 'assets/guide/gallery/lijiang/cured_pork_ribs.png',
    'pork ribs': 'assets/guide/gallery/lijiang/cured_pork_ribs.png',
    'lijiang': 'assets/guide/lijiang-hero.png',

    // Chengdu
    'giant panda': 'assets/guide/gallery/chengdu/panda_bamboo_hero.png',
    'panda base': 'assets/guide/gallery/chengdu/panda_tree.png',
    'red panda': 'assets/guide/gallery/chengdu/red_panda_walkway.png',
    'panda': 'assets/guide/gallery/chengdu/panda_bamboo_hero.png',
    'bamboo': 'assets/guide/gallery/chengdu/red_wall_bamboo_alley.png',
    'red wall': 'assets/guide/gallery/chengdu/red_wall_bamboo_alley.png',
    'wenshu': 'assets/guide/gallery/chengdu/wenshu_temple.png',
    'jinli': 'assets/guide/gallery/chengdu/jinli_lanterns_2.png',
    'lantern': 'assets/guide/gallery/chengdu/jinli_lanterns.png',
    'kuan zhai': 'assets/guide/gallery/chengdu/kuan_alley_courtyard.png',
    'kuanzhai': 'assets/guide/gallery/chengdu/kuan_alley_courtyard.png',
    'wide and narrow': 'assets/guide/gallery/chengdu/kuan_alley_courtyard.png',
    'people’s park': 'assets/guide/gallery/chengdu/peoples_park_teahouse.png',
    'peoples park': 'assets/guide/gallery/chengdu/peoples_park_teahouse.png',
    'heming': 'assets/guide/gallery/chengdu/peoples_park_teahouse.png',
    'wuhou': 'assets/guide/gallery/chengdu/wenshu_temple.png',
    'sichuan hotpot': 'assets/guide/gallery/chengdu/sichuan_hotpot.png',
    'mala': 'assets/guide/gallery/chengdu/sichuan_hotpot.png',
    'sweet water': 'assets/guide/gallery/chengdu/sweet_water_noodles.png',
    'tianshui mian': 'assets/guide/gallery/chengdu/sweet_water_noodles.png',
    'fuqi': 'assets/guide/gallery/chengdu/fuqi_feipian.png',
    'face changing': 'assets/guide/gallery/chengdu/face_changing_opera.png',
    'face-changing': 'assets/guide/gallery/chengdu/face_changing_opera.png',
    'bian lian': 'assets/guide/gallery/chengdu/face_changing_opera.png',
    'opera': 'assets/guide/gallery/chengdu/face_changing_opera.png',
    'sichuan food': 'assets/guide/gallery/chengdu/sichuan_food.png',
    'sichuan': 'assets/guide/chengdu-hero.png',
    'chengdu': 'assets/guide/chengdu-hero.png',
  };

  function matchImage(title, cityId) {
    const t = (title || '').toLowerCase();
    // prefer longer keywords first
    const keys = Object.keys(IMAGE_POOL).sort((a, b) => b.length - a.length);
    for (const k of keys) {
      if (t.includes(k)) return IMAGE_POOL[k];
    }
    return null;
  }

  function localizeText(lang, value, type) {
    if (!value || lang === 'en') return value;
    if (type === 'title') return (TRANSLATIONS[lang] && TRANSLATIONS[lang].titles && TRANSLATIONS[lang].titles[value]) || value;
    if (type === 'subtitle') return (TRANSLATIONS[lang] && TRANSLATIONS[lang].subtitles && TRANSLATIONS[lang].subtitles[value]) || value;
    return value;
  }

  function localizeDateLabel(lang, value) {
    if (!value || lang === 'en') return value;
    if (value === 'Trip-wide') return lang === 'de' ? 'Reiseweit' : '全程适用';
    const m = value.match(/^(\d+)\s+days?$/i);
    if (!m) return value;
    const count = m[1];
    if (lang === 'de') return `${count} Tage`;
    if (lang === 'zh') return `${count}天`;
    return value;
  }

  function buildData(lang = 'en') {
    const localized = TRANSLATIONS[lang] || {};
    const CITIES = RAW.map((raw, idx) => {
      const m = META[raw.id] || {};
      const cityT = (localized.cities && localized.cities[raw.id]) || {};
      const accent = raw.accent || m.accent || '#8C5A2B';

      const merged = [];
      for (const originalSection of raw.sections) {
        const sectionT = (localized.sections && localized.sections[originalSection.id]) || {};
        const section = {
          ...originalSection,
          title: sectionT.title || localizeText(lang, originalSection.title, 'title'),
          subtitle: sectionT.subtitle || localizeText(lang, originalSection.subtitle, 'subtitle'),
          body: sectionT.body || originalSection.body,
          bullets: sectionT.bullets || originalSection.bullets,
          asides: [],
        };

        if (section.type === 'note' && merged.length > 0) {
          const prev = merged[merged.length - 1];
          prev.asides = prev.asides || [];
          prev.asides.push({
            title: section.title,
            body: section.body || [],
          });
        } else {
          merged.push(section);
        }
      }

      for (const s of merged) {
        const img = matchImage(s.title, raw.id) || matchImage(originalTitleFor(raw.id, s.id), raw.id);
        if (img) s.image = img;
      }

      return {
        id: raw.id,
        title: cityT.title || raw.title,
        shortTitle: cityT.shortTitle || raw.shortTitle || cityT.title || raw.title,
        category: raw.category,
        chinese: m.chinese || raw.title.charAt(0),
        seal: m.seal || raw.title.charAt(0),
        kicker: cityT.kicker || m.kicker || '',
        accent,
        accentSoft: m.accentSoft || accent,
        dateLabel: localizeDateLabel(lang, raw.dateLabel),
        dayCount: dayCountFromLabel(localizeDateLabel(lang, raw.dateLabel)),
        sectionCount: merged.length,
        hero: m.hero || 'assets/guide/beijing-hero.png',
        summary: cityT.summary || raw.summary,
        lede: cityT.lede || m.lede || raw.summary,
        gallery: m.gallery || [],
        sections: merged,
        order: idx,
      };
    });

    const ALL_SECTIONS = CITIES.flatMap((c) =>
      c.sections.map((s) => ({ ...s, cityId: c.id, cityTitle: c.title, accent: c.accent }))
    );

    const ALL_PHOTOS = CITIES.flatMap((c) => [
      { src: c.hero, label: c.title, cityId: c.id, accent: c.accent },
      ...c.gallery.map((g) => ({ ...g, cityId: c.id, accent: c.accent })),
    ]);

    return { CITIES, ALL_SECTIONS, ALL_PHOTOS };
  }

  function originalTitleFor(cityId, sectionId) {
    const city = RAW.find((c) => c.id === cityId);
    const section = city && city.sections.find((s) => s.id === sectionId);
    return section ? section.title : '';
  }

  function useData() {
    const lang = window.CN26_I18N && window.CN26_I18N.useI18n ? window.CN26_I18N.useI18n().lang : 'en';
    return React.useMemo(() => buildData(lang), [lang]);
  }

  window.CN26_DATA = { buildData, useData };

  function dayCountFromLabel(label) {
    if (!label) return '';
    // "Aug 2-5" -> "4 days", "Trip-wide" -> "Trip-wide"
    const m = label.match(/(\d+)\s*[-–—]\s*(\d+)/);
    if (!m) return label;
    const days = parseInt(m[2]) - parseInt(m[1]) + 1;
    return days + ' days';
  }
})();
