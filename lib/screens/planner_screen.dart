import 'package:flutter/material.dart';
import '../models/trip_models.dart';
import '../theme/app_theme.dart';

class PlannerScreen extends StatefulWidget {
  final Function(TripPlan) onTripCreated;

  const PlannerScreen({super.key, required this.onTripCreated});

  @override
  State<PlannerScreen> createState() => _PlannerScreenState();
}

class _PlannerScreenState extends State<PlannerScreen> {
  final _destinationController = TextEditingController(text: 'Paris, France');
  String _occasion = 'Vacation';
  int _days = 3;
  int _travelers = 2;
  String _travelerType = 'Couple';
  String _budget = 'Moderate';
  String _pace = 'Balanced';
  final Set<String> _selectedInterests = {
    'Culture & Landmarks',
    'Food & Wine',
    'Walks & Parks'
  };

  final List<String> _popularDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'Rome, Italy',
    'Kyoto, Japan',
    'New York, USA',
    'Barcelona, Spain',
    'Cairo, Egypt',
    'Bali, Indonesia',
  ];

  final List<String> _availableInterests = [
    'Culture & Landmarks',
    'Food & Wine',
    'Walks & Parks',
    'Museums & Art',
    'Shopping & Markets',
    'Nightlife & Cafes',
    'Photography Spots',
  ];

  void _generateCustomTrip() {
    final dest = _destinationController.text.trim().isEmpty
        ? 'Paris, France'
        : _destinationController.text.trim();

    // Create a personalized multi-day trip plan
    final newPlan = TripPlan(
      id: 'trip-${DateTime.now().millisecondsSinceEpoch}',
      destination: dest,
      occasion: _occasion,
      durationDays: _days,
      travelersCount: _travelers,
      travelerType: _travelerType,
      budget: _budget,
      pace: _pace,
      interests: _selectedInterests.toList(),
      weatherSummary: 'Sunny & pleasant, mild temperatures ideal for exploring.',
      packingList: [
        'Comfortable walking shoes',
        'Light jacket / layers',
        'Camera or smartphone',
        'Travel adapter & charger',
        'Reusable water bottle',
      ],
      currencyAndCostEstimate: CostEstimate(
        currency: 'EUR',
        estimatedTotalPerPerson: '€${_days * 120}',
        accommodationEstimate: '€90 / night',
        foodAndDrinkEstimate: '€45 / day',
        transportEstimate: '€10 / day',
        activitiesEstimate: '€25 / day',
      ),
      days: List.generate(_days, (i) {
        final dayNum = i + 1;
        return DayPlan(
          day: dayNum,
          title: 'Day $dayNum: Signature Sights & Culinary Gems',
          date: 'Day $dayNum',
          summary: 'Discover key highlights, world-class local dining, and charming historic streets in $dest.',
          schedule: [
            ScheduleItem(
              id: 'stop-$dayNum-1',
              time: '09:30 AM',
              title: 'Iconic Morning Landmark of $dest',
              description: 'Begin the day exploring famous historic architecture and scenic morning viewpoints.',
              location: 'City Center, $dest',
              category: 'place',
              duration: '2.5 hours',
              costEstimate: 'Free entry',
              tips: 'Arrive early to enjoy peaceful morning light and fewer crowds.',
              photos: [
                'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
            ),
            ScheduleItem(
              id: 'stop-$dayNum-2',
              time: '01:00 PM',
              title: 'Artisan Lunch & Local Specialities',
              description: 'Taste traditional recipes made from seasonal local ingredients at a neighborhood bistro.',
              location: 'Old Town Quarter, $dest',
              category: 'food',
              duration: '1.5 hours',
              costEstimate: '€28 / person',
              tips: 'Try the house special dish with freshly baked bread.',
              photos: [
                'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
            ),
            ScheduleItem(
              id: 'stop-$dayNum-3',
              time: '04:00 PM',
              title: 'Sunset Promenade & Evening Stroll',
              description: 'Walk along the riverbanks or scenic boulevards as the city lights illuminate the skyline.',
              location: 'Scenic Promenade, $dest',
              category: 'activity',
              duration: '2 hours',
              costEstimate: 'Free',
              tips: 'Golden hour offers incredible photography opportunities.',
              photos: [
                'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&auto=format&fit=crop&q=80',
              ],
              photoSource: 'Pinterest',
            ),
          ],
        );
      }),
    );

    widget.onTripCreated(newPlan);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('✨ Generated custom ${_days}-day trip to $dest!'),
        backgroundColor: AppTheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Plan New Trip'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Destination Input
          const Text(
            'Where do you want to go?',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
          ),
          const SizedBox(height: 8),
          TextField(
            controller: _destinationController,
            decoration: InputDecoration(
              hintText: 'e.g. Kyoto, Japan or Florence, Italy',
              prefixIcon: const Icon(Icons.flight_takeoff, color: AppTheme.primary),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              filled: true,
              fillColor: Colors.white,
            ),
          ),
          const SizedBox(height: 10),

          // Quick preset tags
          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: _popularDestinations.map((city) {
              return ActionChip(
                label: Text(city, style: const TextStyle(fontSize: 12)),
                onPressed: () {
                  setState(() => _destinationController.text = city);
                },
                backgroundColor: Colors.white,
                side: BorderSide(color: Colors.black.withOpacity(0.1)),
              );
            }).toList(),
          ),

          const SizedBox(height: 24),

          // Duration Slider
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Trip Duration',
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.primary.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '$_days Days',
                  style: const TextStyle(
                    color: AppTheme.primary,
                    fontWeight: FontWeight.w900,
                  ),
                ),
              ),
            ],
          ),
          Slider(
            value: _days.toDouble(),
            min: 1,
            max: 10,
            divisions: 9,
            activeColor: AppTheme.primary,
            onChanged: (val) => setState(() => _days = val.toInt()),
          ),

          const SizedBox(height: 16),

          // Occasion & Pace
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Occasion', style: TextStyle(fontWeight: FontWeight.w700)),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<String>(
                      value: _occasion,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      ),
                      items: ['Vacation', 'Anniversary', 'Honeymoon', 'Backpacking', 'Family Trip']
                          .map((o) => DropdownMenuItem(value: o, child: Text(o, style: const TextStyle(fontSize: 13))))
                          .toList(),
                      onChanged: (val) => setState(() => _occasion = val!),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Pace', style: TextStyle(fontWeight: FontWeight.w700)),
                    const SizedBox(height: 6),
                    DropdownButtonFormField<String>(
                      value: _pace,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      ),
                      items: ['Relaxed', 'Balanced', 'Fast-Paced']
                          .map((p) => DropdownMenuItem(value: p, child: Text(p, style: const TextStyle(fontSize: 13))))
                          .toList(),
                      onChanged: (val) => setState(() => _pace = val!),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // Interests Multi-select Chips
          const Text(
            'What do you love?',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _availableInterests.map((interest) {
              final isSelected = _selectedInterests.contains(interest);
              return FilterChip(
                label: Text(interest),
                selected: isSelected,
                selectedColor: AppTheme.secondary.withOpacity(0.2),
                checkmarkColor: AppTheme.secondary,
                onSelected: (val) {
                  setState(() {
                    if (val) {
                      _selectedInterests.add(interest);
                    } else {
                      _selectedInterests.remove(interest);
                    }
                  });
                },
              );
            }).toList(),
          ),

          const SizedBox(height: 32),

          // Submit Button
          SizedBox(
            height: 52,
            child: ElevatedButton.icon(
              onPressed: _generateCustomTrip,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              icon: const Icon(Icons.auto_awesome),
              label: const Text(
                'Generate Dream Itinerary',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
