import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/trip_models.dart';

class TripDataService {
  static const String _storageKey = 'saved_trip_plans';
  static const String _activeTripKey = 'active_trip_id';

  // Rich sample trip featuring top 3 Pinterest photos for each landmark
  static TripPlan getDefaultTokyoTrip() {
    return TripPlan(
      id: 'tokyo-default-trip',
      destination: 'Tokyo, Japan',
      occasion: 'Vacation',
      durationDays: 3,
      travelersCount: 2,
      travelerType: 'Couple',
      budget: 'Moderate',
      pace: 'Balanced',
      interests: ['Food & Dining', 'Culture & Temples', 'Sightseeing', 'Shopping'],
      weatherSummary: 'Sunny & mild with pleasant evening breeze (18°C - 23°C). Excellent walking weather.',
      packingList: [
        'Comfortable walking sneakers',
        'Light evening cardigan',
        'Portable battery pack for navigation',
        'IC card (Suica/Pasmo) for metro trains',
        'Universal power adapter',
      ],
      currencyAndCostEstimate: CostEstimate(
        currency: 'JPY',
        estimatedTotalPerPerson: '¥48,000 (~$320 USD)',
        accommodationEstimate: '¥22,000 / night',
        foodAndDrinkEstimate: '¥6,500 / day',
        transportEstimate: '¥1,500 / day',
        activitiesEstimate: '¥3,000 / day',
      ),
      days: [
        DayPlan(
          day: 1,
          title: 'Historic Asakusa, Senso-ji & Sumida River Cruise',
          date: 'Day 1',
          summary: 'Explore old Tokyo, sample traditional street food on Nakamise-dori, and view the skyline.',
          schedule: [
            ScheduleItem(
              id: 'tokyo-sensoji',
              time: '09:00 AM',
              title: 'Senso-ji Temple & Nakamise-dori',
              description: 'Tokyo\'s oldest and most iconic Buddhist temple. Walk through the imposing Kaminarimon (Thunder Gate) and browse centuries-old craft and snack stalls along Nakamise.',
              location: 'Asakusa, Taito City, Tokyo',
              category: 'place',
              duration: '2.5 hours',
              costEstimate: 'Free entry (incense ¥100)',
              tips: 'Arrive early before 10 AM to take peaceful photos before tour groups arrive. Try warm ningyo-yaki cakes!',
              photos: [
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
            ScheduleItem(
              id: 'tokyo-lunch-tempura',
              time: '12:30 PM',
              title: 'Authentic Tempura Lunch at Daikokuya',
              description: 'Classic Edo-style deep-fried tempura served over fragrant rice with dark savory tare sauce, running since 1887.',
              location: '1-38-10 Asakusa, Taito City',
              category: 'food',
              duration: '1 hour',
              costEstimate: '¥2,200 / person',
              tips: 'Ask for the mixed tendon bowl with jumbo prawns and kakiage.',
              photos: [
                'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
            ScheduleItem(
              id: 'tokyo-skytree',
              time: '03:30 PM',
              title: 'Tokyo Skytree Panoramic Observation Deck',
              description: 'Ascend 350 meters above Tokyo for sweeping 360-degree vistas across Kanto Plain with Mount Fuji visible on clear days.',
              location: 'Oshiage, Sumida City, Tokyo',
              category: 'activity',
              duration: '2 hours',
              costEstimate: '¥3,100 ticket',
              tips: 'Time your ascent around golden hour for breathtaking sunset transitions.',
              photos: [
                'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
          ],
        ),
        DayPlan(
          day: 2,
          title: 'Meiji Jingu Forest, Harajuku & Neon Shibuya Crossing',
          date: 'Day 2',
          summary: 'From spiritual forest serenity to vibrant youth fashion and neon-lit Shibuya nightlife.',
          schedule: [
            ScheduleItem(
              id: 'tokyo-meiji',
              time: '09:00 AM',
              title: 'Meiji Jingu Shinto Shrine',
              description: 'Tranquil 170-acre evergreen forest sanctuary honoring Emperor Meiji and Empress Shoken. Walk beneath giant cedar torii gates.',
              location: 'Yoyogikamizonocho, Shibuya City',
              category: 'place',
              duration: '2 hours',
              costEstimate: 'Free',
              tips: 'Write an Ema wooden prayer tablet and check out the historic sake barrels.',
              photos: [
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
            ScheduleItem(
              id: 'tokyo-shibuya-crossing',
              time: '04:00 PM',
              title: 'Shibuya Crossing & Shibuya Sky',
              description: 'The world\'s busiest pedestrian intersection followed by Shibuya Sky rooftop deck with glass bottom sky edge.',
              location: 'Shibuya, Tokyo',
              category: 'activity',
              duration: '3 hours',
              costEstimate: '¥2,200',
              tips: 'Stand at Mag\'s Park rooftop for the ultimate top-down crossing video.',
              photos: [
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
          ],
        ),
        DayPlan(
          day: 3,
          title: 'Tsukiji Seafood Market, Ginza Art & teamLab Planets',
          date: 'Day 3',
          summary: 'Fresh tuna sushi breakfast, world-class architecture, and immersive digital art installations.',
          schedule: [
            ScheduleItem(
              id: 'tokyo-tsukiji',
              time: '08:30 AM',
              title: 'Tsukiji Outer Seafood Market',
              description: 'Lively culinary maze of 400+ street vendors slicing fresh sashimi, grilling A5 wagyu skewers, and serving tamagoyaki.',
              location: 'Tsukiji, Chuo City, Tokyo',
              category: 'food',
              duration: '2.5 hours',
              costEstimate: '¥3,500 for tasting walk',
              tips: 'Bring cash; most stalls prefer coins and small bills.',
              photos: [
                'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
            ScheduleItem(
              id: 'tokyo-teamlab',
              time: '02:00 PM',
              title: 'teamLab Planets TOKYO (Toyosu)',
              description: 'Body-immersive digital art museum where visitors walk barefoot through water, floating flower gardens, and crystal light rooms.',
              location: '6-1-16 Toyosu, Koto City',
              category: 'activity',
              duration: '2.5 hours',
              costEstimate: '¥3,800',
              tips: 'Wear pants that can be rolled up above your knees easily.',
              photos: [
                'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
              completed: false,
            ),
          ],
        ),
      ],
    );
  }

  // Load active trip or fallback
  static Future<TripPlan> loadActiveTrip() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = prefs.getString(_activeTripKey);
      if (jsonString != null && jsonString.isNotEmpty) {
        final map = jsonDecode(jsonString);
        return TripPlan.fromJson(map);
      }
    } catch (e) {
      // Fallback
    }
    return getDefaultTokyoTrip();
  }

  // Save trip locally
  static Future<void> saveActiveTrip(TripPlan plan) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = jsonEncode(plan.toJson());
      await prefs.setString(_activeTripKey, jsonString);
    } catch (e) {
      // Ignore
    }
  }
}
