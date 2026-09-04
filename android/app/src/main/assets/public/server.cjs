var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_vite = require("vite");

// src/data/sampleTrips.ts
var SAMPLE_TRIPS = [
  {
    destination: "Tokyo, Japan",
    occasion: "Friends Getaway",
    durationDays: 3,
    startDate: "2026-09-04",
    travelersCount: 4,
    travelerType: "Group of Friends",
    budget: "Moderate",
    pace: "Balanced",
    homeBase: "Hotel Gracery Shinjuku, Tokyo",
    homeBaseCoords: { lat: 35.6953, lng: 139.702 },
    morningDepartureTime: "08:30 AM",
    eveningReturnTime: "10:30 PM",
    overview: "A high-energy 3-day exploration designed for a group of friends, balancing hyper-modern neon districts, historic shrines, legendary ramen and street food alleys, and scenic viewpoints across Tokyo's most vibrant neighborhoods.",
    weatherSummary: "Mild and pleasant, around 18\xB0C\u201323\xB0C. Comfortable walking shoes and light layering with an umbrella are recommended.",
    currencyAndCostEstimate: {
      currency: "JPY (Japanese Yen, approx \xA5150 = $1 USD)",
      estimatedTotalPerPerson: "$420 - $580 USD (excluding flights/hotel)",
      breakdown: "Daily food: ~$40\u201360, Transit: ~$12, Attractions & Activities: ~$35, Souvenirs & Misc: ~$30"
    },
    transportationGuide: {
      overview: "Tokyo boasts the world's most efficient public rail and subway network. Trains run with near-zero delays until midnight.",
      recommendedPasses: "Suica or Pasmo digital card (added to Apple/Google Wallet) or Tokyo Subway 72-hour Tourist Ticket (\xA51,500).",
      metroBusTips: "Look for station numbers on Tokyo Metro and Toei lines (e.g., G05 for Ginza Line). Tap in and out at turnstiles.",
      airportTransfer: "Narita Express (N'EX) or Skyliner into Tokyo/Ueno; Keikyu Line from Haneda directly into central Tokyo.",
      rideSharing: "JapanTaxi or GO Taxi app. Taxis are clean and safe; automatic doors open for you."
    },
    packingAndPrepTips: [
      "Pocket Wi-Fi or eSIM for seamless navigation through multi-level stations.",
      "Slip-on walking shoes (easy removal at temples and traditional tatami eateries).",
      "Coin pouch for vending machines and coin lockers.",
      "Small power bank to keep smartphones charged for maps and translation apps."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Day 1: Historic Asakusa, Akihabara Tech & Shinjuku Neon",
        summary: "Step back into Edo-era traditions at Senso-ji temple, browse electronic wonders in Akihabara, and finish with sizzling yakitori in Omoide Yokocho.",
        schedule: [
          {
            id: "tokyo-d1-1",
            time: "08:30 AM",
            timeSlot: "morning",
            title: "Traditional Breakfast at Asakusa Misojyu",
            category: "food",
            description: "Warm up with artisanal, hearty miso soup sets made with organic vegetables and hand-rolled onigiri (rice balls).",
            location: "Asakusa 1-7-5, Taito City",
            duration: "50 mins",
            costEstimate: "\xA51,100 - \xA51,500 (~$8 - $11)",
            tips: "Arrive right at opening to avoid queues; try the braised pork belly miso broth.",
            coordinates: { lat: 35.7126, lng: 139.7958 },
            foodDetail: {
              mealType: "breakfast",
              cuisine: "Traditional Japanese Miso & Onigiri",
              recommendedDishes: ["Tofu & Mushroom Rich Miso Soup", "Spicy Cod Roe Onigiri"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "tokyo-d1-2",
            time: "09:30 AM",
            timeSlot: "morning",
            title: "Explore Senso-ji Temple & Nakamise-dori",
            imageUrl: "https://tse2.mm.bing.net/th/id/OIP.jesbwE54j7amgiiTsRlLCAHaFj?r=0&pid=Api&w=800&h=600&c=7",
            category: "place",
            description: "Tokyo's oldest and most iconic Buddhist temple, passing through the grand Kaminarimon (Thunder Gate) and sampling fresh ningyo-yaki treats.",
            location: "2-3-1 Asakusa, Taito City",
            duration: "1.5 hours",
            costEstimate: "Free (\xA5100 for Omikuji fortune)",
            tips: "Wave fragrant incense smoke toward you at the giant bronze urn for good luck.",
            coordinates: { lat: 35.7148, lng: 139.7967 }
          },
          {
            id: "tokyo-d1-3",
            time: "11:15 AM",
            timeSlot: "morning",
            title: "Tsukuba Express to Akihabara",
            category: "transport",
            description: "Hop on the rapid train connecting Asakusa directly to electric town Akihabara in just two quick stops.",
            location: "Asakusa Station to Akihabara Station",
            duration: "15 mins",
            costEstimate: "\xA5210 (~$1.40)",
            tips: "Use IC card (Suica/Pasmo) for instant tap-and-go entry.",
            transportDetail: {
              mode: "train",
              route: "Tsukuba Express (Rapid)",
              duration: "8 mins ride + 7 mins transfer",
              cost: "\xA5210"
            }
          },
          {
            id: "tokyo-d1-4",
            time: "11:45 AM",
            timeSlot: "afternoon",
            title: "Akihabara Tech & Multi-Floor Arcade Challenge",
            category: "activity",
            description: "Dive into retro gaming shrines like Super Potato and test group reflexes with Taiko no Tatsujin drum games at GiGO.",
            location: "Sotokanda, Chiyoda City",
            duration: "1.5 hours",
            costEstimate: "\xA5500 - \xA51,500 for arcade tokens",
            tips: "Bring 100-yen coins for arcade machines and UFO crane games."
          },
          {
            id: "tokyo-d1-5",
            time: "01:30 PM",
            timeSlot: "afternoon",
            title: "Lunch at Kyushu Jangara Ramen Akihabara",
            imageUrl: "https://tse4.mm.bing.net/th/id/OIP.Ig9vRABFsgCJ9dTfr9FbuwHaE8?r=0&pid=Api&w=800&h=600&c=7",
            category: "food",
            description: "Beloved ramen counter serving rich Tonkotsu pork broth topped with melt-in-your-mouth Kakuni pork belly and marinated eggs.",
            location: "3-11-6 Sotokanda, Chiyoda City",
            duration: "45 mins",
            costEstimate: "\xA51,200 - \xA51,600 (~$9 - $12)",
            tips: "Order the 'Zenbunose' (all toppings included) bowl.",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Kyushu Tonkotsu Ramen",
              recommendedDishes: ["Kobonshan with Marinated Pork", "Gyoza dumplings"],
              priceRange: "$",
              reservationNeeded: false
            }
          },
          {
            id: "tokyo-d1-6",
            time: "03:00 PM",
            timeSlot: "afternoon",
            title: "JR Yamanote Line to Shinjuku",
            category: "transport",
            description: "Ride Tokyo's famous green circular line westward across the metropolis toward bustling Shinjuku.",
            location: "Akihabara Station to Shinjuku Station",
            duration: "25 mins",
            costEstimate: "\xA5180 (~$1.20)",
            transportDetail: {
              mode: "train",
              route: "JR Chuo-Sobu Line Local",
              duration: "16 mins",
              cost: "\xA5180"
            }
          },
          {
            id: "tokyo-d1-7",
            time: "04:30 PM",
            timeSlot: "evening",
            title: "Tokyo Metropolitan Government Building Observation Deck",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.DAH4n5HJHKmypsazqC-7JwHaDs?r=0&pid=Api&w=800&h=600&c=7",
            category: "place",
            description: "Soar up to the 45th floor panoramic observatory for breathtaking views across the Tokyo skyline, with Mount Fuji visible on clear days.",
            location: "2-8-1 Nishishinjuku, Shinjuku City",
            duration: "1 hour",
            costEstimate: "Free entry",
            tips: "Arrive 30 minutes before sunset to watch the neon lights switch on across the city.",
            coordinates: { lat: 35.6896, lng: 139.6921 }
          },
          {
            id: "tokyo-d1-8",
            time: "06:30 PM",
            timeSlot: "night",
            title: "Dinner & Drinks at Omoide Yokocho (Memory Lane)",
            imageUrl: "https://tse4.mm.bing.net/th/id/OIP.t918eMr8IUjFxSmB0L_SfAHaHa?r=0&pid=Api&w=800&h=600&c=7",
            category: "food",
            description: "Atmospheric lantern-lit alleyway packed with intimate yakitori stalls grilling skewers over binchotan charcoal.",
            location: "1-2 Nishishinjuku, Shinjuku City",
            duration: "2 hours",
            costEstimate: "\xA53,000 - \xA54,500 per person (~$20 - $30)",
            tips: "Great for sharing skewers and local draft beers or highballs with friends.",
            foodDetail: {
              mealType: "dinner",
              cuisine: "Yakitori & Izakaya Skewers",
              recommendedDishes: ["Tsukune chicken meatballs", "Negima chicken with leek", "Draft Asahi Beer"],
              priceRange: "$$",
              reservationNeeded: false
            }
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Day 2: Shibuya Crossing, Harajuku Streetwear & Roppongi Sky",
        summary: "Experience the world's busiest crosswalk, wander tranquil Meiji Shrine forested paths, hunt vintage gems on Takeshita Street, and marvel at Roppongi art.",
        schedule: [
          {
            id: "tokyo-d2-1",
            time: "09:00 AM",
            timeSlot: "morning",
            title: "Peaceful Morning Stroll through Meiji Jingu Shrine",
            imageUrl: "https://tse4.mm.bing.net/th/id/OIP.fi4yuyazUUL6ob2SyhmkLgAAAA?r=0&pid=Api&w=800&h=600&c=7",
            category: "place",
            description: "Surrounded by a tranquil 170-acre forest of over 120,000 evergreen trees right in the heart of Tokyo.",
            location: "1-1 Yoyogikamizonocho, Shibuya City",
            duration: "1.5 hours",
            costEstimate: "Free",
            tips: "Write a wish on an Ema wooden tablet and hang it by the sacred camphor tree.",
            coordinates: { lat: 35.6764, lng: 139.6993 }
          },
          {
            id: "tokyo-d2-2",
            time: "10:45 AM",
            timeSlot: "morning",
            title: "Takeshita Street & Cat Street Vintage Browsing",
            category: "activity",
            description: "Explore the trendsetting youth culture corridor and duck into hidden sneaker boutiques and vintage clothing shops along Cat Street.",
            location: "Jingumae, Shibuya City",
            duration: "1.5 hours",
            costEstimate: "Free to wander / Variable shopping",
            tips: "Grab a warm Marion Crepe with strawberries and matcha ice cream."
          },
          {
            id: "tokyo-d2-3",
            time: "12:30 PM",
            timeSlot: "afternoon",
            title: "Crispy Tonkatsu Lunch at Tonkatsu Maisen Aoyama",
            imageUrl: "https://tse1.mm.bing.net/th/id/OIP.yTB4FhSjkQGk-UuxV9ytDQHaE8?r=0&pid=Api&w=800&h=600&c=7",
            category: "food",
            description: "Housed in a converted 1930s public bathhouse, serving legendary Kurobuta black pork tonkatsu that cuts with chopsticks.",
            location: "4-8-5 Jingumae, Shibuya City",
            duration: "1 hour",
            costEstimate: "\xA52,000 - \xA53,500 (~$14 - $24)",
            tips: "Includes unlimited shredded cabbage and fresh sesame dipping sauce.",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Japanese Tonkatsu",
              recommendedDishes: ["Kurobuta Pork Cutlet Set", "Katsu Sando"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "tokyo-d2-4",
            time: "02:00 PM",
            timeSlot: "afternoon",
            title: "Walk to Shibuya Scramble Crossing & Hachiko",
            category: "place",
            description: "Surge through the famed intersection where up to 3,000 pedestrians cross simultaneously, and snap a group photo at Hachiko dog statue.",
            location: "Dogenzaka, Shibuya City",
            duration: "1 hour",
            costEstimate: "Free",
            tips: "Head up to the 2nd floor Starbucks or Shibuya Tsutaya for elevated views of the crossing.",
            coordinates: { lat: 35.6595, lng: 139.7004 }
          },
          {
            id: "tokyo-d2-5",
            time: "03:30 PM",
            timeSlot: "afternoon",
            title: "Shibuya Sky Rooftop Observation Deck",
            category: "activity",
            description: "Open-air 360-degree rooftop deck 229 meters above Shibuya with glass corners, hammock nets, and skyline photo perches.",
            location: "Shibuya Scramble Square 47F",
            duration: "1.5 hours",
            costEstimate: "\xA52,200 (~$15 per person)",
            tips: "Must reserve tickets online in advance; outdoor bags must be stowed in \xA5100 lockers.",
            coordinates: { lat: 35.6585, lng: 139.7025 }
          },
          {
            id: "tokyo-d2-6",
            time: "05:30 PM",
            timeSlot: "evening",
            title: "Fukutoshin & Hibiya Lines to Roppongi",
            category: "transport",
            description: "Quick two-line subway connection into Roppongi for dining and night views.",
            location: "Shibuya Station to Roppongi Station",
            duration: "20 mins",
            costEstimate: "\xA5210",
            transportDetail: {
              mode: "subway",
              route: "Tokyo Metro Hanzomon Line -> Hibiya Line",
              duration: "18 mins",
              cost: "\xA5210"
            }
          },
          {
            id: "tokyo-d2-7",
            time: "06:30 PM",
            timeSlot: "night",
            title: "Group Dinner at Gonpachi Nishi-Azabu (Kill Bill Izakaya)",
            category: "food",
            description: "Atmospheric multi-level wooden tavern that inspired the iconic Crazy 88 fight scene in Kill Bill, serving soba noodles and skewers.",
            location: "1-13-11 Nishi-Azabu, Minato City",
            duration: "2 hours",
            costEstimate: "\xA54,500 - \xA56,000 per person (~$30 - $40)",
            tips: "Book 1\u20132 weeks ahead for table seating for 4.",
            foodDetail: {
              mealType: "dinner",
              cuisine: "Traditional Izakaya & Soba",
              recommendedDishes: ["Handmade Seiro Soba", "Wagyu Beef Skewers", "Tempura Moriawase"],
              priceRange: "$$$",
              reservationNeeded: true
            }
          }
        ]
      },
      {
        dayNumber: 3,
        title: "Day 3: Digital Art, Waterfront Monorail & Ginza Delights",
        summary: "Immerse in teamLab Planets digital waters, ride the driverless Yurikamome monorail across Tokyo Bay, and savor premium sushi.",
        schedule: [
          {
            id: "tokyo-d3-1",
            time: "09:00 AM",
            timeSlot: "morning",
            title: "Yurikamome Waterfront Monorail to Toyosu",
            category: "transport",
            description: "Scenic elevated monorail offering sweeping panoramic views over Rainbow Bridge and Tokyo Bay.",
            location: "Shimbashi to Shin-Toyosu Station",
            duration: "30 mins",
            costEstimate: "\xA5390 (~$2.60)",
            tips: "Grab seats in the front car for floor-to-ceiling panoramic views.",
            transportDetail: {
              mode: "train",
              route: "Yurikamome Line Waterfront Transit",
              duration: "28 mins",
              cost: "\xA5390"
            }
          },
          {
            id: "tokyo-d3-2",
            time: "09:45 AM",
            timeSlot: "morning",
            title: "teamLab Planets TOKYO Immersive Art",
            category: "activity",
            description: "Walk barefoot through knee-deep water filled with digital projected koi fish, mirror rooms of infinite crystal lights, and floating flower gardens.",
            location: "6-1-16 Toyosu, Koto City",
            duration: "2 hours",
            costEstimate: "\xA53,800 (~$25 per person)",
            tips: "Wear pants that can be rolled above knees; locker and towel provided free.",
            coordinates: { lat: 35.6496, lng: 139.7898 }
          },
          {
            id: "tokyo-d3-3",
            time: "12:15 PM",
            timeSlot: "afternoon",
            title: "Fresh Seafood Lunch at Tsukiji Outer Market",
            category: "food",
            description: "Wander open-air food stalls sampling freshly torched wagyu beef skewers, tamagoyaki sweet omelets, and Kaisendon sashimi rice bowls.",
            location: "4-16-2 Tsukiji, Chuo City",
            duration: "1.5 hours",
            costEstimate: "\xA52,500 - \xA53,500 per person (~$17 - $24)",
            tips: "Cash is preferred at smaller stall counters.",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Market Seafood & Street Delicacies",
              recommendedDishes: ["Tuna Kaisendon Bowl", "Dashi Tamagoyaki Skewer", "Grilled Scallop in Butter"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "tokyo-d3-4",
            time: "02:30 PM",
            timeSlot: "afternoon",
            title: "Hamarikyu Gardens Green Tea in a Shogun Pavilion",
            category: "place",
            description: "Former Shogun duck hunting grounds featuring tidal seawater ponds, 300-year-old pine trees, and a wooden teahouse floating on a serene pond.",
            location: "1-1 Hamarikyuteien, Chuo City",
            duration: "1.5 hours",
            costEstimate: "\xA5300 garden entry + \xA5850 for matcha tea set",
            tips: "Relax inside the Nakajima no Ochaya teahouse with a bowl of whisked matcha and seasonal wagashi sweet.",
            coordinates: { lat: 35.6601, lng: 139.7634 }
          },
          {
            id: "tokyo-d3-5",
            time: "05:00 PM",
            timeSlot: "evening",
            title: "Walk to Ginza Six & Rooftop Garden",
            category: "place",
            description: "Stroll along the world-renowned shopping boulevard, explore Ginza Six upscale architectural atrium, and visit its open-air garden.",
            location: "6-10-1 Ginza, Chuo City",
            duration: "1.5 hours",
            costEstimate: "Free",
            tips: "B1 floor has an incredible depachika (luxury food hall) ideal for souvenir confections."
          },
          {
            id: "tokyo-d3-6",
            time: "07:00 PM",
            timeSlot: "night",
            title: "Farewell Group Dinner at Nemuro Hanamaru Ginza",
            category: "food",
            description: "High-end conveyor belt sushi flown in directly from Hokkaido ports, serving plump scallops, fatty tuna, and salmon roe.",
            location: "Tokyu Plaza Ginza 10F, Chuo City",
            duration: "1.5 hours",
            costEstimate: "\xA53,000 - \xA54,500 per person (~$20 - $30)",
            tips: "Take a number ticket from the machine at 6:30 PM as tables for 4 have a short wait.",
            foodDetail: {
              mealType: "dinner",
              cuisine: "Hokkaido Kaitenzushi (Conveyor Belt Sushi)",
              recommendedDishes: ["Botan Shrimp", "Seared Salmon with Mayonnaise", "Crab Miso Soup"],
              priceRange: "$$",
              reservationNeeded: false
            }
          }
        ]
      }
    ],
    sources: [
      { title: "Tokyo Metro Official Transit Guide & Timetables", url: "https://www.tokyometro.jp/en/" },
      { title: "Japan National Tourism Organization (JNTO) Official Portal", url: "https://www.japan.travel/en/" },
      { title: "teamLab Planets Tokyo Ticketing & Visitor Notice", url: "https://planets.teamlab.art/tokyo/" }
    ],
    createdAt: "2026-09-02T11:00:00.000Z"
  }
];

// src/utils/geoCoordinates.ts
var CITY_COORDINATES = {
  // Europe
  paris: { lat: 48.8566, lng: 2.3522 },
  london: { lat: 51.5074, lng: -0.1278 },
  rome: { lat: 41.9028, lng: 12.4964 },
  barcelona: { lat: 41.3874, lng: 2.1686 },
  madrid: { lat: 40.4168, lng: -3.7038 },
  amsterdam: { lat: 52.3676, lng: 4.9041 },
  berlin: { lat: 52.52, lng: 13.405 },
  prague: { lat: 50.0755, lng: 14.4378 },
  vienna: { lat: 48.2082, lng: 16.3738 },
  venice: { lat: 45.4408, lng: 12.3155 },
  florence: { lat: 43.7696, lng: 11.2558 },
  milan: { lat: 45.4642, lng: 9.19 },
  athens: { lat: 37.9838, lng: 23.7275 },
  lisbon: { lat: 38.7223, lng: -9.1393 },
  edinburgh: { lat: 55.9533, lng: -3.1883 },
  dublin: { lat: 53.3498, lng: -6.2603 },
  budapest: { lat: 47.4979, lng: 19.0402 },
  munich: { lat: 48.1351, lng: 11.582 },
  zurich: { lat: 47.3769, lng: 8.5417 },
  copenhagen: { lat: 55.6761, lng: 12.5683 },
  stockholm: { lat: 59.3293, lng: 18.0686 },
  // Asia & Middle East
  tokyo: { lat: 35.6762, lng: 139.6503 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  osaka: { lat: 34.6937, lng: 135.5023 },
  seoul: { lat: 37.5665, lng: 126.978 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  bangkok: { lat: 13.7563, lng: 100.5018 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  "abu dhabi": { lat: 24.4539, lng: 54.3773 },
  istanbul: { lat: 41.0082, lng: 28.9784 },
  "hong kong": { lat: 22.3193, lng: 114.1694 },
  taipei: { lat: 25.033, lng: 121.5654 },
  mumbai: { lat: 19.076, lng: 72.8777 },
  delhi: { lat: 28.6139, lng: 77.209 },
  bali: { lat: -8.4095, lng: 115.1889 },
  hanoi: { lat: 21.0285, lng: 105.8542 },
  "ho chi minh": { lat: 10.8231, lng: 106.6297 },
  doha: { lat: 25.2854, lng: 51.531 },
  // Africa
  cairo: { lat: 30.0444, lng: 31.2357 },
  giza: { lat: 29.987, lng: 31.2118 },
  marrakech: { lat: 31.6295, lng: -7.9811 },
  "cape town": { lat: -33.9249, lng: 18.4241 },
  nairobi: { lat: -1.2921, lng: 36.8219 },
  // North America
  "new york": { lat: 40.7128, lng: -74.006 },
  nyc: { lat: 40.7128, lng: -74.006 },
  "san francisco": { lat: 37.7749, lng: -122.4194 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  chicago: { lat: 41.8781, lng: -87.6298 },
  miami: { lat: 25.7617, lng: -80.1918 },
  "las vegas": { lat: 36.1699, lng: -115.1398 },
  seattle: { lat: 47.6062, lng: -122.3321 },
  washington: { lat: 38.9072, lng: -77.0369 },
  boston: { lat: 42.3601, lng: -71.0589 },
  toronto: { lat: 43.6532, lng: -79.3832 },
  vancouver: { lat: 49.2827, lng: -123.1207 },
  montreal: { lat: 45.5017, lng: -73.5673 },
  "mexico city": { lat: 19.4326, lng: -99.1332 },
  // South America & Oceania
  "rio de janeiro": { lat: -22.9068, lng: -43.1729 },
  "buenos aires": { lat: -34.6037, lng: -58.3816 },
  santiago: { lat: -33.4489, lng: -70.6693 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  melbourne: { lat: -37.8136, lng: 144.9631 },
  auckland: { lat: -36.8485, lng: 174.7633 }
};
var EXACT_LANDMARK_COORDINATES = {
  // Paris
  "eiffel tower": { lat: 48.8584, lng: 2.2945 },
  eiffel: { lat: 48.8584, lng: 2.2945 },
  "louvre museum": { lat: 48.8606, lng: 2.3376 },
  louvre: { lat: 48.8606, lng: 2.3376 },
  "mus\xE9e d'orsay": { lat: 48.8599, lng: 2.3265 },
  orsay: { lat: 48.8599, lng: 2.3265 },
  "notre-dame": { lat: 48.853, lng: 2.3499 },
  "notre dame": { lat: 48.853, lng: 2.3499 },
  "arc de triomphe": { lat: 48.8738, lng: 2.295 },
  "sacr\xE9-c\u0153ur": { lat: 48.8867, lng: 2.3431 },
  "sacre coeur": { lat: 48.8867, lng: 2.3431 },
  montmartre: { lat: 48.8867, lng: 2.3431 },
  "sainte-chapelle": { lat: 48.8554, lng: 2.345 },
  "jardin des tuileries": { lat: 48.8635, lng: 2.3275 },
  tuileries: { lat: 48.8635, lng: 2.3275 },
  "palace of versailles": { lat: 48.8049, lng: 2.1204 },
  versaill: { lat: 48.8049, lng: 2.1204 },
  "seine cruise": { lat: 48.8616, lng: 2.2965 },
  "le marais": { lat: 48.8575, lng: 2.3622 },
  // Rome
  colosseum: { lat: 41.8902, lng: 12.4922 },
  "roman forum": { lat: 41.8925, lng: 12.4853 },
  "trevi fountain": { lat: 41.9009, lng: 12.4833 },
  trevi: { lat: 41.9009, lng: 12.4833 },
  pantheon: { lat: 41.8986, lng: 12.4769 },
  "vatican museums": { lat: 41.9065, lng: 12.4536 },
  "st. peter's basilica": { lat: 41.9022, lng: 12.4539 },
  vatican: { lat: 41.9022, lng: 12.4539 },
  "piazza navona": { lat: 41.8989, lng: 12.4731 },
  "spanish steps": { lat: 41.9059, lng: 12.4828 },
  trastevere: { lat: 41.8887, lng: 12.4705 },
  "villa borghese": { lat: 41.9142, lng: 12.4922 },
  // Tokyo
  "senso-ji": { lat: 35.7148, lng: 139.7967 },
  sensoji: { lat: 35.7148, lng: 139.7967 },
  asakusa: { lat: 35.7126, lng: 139.7958 },
  "shibuya crossing": { lat: 35.6595, lng: 139.7004 },
  shibuya: { lat: 35.6595, lng: 139.7004 },
  "meiji shrine": { lat: 35.6764, lng: 139.6993 },
  "tokyo skytree": { lat: 35.71, lng: 139.8107 },
  skytree: { lat: 35.71, lng: 139.8107 },
  "tsukiji market": { lat: 35.6655, lng: 139.7707 },
  tsukiji: { lat: 35.6655, lng: 139.7707 },
  akihabara: { lat: 35.6983, lng: 139.7731 },
  "shinjuku gyoen": { lat: 35.6852, lng: 139.7101 },
  "omoide yokocho": { lat: 35.6932, lng: 139.6998 },
  "teamlab planets": { lat: 35.6491, lng: 139.7898 },
  // Barcelona
  "sagrada fam\xEDlia": { lat: 41.4036, lng: 2.1744 },
  "sagrada familia": { lat: 41.4036, lng: 2.1744 },
  "park g\xFCell": { lat: 41.4145, lng: 2.1527 },
  "park guell": { lat: 41.4145, lng: 2.1527 },
  "casa batll\xF3": { lat: 41.3916, lng: 2.1649 },
  "casa batllo": { lat: 41.3916, lng: 2.1649 },
  "casa mil\xE0": { lat: 41.3953, lng: 2.1619 },
  "gothic quarter": { lat: 41.3828, lng: 2.1768 },
  "barri gotic": { lat: 41.3828, lng: 2.1768 },
  "la boqueria": { lat: 41.3817, lng: 2.1716 },
  "la rambla": { lat: 41.3809, lng: 2.1734 },
  "barceloneta beach": { lat: 41.3784, lng: 2.1925 },
  // New York City
  "times square": { lat: 40.758, lng: -73.9855 },
  "central park": { lat: 40.7851, lng: -73.9683 },
  "brooklyn bridge": { lat: 40.7061, lng: -73.9969 },
  "empire state building": { lat: 40.7484, lng: -73.9857 },
  "the high line": { lat: 40.748, lng: -74.0048 },
  "high line": { lat: 40.748, lng: -74.0048 },
  "the met": { lat: 40.7794, lng: -73.9632 },
  "metropolitan museum": { lat: 40.7794, lng: -73.9632 },
  "statue of liberty": { lat: 40.6892, lng: -74.0445 },
  "chelsea market": { lat: 40.7424, lng: -74.0061 },
  // London
  "big ben": { lat: 51.5007, lng: -0.1246 },
  "westminster abbey": { lat: 51.4994, lng: -0.1273 },
  "tower bridge": { lat: 51.5055, lng: -0.0754 },
  "tower of london": { lat: 51.5081, lng: -0.0759 },
  "british museum": { lat: 51.5194, lng: -0.127 },
  "borough market": { lat: 51.5055, lng: -0.091 },
  "london eye": { lat: 51.5033, lng: -0.1195 },
  "covent garden": { lat: 51.5117, lng: -0.1232 },
  "buckingham palace": { lat: 51.5014, lng: -0.1419 },
  // Cairo & Egypt
  "pyramids of giza": { lat: 29.9792, lng: 31.1342 },
  "great pyramid": { lat: 29.9792, lng: 31.1342 },
  "great sphinx": { lat: 29.9753, lng: 31.1376 },
  sphinx: { lat: 29.9753, lng: 31.1376 },
  "egyptian museum": { lat: 30.0478, lng: 31.2336 },
  "khan el-khalili": { lat: 30.0478, lng: 31.2622 },
  "citadel of cairo": { lat: 30.0299, lng: 31.2613 },
  "al-azhar mosque": { lat: 30.0457, lng: 31.2627 },
  // Kyoto
  "fushimi inari": { lat: 34.9671, lng: 135.7727 },
  "kinkaku-ji": { lat: 35.0394, lng: 135.7292 },
  "golden pavilion": { lat: 35.0394, lng: 135.7292 },
  "arashiyama bamboo": { lat: 35.0169, lng: 135.6713 },
  "kiyomizu-dera": { lat: 34.9949, lng: 135.785 },
  "gion district": { lat: 35.0037, lng: 135.7772 },
  "nishiki market": { lat: 35.005, lng: 135.7649 },
  // Dubai
  "burj khalifa": { lat: 25.1972, lng: 55.2744 },
  "the dubai mall": { lat: 25.1985, lng: 55.2796 },
  "dubai mall": { lat: 25.1985, lng: 55.2796 },
  "burj al arab": { lat: 25.1412, lng: 55.1852 },
  "palm jumeirah": { lat: 25.1124, lng: 55.139 }
};
function isValidCoordinate(coord) {
  if (!coord) return false;
  const { lat, lng } = coord;
  if (typeof lat !== "number" || typeof lng !== "number") return false;
  if (isNaN(lat) || isNaN(lng)) return false;
  if (Math.abs(lat) < 1e-4 && Math.abs(lng) < 1e-4) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
function getDestinationCenter(destination = "") {
  const destClean = destination.toLowerCase().trim();
  for (const [cityName, coord] of Object.entries(CITY_COORDINATES)) {
    if (destClean.includes(cityName)) {
      return coord;
    }
  }
  return { lat: 48.8566, lng: 2.3522 };
}
function getOffsetAroundCenter(seedStr, index) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const angle = (Math.abs(hash) + index * 57) % 360 * (Math.PI / 180);
  const radiusKm = 0.6 + ((Math.abs(hash) >> 2) + index * 3) % 20 * 0.12;
  const dLat = radiusKm / 111 * Math.cos(angle);
  const dLng = radiusKm / 90 * Math.sin(angle);
  return { lat: dLat, lng: dLng };
}
function resolvePlaceCoordinates(item, destination = "", itemIndex = 0) {
  const titleLower = (item.title || "").toLowerCase();
  const locLower = (item.location || "").toLowerCase();
  const combined = `${titleLower} ${locLower}`;
  for (const [landmark, coords] of Object.entries(EXACT_LANDMARK_COORDINATES)) {
    if (combined.includes(landmark)) {
      return coords;
    }
  }
  const center = getDestinationCenter(destination);
  if (isValidCoordinate(item.coordinates)) {
    const dLat = Math.abs(item.coordinates.lat - center.lat);
    const dLng = Math.abs(item.coordinates.lng - center.lng);
    if (dLat < 1.5 && dLng < 1.5) {
      return item.coordinates;
    }
  }
  const offset = getOffsetAroundCenter(item.title + (item.location || ""), itemIndex);
  return {
    lat: Number((center.lat + offset.lat).toFixed(5)),
    lng: Number((center.lng + offset.lng).toFixed(5))
  };
}

// src/utils/landmarkImages.ts
var FAMOUS_LANDMARKS_PHOTOS = {
  // Paris
  "eiffel": {
    url: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
    caption: "Eiffel Tower, Paris",
    source: "Official Website (toureiffel.paris)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.toureiffel.paris",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d188151-Reviews-Eiffel_Tower-Paris_Ile_de_France.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Eiffel Tower Sunset view from Champ de Mars",
        sourceType: "tripadvisor"
      }
    ]
  },
  "louvre": {
    url: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80",
    caption: "The Louvre Museum & Glass Pyramid, Paris",
    source: "Official Website (louvre.fr)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.louvre.fr",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d188757-Reviews-Louvre_Museum-Paris_Ile_de_France.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "The Louvre Courtyard & Glass Pyramid at Twilight",
        sourceType: "tripadvisor"
      }
    ]
  },
  "orsay": {
    url: "https://images.unsplash.com/photo-1594916892556-91349f7ba308?auto=format&fit=crop&w=1200&q=80",
    caption: "Mus\xE9e d'Orsay, Paris",
    source: "Official Website (musee-orsay.fr)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.musee-orsay.fr",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d188679-Reviews-Musee_d_Orsay-Paris_Ile_de_France.html"
  },
  "notre dame": {
    url: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?auto=format&fit=crop&w=1200&q=80",
    caption: "Notre-Dame Cathedral, Paris",
    source: "Official Heritage Portal (notredamedeparis.fr)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.notredamedeparis.fr",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d188657-Reviews-Cathedrale_Notre_Dame_de_Paris-Paris_Ile_de_France.html"
  },
  "arc de triomphe": {
    url: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=1200&q=80",
    caption: "Arc de Triomphe, Paris",
    source: "Official Site (paris-arc-de-triomphe.fr)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.paris-arc-de-triomphe.fr",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d188152-Reviews-Arc_de_Triomphe-Paris_Ile_de_France.html"
  },
  "montmartre": {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    caption: "Montmartre & Sacr\xE9-C\u0153ur, Paris",
    source: "TripAdvisor Traveler Collection",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d190689-Reviews-Montmartre-Paris_Ile_de_France.html"
  },
  "sacre coeur": {
    url: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80",
    caption: "Sacr\xE9-C\u0153ur Basilica, Paris",
    source: "Official Basilica Portal (sacre-coeur-montmartre.com)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.sacre-coeur-montmartre.com"
  },
  "seine": {
    url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    caption: "Seine River Twilight Promenade, Paris",
    source: "Paris Tourism Official Archive (parisinfo.com)",
    sourceType: "tourism_board",
    officialWebsiteUrl: "https://www.parisjetaime.com"
  },
  "versailles": {
    url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
    caption: "Palace of Versailles & Royal Gardens",
    source: "Official Website (chateauversailles.fr)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://en.chateauversailles.fr",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187147-d189282-Reviews-Palace_of_Versailles-Paris_Ile_de_France.html"
  },
  // Rome
  "colosseum": {
    url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    caption: "The Roman Colosseum, Rome",
    source: "Official Archaeological Park (parcocolosseo.it)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://parcocolosseo.it",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187791-d192285-Reviews-Colosseum-Rome_Lazio.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Colosseum Archway & Sunbeams, Rome",
        sourceType: "tripadvisor"
      }
    ]
  },
  "forum": {
    url: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80",
    caption: "Roman Forum & Palatine Hill, Rome",
    source: "Official Archaeological Park (parcocolosseo.it)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://parcocolosseo.it",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187791-d192293-Reviews-Roman_Forum-Rome_Lazio.html"
  },
  "trevi": {
    url: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80",
    caption: "Trevi Fountain, Rome",
    source: "TripAdvisor Traveler Collection",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187791-d192289-Reviews-Trevi_Fountain-Rome_Lazio.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?auto=format&fit=crop&w=1200&q=80",
        source: "Official City of Rome Tourism Archive (turismoroma.it)",
        caption: "Trevi Fountain Piazza & Baroque Sculptures",
        sourceType: "tourism_board"
      }
    ]
  },
  "pantheon": {
    url: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=1200&q=80",
    caption: "The Pantheon, Rome",
    source: "Official Monument Portal (pantheonroma.com)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.pantheonroma.com",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187791-d192288-Reviews-Pantheon-Rome_Lazio.html"
  },
  "vatican": {
    url: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80",
    caption: "St. Peter's Basilica & Vatican City",
    source: "Official Vatican Museums Portal (museivaticani.va)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.museivaticani.va",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187793-d192290-Reviews-St_Peter_s_Basilica-Vatican_City_Lazio.html"
  },
  "trastevere": {
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    caption: "Cobblestone Alleys of Trastevere, Rome",
    source: "TripAdvisor Neighborhood Guide",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187791-d192284-Reviews-Trastevere-Rome_Lazio.html"
  },
  // Tokyo
  "senso-ji": {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    caption: "Senso-ji Temple & Kaminarimon, Asakusa",
    source: "Official Website (senso-ji.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.senso-ji.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066461-d320050-Reviews-Senso_ji_Temple-Taito_Tokyo_Tokyo_Prefecture_Kanto.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Senso-ji Five-Story Pagoda & Incense Smoke",
        sourceType: "tripadvisor"
      },
      {
        url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        source: "Official Tokyo Tourism Archive",
        caption: "Asakusa Kaminarimon Grand Lantern Gate",
        sourceType: "tourism_board"
      }
    ]
  },
  "sensoji": {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    caption: "Senso-ji Temple, Tokyo",
    source: "Official Website (senso-ji.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.senso-ji.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066461-d320050-Reviews-Senso_ji_Temple-Taito_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "asakusa": {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
    caption: "Historic Asakusa & Senso-ji Quarter, Tokyo",
    source: "Official Website (senso-ji.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.senso-ji.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066461-d320050-Reviews-Senso_ji_Temple-Taito_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "shibuya": {
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    caption: "Shibuya Scramble Crossing, Tokyo",
    source: "TripAdvisor Traveler Collection",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066456-d1373809-Reviews-Shibuya_Crossing-Shibuya_Tokyo_Tokyo_Prefecture_Kanto.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        source: "Official Tokyo Tourism Board (gotokyo.org)",
        caption: "Shibuya Sky & Neon Skyline at Night",
        sourceType: "tourism_board"
      },
      {
        url: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Shibuya Neon Crosswalks & Atmosphere",
        sourceType: "tripadvisor"
      }
    ]
  },
  "meiji": {
    url: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1200&q=80",
    caption: "Meiji Jingu Shrine & Forest, Harajuku",
    source: "Official Shrine Website (meijijingu.or.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.meijijingu.or.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066456-d320052-Reviews-Meiji_Jingu_Shrine-Shibuya_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "skytree": {
    url: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
    caption: "Tokyo Skytree Panoramic Skyline",
    source: "Official Website (tokyo-skytree.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.tokyo-skytree.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066459-d1911929-Reviews-Tokyo_Skytree-Sumida_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "akihabara": {
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    caption: "Electric Town & Tech Quarter, Akihabara",
    source: "TripAdvisor Traveler Guide",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066443-d320054-Reviews-Akihabara-Chiyoda_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "shinjuku": {
    url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    caption: "Shinjuku Neon Alleys & Omoide Yokocho",
    source: "TripAdvisor Verified Dining Archive",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066457-d320057-Reviews-Shinjuku_Gyoen_National_Garden-Shinjuku_Tokyo_Tokyo_Prefecture_Kanto.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Dining Archive",
        caption: "Omoide Yokocho (Memory Lane) Lanterns",
        sourceType: "tripadvisor"
      }
    ]
  },
  "omoide": {
    url: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=1200&q=80",
    caption: "Omoide Yokocho (Memory Lane) Yakitori, Shinjuku",
    source: "TripAdvisor Verified Dining Archive",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066457-d8794833-Reviews-Omoide_Yokocho-Shinjuku_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "tokyo tower": {
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    caption: "Tokyo Tower & Minato Skyline at Night",
    source: "Official Observatory Site (tokyotower.co.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.tokyotower.co.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066451-d320055-Reviews-Tokyo_Tower-Minato_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "teamlab": {
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    caption: "teamLab Planets Digital Art Museum, Tokyo",
    source: "Official Museum Site (planets.teamlab.art)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://planets.teamlab.art",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066449-d14986629-Reviews-TeamLab_Planets_TOKYO-Koto_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "misojyu": {
    url: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80",
    caption: "Traditional Miso & Onigiri Breakfast at Misojyu Asakusa",
    source: "TripAdvisor Verified Dining Collection",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Restaurant_Review-g1066461-d14190890-Reviews-Misojyu-Taito_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "shimokitazawa": {
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    caption: "Shimokitazawa Vintage Shops & Bohemian Streets",
    source: "TripAdvisor Neighborhood Guide",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066455-d592476-Reviews-Shimokitazawa-Setagaya_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  "tsukiji": {
    url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
    caption: "Tsukiji Outer Fish & Street Food Market",
    source: "Official Market Association (tsukiji.or.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.tsukiji.or.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g1066444-d320058-Reviews-Tsukiji_Outer_Market-Chuo_Tokyo_Tokyo_Prefecture_Kanto.html"
  },
  // Barcelona
  "sagrada": {
    url: "https://images.unsplash.com/photo-1583779457306-046549c7161b?auto=format&fit=crop&w=1200&q=80",
    caption: "Bas\xEDlica de la Sagrada Fam\xEDlia, Barcelona",
    source: "Official Basilica Portal (sagradafamilia.org)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://sagradafamilia.org",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187497-d190166-Reviews-Bas\xEDlica_de_la_Sagrada_Fam\xEDlia-Barcelona_Catalonia.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Sagrada Familia Nativity Facade & Towers",
        sourceType: "tripadvisor"
      }
    ]
  },
  "guell": {
    url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1200&q=80",
    caption: "Park G\xFCell Mosaic Terraces, Barcelona",
    source: "Official Monument Site (parkguell.barcelona)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://parkguell.barcelona",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187497-d190165-Reviews-Park_Guell-Barcelona_Catalonia.html"
  },
  "batllo": {
    url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    caption: "Casa Batll\xF3 by Antoni Gaud\xED, Barcelona",
    source: "Official Website (casabatllo.es)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.casabatllo.es",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187497-d190164-Reviews-Casa_Batllo-Barcelona_Catalonia.html"
  },
  "boqueria": {
    url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80",
    caption: "Mercat de la Boqueria on Las Ramblas",
    source: "Official Market Portal (boqueria.barcelona)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.boqueria.barcelona",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g187497-d190163-Reviews-Mercat_de_la_Boqueria-Barcelona_Catalonia.html"
  },
  // New York City
  "times square": {
    url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    caption: "Times Square & Broadway Theater District, NYC",
    source: "Official Alliance (timessquarenyc.org)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.timessquarenyc.org",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g60763-d105125-Reviews-Times_Square-New_York_City_New_York.html"
  },
  "central park": {
    url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1200&q=80",
    caption: "Central Park Bow Bridge & Reservoir, NYC",
    source: "Central Park Conservancy (centralparknyc.org)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.centralparknyc.org",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g60763-d105127-Reviews-Central_Park-New_York_City_New_York.html"
  },
  "brooklyn bridge": {
    url: "https://images.unsplash.com/photo-1496868834840-5f4c98840aaa?auto=format&fit=crop&w=1200&q=80",
    caption: "Brooklyn Bridge & Manhattan Skyline Promenade",
    source: "TripAdvisor Traveler Collection",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g60763-d104365-Reviews-Brooklyn_Bridge-New_York_City_New_York.html"
  },
  "empire state": {
    url: "https://images.unsplash.com/photo-1546436836-07a91091f160?auto=format&fit=crop&w=1200&q=80",
    caption: "Empire State Building View, NYC",
    source: "Official Observatory (esbnyc.com)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.esbnyc.com",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g60763-d104366-Reviews-Empire_State_Building-New_York_City_New_York.html"
  },
  "metropolitan museum": {
    url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    caption: "The Metropolitan Museum of Art (The Met), NYC",
    source: "Official Museum Site (metmuseum.org)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.metmuseum.org",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g60763-d105128-Reviews-The_Metropolitan_Museum_of_Art-New_York_City_New_York.html"
  },
  // London
  "big ben": {
    url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80",
    caption: "Big Ben & Palace of Westminster, London",
    source: "Official UK Parliament Portal (parliament.uk)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.parliament.uk",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g186338-d187549-Reviews-Big_Ben-London_England.html"
  },
  "tower bridge": {
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    caption: "Tower Bridge over the River Thames, London",
    source: "Official Website (towerbridge.org.uk)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.towerbridge.org.uk",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g186338-d187550-Reviews-Tower_Bridge-London_England.html"
  },
  "british museum": {
    url: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=1200&q=80",
    caption: "The Great Court at The British Museum, London",
    source: "Official Museum Site (britishmuseum.org)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.britishmuseum.org",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g186338-d187555-Reviews-The_British_Museum-London_England.html"
  },
  // Kyoto
  "fushimi": {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    caption: "Fushimi Inari-taisha Senbon Torii Gates, Kyoto",
    source: "Official Shrine Site (inari.jp)",
    sourceType: "official_website",
    officialWebsiteUrl: "http://inari.jp",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g298564-d321401-Reviews-Fushimi_Inari_taisha_Shrine-Kyoto_Kyoto_Prefecture_Kinki.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Fushimi Inari Vermillion Shrine Pathway",
        sourceType: "tripadvisor"
      }
    ]
  },
  "kinkaku": {
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
    caption: "Kinkaku-ji (The Golden Pavilion), Kyoto",
    source: "Official Temple Site (shokoku-ji.jp/kinkakuji)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.shokoku-ji.jp/kinkakuji",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g298564-d321402-Reviews-Kinkaku_ji_Temple-Kyoto_Kyoto_Prefecture_Kinki.html"
  },
  "arashiyama": {
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    caption: "Arashiyama Sagano Bamboo Grove, Kyoto",
    source: "Kyoto Tourism Official Archive (kyoto.travel)",
    sourceType: "tourism_board",
    officialWebsiteUrl: "https://kyoto.travel",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g298564-d321405-Reviews-Arashiyama-Kyoto_Kyoto_Prefecture_Kinki.html"
  },
  // Cairo & Egypt
  "pyramids": {
    url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    caption: "Great Pyramids of Giza & Desert Plateau, Egypt",
    source: "Ministry of Tourism & Antiquities (egymonuments.gov.eg)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://egymonuments.gov.eg",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g294202-d317744-Reviews-Giza_Plateau-Giza_Giza_Governorate.html",
    alternativePhotos: [
      {
        url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
        source: "TripAdvisor Verified Traveler Archive",
        caption: "Pyramids of Giza Panorama with Camels",
        sourceType: "tripadvisor"
      }
    ]
  },
  "giza": {
    url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
    caption: "Giza Necropolis & Ancient Wonders",
    source: "Official Antiquities Registry (egymonuments.gov.eg)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://egymonuments.gov.eg"
  },
  "khan": {
    url: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80",
    caption: "Khan el-Khalili Historic Grand Bazaar, Cairo",
    source: "TripAdvisor Cultural Traveler Collection",
    sourceType: "tripadvisor",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g294201-d317742-Reviews-Khan_Al_Khalili-Cairo_Cairo_Governorate.html"
  },
  // Dubai
  "burj khalifa": {
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    caption: "Burj Khalifa & Downtown Dubai Skyline",
    source: "Official Site (burjkhalifa.ae)",
    sourceType: "official_website",
    officialWebsiteUrl: "https://www.burjkhalifa.ae",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-g295424-d676822-Reviews-Burj_Khalifa-Dubai_Emirate_of_Dubai.html"
  }
};
var THEMATIC_PHOTOS = {
  // Food & Dining
  food_breakfast: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
  food_ramen: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
  food_sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  food_bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
  food_pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
  food_tapas: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80",
  food_cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
  food_street: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  food_dinner: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  food_lunch: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  // Sightseeing & Activities
  place_museum: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=800&q=80",
  place_temple: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
  place_church: "https://images.unsplash.com/photo-1548625361-195989a14731?auto=format&fit=crop&w=800&q=80",
  place_park: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
  place_market: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800&q=80",
  place_viewpoint: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  // Transportation Modes
  transport_subway: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80",
  transport_train: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
  transport_ferry: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  transport_walk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  // Generic Destination Fallback
  destination_default: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
};
var DESTINATION_FALLBACKS = {
  paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  tokyo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
  rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
  barcelona: "https://images.unsplash.com/photo-1583779457306-046549c7161b?auto=format&fit=crop&w=800&q=80",
  "new york": "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80",
  london: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  kyoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
  cairo: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80",
  dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
};
function getLandmarkPhoto(item, destination = "") {
  if (item.imageUrl && item.imageUrl.startsWith("http")) {
    const rawSource = item.photoSource || "Pinterest";
    const rawSourceType = item.photoSourceType || (rawSource.toLowerCase().includes("pinterest") ? "pinterest" : rawSource.toLowerCase().includes("tripadvisor") ? "tripadvisor" : "official_website");
    const allUrls = [item.imageUrl];
    if (item.photos && item.photos.length > 0) {
      item.photos.forEach((u) => {
        if (u && !allUrls.includes(u)) allUrls.push(u);
      });
    }
    if (item.alternativePhotos && item.alternativePhotos.length > 0) {
      item.alternativePhotos.forEach((p) => {
        if (p.url && !allUrls.includes(p.url)) allUrls.push(p.url);
      });
    }
    const top3Urls = allUrls.slice(0, 3);
    const altPhotos = item.alternativePhotos && item.alternativePhotos.length > 0 ? item.alternativePhotos : top3Urls.slice(1).map((u, i) => ({
      url: u,
      source: rawSource,
      caption: `${item.photoCaption || item.title} - View ${i + 2}`,
      sourceType: rawSourceType
    }));
    return {
      url: item.imageUrl,
      caption: item.photoCaption || item.title,
      alt: `${item.title} in ${destination}`,
      isVerifiedLandmark: true,
      source: rawSource,
      sourceType: rawSourceType,
      officialWebsiteUrl: item.officialWebsiteUrl,
      tripAdvisorUrl: item.tripAdvisorUrl || item.officialWebsiteUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.title} ${destination}`)}`,
      photos: top3Urls,
      alternativePhotos: altPhotos
    };
  }
  const titleLower = (item.title || "").toLowerCase();
  const descLower = (item.description || "").toLowerCase();
  const locLower = (item.location || "").toLowerCase();
  const combinedText = `${titleLower} ${descLower} ${locLower}`;
  const category = (item.category || "activity").toLowerCase();
  for (const [key, photo] of Object.entries(FAMOUS_LANDMARKS_PHOTOS)) {
    if (titleLower.includes(key)) {
      const allUrls = [photo.url, ...photo.photos || [], ...(photo.alternativePhotos || []).map((p) => p.url)].filter((u, i, arr) => arr.indexOf(u) === i).slice(0, 3);
      return {
        url: photo.url,
        caption: photo.caption,
        alt: `${photo.caption} - ${item.title}`,
        isVerifiedLandmark: true,
        source: photo.source,
        sourceType: photo.sourceType,
        officialWebsiteUrl: photo.officialWebsiteUrl,
        tripAdvisorUrl: photo.tripAdvisorUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${photo.caption} ${destination}`)}`,
        photos: allUrls,
        alternativePhotos: photo.alternativePhotos || allUrls.slice(1).map((u, i) => ({
          url: u,
          source: photo.source,
          caption: `${photo.caption} - Perspective ${i + 2}`,
          sourceType: photo.sourceType
        }))
      };
    }
  }
  if (category === "food") {
    let foodPhoto = THEMATIC_PHOTOS.food_lunch;
    let foodCaption = "Authentic Local Dining";
    if (combinedText.includes("ramen") || combinedText.includes("noodle")) {
      foodPhoto = THEMATIC_PHOTOS.food_ramen;
      foodCaption = "Artisanal Noodle & Broth Specialty";
    } else if (combinedText.includes("sushi") || combinedText.includes("sashimi") || combinedText.includes("fish market")) {
      foodPhoto = THEMATIC_PHOTOS.food_sushi;
      foodCaption = "Fresh Chef-Selected Sushi";
    } else if (combinedText.includes("croissant") || combinedText.includes("bakery") || combinedText.includes("pastry") || combinedText.includes("boulangerie")) {
      foodPhoto = THEMATIC_PHOTOS.food_bakery;
      foodCaption = "Artisan Bakery & Fresh Pastries";
    } else if (combinedText.includes("pasta") || combinedText.includes("trattoria") || combinedText.includes("pizza")) {
      foodPhoto = THEMATIC_PHOTOS.food_pasta;
      foodCaption = "Handmade Regional Pasta & Dining";
    } else if (combinedText.includes("tapa") || combinedText.includes("pincho") || combinedText.includes("bodega")) {
      foodPhoto = THEMATIC_PHOTOS.food_tapas;
      foodCaption = "Vibrant Tapas & Small Plates";
    } else if (combinedText.includes("cafe") || combinedText.includes("coffee") || combinedText.includes("espresso") || combinedText.includes("breakfast")) {
      foodPhoto = THEMATIC_PHOTOS.food_cafe;
      foodCaption = "Neighborhood Cafe & Espresso";
    } else if (combinedText.includes("market") || combinedText.includes("street food")) {
      foodPhoto = THEMATIC_PHOTOS.food_street;
      foodCaption = "Local Market Tastings";
    } else if (item.foodDetail?.mealType === "dinner" || combinedText.includes("dinner") || combinedText.includes("bistro")) {
      foodPhoto = THEMATIC_PHOTOS.food_dinner;
      foodCaption = "Evening Culinary Experience";
    }
    return {
      url: foodPhoto,
      caption: foodCaption,
      alt: item.title,
      source: "TripAdvisor Restaurant Collection & Official Eatery",
      sourceType: "tripadvisor",
      tripAdvisorUrl: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${item.title} ${destination}`)}`,
      alternativePhotos: [
        {
          url: foodPhoto,
          source: "TripAdvisor Verified Dining Archive",
          caption: `${item.title} - ${foodCaption}`,
          sourceType: "tripadvisor"
        }
      ]
    };
  }
  if (category === "transport") {
    const mode = item.transportDetail?.mode || "";
    let transitPhoto = THEMATIC_PHOTOS.transport_walk;
    let transitCaption = "Scenic Neighborhood Stroll";
    if (mode === "subway" || combinedText.includes("metro") || combinedText.includes("subway") || combinedText.includes("tube")) {
      transitPhoto = THEMATIC_PHOTOS.transport_subway;
      transitCaption = "Urban Metro & Rapid Transit";
    } else if (mode === "train" || combinedText.includes("train") || combinedText.includes("shinkansen") || combinedText.includes("rail")) {
      transitPhoto = THEMATIC_PHOTOS.transport_train;
      transitCaption = "Scenic Rail Connection";
    } else if (mode === "ferry" || combinedText.includes("ferry") || combinedText.includes("boat") || combinedText.includes("cruise")) {
      transitPhoto = THEMATIC_PHOTOS.transport_ferry;
      transitCaption = "Scenic Water Transit";
    }
    return {
      url: transitPhoto,
      caption: transitCaption,
      alt: item.title,
      source: "Official Municipal Transit Authority",
      sourceType: "official_website"
    };
  }
  if (category === "place" || category === "activity") {
    let placePhoto = THEMATIC_PHOTOS.place_viewpoint;
    let placeCaption = "Panoramic Landmark Vista";
    let placeSource = "TripAdvisor Cultural Archive";
    if (combinedText.includes("museum") || combinedText.includes("gallery") || combinedText.includes("art") || combinedText.includes("exhibit")) {
      placePhoto = THEMATIC_PHOTOS.place_museum;
      placeCaption = "World-Class Art & Museum Exhibition";
      placeSource = "Official Museum Portal & TripAdvisor Archive";
    } else if (combinedText.includes("temple") || combinedText.includes("shrine") || combinedText.includes("pagoda")) {
      placePhoto = THEMATIC_PHOTOS.place_temple;
      placeCaption = "Sacred Temple Grounds";
      placeSource = "Official Heritage Registry & TripAdvisor";
    } else if (combinedText.includes("basilica") || combinedText.includes("cathedral") || combinedText.includes("church") || combinedText.includes("chapel")) {
      placePhoto = THEMATIC_PHOTOS.place_church;
      placeCaption = "Historic Architecture & Cathedral";
      placeSource = "Official Cathedral Archive";
    } else if (combinedText.includes("park") || combinedText.includes("garden") || combinedText.includes("botanic") || combinedText.includes("woods")) {
      placePhoto = THEMATIC_PHOTOS.place_park;
      placeCaption = "Scenic City Park & Promenade";
      placeSource = "Official City Parks Conservancy";
    } else if (combinedText.includes("market") || combinedText.includes("bazaar") || combinedText.includes("souk")) {
      placePhoto = THEMATIC_PHOTOS.place_market;
      placeCaption = "Bustling Historic Market";
      placeSource = "TripAdvisor Traveler Collection";
    }
    return {
      url: placePhoto,
      caption: placeCaption,
      alt: item.title,
      source: placeSource,
      sourceType: "tripadvisor",
      tripAdvisorUrl: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${item.title} ${destination}`)}`,
      alternativePhotos: [
        {
          url: placePhoto,
          source: placeSource,
          caption: `${item.title} - ${placeCaption}`,
          sourceType: "tripadvisor"
        }
      ]
    };
  }
  const destClean = destination.toLowerCase().trim();
  for (const [cityKey, cityImg] of Object.entries(DESTINATION_FALLBACKS)) {
    if (destClean.includes(cityKey)) {
      return {
        url: cityImg,
        caption: `${item.title} \u2022 ${destination}`,
        alt: item.title,
        source: `Official ${destination} Tourism Registry`,
        sourceType: "tourism_board",
        tripAdvisorUrl: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${item.title} ${destination}`)}`
      };
    }
  }
  return {
    url: THEMATIC_PHOTOS.destination_default,
    caption: `${item.title} \u2022 ${destination}`,
    alt: item.title,
    source: "TripAdvisor Global Traveler Archive",
    sourceType: "tripadvisor",
    tripAdvisorUrl: `https://www.tripadvisor.com/Search?q=${encodeURIComponent(`${item.title} ${destination}`)}`
  };
}

