export const PRESET_SCENARIOS = [
  {
    id: 'price-arbitrage',
    title: '🛒 Live E-Commerce Price Arbitrage',
    tagline: 'Multi-site price extraction & deal comparison',
    badge: 'E-Commerce & Deals',
    badgeColor: 'cyan',
    defaultUrl: 'https://www.amazon.in/s?k=macbook+air+m3',
    defaultGoal: 'Navigate to Apple MacBook Air M3 listings. Extract top seller prices, discounts, and compare across Amazon, Flipkart, and Croma for maximum savings.',
    mockExecutionTime: '3.8s',
    humanTimeSaved: '18 minutes',
    stepsAutomated: 14,
    streamingPreviewUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    steps: [
      { step: 1, action: 'BROWSER_INIT', description: 'Booting TinyFish cloud stealth browser container (US-East proxy)...', timestamp: '00:01' },
      { step: 2, action: 'NAVIGATE', description: 'Accessing https://www.amazon.in/s?k=macbook+air+m3 (Bypassing dynamic JS & bot checks)...', timestamp: '00:03' },
      { step: 3, action: 'SCROLL_SEARCH', description: 'Scrolling viewport 850px down to render lazy-loaded search result tiles...', timestamp: '00:05' },
      { step: 4, action: 'CLICK_FILTER', description: 'Applying facet filter [Brand: Apple] and sorting by [Customer Rating]...', timestamp: '00:08' },
      { step: 5, action: 'EXTRACT_ITEM', description: 'Parsing product node #B0CX2364L8: Title, Prime badge, current price ₹1,04,900...', timestamp: '00:11' },
      { step: 6, action: 'MULTI_SITE_HOP', description: 'Spawning concurrent stealth tab for Flipkart MacBook Air M3 equivalent...', timestamp: '00:14' },
      { step: 7, action: 'EXTRACT_ITEM', description: 'Extracted Flipkart listing: ₹1,02,990 with HDFC Bank instant discount ₹5,000...', timestamp: '00:18' },
      { step: 8, action: 'SYNTHESIS', description: 'Cross-correlating listings, verifying warranty specs, calculating best arbitrage...', timestamp: '00:22' },
      { step: 9, action: 'COMPLETE', description: 'Task complete! 3 verified listings compiled. Arbitrage delta: ₹6,910 savings.', timestamp: '00:25' }
    ],
    results: {
      summary: 'Successfully traversed 2 e-commerce portals across 14 automated browser steps. Identified Flipkart as the lowest price with verified ₹6,910 total arbitrage savings including card discounts.',
      bestDeal: {
        platform: 'Flipkart',
        product: 'Apple MacBook Air M3 (13.6-inch, 8GB Unified Memory, 256GB SSD, Space Grey)',
        currentPrice: '₹97,990',
        originalPrice: '₹1,14,900',
        discount: '14% OFF + ₹5,000 Bank Rebate',
        inStock: true,
        delivery: 'Tomorrow, 2:00 PM',
        sellerRating: '4.8 / 5.0'
      },
      comparisons: [
        { platform: 'Flipkart', price: '₹97,990', diff: 'Lowest (Best Deal)', link: 'https://flipkart.com', status: 'In Stock' },
        { platform: 'Amazon India', price: '₹1,04,900', diff: '+ ₹6,910 higher', link: 'https://amazon.in', status: 'In Stock' },
        { platform: 'Croma Retail', price: '₹1,09,900', diff: '+ ₹11,910 higher', link: 'https://croma.com', status: 'Limited Stock' }
      ]
    }
  },
  {
    id: 'b2b-lead-scout',
    title: '💼 B2B Company & Tech Stack Scout',
    tagline: 'Deep website traversal for decision makers & tech signals',
    badge: 'Sales & Market Intel',
    badgeColor: 'purple',
    defaultUrl: 'https://stripe.com',
    defaultGoal: 'Traverse Stripe corporate website. Find executive leadership, open engineering roles, infer infrastructure tech stack, and generate verified outreach dossier.',
    mockExecutionTime: '4.2s',
    humanTimeSaved: '25 minutes',
    stepsAutomated: 19,
    streamingPreviewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    steps: [
      { step: 1, action: 'BROWSER_INIT', description: 'Initializing TinyFish stealth session with residential IP rotation...', timestamp: '00:01' },
      { step: 2, action: 'NAVIGATE', description: 'Navigating to domain root https://stripe.com...', timestamp: '00:03' },
      { step: 3, action: 'DOM_TRAVERSAL', description: 'Discovering footer navigation hierarchy; found /about, /jobs, /newsroom...', timestamp: '00:06' },
      { step: 4, action: 'CLICK', description: 'Navigating to /about/leadership page...', timestamp: '00:09' },
      { step: 5, action: 'EXTRACT_ENTITY', description: 'Extracted C-suite executives: Patrick Collison (CEO), John Collison (President)...', timestamp: '00:12' },
      { step: 6, action: 'NAVIGATE_CAREERS', description: 'Navigating to dynamic SPA careers board: /jobs/search...', timestamp: '00:16' },
      { step: 7, action: 'FILTER_INPUT', description: 'Searching job tags for [Infrastructure], [AI Platform] in Bengaluru & Remote...', timestamp: '00:20' },
      { step: 8, action: 'TECH_INFERENCE', description: 'Inferred tech stack from requirements: React, Ruby, Go, AWS, Envoy, Kubernetes...', timestamp: '00:24' },
      { step: 9, action: 'COMPLETE', description: 'Intelligence dossier compiled with leadership and hiring growth signals.', timestamp: '00:28' }
    ],
    results: {
      summary: 'Analyzed corporate architecture across 4 subpaths. Identified 5 key decision makers, 42 open engineering roles, and mapped foundational infrastructure stack.',
      company: 'Stripe, Inc.',
      headquarters: 'San Francisco & Dublin (Global Hub: Bengaluru)',
      keyExecutives: [
        { name: 'Patrick Collison', role: 'Co-founder & CEO', verified: true },
        { name: 'John Collison', role: 'Co-founder & President', verified: true },
        { name: 'Will Gaybrick', role: 'President of Product & Business', verified: true }
      ],
      detectedTechStack: ['React', 'Ruby on Rails', 'Go', 'Kubernetes', 'AWS', 'Kafka', 'Sorbet'],
      hiringSignals: 'Strong expansion in AI Payment Agents & Latency Engineering (14 open Bengaluru roles)'
    }
  },
  {
    id: 'hackathon-radar',
    title: '🏆 Bangalore AI Hackathon & Grant Tracker',
    tagline: 'Real-time discovery of prize pools & registration portals',
    badge: 'Opportunity Radar',
    badgeColor: 'emerald',
    defaultUrl: 'https://devfolio.co/hackathons',
    defaultGoal: 'Search Devfolio and event portals for all active AI / Web hackathons in Bangalore. Extract registration deadlines, eligibility, and cash prize breakdowns.',
    mockExecutionTime: '3.1s',
    humanTimeSaved: '30 minutes',
    stepsAutomated: 12,
    streamingPreviewUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    steps: [
      { step: 1, action: 'BROWSER_INIT', description: 'Launching browser container with Bengaluru geo-location headers...', timestamp: '00:01' },
      { step: 2, action: 'NAVIGATE', description: 'Loading https://devfolio.co/hackathons...', timestamp: '00:03' },
      { step: 3, action: 'GEO_FILTER', description: 'Setting location filter to [Bangalore, India] and theme to [AI / Autonomous Agents]...', timestamp: '00:06' },
      { step: 4, action: 'PAGINATION', description: 'Traversing 3 pages of active and upcoming hackathons...', timestamp: '00:10' },
      { step: 5, action: 'PARSE_PRIZES', description: 'Extracted prize pool metrics, tracks, and submission guidelines...', timestamp: '00:15' },
      { step: 6, action: 'COMPLETE', description: 'Compiled 4 high-value hackathons totaling ₹28,00,000+ in prize rewards.', timestamp: '00:20' }
    ],
    results: {
      summary: 'Scanned 18 upcoming hackathon listings across Bengaluru tech hubs. Filtered for active developer events with cash prizes and AI agent tracks.',
      events: [
        { name: 'Ignite With Bangalore Hackathon', prizePool: '₹5,00,000 + Grants', status: 'ACTIVE NOW', focus: 'AI Agents, TinyFish, Web Execution', url: 'https://agent.tinyfish.ai' },
        { name: 'Bengaluru AI Builders Sprint', prizePool: '₹8,00,000', status: 'Registration Open', focus: 'Autonomous Workflows & LLM Infra', url: 'https://devfolio.co' },
        { name: 'DevX Agentic Summit', prizePool: '₹15,00,000', status: 'Starts Next Week', focus: 'Agentic Tooling & Multi-Agent Systems', url: 'https://unstop.com' }
      ]
    }
  }
];
