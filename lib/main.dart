import 'package:flutter/material.dart';
import 'models/trip_models.dart';
import 'screens/itinerary_screen.dart';
import 'screens/companion_screen.dart';
import 'screens/planner_screen.dart';
import 'screens/github_build_guide_screen.dart';
import 'services/trip_data_service.dart';
import 'theme/app_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const TripPlannerApp());
}

class TripPlannerApp extends StatelessWidget {
  const TripPlannerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Trip Planner',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const MainNavigationShell(),
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;
  late TripPlan _activeTrip;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadTrip();
  }

  Future<void> _loadTrip() async {
    final trip = await TripDataService.loadActiveTrip();
    if (mounted) {
      setState(() {
        _activeTrip = trip;
        _isLoading = false;
      });
    }
  }

  void _updateTrip(TripPlan updated) {
    setState(() => _activeTrip = updated);
    TripDataService.saveActiveTrip(updated);
  }

  void _onNewTripCreated(TripPlan newPlan) {
    setState(() {
      _activeTrip = newPlan;
      _currentIndex = 0; // Switch to itinerary view
    });
    TripDataService.saveActiveTrip(newPlan);
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(color: AppTheme.primary),
        ),
      );
    }

    final screens = [
      ItineraryScreen(
        tripPlan: _activeTrip,
        onUpdateTrip: _updateTrip,
      ),
      CompanionScreen(tripPlan: _activeTrip),
      PlannerScreen(onTripCreated: _onNewTripCreated),
      const GithubBuildGuideScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: Colors.white,
        indicatorColor: AppTheme.primary.withOpacity(0.18),
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.calendar_month_outlined),
            selectedIcon: Icon(Icons.calendar_month, color: AppTheme.primary),
            label: 'Itinerary',
          ),
          NavigationDestination(
            icon: Icon(Icons.explore_outlined),
            selectedIcon: Icon(Icons.explore, color: AppTheme.primary),
            label: 'Companion',
          ),
          NavigationDestination(
            icon: Icon(Icons.add_circle_outline),
            selectedIcon: Icon(Icons.add_circle, color: AppTheme.primary),
            label: 'Plan Trip',
          ),
          NavigationDestination(
            icon: Icon(Icons.android_outlined),
            selectedIcon: Icon(Icons.android, color: AppTheme.primary),
            label: 'GitHub APK',
          ),
        ],
      ),
    );
  }
}