// src/data/fallbackGenerator.ts
function generateFallbackTripPlan(preferences) {
  const destLower = preferences.destination.toLowerCase();
  let plan;
  if (destLower.includes("tokyo") || destLower.includes("japan")) {
    const baseTokyo = SAMPLE_TRIPS[0];
    plan = {
      ...baseTokyo,
      destination: preferences.destination,
      occasion: preferences.occasion || baseTokyo.occasion,
      travelersCount: preferences.travelersCount || baseTokyo.travelersCount,
      travelerType: preferences.travelerType || baseTokyo.travelerType,
      budget: preferences.budget || baseTokyo.budget,
      pace: preferences.pace || baseTokyo.pace,
      durationDays: preferences.durationDays || 3,
      startDate: preferences.startDate,
      endDate: preferences.endDate,
      days: baseTokyo.days.slice(0, preferences.durationDays || 3),
      quotaExceeded: true,
      quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've generated a complete, personalized itinerary for ${preferences.destination} so you can continue your travel planning without interruption.`
    };
  } else if (destLower.includes("paris") || destLower.includes("france")) {
    plan = createParisPlan(preferences);
  } else if (destLower.includes("rome") || destLower.includes("italy") || destLower.includes("roma")) {
    plan = createRomePlan(preferences);
  } else if (destLower.includes("barcelona") || destLower.includes("spain")) {
    plan = createBarcelonaPlan(preferences);
  } else if (destLower.includes("new york") || destLower.includes("nyc") || destLower.includes("manhattan")) {
    plan = createNycPlan(preferences);
  } else if (destLower.includes("kyoto")) {
    plan = createKyotoPlan(preferences);
  } else if (destLower.includes("london") || destLower.includes("uk") || destLower.includes("england")) {
    plan = createLondonPlan(preferences);
  } else {
    plan = createGenericCustomPlan(preferences);
  }
  if (plan && plan.days) {
    const avoidKeywords = (preferences.avoidInterests || []).map((a) => a.toLowerCase());
    const mustHaveKeywords = (preferences.mustHaveInterests || []).map((m) => m.toLowerCase());
    plan.days.forEach((d) => {
      d.schedule = d.schedule.filter((item) => {
        const text = `${item.title} ${item.description} ${item.category}`.toLowerCase();
        for (const avoid of avoidKeywords) {
          if (avoid.includes("sport") && (text.includes("stadium") || text.includes("arena") || text.includes("match") || text.includes("game"))) {
            return false;
          }
          if (avoid.includes("nightlife") && (text.includes("club") || text.includes("dj") || text.includes("dance floor"))) {
            return false;
          }
        }
        return true;
      });
      d.schedule.forEach((item, idx) => {
        const text = `${item.title} ${item.description}`.toLowerCase();
        const isMustHaveMatch = mustHaveKeywords.some((kw) => {
          const words = kw.split(" ").filter((w) => w.length > 3);
          return words.some((w) => text.includes(w));
        });
        if (isMustHaveMatch && !item.tips.includes("\u2B50")) {
          item.tips = `\u2B50 Must-Have Match: ${item.tips}`;
        }
        item.coordinates = resolvePlaceCoordinates(item, plan.destination, idx);
        const photo = getLandmarkPhoto(item, plan.destination);
        item.imageUrl = photo.url;
        item.photoCaption = photo.caption;
        item.photoSource = photo.source;
        item.photoSourceType = photo.sourceType;
        item.officialWebsiteUrl = photo.officialWebsiteUrl;
        item.tripAdvisorUrl = photo.tripAdvisorUrl;
        item.photos = photo.photos;
        item.alternativePhotos = photo.alternativePhotos;
      });
    });
  }
  if (preferences.startDate) {
    plan.startDate = preferences.startDate;
  }
  if (preferences.endDate) {
    plan.endDate = preferences.endDate;
  }
  if (preferences.homeBase) {
    plan.homeBase = preferences.homeBase;
  }
  if (preferences.homeBaseCoords) {
    plan.homeBaseCoords = preferences.homeBaseCoords;
  }
  if (preferences.morningDepartureTime) {
    plan.morningDepartureTime = preferences.morningDepartureTime;
  }
  if (preferences.eveningReturnTime) {
    plan.eveningReturnTime = preferences.eveningReturnTime;
  }
  if (preferences.homeBase && plan.days) {
    plan.days.forEach((d) => {
      if (d.schedule && d.schedule.length > 0) {
        const first = d.schedule[0];
        if (preferences.morningDepartureTime) {
          first.time = preferences.morningDepartureTime;
        }
        if (!first.description.includes(preferences.homeBase)) {
          first.description = `[Depart from ${preferences.homeBase}] ${first.description}`;
        }
        const last = d.schedule[d.schedule.length - 1];
        const eveningTime = preferences.eveningReturnTime || "10:00 PM";
        if (!last.title.toLowerCase().includes("return") && !last.title.toLowerCase().includes("hotel") && !last.title.toLowerCase().includes("home base")) {
          d.schedule.push({
            id: `${d.dayNumber}-return-home`,
            time: eveningTime,
            timeSlot: "evening",
            title: `Return to ${preferences.homeBase}`,
            category: "transport",
            description: `Transit buffer from final evening stop back to ${preferences.homeBase}. Walk through your hotel door right on schedule!`,
            location: preferences.homeBase,
            duration: "30-45 mins",
            costEstimate: "Local metro / walking",
            tips: `Safe and convenient transit back to your home base (${preferences.homeBase}).`,
            coordinates: preferences.homeBaseCoords || first.coordinates
          });
        }
      }
    });
  }
  return plan;
}
function createParisPlan(pref) {
  const days = [
    {
      dayNumber: 1,
      title: "Day 1: Historic Heart, The Louvre & Seine River Twilight",
      summary: "Wander through the iconic glass pyramid of the Louvre, stroll royal Tuileries gardens, sip espresso at Saint-Germain, and cruise the Seine at sunset.",
      schedule: [
        {
          id: "paris-d1-1",
          time: "08:30 AM",
          timeSlot: "morning",
          title: "Fresh Croissants & Cafe Creme at Cafe de Flore",
          category: "food",
          description: "Historic literary cafe in Saint-Germain-des-Pres where Picasso, Sartre, and Hemingway once conversed.",
          location: "172 Boulevard Saint-Germain, 75006 Paris",
          duration: "50 mins",
          costEstimate: "\u20AC14 - \u20AC20",
          tips: "Sit on the terrace for prime people-watching; try the hot chocolate chaud a l'ancienne.",
          coordinates: { lat: 48.8542, lng: 2.3331 },
          foodDetail: {
            mealType: "breakfast",
            cuisine: "Classic Parisian Cafe",
            recommendedDishes: ["Croissant au beurre", "Pain au chocolat", "Chocolat special Flore"],
            priceRange: "$$$",
            reservationNeeded: false
          }
        },
        {
          id: "paris-d1-2",
          time: "09:30 AM",
          timeSlot: "morning",
          title: "Metro Line 4 to Pont Neuf & Walk along the Seine",
          category: "transport",
          description: "Cross the historic Pont Neuf onto the Ile de la Cite, browsing green bouquinistes bookseller boxes.",
          location: "Saint-Germain to Pont Neuf",
          duration: "20 mins",
          costEstimate: "\u20AC2.15 (Metro ticket)",
          tips: "Tap with Navigo Easy or contactless phone wallet.",
          transportDetail: {
            mode: "subway",
            route: "Line 4 to Saint-Michel + walk",
            duration: "20 mins",
            cost: "\u20AC2.15"
          }
        },
        {
          id: "paris-d1-3",
          time: "10:00 AM",
          timeSlot: "morning",
          title: "Masterpieces of the Musee du Louvre",
          category: "place",
          description: "Explore the world's largest museum, viewing the Mona Lisa, Venus de Milo, and the Winged Victory of Samothrace.",
          location: "Rue de Rivoli, 75001 Paris",
          duration: "3 hours",
          costEstimate: "\u20AC22 per ticket",
          tips: "Pre-book a timed-entry slot; enter via the underground Carrousel entrance to avoid exterior pyramid lines.",
          coordinates: { lat: 48.8606, lng: 2.3376 }
        },
        {
          id: "paris-d1-4",
          time: "01:15 PM",
          timeSlot: "afternoon",
          title: "Traditional Bistro Lunch at Le Fumoir",
          category: "food",
          description: "Elegant Parisian bistro and library cocktail bar facing the colonnade of the Louvre.",
          location: "6 Rue de l'Amiral de Coligny, 75001 Paris",
          duration: "1.5 hours",
          costEstimate: "\u20AC32 - \u20AC48",
          tips: "Order the daily market menu for exceptional seasonal value.",
          coordinates: { lat: 48.8598, lng: 2.3411 },
          foodDetail: {
            mealType: "lunch",
            cuisine: "Modern French Bistro",
            recommendedDishes: ["Duck confit with crushed potato", "Steak tartare", "Tarte tatin"],
            priceRange: "$$",
            reservationNeeded: true
          }
        },
        {
          id: "paris-d1-5",
          time: "03:00 PM",
          timeSlot: "afternoon",
          title: "Tuileries Gardens & Place de la Concorde",
          category: "activity",
          description: "Stroll along gravel paths, relax by green fountain chairs, and enjoy views stretching down the Champs-Elysees.",
          location: "Place de la Concorde, 75001 Paris",
          duration: "1.5 hours",
          costEstimate: "Free",
          tips: "Stop by Angelina on Rue de Rivoli for an iconic mont-blanc chestnut pastry if you crave an afternoon sweet."
        },
        {
          id: "paris-d1-6",
          time: "05:30 PM",
          timeSlot: "evening",
          title: "Bateaux-Mouches Sunset Cruise on the Seine",
          category: "activity",
          description: "One-hour scenic boat tour illuminating Notre-Dame, the Conciergerie, the Musee d'Orsay, and the Eiffel Tower.",
          location: "Port de la Bourdonnais, 75007 Paris",
          duration: "1 hour",
          costEstimate: "\u20AC16 per person",
          tips: "Time the cruise right before dusk so the Eiffel Tower begins its glittering hourly light show.",
          coordinates: { lat: 48.8617, lng: 2.2982 }
        },
        {
          id: "paris-d1-7",
          time: "07:30 PM",
          timeSlot: "night",
          title: "Cozy Dinner at Chez Janou in Le Marais",
          category: "food",
          description: "Bustling Provencal bistro renowned for its herb-roasted meats and bottomless chocolate mousse served in an enormous ceramic bowl.",
          location: "2 Rue Roger Verlomme, 75003 Paris",
          duration: "2 hours",
          costEstimate: "\u20AC35 - \u20AC50 per person",
          tips: "Arrive right as dinner service opens or reserve days ahead; save room for the famous unlimited chocolate mousse.",
          coordinates: { lat: 48.8559, lng: 2.3668 },
          foodDetail: {
            mealType: "dinner",
            cuisine: "Provencal French",
            recommendedDishes: ["Ratatouille with goat cheese", "Confit lamb shanks", "Ceramic Bowl Chocolate Mousse"],
            priceRange: "$$",
            reservationNeeded: true
          }
        }
      ]
    },
    {
      dayNumber: 2,
      title: "Day 2: Bohemian Montmartre & The Eiffel Tower Summit",
      summary: "Ascend the cobbled hills of Montmartre, admire the Sacre-Coeur panorama, browse artists at Place du Tertre, and ascend the Eiffel Tower.",
      schedule: [
        {
          id: "paris-d2-1",
          time: "09:00 AM",
          timeSlot: "morning",
          title: "Pastries & Espresso at Le Grenier a Pain",
          category: "food",
          description: "Award-winning boulangerie on Rue des Abbesses, multiple-time winner of the Best Baguette in Paris.",
          location: "38 Rue des Abbesses, 75018 Paris",
          duration: "40 mins",
          costEstimate: "\u20AC6 - \u20AC10",
          tips: "Pick up a fresh warm traditional baguette and almond croissant.",
          foodDetail: {
            mealType: "breakfast",
            cuisine: "Artisanal French Bakery",
            recommendedDishes: ["Traditional Baguette", "Almond Croissant", "Quiche Lorraine"],
            priceRange: "$",
            reservationNeeded: false
          }
        },
        {
          id: "paris-d2-2",
          time: "10:00 AM",
          timeSlot: "morning",
          title: "Sacre-Coeur Basilica & Place du Tertre",
          category: "place",
          description: "Marvel at the domed white basilica perched at Paris's highest natural elevation and watch open-air painters.",
          location: "35 Rue du Chevalier de la Barre, 75018 Paris",
          duration: "2 hours",
          costEstimate: "Free entry to basilica / \u20AC7 for dome stairs",
          tips: "Take the stairs through Square Louise Michel for stunning cityscape photography.",
          coordinates: { lat: 48.8867, lng: 2.3431 }
        },
        {
          id: "paris-d2-3",
          time: "12:30 PM",
          timeSlot: "afternoon",
          title: "Bistro Lunch at Le Consulat Montmartre",
          category: "food",
          description: "One of Montmartre's oldest and most photogenic bistros, frequented by Monet, Sisley, and Van Gogh.",
          location: "18 Rue Norvins, 75018 Paris",
          duration: "1 hour",
          costEstimate: "\u20AC25 - \u20AC38",
          tips: "Enjoy traditional French onion soup and escargots.",
          coordinates: { lat: 48.8863, lng: 2.3403 },
          foodDetail: {
            mealType: "lunch",
            cuisine: "Classic French",
            recommendedDishes: ["French Onion Soup Gratin", "Boeuf Bourguignon", "Creme Brulee"],
            priceRange: "$$",
            reservationNeeded: false
          }
        },
        {
          id: "paris-d2-4",
          time: "02:15 PM",
          timeSlot: "afternoon",
          title: "Metro Line 2 & 6 to Trocadero",
          category: "transport",
          description: "Ride the elevated Line 6 across Pont de Bir-Hakeim with sweeping views of the Eiffel Tower.",
          location: "Anvers Station to Trocadero",
          duration: "30 mins",
          costEstimate: "\u20AC2.15",
          transportDetail: {
            mode: "subway",
            route: "Line 2 to Charles de Gaulle-Etoile, then Line 6 to Trocadero",
            duration: "30 mins",
            cost: "\u20AC2.15"
          }
        },
        {
          id: "paris-d2-5",
          time: "03:00 PM",
          timeSlot: "afternoon",
          title: "Eiffel Tower Ascent & Champ de Mars",
          category: "place",
          description: "Ascend the iron lady for 360-degree views across the Seine basin, followed by a relaxing rest on the Champ de Mars lawn.",
          location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
          duration: "2.5 hours",
          costEstimate: "\u20AC29 summit elevator ticket",
          tips: "Book summit tickets 60 days ahead; evening sunset slots offer golden hour light.",
          coordinates: { lat: 48.8584, lng: 2.2945 }
        },
        {
          id: "paris-d2-6",
          time: "07:30 PM",
          timeSlot: "night",
          title: "Dinner & Natural Wine at Le Baratin",
          category: "food",
          description: "Pioneering neo-bistro celebrated by renowned international chefs for honest, market-driven French cooking.",
          location: "3 Rue Jouye-Rouve, 75020 Paris",
          duration: "2 hours",
          costEstimate: "\u20AC45 - \u20AC65",
          tips: "Pair with exceptional organic and low-intervention French wines.",
          foodDetail: {
            mealType: "dinner",
            cuisine: "Modern Neo-Bistro",
            recommendedDishes: ["Braised veal sweetbreads", "Roasted turbot in butter", "Warm chocolate tart"],
            priceRange: "$$$",
            reservationNeeded: true
          }
        }
      ]
    },
    {
      dayNumber: 3,
      title: "Day 3: Gothic Sainte-Chapelle, Le Marais Boutiques & Saint-Germain",
      summary: "Gaze at jaw-dropping 13th-century stained glass, indulge in world-class falafel in the Jewish Quarter, and stroll art galleries.",
      schedule: [
        {
          id: "paris-d3-1",
          time: "09:00 AM",
          timeSlot: "morning",
          title: "Sainte-Chapelle Radiance & Conciergerie",
          category: "place",
          description: "Stand inside the upper royal chapel enveloped by fifteen 15-meter-high stained-glass panels depicting 1,113 biblical figures.",
          location: "10 Boulevard du Palais, 75001 Paris",
          duration: "1.5 hours",
          costEstimate: "\u20AC13 ticket",
          tips: "Morning sunlight through the south-facing rose window creates an ethereal purple and amber glow.",
          coordinates: { lat: 48.8554, lng: 2.345 }
        },
        {
          id: "paris-d3-2",
          time: "10:45 AM",
          timeSlot: "morning",
          title: "Shakespeare and Company Historic Bookstore",
          category: "activity",
          description: "Browse floor-to-ceiling book stacks and antique pianos at the iconic Left Bank literary landmark.",
          location: "37 Rue de la Bucherie, 75005 Paris",
          duration: "1 hour",
          costEstimate: "Free entry",
          tips: "Have your purchased books stamped with the official Shakespeare and Company seal at the register."
        },
        {
          id: "paris-d3-3",
          time: "12:30 PM",
          timeSlot: "afternoon",
          title: "L'As du Fallafel on Rue des Rosiers",
          category: "food",
          description: "Legendary counter in the Marais serving the undisputed best falafel pita in Europe, loaded with fried eggplant and tahini.",
          location: "34 Rue des Rosiers, 75004 Paris",
          duration: "45 mins",
          costEstimate: "\u20AC9 - \u20AC14",
          tips: "Join the takeout line for faster service and eat on a park bench in nearby Place des Vosges.",
          coordinates: { lat: 48.8575, lng: 2.3592 },
          foodDetail: {
            mealType: "lunch",
            cuisine: "Middle Eastern & Jewish Deli",
            recommendedDishes: ["Falafel Special Pita", "Shawarma Plate", "Fresh Mint Lemonade"],
            priceRange: "$",
            reservationNeeded: false
          }
        },
        {
          id: "paris-d3-4",
          time: "02:00 PM",
          timeSlot: "afternoon",
          title: "Place des Vosges & Victor Hugo Maison",
          category: "place",
          description: "Paris's oldest planned square, framed by symmetric red brick arcades and tranquil lime trees.",
          location: "Place des Vosges, 75004 Paris",
          duration: "1.5 hours",
          costEstimate: "Free square / Free museum permanent collection",
          tips: "Duck under the vaulted arches to discover contemporary art galleries and jewelry ateliers."
        },
        {
          id: "paris-d3-5",
          time: "04:30 PM",
          timeSlot: "evening",
          title: "Musee de l'Orangerie Water Lilies",
          category: "place",
          description: "Immersion inside the two purpose-built oval rooms housing Claude Monet's monumental Nympheas (Water Lilies).",
          location: "Jardin des Tuileries, 75001 Paris",
          duration: "1.5 hours",
          costEstimate: "\u20AC12.50",
          tips: "The quiet oval galleries offer one of the most serene artistic moments in Paris."
        },
        {
          id: "paris-d3-6",
          time: "07:30 PM",
          timeSlot: "night",
          title: "Celebration Dinner at Le Train Bleu",
          category: "food",
          description: "Gilded Belle Epoque palace restaurant inside Gare de Lyon with soaring painted ceilings, chandeliers, and tableside carving.",
          location: "Gare de Lyon, Place Louis-Armand, 75012 Paris",
          duration: "2 hours",
          costEstimate: "\u20AC65 - \u20AC95 per person",
          tips: "Order the tableside-carved roasted leg of lamb and baba au rhum.",
          coordinates: { lat: 48.8449, lng: 2.3735 },
          foodDetail: {
            mealType: "dinner",
            cuisine: "Grand French Classic",
            recommendedDishes: ["Gigot d'Agneau roti (Roast Lamb)", "Foie gras maison", "Rum Baba"],
            priceRange: "$$$",
            reservationNeeded: true
          }
        }
      ]
    }
  ];
  const duration = pref.durationDays || 3;
  const slicedDays = days.slice(0, Math.min(duration, days.length));
  while (slicedDays.length < duration) {
    const dayNum = slicedDays.length + 1;
    slicedDays.push({
      dayNumber: dayNum,
      title: `Day ${dayNum}: Versailles Royal Chateaux or Saint-Ouen Flea Market`,
      summary: "Take the RER C express train to explore the opulent Hall of Mirrors at Versailles, or uncover vintage treasures in Parisian antiquities markets.",
      schedule: [
        {
          id: `paris-d${dayNum}-1`,
          time: "09:00 AM",
          timeSlot: "morning",
          title: "Express RER C Train to Versailles Chateau",
          category: "transport",
          description: "Direct 35-minute regional train from central Paris right to Versailles Chateau Rive Gauche.",
          location: "Champ de Mars to Versailles",
          duration: "40 mins",
          costEstimate: "\u20AC4.15",
          transportDetail: {
            mode: "train",
            route: "RER C Versailles Rive Gauche",
            duration: "40 mins",
            cost: "\u20AC4.15"
          }
        },
        {
          id: `paris-d${dayNum}-2`,
          time: "10:00 AM",
          timeSlot: "morning",
          title: "Palace of Versailles & Hall of Mirrors",
          category: "place",
          description: "Walk the golden halls of Louis XIV, the King's State Apartments, and magnificent baroque architecture.",
          location: "Place d'Armes, 78000 Versailles",
          duration: "2.5 hours",
          costEstimate: "\u20AC21 entry",
          tips: "Arrive at 09:30 AM to clear passport and bag security before tour groups."
        },
        {
          id: `paris-d${dayNum}-3`,
          time: "01:00 PM",
          timeSlot: "afternoon",
          title: "Garden Lunch at La Petite Venise",
          category: "food",
          description: "Charming restaurant nestled in the former royal stables by the Grand Canal of Versailles.",
          location: "Parc du Chateau de Versailles",
          duration: "1.5 hours",
          costEstimate: "\u20AC28 - \u20AC40",
          foodDetail: {
            mealType: "lunch",
            cuisine: "Franco-Italian Garden Bistro",
            recommendedDishes: ["Truffle Tagliolini", "Burrata Pugliese", "Panna Cotta"],
            priceRange: "$$",
            reservationNeeded: true
          }
        },
        {
          id: `paris-d${dayNum}-4`,
          time: "03:00 PM",
          timeSlot: "afternoon",
          title: "Rent a Rowboat on the Grand Canal",
          category: "activity",
          description: "Row across the royal cross-shaped canal reflecting the chateau facade in peaceful waters.",
          location: "Grand Canal, Versailles",
          duration: "1 hour",
          costEstimate: "\u20AC14 per boat",
          tips: "Rentals are available on a walk-up basis at the canal dock."
        },
        {
          id: `paris-d${dayNum}-5`,
          time: "07:30 PM",
          timeSlot: "night",
          title: "Dinner in Belleville at Le Chateaubriand",
          category: "food",
          description: "Dynamic Parisian tasting menu celebrating avant-garde bistro gastronomy.",
          location: "129 Avenue Parmentier, 75011 Paris",
          duration: "2 hours",
          costEstimate: "\u20AC60 - \u20AC85",
          foodDetail: {
            mealType: "dinner",
            cuisine: "Modern Tasting Menu",
            recommendedDishes: ["Chef's Daily 5-course Tasting", "Natural Wine Pairings"],
            priceRange: "$$$",
            reservationNeeded: true
          }
        }
      ]
    });
  }
  return {
    destination: pref.destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `An authentic, deeply curated ${duration}-day journey through Paris, France. Designed for ${pref.travelerType || "travelers"}, this plan brings together world-renowned landmarks like the Louvre and Eiffel Tower with intimate neighborhood bistros in Le Marais, morning bakery traditions, scenic Seine river cruising, and seamless Metro navigation.`,
    weatherSummary: "Mild European climate. Highs around 17\xB0C\u201322\xB0C with occasional light afternoon showers. A stylish trench coat, light scarf, and broken-in walking shoes are essential.",
    currencyAndCostEstimate: {
      currency: "EUR (\u20AC Euro, approx \u20AC1 = $1.08 USD)",
      estimatedTotalPerPerson: pref.budget === "Luxury" ? "$950 - $1,400 USD" : pref.budget === "Budget" ? "$280 - $420 USD" : "$480 - $680 USD",
      breakdown: "Daily food: \u20AC45\u2013\u20AC75, Metro transit: \u20AC6\u2013\u20AC8, Museum & cruise entries: \u20AC35\u2013\u20AC50 per person"
    },
    transportationGuide: {
      overview: "Paris features one of the dense subway networks in the world. The RATP Metro and RER lines get you anywhere in central Paris within 15\u201325 minutes.",
      recommendedPasses: "Navigo Easy card (charge 10 T+ tickets for \u20AC17.35) or use Apple Wallet / Android NFC directly at the turnstiles.",
      metroBusTips: "Always retain your metro ticket until exiting the station, as transit inspectors periodically verify tickets near transfer hallways.",
      airportTransfer: "RER B direct train from Charles de Gaulle (CDG) to Chatelet/Gare du Nord (\u20AC11.80) or official fixed-fare taxis (\u20AC56 Right Bank / \u20AC65 Left Bank).",
      rideSharing: "Uber, Bolt, and FreeNow operate reliably throughout Paris. Traditional G7 taxis can also be hailed with green rooftop lights."
    },
    packingAndPrepTips: [
      "Comfortable waterproof walking shoes (Parisian cobblestones will test lightweight sneakers).",
      "Compact umbrella and light layering (cashmere sweater or light trench).",
      "Type C/E European plug adapter for charging devices.",
      "Pre-booked timed tickets for the Louvre and Eiffel Tower (essential to avoid 2-hour queues)."
    ],
    days: slicedDays,
    sources: [
      { title: "RATP Official Paris Metro & Bus Network Map", url: "https://www.ratp.fr/en" },
      { title: "Paris Convention and Visitors Bureau Official Guide", url: "https://en.parisinfo.com/" },
      { title: "Louvre Museum Official Ticketing & Hours", url: "https://www.louvre.fr/en" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Paris itinerary so you can continue testing, planning, and exporting your trip!`
  };
}
function createRomePlan(pref) {
  const duration = pref.durationDays || 3;
  return {
    destination: pref.destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `An immersive ${duration}-day journey through Rome, Italy. Step into 2,000 years of living history across the Colosseum, Roman Forum, and Vatican City, interspersed with authentic Roman trattorias serving cacio e pepe and carbonara in bohemian Trastevere.`,
    weatherSummary: "Mediterranean warmth, averaging 20\xB0C\u201326\xB0C with abundant sunshine. Sunglasses, sun hat, and comfortable footwear for ancient cobblestones are strongly advised.",
    currencyAndCostEstimate: {
      currency: "EUR (\u20AC Euro, approx \u20AC1 = $1.08 USD)",
      estimatedTotalPerPerson: "$420 - $650 USD (excluding flights/hotel)",
      breakdown: "Daily dining & gelato: \u20AC35\u2013\u20AC55, Transit: \u20AC4\u2013\u20AC8, Archaeological sites: \u20AC30\u2013\u20AC45"
    },
    transportationGuide: {
      overview: "Rome's historic center is delightfully walkable. The ATAC Metro (Lines A & B) and vintage trams connect outer neighborhoods and railway hubs.",
      recommendedPasses: "Roma Pass 72-Hour (\u20AC52) includes unlimited public transit and free entry to the Colosseum.",
      metroBusTips: "Tap contactless credit/debit cards at yellow Metro turnstiles. Rome's public water fountains (nasoni) offer ice-cold drinking water everywhere.",
      airportTransfer: "Leonardo Express non-stop train connects Fiumicino Airport (FCO) directly to Roma Termini in 32 minutes (\u20AC14).",
      rideSharing: "Uber Black and FreeNow taxi app operate smoothly. Traditional white city taxis are available at marked taxi stands."
    },
    packingAndPrepTips: [
      "Shoulder and knee covering attire (modest dress is strictly required to enter the Vatican and basilicas).",
      "Reusable water bottle (refill free at thousands of historic cast-iron 'nasoni' fountains).",
      "Sturdy cushioned walking shoes (ancient Roman basalt cobblestones require ankle support).",
      "Small Euro coins for espresso counters and public restrooms."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Day 1: Ancient Rome, The Colosseum & Evening Pasta in Trastevere",
        summary: "Trace the footsteps of gladiators at the Colosseum, walk the triumphal arches of the Forum, and cross the Tiber River for candlelit handmade pasta.",
        schedule: [
          {
            id: "rome-d1-1",
            time: "08:30 AM",
            timeSlot: "morning",
            title: "Espresso & Maritozzo at Roscioli Caffe",
            category: "food",
            description: "Beloved Roman pastry bar famous for traditional maritozzo buns overflowing with fresh whipped cream.",
            location: "Piazza Benedetto Cairoli 16, 00186 Roma",
            duration: "45 mins",
            costEstimate: "\u20AC5 - \u20AC8",
            tips: "Drink your espresso standing at the zinc counter like a true Roman.",
            coordinates: { lat: 41.8941, lng: 12.4744 },
            foodDetail: {
              mealType: "breakfast",
              cuisine: "Roman Caffe & Pasticceria",
              recommendedDishes: ["Traditional Roman Maritozzo con Panna", "Doppio Espresso"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "rome-d1-2",
            time: "09:30 AM",
            timeSlot: "morning",
            title: "Colosseum Arena Floor & Underground Tour",
            category: "place",
            description: "Enter through the Gladiator Gate directly onto the reconstructed arena floor where spectacles took place.",
            location: "Piazza del Colosseo 1, 00184 Roma",
            duration: "2.5 hours",
            costEstimate: "\u20AC24 - \u20AC32",
            tips: "Reserve tickets 30 days in advance via official ticketing; bring photo ID matching reservation names.",
            coordinates: { lat: 41.8902, lng: 12.4922 }
          },
          {
            id: "rome-d1-3",
            time: "12:30 PM",
            timeSlot: "afternoon",
            title: "Roman Forum & Palatine Hill Panorama",
            category: "place",
            description: "Wander the ruins of Senate houses, the Temple of Saturn, and the royal emperor palaces overlooking the Circus Maximus.",
            location: "Via della Salara Vecchia 5/6, 00186 Roma",
            duration: "2 hours",
            costEstimate: "Included with Colosseum ticket",
            tips: "Climb the Farnese Gardens terrace on Palatine Hill for panoramic photos of the Forum.",
            coordinates: { lat: 41.8925, lng: 12.4853 }
          },
          {
            id: "rome-d1-4",
            time: "02:45 PM",
            timeSlot: "afternoon",
            title: "Artisanal Gelato at Giolitti",
            category: "food",
            description: "Rome's oldest and most iconic gelateria, serving classic flavors since 1900 near the Pantheon.",
            location: "Via Uffici del Vicario 40, 00186 Roma",
            duration: "30 mins",
            costEstimate: "\u20AC3.50 - \u20AC5",
            tips: "Pay at the cashier register first, then present your ticket slip to the gelato master.",
            foodDetail: {
              mealType: "snack",
              cuisine: "Artisanal Italian Gelato",
              recommendedDishes: ["Pistachio di Bronte", "Zabaione", "Stracciatella"],
              priceRange: "$",
              reservationNeeded: false
            }
          },
          {
            id: "rome-d1-5",
            time: "04:30 PM",
            timeSlot: "evening",
            title: "Piazza Navona & Bernini's Fountain of the Four Rivers",
            category: "activity",
            description: "Stroll along the historic baroque oval stadium, watching street musicians and portrait artists.",
            location: "Piazza Navona, 00186 Roma",
            duration: "1.5 hours",
            costEstimate: "Free",
            tips: "Admire Bernini's dramatic marble sculptures depicting the Danube, Ganges, Nile, and Rio de la Plata."
          },
          {
            id: "rome-d1-6",
            time: "07:30 PM",
            timeSlot: "night",
            title: "Dinner at Da Enzo al 29 in Trastevere",
            category: "food",
            description: "Legendary family trattoria renowned for serving Rome's best Carbonara, Cacio e Pepe, and crispy carciofi alla giudia.",
            location: "Via dei Vascellari 29, 00153 Roma",
            duration: "2 hours",
            costEstimate: "\u20AC28 - \u20AC42 per person",
            tips: "Line up 20 minutes before opening at 07:15 PM; order the fried Jewish-style artichoke starter.",
            coordinates: { lat: 41.8885, lng: 12.4789 },
            foodDetail: {
              mealType: "dinner",
              cuisine: "Traditional Roman Osteria",
              recommendedDishes: ["Rigatoni alla Carbonara", "Tonnarelli Cacio e Pepe", "Carciofo alla Giudia"],
              priceRange: "$$",
              reservationNeeded: false
            }
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Day 2: Vatican City, Sistine Chapel & St. Peter's Dome",
        summary: "Stand beneath Michelangelo's Sistine Chapel ceiling, explore St. Peter's Basilica, and enjoy panoramic views from Castel Sant'Angelo.",
        schedule: [
          {
            id: "rome-d2-1",
            time: "08:30 AM",
            timeSlot: "morning",
            title: "Early Morning Tour of the Vatican Museums",
            category: "place",
            description: "Marvel at the Gallery of Maps, Raphael's Rooms, and the breathtaking Sistine Chapel ceiling.",
            location: "Viale Vaticano, 00165 Roma",
            duration: "3 hours",
            costEstimate: "\u20AC20 ticket + \u20AC5 reservation",
            tips: "Strict dress code: shoulders and knees must be covered. Silence is observed inside the Sistine Chapel.",
            coordinates: { lat: 41.9065, lng: 12.4536 }
          },
          {
            id: "rome-d2-2",
            time: "11:45 AM",
            timeSlot: "morning",
            title: "St. Peter's Basilica & Climb Michelangelo's Cupola",
            category: "place",
            description: "Admire Michelangelo's Pieta, Bernini's bronze Baldachin, and climb 551 steps for vistas of St. Peter's Square.",
            location: "Piazza San Pietro, 00120 Citta del Vaticano",
            duration: "2 hours",
            costEstimate: "Free church entry / \u20AC10 dome elevator",
            tips: "The view over the keyhole-shaped square from the top of the dome is unforgettable.",
            coordinates: { lat: 41.9022, lng: 12.4539 }
          },
          {
            id: "rome-d2-3",
            time: "02:00 PM",
            timeSlot: "afternoon",
            title: "Pizza al Taglio Lunch at Bonci Pizzarium",
            category: "food",
            description: "Gabriele Bonci's temple of Roman sheet pizza made with 72-hour slow-fermented heritage wheat dough.",
            location: "Via della Meloria 43, 00136 Roma",
            duration: "1 hour",
            costEstimate: "\u20AC10 - \u20AC18",
            tips: "Point to how large a slice you want; it is cut with scissors and weighed.",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Artisanal Roman Pizza al Taglio",
              recommendedDishes: ["Potato & Mozzarella", "Mortadella & Ricotta", "Spicy Salami"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "rome-d2-4",
            time: "04:00 PM",
            timeSlot: "afternoon",
            title: "Castel Sant'Angelo & Angel Bridge",
            category: "activity",
            description: "Emperor Hadrian's circular fortress and papal refuge offering grand views over the River Tiber.",
            location: "Lungotevere Castello 50, 00193 Roma",
            duration: "1.5 hours",
            costEstimate: "\u20AC14",
            tips: "Walk across Ponte Sant'Angelo lined with Bernini's ten marble angels."
          },
          {
            id: "rome-d2-5",
            time: "07:30 PM",
            timeSlot: "night",
            title: "Sunset Aperitivo & Dinner at Salotto 42",
            category: "food",
            description: "Book bar and cocktail lounge set against the ancient columns of the Temple of Hadrian in Piazza di Pietra.",
            location: "Piazza di Pietra 42, 00186 Roma",
            duration: "2 hours",
            costEstimate: "\u20AC30 - \u20AC45",
            tips: "Sip an Aperol Spritz or Negroni while gazing at illuminated 2nd-century Corinthian columns.",
            foodDetail: {
              mealType: "dinner",
              cuisine: "Italian Aperitivo & Small Plates",
              recommendedDishes: ["Aperol Spritz", "Bruschetta Board", "Artisanal Salumi & Cheeses"],
              priceRange: "$$",
              reservationNeeded: true
            }
          }
        ]
      }
    ],
    sources: [
      { title: "Turismo Roma Official Capital Tourism Portal", url: "https://www.turismoroma.it/en" },
      { title: "Parco Archeologico del Colosseo Ticketing", url: "https://parcocolosseo.it/en/" },
      { title: "Vatican Museums Official Information", url: "https://www.museivaticani.va" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Rome itinerary so you can continue your travel planning smoothly!`
  };
}
function createBarcelonaPlan(pref) {
  const duration = pref.durationDays || 3;
  return {
    destination: pref.destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `A vibrant ${duration}-day Catalan adventure through Barcelona, Spain. Experience Antoni Gaudi's architectural dreams including the Sagrada Familia and Park Guell, wander Gothic alleyways, indulge in fresh tapas and seafood paella, and soak in Mediterranean coastlines.`,
    weatherSummary: "Sunny coastal Mediterranean climate, 19\xB0C\u201325\xB0C. Comfortable espadrilles or walking shoes, sunscreen, and beach-ready casual wear are ideal.",
    currencyAndCostEstimate: {
      currency: "EUR (\u20AC Euro, approx \u20AC1 = $1.08 USD)",
      estimatedTotalPerPerson: "$380 - $550 USD (excluding flights/hotel)",
      breakdown: "Daily tapas & drinks: \u20AC30\u2013\u20AC50, Metro & transit: \u20AC5, Gaudi monuments: \u20AC30\u2013\u20AC45"
    },
    transportationGuide: {
      overview: "Barcelona features an immaculate, air-conditioned TMB Metro and bus grid. Moving between Gaudi sights and the seaside is fast and straightforward.",
      recommendedPasses: "T-Casual card (10 journeys across Zone 1 for ~\u20AC12.15) or Hola Barcelona Travel Card for unlimited rides.",
      metroBusTips: "Metro stations are clearly marked with a red diamond 'M'. Metro Line L3 and L4 connect directly to prime touristic districts.",
      airportTransfer: "Aerobus express shuttle connects Terminal 1 & 2 to Placa de Catalunya in 35 minutes (\u20AC7.25) or Metro Line L9 Sud.",
      rideSharing: "FreeNow, Cabify, and classic yellow-and-black city taxis are readily available."
    },
    packingAndPrepTips: [
      "Crossbody bag with secure zippers (Barcelona is safe, but be mindful of pickpocketing in crowded tourist zones).",
      "Swimsuit and microfiber towel for spontaneous dips at Barceloneta or Bogatell Beach.",
      "Pre-booked tickets for Sagrada Familia and Park Guell (mandatory online reservations).",
      "Comfortable flat walking shoes for cobblestone Gothic alleys."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Day 1: Gaudi's Masterpieces & Gothic Quarter Secrets",
        summary: "Be awestruck inside the Sagrada Familia's stone forest, wander whimsical Park Guell, and discover hidden tapas taverns in Barri Gotic.",
        schedule: [
          {
            id: "bcn-d1-1",
            time: "08:30 AM",
            timeSlot: "morning",
            title: "Churros con Chocolate at Granja M. Viader",
            category: "food",
            description: "Historic dairy cafe founded in 1870, the birthplace of Cacaolat, serving hot thick chocolate with freshly fried churros.",
            location: "Carrer d'en Xucla 4-6, 08001 Barcelona",
            duration: "45 mins",
            costEstimate: "\u20AC5 - \u20AC8",
            tips: "Dip your warm churros deep into the thick, dark dipping chocolate.",
            foodDetail: {
              mealType: "breakfast",
              cuisine: "Traditional Catalan Churreria",
              recommendedDishes: ["Churros Artesanos", "Chocolate a la Taza", "Mel i Mato (Catalan honey cheese)"],
              priceRange: "$",
              reservationNeeded: false
            }
          },
          {
            id: "bcn-d1-2",
            time: "09:45 AM",
            timeSlot: "morning",
            title: "Bas\xEDlica de la Sagrada Fam\xEDlia & Towers",
            category: "place",
            description: "Step into Gaudi's living cathedral, illuminated by stained-glass windows in blues, greens, oranges, and fiery reds.",
            location: "Carrer de Mallorca 401, 08013 Barcelona",
            duration: "2.5 hours",
            costEstimate: "\u20AC26 ticket / \u20AC36 with Nativity tower ascent",
            tips: "Morning sun illuminates the eastern blue stained-glass windows; midday/afternoon shifts to warm red and amber.",
            coordinates: { lat: 41.4036, lng: 2.1744 }
          },
          {
            id: "bcn-d1-3",
            time: "01:00 PM",
            timeSlot: "afternoon",
            title: "Tapas Feast at Cerveceria Catalana",
            category: "food",
            description: "Consistently celebrated as one of Barcelona's premier tapas institutions, serving sizzling small plates at polished counters.",
            location: "Carrer de Mallorca 236, 08008 Barcelona",
            duration: "1.5 hours",
            costEstimate: "\u20AC25 - \u20AC38 per person",
            tips: "Ask for the daily seafood specials displayed fresh at the counter.",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Spanish Tapas & Pinchos",
              recommendedDishes: ["Huevos cabreados", "Patatas bravas", "Beef tenderloin with foie gras montadito"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "bcn-d1-4",
            time: "03:15 PM",
            timeSlot: "afternoon",
            title: "Park G\xFCell Whimsical Mosaic Terraces",
            category: "place",
            description: "Explore Gaudi's fairytale park featuring serpentine mosaic benches, gingerbread gatehouses, and the famous 'El Drac' salamander.",
            location: "08024 Barcelona",
            duration: "2 hours",
            costEstimate: "\u20AC10 entry",
            tips: "Arrive at your exact ticket time slot; sit on the undulating benches for panoramic views of Barcelona down to the sea.",
            coordinates: { lat: 41.4145, lng: 2.1527 }
          },
          {
            id: "bcn-d1-5",
            time: "07:30 PM",
            timeSlot: "night",
            title: "Wine & Vermouth Crawl in El Born",
            category: "food",
            description: "Sample artisanal red vermouth on tap, Manchego cheese, and Iberian ham along the historic Carrer de Montcada.",
            location: "El Born, 08003 Barcelona",
            duration: "2 hours",
            costEstimate: "\u20AC20 - \u20AC35",
            tips: "Pair vermut de la casa with local olives and boquerones en vinagre (marinated white anchovies).",
            foodDetail: {
              mealType: "dinner",
              cuisine: "Catalan Vermuteria & Pintxos",
              recommendedDishes: ["Vermut de la casa", "Jamon Iberico de Bellota", "Gilda skewers"],
              priceRange: "$$",
              reservationNeeded: false
            }
          }
        ]
      }
    ],
    sources: [
      { title: "Barcelona Turisme Official City Information", url: "https://www.barcelonaturisme.com" },
      { title: "Sagrada Familia Official Heritage Portal", url: "https://sagradafamilia.org/en/" },
      { title: "TMB Metropolitan Transit Authority", url: "https://www.tmb.cat/en" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Barcelona itinerary so you can continue your travel planning without interruption!`
  };
}
function createNycPlan(pref) {
  const duration = pref.durationDays || 3;
  return {
    destination: pref.destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `A thrilling ${duration}-day itinerary in New York City. From the towering heights of Top of the Rock and walking the historic Brooklyn Bridge to the lush High Line, authentic New York bagels, Broadway theater, and vibrant Greenwich Village jazz clubs.`,
    weatherSummary: "Four seasons. Expect pleasant walking weather around 18\xB0C\u201324\xB0C in spring/fall. Wear comfortable, supportive walking sneakers as you'll walk 15,000+ steps daily.",
    currencyAndCostEstimate: {
      currency: "USD ($ US Dollar)",
      estimatedTotalPerPerson: "$550 - $850 USD (excluding flights/hotel)",
      breakdown: "Daily dining & coffee: $50\u2013$80, Subway: $6\u2013$10, Observatories & Broadway: $70\u2013$140"
    },
    transportationGuide: {
      overview: "NYC's subway runs 24 hours a day, 7 days a week. It is by far the fastest way to travel between Manhattan, Brooklyn, and Queens.",
      recommendedPasses: "OMNY contactless tap-to-pay using Apple Pay, Google Pay, or contactless credit card. Automatically caps at $34 per 7 days.",
      metroBusTips: "Look for local vs. express trains (express trains skip stations marked by black circles on map). Always check weekend service advisories.",
      airportTransfer: "AirTrain + LIRR train from JFK to Grand Central or Penn Station (~$13.50); NJ Transit train from Newark Liberty (~$15.75).",
      rideSharing: "Yellow cabs can be flagged on avenues or hailed via the Curb app. Uber and Lyft are ubiquitous."
    },
    packingAndPrepTips: [
      "Sturdy, broken-in walking sneakers (essential for 8\u201312 miles of walking daily).",
      "External battery charger for phone navigation and photography.",
      "Cardholder/contactless phone payment (cash is rarely needed in NYC except street bagel carts).",
      "A light jacket for breezy observation decks and shaded avenue canyons."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Day 1: Midtown Icons, Central Park & Broadway Lights",
        summary: "Start with warm bagels, wander Central Park's Ramble, view Manhattan from Top of the Rock, and experience the dazzling lights of Times Square.",
        schedule: [
          {
            id: "nyc-d1-1",
            time: "08:30 AM",
            timeSlot: "morning",
            title: "Hand-Rolled Bagels at Ess-a-Bagel",
            category: "food",
            description: "NYC classic kettle-boiled, hand-rolled bagels topped with generous mounds of scallion cream cheese and nova lox.",
            location: "831 3rd Ave, New York, NY 10022",
            duration: "45 mins",
            costEstimate: "$10 - $18",
            tips: "Order an 'Everything bagel with scallion cream cheese and nova' for the definitive NYC breakfast.",
            foodDetail: {
              mealType: "breakfast",
              cuisine: "Traditional Jewish Bagel Deli",
              recommendedDishes: ["Everything Bagel with Nova Lox", "Scallion Cream Cheese", "Hot Drip Coffee"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "nyc-d1-2",
            time: "09:30 AM",
            timeSlot: "morning",
            title: "Central Park Stroll & Bethesda Terrace",
            category: "place",
            description: "Wander through the Mall's American Elm canopy, view Bethesda Fountain, and watch rowboats on the lake.",
            location: "Central Park, 72nd St Cross, New York, NY",
            duration: "2 hours",
            costEstimate: "Free",
            tips: "Walk across Bow Bridge for postcard views of the San Remo twin apartment towers reflected in the water.",
            coordinates: { lat: 40.7738, lng: -73.9708 }
          },
          {
            id: "nyc-d1-3",
            time: "12:00 PM",
            timeSlot: "afternoon",
            title: "Top of the Rock Observation Deck",
            category: "activity",
            description: "Ascend 70 floors to Rockefeller Plaza's open-air deck offering unobstructed views of the Empire State Building and Central Park.",
            location: "30 Rockefeller Plaza, New York, NY 10112",
            duration: "1.5 hours",
            costEstimate: "$40 per person",
            tips: "Top of the Rock offers superior views to the Empire State Building because you actually get to look AT the Empire State Building.",
            coordinates: { lat: 40.759, lng: -73.9793 }
          },
          {
            id: "nyc-d1-4",
            time: "01:45 PM",
            timeSlot: "afternoon",
            title: "Pastrami on Rye at 2nd Ave Deli or Joe's Pizza",
            category: "food",
            description: "Sink your teeth into a quintessential hot pastrami sandwich piled high on rye with brown mustard, or a crispy thin-crust cheese slice.",
            location: "Midtown Manhattan",
            duration: "1 hour",
            costEstimate: "$15 - $28",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Classic NYC Deli",
              recommendedDishes: ["Hot Pastrami on Rye", "Half-Sour Pickles", "Matzo Ball Soup"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "nyc-d1-5",
            time: "07:30 PM",
            timeSlot: "night",
            title: "Evening Broadway Show & Times Square Neon",
            category: "activity",
            description: "Catch an acclaimed world-class musical or dramatic play in the historic Theater District.",
            location: "Broadway / 42nd - 48th St, New York, NY",
            duration: "2.5 hours",
            costEstimate: "$65 - $150",
            tips: "Check the TKTS Booth in Father Duffy Square at 3:00 PM for 20\u201350% off same-day Broadway tickets."
          }
        ]
      }
    ],
    sources: [
      { title: "Official NYC Tourism & Convention Guide (NYC Tourism)", url: "https://www.nyctourism.com" },
      { title: "MTA New York City Transit Guide & Subway Maps", url: "https://new.mta.info" },
      { title: "Central Park Conservancy Official Visitor Guide", url: "https://www.centralparknyc.org" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete NYC itinerary so you can explore, plan, and export your trip seamlessly!`
  };
}
function createKyotoPlan(pref) {
  const duration = pref.durationDays || 3;
  return {
    destination: pref.destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `A serene ${duration}-day journey through Kyoto, the cultural soul of Japan. Walk through thousands of vermilion torii gates at Fushimi Inari, listen to the whispering bamboo of Arashiyama, explore tranquil Zen rock gardens, and taste refined multi-course Kaiseki cuisine.`,
    weatherSummary: "Temperate climate, 16\xB0C\u201322\xB0C in spring and autumn. Slip-on shoes and comfortable cotton socks are essential for temple wooden floors.",
    currencyAndCostEstimate: {
      currency: "JPY (Japanese Yen, approx \xA5150 = $1 USD)",
      estimatedTotalPerPerson: "$380 - $550 USD (excluding flights/hotel)",
      breakdown: "Daily dining & matcha: \xA55,000\u2013\xA58,000 (~$35\u2013$55), Bus & subway: \xA5800 (~$5.50), Temple admissions: \xA52,500 (~$17)"
    },
    transportationGuide: {
      overview: "Kyoto is well connected by city buses, the Karasuma and Tozai subway lines, and regional Keihan and Hankyu rail lines.",
      recommendedPasses: "ICOCA digital card or Kyoto Subway & Bus 1-Day Pass (\xA51,100).",
      metroBusTips: "On Kyoto city buses, board through the rear door and pay at the front upon disembarking.",
      airportTransfer: "JR Haruka Kansai Airport Express connects directly to Kyoto Station in 75 minutes.",
      rideSharing: "MK Taxi and GO taxi app operate throughout Kyoto."
    },
    packingAndPrepTips: [
      "Slip-on shoes and clean socks (you will remove shoes repeatedly at temples and traditional ryokans).",
      "Coin purse for temple entrance fees and fortune amulets (omikuji).",
      "Early alarms (visit Fushimi Inari and Arashiyama at 07:00\u201308:00 AM before tour bus crowds)."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Day 1: Fushimi Inari Shrine & Historic Gion Geisha District",
        summary: "Hike through 10,000 vermilion shrine gates, savor piping hot Kitsune Udon, and wander lantern-lit wooden machiya townhouses in Gion.",
        schedule: [
          {
            id: "kyoto-d1-1",
            time: "07:30 AM",
            timeSlot: "morning",
            title: "Early Morning Hike through Fushimi Inari-Taisha",
            category: "place",
            description: "Hike beneath thousands of tightly spaced torii gates winding up the sacred Mount Inari forest.",
            location: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto",
            duration: "2.5 hours",
            costEstimate: "Free entry",
            tips: "Arriving before 08:00 AM ensures peaceful photos without tour group crowds.",
            coordinates: { lat: 34.9671, lng: 135.7727 }
          },
          {
            id: "kyoto-d1-2",
            time: "11:00 AM",
            timeSlot: "morning",
            title: "Keihan Main Line from Fushimi-Inari to Gion-Shijo",
            category: "transport",
            description: "Direct 12-minute scenic train ride along the Kamo River into central Kyoto.",
            location: "Fushimi-Inari Station to Gion-Shijo",
            duration: "15 mins",
            costEstimate: "\xA5210",
            transportDetail: {
              mode: "train",
              route: "Keihan Main Line",
              duration: "12 mins",
              cost: "\xA5210"
            }
          },
          {
            id: "kyoto-d1-3",
            time: "11:45 AM",
            timeSlot: "afternoon",
            title: "Kitsune Udon Lunch at Gion Okaru",
            category: "food",
            description: "Warm, comforting dashi broth with sweet fried inari tofu and chewy udon noodles in an authentic wooden shop.",
            location: "Tomimagacho, Higashiyama Ward, Kyoto",
            duration: "1 hour",
            costEstimate: "\xA51,100 - \xA51,600 (~$8 - $11)",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Traditional Kyoto Udon",
              recommendedDishes: ["Kitsune Udon", "Cheese Curry Udon", "Kyoto Pickles"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "kyoto-d1-4",
            time: "01:30 PM",
            timeSlot: "afternoon",
            title: "Kiyomizu-dera Wooden Stage & Otowa Waterfall",
            category: "place",
            description: "Stand on the dramatic cantilevered wooden veranda built without a single nail, overlooking cherry and maple trees.",
            location: "1-294 Kiyomizu, Higashiyama Ward, Kyoto",
            duration: "2 hours",
            costEstimate: "\xA5400",
            tips: "Drink from one of the three streams of Otowa Waterfall for health, longevity, or success in studies.",
            coordinates: { lat: 34.9949, lng: 135.785 }
          },
          {
            id: "kyoto-d1-5",
            time: "06:30 PM",
            timeSlot: "night",
            title: "Lantern-lit Evening Stroll along Shirakawa Canal & Gion",
            category: "activity",
            description: "Wander along willow-lined stone footpaths beside traditional machiya teahouses where Geiko and Maiko hurry to evening banquets.",
            location: "Gion Shirakawa, Higashiyama Ward, Kyoto",
            duration: "1.5 hours",
            costEstimate: "Free",
            tips: "Maintain quiet respect and do not obstruct or touch working Geiko or Maiko."
          }
        ]
      }
    ],
    sources: [
      { title: "Kyoto City Official Travel Guide", url: "https://kyoto.travel/en/" },
      { title: "Japan National Tourism Organization Kyoto Portal", url: "https://www.japan.travel/en/destinations/kansai/kyoto/" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Kyoto itinerary so you can continue your travel planning smoothly!`
  };
}
function createLondonPlan(pref) {
  const duration = pref.durationDays || 3;
  return {
    destination: pref.destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `A rich ${duration}-day British adventure across London, UK. Marvel at Big Ben, the Tower of London, and Westminster Abbey, indulge in Borough Market delicacies, view masterpieces in world-class free museums, and experience West End theater.`,
    weatherSummary: "Variable maritime climate, 14\xB0C\u201320\xB0C. A waterproof jacket and compact umbrella are always wise companions.",
    currencyAndCostEstimate: {
      currency: "GBP (\xA3 British Pound, approx \xA31 = $1.30 USD)",
      estimatedTotalPerPerson: "$450 - $680 USD (excluding flights/hotel)",
      breakdown: "Daily pub & market meals: \xA335\u2013\xA355, Tube travel: \xA38.50 cap, West End ticket: \xA340\u2013\xA385"
    },
    transportationGuide: {
      overview: "The London Underground ('The Tube') and iconic double-decker red buses cover every borough effortlessly.",
      recommendedPasses: "Contactless tap-to-pay on phone or card. Daily price cap automatically applies (~\xA38.50 for Zones 1-2).",
      metroBusTips: "Always stand on the right side of escalators. Tap in and out at Tube turnstiles (on buses, tap only when boarding).",
      airportTransfer: "Elizabeth Line or Heathrow Express into central London (Paddington / Tottenham Court Rd); Gatwick Express to Victoria.",
      rideSharing: "Uber, Bolt, and traditional black cabs (hail when the orange roof light is illuminated)."
    },
    packingAndPrepTips: [
      "Compact windproof umbrella and water-resistant coat.",
      "Comfortable cushioned walking shoes for historic pavements and park walks.",
      "Type G three-prong UK power adapter."
    ],
    days: [
      {
        dayNumber: 1,
        title: "Day 1: Royal Westminster, Big Ben & South Bank Stroll",
        summary: "Hear Big Ben chime, admire Westminster Abbey, walk along the Thames past the London Eye, and feast at Borough Market.",
        schedule: [
          {
            id: "ldn-d1-1",
            time: "08:30 AM",
            timeSlot: "morning",
            title: "Full English Breakfast at Regency Cafe",
            category: "food",
            description: "Legendary 1946 art deco cafe celebrated for authentic, hearty full English breakfasts served with a smile.",
            location: "17-19 Regency St, London SW1P 4BY",
            duration: "50 mins",
            costEstimate: "\xA38 - \xA314",
            foodDetail: {
              mealType: "breakfast",
              cuisine: "Traditional British Cafe",
              recommendedDishes: ["Full English Breakfast (eggs, bacon, sausage, beans, toast)", "Mug of Builders Tea"],
              priceRange: "$",
              reservationNeeded: false
            }
          },
          {
            id: "ldn-d1-2",
            time: "09:45 AM",
            timeSlot: "morning",
            title: "Westminster Abbey & Parliament Square",
            category: "place",
            description: "Coronation church of British monarchs since 1066 and burial site of Isaac Newton and Charles Dickens.",
            location: "Dean's Yard, London SW1P 3PA",
            duration: "2 hours",
            costEstimate: "\xA327",
            tips: "Walk across Westminster Bridge for the classic postcard view of Big Ben and the Houses of Parliament.",
            coordinates: { lat: 51.4993, lng: -0.1273 }
          },
          {
            id: "ldn-d1-3",
            time: "12:30 PM",
            timeSlot: "afternoon",
            title: "Artisanal Lunch at Borough Market",
            category: "food",
            description: "London's premier historic food market under Victorian railway arches, overflowing with artisan cheeses, fresh oysters, and street food.",
            location: "8 Southwark St, London SE1 1TL",
            duration: "1.5 hours",
            costEstimate: "\xA312 - \xA320",
            foodDetail: {
              mealType: "lunch",
              cuisine: "Gourmet Street Food & Market Delicacies",
              recommendedDishes: ["Kappacasein Hot Melted Raclette", "Scotch Tail Pie", "Salt Beef Bagel"],
              priceRange: "$$",
              reservationNeeded: false
            }
          },
          {
            id: "ldn-d1-4",
            time: "02:30 PM",
            timeSlot: "afternoon",
            title: "Tower of London & Crown Jewels",
            category: "place",
            description: "Nearly 1,000 years of royal history, traitor executions, fortress defenses, and the dazzling Crown Jewels.",
            location: "London EC3N 4AB",
            duration: "2.5 hours",
            costEstimate: "\xA334",
            tips: "Join an entertaining Yeoman Warder ('Beefeater') guided tour included with standard admission.",
            coordinates: { lat: 51.5081, lng: -0.0759 }
          },
          {
            id: "ldn-d1-5",
            time: "07:30 PM",
            timeSlot: "night",
            title: "Traditional Ale & Dinner at The George Inn",
            category: "food",
            description: "London's last remaining 17th-century galleried coaching inn, once frequented by Charles Dickens and William Shakespeare.",
            location: "75-77 Borough High St, London SE1 1NH",
            duration: "2 hours",
            costEstimate: "\xA325 - \xA340",
            foodDetail: {
              mealType: "dinner",
              cuisine: "Historic British Gastropub",
              recommendedDishes: ["Crispy Beer-Battered Fish and Chips", "Steak and Ale Pie", "Pint of London Pride Ale"],
              priceRange: "$$",
              reservationNeeded: false
            }
          }
        ]
      }
    ],
    sources: [
      { title: "Visit London Official Visitor City Guide", url: "https://www.visitlondon.com" },
      { title: "Transport for London (TfL) Tube & Bus Maps", url: "https://tfl.gov.uk" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete London itinerary so you can continue your travel planning without interruption!`
  };
}
function createGenericCustomPlan(pref) {
  const duration = pref.durationDays || 3;
  const destination = pref.destination.trim();
  const days = [];
  const timeSlots = [
    { time: "08:30 AM", slot: "morning" },
    { time: "10:00 AM", slot: "morning" },
    { time: "12:30 PM", slot: "afternoon" },
    { time: "02:30 PM", slot: "afternoon" },
    { time: "05:30 PM", slot: "evening" },
    { time: "07:30 PM", slot: "night" }
  ];
  for (let d = 1; d <= duration; d++) {
    const daySchedule = [
      {
        id: `custom-d${d}-1`,
        time: timeSlots[0].time,
        timeSlot: timeSlots[0].slot,
        title: `Breakfast & Artisan Coffee in Central ${destination}`,
        category: "food",
        description: `Start the day at a beloved local cafe tasting traditional breakfast specialties, freshly baked breads, and local morning beverages.`,
        location: `Central ${destination}`,
        duration: "50 mins",
        costEstimate: "$10 - $18",
        tips: "Arrive early to enjoy the morning ambiance alongside local residents.",
        foodDetail: {
          mealType: "breakfast",
          cuisine: "Local Regional Breakfast",
          recommendedDishes: ["House Breakfast Specialty", "Fresh Pressed Juice", "Artisan Coffee"],
          priceRange: "$$",
          reservationNeeded: false
        }
      },
      {
        id: `custom-d${d}-2`,
        time: timeSlots[1].time,
        timeSlot: timeSlots[1].slot,
        title: d === 1 ? `Historic Landmark & Heritage Tour in ${destination}` : d === 2 ? `Renowned Cultural Museum & Art Pavilion` : `Scenic Viewpoint & Old Quarter Exploration`,
        category: "place",
        description: `Immerse in the iconic architecture, deep heritage, and most celebrated vistas of ${destination}.`,
        location: `Historic District, ${destination}`,
        duration: "2 hours",
        costEstimate: "$15 - $25",
        tips: "Pre-book timed tickets online where applicable to skip ticket queues."
      },
      {
        id: `custom-d${d}-3`,
        time: timeSlots[2].time,
        timeSlot: timeSlots[2].slot,
        title: `Authentic Regional Lunch at Top-Rated Neighborhood Bistro`,
        category: "food",
        description: `Savor seasonal farm-to-table culinary traditions featuring signature local ingredients and regional sauces.`,
        location: `Old Town, ${destination}`,
        duration: "1 hour 15 mins",
        costEstimate: "$20 - $35",
        tips: "Ask your server for the daily market special.",
        foodDetail: {
          mealType: "lunch",
          cuisine: "Authentic Regional Cuisine",
          recommendedDishes: ["Chef's Daily Specialty", "Local Bread & Olive Oil", "House Dessert"],
          priceRange: "$$",
          reservationNeeded: false
        }
      },
      {
        id: `custom-d${d}-4`,
        time: timeSlots[3].time,
        timeSlot: timeSlots[3].slot,
        title: `Transit & Walk to Artisan Quarter & Boutiques`,
        category: "transport",
        description: `Ride the central transit line across the district to explore pedestrian walkways and independent craft shops.`,
        location: `${destination} Transit System`,
        duration: "20 mins",
        costEstimate: "$2.50",
        transportDetail: {
          mode: "subway",
          route: "City Transit Main Line",
          duration: "20 mins",
          cost: "$2.50"
        }
      },
      {
        id: `custom-d${d}-5`,
        time: timeSlots[4].time,
        timeSlot: timeSlots[4].slot,
        title: `Scenic Waterfront / Panoramic Sunset Walk`,
        category: "activity",
        description: `Take in the shifting golden hour colors across the city skyline and landmarks during the most photogenic time of day.`,
        location: `Panoramic Promenade, ${destination}`,
        duration: "1.5 hours",
        costEstimate: "Free",
        tips: "Bring your camera or phone fully charged for sunset photography."
      },
      {
        id: `custom-d${d}-6`,
        time: timeSlots[5].time,
        timeSlot: timeSlots[5].slot,
        title: `Evening Dinner & Drinks at Atmospheric Local Eatery`,
        category: "food",
        description: `Unwind with a memorable evening feast celebrating local hospitality, regional wine or beverages, and vibrant social energy.`,
        location: `Dining Quarter, ${destination}`,
        duration: "2 hours",
        costEstimate: "$35 - $60 per person",
        foodDetail: {
          mealType: "dinner",
          cuisine: "Signature Local Dining",
          recommendedDishes: ["Signature Main Entree", "Seasonal Vegetable Medley", "Local Wine or Beverage"],
          priceRange: "$$",
          reservationNeeded: true
        }
      }
    ];
    days.push({
      dayNumber: d,
      title: `Day ${d}: ${d === 1 ? "Historic Heart & Iconic Sights" : d === 2 ? "Culture, Art & Local Neighborhoods" : "Hidden Gems, Scenic Views & Nightlife"}`,
      summary: `A carefully paced day balancing signature attractions in ${destination} with relaxed dining, easy transit, and atmospheric evening walks.`,
      schedule: daySchedule
    });
  }
  return {
    destination,
    occasion: pref.occasion || "Vacation / Leisure",
    durationDays: duration,
    travelersCount: pref.travelersCount || 2,
    travelerType: pref.travelerType || "Couple",
    budget: pref.budget || "Moderate",
    pace: pref.pace || "Balanced",
    overview: `A tailored ${duration}-day travel itinerary for ${destination}, customized for ${pref.travelersCount || 2} ${pref.travelerType || "travelers"}. This plan strikes an optimal balance of signature landmarks, authentic dining, easy public transit connections, and relaxed evening strolls tailored to your ${pref.pace || "Balanced"} pace.`,
    weatherSummary: "Mild seasonal conditions. Check the local 5-day forecast before departure and pack versatile layers with comfortable walking footwear.",
    currencyAndCostEstimate: {
      currency: "Local Currency / USD Equivalent",
      estimatedTotalPerPerson: pref.budget === "Luxury" ? "$850 - $1,300 USD" : pref.budget === "Budget" ? "$250 - $390 USD" : "$450 - $650 USD",
      breakdown: "Daily dining: $40\u2013$65, Local transit: $5\u2013$12, Admissions & activities: $25\u2013$45 per person"
    },
    transportationGuide: {
      overview: `Public buses, trains/metros, and licensed taxis connect all major areas across ${destination}.`,
      recommendedPasses: "Check for multi-day transit tourist passes or contactless tap-and-go ticketing at central stations.",
      metroBusTips: "Google Maps and local transit apps provide accurate route suggestions and platform departure times.",
      airportTransfer: "Express airport trains or airport shuttle buses provide convenient connections into the city center.",
      rideSharing: "Uber, Bolt, or licensed local taxi apps operate reliably throughout the central district."
    },
    packingAndPrepTips: [
      "Comfortable, supportive walking shoes suited for extensive walking.",
      "Portable power bank to keep smartphones charged for maps and translation.",
      "Universal travel adapter for local electrical outlets.",
      "Light rain jacket or compact umbrella for weather changes."
    ],
    days,
    sources: [
      { title: `Official Tourism Portal for ${destination}`, url: "https://www.google.com/travel" },
      { title: "Public Transit & Route Navigation Guide", url: "https://maps.google.com" }
    ],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a custom itinerary for ${destination} so your trip planning continues uninterrupted!`
  };
}
function generateFallbackItem(destination, currentItem, category, reason) {
  const cat = (category || currentItem?.category || "activity").toLowerCase();
  if (cat === "food") {
    return {
      title: `Artisanal Local Dining in ${destination}`,
      category: "food",
      description: `A celebrated culinary stop offering freshly prepared regional dishes, local hospitality, and seasonal produce.`,
      location: `Central ${destination}`,
      duration: "1.5 hours",
      costEstimate: "$20 - $35",
      tips: "Ask for the daily chef special or house signature dish.",
      foodDetail: {
        mealType: currentItem?.foodDetail?.mealType || "dinner",
        cuisine: "Authentic Local Cuisine",
        recommendedDishes: ["Chef's Daily Special", "Seasonal House Starter", "Local Dessert"],
        priceRange: "$$",
        reservationNeeded: false
      }
    };
  }
  if (cat === "transport") {
    return {
      title: `Scenic Transit & Stroll through ${destination}`,
      category: "transport",
      description: `Fast and scenic transit connection via the main urban line, followed by a pleasant neighborhood walk.`,
      location: `${destination} Transit Network`,
      duration: "25 mins",
      costEstimate: "$2.50",
      tips: "Tap with your contactless transit card or mobile wallet.",
      transportDetail: {
        mode: "subway",
        route: "Main Urban Line",
        duration: "25 mins",
        cost: "$2.50"
      }
    };
  }
  if (cat === "place") {
    return {
      title: `Historic Pavilion & Scenic Promenade in ${destination}`,
      category: "place",
      description: `Discover an iconic landmark showcasing unique architectural heritage and peaceful panoramic vistas.`,
      location: `Historic Quarter, ${destination}`,
      duration: "2 hours",
      costEstimate: "Free / $10 entry",
      tips: "Visit during the late afternoon for golden hour photography."
    };
  }
  return {
    title: `Curated Cultural & Walking Experience in ${destination}`,
    category: "activity",
    description: `Immerse in local traditions with an engaging self-guided exploration of authentic backstreets, artisan shops, and scenic gardens.`,
    location: `Central District, ${destination}`,
    duration: "1.5 hours",
    costEstimate: "Free to explore",
    tips: "Wear comfortable walking footwear."
  };
}

// src/utils/pinterestScraper.ts
var pinCache = /* @__PURE__ */ new Map();
var CACHE_TTL_MS = 60 * 60 * 1e3;
function getHighResPinterestUrl(url) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("pinimg.com")) return url;
  return url.replace(/\/236x\//, "/736x/").replace(/\/474x\//, "/736x/").replace(/\/564x\//, "/736x/");
}
function cleanPlaceName(rawTitle) {
  if (!rawTitle || typeof rawTitle !== "string") return "";
  let clean = rawTitle.replace(/\([^)]*\)/g, "").trim();
  const prefixes = [
    /^(visit|explore|discover|tour of|tour|stop at|stop by|wander around|stroll through|walk around|stroll along|scenic walk along|check-in at|check into|arrive at|departure from|head to|head towards)\s+/i,
    /^(breakfast at|lunch at|dinner at|coffee at|drinks at|tea at|tasting at|dine at|relax at|eat at|snack at)\s+/i,
    /^(morning walk in|evening stroll at|afternoon at|night out in|sunrise hike at|sunset from|sunrise at)\s+/i,
    /^(take the|ride the|board the|train to|subway to|metro to|bus to)\s+/i
  ];
  for (const p of prefixes) {
    clean = clean.replace(p, "").trim();
  }
  return clean;
}
function isGenericPlace(title) {
  if (!title || title.length < 3) return true;
  const lower = title.toLowerCase().trim();
  const genericWords = [
    "hotel",
    "accommodation",
    "hostel",
    "resort",
    "check in",
    "check-in",
    "checkout",
    "check out",
    "rest",
    "relax",
    "unpack",
    "pack bags",
    "airport",
    "flight",
    "arrival",
    "departure",
    "subway",
    "metro",
    "train station",
    "bus station",
    "transit",
    "transfer",
    "breakfast",
    "lunch",
    "dinner",
    "free time",
    "leisure time",
    "stroll"
  ];
  return genericWords.some((w) => lower === w || lower === `${w}s`);
}
function extractPinId(url) {
  if (!url) return "";
  const match = url.match(/\/pin\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : "";
}
function cleanPinTitle(rawTitle) {
  if (!rawTitle) return "";
  return rawTitle.replace(/\s*\|\s*Pinterest.*$/i, "").replace(/\s*-\s*Pinterest.*$/i, "").replace(/^Pin\s+on\s+[^|]+\|\s*/i, "").replace(/^Pin\s+by\s+[^|]+\|\s*/i, "").trim();
}
async function scrapePinterestPins(rawQuery, options = {}) {
  const {
    limit = 3,
    timeoutMs = 2500,
    forceFresh = false
  } = options;
  if (!rawQuery || typeof rawQuery !== "string" || !rawQuery.trim()) {
    return [];
  }
  const cleanPlace = cleanPlaceName(rawQuery);
  if (isGenericPlace(cleanPlace)) {
    return [];
  }
  const sanitized = cleanPlace.replace(/\([^)]*\)/g, "").replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
  const searchQuery = `${sanitized} site:pinterest.com`;
  const cacheKey = searchQuery.toLowerCase();
  if (!forceFresh && pinCache.has(cacheKey)) {
    const entry = pinCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL_MS) {
      return entry.pins.slice(0, limit);
    }
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
    const tokenRes = await fetch(tokenUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      },
      signal: controller.signal
    });
    if (!tokenRes.ok) {
      throw new Error(`Session request returned status ${tokenRes.status}`);
    }
    const html = await tokenRes.text();
    const tokenMatch = html.match(/vqd=([a-zA-Z0-9_-]+)/) || html.match(/vqd="([a-zA-Z0-9_-]+)"/);
    const vqd = tokenMatch ? tokenMatch[1] : null;
    if (!vqd) {
      throw new Error("Could not acquire anonymous search token.");
    }
    const searchApiUrl = `https://duckduckgo.com/i.js?q=${encodeURIComponent(
      searchQuery
    )}&o=json&p=1&s=0&u=bing&f=,,,&l=us-en&vqd=${encodeURIComponent(vqd)}`;
    const apiRes = await fetch(searchApiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Referer: "https://duckduckgo.com/",
        Accept: "application/json, text/javascript, */*; q=0.01"
      },
      signal: controller.signal
    });
    if (!apiRes.ok) {
      throw new Error(`Image API request returned status ${apiRes.status}`);
    }
    const json = await apiRes.json();
    const rawResults = json.results || [];
    const parsedPins = [];
    const seenUrls = /* @__PURE__ */ new Set();
    const placeTokens = sanitized.toLowerCase().split(/\s+/).filter((t) => t.length >= 3 && !["the", "and", "for", "with"].includes(t));
    const spamKeywords = [
      "outfit",
      "clothing",
      "what to wear",
      "fashion",
      "wallpaper",
      "lockscreen",
      "aesthetic wallpaper",
      "bullet journal",
      "quote",
      "quotes",
      "inspirational",
      "drawing",
      "clipart",
      "vector",
      "infographic",
      "packing list",
      "flyer",
      "costume",
      "coloring",
      "sketch"
    ];
    for (const item of rawResults) {
      const imgUrl = item.image;
      const pageUrl = item.url || "";
      const rawTitle = item.title || "";
      const isPinImg = imgUrl && imgUrl.includes("pinimg.com");
      const isPinterestPage = pageUrl.includes("pinterest.com");
      if (!isPinImg && !isPinterestPage) continue;
      const fullText = `${rawTitle} ${pageUrl}`.toLowerCase();
      if (spamKeywords.some((w) => fullText.includes(w))) continue;
      if (placeTokens.length > 0) {
        const hasKeywordMatch = placeTokens.some((token) => fullText.includes(token));
        if (!hasKeywordMatch) continue;
      }
      const highResUrl = getHighResPinterestUrl(imgUrl);
      const reliableCdnUrl = item.thumbnail && item.thumbnail.includes("bing.net") ? item.thumbnail.replace("&pid=Api", "&pid=Api&w=800&h=600&c=7") : item.thumbnail || highResUrl;
      if (seenUrls.has(reliableCdnUrl)) continue;
      seenUrls.add(reliableCdnUrl);
      const pinId = extractPinId(pageUrl) || String(item.image_token || Math.random().toString(36).slice(2));
      const cleanTitle = cleanPinTitle(rawTitle || sanitized);
      parsedPins.push({
        id: pinId,
        title: cleanTitle || sanitized,
        description: rawTitle || "",
        imageUrl: reliableCdnUrl,
        thumbnailUrl: item.thumbnail || reliableCdnUrl,
        originalImageUrl: highResUrl,
        pinUrl: pageUrl.startsWith("http") ? pageUrl : `https://www.pinterest.com/pin/${pinId}/`,
        sourceDomain: "pinterest.com",
        width: item.width || 736,
        height: item.height || 1050
      });
      if (parsedPins.length >= limit) break;
    }
    if (parsedPins.length > 0) {
      pinCache.set(cacheKey, {
        timestamp: Date.now(),
        pins: parsedPins
      });
    }
    return parsedPins;
  } catch (err) {
    if (err.name === "AbortError") {
      console.warn(`[Pinterest Scraper] Timeout after ${timeoutMs}ms for query: "${sanitized}"`);
    } else {
      console.warn(`[Pinterest Scraper] Scraping failed for query: "${sanitized}":`, err.message || err);
    }
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
}
async function fetchPinterestPlacePhoto(title, location, city) {
  if (!title || typeof title !== "string") return null;
  const cleanTitle = cleanPlaceName(title);
  if (isGenericPlace(cleanTitle)) return null;
  const cleanCity = (city || "").replace(/\([^)]*\)/g, "").trim();
  const query = `${cleanTitle} ${cleanCity}`.trim();
  try {
    const pins = await scrapePinterestPins(query, {
      limit: 3,
      timeoutMs: 2500,
      aestheticKeywords: false
    });
    if (pins.length > 0) {
      const topPin = pins[0];
      const allUrls = pins.map((p) => p.imageUrl);
      const alternativePhotos = pins.slice(1).map((p, idx) => ({
        url: p.imageUrl,
        caption: p.title || `${cleanTitle} - View ${idx + 2}`,
        source: "Pinterest",
        sourceType: "pinterest",
        pinUrl: p.pinUrl
      }));
      return {
        url: topPin.imageUrl,
        caption: topPin.title || title,
        source: "Pinterest",
        sourceType: "pinterest",
        officialWebsiteUrl: topPin.pinUrl,
        tripAdvisorUrl: topPin.pinUrl,
        description: topPin.description || `${cleanTitle} in ${cleanCity || "destination"}`,
        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${cleanTitle} ${location || ""} ${cleanCity}`.trim()
        )}`,
        pinId: topPin.id,
        width: topPin.width,
        height: topPin.height,
        photos: allUrls,
        // Up to best 3 photos of the place
        alternativePhotos
      };
    }
  } catch (err) {
    console.warn("[Pinterest Scraper] fetchPinterestPlacePhoto error:", err);
  }
  return null;
}

// src/utils/weatherService.ts
function celsiusToFahrenheit(c) {
  return Math.round(c * 9 / 5 + 32);
}
function formatDateISO(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function parseDateISO(isoStr) {
  const parts = isoStr.split("-");
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return new Date(y, m, d, 12, 0, 0);
  }
  return /* @__PURE__ */ new Date();
}
function formatDisplayDate(d) {
  const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "short" });
  const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return { dayOfWeek, formattedDate };
}
function getWeatherConditionInfo(code) {
  if (code === 0) {
    return {
      condition: "Clear Sky",
      iconName: "Sun",
      advice: "Bright & sunny! Sunglasses, hat, and sunscreen recommended."
    };
  }
  if (code === 1) {
    return {
      condition: "Mainly Clear",
      iconName: "Sun",
      advice: "Crisp, bright skies \u2014 ideal for panoramic viewpoints."
    };
  }
  if (code === 2) {
    return {
      condition: "Partly Cloudy",
      iconName: "CloudSun",
      advice: "Pleasant sightseeing weather with intermittent soft breezes."
    };
  }
  if (code === 3) {
    return {
      condition: "Overcast",
      iconName: "Cloud",
      advice: "Gentle, diffuse daylight \u2014 perfect for street & shrine photography."
    };
  }
  if (code === 45 || code === 48) {
    return {
      condition: "Misty / Fog",
      iconName: "Cloud",
      advice: "Atmospheric morning mist; wear non-slip footwear."
    };
  }
  if (code >= 51 && code <= 55) {
    return {
      condition: "Light Drizzle",
      iconName: "CloudDrizzle",
      advice: "Light intermittent mist; a compact travel umbrella is handy."
    };
  }
  if (code === 56 || code === 57) {
    return {
      condition: "Freezing Drizzle",
      iconName: "CloudSnow",
      advice: "Chilly drizzle; warm waterproof outerwear is key."
    };
  }
  if (code >= 61 && code <= 65) {
    return {
      condition: code === 65 ? "Heavy Rain" : "Moderate Rain",
      iconName: "CloudRain",
      advice: code === 65 ? "Steady rain; great time for covered arcades, museums, and cozy tea shops." : "Rain showers expected; carry an umbrella and water-resistant footwear."
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      condition: "Snowfall",
      iconName: "CloudSnow",
      advice: "Snow flurries; wear thermal base layers and insulated boots."
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      condition: "Passing Showers",
      iconName: "CloudRain",
      advice: "Scattered showers between sunny breaks; keep an umbrella close."
    };
  }
  if (code >= 85 && code <= 86) {
    return {
      condition: "Snow Showers",
      iconName: "CloudSnow",
      advice: "Intermittent snow showers; gloves and scarf recommended."
    };
  }
  if (code >= 95) {
    return {
      condition: "Thunderstorm",
      iconName: "CloudLightning",
      advice: "Thunderstorm activity; schedule indoor dining and galleries."
    };
  }
  return {
    condition: "Mild & Fair",
    iconName: "CloudSun",
    advice: "Comfortable seasonal weather for leisurely exploration."
  };
}
var SEASONAL_CLIMATES = {
  tokyo: {
    baseHighC: [10, 11, 14, 19, 23, 26, 29, 31, 27, 22, 17, 12],
    baseLowC: [2, 3, 6, 11, 16, 20, 24, 25, 22, 16, 10, 5],
    avgRainChance: [20, 25, 35, 40, 45, 55, 45, 35, 50, 40, 30, 20]
  },
  kyoto: {
    baseHighC: [9, 10, 14, 20, 25, 28, 32, 33, 29, 23, 17, 12],
    baseLowC: [1, 2, 5, 10, 15, 20, 24, 25, 21, 14, 8, 3],
    avgRainChance: [25, 30, 40, 45, 45, 60, 50, 40, 50, 35, 30, 25]
  },
  paris: {
    baseHighC: [7, 8, 12, 16, 20, 23, 25, 25, 21, 16, 11, 8],
    baseLowC: [3, 3, 5, 8, 11, 14, 16, 16, 13, 10, 6, 4],
    avgRainChance: [35, 30, 30, 35, 35, 30, 30, 30, 30, 35, 40, 40]
  },
  rome: {
    baseHighC: [12, 13, 16, 19, 24, 28, 31, 31, 27, 22, 17, 13],
    baseLowC: [4, 5, 7, 9, 13, 17, 20, 20, 17, 13, 9, 5],
    avgRainChance: [30, 30, 25, 25, 20, 15, 10, 15, 25, 35, 40, 35]
  },
  london: {
    baseHighC: [9, 9, 12, 15, 18, 21, 23, 23, 20, 16, 12, 9],
    baseLowC: [4, 4, 6, 7, 10, 13, 15, 15, 13, 10, 7, 5],
    avgRainChance: [40, 35, 35, 35, 35, 35, 30, 35, 35, 40, 45, 40]
  },
  newyork: {
    baseHighC: [4, 6, 11, 17, 22, 27, 30, 29, 25, 18, 13, 7],
    baseLowC: [-3, -2, 2, 7, 13, 18, 21, 21, 17, 10, 5, 0],
    avgRainChance: [30, 30, 35, 35, 35, 35, 35, 35, 30, 30, 30, 30]
  }
};
function generateSeasonalForecast(destination, startDateStr) {
  const cleanDest = destination.trim() || "Tokyo, Japan";
  const start = startDateStr ? parseDateISO(startDateStr) : /* @__PURE__ */ new Date();
  const monthIdx = start.getMonth();
  const destLower = cleanDest.toLowerCase();
  let climate = SEASONAL_CLIMATES.tokyo;
  for (const key of Object.keys(SEASONAL_CLIMATES)) {
    if (destLower.includes(key)) {
      climate = SEASONAL_CLIMATES[key];
      break;
    }
  }
  const baseHigh = climate.baseHighC[monthIdx];
  const baseLow = climate.baseLowC[monthIdx];
  const baseRain = climate.avgRainChance[monthIdx];
  const weatherCodesPool = [0, 1, 2, 2, 3, 80, 61];
  const days = [];
  let sumMaxC = 0;
  let sumMinC = 0;
  for (let i = 0; i < 5; i++) {
    const curDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1e3);
    const dateStr = formatDateISO(curDate);
    const { dayOfWeek, formattedDate } = formatDisplayDate(curDate);
    const wobble = Math.sin(i * 1.5 + curDate.getDate()) * 2.2;
    const maxC = Math.round((baseHigh + wobble) * 10) / 10;
    const minC = Math.round((baseLow + wobble * 0.7) * 10) / 10;
    const avgC = Math.round((maxC + minC) / 2 * 10) / 10;
    sumMaxC += maxC;
    sumMinC += minC;
    const code = baseRain > 40 && i === 2 ? 61 : weatherCodesPool[(i + curDate.getDate()) % weatherCodesPool.length];
    const { condition, iconName, advice } = getWeatherConditionInfo(code);
    const rainVariance = Math.round(Math.min(95, Math.max(5, baseRain + (i % 2 === 0 ? 10 : -10))));
    days.push({
      date: dateStr,
      dayIndex: i + 1,
      dayName: `Day ${i + 1}`,
      dayOfWeek,
      formattedDate,
      weatherCode: code,
      condition,
      iconName,
      tempMaxC: maxC,
      tempMinC: minC,
      tempAvgC: avgC,
      tempMaxF: celsiusToFahrenheit(maxC),
      tempMinF: celsiusToFahrenheit(minC),
      tempAvgF: celsiusToFahrenheit(avgC),
      precipitationChance: rainVariance,
      advice
    });
  }
  const overallMaxC = Math.round(Math.max(...days.map((d) => d.tempMaxC)));
  const overallMinC = Math.round(Math.min(...days.map((d) => d.tempMinC)));
  const overallAvgC = Math.round((sumMaxC + sumMinC) / 10);
  const overallMaxF = celsiusToFahrenheit(overallMaxC);
  const overallMinF = celsiusToFahrenheit(overallMinC);
  const overallAvgF = celsiusToFahrenheit(overallAvgC);
  const endDate = days[days.length - 1].date;
  return {
    destination: cleanDest,
    startDate: days[0].date,
    endDate,
    isRealtime: false,
    source: "Curated Seasonal Climate Model",
    days,
    averageRangeC: { min: overallMinC, max: overallMaxC, avg: overallAvgC },
    averageRangeF: { min: overallMinF, max: overallMaxF, avg: overallAvgF }
  };
}

