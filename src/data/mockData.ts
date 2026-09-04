import { CurrencyConfig, Product, OrderItem, WarehouseHub, AuditLogEntry, CategoryItem, CollectionItem } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rateAgainstINR: 1,
    flag: '🇮🇳'
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateAgainstINR: 1 / 83.45,
    flag: '🇺🇸'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateAgainstINR: 1 / 90.45,
    flag: '🇪🇺'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateAgainstINR: 1 / 105.80,
    flag: '🇬🇧'
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    rateAgainstINR: 1 / 22.72,
    flag: '🇦🇪'
  },
  SGD: {
    code: 'SGD',
    symbol: 'SGD $',
    name: 'Singapore Dollar',
    rateAgainstINR: 0.0156,
    flag: '🇸🇬'
  },
  MYR: {
    code: 'MYR',
    symbol: 'MYR RM',
    name: 'Malaysian Ringgit',
    rateAgainstINR: 0.0514,
    flag: '🇲🇾'
  },
  SAR: {
    code: 'SAR',
    symbol: 'SAR ﷼',
    name: 'Saudi Riyal',
    rateAgainstINR: 0.0435,
    flag: '🇸🇦'
  },
  AUD: {
    code: 'AUD',
    symbol: 'AUD $',
    name: 'Australian Dollar',
    rateAgainstINR: 0.0178,
    flag: '🇦🇺'
  },
  CAD: {
    code: 'CAD',
    symbol: 'CAD $',
    name: 'Canadian Dollar',
    rateAgainstINR: 0.0158,
    flag: '🇨🇦'
  }
};

export const BRAND_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WrvfLeLsSCY0IkfwdOJab_gFTyVFbx_MHRhrpTcmbupWtEKVC3nY3H0nNm0CIzR9nzkZrjZqMlxwswb_XUzOviIdxWNnPRzbVnZQOdmjGjHMc_WCDK3MJE5NSrmeZe_P5F8PSQWEuvmOndqz4BzEO_ZrXXT_WNHy3YzzMxytMAd8AxrUGoH8EY7ptY3MqLD6sV6UxQqZo5N_XysA13z8nJZwRSKg_nA0XMc4GNa_LFC6j7ZBMCWHl58Wc';

export const AVATAR_PROFILE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA7J90lcN8ncOCX1bddpWYOnoGMCTapShZOEyrbi37WzwrcbsfciMcaIqYUFL-F-_vFxlfRVMyzszSzoaNafWm13APEKEY3ih8ysSC5kEEN7xgojNeBLCRyjr4UtGigHeqKBQs-OuC6W0u_k0W8o2l3A9pFKKgqaioXjwW6bDvrZyxkeftEzdRoH8YZBL_vf4ehjWGOWWVnniQ7xzcAPGWal0mzqvkkeX3vRtXTPxe7OE8bNMPDFxWd';

export const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD1uTpRcAAvAXnZASOHzZ3OESnOOA1qQN6gozpH4zKwvCMQYVI70zJxXdknia5Ng_nzilWGDEqYyIYlZDHWHdXMTOgqvJZNxGeShoawagMU4UhisSj7Kr8g6_5OZbVDTqK9jh8g-YF_ohuzieeBdDQMsIKScOFhrs-0eDiJUNhLq4aeHmEc5XENaITxNN3ZKAWYTHgeRvU1VYHKQAV6AQRJorJITvHAn27PU0eimnIv4tN-E9bxvC3u';

