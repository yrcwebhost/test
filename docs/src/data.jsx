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
      hero: 'assets/guide/beijing-hero.jpg',
      lede: 'Three days trace that authority through the capital: palace courts, lakeside gardens, hutong water lanes, and incense-heavy temple halls — before the route breaks south-west towards Yunnan.',
      gallery: [
        { src: 'assets/guide/beijing-hero.jpg', label: 'Forbidden City axis' },
        { src: 'assets/guide/gallery/beijing/forbidden_city_aerial.jpg', label: 'Palace from above' },
        { src: 'assets/guide/gallery/beijing/temple_heaven.jpg', label: 'Temple of Heaven' },
        { src: 'assets/guide/gallery/beijing/greatwall.jpg', label: 'Great Wall' },
        { src: 'assets/guide/gallery/beijing/summer_palace_lake.jpg', label: 'Summer Palace' },
        { src: 'assets/guide/gallery/beijing/jingshan_panorama.jpg', label: 'Jingshan panorama' },
        { src: 'assets/guide/gallery/beijing/hutong_alley_dusk.jpg', label: 'Hutong at dusk' },
        { src: 'assets/guide/gallery/beijing/bell_tower_dusk.jpg', label: 'Bell Tower' },
        { src: 'assets/guide/gallery/beijing/shichahai.jpg', label: 'Shichahai' },
        { src: 'assets/guide/gallery/beijing/yonghegong_incense.jpg', label: 'Yonghegong incense' },
        { src: 'assets/guide/gallery/beijing/seventeen_arch_bridge.jpg', label: 'Seventeen-Arch Bridge' },
        { src: 'assets/guide/gallery/beijing/siji_minfu_duck.jpg', label: 'Peking duck' },
      ],
    },
    kunming: {
      chinese: '昆明',
      seal: '昆',
      kicker: 'The Spring City',
      accent: '#5E7A3A',
      accentSoft: '#8DA968',
      hero: 'assets/guide/kunming-hero.jpg',
      lede: 'Green Lake, the Military Academy’s mustard yellow walls, and mushroom hotpots with strict timers on the table. This is Yunnan’s opening chapter.',
      gallery: [
        { src: 'assets/guide/gallery/kunming/green_lake_opener.jpg', label: 'Green Lake' },
        { src: 'assets/guide/gallery/kunming/dianchi_seagulls.jpg', label: 'Dianchi gulls' },
        { src: 'assets/guide/gallery/kunming/western_hills_view.jpg', label: 'Western Hills' },
        { src: 'assets/guide/gallery/kunming/jinmabiji_night.jpg', label: 'Jinmabiji at night' },
        { src: 'assets/guide/gallery/kunming/zhengyi_road.jpg', label: 'Zhengyi Road' },
        { src: 'assets/guide/gallery/kunming/sanshi_jie_street.jpg', label: 'Sanshi Jie' },
        { src: 'assets/guide/gallery/kunming/kunming_teahouse.jpg', label: 'Teahouse' },
        { src: 'assets/guide/gallery/kunming/mushroom_hotpot.jpg', label: 'Mushroom hotpot' },
        { src: 'assets/guide/gallery/kunming/cross_bridge_noodles.jpg', label: 'Cross-bridge noodles' },
        { src: 'assets/guide/gallery/kunming/steam_pot_chicken.jpg', label: 'Steam-pot chicken' },
        { src: 'assets/guide/gallery/kunming/dai_food_spread.jpg', label: 'Dai spread' },
      ],
    },
    dali: {
      chinese: '大理',
      seal: '理',
      kicker: 'Erhai & Cangshan',
      accent: '#2F6F8F',
      accentSoft: '#6EA3BD',
      hero: 'assets/guide/dali-hero.jpg',
      lede: 'Four days around Erhai: Xizhou for breakfast baba, Shuanglang for sunset, Cangshan’s ridge for the long view.',
      gallery: [
        { src: 'assets/guide/gallery/dali/erhai_sunset.jpg', label: 'Erhai sunset' },
        { src: 'assets/guide/gallery/dali/erhai_fisherman.jpg', label: 'Erhai fisherman' },
        { src: 'assets/guide/gallery/dali/xizhou_village_main.jpg', label: 'Xizhou village' },
        { src: 'assets/guide/gallery/dali/xizhou_baba_food.jpg', label: 'Xizhou baba' },
        { src: 'assets/guide/gallery/dali/cangshan_mountain.jpg', label: 'Cangshan ridge' },
        { src: 'assets/guide/gallery/dali/three_pagodas.jpg', label: 'Three Pagodas' },
        { src: 'assets/guide/gallery/dali/chongshengsi_pagodas.jpg', label: 'Chongsheng Temple' },
        { src: 'assets/guide/gallery/dali/dali_old_town_lane.jpg', label: 'Old Town lane' },
        { src: 'assets/guide/gallery/dali/bai_architecture_detail.jpg', label: 'Bai architecture' },
        { src: 'assets/guide/gallery/dali/bai_minority_dress.jpg', label: 'Bai dress' },
        { src: 'assets/guide/gallery/dali/torch_procession.jpg', label: 'Torch festival' },
        { src: 'assets/guide/gallery/dali/rushan_cheese.jpg', label: 'Rushan cheese' },
      ],
    },
    lijiang: {
      chinese: '丽江',
      seal: '丽',
      kicker: 'Naxi Country',
      accent: '#4A5D7A',
      accentSoft: '#8697B0',
      hero: 'assets/guide/lijiang-hero.jpg',
      lede: 'Four days between the old town lanes, Shuhe’s quieter canals, Baisha’s murals, and the ice cap above it all.',
      gallery: [
        { src: 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.jpg', label: 'Jade Dragon Snow Mountain' },
        { src: 'assets/guide/gallery/lijiang/mountain_peaks_view.jpg', label: 'Snow ridge' },
        { src: 'assets/guide/gallery/lijiang/lijiang_dawn_rooftops.jpg', label: 'Old town at dawn' },
        { src: 'assets/guide/gallery/lijiang/lijiang_old_town_canals.jpg', label: 'Old town canals' },
        { src: 'assets/guide/gallery/lijiang/shuhe_quiet_lane.jpg', label: 'Shuhe lane' },
        { src: 'assets/guide/gallery/lijiang/shuhe_night.jpg', label: 'Shuhe night' },
        { src: 'assets/guide/gallery/lijiang/naxi_elderly.jpg', label: 'Naxi elder' },
        { src: 'assets/guide/gallery/lijiang/naxi_outfit.jpg', label: 'Naxi dress' },
        { src: 'assets/guide/gallery/lijiang/naxi_instruments.jpg', label: 'Naxi music' },
        { src: 'assets/guide/gallery/lijiang/dongba_script.jpg', label: 'Dongba script' },
        { src: 'assets/guide/gallery/lijiang/cured_pork_ribs.jpg', label: 'Cured pork ribs' },
      ],
    },
    chengdu: {
      chinese: '成都',
      seal: '蜀',
      kicker: 'Land of Abundance',
      accent: '#B86D3B',
      accentSoft: '#D69975',
      hero: 'assets/guide/chengdu-hero.jpg',
      lede: 'Pandas, Wuhou Shrine, Wenshu Monastery, and a final Jinli evening under lantern light.',
      gallery: [
        { src: 'assets/guide/gallery/chengdu/panda_bamboo_hero.jpg', label: 'Giant panda' },
        { src: 'assets/guide/gallery/chengdu/panda_tree.jpg', label: 'Panda in a tree' },
        { src: 'assets/guide/gallery/chengdu/red_panda_walkway.jpg', label: 'Red panda' },
        { src: 'assets/guide/gallery/chengdu/wenshu_temple.jpg', label: 'Wenshu Monastery' },
        { src: 'assets/guide/gallery/chengdu/red_wall_bamboo_alley.jpg', label: 'Red wall bamboo alley' },
        { src: 'assets/guide/gallery/chengdu/kuan_alley_courtyard.jpg', label: 'Kuanzhai courtyard' },
        { src: 'assets/guide/gallery/chengdu/peoples_park_teahouse.jpg', label: 'People\u2019s Park teahouse' },
        { src: 'assets/guide/gallery/chengdu/jinli_lanterns.jpg', label: 'Jinli lanterns' },
        { src: 'assets/guide/gallery/chengdu/jinli_lanterns_2.jpg', label: 'Jinli at night' },
        { src: 'assets/guide/gallery/chengdu/sichuan_hotpot.jpg', label: 'Sichuan hotpot' },
        { src: 'assets/guide/gallery/chengdu/sweet_water_noodles.jpg', label: 'Sweet-water noodles' },
        { src: 'assets/guide/gallery/chengdu/face_changing_opera.jpg', label: 'Face-changing opera' },
      ],
    },
    food: {
      chinese: '食',
      seal: '食',
      kicker: 'A Thematic Index',
      accent: '#8C5A2B',
      accentSoft: '#B78858',
      hero: 'assets/guide/food-hero.jpg',
      lede: 'From copper-pot lamb to red-oil hotpot — the dining arc of the route.',
      gallery: [
        { src: 'assets/guide/food-hero.jpg', label: 'Dining arc' },
        { src: 'assets/guide/gallery/beijing/siji_minfu_duck.jpg', label: 'Peking duck' },
        { src: 'assets/guide/gallery/beijing/copper_pot_detail.jpg', label: 'Copper pot' },
        { src: 'assets/guide/gallery/kunming/mushroom_hotpot.jpg', label: 'Yunnan mushrooms' },
        { src: 'assets/guide/gallery/kunming/steam_pot_chicken.jpg', label: 'Steam-pot chicken' },
        { src: 'assets/guide/gallery/kunming/cross_bridge_noodles.jpg', label: 'Cross-bridge noodles' },
        { src: 'assets/guide/gallery/dali/xizhou_baba_food.jpg', label: 'Xizhou baba' },
        { src: 'assets/guide/gallery/dali/rushan_cheese.jpg', label: 'Rushan cheese' },
        { src: 'assets/guide/gallery/lijiang/cured_pork_ribs.jpg', label: 'Cured pork ribs' },
        { src: 'assets/guide/gallery/chengdu/sichuan_hotpot.jpg', label: 'Sichuan hotpot' },
        { src: 'assets/guide/gallery/chengdu/sweet_water_noodles.jpg', label: 'Sweet-water noodles' },
        { src: 'assets/guide/gallery/chengdu/fuqi_feipian.jpg', label: 'Fuqi feipian' },
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
    'forbidden city': 'assets/guide/gallery/beijing/forbidden_city_aerial.jpg',
    'palace museum': 'assets/guide/gallery/beijing/forbidden_city_aerial.jpg',
    'imperial': 'assets/guide/beijing-hero.jpg',
    'tiananmen': 'assets/guide/beijing-hero.jpg',
    'temple of heaven': 'assets/guide/gallery/beijing/temple_heaven.jpg',
    'tiantan': 'assets/guide/gallery/beijing/temple_heaven.jpg',
    'great wall': 'assets/guide/gallery/beijing/greatwall.jpg',
    'mutianyu': 'assets/guide/gallery/beijing/greatwall.jpg',
    'badaling': 'assets/guide/gallery/beijing/greatwall.jpg',
    'jinshanling': 'assets/guide/gallery/beijing/greatwall.jpg',
    'summer palace': 'assets/guide/gallery/beijing/summer_palace_lake.jpg',
    'kunming lake': 'assets/guide/gallery/beijing/summer_palace_lake.jpg',
    'seventeen': 'assets/guide/gallery/beijing/seventeen_arch_bridge.jpg',
    'long corridor': 'assets/guide/gallery/beijing/summer_palace_lake.jpg',
    'jingshan': 'assets/guide/gallery/beijing/jingshan_panorama.jpg',
    'coal hill': 'assets/guide/gallery/beijing/jingshan_panorama.jpg',
    'hutong': 'assets/guide/gallery/beijing/hutong_alley_dusk.jpg',
    'alley': 'assets/guide/gallery/beijing/hutong_alley_dusk.jpg',
    'bell tower': 'assets/guide/gallery/beijing/bell_tower_dusk.jpg',
    'drum tower': 'assets/guide/gallery/beijing/bell_tower_dusk.jpg',
    'shichahai': 'assets/guide/gallery/beijing/shichahai.jpg',
    'houhai': 'assets/guide/gallery/beijing/shichahai.jpg',
    'yonghegong': 'assets/guide/gallery/beijing/yonghegong_incense.jpg',
    'lama temple': 'assets/guide/gallery/beijing/yonghegong_incense.jpg',
    'confucius': 'assets/guide/gallery/beijing/yonghegong_incense.jpg',
    'peking duck': 'assets/guide/gallery/beijing/siji_minfu_duck.jpg',
    'roast duck': 'assets/guide/gallery/beijing/siji_minfu_duck.jpg',
    'siji minfu': 'assets/guide/gallery/beijing/siji_minfu_duck.jpg',
    'da dong': 'assets/guide/gallery/beijing/siji_minfu_duck.jpg',
    'copper pot': 'assets/guide/gallery/beijing/copper_pot_detail.jpg',
    'lamb hot pot': 'assets/guide/gallery/beijing/copper_pot_detail.jpg',
    'instant-boiled': 'assets/guide/gallery/beijing/copper_pot_detail.jpg',

    // Kunming
    'green lake': 'assets/guide/gallery/kunming/green_lake_opener.jpg',
    'cuihu': 'assets/guide/gallery/kunming/green_lake_opener.jpg',
    'gulls': 'assets/guide/gallery/kunming/dianchi_seagulls.jpg',
    'seagull': 'assets/guide/gallery/kunming/dianchi_seagulls.jpg',
    'dianchi': 'assets/guide/gallery/kunming/dianchi_seagulls.jpg',
    'western hills': 'assets/guide/gallery/kunming/western_hills_view.jpg',
    'xishan': 'assets/guide/gallery/kunming/western_hills_view.jpg',
    'jinmabiji': 'assets/guide/gallery/kunming/jinmabiji_night.jpg',
    'golden horse': 'assets/guide/gallery/kunming/jinmabiji_night.jpg',
    'zhengyi': 'assets/guide/gallery/kunming/zhengyi_road.jpg',
    'sanshi': 'assets/guide/gallery/kunming/sanshi_jie_street.jpg',
    'teahouse': 'assets/guide/gallery/kunming/kunming_teahouse.jpg',
    'mushroom': 'assets/guide/gallery/kunming/mushroom_hotpot.jpg',
    'wild mushroom': 'assets/guide/gallery/kunming/mushroom_hotpot.jpg',
    'porcini': 'assets/guide/gallery/kunming/mushroom_hotpot.jpg',
    'cross-bridge': 'assets/guide/gallery/kunming/cross_bridge_noodles.jpg',
    'cross bridge': 'assets/guide/gallery/kunming/cross_bridge_noodles.jpg',
    'guoqiao': 'assets/guide/gallery/kunming/cross_bridge_noodles.jpg',
    'rice noodle': 'assets/guide/gallery/kunming/cross_bridge_noodles.jpg',
    'steam pot': 'assets/guide/gallery/kunming/steam_pot_chicken.jpg',
    'qiguo': 'assets/guide/gallery/kunming/steam_pot_chicken.jpg',
    'dai': 'assets/guide/gallery/kunming/dai_food_spread.jpg',
    'pineapple rice': 'assets/guide/gallery/kunming/dai_food_spread.jpg',
    'kunming': 'assets/guide/kunming-hero.jpg',
    'spring city': 'assets/guide/kunming-hero.jpg',

    // Dali
    'erhai': 'assets/guide/gallery/dali/erhai_sunset.jpg',
    'fisherman': 'assets/guide/gallery/dali/erhai_fisherman.jpg',
    'cormorant': 'assets/guide/gallery/dali/erhai_fisherman.jpg',
    'xizhou': 'assets/guide/gallery/dali/xizhou_village_main.jpg',
    'baba': 'assets/guide/gallery/dali/xizhou_baba_food.jpg',
    'bai minority': 'assets/guide/gallery/dali/bai_minority_dress.jpg',
    'bai people': 'assets/guide/gallery/dali/bai_minority_dress.jpg',
    'bai architecture': 'assets/guide/gallery/dali/bai_architecture_detail.jpg',
    'bai': 'assets/guide/gallery/dali/xizhou_village_main.jpg',
    'shuanglang': 'assets/guide/gallery/dali/erhai_sunset.jpg',
    'cangshan': 'assets/guide/gallery/dali/cangshan_mountain.jpg',
    'three pagodas': 'assets/guide/gallery/dali/three_pagodas.jpg',
    'chongsheng': 'assets/guide/gallery/dali/chongshengsi_pagodas.jpg',
    'old town': 'assets/guide/gallery/dali/dali_old_town_lane.jpg',
    'gucheng': 'assets/guide/gallery/dali/dali_old_town_lane.jpg',
    'rushan': 'assets/guide/gallery/dali/rushan_cheese.jpg',
    'cheese': 'assets/guide/gallery/dali/rushan_cheese.jpg',
    'torch': 'assets/guide/gallery/dali/torch_procession.jpg',
    'huoba': 'assets/guide/gallery/dali/torch_procession.jpg',
    'sanyuejie': 'assets/guide/gallery/dali/dali_old_town_lane.jpg',
    'dali': 'assets/guide/dali-hero.jpg',

    // Lijiang
    'jade dragon': 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.jpg',
    'snow mountain': 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.jpg',
    'yulong': 'assets/guide/gallery/lijiang/jade_dragon_snow_mountain.jpg',
    'glacier': 'assets/guide/gallery/lijiang/mountain_peaks_view.jpg',
    'blue moon': 'assets/guide/gallery/lijiang/mountain_peaks_view.jpg',
    'shuhe': 'assets/guide/gallery/lijiang/shuhe_quiet_lane.jpg',
    'naxi': 'assets/guide/gallery/lijiang/naxi_elderly.jpg',
    'naxi music': 'assets/guide/gallery/lijiang/naxi_instruments.jpg',
    'naxi orchestra': 'assets/guide/gallery/lijiang/naxi_instruments.jpg',
    'dongba': 'assets/guide/gallery/lijiang/dongba_script.jpg',
    'baisha': 'assets/guide/gallery/lijiang/shuhe_quiet_lane.jpg',
    'old town canals': 'assets/guide/gallery/lijiang/lijiang_old_town_canals.jpg',
    'rooftops': 'assets/guide/gallery/lijiang/lijiang_dawn_rooftops.jpg',
    'cured pork': 'assets/guide/gallery/lijiang/cured_pork_ribs.jpg',
    'pork ribs': 'assets/guide/gallery/lijiang/cured_pork_ribs.jpg',
    'lijiang': 'assets/guide/lijiang-hero.jpg',

    // Chengdu
    'giant panda': 'assets/guide/gallery/chengdu/panda_bamboo_hero.jpg',
    'panda base': 'assets/guide/gallery/chengdu/panda_tree.jpg',
    'red panda': 'assets/guide/gallery/chengdu/red_panda_walkway.jpg',
    'panda': 'assets/guide/gallery/chengdu/panda_bamboo_hero.jpg',
    'bamboo': 'assets/guide/gallery/chengdu/red_wall_bamboo_alley.jpg',
    'red wall': 'assets/guide/gallery/chengdu/red_wall_bamboo_alley.jpg',
    'wenshu': 'assets/guide/gallery/chengdu/wenshu_temple.jpg',
    'jinli': 'assets/guide/gallery/chengdu/jinli_lanterns_2.jpg',
    'lantern': 'assets/guide/gallery/chengdu/jinli_lanterns.jpg',
    'kuan zhai': 'assets/guide/gallery/chengdu/kuan_alley_courtyard.jpg',
    'kuanzhai': 'assets/guide/gallery/chengdu/kuan_alley_courtyard.jpg',
    'wide and narrow': 'assets/guide/gallery/chengdu/kuan_alley_courtyard.jpg',
    'people’s park': 'assets/guide/gallery/chengdu/peoples_park_teahouse.jpg',
    'peoples park': 'assets/guide/gallery/chengdu/peoples_park_teahouse.jpg',
    'heming': 'assets/guide/gallery/chengdu/peoples_park_teahouse.jpg',
    'wuhou': 'assets/guide/gallery/chengdu/wenshu_temple.jpg',
    'sichuan hotpot': 'assets/guide/gallery/chengdu/sichuan_hotpot.jpg',
    'mala': 'assets/guide/gallery/chengdu/sichuan_hotpot.jpg',
    'sweet water': 'assets/guide/gallery/chengdu/sweet_water_noodles.jpg',
    'tianshui mian': 'assets/guide/gallery/chengdu/sweet_water_noodles.jpg',
    'fuqi': 'assets/guide/gallery/chengdu/fuqi_feipian.jpg',
    'face changing': 'assets/guide/gallery/chengdu/face_changing_opera.jpg',
    'face-changing': 'assets/guide/gallery/chengdu/face_changing_opera.jpg',
    'bian lian': 'assets/guide/gallery/chengdu/face_changing_opera.jpg',
    'opera': 'assets/guide/gallery/chengdu/face_changing_opera.jpg',
    'sichuan food': 'assets/guide/gallery/chengdu/sichuan_food.jpg',
    'sichuan': 'assets/guide/chengdu-hero.jpg',
    'chengdu': 'assets/guide/chengdu-hero.jpg',
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
        hero: m.hero || 'assets/guide/beijing-hero.jpg',
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
