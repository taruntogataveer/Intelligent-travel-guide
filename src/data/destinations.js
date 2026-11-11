export const ATTRACTION_CATEGORIES = [
  { key: 'museums', label: 'Museums', icon: '🏛️' },
  { key: 'parks', label: 'Parks', icon: '🌳' },
  { key: 'restaurants', label: 'Restaurants', icon: '🍽️' },
  { key: 'landmarks', label: 'Landmarks', icon: '🗼' },
  { key: 'shopping', label: 'Shopping Areas', icon: '🛍️' },
  { key: 'nightlife', label: 'Nightlife', icon: '🌙' },
]

export const destinations = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    description:
      'The City of Light blends world-class art, iconic architecture, and café culture along the Seine. From the Louvre to Montmartre, Paris rewards curious travelers with history, cuisine, and romance at every turn.',
    bestSeason: 'April to June & September to October',
    culture:
      'Parisians value politeness, leisurely dining, and cultural appreciation. Greet shopkeepers with "Bonjour," dress smart-casual in central districts, and expect long lunches. Art, fashion, and intellectual conversation are woven into daily life.',
    popularAttractions: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame Cathedral',
      'Montmartre & Sacré-Cœur',
      'Champs-Élysées',
    ],
    estimatedBudget: {
      cheap: '$90–120 / day',
      moderate: '$150–220 / day',
      luxury: '$350+ / day',
    },
    attractions: {
      museums: [
        { name: 'Louvre Museum', description: 'Home to the Mona Lisa and thousands of masterpieces spanning centuries.', rating: '4.7', priceRange: '€22', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80' },
        { name: 'Musée d\'Orsay', description: 'Impressionist and post-impressionist art in a stunning former railway station.', rating: '4.8', priceRange: '€16', image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80' },
      ],
      parks: [
        { name: 'Luxembourg Gardens', description: 'Elegant formal gardens perfect for strolling, picnics, and people-watching.', rating: '4.8', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1431274172761-fca41c0946b0?w=400&q=80' },
        { name: 'Tuileries Garden', description: 'Historic park between the Louvre and Place de la Concorde.', rating: '4.6', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1550340499-a6c9607c3e09?w=400&q=80' },
      ],
      restaurants: [
        { name: 'Le Comptoir du Relais', description: 'Classic French bistro fare in Saint-Germain-des-Prés.', rating: '4.5', priceRange: '€€€', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
        { name: 'Septime', description: 'Modern French tasting menus with seasonal, locally sourced ingredients.', rating: '4.6', priceRange: '€€€€', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
      ],
      landmarks: [
        { name: 'Eiffel Tower', description: 'Iron lattice tower and global symbol of Paris with panoramic city views.', rating: '4.6', priceRange: '€29+', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80' },
        { name: 'Arc de Triomphe', description: 'Monument honoring those who fought for France, at the top of the Champs-Élysées.', rating: '4.7', priceRange: '€13', image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=400&q=80' },
      ],
      shopping: [
        { name: 'Le Marais', description: 'Trendy boutiques, vintage shops, and design stores in a historic quarter.', rating: '4.5', priceRange: 'Varies', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80' },
        { name: 'Galeries Lafayette', description: 'Iconic department store with a stunning glass dome and luxury brands.', rating: '4.6', priceRange: '€€–€€€€', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
      ],
      nightlife: [
        { name: 'Moulin Rouge', description: 'Legendary cabaret known for can-can dancers and Belle Époque glamour.', rating: '4.4', priceRange: '€€€€', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
        { name: 'Bastille District Bars', description: 'Lively bars and late-night venues popular with locals and visitors.', rating: '4.3', priceRange: '€€', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
      ],
    },
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    description:
      'A dazzling metropolis where ancient temples meet neon skylines. Tokyo offers unmatched cuisine, meticulous craftsmanship, and neighborhoods that shift from serene gardens to buzzing entertainment districts.',
    bestSeason: 'March to May & September to November',
    culture:
      'Respect, punctuality, and quiet public behavior are central to Japanese etiquette. Remove shoes when required, bow when greeting, and carry cash for smaller establishments. Seasonal festivals and food culture are deeply cherished.',
    popularAttractions: [
      'Senso-ji Temple',
      'Shibuya Crossing',
      'Tokyo Skytree',
      'Meiji Shrine',
      'Tsukiji Outer Market',
    ],
    estimatedBudget: {
      cheap: '$70–100 / day',
      moderate: '$130–200 / day',
      luxury: '$300+ / day',
    },
    attractions: {
      museums: [
        { name: 'Tokyo National Museum', description: 'Japan\'s oldest and largest museum of art and antiquities.', rating: '4.6', priceRange: '¥1000', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80' },
        { name: 'teamLab Borderless', description: 'Immersive digital art museum with interactive light installations.', rating: '4.7', priceRange: '¥3800', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
      ],
      parks: [
        { name: 'Ueno Park', description: 'Sprawling park with museums, a zoo, and famous cherry blossoms.', rating: '4.6', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1524413840807-0c3cbfafa418?w=400&q=80' },
        { name: 'Shinjuku Gyoen', description: 'Landscape garden blending Japanese, English, and French styles.', rating: '4.7', priceRange: '¥500', image: 'https://images.unsplash.com/photo-1493976040374-85c8e912f188?w=400&q=80' },
      ],
      restaurants: [
        { name: 'Tsukiji Outer Market', description: 'Fresh sushi, street snacks, and kitchenware in a bustling market.', rating: '4.5', priceRange: '¥¥–¥¥¥', image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&q=80' },
        { name: 'Narisawa', description: 'Innovative satoyama cuisine celebrating Japanese terroir.', rating: '4.8', priceRange: '¥¥¥¥', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
      ],
      landmarks: [
        { name: 'Tokyo Skytree', description: '634m broadcasting tower with observation decks and city panoramas.', rating: '4.5', priceRange: '¥2100+', image: 'https://images.unsplash.com/photo-1536098561742-ca998e468cb7?w=400&q=80' },
        { name: 'Senso-ji Temple', description: 'Tokyo\'s oldest temple in Asakusa with a vibrant Nakamise shopping street.', rating: '4.6', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80' },
      ],
      shopping: [
        { name: 'Ginza', description: 'Upscale shopping district with flagship stores and department giants.', rating: '4.5', priceRange: '¥¥¥–¥¥¥¥', image: 'https://images.unsplash.com/photo-1480796921273-506ec1d6d3e6?w=400&q=80' },
        { name: 'Harajuku Takeshita Street', description: 'Youth fashion, quirky boutiques, and crepe stands.', rating: '4.4', priceRange: '¥–¥¥', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80' },
      ],
      nightlife: [
        { name: 'Golden Gai', description: 'Tiny bars in Shinjuku with unique themes and intimate atmosphere.', rating: '4.5', priceRange: '¥¥–¥¥¥', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
        { name: 'Roppongi Clubs', description: 'International nightlife hub with clubs, lounges, and late dining.', rating: '4.2', priceRange: '¥¥¥', image: 'https://images.unsplash.com/photo-1566417713940-7f23e06589af?w=400&q=80' },
      ],
    },
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    description:
      'A futuristic desert city known for luxury shopping, ultramodern architecture, and Arabian hospitality. Dubai pairs record-breaking skyscrapers with traditional souks and desert adventures.',
    bestSeason: 'November to March',
    culture:
      'Islamic traditions shape daily life; dress modestly in public areas and respect prayer times. Hospitality is generous, and Friday is the holy day. The city is cosmopolitan, with over 200 nationalities calling it home.',
    popularAttractions: [
      'Burj Khalifa',
      'Dubai Mall',
      'Palm Jumeirah',
      'Dubai Creek',
      'Desert Safari',
    ],
    estimatedBudget: {
      cheap: '$80–110 / day',
      moderate: '$180–280 / day',
      luxury: '$500+ / day',
    },
    attractions: {
      museums: [
        { name: 'Museum of the Future', description: 'Architectural marvel exploring innovation, science, and tomorrow\'s world.', rating: '4.8', priceRange: 'AED 149', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
        { name: 'Al Shindagha Museum', description: 'Heritage museum tracing Dubai\'s pearl-diving and trading roots.', rating: '4.5', priceRange: 'AED 50', image: 'https://images.unsplash.com/photo-1580674285054-bed31f1f99d5?w=400&q=80' },
      ],
      parks: [
        { name: 'Dubai Miracle Garden', description: 'World\'s largest natural flower garden with elaborate floral displays.', rating: '4.6', priceRange: 'AED 75', image: 'https://images.unsplash.com/photo-1490759842864-4614d21f3d77?w=400&q=80' },
        { name: 'Zabeel Park', description: 'Urban green space with Dubai Frame views and family activities.', rating: '4.4', priceRange: 'AED 5', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
      ],
      restaurants: [
        { name: 'Al Fanar Restaurant', description: 'Authentic Emirati cuisine in a heritage-inspired setting.', rating: '4.5', priceRange: 'AED 150–250', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
        { name: 'Pierchic', description: 'Over-water fine dining with Arabian Gulf seafood specialties.', rating: '4.7', priceRange: 'AED 400+', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80' },
      ],
      landmarks: [
        { name: 'Burj Khalifa', description: 'World\'s tallest building with observation decks on the 124th and 148th floors.', rating: '4.7', priceRange: 'AED 149+', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80' },
        { name: 'Burj Al Arab', description: 'Sail-shaped luxury hotel and icon of modern Dubai.', rating: '4.6', priceRange: 'Viewing varies', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80' },
      ],
      shopping: [
        { name: 'Dubai Mall', description: 'One of the world\'s largest malls with an aquarium and ice rink.', rating: '4.7', priceRange: 'Varies', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
        { name: 'Gold Souk', description: 'Traditional market in Deira famed for gold jewelry and bargaining.', rating: '4.4', priceRange: 'Varies', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80' },
      ],
      nightlife: [
        { name: 'White Dubai', description: 'Open-air rooftop club with international DJs and skyline views.', rating: '4.3', priceRange: 'AED 200+', image: 'https://images.unsplash.com/photo-1566417713940-7f23e06589af?w=400&q=80' },
        { name: 'Dubai Marina Walk', description: 'Waterfront promenade with lounges, shisha cafes, and evening cruises.', rating: '4.5', priceRange: 'AED 100–300', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80' },
      ],
    },
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    description:
      'The Island of the Gods enchants with terraced rice paddies, Hindu temples, surf beaches, and wellness retreats. Bali balances spiritual tranquility with vibrant arts and coastal adventure.',
    bestSeason: 'April to October',
    culture:
      'Balinese Hinduism shapes daily rituals—temple offerings (canang sari) are everywhere. Dress modestly at temples, respect ceremonies, and learn basic phrases like "Terima kasih." Community and artisanship remain central to island life.',
    popularAttractions: [
      'Ubud Rice Terraces',
      'Tanah Lot Temple',
      'Uluwatu Temple',
      'Seminyak Beach',
      'Tegallalang Rice Terrace',
    ],
    estimatedBudget: {
      cheap: '$40–60 / day',
      moderate: '$80–130 / day',
      luxury: '$250+ / day',
    },
    attractions: {
      museums: [
        { name: 'Agung Rai Museum of Art', description: 'Balinese and Indonesian art in a lush garden setting.', rating: '4.6', priceRange: 'IDR 100k', image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80' },
        { name: 'Neka Art Museum', description: 'Comprehensive collection of traditional and modern Balinese painting.', rating: '4.5', priceRange: 'IDR 75k', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
      ],
      parks: [
        { name: 'Tegallalang Rice Terrace', description: 'Iconic emerald-green terraces carved into the hillside near Ubud.', rating: '4.5', priceRange: 'IDR 15k', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
        { name: 'Bali Botanic Garden', description: 'Mountain botanical garden with orchids and cool highland air.', rating: '4.4', priceRange: 'IDR 20k', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
      ],
      restaurants: [
        { name: 'Locavore', description: 'Award-winning restaurant spotlighting Indonesian ingredients.', rating: '4.8', priceRange: 'IDR 1.5M+', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
        { name: 'Warung Biah Biah', description: 'Authentic local warung serving nasi campur and sate lilit.', rating: '4.4', priceRange: 'IDR 50k', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
      ],
      landmarks: [
        { name: 'Tanah Lot Temple', description: 'Sea temple perched on a rock formation, stunning at sunset.', rating: '4.6', priceRange: 'IDR 60k', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80' },
        { name: 'Uluwatu Temple', description: 'Clifftop temple with Kecak fire dance performances at dusk.', rating: '4.5', priceRange: 'IDR 50k', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80' },
      ],
      shopping: [
        { name: 'Ubud Art Market', description: 'Handicrafts, textiles, and wood carvings from local artisans.', rating: '4.3', priceRange: 'Bargain', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80' },
        { name: 'Seminyak Boutiques', description: 'Designer fashion, homewares, and beachwear along Jalan Kayu Aya.', rating: '4.4', priceRange: 'IDR 200k+', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
      ],
      nightlife: [
        { name: 'Potato Head Beach Club', description: 'Beachfront venue with DJs, cocktails, and sunset sessions.', rating: '4.5', priceRange: 'IDR 300k+', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
        { name: 'La Favela', description: 'Eclectic vintage-decor nightclub in Seminyak.', rating: '4.3', priceRange: 'IDR 150k', image: 'https://images.unsplash.com/photo-1566417713940-7f23e06589af?w=400&q=80' },
      ],
    },
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    description:
      'The Eternal City layers millennia of history beneath lively piazzas and trattorias. Walk from the Colosseum to the Vatican, savor authentic pasta, and experience la dolce vita in every cobblestone street.',
    bestSeason: 'April to June & September to October',
    culture:
      'Romans are passionate about food, family, and football. Dress well for churches, enjoy long evening passeggiate, and expect lively conversation. Aperitivo hour and Sunday family lunches are cherished traditions.',
    popularAttractions: [
      'Colosseum',
      'Vatican City',
      'Trevi Fountain',
      'Roman Forum',
      'Pantheon',
    ],
    estimatedBudget: {
      cheap: '$75–100 / day',
      moderate: '$130–190 / day',
      luxury: '$320+ / day',
    },
    attractions: {
      museums: [
        { name: 'Vatican Museums', description: 'Sistine Chapel, Raphael Rooms, and vast papal art collections.', rating: '4.7', priceRange: '€17+', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80' },
        { name: 'Capitoline Museums', description: 'World\'s oldest public museum with classical Roman sculptures.', rating: '4.6', priceRange: '€15', image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80' },
      ],
      parks: [
        { name: 'Villa Borghese', description: 'Expansive park with gardens, a lake, and the Galleria Borghese.', rating: '4.7', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1431274172761-fca41c0946b0?w=400&q=80' },
        { name: 'Orange Garden', description: 'Scenic garden on Aventine Hill with keyhole view of St. Peter\'s.', rating: '4.6', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1493976040374-85c8e912f188?w=400&q=80' },
      ],
      restaurants: [
        { name: 'Roscioli', description: 'Renowned deli and restaurant for carbonara, cacio e pepe, and wine.', rating: '4.6', priceRange: '€€€', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
        { name: 'Supplizio', description: 'Creative Roman street food and fried specialties near Campo de\' Fiori.', rating: '4.5', priceRange: '€€', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
      ],
      landmarks: [
        { name: 'Colosseum', description: 'Ancient amphitheater and symbol of Imperial Rome.', rating: '4.7', priceRange: '€18', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80' },
        { name: 'Pantheon', description: '2,000-year-old temple with the world\'s largest unreinforced concrete dome.', rating: '4.8', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1555992336-03a23c7b0878?w=400&q=80' },
      ],
      shopping: [
        { name: 'Via del Corso', description: 'Main shopping street linking Piazza Venezia to Piazza del Popolo.', rating: '4.4', priceRange: '€€–€€€', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80' },
        { name: 'Campo de\' Fiori Market', description: 'Morning market for produce, flowers, and local goods.', rating: '4.3', priceRange: 'Varies', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
      ],
      nightlife: [
        { name: 'Trastevere Bars', description: 'Bohemian neighborhood with wine bars and late-night trattorias.', rating: '4.5', priceRange: '€€', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
        { name: 'Testaccio Clubs', description: 'Former meat-market district now home to live music and dance venues.', rating: '4.3', priceRange: '€€–€€€', image: 'https://images.unsplash.com/photo-1566417713940-7f23e06589af?w=400&q=80' },
      ],
    },
  },
  {
    id: 'goa',
    name: 'Goa',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    description:
      'India\'s coastal paradise blends Portuguese heritage, golden beaches, spice plantations, and a relaxed vibe. Goa offers everything from quiet fishing villages to vibrant beach shacks and monsoon-green hinterlands.',
    bestSeason: 'November to February',
    culture:
      'Goan culture fuses Indian and Portuguese influences—visible in churches, cuisine, and architecture. Konkani is widely spoken; seafood and vindaloo are staples. Dress casually on beaches but cover up at religious sites.',
    popularAttractions: [
      'Baga Beach',
      'Basilica of Bom Jesus',
      'Dudhsagar Falls',
      'Anjuna Flea Market',
      'Fort Aguada',
    ],
    estimatedBudget: {
      cheap: '$25–45 / day',
      moderate: '$60–100 / day',
      luxury: '$180+ / day',
    },
    attractions: {
      museums: [
        { name: 'Goa State Museum', description: 'Artifacts tracing Goan history from prehistoric to colonial eras.', rating: '4.2', priceRange: '₹20', image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80' },
        { name: 'Museum of Christian Art', description: 'Indo-Portuguese sacred art in a convent in Old Goa.', rating: '4.3', priceRange: '₹100', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80' },
      ],
      parks: [
        { name: 'Bondla Wildlife Sanctuary', description: 'Compact sanctuary with deer, birds, and a botanical garden.', rating: '4.3', priceRange: '₹50', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80' },
        { name: 'Salim Ali Bird Sanctuary', description: 'Mangrove sanctuary on Chorão Island ideal for birdwatching.', rating: '4.4', priceRange: '₹50', image: 'https://images.unsplash.com/photo-1493976040374-85c8e912f188?w=400&q=80' },
      ],
      restaurants: [
        { name: 'Gunpowder', description: 'South Indian and Goan home-style dishes in a charming courtyard.', rating: '4.5', priceRange: '₹800–1500', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80' },
        { name: 'Fisherman\'s Wharf', description: 'Beachfront seafood with live music and Goan curry specialties.', rating: '4.4', priceRange: '₹1000–2000', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80' },
      ],
      landmarks: [
        { name: 'Basilica of Bom Jesus', description: 'UNESCO church housing the remains of St. Francis Xavier.', rating: '4.6', priceRange: 'Free', image: 'https://images.unsplash.com/photo-1585137132022-227afb3f447c?w=400&q=80' },
        { name: 'Fort Aguada', description: '17th-century Portuguese fort overlooking the Arabian Sea.', rating: '4.5', priceRange: '₹25', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
      ],
      shopping: [
        { name: 'Anjuna Flea Market', description: 'Wednesday market for handicrafts, jewelry, and bohemian fashion.', rating: '4.3', priceRange: 'Bargain', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&q=80' },
        { name: 'Mapusa Market', description: 'Bustling Friday market for spices, produce, and local goods.', rating: '4.2', priceRange: 'Varies', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80' },
      ],
      nightlife: [
        { name: 'Tito\'s Lane', description: 'Baga\'s famous strip of clubs, beach parties, and live DJs.', rating: '4.2', priceRange: '₹1500+', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80' },
        { name: 'Silent Noise Party', description: 'Unique headphone party experience in Palolem.', rating: '4.4', priceRange: '₹800', image: 'https://images.unsplash.com/photo-1566417713940-7f23e06589af?w=400&q=80' },
      ],
    },
  },
]

export function getDestinationById(id) {
  return destinations.find((destination) => destination.id === id)
}