export const ATELIER_STORY_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSai4mnkjBBXlJogvWOntp00DUK_eKCjanr1_OOWOwtkpry_LVq7w1Y9FjOxwynaRykqU3PrMArPczVF_JM2eR9ct62QrPuqsMZgsab316vL1tZ68oEtB1lIfhum8UA4VQskste_V8GutH1smK80WuUeUIzzF6MPUTPYzV5w7z0mBqthB85eK5wLPb5kOWAWodqS_kDsPbp1Vz-OX2G-nix60CdH-kXnkEkJ43I7482-w2zOj6VmIl';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'banarasi-silk',
    name: 'Banarasi Silk',
    stylesCount: '142 Styles',
    description: 'Mulberry Katan silk hand-woven with pure silver and 24K gilded electroplated zari.',
    matchingCollectionName: 'Varanasi Masterloom Archive',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUFDygVZgZcDjbAZHRbe_ZDXms7Pr-LxkhPcRvbnXvK0tZZbyZasVij4fiHZRP4MtgCvchhmOG4VPclX5ciZl6RQOScLasEam2bICuI4tBmhWMyGjaiRIesW_Q_pAI-UAxHkIhln88YrWAR24O39_an-qDkCIihd8Tj4NjB4dvLAJD_6H7YmSQs7Vf61Z0d-ct3480Pc9CL7GsTbNC-1ATsHzm0nQ1Obz8jcB6wUOroHTaBdkYsxji'
  },
  {
    id: 'bridal-lehengas',
    name: 'Bridal Lehengas',
    stylesCount: '98 Styles',
    description: 'Ceremonial velvet and heavy raw silk kalidars with antique zardozi bullion needlework.',
    matchingCollectionName: 'Noor-e-Khaas Royal Bridal',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gJULosK8PiVuzAIH7IbAF5NngImNA5tsGM7FuYmM7G4UM81izSQiwYpsPmrjJQ65ViArxizlv77fZIPelewRXbCun3acNMIL5q37ul6zFGR7snqijdvvSSOxgNqOb7T0kIN5QDtKuTKUnvfBwFcEU55pPUV_JXxAlBQ-hl7zXdwpIHpHlJNG--_DXseeyrbXpYf5dHlBHHMSY4JVUPGmJkeKZrl2prp8FMI6jxvYZEbQVLru4FsD'
  },
  {
    id: 'kanjeevaram-heirlooms',
    name: 'Kanjeevaram Heirlooms',
    stylesCount: '115 Styles',
    description: 'Temple-motif Korvai pure mulberry silk woven with solid heavy gold zari borders.',
    matchingCollectionName: 'Temple Sacred Kanchipuram',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA49q4Hcuh8CweVYJnvB9oyj6XhWxrl105mUiCujpj3UMjRuMnr8rWdwwKIBSbpf_2ViA_qSC2yNseM3NC2wmMPYlatVU6nd83UVcazAxCx10Pa1J75H3JXbQXsPcgoUgf3lBLnUyslVU-bIMMlS964qRphakehpZ9cuWufdvGl9gF2NwnRyEe4uo82f3n_WIJObSQSDXDhNZx-fk2xgs8C6p6nuYglTNgwjHLOQnnTlFH1uRctYOFo'
  },
  {
    id: 'evening-gowns',
    name: 'Evening Gowns & Anarkalis',
    stylesCount: '76 Styles',
    description: 'Dramatic floor-grazing couture velvet silhouettes, scalloped dupattas, and gala kalis.',
    matchingCollectionName: 'Nocturne Gala Soirée',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXoiuayiZNgsekUN2u0MqEqeo9MsIY6U5Ttt5oGkWLOBkISiIDb5MLD4CHPqTsYhryoD15koe9XPyCCXnFdN3cE36_z3iPlwBauKklOnFmJ2qEWL0sXz0lTWgU3Tkne2_Qnlv4DlvQX3SkqUQWlNc9pbvdoXF6Ai6YPOhD79vpq2hh2BsxoSVV_qkfTZbrt6ygqIyiJ6hpZ_20k2szL-86bDHSq5CJem2zbIQu9JyoYbwlymaeMRcb'
  },
  {
    id: 'mens-sherwanis',
    name: "Men's Sherwanis & Kurtas",
    stylesCount: '64 Styles',
    description: 'Heritage groom achkans, tailored Matka raw silk kurtas, and hand-carved brass regalia.',
    matchingCollectionName: "Imperial Groom's Wardrobe",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBugx11FsDKN_jRHNybXK2ihZ1fIpSYXGyyAiaKzjMQD1L_8wsAOFFoP2BGnSrcNzVXhxooF0mHtebH4rRtTfNkVXm7X-DNVMhcDtV8tBrUz08QNPvgSInpn_G422DqtjI-Ad5VC7orXxMbFk6EC-lOK4iHyccC-Cvk8-qN1LjEpkzsir0MbQRA4UeXa-Xc2J8WVWNlNs12N2DI9Fo9VEAen-eUsQQpcT3qqO3NXCsjXYQIgY5SNyD4'
  },
  {
    id: 'high-jewelry',
    name: 'High Jewelry & Polki',
    stylesCount: '82 Styles',
    description: 'Uncut polki kundan gemstones, 24K jadau choker sets, chandbalis, and pearl drops.',
    matchingCollectionName: 'The Nizam Treasury',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwL5AQqeFuOFfQd94XCmZsoOjw-PkeGAwVyM9SliK55IQnrnRSubp0TP7uYpe_6Vn-iEDCyOS1QC-UtV3EbfVlRX1WO1F5844kXjEzq6xWCuOk8_K2FgjIr1MQXtB-TS1zo9ve29tS5y3ibGpvQUTImFYXOk2Qf_3GCg7WAf0MPFRqWqWGaW799trZzkZstRCf_pilTzzt0_NBLtsPUWZfRHTeFZGAmwP-dtvFn4BLnmxlRVuChtt5'
  },
  {
    id: 'chikankari-tissue',
    name: 'Awadhi Chikankari & Tissue',
    stylesCount: '58 Styles',
    description: 'Lucknow shadow needlework, fine mukaish badla wire, and translucent gold tissue handlooms.',
    matchingCollectionName: 'Noor-e-Awadh Chikan Atelier',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCklfmo7ksLtEgHgtygM5o_1-y5pu5Y3Hx0EJBNh8Lr-KWSDvbDwXf2GDQs26AVVV_RvtQ6EysTnyZIeTr2tC5shFb-JBRF8BQMR1VRHpvRsMr8S01flgDzCQyUQcq_bEBoi82Nu4oddV1aEBLky5YXgAcCsliCnYgVwRF-2rV52ksGz2Ujt_H4euaaCMOCTj-yfoWtvZHUB8H1DFSfAQ1DX_CjEdacHLMkAA-leBE6ZI26t3KdAdWh'
  },
  {
    id: 'royal-bandhgalas',
    name: 'Royal Bandhgalas & Jackets',
    stylesCount: '46 Styles',
    description: 'Bespoke Jodhpuri coats, hand-embroidered velvet waistcoats, and regal mandarin collars.',
    matchingCollectionName: 'Jodhpur Royal Regalia',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSai4mnkjBBXlJogvWOntp00DUK_eKCjanr1_OOWOwtkpry_LVq7w1Y9FjOxwynaRykqU3PrMArPczVF_JM2eR9ct62QrPuqsMZgsab316vL1tZ68oEtB1lIfhum8UA4VQskste_V8GutH1smK80WuUeUIzzF6MPUTPYzV5w7z0mBqthB85eK5wLPb5kOWAWodqS_kDsPbp1Vz-OX2G-nix60CdH-kXnkEkJ43I7482-w2zOj6VmIl'
  },
  {
    id: 'dupattas-stoles',
    name: 'Artisanal Dupattas & Stoles',
    stylesCount: '68 Styles',
    description: 'Chinar hand-spun Kashmiri tilla pashmina shawls and Banarasi kadwa meenakari odhanis.',
    matchingCollectionName: 'Pashmina & Silk Odhanis',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1uTpRcAAvAXnZASOHzZ3OESnOOA1qQN6gozpH4zKwvCMQYVI70zJxXdknia5Ng_nzilWGDEqYyIYlZDHWHdXMTOgqvJZNxGeShoawagMU4UhisSj7Kr8g6_5OZbVDTqK9jh8g-YF_ohuzieeBdDQMsIKScOFhrs-0eDiJUNhLq4aeHmEc5XENaITxNN3ZKAWYTHgeRvU1VYHKQAV6AQRJorJITvHAn27PU0eimnIv4tN-E9bxvC3u'
  },
  {
    id: 'trousseau-accessories',
    name: 'Trousseau Bags & Accessories',
    stylesCount: '52 Styles',
    description: 'Zardozi hand-stitched seed pearl minaudières, velvet royal batwa potlis, and ceremonial accents.',
    matchingCollectionName: 'Maharani Trousseau Accents',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNI2ftz3EpEh-eM7qDhfH9OW0QC4x-Fy8FiS7ugVCPTcLzSrhf94WhHghyohcL5DYUytgzWRItUK1vgSkDvsYLAtwkCN2HO8IAQ2qagbb0CJhnuxxZ7udrfVq5jDP1Jb9oITqPF7wptJrCOYPmJi1VIwTG-2Ib-VwSQ2LiIIj36HONQri6brST5cJlU5kjIMRMZjuCg1mtrxZJaAcsbbKBPeoh99GxSWIjqA32CWac6YaGAwxLBQOj'
  }
];

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-varanasi-masterloom',
    name: 'Varanasi Masterloom Archive',
    tagline: 'Centuries of Sacred Ganga Handloom Heritage',
    description: 'Master weavers intertwining pure mulberry silk with electroplated gold bullion threads.',
    categoryName: 'Banarasi Silk',
    categoryId: 'banarasi-silk',
    stylesCount: '142 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUFDygVZgZcDjbAZHRbe_ZDXms7Pr-LxkhPcRvbnXvK0tZZbyZasVij4fiHZRP4MtgCvchhmOG4VPclX5ciZl6RQOScLasEam2bICuI4tBmhWMyGjaiRIesW_Q_pAI-UAxHkIhln88YrWAR24O39_an-qDkCIihd8Tj4NjB4dvLAJD_6H7YmSQs7Vf61Z0d-ct3480Pc9CL7GsTbNC-1ATsHzm0nQ1Obz8jcB6wUOroHTaBdkYsxji',
    themeColor: '#7B0D1E'
  },
  {
    id: 'col-royal-bridal',
    name: 'Noor-e-Khaas Royal Bridal',
    tagline: 'Imperial Red Trousseau with Pure Zardozi Bullion',
    description: 'Majestic wedding ensembles engineered with 16 royal kalis and pure bullion wire needlework.',
    categoryName: 'Bridal Lehengas',
    categoryId: 'bridal-lehengas',
    stylesCount: '98 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gJULosK8PiVuzAIH7IbAF5NngImNA5tsGM7FuYmM7G4UM81izSQiwYpsPmrjJQ65ViArxizlv77fZIPelewRXbCun3acNMIL5q37ul6zFGR7snqijdvvSSOxgNqOb7T0kIN5QDtKuTKUnvfBwFcEU55pPUV_JXxAlBQ-hl7zXdwpIHpHlJNG--_DXseeyrbXpYf5dHlBHHMSY4JVUPGmJkeKZrl2prp8FMI6jxvYZEbQVLru4FsD',
    themeColor: '#8B0000'
  },
  {
    id: 'col-temple-kanchipuram',
    name: 'Temple Sacred Kanchipuram',
    tagline: 'Heavy Mulberry Heirlooms with Interlocked Korvai Borders',
    description: 'Revered Tamil weaving traditions featuring solid contrast borders and pure gold pallus.',
    categoryName: 'Kanjeevaram Heirlooms',
    categoryId: 'kanjeevaram-heirlooms',
    stylesCount: '115 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA49q4Hcuh8CweVYJnvB9oyj6XhWxrl105mUiCujpj3UMjRuMnr8rWdwwKIBSbpf_2ViA_qSC2yNseM3NC2wmMPYlatVU6nd83UVcazAxCx10Pa1J75H3JXbQXsPcgoUgf3lBLnUyslVU-bIMMlS964qRphakehpZ9cuWufdvGl9gF2NwnRyEe4uo82f3n_WIJObSQSDXDhNZx-fk2xgs8C6p6nuYglTNgwjHLOQnnTlFH1uRctYOFo',
    themeColor: '#B8860B'
  },
  {
    id: 'col-nocturne-soiree',
    name: 'Nocturne Gala Soirée',
    tagline: 'Midnight Velvet Elegance for Diplomatic Receptions',
    description: 'Couture floor-grazing gowns with pearl micro-piping and antique dabka accents.',
    categoryName: 'Evening Gowns & Anarkalis',
    categoryId: 'evening-gowns',
    stylesCount: '76 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXoiuayiZNgsekUN2u0MqEqeo9MsIY6U5Ttt5oGkWLOBkISiIDb5MLD4CHPqTsYhryoD15koe9XPyCCXnFdN3cE36_z3iPlwBauKklOnFmJ2qEWL0sXz0lTWgU3Tkne2_Qnlv4DlvQX3SkqUQWlNc9pbvdoXF6Ai6YPOhD79vpq2hh2BsxoSVV_qkfTZbrt6ygqIyiJ6hpZ_20k2szL-86bDHSq5CJem2zbIQu9JyoYbwlymaeMRcb',
    themeColor: '#1a1c1b'
  },
  {
    id: 'col-imperial-groom',
    name: "Imperial Groom's Wardrobe",
    tagline: 'Savile-Row Precision meets Awadh Court Royalty',
    description: 'Hand-spun Matka raw silk sherwanis and achkans embellished with carved brass buttons.',
    categoryName: "Men's Sherwanis & Kurtas",
    categoryId: 'mens-sherwanis',
    stylesCount: '64 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBugx11FsDKN_jRHNybXK2ihZ1fIpSYXGyyAiaKzjMQD1L_8wsAOFFoP2BGnSrcNzVXhxooF0mHtebH4rRtTfNkVXm7X-DNVMhcDtV8tBrUz08QNPvgSInpn_G422DqtjI-Ad5VC7orXxMbFk6EC-lOK4iHyccC-Cvk8-qN1LjEpkzsir0MbQRA4UeXa-Xc2J8WVWNlNs12N2DI9Fo9VEAen-eUsQQpcT3qqO3NXCsjXYQIgY5SNyD4',
    themeColor: '#4A3B32'
  },
  {
    id: 'col-nizam-treasury',
    name: 'The Nizam Treasury',
    tagline: 'Uncut Jadau Polki, Emerald Tumbles & Enamel Art',
    description: 'Hand-strung freshwater pearls, gold-foiled kundan gems, and reverse meenakari secrets.',
    categoryName: 'High Jewelry & Polki',
    categoryId: 'high-jewelry',
    stylesCount: '82 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwL5AQqeFuOFfQd94XCmZsoOjw-PkeGAwVyM9SliK55IQnrnRSubp0TP7uYpe_6Vn-iEDCyOS1QC-UtV3EbfVlRX1WO1F5844kXjEzq6xWCuOk8_K2FgjIr1MQXtB-TS1zo9ve29tS5y3ibGpvQUTImFYXOk2Qf_3GCg7WAf0MPFRqWqWGaW799trZzkZstRCf_pilTzzt0_NBLtsPUWZfRHTeFZGAmwP-dtvFn4BLnmxlRVuChtt5',
    themeColor: '#D4AF37'
  },
  {
    id: 'col-awadh-chikan',
    name: 'Noor-e-Awadh Chikan Atelier',
    tagline: 'Ethereal White-on-White Needlecraft & Gilded Mukaish',
    description: 'Heritage Awadhi shadow stitches paired with metallic mukaish dots on crisp mulberry organza.',
    categoryName: 'Awadhi Chikankari & Tissue',
    categoryId: 'chikankari-tissue',
    stylesCount: '58 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCklfmo7ksLtEgHgtygM5o_1-y5pu5Y3Hx0EJBNh8Lr-KWSDvbDwXf2GDQs26AVVV_RvtQ6EysTnyZIeTr2tC5shFb-JBRF8BQMR1VRHpvRsMr8S01flgDzCQyUQcq_bEBoi82Nu4oddV1aEBLky5YXgAcCsliCnYgVwRF-2rV52ksGz2Ujt_H4euaaCMOCTj-yfoWtvZHUB8H1DFSfAQ1DX_CjEdacHLMkAA-leBE6ZI26t3KdAdWh',
    themeColor: '#735c00'
  },
  {
    id: 'col-jodhpur-regalia',
    name: 'Jodhpur Royal Regalia',
    tagline: 'Structured Royal Bandhgalas & Aristocratic Cut',
    description: 'Tailored micro-velvet jackets with structured shoulders, horn buttons, and silk lining.',
    categoryName: 'Royal Bandhgalas & Jackets',
    categoryId: 'royal-bandhgalas',
    stylesCount: '46 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSai4mnkjBBXlJogvWOntp00DUK_eKCjanr1_OOWOwtkpry_LVq7w1Y9FjOxwynaRykqU3PrMArPczVF_JM2eR9ct62QrPuqsMZgsab316vL1tZ68oEtB1lIfhum8UA4VQskste_V8GutH1smK80WuUeUIzzF6MPUTPYzV5w7z0mBqthB85eK5wLPb5kOWAWodqS_kDsPbp1Vz-OX2G-nix60CdH-kXnkEkJ43I7482-w2zOj6VmIl',
    themeColor: '#2C3E50'
  },
  {
    id: 'col-heirloom-stoles',
    name: 'Pashmina & Silk Odhanis',
    tagline: 'Artisanal Himalayan Wraps & Meenakari Drapes',
    description: 'Hand-spun Changthangi pashmina woven with fine metallic tilla needle embroidery.',
    categoryName: 'Artisanal Dupattas & Stoles',
    categoryId: 'dupattas-stoles',
    stylesCount: '68 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1uTpRcAAvAXnZASOHzZ3OESnOOA1qQN6gozpH4zKwvCMQYVI70zJxXdknia5Ng_nzilWGDEqYyIYlZDHWHdXMTOgqvJZNxGeShoawagMU4UhisSj7Kr8g6_5OZbVDTqK9jh8g-YF_ohuzieeBdDQMsIKScOFhrs-0eDiJUNhLq4aeHmEc5XENaITxNN3ZKAWYTHgeRvU1VYHKQAV6AQRJorJITvHAn27PU0eimnIv4tN-E9bxvC3u',
    themeColor: '#6B4226'
  },
  {
    id: 'col-maharani-trousseau',
    name: 'Maharani Trousseau Accents',
    tagline: 'Gilded Minaudières & Antique Zardozi Batwa Potlis',
    description: 'Exquisite handheld objets d’art handcrafted by ancestral court embroiderers.',
    categoryName: 'Trousseau Bags & Accessories',
    categoryId: 'trousseau-accessories',
    stylesCount: '52 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBNI2ftz3EpEh-eM7qDhfH9OW0QC4x-Fy8FiS7ugVCPTcLzSrhf94WhHghyohcL5DYUytgzWRItUK1vgSkDvsYLAtwkCN2HO8IAQ2qagbb0CJhnuxxZ7udrfVq5jDP1Jb9oITqPF7wptJrCOYPmJi1VIwTG-2Ib-VwSQ2LiIIj36HONQri6brST5cJlU5kjIMRMZjuCg1mtrxZJaAcsbbKBPeoh99GxSWIjqA32CWac6YaGAwxLBQOj',
    themeColor: '#5C3A21'
  }
];

