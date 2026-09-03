import { TripPlan } from '../types';

export const SAMPLE_TRIPS: TripPlan[] = [
  {
    destination: "Tokyo, Japan",
    occasion: "Friends Getaway",
    durationDays: 3,
    startDate: "2026-09-04",
    travelersCount: 4,
    travelerType: "Group of Friends",
    budget: "Moderate",
    pace: "Balanced",
    overview: "A high-energy 3-day exploration designed for a group of friends, balancing hyper-modern neon districts, historic shrines, legendary ramen and street food alleys, and scenic viewpoints across Tokyo's most vibrant neighborhoods.",
    weatherSummary: "Mild and pleasant, around 18°C–23°C. Comfortable walking shoes and light layering with an umbrella are recommended.",
    currencyAndCostEstimate: {
      currency: "JPY (Japanese Yen, approx ¥150 = $1 USD)",
      estimatedTotalPerPerson: "$420 - $580 USD (excluding flights/hotel)",
      breakdown: "Daily food: ~$40–60, Transit: ~$12, Attractions & Activities: ~$35, Souvenirs & Misc: ~$30"
    },
    transportationGuide: {
      overview: "Tokyo boasts the world's most efficient public rail and subway network. Trains run with near-zero delays until midnight.",
      recommendedPasses: "Suica or Pasmo digital card (added to Apple/Google Wallet) or Tokyo Subway 72-hour Tourist Ticket (¥1,500).",
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
            costEstimate: "¥1,100 - ¥1,500 (~$8 - $11)",
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
            category: "place",
            description: "Tokyo's oldest and most iconic Buddhist temple, passing through the grand Kaminarimon (Thunder Gate) and sampling fresh ningyo-yaki treats.",
            location: "2-3-1 Asakusa, Taito City",
            duration: "1.5 hours",
            costEstimate: "Free (¥100 for Omikuji fortune)",
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
            costEstimate: "¥210 (~$1.40)",
            tips: "Use IC card (Suica/Pasmo) for instant tap-and-go entry.",
            transportDetail: {
              mode: "train",
              route: "Tsukuba Express (Rapid)",
              duration: "8 mins ride + 7 mins transfer",
              cost: "¥210"
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
            costEstimate: "¥500 - ¥1,500 for arcade tokens",
            tips: "Bring 100-yen coins for arcade machines and UFO crane games."
          },
          {
            id: "tokyo-d1-5",
            time: "01:30 PM",
            timeSlot: "afternoon",
            title: "Lunch at Kyushu Jangara Ramen Akihabara",
            category: "food",
            description: "Beloved ramen counter serving rich Tonkotsu pork broth topped with melt-in-your-mouth Kakuni pork belly and marinated eggs.",
            location: "3-11-6 Sotokanda, Chiyoda City",
            duration: "45 mins",
            costEstimate: "¥1,200 - ¥1,600 (~$9 - $12)",
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
            costEstimate: "¥180 (~$1.20)",
            transportDetail: {
              mode: "train",
              route: "JR Chuo-Sobu Line Local",
              duration: "16 mins",
              cost: "¥180"
            }
          },
          {
            id: "tokyo-d1-7",
            time: "04:30 PM",
            timeSlot: "evening",
            title: "Tokyo Metropolitan Government Building Observation Deck",
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
            category: "food",
            description: "Atmospheric lantern-lit alleyway packed with intimate yakitori stalls grilling skewers over binchotan charcoal.",
            location: "1-2 Nishishinjuku, Shinjuku City",
            duration: "2 hours",
            costEstimate: "¥3,000 - ¥4,500 per person (~$20 - $30)",
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
            category: "food",
            description: "Housed in a converted 1930s public bathhouse, serving legendary Kurobuta black pork tonkatsu that cuts with chopsticks.",
            location: "4-8-5 Jingumae, Shibuya City",
            duration: "1 hour",
            costEstimate: "¥2,000 - ¥3,500 (~$14 - $24)",
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
            costEstimate: "¥2,200 (~$15 per person)",
            tips: "Must reserve tickets online in advance; outdoor bags must be stowed in ¥100 lockers.",
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
            costEstimate: "¥210",
            transportDetail: {
              mode: "subway",
              route: "Tokyo Metro Hanzomon Line -> Hibiya Line",
              duration: "18 mins",
              cost: "¥210"
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
            costEstimate: "¥4,500 - ¥6,000 per person (~$30 - $40)",
            tips: "Book 1–2 weeks ahead for table seating for 4.",
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
            costEstimate: "¥390 (~$2.60)",
            tips: "Grab seats in the front car for floor-to-ceiling panoramic views.",
            transportDetail: {
              mode: "train",
              route: "Yurikamome Line Waterfront Transit",
              duration: "28 mins",
              cost: "¥390"
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
            costEstimate: "¥3,800 (~$25 per person)",
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
            costEstimate: "¥2,500 - ¥3,500 per person (~$17 - $24)",
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
            costEstimate: "¥300 garden entry + ¥850 for matcha tea set",
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
            costEstimate: "¥3,000 - ¥4,500 per person (~$20 - $30)",
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
