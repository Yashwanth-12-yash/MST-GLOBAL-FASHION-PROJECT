import { CurrencyConfig, Product, OrderItem, WarehouseHub, AuditLogEntry } from '../types';

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

export const CATEGORIES = [
  {
    id: 'banarasi-silk',
    name: 'Banarasi Silk',
    stylesCount: '142 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUFDygVZgZcDjbAZHRbe_ZDXms7Pr-LxkhPcRvbnXvK0tZZbyZasVij4fiHZRP4MtgCvchhmOG4VPclX5ciZl6RQOScLasEam2bICuI4tBmhWMyGjaiRIesW_Q_pAI-UAxHkIhln88YrWAR24O39_an-qDkCIihd8Tj4NjB4dvLAJD_6H7YmSQs7Vf61Z0d-ct3480Pc9CL7GsTbNC-1ATsHzm0nQ1Obz8jcB6wUOroHTaBdkYsxji'
  },
  {
    id: 'bridal-lehengas',
    name: 'Bridal Lehengas',
    stylesCount: '88 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA9gJULosK8PiVuzAIH7IbAF5NngImNA5tsGM7FuYmM7G4UM81izSQiwYpsPmrjJQ65ViArxizlv77fZIPelewRXbCun3acNMIL5q37ul6zFGR7snqijdvvSSOxgNqOb7T0kIN5QDtKuTKUnvfBwFcEU55pPUV_JXxAlBQ-hl7zXdwpIHpHlJNG--_DXseeyrbXpYf5dHlBHHMSY4JVUPGmJkeKZrl2prp8FMI6jxvYZEbQVLru4FsD'
  },
  {
    id: 'evening-gowns',
    name: 'Evening Gowns',
    stylesCount: '65 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXoiuayiZNgsekUN2u0MqEqeo9MsIY6U5Ttt5oGkWLOBkISiIDb5MLD4CHPqTsYhryoD15koe9XPyCCXnFdN3cE36_z3iPlwBauKklOnFmJ2qEWL0sXz0lTWgU3Tkne2_Qnlv4DlvQX3SkqUQWlNc9pbvdoXF6Ai6YPOhD79vpq2hh2BsxoSVV_qkfTZbrt6ygqIyiJ6hpZ_20k2szL-86bDHSq5CJem2zbIQu9JyoYbwlymaeMRcb'
  },
  {
    id: 'mens-sherwanis',
    name: "Men's Sherwanis",
    stylesCount: '52 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBugx11FsDKN_jRHNybXK2ihZ1fIpSYXGyyAiaKzjMQD1L_8wsAOFFoP2BGnSrcNzVXhxooF0mHtebH4rRtTfNkVXm7X-DNVMhcDtV8tBrUz08QNPvgSInpn_G422DqtjI-Ad5VC7orXxMbFk6EC-lOK4iHyccC-Cvk8-qN1LjEpkzsir0MbQRA4UeXa-Xc2J8WVWNlNs12N2DI9Fo9VEAen-eUsQQpcT3qqO3NXCsjXYQIgY5SNyD4'
  },
  {
    id: 'high-jewelry',
    name: 'High Jewelry',
    stylesCount: '76 Styles',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwL5AQqeFuOFfQd94XCmZsoOjw-PkeGAwVyM9SliK55IQnrnRSubp0TP7uYpe_6Vn-iEDCyOS1QC-UtV3EbfVlRX1WO1F5844kXjEzq6xWCuOk8_K2FgjIr1MQXtB-TS1zo9ve29tS5y3ibGpvQUTImFYXOk2Qf_3GCg7WAf0MPFRqWqWGaW799trZzkZstRCf_pilTzzt0_NBLtsPUWZfRHTeFZGAmwP-dtvFn4BLnmxlRVuChtt5'
  }
];

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
  category: 'Evening Gowns',
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

export const TRENDING_PRODUCTS: Product[] = [
  AURUM_SAREE_PRODUCT,
  NOCTURNE_ANARKALI_PRODUCT
];

export const BRIDAL_LEHENGA_PRODUCT: Product = {
  id: 'prod-lehenga-gulzar',
  title: 'Gulzar Crimson Zardozi Lehenga',
  subtitle: 'Master Atelier Heritage Bridal',
  category: 'Bridal Lehengas',
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

export const MEN_SHERWANI_PRODUCT: Product = {
  id: 'prod-sherwani-sheesh',
  title: 'Sheesh Mahal Ivory Raw Silk Sherwani',
  subtitle: 'Royal Groom Atelier Collection',
  category: "Men's Sherwanis",
  sku: 'MST-SKU-5512-SHR',
  editionBadge: 'EDITION NO. 11/30',
  atelier: 'MST Atelier Global • Lucknow Chikan & Zari',
  rating: 4.9,
  reviewCount: 52,
  priceINR: 58000,
  mrpINR: 68000,
  primaryImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDSai4mnkjBBXlJogvWOntp00DUK_eKCjanr1_OOWOwtkpry_LVq7w1Y9FjOxwynaRykqU3PrMArPczVF_JM2eR9ct62QrPuqsMZgsab316vL1tZ68oEtB1lIfhum8UA4VQskste_V8GutH1smK80WuUeUIzzF6MPUTPYzV5w7z0mBqthB85eK5wLPb5kOWAWodqS_kDsPbp1Vz-OX2G-nix60CdH-kXnkEkJ43I7482-w2zOj6VmIl',
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

export const JEWELRY_CHOKER_PRODUCT: Product = {
  id: 'prod-polki-choker',
  title: 'Nizam Polki Kundan Choker & Earrings Set',
  subtitle: 'High Jewelry Atelier',
  category: 'High Jewelry',
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

export const ALL_PRODUCTS: Product[] = [
  AURUM_SAREE_PRODUCT,
  NOCTURNE_ANARKALI_PRODUCT,
  BRIDAL_LEHENGA_PRODUCT,
  MEN_SHERWANI_PRODUCT,
  JEWELRY_CHOKER_PRODUCT
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