// Product Definitions spanning all 10 Categories and matching Collections

export const AURUM_SAREE_PRODUCT: Product = {
  id: 'mst-saree-aurum-9924',
  title: 'Aurum Handloom Zari Saree & Tailored Blouse Set',
  subtitle: 'Aurum Handloom Saree',
  atelier: 'MST Atelier Global • Varanasi Masterloom',
  sku: 'MST-SKU-9924-RED',
  priceINR: 28500,
  mrpINR: 35000,
  rating: 4.9,
  reviewCount: 142,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOlJ9FgV5VUrfATK6CQ2QHUj1hKZHsEETvfrQRtATzi8iYhXW4j8B9a1qh0c0_d6e8cTCbYtjJ01O6w7Wu-Wpdh95UvcjwMeqOC2keQGPzg3J1KmgGRKdBdaqtz2-r2usPgBEf9wIaqYOTIDjPrx40bb6-CQ1AiNDhShrbFqxb2KWqBVKCNcT78v6WykKQCrdvB70ia7j8ZVH7sxQ6b48ZV5GpC2P8Kn5xnldjqmIoPkHChW_TsJ6a',
  galleryImages: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA49q4Hcuh8CweVYJnvB9oyj6XhWxrl105mUiCujpj3UMjRuMnr8rWdwwKIBSbpf_2ViA_qSC2yNseM3NC2wmMPYlatVU6nd83UVcazAxCx10Pa1J75H3JXbQXsPcgoUgf3lBLnUyslVU-bIMMlS964qRphakehpZ9cuWufdvGl9gF2NwnRyEe4uo82f3n_WIJObSQSDXDhNZx-fk2xgs8C6p6nuYglTNgwjHLOQnnTlFH1uRctYOFo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCklfmo7ksLtEgHgtygM5o_1-y5pu5Y3Hx0EJBNh8Lr-KWSDvbDwXf2GDQs26AVVV_RvtQ6EysTnyZIeTr2tC5shFb-JBRF8BQMR1VRHpvRsMr8S01flgDzCQyUQcq_bEBoi82Nu4oddV1aEBLky5YXgAcCsliCnYgVwRF-2rV52ksGz2Ujt_H4euaaCMOCTj-yfoWtvZHUB8H1DFSfAQ1DX_CjEdacHLMkAA-leBE6ZI26t3KdAdWh',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqY0KwL55xvK9kchrME1GfmK_tpSwsD_Yltg5uUJgJu78w-W2YhPMzsAfneh4g8wC8-Yn8e9oKpmFnihRnZHLaq-laIe0dXrlVpdCZCsQEUzVQR4rFh1CE2zOgcVvUe7QdGwPY9MriqYZUDsx40KVj6kPvv84g6ZoK9T0PsrAFB3nECN_ORPbNYRLTz7hE0IFu4sB4jP8bf6xWKCETrVkuuxGhfdm4B5ASggcf4MnfSuv1oA36rTlI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDEFkJqeMWL7EvqlNIFvi20tR2eSblwbeosGfXLd5GU0Oa_UNN9mwLtGE4Fvn2mSZ1t8WV5-LGc81XiKgPeDJMNUWytuKWd6z0MsIk_mQ_bLJLwIWihQA6XHuakPO7lntznsue3lwxWyX9tLP8qingqDw5OzfrG2xJHJBHbnSOM8_ri1ZQhhHUCX5dMN6PA3lReELnrpV893WJj3PXoVVCmnLdr5uBc8oNmiWrWKvH-tHf-te_diEwi'
  ],
  category: 'Banarasi Silk',
  categoryId: 'banarasi-silk',
  collection: 'Varanasi Masterloom Archive',
  collectionId: 'col-varanasi-masterloom',
  tags: ['Only 3 Left', '-18%'],
  editionBadge: 'EDITION NO. 18/50',
  stockLimit: 3,
  isRareWeave: true,
  colors: [
    { name: 'Imperial Crimson & Antique Gold', hex: '#7B0D1E' },
    { name: 'Royal Emerald Green', hex: '#0E4733' },
    { name: 'Royal Midnight Navy', hex: '#111E38' },
    { name: 'Antique Champagne Gold', hex: '#D4AF37' }
  ],
  sizes: [
    { label: 'Unstitched', sublabel: 'Included (1.0m)', priceDeltaINR: 0 },
    { label: 'Custom Bespoke', sublabel: '+ ₹2,400', priceDeltaINR: 2400 },
    { label: 'XS', sublabel: 'Bust 34"', priceDeltaINR: 0 },
    { label: 'S', sublabel: 'Bust 36"', priceDeltaINR: 0 },
    { label: 'M', sublabel: 'Bust 38"', priceDeltaINR: 0 },
    { label: 'L', sublabel: 'Bust 40"', priceDeltaINR: 0 },
    { label: 'XL', sublabel: 'Bust 42"', priceDeltaINR: 0 },
    { label: 'XXL', sublabel: 'Bust 44"', priceDeltaINR: 0 },
    { label: 'XXXL', sublabel: 'Bust 46"', priceDeltaINR: 0 }
  ],
  description:
    'Hand-spun Mulberry silk woven by master artisans of Varanasi with pure electroplated gilded threads. Designed for grand weddings and gala receptions, celebrating centuries of ceremonial textile art.',
  fabricBase: '100% Pure Mulberry Katan Silk (High GSM)',
  zariComposition: 'Pure Silver Wire Core with 24-Karat Gold Plating',
  weavingTechnique: 'Fekwa & Kadwa Handloom Technique (180 weaving hours)',
  sareeLength: '5.50 Metres (plus 1.00 Metre matched blouse piece)',
  careInstructions: [
    'Strictly Professional Dry Clean Only to protect delicate metallic zari filaments.',
    'Store folded inside the supplied unbleached MST cotton muslin preservation bag.',
    'Refold periodically along fresh creases every 3-4 months to preserve weave integrity.',
    'Never spray fragrances directly on gold zari threadwork.'
  ],
  shippingNotes: [
    'Complimentary express transit with DHL Express Air Tracked on all international orders exceeding $250.',
    'USA & UK Delivery: 3 to 5 business days from dispatch.',
    'GCC & UAE Delivery: 2 to 4 business days.',
    'Tamper-proof luxury brass-embossed presentation gift box included.'
  ],
  crossSells: [
    {
      id: 'cross-kundan-choker',
      title: 'Nizam Polki Kundan Choker',
      priceINR: 14200,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDzNpC2aeQRqQ4GrBQkEVkm8AFKSQ3l1IdltDUO3o4r5sC6zSWfIjnvDDFdWqLm0heUJ8evxG8O01LSJlCSF3WOwSAFAYaBwqYfngQE6wc-tibhpjDn6cyWCQUmcq9c5NN7gQ5-Z1bskC6oUno9gbYqxDqpOVjePfrRtPPaoxMNzyckJaDgx8ELnugi0x5ZvivRvzX82riECxltzcXi8vil4KKa0fSHXK8XnJ0eswpYWSUHIaNjzpca'
    },
    {
      id: 'cross-minaudiere',
      title: 'Zardozi Pearl Minaudière',
      priceINR: 6800,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNI2ftz3EpEh-eM7qDhfH9OW0QC4x-Fy8FiS7ugVCPTcLzSrhf94WhHghyohcL5DYUytgzWRItUK1vgSkDvsYLAtwkCN2HO8IAQ2qagbb0CJhnuxxZ7udrfVq5jDP1Jb9oITqPF7wptJrCOYPmJi1VIwTG-2Ib-VwSQ2LiIIj36HONQri6brST5cJlU5kjIMRMZjuCg1mtrxZJaAcsbbKBPeoh99GxSWIjqA32CWac6YaGAwxLBQOj'
    }
  ]
};

