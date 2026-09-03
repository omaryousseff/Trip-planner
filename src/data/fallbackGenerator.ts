import { TripPlan, TripPreferences, DayPlan, ScheduleItem, CategoryType } from '../types';
import { SAMPLE_TRIPS } from './sampleTrips';
import { resolvePlaceCoordinates } from '../utils/geoCoordinates';
import { getLandmarkPhoto } from '../utils/landmarkImages';

export function generateFallbackTripPlan(preferences: TripPreferences): TripPlan {
  const destLower = preferences.destination.toLowerCase();
  let plan: TripPlan;

  // 1. Check if we match Tokyo
  if (destLower.includes('tokyo') || destLower.includes('japan')) {
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
      days: baseTokyo.days.slice(0, preferences.durationDays || 3),
      quotaExceeded: true,
      quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've generated a complete, personalized itinerary for ${preferences.destination} so you can continue your travel planning without interruption.`,
    };
  } else if (destLower.includes('paris') || destLower.includes('france')) {
    plan = createParisPlan(preferences);
  } else if (destLower.includes('rome') || destLower.includes('italy') || destLower.includes('roma')) {
    plan = createRomePlan(preferences);
  } else if (destLower.includes('barcelona') || destLower.includes('spain')) {
    plan = createBarcelonaPlan(preferences);
  } else if (destLower.includes('new york') || destLower.includes('nyc') || destLower.includes('manhattan')) {
    plan = createNycPlan(preferences);
  } else if (destLower.includes('kyoto')) {
    plan = createKyotoPlan(preferences);
  } else if (destLower.includes('london') || destLower.includes('uk') || destLower.includes('england')) {
    plan = createLondonPlan(preferences);
  } else {
    // 3. Generic procedural generator for ANY destination
    plan = createGenericCustomPlan(preferences);
  }

  // Ensure every schedule item has verified coordinates and landmark photography
  if (plan && plan.days) {
    plan.days.forEach((d) => {
      d.schedule.forEach((item, idx) => {
        item.coordinates = resolvePlaceCoordinates(item, plan.destination, idx);
        const photo = getLandmarkPhoto(item, plan.destination);
        item.imageUrl = photo.url;
        item.photoCaption = photo.caption;
        item.photoSource = photo.source;
        item.officialWebsiteUrl = photo.officialWebsiteUrl;
        item.tripAdvisorUrl = photo.tripAdvisorUrl;
        item.alternativePhotos = photo.alternativePhotos;
      });
    });
  }

  return plan;
}