// server.ts
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const weatherCache = /* @__PURE__ */ new Map();
  const WEATHER_CACHE_TTL = 30 * 60 * 1e3;
  app.get("/api/weather", async (req, res) => {
    try {
      const destination = (req.query.destination || "Tokyo, Japan").trim();
      const startDateStr = (req.query.startDate || "").trim() || formatDateISO(/* @__PURE__ */ new Date());
      const cacheKey = `${destination.toLowerCase()}_${startDateStr}`;
      const cached = weatherCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_TTL) {
        return res.json(cached.data);
      }
      const cleanCity = destination.split(",")[0].replace(/\([^)]*\)/g, "").trim();
      let forecastData = null;
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanCity)}&count=1`
        );
        if (geoRes.ok) {
          const geoJson = await geoRes.json();
          if (geoJson.results && geoJson.results.length > 0) {
            const { latitude, longitude, name, country } = geoJson.results[0];
            const start = parseDateISO(startDateStr);
            const end = new Date(start.getTime() + 4 * 24 * 60 * 60 * 1e3);
            const startFormatted = formatDateISO(start);
            const endFormatted = formatDateISO(end);
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${startFormatted}&end_date=${endFormatted}`;
            const weatherRes = await fetch(weatherUrl);
            if (weatherRes.ok) {
              const wJson = await weatherRes.json();
              if (wJson.daily && wJson.daily.time && wJson.daily.time.length >= 5) {
                const days = [];
                const times = wJson.daily.time;
                const codes = wJson.daily.weathercode;
                const maxs = wJson.daily.temperature_2m_max;
                const mins = wJson.daily.temperature_2m_min;
                const rains = wJson.daily.precipitation_probability_max || [];
                let sumMax = 0;
                let sumMin = 0;
                for (let i = 0; i < 5; i++) {
                  const dStr = times[i];
                  const dDate = parseDateISO(dStr);
                  const { dayOfWeek, formattedDate } = formatDisplayDate(dDate);
                  const code = codes[i] ?? 1;
                  const { condition, iconName, advice } = getWeatherConditionInfo(code);
                  const maxC = Math.round(maxs[i] * 10) / 10;
                  const minC = Math.round(mins[i] * 10) / 10;
                  const avgC = Math.round((maxC + minC) / 2 * 10) / 10;
                  sumMax += maxC;
                  sumMin += minC;
                  days.push({
                    date: dStr,
                    dayIndex: i + 1,
                    dayName: `Day ${i + 1}`,
                    dayOfWeek,
                    formattedDate,
                    weatherCode: code,
                    condition,
                    iconName,
                    tempMaxC: maxC,
                    tempMinC: minC,
                    tempAvgC: avgC,
                    tempMaxF: celsiusToFahrenheit(maxC),
                    tempMinF: celsiusToFahrenheit(minC),
                    tempAvgF: celsiusToFahrenheit(avgC),
                    precipitationChance: rains[i] ?? 15,
                    advice
                  });
                }
                const overallMaxC = Math.round(Math.max(...days.map((d) => d.tempMaxC)));
                const overallMinC = Math.round(Math.min(...days.map((d) => d.tempMinC)));
                const overallAvgC = Math.round((sumMax + sumMin) / 10);
                forecastData = {
                  destination: `${name}, ${country || destination}`,
                  startDate: days[0].date,
                  endDate: days[days.length - 1].date,
                  isRealtime: true,
                  source: "Live Open-Meteo Meteorological Service",
                  days,
                  averageRangeC: { min: overallMinC, max: overallMaxC, avg: overallAvgC },
                  averageRangeF: {
                    min: celsiusToFahrenheit(overallMinC),
                    max: celsiusToFahrenheit(overallMaxC),
                    avg: celsiusToFahrenheit(overallAvgC)
                  }
                };
              }
            }
          }
        }
      } catch (err) {
        console.error("Open-Meteo query failed:", err);
      }
      if (!forecastData) {
        forecastData = generateSeasonalForecast(destination, startDateStr);
      }
      weatherCache.set(cacheKey, { data: forecastData, timestamp: Date.now() });
      return res.json(forecastData);
    } catch (globalErr) {
      console.error("Weather endpoint error:", globalErr);
      const fallback = generateSeasonalForecast(
        req.query.destination || "Tokyo, Japan",
        req.query.startDate
      );
      return res.json(fallback);
    }
  });
  app.get("/api/places-autocomplete", async (req, res) => {
    try {
      const q = (req.query.q || "").trim();
      const destination = (req.query.destination || "").trim();
      if (!q) return res.json({ predictions: [] });
      const predictions = [];
      const cleanCity = destination.split(",")[0].trim();
      if (process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY) {
        try {
          const gRes = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
              "X-Goog-Maps-Solution-ID": "gmp_git_agentskills_v1"
            },
            body: JSON.stringify({
              input: `${q} ${cleanCity}`.trim()
            })
          });
          if (gRes.ok) {
            const gJson = await gRes.json();
            if (gJson.suggestions && Array.isArray(gJson.suggestions)) {
              for (const s of gJson.suggestions.slice(0, 6)) {
                if (s.placePrediction) {
                  const p = s.placePrediction;
                  predictions.push({
                    id: p.placeId || p.place,
                    name: p.structuredFormat?.mainText?.text || p.text?.text,
                    neighborhood: p.structuredFormat?.secondaryText?.text || cleanCity,
                    city: cleanCity,
                    type: "hotel",
                    coords: { lat: 0, lng: 0 },
                    address: p.text?.text
                  });
                }
              }
            }
          }
        } catch (gErr) {
        }
      }
      if (predictions.length === 0) {
        try {
          const nomUrl = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&q=${encodeURIComponent(
            `${q} ${cleanCity}`
          )}`;
          const nRes = await fetch(nomUrl, {
            headers: { "User-Agent": "TravelScrapbookPlanner/1.0" }
          });
          if (nRes.ok) {
            const nJson = await nRes.json();
            if (Array.isArray(nJson)) {
              for (const item of nJson) {
                const lat = parseFloat(item.lat);
                const lng = parseFloat(item.lon);
                const isLodging = item.type === "hotel" || item.type === "guest_house" || item.class === "tourism";
                predictions.push({
                  id: String(item.place_id || item.osm_id),
                  name: item.name || item.display_name.split(",")[0],
                  neighborhood: item.address?.neighbourhood || item.address?.suburb || item.address?.city_district || cleanCity,
                  city: item.address?.city || cleanCity,
                  type: isLodging ? "hotel" : "neighborhood",
                  coords: { lat, lng },
                  address: item.display_name
                });
              }
            }
          }
        } catch (nErr) {
        }
      }
      return res.json({ predictions });
    } catch (err) {
      console.error("Places autocomplete error:", err);
      return res.json({ predictions: [] });
    }
  });
  const photoCache = /* @__PURE__ */ new Map();
  async function fetchRealPlacePhoto(title, location, city) {
    if (!title || typeof title !== "string") return null;
    const cleanTitle = title.replace(/\([^)]*\)/g, "").trim();
    const cleanCity = (city || "").replace(/\([^)]*\)/g, "").trim();
    const cacheKey = `${cleanTitle.toLowerCase()}_${cleanCity.toLowerCase()}`;
    if (photoCache.has(cacheKey)) {
      return photoCache.get(cacheKey);
    }
    try {
      if (process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY) {
        const gRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "places.id,places.displayName,places.photos,places.websiteUri",
            "X-Goog-Maps-Solution-ID": "gmp_git_agentskills_v1"
          },
          body: JSON.stringify({
            textQuery: `${cleanTitle} ${location || ""} ${cleanCity}`.trim(),
            maxResultCount: 1
          })
        });
        if (gRes.ok) {
          const gJson = await gRes.json();
          if (gJson.places && gJson.places.length > 0 && gJson.places[0].photos && gJson.places[0].photos.length > 0) {
            const place = gJson.places[0];
            const photos = place.photos.slice(0, 3).map(
              (p) => `https://places.googleapis.com/v1/${p.name}/media?maxHeightPx=800&maxWidthPx=1200&key=${process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY}`
            );
            const result = {
              url: photos[0],
              caption: place.displayName?.text || cleanTitle,
              source: "Google Maps",
              sourceType: "official_website",
              officialWebsiteUrl: place.websiteUri || void 0,
              photos,
              alternativePhotos: photos.slice(1).map((url, i) => ({
                url,
                caption: `${place.displayName?.text || cleanTitle} - View ${i + 2}`,
                source: "Google Maps",
                sourceType: "official_website"
              }))
            };
            photoCache.set(cacheKey, result);
            return result;
          }
        }
      }
    } catch (err) {
      console.log("Google Maps Places API photo fetch failed, falling back.");
    }
    try {
      const scraped = await fetchPinterestPlacePhoto(cleanTitle, location, cleanCity);
      if (scraped && scraped.url) {
        photoCache.set(cacheKey, scraped);
        return scraped;
      }
    } catch (err) {
      console.log("Pinterest image fetch encountered an issue, using curated fallback.");
    }
    return null;
  }
  let aiClient = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not configured.");
      }
      aiClient = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
    return aiClient;
  }
  app.get("/api/photo", async (req, res) => {
    try {
      const title = req.query.title;
      const location = req.query.location || "";
      const city = req.query.city || "";
      if (!title) return res.status(400).json({ error: "Missing title" });
      const photo = await fetchRealPlacePhoto(String(title), String(location), String(city));
      return res.json({ photo });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch photo" });
    }
  });
  app.post("/api/plan/generate", async (req, res) => {
    try {
      const {
        destination,
        occasion,
        durationDays = 3,
        startDate,
        endDate,
        travelersCount = 2,
        travelerType = "Couple",
        budget = "Moderate",
        pace = "Balanced",
        dietary = [],
        interests = [],
        specialRequirements = "",
        mustHaveInterests = [],
        avoidInterests = [],
        homeBase = "",
        homeBaseCoords,
        morningDepartureTime = "09:00 AM",
        eveningReturnTime = "10:00 PM"
      } = req.body;
      if (!destination || typeof destination !== "string" || !destination.trim()) {
        return res.status(400).json({ error: "Destination is required." });
      }
      const ai = getGeminiClient();
      const prompt = `You are a world-class travel guide and itinerary architect.
Plan a highly detailed, realistic, and tailored ${durationDays}-day trip to ${destination}.

Trip Preferences:
- Destination: ${destination}
- Occasion: ${occasion || "Leisure / Vacation"}
- Duration: ${durationDays} days
- Group Size: ${travelersCount} travelers (${travelerType})
- Budget Level: ${budget}
- Travel Pace: ${pace}
- Dietary Preferences: ${dietary.length > 0 ? dietary.join(", ") : "Local cuisine, open to anything"}
- Interests & Hobbies: ${interests.length > 0 ? interests.join(", ") : "Sightseeing, food, iconic culture"}
${mustHaveInterests.length > 0 ? `- HIGH PRIORITY MUST-HAVE EXPERIENCES (\u2B50): ${mustHaveInterests.join(", ")}` : ""}
${avoidInterests.length > 0 ? `- STRICTLY AVOID & FILTER OUT (\u2715): ${avoidInterests.join(", ")} (Do NOT suggest these types of venues/activities)` : ""}
${specialRequirements ? `- Special Notes/Requests: ${specialRequirements}` : ""}
${homeBase ? `
MANDATORY ANCHOR NODES & HARD ROUTING CONSTRAINTS:
1. ANCHOR NODE A (Day Starting Point & Morning Departure):
   - The traveler's accommodation / home base is: "${homeBase}".
   - Morning Departure Time: STRICTLY ${morningDepartureTime}.
   - Every single day MUST begin with the traveler departing from "${homeBase}" at ${morningDepartureTime}. The first activity or transit step must directly originate from this base.
2. ANCHOR NODE Z (Day Concluding Point & Mandatory Transit Buffer):
   - The traveler MUST walk through their accommodation door back at "${homeBase}" by no later than ${eveningReturnTime}.
   - MANDATORY TRANSIT BUFFER: You MUST calculate realistic travel time from the final evening activity back to "${homeBase}" (via walking, metro, or taxi). The final activity must end early enough so they travel back and are safely inside ${homeBase} by ${eveningReturnTime}.
   - End each day's schedule with a distinct concluding step: "Return to ${homeBase} & Evening Wind Down" scheduled around ${eveningReturnTime}.
` : ""}

CRITICAL REQUIREMENTS:
1. Ground your recommendations in current real-world details using Google Search for ${destination}. Check real places, popular and top-rated restaurants, realistic transportation methods (subway lines, bus routes, walking times, train passes, airport transfers), opening hours, and practical tips.
2. For EVERY single day (Day 1 through Day ${durationDays}), provide:
   - Day theme & descriptive overview.
   - Chronological schedule items covering Morning, Afternoon, Evening, and Night.
   - Categorize each schedule item precisely as one of: "place", "food", "activity", or "transport".
   - For "food": specify exact restaurant/cafe name, meal type (breakfast/lunch/dinner/snack), signature dishes, price range, and whether reservations are recommended.
   - For "transport": specify exact transit mode (metro line, walking, ferry, bus, taxi), departure/arrival spots, transit duration, and approximate fare.
   - For "place": specify landmark/attraction name, address/neighborhood, entry cost/ticketing tip, best time to visit, and approximate coordinates (lat, lng).
   - For "activity": specify curated activity (e.g. cooking class, sunset cruise, temple tour, shopping street exploration), duration, and booking advice.
3. Include comprehensive Local Transportation advice (metro passes, taxi apps like Grab/Uber/local taxi, airport connection, ticketing advice).
4. Include Weather & Seasonal summary, Packing Checklist, and Estimated Budget breakdown.

OUTPUT FORMAT:
You MUST respond with a single valid JSON object strictly matching this schema (do NOT wrap in extra prose, just valid JSON or a \`\`\`json markdown block):

{
  "destination": "${destination}",
  "occasion": "${occasion || "Vacation"}",
  "durationDays": ${durationDays},
  "travelersCount": ${travelersCount},
  "travelerType": "${travelerType}",
  "budget": "${budget}",
  "pace": "${pace}",
  "overview": "Rich 2-3 paragraph overview of the curated journey",
  "weatherSummary": "Real seasonal weather expectations and what to wear",
  "currencyAndCostEstimate": {
    "currency": "Local currency and USD equivalent",
    "estimatedTotalPerPerson": "$XXX - $YYY",
    "breakdown": "Daily food ~$X, transit ~$Y, attractions ~$Z"
  },
  "transportationGuide": {
    "overview": "General transit advice for the city",
    "recommendedPasses": "Specific transit cards or passes (e.g. Suica, Navigo, MetroCard)",
    "metroBusTips": "Tips on navigating local trains, metros, or buses",
    "airportTransfer": "Best way to get from the main airport to central city",
    "rideSharing": "Local taxi/ride apps recommended (e.g. Uber, Grab, Bolt, KakaoT)"
  },
  "packingAndPrepTips": [
    "Tip 1",
    "Tip 2",
    "Tip 3",
    "Tip 4"
  ],
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1: Theme Title",
      "summary": "Short summary of the day's focus",
      "schedule": [
        {
          "id": "d1-s1",
          "time": "08:30 AM",
          "timeSlot": "morning",
          "title": "Breakfast at Specific Cafe",
          "category": "food",
          "description": "Description of why to visit and what to experience",
          "location": "District or specific address",
          "duration": "1 hour",
          "costEstimate": "$10 - $15",
          "tips": "Try the freshly baked croissants",
          "coordinates": { "lat": 0.0, "lng": 0.0 },
          "foodDetail": {
            "mealType": "breakfast",
            "cuisine": "French Bakery",
            "recommendedDishes": ["Croissant", "Cafe au lait"],
            "priceRange": "$$",
            "reservationNeeded": false
          }
        },
        {
          "id": "d1-s2",
          "time": "09:45 AM",
          "timeSlot": "morning",
          "title": "Metro from Cafe to Landmark",
          "category": "transport",
          "description": "Take Line 1 from Station A to Station B",
          "location": "Metro Station",
          "duration": "20 mins",
          "costEstimate": "$2.15 (Single ticket)",
          "tips": "Tap with contactless credit card or transit pass",
          "transportDetail": {
            "mode": "subway",
            "route": "Line 1 Eastbound",
            "duration": "20 mins",
            "cost": "$2.15"
          }
        },
        {
          "id": "d1-s3",
          "time": "10:15 AM",
          "timeSlot": "morning",
          "title": "Explore Landmark Name",
          "category": "place",
          "description": "Deep dive into history and key spots to see",
          "location": "Exact address or district",
          "duration": "2.5 hours",
          "costEstimate": "\u20AC17 / Free gardens",
          "tips": "Book timed-entry slot online in advance",
          "coordinates": { "lat": 0.0, "lng": 0.0 }
        }
      ]
    }
  ]
}`;
      const attempts = [
        { model: "gemini-1.5-flash" },
        { model: "gemini-2.0-flash" },
        { model: "gemini-1.5-pro" }
      ];
      let response = null;
      let lastError = null;
      for (const attempt of attempts) {
        try {
          const config = {
            systemInstruction: "You are an elite travel planner and itinerary creator. Ground your answers in realistic, accurate real-world details. You MUST respond with a single valid JSON object strictly matching the requested trip plan schema.",
            responseMimeType: "application/json"
          };
          response = await ai.models.generateContent({
            model: attempt.model,
            contents: prompt,
            config
          });
          if (response && response.text) {
            console.log(`Successfully generated trip plan using model ${attempt.model}`);
            break;
          }
        } catch (callErr) {
          lastError = callErr;
          const errMsg = callErr?.message || String(callErr);
          console.log(
            `Attempt with model ${attempt.model} encountered: ${errMsg.slice(0, 120)}... trying next available model in cascade.`
          );
        }
      }
      if (!response || !response.text) {
        console.log("All Gemini API attempts returned unavailable. Invoking rich tailored offline itinerary generator.");
        const fallbackPlan = generateFallbackTripPlan({
          destination,
          occasion,
          durationDays,
          travelersCount,
          travelerType,
          budget,
          pace,
          dietary,
          interests,
          specialRequirements,
          homeBase,
          homeBaseCoords,
          morningDepartureTime,
          eveningReturnTime
        });
        return res.json({
          success: true,
          plan: fallbackPlan,
          quotaExceeded: true,
          warning: "Gemini API temporarily busy. A full curated itinerary was generated for your destination."
        });
      }
      const responseText = response.text || "";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = [];
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri
          });
        }
      }
      let planData;
      try {
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/```\s*([\s\S]*?)\s*```/);
        const cleanString = jsonMatch ? jsonMatch[1].trim() : responseText.trim();
        planData = JSON.parse(cleanString);
      } catch (parseError) {
        console.log("JSON parse retry, attempting substring extraction.");
        const firstBrace = responseText.indexOf("{");
        const lastBrace = responseText.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          const slice = responseText.substring(firstBrace, lastBrace + 1);
          planData = JSON.parse(slice);
        } else {
          console.log("Model response unparseable. Providing rich fallback plan.");
          const fallbackPlan = generateFallbackTripPlan({
            destination,
            occasion,
            durationDays,
            travelersCount,
            travelerType,
            budget,
            pace,
            dietary,
            interests,
            specialRequirements,
            homeBase,
            homeBaseCoords,
            morningDepartureTime,
            eveningReturnTime
          });
          return res.json({ success: true, plan: fallbackPlan });
        }
      }
      planData.sources = sources;
      planData.createdAt = (/* @__PURE__ */ new Date()).toISOString();
      if (startDate) planData.startDate = startDate;
      if (endDate) planData.endDate = endDate;
      if (homeBase) planData.homeBase = homeBase;
      if (homeBaseCoords) planData.homeBaseCoords = homeBaseCoords;
      if (morningDepartureTime) planData.morningDepartureTime = morningDepartureTime;
      if (eveningReturnTime) planData.eveningReturnTime = eveningReturnTime;
      if (planData && Array.isArray(planData.days)) {
        const photoPromises = [];
        planData.days.forEach((day) => {
          if (Array.isArray(day.schedule)) {
            day.schedule.forEach((item, idx) => {
              item.coordinates = resolvePlaceCoordinates(item, planData.destination || destination, idx);
              const photo = getLandmarkPhoto(item, planData.destination || destination);
              item.imageUrl = photo.url;
              item.photoCaption = photo.caption;
              item.photoSource = photo.source;
              item.photoSourceType = photo.sourceType;
              item.officialWebsiteUrl = photo.officialWebsiteUrl;
              item.tripAdvisorUrl = photo.tripAdvisorUrl;
              item.alternativePhotos = photo.alternativePhotos;
              item.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.title} ${item.location || ""} ${planData.destination || destination}`.trim())}`;
              if (item.category !== "transport" && item.category !== "lodging") {
                photoPromises.push(async () => {
                  try {
                    await new Promise((r) => setTimeout(r, Math.random() * 2500));
                    const live = await fetchRealPlacePhoto(item.title, item.location, planData.destination || destination);
                    if (live && live.url) {
                      item.imageUrl = live.url;
                      item.photoCaption = live.caption;
                      item.photoSource = live.source || "Pinterest";
                      item.photoSourceType = live.sourceType || "pinterest";
                      if (live.photos && live.photos.length > 0) item.photos = live.photos;
                      if (live.alternativePhotos && live.alternativePhotos.length > 0) item.alternativePhotos = live.alternativePhotos;
                      if (live.officialWebsiteUrl && !item.officialWebsiteUrl) item.officialWebsiteUrl = live.officialWebsiteUrl;
                      if (live.tripAdvisorUrl && !item.tripAdvisorUrl) item.tripAdvisorUrl = live.tripAdvisorUrl;
                    }
                  } catch (e) {
                  }
                });
              }
            });
          }
        });
        if (photoPromises.length > 0) {
          const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 25e3));
          await Promise.race([Promise.allSettled(photoPromises.map((fn) => typeof fn === "function" ? fn() : fn)), timeoutPromise]);
        }
      }
      return res.json({ success: true, plan: planData });
    } catch (err) {
      console.log("Trip generation error caught, invoking safe fallback generator:", err?.message || err);
      try {
        const fallbackPlan = generateFallbackTripPlan({
          destination: req.body?.destination || "Tokyo, Japan",
          occasion: req.body?.occasion || "Vacation / Leisure",
          durationDays: req.body?.durationDays || 3,
          travelersCount: req.body?.travelersCount || 2,
          travelerType: req.body?.travelerType || "Couple",
          budget: req.body?.budget || "Moderate",
          pace: req.body?.pace || "Balanced",
          dietary: req.body?.dietary || [],
          interests: req.body?.interests || [],
          specialRequirements: req.body?.specialRequirements || "",
          homeBase: req.body?.homeBase || "",
          homeBaseCoords: req.body?.homeBaseCoords,
          morningDepartureTime: req.body?.morningDepartureTime || "09:00 AM",
          eveningReturnTime: req.body?.eveningReturnTime || "10:00 PM"
        });
        if (fallbackPlan && Array.isArray(fallbackPlan.days)) {
          const photoPromises = [];
          fallbackPlan.days.forEach((day) => {
            if (Array.isArray(day.schedule)) {
              day.schedule.forEach((item, idx) => {
                item.coordinates = resolvePlaceCoordinates(item, fallbackPlan.destination || req.body?.destination, idx);
                const photo = getLandmarkPhoto(item, fallbackPlan.destination || req.body?.destination);
                item.imageUrl = photo.url;
                item.photoCaption = photo.caption;
                if (item.category !== "transport" && item.category !== "lodging") {
                  photoPromises.push(async () => {
                    try {
                      await new Promise((r) => setTimeout(r, Math.random() * 2500));
                      const live = await fetchRealPlacePhoto(item.title, item.location, fallbackPlan.destination || req.body?.destination);
                      if (live && live.url) {
                        item.imageUrl = live.url;
                        item.photoSource = live.source || "Pinterest";
                        item.photoSourceType = live.sourceType || "pinterest";
                      }
                    } catch (e) {
                    }
                  });
                }
              });
            }
          });
          if (photoPromises.length > 0) {
            const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 25e3));
            await Promise.race([Promise.allSettled(photoPromises.map((fn) => typeof fn === "function" ? fn() : fn)), timeoutPromise]);
          }
        }
        return res.json({
          success: true,
          plan: fallbackPlan,
          quotaExceeded: true,
          warning: "Gemini API temporarily unavailable or quota exceeded (HTTP 429). A full curated itinerary was provided."
        });
      } catch (fallbackErr) {
        return res.status(500).json({
          error: err?.message || "Failed to generate trip plan. Please verify the Gemini API key and try again."
        });
      }
    }
  });
  app.post("/api/plan/regenerate-item", async (req, res) => {
    try {
      const { destination, currentItem, category, reason } = req.body;
      let itemData = null;
      try {
        const ai = getGeminiClient();
        const prompt = `For a trip in ${destination}, suggest 1 alternative recommendation to replace:
Current Item: "${currentItem?.title}" (${currentItem?.category})
Category needed: ${category || currentItem?.category}
User note / reason for change: ${reason || "Different alternative recommendation"}

Provide a single JSON object matching:
{
  "title": "New Title",
  "category": "${category || currentItem?.category}",
  "description": "Concise appealing description",
  "location": "Address or neighborhood in ${destination}",
  "duration": "1.5 hours",
  "costEstimate": "$10 - $25",
  "tips": "Practical tip",
  "foodDetail": { "mealType": "lunch", "cuisine": "Local", "recommendedDishes": ["dish"], "priceRange": "$$", "reservationNeeded": false },
  "transportDetail": { "mode": "subway", "route": "Line 2", "duration": "15m", "cost": "$2" }
}`;
        const modelList = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
        for (const mod of modelList) {
          try {
            const response = await ai.models.generateContent({
              model: mod,
              contents: prompt,
              config: {
                responseMimeType: "application/json"
              }
            });
            const responseText = response.text || "";
            const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            const cleanString = jsonMatch ? jsonMatch[1].trim() : responseText.trim();
            const firstBrace = cleanString.indexOf("{");
            const lastBrace = cleanString.lastIndexOf("}");
            if (firstBrace !== -1 && lastBrace !== -1) {
              itemData = JSON.parse(cleanString.substring(firstBrace, lastBrace + 1));
              break;
            }
          } catch (modelErr) {
            const errStr = modelErr?.message || String(modelErr);
            console.log(`regenerate-item model ${mod} returned: ${errStr.slice(0, 100)}... trying next fallback.`);
          }
        }
      } catch (geminiErr) {
        console.log("Gemini client fallback engaged for item regeneration.");
      }
      if (!itemData) {
        itemData = generateFallbackItem(destination, currentItem, category, reason);
      }
      if (itemData) {
        itemData.coordinates = resolvePlaceCoordinates(itemData, destination);
        const photo = getLandmarkPhoto(itemData, destination);
        itemData.imageUrl = photo.url;
        itemData.photoCaption = photo.caption;
        itemData.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${itemData.title} ${itemData.location || ""} ${destination}`.trim())}`;
        try {
          const live = await fetchRealPlacePhoto(itemData.title, itemData.location, destination);
          if (live && live.url) {
            itemData.imageUrl = live.url;
            itemData.photoCaption = live.caption;
            itemData.photoSource = "Pinterest";
            itemData.photoSourceType = "pinterest";
            if (live.photos) itemData.photos = live.photos;
            if (live.alternativePhotos) itemData.alternativePhotos = live.alternativePhotos;
          }
        } catch {
        }
      }
      return res.json({ success: true, item: itemData });
    } catch (err) {
      console.log("Error in regenerating item, using fallback:", err?.message || err);
      const fallbackItem = generateFallbackItem(req.body?.destination || "Destination", req.body?.currentItem, req.body?.category, req.body?.reason);
      return res.json({ success: true, item: fallbackItem });
    }
  });
  app.get("/api/place-photo", async (req, res) => {
    try {
      const query = (req.query.query || req.query.place || req.query.q || "").trim();
      const city = req.query.city || "";
      const location = req.query.location || "";
      if (!query) {
        return res.status(400).json({ error: "Place query parameter is required." });
      }
      const curated = getLandmarkPhoto({ title: query, location }, city);
      if (curated.isVerifiedLandmark) {
        return res.json({
          success: true,
          photo: {
            url: curated.url,
            caption: curated.caption,
            source: curated.source,
            sourceType: curated.sourceType,
            officialWebsiteUrl: curated.officialWebsiteUrl,
            tripAdvisorUrl: curated.tripAdvisorUrl,
            alternativePhotos: curated.alternativePhotos,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${location} ${city}`.trim())}`
          }
        });
      }
      const livePhoto = await fetchRealPlacePhoto(query, location, city);
      if (livePhoto) {
        return res.json({ success: true, photo: livePhoto });
      }
      return res.json({
        success: true,
        photo: {
          url: curated.url,
          caption: curated.caption,
          source: curated.source,
          sourceType: curated.sourceType,
          officialWebsiteUrl: curated.officialWebsiteUrl,
          tripAdvisorUrl: curated.tripAdvisorUrl,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${location} ${city}`.trim())}`
        }
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch place photo" });
    }
  });
  app.get("/api/pinterest/search", async (req, res) => {
    try {
      const q = req.query.q || req.query.query || "";
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
      if (!q || !q.trim()) {
        return res.status(400).json({ error: "Query parameter 'q' is required." });
      }
      const pins = await scrapePinterestPins(q, { limit });
      return res.json({
        success: true,
        query: q,
        count: pins.length,
        pins
      });
    } catch (err) {
      console.error("Pinterest scraping endpoint error:", err);
      return res.status(500).json({
        error: "Failed to scrape Pinterest pins",
        message: err?.message || String(err)
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Trip Planner server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