export const SHIKARGAH_BANARASI_PRODUCT: Product = {
  id: 'mst-saree-shikargah-7701',
  title: 'Shikargah Vintage Kadwa Brocade Silk Saree',
  subtitle: 'Varanasi Royal Hunting Motif Archive',
  atelier: 'MST Atelier Global • Ganga Loom Guild',
  sku: 'MST-SKU-7701-EMR',
  priceINR: 38200,
  mrpINR: 46000,
  rating: 4.9,
  reviewCount: 68,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDqY0KwL55xvK9kchrME1GfmK_tpSwsD_Yltg5uUJgJu78w-W2YhPMzsAfneh4g8wC8-Yn8e9oKpmFnihRnZHLaq-laIe0dXrlVpdCZCsQEUzVQR4rFh1CE2zOgcVvUe7QdGwPY9MriqYZUDsx40KVj6kPvv84g6ZoK9T0PsrAFB3nECN_ORPbNYRLTz7hE0IFu4sB4jP8bf6xWKCETrVkuuxGhfdm4B5ASggcf4MnfSuv1oA36rTlI',
  category: 'Banarasi Silk',
  categoryId: 'banarasi-silk',
  collection: 'Varanasi Masterloom Archive',
  collectionId: 'col-varanasi-masterloom',
  tags: ['Rare Masterloom', 'Heritage Award'],
  editionBadge: 'EDITION NO. 06/20',
  stockLimit: 2,
  isRareWeave: true,
  colors: [
    { name: 'Royal Emerald Green', hex: '#0E4733' },
    { name: 'Imperial Claret Red', hex: '#630B18' }
  ],
  sizes: [
    { label: 'Unstitched', sublabel: 'With Blouse Piece', priceDeltaINR: 0 },
    { label: 'Custom Tailored', sublabel: '+ ₹2,400', priceDeltaINR: 2400 }
  ],
  description:
    'Exquisite Shikargah handloom weave depicting antique wildlife and floral jungle scenes in pure kadwa electroplated silver zari on emerald katan silk.',
  fabricBase: '100% Pure Heavy Katan Silk',
  zariComposition: 'Pure Silver Wire Kadwa with Antique Muted Sheen',
  weavingTechnique: 'Authentic Banarasi Kadwa Brocade (240 Hours)',
  sareeLength: '5.50 Metres with 1.00 Metre Blouse',
  careInstructions: ['Professional Dry Clean Only', 'Store in cotton muslin wrap'],
  shippingNotes: ['Insured express international delivery', 'Dispatches in 48 hours']
};

export const NOCTURNE_ANARKALI_PRODUCT: Product = {
  id: 'mst-anarkali-nocturne-8810',
  title: 'Nocturne Velvet Anarkali with Dabka Needlework',
  subtitle: 'Nocturne Velvet Anarkali',
  atelier: 'MST Atelier Global • Lucknow Zardozi Guild',
  sku: 'MST-SKU-8810-BLK',
  priceINR: 19900,
  mrpINR: 24000,
  rating: 4.8,
  reviewCount: 94,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCkSa2CNKrxTRu5XcbrnsWKyQuqlYoRgMy6aPKwnqjj1Ym9KDru3UYeUZKhOtOPw0aUUuoBRIERF18C3_91rnynkCUsbUnHhqX3treZGVOG0GxKC_ovPPR0Q9m8ByTsnVIrmI7qFVD9QkyYdoEmlGy0XSPNQW7gg6-S9ROGvDihqXI47IEsK5IJ0EEZZdkPRh1FgeC8mTgF59u_w6IVTSCutpsAjY30I3wGnk2oQxTTFG59QwYqeaT0',
  galleryImages: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCkSa2CNKrxTRu5XcbrnsWKyQuqlYoRgMy6aPKwnqjj1Ym9KDru3UYeUZKhOtOPw0aUUuoBRIERF18C3_91rnynkCUsbUnHhqX3treZGVOG0GxKC_ovPPR0Q9m8ByTsnVIrmI7qFVD9QkyYdoEmlGy0XSPNQW7gg6-S9ROGvDihqXI47IEsK5IJ0EEZZdkPRh1FgeC8mTgF59u_w6IVTSCutpsAjY30I3wGnk2oQxTTFG59QwYqeaT0'
  ],
  category: 'Evening Gowns & Anarkalis',
  categoryId: 'evening-gowns',
  collection: 'Nocturne Gala Soirée',
  collectionId: 'col-nocturne-soiree',
  tags: ['Bespoke'],
  editionBadge: 'LIMITED COUTURE',
  stockLimit: 5,
  isRareWeave: false,
  colors: [
    { name: 'Midnight Onyx Black', hex: '#1a1c1b' },
    { name: 'Deep Burgundy Velvet', hex: '#392131' }
  ],
  sizes: [
    { label: 'M', sublabel: 'Bust 38"', priceDeltaINR: 0 },
    { label: 'L', sublabel: 'Bust 40"', priceDeltaINR: 0 },
    { label: 'XL', sublabel: 'Bust 42"', priceDeltaINR: 0 },
    { label: 'Custom Couture', sublabel: 'Made to Measure', priceDeltaINR: 3000 }
  ],
  description:
    'Luxury midnight black micro-velvet anarkali styled with intricate antique dabka needlework, paired with a sheer scalloped organza dupatta with hand-finished pearl edging.',
  fabricBase: 'Heavyweight Micro-Velvet & Mulberry Organza',
  zariComposition: 'Tonal Antique Dabka Wire with Resham Silk Thread',
  weavingTechnique: 'Zardozi Hand Embroidery & Fine Chikan Appliqué',
  sareeLength: 'Full length 56 inch gown with floor-grazing flared kalis',
  careInstructions: [
    'Dry Clean Only with velvet steaming protocols.',
    'Do not iron directly on dabka embroidery.',
    'Store on padded wooden hanger.'
  ],
  shippingNotes: [
    'Ships in 48 hours via DHL Express.',
    'Pre-fitted with 2 inches alteration margin.'
  ]
};

export const SULTANA_SCALLOP_GOWN_PRODUCT: Product = {
  id: 'prod-gown-sultana-8840',
  title: 'Sultana Scalloped Zardozi Gown & Organza Cape',
  subtitle: 'Couture Red Carpet Silhouette',
  atelier: 'MST Atelier Global • Paris & Delhi Guild',
  sku: 'MST-SKU-8840-GOW',
  priceINR: 32400,
  mrpINR: 39000,
  rating: 4.9,
  reviewCount: 45,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAXoiuayiZNgsekUN2u0MqEqeo9MsIY6U5Ttt5oGkWLOBkISiIDb5MLD4CHPqTsYhryoD15koe9XPyCCXnFdN3cE36_z3iPlwBauKklOnFmJ2qEWL0sXz0lTWgU3Tkne2_Qnlv4DlvQX3SkqUQWlNc9pbvdoXF6Ai6YPOhD79vpq2hh2BsxoSVV_qkfTZbrt6ygqIyiJ6hpZ_20k2szL-86bDHSq5CJem2zbIQu9JyoYbwlymaeMRcb',
  category: 'Evening Gowns & Anarkalis',
  categoryId: 'evening-gowns',
  collection: 'Nocturne Gala Soirée',
  collectionId: 'col-nocturne-soiree',
  tags: ['Red Carpet Ready'],
  editionBadge: 'EDITION NO. 09/35',
  stockLimit: 4,
  isRareWeave: false,
  colors: [
    { name: 'Champagne Taupe', hex: '#C8B89E' },
    { name: 'Midnight Onyx', hex: '#1C1B1B' }
  ],
  sizes: [
    { label: 'S', sublabel: 'Bust 34"', priceDeltaINR: 0 },
    { label: 'M', sublabel: 'Bust 36"', priceDeltaINR: 0 },
    { label: 'L', sublabel: 'Bust 38"', priceDeltaINR: 0 },
    { label: 'Bespoke Fit', sublabel: 'Custom Tailored', priceDeltaINR: 3500 }
  ],
  description:
    'Architectural evening gown featuring scalloped antique bullion cord hand-embroidered onto sheer illusion netting, draped with a detachable floor-length silk organza cape.',
  fabricBase: 'Silk Chiffon, French Netting & Mulberry Organza',
  zariComposition: 'Cutdana Glass Beads & Silver Bullion Thread',
  weavingTechnique: 'Aari & Zardozi Needlecraft',
  careInstructions: ['Haute Dry Clean Only', 'Store flat in garment box'],
  shippingNotes: ['Pre-draped and steam-packaged', 'DHL Air express worldwide']
};

