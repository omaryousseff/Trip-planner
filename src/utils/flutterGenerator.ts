import { TripPlan } from '../types';

export function generateFlutterDartCode(plan: TripPlan): string {
  const sanitizedDest = plan.destination.replace(/'/g, "\\'");
  const daysCount = plan.days.length;

  return `// Flutter 3.x / Material 3 Trip Planner Itinerary Screen
// Generated automatically from Trip Planner
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
          seedColor: const Color(0xFFFF6B6B),
          primary: const Color(0xFFFF6B6B),
          secondary: const Color(0xFF4ECDC4),
          brightness: Brightness.light,
        ),
        scaffoldBackgroundColor: const Color(0xFFFAF7F2),
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
        backgroundColor: Colors.white,
        elevation: 0,
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '${sanitizedDest}',
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Color(0xFF2D241E)),
            ),
            Text(
              '${plan.occasion} • ${plan.travelersCount} Travelers (${plan.travelerType})',
              style: const TextStyle(fontSize: 12, color: Colors.grey),
            ),
          ],
        ),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          indicatorColor: const Color(0xFFFF6B6B),
          labelColor: const Color(0xFFFF6B6B),
          unselectedLabelColor: Colors.grey,
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
        // Weather Banner
        Card(
          elevation: 0,
          color: const Color(0xFFFFF9E6),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: const BorderSide(color: Color(0xFFFFE17D)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14.0),
            child: Row(
              children: [
                const Icon(Icons.wb_sunny_rounded, color: Color(0xFFF59E0B)),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    '${plan.weatherSummary.replace(/'/g, "\\'")}',
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF78350F)),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        // Schedule items timeline
        for (final item in _getDayItems(dayIndex))
          _buildPolaroidCard(context, item),
      ],
    );
  }

  List<Map<String, dynamic>> _getDayItems(int dayIndex) {
    final allDays = [
${plan.days.map(d => `      [
${d.schedule.map(s => {
  const pList = (s.photos && s.photos.length > 0) ? s.photos.slice(0, 3) : (s.imageUrl ? [s.imageUrl] : []);
  return `        {
          'time': '${s.time}',
          'category': '${s.category}',
          'title': '${s.title.replace(/'/g, "\\'")}',
          'location': '${s.location.replace(/'/g, "\\'")}',
          'description': '${s.description.replace(/'/g, "\\'")}',
          'duration': '${s.duration}',
          'cost': '${(s.costEstimate || "").replace(/'/g, "\\'")}',
          'tips': '${(s.tips || "").replace(/'/g, "\\'")}',
          'photos': [${pList.map(u => `'${u}'`).join(', ')}],
          'photoSource': '${(s.photoSource || "Pinterest").replace(/'/g, "\\'")}',
        },`;
}).join('\n')}
      ],`).join('\n')}
    ];
    return allDays[dayIndex];
  }

  Widget _buildPolaroidCard(BuildContext context, Map<String, dynamic> item) {
    IconData icon;
    Color iconColor;
    switch (item['category']) {
      case 'transport':
        icon = Icons.directions_subway;
        iconColor = const Color(0xFF3498DB);
        break;
      case 'food':
        icon = Icons.restaurant;
        iconColor = const Color(0xFFE67E22);
        break;
      case 'place':
        icon = Icons.place;
        iconColor = const Color(0xFF2ECC71);
        break;
      default:
        icon = Icons.local_activity;
        iconColor = const Color(0xFF9B59B6);
    }

    final List<dynamic> photos = item['photos'] ?? [];
    final firstPhoto = photos.isNotEmpty ? photos.first as String : null;

    return Card(
      margin: const EdgeInsets.only(bottom: 18.0),
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(color: Colors.black.withOpacity(0.08), width: 1.2),
      ),
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Image with Pinterest Attribution Badge
            if (firstPhoto != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(14),
                child: Stack(
                  children: [
                    Image.network(
                      firstPhoto,
                      height: 200,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      errorBuilder: (ctx, err, st) => Container(
                        height: 200,
                        color: Colors.grey.shade900,
                        child: const Center(child: Icon(Icons.broken_image, color: Colors.white)),
                      ),
                    ),
                    Positioned(
                      top: 8,
                      right: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.black87,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.camera_alt, color: Color(0xFFE60023), size: 12),
                            const SizedBox(width: 4),
                            Text(
                              '\${photos.length} Photos',
                              style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 8,
                      left: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: Colors.black.withOpacity(0.75),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          item['photoSource'] ?? 'Pinterest',
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

            const SizedBox(height: 12),

            Row(
              children: [
                Icon(icon, color: iconColor, size: 18),
                const SizedBox(width: 8),
                Text(
                  item['time'] ?? '',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
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
                    style: TextStyle(color: iconColor, fontSize: 10, fontWeight: FontWeight.w900),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              item['title'] ?? '',
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Color(0xFF2D241E)),
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
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: const Color(0xFFFFF8E7),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0xFFFFE17D)),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.lightbulb, size: 16, color: Color(0xFFD97706)),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        item['tips'],
                        style: const TextStyle(fontSize: 12, color: Color(0xFF78350F), fontWeight: FontWeight.w600),
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

export function generateGithubWorkflowYaml(): string {
  return `name: Build Flutter APK

on:
  push:
    branches: [ main, master ]
    tags:
      - 'v*'
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:
    inputs:
      build_type:
        description: 'Build Type (release or debug)'
        required: true
        default: 'release'
        type: choice
        options:
          - release
          - debug

permissions:
  contents: write

jobs:
  build:
    name: Build Android APK
    runs-on: ubuntu-latest

    steps:
      - name: 🛎️ Checkout Repository
        uses: actions/checkout@v4

      - name: ☕ Set up Java (JDK 17)
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
          cache: 'gradle'

      - name: 🚀 Set up Flutter SDK
        uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
          cache: true

      - name: 🩺 Run Flutter Doctor
        run: flutter doctor -v

      - name: 📦 Install Dependencies
        run: flutter pub get

      - name: 🔨 Build Android APK (\${{ github.event.inputs.build_type || 'release' }})
        run: |
          if [ "\${{ github.event.inputs.build_type }}" = "debug" ]; then
            flutter build apk --debug
          else
            flutter build apk --release
          fi

      - name: 📤 Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: TripPlanner-\${{ github.event.inputs.build_type || 'release' }}-apk
          path: build/app/outputs/flutter-apk/*.apk
          if-no-files-found: error
          retention-days: 30
`;
}

export function generatePubspecYaml(): string {
  return `name: trip_planner_app
description: "AI-Powered Trip Planner with Pinterest Place Photography, Timeline Schedules, and Interactive Travel Guides."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^1.0.8
  cached_network_image: ^3.4.1
  url_launcher: ^6.3.1
  intl: ^0.19.0
  share_plus: ^10.1.4
  shared_preferences: ^2.3.5
  http: ^1.3.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0

flutter:
  uses-material-design: true
`;
}