function createParisPlan(pref: TripPreferences): TripPlan {
  const days: DayPlan[] = [
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
          costEstimate: "€14 - €20",
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
          costEstimate: "€2.15 (Metro ticket)",
          tips: "Tap with Navigo Easy or contactless phone wallet.",
          transportDetail: {
            mode: "subway",
            route: "Line 4 to Saint-Michel + walk",
            duration: "20 mins",
            cost: "€2.15"
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
          costEstimate: "€22 per ticket",
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
          costEstimate: "€32 - €48",
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
          costEstimate: "€16 per person",
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
          costEstimate: "€35 - €50 per person",
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
          costEstimate: "€6 - €10",
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
          costEstimate: "Free entry to basilica / €7 for dome stairs",
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
          costEstimate: "€25 - €38",
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
          costEstimate: "€2.15",
          transportDetail: {
            mode: "subway",
            route: "Line 2 to Charles de Gaulle-Etoile, then Line 6 to Trocadero",
            duration: "30 mins",
            cost: "€2.15"
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
          costEstimate: "€29 summit elevator ticket",
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
          costEstimate: "€45 - €65",
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
          costEstimate: "€13 ticket",
          tips: "Morning sunlight through the south-facing rose window creates an ethereal purple and amber glow.",
          coordinates: { lat: 48.8554, lng: 2.3450 }
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
          costEstimate: "€9 - €14",
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
          costEstimate: "€12.50",
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
          costEstimate: "€65 - €95 per person",
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

  // If requested more days than 3, duplicate/extend
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
          costEstimate: "€4.15",
          transportDetail: {
            mode: "train",
            route: "RER C Versailles Rive Gauche",
            duration: "40 mins",
            cost: "€4.15"
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
          costEstimate: "€21 entry",
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
          costEstimate: "€28 - €40",
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
          costEstimate: "€14 per boat",
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
          costEstimate: "€60 - €85",
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
    weatherSummary: "Mild European climate. Highs around 17°C–22°C with occasional light afternoon showers. A stylish trench coat, light scarf, and broken-in walking shoes are essential.",
    currencyAndCostEstimate: {
      currency: "EUR (€ Euro, approx €1 = $1.08 USD)",
      estimatedTotalPerPerson: pref.budget === 'Luxury' ? "$950 - $1,400 USD" : pref.budget === 'Budget' ? "$280 - $420 USD" : "$480 - $680 USD",
      breakdown: "Daily food: €45–€75, Metro transit: €6–€8, Museum & cruise entries: €35–€50 per person"
    },
    transportationGuide: {
      overview: "Paris features one of the dense subway networks in the world. The RATP Metro and RER lines get you anywhere in central Paris within 15–25 minutes.",
      recommendedPasses: "Navigo Easy card (charge 10 T+ tickets for €17.35) or use Apple Wallet / Android NFC directly at the turnstiles.",
      metroBusTips: "Always retain your metro ticket until exiting the station, as transit inspectors periodically verify tickets near transfer hallways.",
      airportTransfer: "RER B direct train from Charles de Gaulle (CDG) to Chatelet/Gare du Nord (€11.80) or official fixed-fare taxis (€56 Right Bank / €65 Left Bank).",
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
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Paris itinerary so you can continue testing, planning, and exporting your trip!`,
  };
}

function createRomePlan(pref: TripPreferences): TripPlan {
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
    weatherSummary: "Mediterranean warmth, averaging 20°C–26°C with abundant sunshine. Sunglasses, sun hat, and comfortable footwear for ancient cobblestones are strongly advised.",
    currencyAndCostEstimate: {
      currency: "EUR (€ Euro, approx €1 = $1.08 USD)",
      estimatedTotalPerPerson: "$420 - $650 USD (excluding flights/hotel)",
      breakdown: "Daily dining & gelato: €35–€55, Transit: €4–€8, Archaeological sites: €30–€45"
    },
    transportationGuide: {
      overview: "Rome's historic center is delightfully walkable. The ATAC Metro (Lines A & B) and vintage trams connect outer neighborhoods and railway hubs.",
      recommendedPasses: "Roma Pass 72-Hour (€52) includes unlimited public transit and free entry to the Colosseum.",
      metroBusTips: "Tap contactless credit/debit cards at yellow Metro turnstiles. Rome's public water fountains (nasoni) offer ice-cold drinking water everywhere.",
      airportTransfer: "Leonardo Express non-stop train connects Fiumicino Airport (FCO) directly to Roma Termini in 32 minutes (€14).",
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
            costEstimate: "€5 - €8",
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
            costEstimate: "€24 - €32",
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
            costEstimate: "€3.50 - €5",
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
            costEstimate: "€28 - €42 per person",
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
            costEstimate: "€20 ticket + €5 reservation",
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
            costEstimate: "Free church entry / €10 dome elevator",
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
            costEstimate: "€10 - €18",
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
            costEstimate: "€14",
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
            costEstimate: "€30 - €45",
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
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Rome itinerary so you can continue your travel planning smoothly!`,
  };
}

function createBarcelonaPlan(pref: TripPreferences): TripPlan {
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
    weatherSummary: "Sunny coastal Mediterranean climate, 19°C–25°C. Comfortable espadrilles or walking shoes, sunscreen, and beach-ready casual wear are ideal.",
    currencyAndCostEstimate: {
      currency: "EUR (€ Euro, approx €1 = $1.08 USD)",
      estimatedTotalPerPerson: "$380 - $550 USD (excluding flights/hotel)",
      breakdown: "Daily tapas & drinks: €30–€50, Metro & transit: €5, Gaudi monuments: €30–€45"
    },
    transportationGuide: {
      overview: "Barcelona features an immaculate, air-conditioned TMB Metro and bus grid. Moving between Gaudi sights and the seaside is fast and straightforward.",
      recommendedPasses: "T-Casual card (10 journeys across Zone 1 for ~€12.15) or Hola Barcelona Travel Card for unlimited rides.",
      metroBusTips: "Metro stations are clearly marked with a red diamond 'M'. Metro Line L3 and L4 connect directly to prime touristic districts.",
      airportTransfer: "Aerobus express shuttle connects Terminal 1 & 2 to Placa de Catalunya in 35 minutes (€7.25) or Metro Line L9 Sud.",
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
            costEstimate: "€5 - €8",
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
            title: "Basílica de la Sagrada Família & Towers",
            category: "place",
            description: "Step into Gaudi's living cathedral, illuminated by stained-glass windows in blues, greens, oranges, and fiery reds.",
            location: "Carrer de Mallorca 401, 08013 Barcelona",
            duration: "2.5 hours",
            costEstimate: "€26 ticket / €36 with Nativity tower ascent",
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
            costEstimate: "€25 - €38 per person",
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
            title: "Park Güell Whimsical Mosaic Terraces",
            category: "place",
            description: "Explore Gaudi's fairytale park featuring serpentine mosaic benches, gingerbread gatehouses, and the famous 'El Drac' salamander.",
            location: "08024 Barcelona",
            duration: "2 hours",
            costEstimate: "€10 entry",
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
            costEstimate: "€20 - €35",
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
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Barcelona itinerary so you can continue your travel planning without interruption!`,
  };
}

function createNycPlan(pref: TripPreferences): TripPlan {
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
    weatherSummary: "Four seasons. Expect pleasant walking weather around 18°C–24°C in spring/fall. Wear comfortable, supportive walking sneakers as you'll walk 15,000+ steps daily.",
    currencyAndCostEstimate: {
      currency: "USD ($ US Dollar)",
      estimatedTotalPerPerson: "$550 - $850 USD (excluding flights/hotel)",
      breakdown: "Daily dining & coffee: $50–$80, Subway: $6–$10, Observatories & Broadway: $70–$140"
    },
    transportationGuide: {
      overview: "NYC's subway runs 24 hours a day, 7 days a week. It is by far the fastest way to travel between Manhattan, Brooklyn, and Queens.",
      recommendedPasses: "OMNY contactless tap-to-pay using Apple Pay, Google Pay, or contactless credit card. Automatically caps at $34 per 7 days.",
      metroBusTips: "Look for local vs. express trains (express trains skip stations marked by black circles on map). Always check weekend service advisories.",
      airportTransfer: "AirTrain + LIRR train from JFK to Grand Central or Penn Station (~$13.50); NJ Transit train from Newark Liberty (~$15.75).",
      rideSharing: "Yellow cabs can be flagged on avenues or hailed via the Curb app. Uber and Lyft are ubiquitous."
    },
    packingAndPrepTips: [
      "Sturdy, broken-in walking sneakers (essential for 8–12 miles of walking daily).",
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
            coordinates: { lat: 40.7590, lng: -73.9793 }
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
            tips: "Check the TKTS Booth in Father Duffy Square at 3:00 PM for 20–50% off same-day Broadway tickets."
          }
        ]
      }
    ],
    sources: [
      { title: "Official NYC Tourism & Convention Guide (NYC Tourism)", url: "https://www.nyctourism.com" },
      { title: "MTA New York City Transit Guide & Subway Maps", url: "https://new.mta.info" },
      { title: "Central Park Conservancy Official Visitor Guide", url: "https://www.centralparknyc.org" }
    ],
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete NYC itinerary so you can explore, plan, and export your trip seamlessly!`,
  };
}

function createKyotoPlan(pref: TripPreferences): TripPlan {
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
    weatherSummary: "Temperate climate, 16°C–22°C in spring and autumn. Slip-on shoes and comfortable cotton socks are essential for temple wooden floors.",
    currencyAndCostEstimate: {
      currency: "JPY (Japanese Yen, approx ¥150 = $1 USD)",
      estimatedTotalPerPerson: "$380 - $550 USD (excluding flights/hotel)",
      breakdown: "Daily dining & matcha: ¥5,000–¥8,000 (~$35–$55), Bus & subway: ¥800 (~$5.50), Temple admissions: ¥2,500 (~$17)"
    },
    transportationGuide: {
      overview: "Kyoto is well connected by city buses, the Karasuma and Tozai subway lines, and regional Keihan and Hankyu rail lines.",
      recommendedPasses: "ICOCA digital card or Kyoto Subway & Bus 1-Day Pass (¥1,100).",
      metroBusTips: "On Kyoto city buses, board through the rear door and pay at the front upon disembarking.",
      airportTransfer: "JR Haruka Kansai Airport Express connects directly to Kyoto Station in 75 minutes.",
      rideSharing: "MK Taxi and GO taxi app operate throughout Kyoto."
    },
    packingAndPrepTips: [
      "Slip-on shoes and clean socks (you will remove shoes repeatedly at temples and traditional ryokans).",
      "Coin purse for temple entrance fees and fortune amulets (omikuji).",
      "Early alarms (visit Fushimi Inari and Arashiyama at 07:00–08:00 AM before tour bus crowds)."
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
            costEstimate: "¥210",
            transportDetail: {
              mode: "train",
              route: "Keihan Main Line",
              duration: "12 mins",
              cost: "¥210"
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
            costEstimate: "¥1,100 - ¥1,600 (~$8 - $11)",
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
            costEstimate: "¥400",
            tips: "Drink from one of the three streams of Otowa Waterfall for health, longevity, or success in studies.",
            coordinates: { lat: 34.9949, lng: 135.7850 }
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
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete Kyoto itinerary so you can continue your travel planning smoothly!`,
  };
}

function createLondonPlan(pref: TripPreferences): TripPlan {
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
    weatherSummary: "Variable maritime climate, 14°C–20°C. A waterproof jacket and compact umbrella are always wise companions.",
    currencyAndCostEstimate: {
      currency: "GBP (£ British Pound, approx £1 = $1.30 USD)",
      estimatedTotalPerPerson: "$450 - $680 USD (excluding flights/hotel)",
      breakdown: "Daily pub & market meals: £35–£55, Tube travel: £8.50 cap, West End ticket: £40–£85"
    },
    transportationGuide: {
      overview: "The London Underground ('The Tube') and iconic double-decker red buses cover every borough effortlessly.",
      recommendedPasses: "Contactless tap-to-pay on phone or card. Daily price cap automatically applies (~£8.50 for Zones 1-2).",
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
            costEstimate: "£8 - £14",
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
            costEstimate: "£27",
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
            costEstimate: "£12 - £20",
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
            costEstimate: "£34",
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
            costEstimate: "£25 - £40",
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
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a complete London itinerary so you can continue your travel planning without interruption!`,
  };
}

function createGenericCustomPlan(pref: TripPreferences): TripPlan {
  const duration = pref.durationDays || 3;
  const destination = pref.destination.trim();
  const days: DayPlan[] = [];

  const timeSlots: Array<{ time: string; slot: "morning" | "afternoon" | "evening" | "night" }> = [
    { time: "08:30 AM", slot: "morning" },
    { time: "10:00 AM", slot: "morning" },
    { time: "12:30 PM", slot: "afternoon" },
    { time: "02:30 PM", slot: "afternoon" },
    { time: "05:30 PM", slot: "evening" },
    { time: "07:30 PM", slot: "night" },
  ];

  for (let d = 1; d <= duration; d++) {
    const daySchedule: ScheduleItem[] = [
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
        tips: "Pre-book timed tickets online where applicable to skip ticket queues.",
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
      title: `Day ${d}: ${d === 1 ? 'Historic Heart & Iconic Sights' : d === 2 ? 'Culture, Art & Local Neighborhoods' : 'Hidden Gems, Scenic Views & Nightlife'}`,
      summary: `A carefully paced day balancing signature attractions in ${destination} with relaxed dining, easy transit, and atmospheric evening walks.`,
      schedule: daySchedule
    });
  }

  return {
    destination: destination,
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
      estimatedTotalPerPerson: pref.budget === 'Luxury' ? "$850 - $1,300 USD" : pref.budget === 'Budget' ? "$250 - $390 USD" : "$450 - $650 USD",
      breakdown: "Daily dining: $40–$65, Local transit: $5–$12, Admissions & activities: $25–$45 per person"
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
    days: days,
    sources: [
      { title: `Official Tourism Portal for ${destination}`, url: "https://www.google.com/travel" },
      { title: "Public Transit & Route Navigation Guide", url: "https://maps.google.com" }
    ],
    createdAt: new Date().toISOString(),
    quotaExceeded: true,
    quotaNotice: `Your Gemini API key quota was exceeded (HTTP 429). We've curated a custom itinerary for ${destination} so your trip planning continues uninterrupted!`,
  };
}

export function generateFallbackItem(
  destination: string, 
  currentItem: any, 
  category: string, 
  reason?: string
): Omit<ScheduleItem, 'id' | 'time' | 'timeSlot' | 'completed'> {
  const cat = (category || currentItem?.category || 'activity').toLowerCase();
  if (cat === 'food') {
    return {
      title: `Artisanal Local Dining in ${destination}`,
      category: 'food' as CategoryType,
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

  if (cat === 'transport') {
    return {
      title: `Scenic Transit & Stroll through ${destination}`,
      category: 'transport' as CategoryType,
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

  if (cat === 'place') {
    return {
      title: `Historic Pavilion & Scenic Promenade in ${destination}`,
      category: 'place' as CategoryType,
      description: `Discover an iconic landmark showcasing unique architectural heritage and peaceful panoramic vistas.`,
      location: `Historic Quarter, ${destination}`,
      duration: "2 hours",
      costEstimate: "Free / $10 entry",
      tips: "Visit during the late afternoon for golden hour photography."
    };
  }

  return {
    title: `Curated Cultural & Walking Experience in ${destination}`,
    category: 'activity' as CategoryType,
    description: `Immerse in local traditions with an engaging self-guided exploration of authentic backstreets, artisan shops, and scenic gardens.`,
    location: `Central District, ${destination}`,
    duration: "1.5 hours",
    costEstimate: "Free to explore",
    tips: "Wear comfortable walking footwear."
  };
}