export const BRIDAL_LEHENGA_PRODUCT: Product = {
  id: 'prod-lehenga-gulzar',
  title: 'Gulzar Crimson Zardozi Lehenga',
  subtitle: 'Master Atelier Heritage Bridal',
  category: 'Bridal Lehengas',
  categoryId: 'bridal-lehengas',
  collection: 'Noor-e-Khaas Royal Bridal',
  collectionId: 'col-royal-bridal',
  sku: 'MST-SKU-7721-LEH',
  editionBadge: 'EDITION NO. 04/25',
  atelier: 'MST Atelier Global • Old Delhi Master Zardozi',
  rating: 5.0,
  reviewCount: 78,
  priceINR: 145000,
  mrpINR: 175000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAMHYuHfCmRab2TMBrgBum-YFzIVk1oY4xvdolkp8XA7ugn3gR4eAmrf3ZJ-nUG1eOGjKVlhCPa4-VVgJ5W-WJDQ0ZDvPkbcoFRYmH1XeKKYIkvqWqbxy_kM3nvP8eM6swHlFfQFoLuL6xQF90y_2mK24ek1Sl3A7gvBRWIerlh-Eo7lV2Gf1_a3qeofao9PJHTRiPd1p0dRV_9ncQ_2rhCMbVj_u40JC46FM9oz7Xj09h4SKqqD4XI',
  stockLimit: 3,
  isRareWeave: true,
  colors: [
    { name: 'Imperial Vermillion', hex: '#8B0000' },
    { name: 'Antique Rani Pink', hex: '#A81C51' }
  ],
  sizes: [
    { label: 'S', sublabel: 'Waist 28"', priceDeltaINR: 0 },
    { label: 'M', sublabel: 'Waist 30"', priceDeltaINR: 0 },
    { label: 'Custom Couture', sublabel: 'Bespoke Fit', priceDeltaINR: 5000 }
  ],
  description:
    'Hand-embroidered pure silk lehenga adorned with real metal bullion wire, seed pearls, and uncut stones, complete with double organza dupattas.',
  fabricBase: 'Heavy Raw Silk & Hand-Woven Organza',
  zariComposition: 'Real Silver Bullion Electroplated in 24K Gold',
  weavingTechnique: 'Pure Zardozi, Marodi & Pitta Work',
  sareeLength: '16 Kalis with 6-Meter Royal Flare',
  careInstructions: ['Specialist Haute Dry Clean only', 'Keep in acid-free preservation box'],
  shippingNotes: ['Crafted to order in 14 days', 'Worldwide door-to-door courier']
};

export const MUMTAZ_EMERALD_LEHENGA_PRODUCT: Product = {
  id: 'prod-lehenga-mumtaz-7790',
  title: 'Mumtaz Emerald Velvet Royal Kalidar Lehenga',
  subtitle: 'Mughal Courtyard Heritage Masterpiece',
  category: 'Bridal Lehengas',
  categoryId: 'bridal-lehengas',
  collection: 'Noor-e-Khaas Royal Bridal',
  collectionId: 'col-royal-bridal',
  sku: 'MST-SKU-7790-VEL',
  editionBadge: 'EDITION NO. 02/15',
  atelier: 'MST Atelier Global • Jaipur Court Guild',
  rating: 5.0,
  reviewCount: 39,
  priceINR: 185000,
  mrpINR: 220000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gJULosK8PiVuzAIH7IbAF5NngImNA5tsGM7FuYmM7G4UM81izSQiwYpsPmrjJQ65ViArxizlv77fZIPelewRXbCun3acNMIL5q37ul6zFGR7snqijdvvSSOxgNqOb7T0kIN5QDtKuTKUnvfBwFcEU55pPUV_JXxAlBQ-hl7zXdwpIHpHlJNG--_DXseeyrbXpYf5dHlBHHMSY4JVUPGmJkeKZrl2prp8FMI6jxvYZEbQVLru4FsD',
  stockLimit: 2,
  isRareWeave: true,
  colors: [
    { name: 'Royal Emerald Velvet', hex: '#0B3B24' },
    { name: 'Imperial Maroon Velvet', hex: '#4A0E17' }
  ],
  sizes: [
    { label: 'M', sublabel: 'Waist 30"', priceDeltaINR: 0 },
    { label: 'L', sublabel: 'Waist 32"', priceDeltaINR: 0 },
    { label: 'Royal Bespoke', sublabel: 'Custom Silhouette', priceDeltaINR: 6500 }
  ],
  description:
    'Heavy micro-velvet bridal skirt with 20 flared kalis encrusted with genuine river pearls, kundan cabochons, and antique gold salma-sitara embroidery.',
  fabricBase: 'Pure Silk Velvet with Brocade Can-Can Underskirt',
  zariComposition: '24K Gilded Silver Thread & Badla Metal',
  weavingTechnique: 'Zardozi, Dabka & Vasli Work (420 Handcraft Hours)',
  sareeLength: '20 Kalis with 7.2-Meter Royal Flare',
  careInstructions: ['Museum Conservation Dry Clean Only', 'Supplied in velvet-lined steamer trunk'],
  shippingNotes: ['Private courier delivery with White Glove insurance']
};

export const KANJEEVARAM_MAYIL_PRODUCT: Product = {
  id: 'prod-kanjeevaram-mayil-4410',
  title: 'Mayil Korvai Temple Border Kanjeevaram Silk Saree',
  subtitle: 'Sacred Kanchipuram Loom Heirloom',
  category: 'Kanjeevaram Heirlooms',
  categoryId: 'kanjeevaram-heirlooms',
  collection: 'Temple Sacred Kanchipuram',
  collectionId: 'col-temple-kanchipuram',
  sku: 'MST-SKU-4410-MAY',
  editionBadge: 'SACRED ARCHIVE',
  atelier: 'MST Atelier Global • Kanchipuram Master Guild',
  rating: 4.9,
  reviewCount: 92,
  priceINR: 34800,
  mrpINR: 42000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA49q4Hcuh8CweVYJnvB9oyj6XhWxrl105mUiCujpj3UMjRuMnr8rWdwwKIBSbpf_2ViA_qSC2yNseM3NC2wmMPYlatVU6nd83UVcazAxCx10Pa1J75H3JXbQXsPcgoUgf3lBLnUyslVU-bIMMlS964qRphakehpZ9cuWufdvGl9gF2NwnRyEe4uo82f3n_WIJObSQSDXDhNZx-fk2xgs8C6p6nuYglTNgwjHLOQnnTlFH1uRctYOFo',
  stockLimit: 4,
  isRareWeave: true,
  colors: [
    { name: 'Kunkumam Red & Mustard Gold', hex: '#9E1B32' },
    { name: 'Peacock Teal & Korvai Gold', hex: '#005F73' }
  ],
  sizes: [
    { label: 'Unstitched', sublabel: 'With Silk Blouse', priceDeltaINR: 0 },
    { label: 'South Temple Stitched', sublabel: '+ ₹2,200', priceDeltaINR: 2200 }
  ],
  description:
    'Triple-ply pure mulberry silk saree woven in Kanchipuram using ancient petni interlocking and korvai temple spire motifs with heavy pure zari pallu.',
  fabricBase: '3-Ply Pure Mulberry Kanchipuram Silk',
  zariComposition: 'Pure Silver Core with 0.6% Genuine Gold Gilding',
  weavingTechnique: 'Authentic Korvai Handloom (Two Weavers on Single Loom)',
  sareeLength: '6.20 Metres with Attached Contrast Blouse',
  careInstructions: ['Dry Clean with silk preservation', 'Air periodically in indirect breeze'],
  shippingNotes: ['Silk Mark Certified authenticity tag included', 'Dispatches in 24 hours']
};

export const MEN_SHERWANI_PRODUCT: Product = {
  id: 'prod-sherwani-sheesh',
  title: 'Sheesh Mahal Ivory Raw Silk Sherwani',
  subtitle: 'Royal Groom Atelier Collection',
  category: "Men's Sherwanis & Kurtas",
  categoryId: 'mens-sherwanis',
  collection: "Imperial Groom's Wardrobe",
  collectionId: 'col-imperial-groom',
  sku: 'MST-SKU-5512-SHR',
  editionBadge: 'EDITION NO. 11/30',
  atelier: 'MST Atelier Global • Lucknow Chikan & Zari',
  rating: 4.9,
  reviewCount: 52,
  priceINR: 58000,
  mrpINR: 68000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBugx11FsDKN_jRHNybXK2ihZ1fIpSYXGyyAiaKzjMQD1L_8wsAOFFoP2BGnSrcNzVXhxooF0mHtebH4rRtTfNkVXm7X-DNVMhcDtV8tBrUz08QNPvgSInpn_G422DqtjI-Ad5VC7orXxMbFk6EC-lOK4iHyccC-Cvk8-qN1LjEpkzsir0MbQRA4UeXa-Xc2J8WVWNlNs12N2DI9Fo9VEAen-eUsQQpcT3qqO3NXCsjXYQIgY5SNyD4',
  stockLimit: 6,
  isRareWeave: false,
  colors: [
    { name: 'Warm Ivory Champagne', hex: '#EDE8D0' },
    { name: 'Heritage Midnight Navy', hex: '#111E38' }
  ],
  sizes: [
    { label: '38', sublabel: 'Chest 38"', priceDeltaINR: 0 },
    { label: '40', sublabel: 'Chest 40"', priceDeltaINR: 0 },
    { label: '42', sublabel: 'Chest 42"', priceDeltaINR: 0 },
    { label: 'Custom Tailored', sublabel: 'Made to Measure', priceDeltaINR: 2500 }
  ],
  description:
    'Tailored hand-spun ivory raw silk sherwani featuring micro-textured tonal resham thread work, paired with churidar and handloom tissue stole.',
  fabricBase: '100% Hand-Spun Matka Raw Silk',
  zariComposition: 'Fine Resham Silk & Muted Champagne Metal Thread',
  weavingTechnique: 'Tonal Jaal Needlework with Hand-Carved Brass Buttons',
  sareeLength: 'Standard 42-inch achkan length with flared hem',
  careInstructions: ['Professional Dry Clean Only', 'Store inside breathable garment sleeve'],
  shippingNotes: ['Express Air Freight in 48 hours', 'Includes complimentary fitting alterations']
};

