import { TripPlan } from '../types';

export function generateFlutterDartCode(plan: TripPlan): string {
  const sanitizedDest = plan.destination.replace(/'/g, "\\'");
  const daysCount = plan.days.length;

  return `// Flutter 3.x / Material 3 Trip Planner Itinerary Screen
// Generated automatically from Gemini Trip Planner
import 'package:flutter/material.dart';

void main() {
  runApp(const TripPlannerApp());
}

class TripPlannerApp extends StatelessWidget {
  const TripPlannerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${sanitizedDest} Trip',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0F766E),
          brightness: Brightness.light,
        ),
        fontFamily: 'Roboto',
      ),
      home: const ItineraryScreen(),
    );
  }
}

class ItineraryScreen extends StatefulWidget {
  const ItineraryScreen({super.key});

  @override
  State<ItineraryScreen> createState() => _ItineraryScreenState();
}

class _ItineraryScreenState extends State<ItineraryScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedCategory = 'all';

  final Map<String, dynamic> tripData = {
    'destination': '${sanitizedDest}',
    'occasion': '${plan.occasion}',
    'durationDays': ${daysCount},
    'travelersCount': ${plan.travelersCount},
    'travelerType': '${plan.travelerType}',
    'budget': '${plan.budget}',
    'pace': '${plan.pace}',
    'currency': '${plan.currencyAndCostEstimate?.currency ?? "USD"}',
    'totalEstimate': '${plan.currencyAndCostEstimate?.estimatedTotalPerPerson ?? ""}',
  };

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: ${daysCount}, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${sanitizedDest}',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            Text(
              '${plan.occasion} • ${plan.travelersCount} Travelers (${plan.travelerType})',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          tabs: [
            for (int i = 1; i <= ${daysCount}; i++)
              Tab(text: 'Day \$i'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
${plan.days.map((d, i) => `          _buildDaySchedule(context, dayIndex: ${i}),`).join('\n')}
        ],
      ),
    );
  }

  Widget _buildDaySchedule(BuildContext context, {required int dayIndex}) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        Card(
          elevation: 0,
          color: Theme.of(context).colorScheme.surfaceContainerHighest,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                const Icon(Icons.wb_sunny_outlined, color: Colors.orange),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    '${plan.weatherSummary.replace(/'/g, "\\'")}',
                    style: const TextStyle(fontSize: 13),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        // Schedule items timeline
        for (final item in _getDayItems(dayIndex))
          _buildTimelineCard(context, item),
      ],
    );
  }

  List<Map<String, dynamic>> _getDayItems(int dayIndex) {
    final allDays = [
${plan.days.map(d => `      [
${d.schedule.map(s => `        {
          'time': '${s.time}',
          'category': '${s.category}',
          'title': '${s.title.replace(/'/g, "\\'")}',
          'location': '${s.location.replace(/'/g, "\\'")}',
          'description': '${s.description.replace(/'/g, "\\'")}',
          'duration': '${s.duration}',
          'cost': '${(s.costEstimate || "").replace(/'/g, "\\'")}',
          'tips': '${(s.tips || "").replace(/'/g, "\\'")}',
        },`).join('\n')}
      ],`).join('\n')}
    ];
    return allDays[dayIndex];
  }

  Widget _buildTimelineCard(BuildContext context, Map<String, dynamic> item) {
    IconData icon;
    Color iconColor;
    switch (item['category']) {
      case 'transport':
        icon = Icons.directions_subway_filled;
        iconColor = Colors.indigo;
        break;
      case 'food':
        icon = Icons.restaurant_menu;
        iconColor = Colors.amber.shade800;
        break;
      case 'place':
        icon = Icons.place;
        iconColor = Colors.emerald ?? Colors.green;
        break;
      default:
        icon = Icons.local_activity;
        iconColor = Colors.purple;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 14.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: iconColor, size: 20),
                const SizedBox(width: 8),
                Text(
                  item['time'] ?? '',
                  style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                ),
                const Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: iconColor.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    (item['category'] as String).toUpperCase(),
                    style: TextStyle(color: iconColor, fontSize: 11, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              item['title'] ?? '',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                const Icon(Icons.location_on_outlined, size: 14, color: Colors.grey),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    item['location'] ?? '',
                    style: const TextStyle(color: Colors.grey, fontSize: 12),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              item['description'] ?? '',
              style: const TextStyle(fontSize: 13, height: 1.4),
            ),
            if (item['tips'] != null && (item['tips'] as String).isNotEmpty) ...[
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.amber.shade50,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.lightbulb_outline, size: 16, color: Colors.amber),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        item['tips'],
                        style: TextStyle(fontSize: 12, color: Colors.amber.shade900),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
`;
}