export const BADSHAHI_ANGRAKHA_KURTA_PRODUCT: Product = {
  id: 'prod-kurta-angrakha-5540',
  title: 'Badshahi Angrakha Raw Silk Kurta Set',
  subtitle: 'Imperial Court Asymmetric Silhouette',
  category: "Men's Sherwanis & Kurtas",
  categoryId: 'mens-sherwanis',
  collection: "Imperial Groom's Wardrobe",
  collectionId: 'col-imperial-groom',
  sku: 'MST-SKU-5540-ANG',
  editionBadge: 'COURT CLASSIC',
  atelier: 'MST Atelier Global • Awadh Royal Tailors',
  rating: 4.8,
  reviewCount: 38,
  priceINR: 22600,
  mrpINR: 27500,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSai4mnkjBBXlJogvWOntp00DUK_eKCjanr1_OOWOwtkpry_LVq7w1Y9FjOxwynaRykqU3PrMArPczVF_JM2eR9ct62QrPuqsMZgsab316vL1tZ68oEtB1lIfhum8UA4VQskste_V8GutH1smK80WuUeUIzzF6MPUTPYzV5w7z0mBqthB85eK5wLPb5kOWAWodqS_kDsPbp1Vz-OX2G-nix60CdH-kXnkEkJ43I7482-w2zOj6VmIl',
  stockLimit: 5,
  isRareWeave: false,
  colors: [
    { name: 'Oatmeal Champagne Raw Silk', hex: '#E3DAC9' },
    { name: 'Royal Persian Blue', hex: '#1C39BB' }
  ],
  sizes: [
    { label: '38', sublabel: 'Chest 38"', priceDeltaINR: 0 },
    { label: '40', sublabel: 'Chest 40"', priceDeltaINR: 0 },
    { label: '42', sublabel: 'Chest 42"', priceDeltaINR: 0 },
    { label: '44', sublabel: 'Chest 44"', priceDeltaINR: 0 }
  ],
  description:
    'Crossover overlapping angrakha kurta cut from textured raw silk, decorated with subtle gold piping along the asymmetric placket and paired with silk trousers.',
  fabricBase: '100% Textured Mulberry Raw Silk',
  zariComposition: 'Muted Gold Piping & Handmade Silk Knots',
  weavingTechnique: 'Handloom Textured Weave with Savile Row Tailoring',
  careInstructions: ['Dry clean only', 'Press with damp cloth'],
  shippingNotes: ['Complimentary alterations support included']
};

export const JEWELRY_CHOKER_PRODUCT: Product = {
  id: 'prod-polki-choker',
  title: 'Nizam Polki Kundan Choker & Earrings Set',
  subtitle: 'High Jewelry Atelier',
  category: 'High Jewelry & Polki',
  categoryId: 'high-jewelry',
  collection: 'The Nizam Treasury',
  collectionId: 'col-nizam-treasury',
  sku: 'MST-SKU-3321-JWL',
  editionBadge: 'LIMITED ARCHIVE',
  atelier: 'MST Atelier Global • Jaipur Kundan Studio',
  rating: 4.9,
  reviewCount: 41,
  priceINR: 14200,
  mrpINR: 18000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKtK8zSGo5CUOG04IaWN8uuCh59h3IFrvccA5kC_ESm2OXpiADLpfg0cepdR3NY00NDMs2ypjx1DoeL494uHojYQ_tH5QgJ9NlD64f05AByfBTHAFxIkd_TErz-dxYrse01b9cEXc4dze5BrvmTX5VHsHEPaWy3jsN8LjTXnA-z_ILCpKgwH1RoOo6mBkm0TvulZDunxJk1zLFXIJMOOoGqCGZJ_4W238XLsuoY-2TojqRPEZu81EQ',
  stockLimit: 8,
  isRareWeave: false,
  colors: [{ name: '24K Micron Gold Plated', hex: '#D4AF37' }],
  sizes: [{ label: 'Standard', sublabel: 'Adjustable Silk Dori', priceDeltaINR: 0 }],
  description:
    'Hand-set uncut polki kundan glass stones framed by natural freshwater pearls and emerald tumble drops, finished with an adjustable woven silk dori.',
  fabricBase: 'Brass Core with 24K Gold Micron Plating',
  zariComposition: 'Gold Foil Setting & Hand-Strung Pearls',
  weavingTechnique: 'Traditional Jadau Setting & Meenakari Enameling on Reverse',
  sareeLength: 'Adjustable fit for all necklines',
  careInstructions: ['Keep away from perfumes and water', 'Store in plush velvet jewelry pouch'],
  shippingNotes: ['Ships with security anti-tamper seal via DHL Express']
};

export const CHANDRIKA_JADAU_CHANDBALIS_PRODUCT: Product = {
  id: 'prod-jwl-chandbali-3340',
  title: 'Chandrika Jadau Pearl Chandbali Earrings',
  subtitle: 'Crescent Moon Heirloom Ear Jewelry',
  category: 'High Jewelry & Polki',
  categoryId: 'high-jewelry',
  collection: 'The Nizam Treasury',
  collectionId: 'col-nizam-treasury',
  sku: 'MST-SKU-3340-EBR',
  editionBadge: 'ROYAL HEIRLOOM',
  atelier: 'MST Atelier Global • Jaipur Kundan Studio',
  rating: 4.9,
  reviewCount: 56,
  priceINR: 8900,
  mrpINR: 11500,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwL5AQqeFuOFfQd94XCmZsoOjw-PkeGAwVyM9SliK55IQnrnRSubp0TP7uYpe_6Vn-iEDCyOS1QC-UtV3EbfVlRX1WO1F5844kXjEzq6xWCuOk8_K2FgjIr1MQXtB-TS1zo9ve29tS5y3ibGpvQUTImFYXOk2Qf_3GCg7WAf0MPFRqWqWGaW799trZzkZstRCf_pilTzzt0_NBLtsPUWZfRHTeFZGAmwP-dtvFn4BLnmxlRVuChtt5',
  stockLimit: 6,
  isRareWeave: false,
  colors: [{ name: 'Antique 24K Gold Micron', hex: '#D4AF37' }],
  sizes: [{ label: 'One Size', sublabel: 'Ear-Post with Secure Screw', priceDeltaINR: 0 }],
  description:
    'Majestic crescent chandbali earrings featuring tiered natural basra-style seed pearls, ruby colored tumble cabochons, and intricately hand-painted meenakari backing.',
  fabricBase: 'Pure Brass Alloy with Micron Gold Layer',
  zariComposition: 'Jadau Foil Stones & Strung River Pearls',
  weavingTechnique: 'Kundan Setting & Hand-Enamel Cloisonné',
  careInstructions: ['Clean gently with soft cotton cloth', 'Store separate from other metals'],
  shippingNotes: ['Comes in brass-embossed MST jewelry case']
};

export const CHIKANKARI_HAZRATGANJ_KURTA_PRODUCT: Product = {
  id: 'prod-chikan-ivory-6610',
  title: 'Hazratganj Hand-Embroidered Ivory Mukaish Kurta Set',
  subtitle: 'Awadh Shadow-Work Atelier Masterpiece',
  category: 'Awadhi Chikankari & Tissue',
  categoryId: 'chikankari-tissue',
  collection: 'Noor-e-Awadh Chikan Atelier',
  collectionId: 'col-awadh-chikan',
  sku: 'MST-SKU-6610-CHK',
  editionBadge: 'HAND-PULLED NEEDLEWORK',
  atelier: 'MST Atelier Global • Lucknow Chikan Guild',
  rating: 5.0,
  reviewCount: 47,
  priceINR: 18200,
  mrpINR: 22000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCklfmo7ksLtEgHgtygM5o_1-y5pu5Y3Hx0EJBNh8Lr-KWSDvbDwXf2GDQs26AVVV_RvtQ6EysTnyZIeTr2tC5shFb-JBRF8BQMR1VRHpvRsMr8S01flgDzCQyUQcq_bEBoi82Nu4oddV1aEBLky5YXgAcCsliCnYgVwRF-2rV52ksGz2Ujt_H4euaaCMOCTj-yfoWtvZHUB8H1DFSfAQ1DX_CjEdacHLMkAA-leBE6ZI26t3KdAdWh',
  stockLimit: 5,
  isRareWeave: true,
  colors: [
    { name: 'Pristine Awadh Ivory', hex: '#FFFFF0' },
    { name: 'Blush Rosewater', hex: '#FADADD' }
  ],
  sizes: [
    { label: 'S', sublabel: 'Bust 36"', priceDeltaINR: 0 },
    { label: 'M', sublabel: 'Bust 38"', priceDeltaINR: 0 },
    { label: 'L', sublabel: 'Bust 40"', priceDeltaINR: 0 },
    { label: 'XL', sublabel: 'Bust 42"', priceDeltaINR: 0 }
  ],
  description:
    'Handmade by generational master artisans in Lucknow using 32 traditional stitches (Bakhiya, Phanda, Keel Kangan), studded with genuine hand-flattened silver mukaish wire.',
  fabricBase: 'Pure Mulmul Georgette with Silk Cotton Slip',
  zariComposition: 'Pure Silver Flattened Mukaish Wire',
  weavingTechnique: 'Fine Lucknow Hand Chikankari (120 Hours)',
  careInstructions: ['Dry Clean or delicate hand soak with mild soap', 'Do not wring'],
  shippingNotes: ['Includes matching churidar and scalloped chikan dupatta']
};

export const DIAPHANOUS_TISSUE_SAREE_PRODUCT: Product = {
  id: 'prod-tissue-saree-6620',
  title: 'Noor Diaphanous Gold Tissue Handloom Saree',
  subtitle: 'Metallic Weave Ceremony Drape',
  category: 'Awadhi Chikankari & Tissue',
  categoryId: 'chikankari-tissue',
  collection: 'Noor-e-Awadh Chikan Atelier',
  collectionId: 'col-awadh-chikan',
  sku: 'MST-SKU-6620-TIS',
  editionBadge: 'LIMITED WEAVE',
  atelier: 'MST Atelier Global • Varanasi Masterloom',
  rating: 4.8,
  reviewCount: 34,
  priceINR: 26800,
  mrpINR: 32000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDEFkJqeMWL7EvqlNIFvi20tR2eSblwbeosGfXLd5GU0Oa_UNN9mwLtGE4Fvn2mSZ1t8WV5-LGc81XiKgPeDJMNUWytuKWd6z0MsIk_mQ_bLJLwIWihQA6XHuakPO7lntznsue3lwxWyX9tLP8qingqDw5OzfrG2xJHJBHbnSOM8_ri1ZQhhHUCX5dMN6PA3lReELnrpV893WJj3PXoVVCmnLdr5uBc8oNmiWrWKvH-tHf-te_diEwi',
  stockLimit: 3,
  isRareWeave: true,
  colors: [
    { name: 'Gilded Champagne Tissue', hex: '#D4AF37' },
    { name: 'Rose Gold Metallic', hex: '#B76E79' }
  ],
  sizes: [
    { label: 'Unstitched', sublabel: 'With Metallic Blouse', priceDeltaINR: 0 },
    { label: 'Tailored Blouse', sublabel: '+ ₹2,400', priceDeltaINR: 2400 }
  ],
  description:
    'Featherlight metallic tissue silk woven with ultra-fine gold yarn weft, creating a luminous, fluid drape that reflects ambient candlelight.',
  fabricBase: 'Fine Metallic Tissue & Mulberry Silk',
  zariComposition: 'Pure Gilded Filament Thread with High Luster',
  weavingTechnique: 'Plain Warp with High-Density Metallic Weft',
  sareeLength: '5.5 Metres with 1 Metre Blouse',
  careInstructions: ['Dry Clean Only', 'Steam lightly on reverse side only'],
  shippingNotes: ['Delivered in anti-tarnish protective tissue wrap']
};

export const JODHPUR_ONYX_BANDHGALA_PRODUCT: Product = {
  id: 'prod-bandhgala-onyx-2210',
  title: 'Jodhpur Onyx Micro-Velvet Bandhgala Jacket',
  subtitle: 'Aristocratic Mandarin Collar Couture',
  category: 'Royal Bandhgalas & Jackets',
  categoryId: 'royal-bandhgalas',
  collection: 'Jodhpur Royal Regalia',
  collectionId: 'col-jodhpur-regalia',
  sku: 'MST-SKU-2210-BDH',
  editionBadge: 'HERITAGE TAILORED',
  atelier: 'MST Atelier Global • Jodhpur Court Tailors',
  rating: 4.9,
  reviewCount: 42,
  priceINR: 36500,
  mrpINR: 44000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSai4mnkjBBXlJogvWOntp00DUK_eKCjanr1_OOWOwtkpry_LVq7w1Y9FjOxwynaRykqU3PrMArPczVF_JM2eR9ct62QrPuqsMZgsab316vL1tZ68oEtB1lIfhum8UA4VQskste_V8GutH1smK80WuUeUIzzF6MPUTPYzV5w7z0mBqthB85eK5wLPb5kOWAWodqS_kDsPbp1Vz-OX2G-nix60CdH-kXnkEkJ43I7482-w2zOj6VmIl',
  stockLimit: 4,
  isRareWeave: false,
  colors: [
    { name: 'Onyx Midnight Black', hex: '#111111' },
    { name: 'Imperial Prussian Blue', hex: '#003153' }
  ],
  sizes: [
    { label: '38', sublabel: 'Chest 38"', priceDeltaINR: 0 },
    { label: '40', sublabel: 'Chest 40"', priceDeltaINR: 0 },
    { label: '42', sublabel: 'Chest 42"', priceDeltaINR: 0 },
    { label: 'Bespoke Custom', sublabel: 'Made to Measure', priceDeltaINR: 3500 }
  ],
  description:
    'Architecturally structured royal bandhgala cut from plush micro-velvet, featuring antique carved brass buttons, silk satin interior lining, and welted chest pocket.',
  fabricBase: 'Imported Heavyweight Micro-Velvet with Italian Bemberg Lining',
  zariComposition: 'Hand-Antiqued Brass Buttons with Royal Insignia',
  weavingTechnique: 'Savile Row Structured Canvas Front Tailoring',
  careInstructions: ['Dry clean only by velvet specialist', 'Store on structured cedar coat hanger'],
  shippingNotes: ['Packed in breathable canvas suit carrier with wooden hanger']
};

export const KASHMIRI_PASHMINA_SHAWL_PRODUCT: Product = {
  id: 'prod-dupatta-kashmiri-1110',
  title: 'Chinar Hand-Spun Kashmiri Tilla Pashmina Shawl',
  subtitle: 'Himalayan Changthangi Master Heritage',
  category: 'Artisanal Dupattas & Stoles',
  categoryId: 'dupattas-stoles',
  collection: 'Pashmina & Silk Odhanis',
  collectionId: 'col-heirloom-stoles',
  sku: 'MST-SKU-1110-PSH',
  editionBadge: 'HAND-SPUN CERTIFIED',
  atelier: 'MST Atelier Global • Srinagar Guild',
  rating: 5.0,
  reviewCount: 63,
  priceINR: 29800,
  mrpINR: 36000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD1uTpRcAAvAXnZASOHzZ3OESnOOA1qQN6gozpH4zKwvCMQYVI70zJxXdknia5Ng_nzilWGDEqYyIYlZDHWHdXMTOgqvJZNxGeShoawagMU4UhisSj7Kr8g6_5OZbVDTqK9jh8g-YF_ohuzieeBdDQMsIKScOFhrs-0eDiJUNhLq4aeHmEc5XENaITxNN3ZKAWYTHgeRvU1VYHKQAV6AQRJorJITvHAn27PU0eimnIv4tN-E9bxvC3u',
  stockLimit: 3,
  isRareWeave: true,
  colors: [
    { name: 'Natural Himalayan Cashmere', hex: '#E6D7C3' },
    { name: 'Walnut Bark Charcoal', hex: '#3E3630' }
  ],
  sizes: [{ label: 'Full Stole', sublabel: '2.5m x 1.0m Draped Wrap', priceDeltaINR: 0 }],
  description:
    'Ultra-fine grade-A Changthangi cashmere hand-spun and hand-woven in the Kashmir valley, embroidered along the four borders with genuine silver-gilded tilla needlework.',
  fabricBase: '100% Pure Certified Ladakhi Pashmina Wool',
  zariComposition: 'Pure Silver Wire Gilded Tilla Thread',
  weavingTechnique: 'Traditional Srinagar Sozni & Tilla Needlecraft',
  careInstructions: ['Specialist Cashmere Dry Clean only', 'Store in natural cedar chest'],
  shippingNotes: ['GI-Tagged Kashmir authenticity hologram included']
};

export const ZARDOZI_PEARL_MINAUDIERE_PRODUCT: Product = {
  id: 'prod-acc-minaudiere-9910',
  title: 'Zardozi Pearl Minaudière Hand-Couture Clutch',
  subtitle: 'Jeweled Trousseau Evening Objet d’Art',
  category: 'Trousseau Bags & Accessories',
  categoryId: 'trousseau-accessories',
  collection: 'Maharani Trousseau Accents',
  collectionId: 'col-maharani-trousseau',
  sku: 'MST-SKU-9910-MIN',
  editionBadge: 'HANDCRAFTED OBJETS',
  atelier: 'MST Atelier Global • Delhi Zardozi Guild',
  rating: 4.9,
  reviewCount: 51,
  priceINR: 6800,
  mrpINR: 8500,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBNI2ftz3EpEh-eM7qDhfH9OW0QC4x-Fy8FiS7ugVCPTcLzSrhf94WhHghyohcL5DYUytgzWRItUK1vgSkDvsYLAtwkCN2HO8IAQ2qagbb0CJhnuxxZ7udrfVq5jDP1Jb9oITqPF7wptJrCOYPmJi1VIwTG-2Ib-VwSQ2LiIIj36HONQri6brST5cJlU5kjIMRMZjuCg1mtrxZJaAcsbbKBPeoh99GxSWIjqA32CWac6YaGAwxLBQOj',
  stockLimit: 7,
  isRareWeave: false,
  colors: [
    { name: 'Champagne Gold & Freshwater Pearl', hex: '#F0E68C' },
    { name: 'Midnight Onyx & Gunmetal', hex: '#1C1B1B' }
  ],
  sizes: [{ label: 'Standard Clutch', sublabel: 'Fits iPhone Pro Max', priceDeltaINR: 0 }],
  description:
    'Rigid brass frame hand-encrusted with freshwater seed pearls, dabka metallic bullion wire, and cutdana crystals. Comes with a detachable gilded snake chain.',
  fabricBase: 'Brass Alloy Shell Lined with Mulberry Raw Silk',
  zariComposition: 'Fine Silver Gilded Wire & Seed Pearls',
  weavingTechnique: 'Aari & Zardozi Hand Embroidery',
  careInstructions: ['Wipe gently with lint-free jewelry cloth', 'Store in satin dust pouch'],
  shippingNotes: ['Comes in luxury hard-shell presentation box']
};

export const ROYAL_EMERALD_BATWA_POTLI_PRODUCT: Product = {
  id: 'prod-acc-potli-9920',
  title: 'Royal Emerald Velvet Trousseau Batwa Potli',
  subtitle: 'Festive Pearl-Tasseled Drawstring Bag',
  category: 'Trousseau Bags & Accessories',
  categoryId: 'trousseau-accessories',
  collection: 'Maharani Trousseau Accents',
  collectionId: 'col-maharani-trousseau',
  sku: 'MST-SKU-9920-POT',
  editionBadge: 'COURT TROUSSEAU',
  atelier: 'MST Atelier Global • Jaipur Zari Studio',
  rating: 4.8,
  reviewCount: 39,
  priceINR: 4900,
  mrpINR: 6200,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOlJ9FgV5VUrfATK6CQ2QHUj1hKZHsEETvfrQRtATzi8iYhXW4j8B9a1qh0c0_d6e8cTCbYtjJ01O6w7Wu-Wpdh95UvcjwMeqOC2keQGPzg3J1KmgGRKdBdaqtz2-r2usPgBEf9wIaqYOTIDjPrx40bb6-CQ1AiNDhShrbFqxb2KWqBVKCNcT78v6WykKQCrdvB70ia7j8ZVH7sxQ6b48ZV5GpC2P8Kn5xnldjqmIoPkHChW_TsJ6a',
  stockLimit: 9,
  isRareWeave: false,
  colors: [
    { name: 'Royal Emerald Velvet', hex: '#0B3B24' },
    { name: 'Imperial Maroon Velvet', hex: '#4A0E17' }
  ],
  sizes: [{ label: 'Standard Potli', sublabel: 'Roomy 8x7 inch pouch', priceDeltaINR: 0 }],
  description:
    'Plush silk velvet festive potli pouch embellished with golden gota patti floral motifs and weighted pearl latkan tassels on braided drawstrings.',
  fabricBase: 'Micro-Velvet with Brocade Lining',
  zariComposition: 'Gota Patti and Antique Bullion Wire',
  weavingTechnique: 'Jaipur Gota & Pearl Hand Tasseling',
  careInstructions: ['Spot clean only', 'Keep in dust bag'],
  shippingNotes: ['Dispatches immediately']
};

export const TRENDING_PRODUCTS: Product[] = [
  AURUM_SAREE_PRODUCT,
  NOCTURNE_ANARKALI_PRODUCT,
  BRIDAL_LEHENGA_PRODUCT,
  KANJEEVARAM_MAYIL_PRODUCT
];

export const ALL_PRODUCTS: Product[] = [
  AURUM_SAREE_PRODUCT,
  SHIKARGAH_BANARASI_PRODUCT,
  BRIDAL_LEHENGA_PRODUCT,
  MUMTAZ_EMERALD_LEHENGA_PRODUCT,
  KANJEEVARAM_MAYIL_PRODUCT,
  NOCTURNE_ANARKALI_PRODUCT,
  SULTANA_SCALLOP_GOWN_PRODUCT,
  MEN_SHERWANI_PRODUCT,
  BADSHAHI_ANGRAKHA_KURTA_PRODUCT,
  JEWELRY_CHOKER_PRODUCT,
  CHANDRIKA_JADAU_CHANDBALIS_PRODUCT,
  CHIKANKARI_HAZRATGANJ_KURTA_PRODUCT,
  DIAPHANOUS_TISSUE_SAREE_PRODUCT,
  JODHPUR_ONYX_BANDHGALA_PRODUCT,
  KASHMIRI_PASHMINA_SHAWL_PRODUCT,
  ZARDOZI_PEARL_MINAUDIERE_PRODUCT,
  ROYAL_EMERALD_BATWA_POTLI_PRODUCT
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-001',
    orderNumber: '#MST-ORD-2026-000491',
    customerName: 'Sophia Chen',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnrK7EfM2-TMCzgxkvREoeWYcXQaHz2ND0N1bfhgN2k5pCZ0hZYbHcUwe9sFb_ZC_0NYX9yZ0ak6BG1ERApjTV5l_TJOjlvyr6jcTVHML6Whmdv_CDotvFTLCHid85THxpr2burZaf_46jqgEiNkeyF59_xASOt51YE1h7pq58sJWi87WpfUf2nOoJyXGqM_liUtJcm59ECYY267up8e8A22finp_SN6NyrRWPvHHXSGaUDphBI-aa',
    customerCountry: 'United States',
    customerFlag: '🇺🇸',
    customerCity: 'San Francisco, US',
    itemCount: 2,
    summaryText: '2 Items (Aurum Saree + Kundan Choker)',
    status: 'PACKED',
    settledTotalFormatted: '$520.00 USD',
    paymentMethod: 'Stripe Global',
    trackingNumber: '#9823410293',
    isBespokeVerified: true
  },
  {
    id: 'ord-002',
    orderNumber: '#MST-ORD-2026-000492',
    customerName: 'Aisha Al-Maktoum',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArgmLgMpHW6oStWyD_L7Q0biAU3hJqCYRfSMznGE8QwB-3WdvigCpFJLIgyYOSXCM2Kvqyh3J2kiOic2Okf3GJ5cYBGmE5f4ehFLt1NGPlrcBQChuWsWjTP6CoD6cqaCLbJRfeEOQU5flbdrHB6MGkjPXgI_NX9URjvsGVFTd4SV3pCsOm6KTXy4_T6bSn3nyy4s9pFN8xqAxH8EyoQ_BNGfiWBkQsc0PuT_p3pEtep-PKmG7ybGIh',
    customerCountry: 'United Arab Emirates',
    customerFlag: '🇦🇪',
    customerCity: 'Dubai, UAE',
    itemCount: 1,
    summaryText: '1 Haute Item (Custom Bridal Ensemble)',
    status: 'PROCESSING',
    settledTotalFormatted: '2,450 AED',
    paymentMethod: 'Network International',
    trackingNumber: 'Pending Allocation',
    isBespokeVerified: true,
    assignedArtisan: 'Master Weaver Rameshwar'
  },
  {
    id: 'ord-003',
    orderNumber: '#MST-ORD-2026-000490',
    customerName: 'Lady Eleanor Vance',
    customerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7J90lcN8ncOCX1bddpWYOnoGMCTapShZOEyrbi37WzwrcbsfciMcaIqYUFL-F-_vFxlfRVMyzszSzoaNafWm13APEKEY3ih8ysSC5kEEN7xgojNeBLCRyjr4UtGigHeqKBQs-OuC6W0u_k0W8o2l3A9pFKKgqaioXjwW6bDvrZyxkeftEzdRoH8YZBL_vf4ehjWGOWWVnniQ7xzcAPGWal0mzqvkkeX3vRtXTPxe7OE8bNMPDFxWd',
    customerCountry: 'United Kingdom',
    customerFlag: '🇬🇧',
    customerCity: 'Kensington, London',
    itemCount: 3,
    summaryText: '3 Items (Nocturne Gown + Minaudière)',
    status: 'SHIPPED',
    settledTotalFormatted: '£480.00 GBP',
    paymentMethod: 'Barclays / Apple Pay',
    trackingNumber: '#9823410288',
    isBespokeVerified: true
  }
];

export const INITIAL_WAREHOUSES: WarehouseHub[] = [
  {
    id: 'wh-mumbai',
    name: 'Mumbai Central',
    inStock: 12400,
    held: 310,
    status: 'Reserve'
  },
  {
    id: 'wh-london',
    name: 'London Hub',
    inStock: 4120,
    held: 85,
    status: 'Optimal'
  },
  {
    id: 'wh-dubai',
    name: 'Dubai DIFC Vault',
    inStock: 2850,
    held: 140,
    status: 'Optimal'
  },
  {
    id: 'wh-newyork',
    name: 'New York Madison',
    inStock: 1980,
    held: 62,
    status: 'Optimal'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-1',
    user: 'finance@mstglobal.com',
    timeUTC: '14:22 UTC',
    action: 'Adjusted USD currency peg to 83.45',
    highlight: '(Override Active)'
  },
  {
    id: 'audit-2',
    user: 'catalog@mstglobal.com',
    timeUTC: '13:58 UTC',
    action: 'Updated SKU MST-SKU-9924 price to ₹28,500',
    highlight: ''
  },
  {
    id: 'audit-3',
    user: 'logistics@mstglobal.com',
    timeUTC: '12:40 UTC',
    action: 'Dispatched DHL batch #B-88102 (38 packages)',
    highlight: 'DDP Cleared'
  }
];

export const MASTER_ARTISANS = [
  {
    id: 'art-01',
    name: 'Master Weaver Rameshwar',
    specialty: 'Pure Katan Silk & Electroplated 24K Zari Weaving',
    experience: '34 Years Guild Veteran',
    activeAssignments: 3
  },
  {
    id: 'art-02',
    name: 'Ustad Fatima Bano',
    specialty: 'Lucknow Zardozi & Hand Dabka Needlework',
    experience: '28 Years National Awardee',
    activeAssignments: 2
  },
  {
    id: 'art-03',
    name: 'Pandit Gopal Sharma',
    specialty: 'Bespoke Master Cutter & Haute Blouse Fitting',
    experience: '22 Years Royal Savile Row Certified',
    activeAssignments: 4
  }
];

