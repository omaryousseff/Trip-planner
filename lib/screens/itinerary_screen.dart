import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import '../models/trip_models.dart';
import '../theme/app_theme.dart';
import '../widgets/polaroid_card.dart';

class ItineraryScreen extends StatefulWidget {
  final TripPlan tripPlan;
  final Function(TripPlan) onUpdateTrip;

  const ItineraryScreen({
    super.key,
    required this.tripPlan,
    required this.onUpdateTrip,
  });

  @override
  State<ItineraryScreen> createState() => _ItineraryScreenState();
}

class _ItineraryScreenState extends State<ItineraryScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedCategory = 'all';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
      length: widget.tripPlan.days.length,
      vsync: this,
    );
  }

  @override
  void didUpdateWidget(covariant ItineraryScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.tripPlan.days.length != widget.tripPlan.days.length) {
      _tabController.dispose();
      _tabController = TabController(
        length: widget.tripPlan.days.length,
        vsync: this,
      );
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _shareTrip() {
    final buffer = StringBuffer();
    buffer.writeln('✈️ My ${widget.tripPlan.destination} Itinerary:');
    buffer.writeln('Occasion: ${widget.tripPlan.occasion} • ${widget.tripPlan.durationDays} Days');
    buffer.writeln('Weather: ${widget.tripPlan.weatherSummary}\n');

    for (final day in widget.tripPlan.days) {
      buffer.writeln('📅 Day ${day.day}: ${day.title}');
      for (final item in day.schedule) {
        buffer.writeln('• ${item.time} - ${item.title} (${item.location})');
      }
      buffer.writeln('');
    }

    Share.share(buffer.toString(), subject: '${widget.tripPlan.destination} Travel Itinerary');
  }

  void _toggleItemCompletion(int dayIndex, String itemId) {
    setState(() {
      final day = widget.tripPlan.days[dayIndex];
      final item = day.schedule.firstWhere((i) => i.id == itemId);
      item.completed = !item.completed;
    });
    widget.onUpdateTrip(widget.tripPlan);
  }

  @override
  Widget build(BuildContext context) {
    final days = widget.tripPlan.days;

    return Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.tripPlan.destination,
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 19),
            ),
            Text(
              '${widget.tripPlan.occasion} • ${widget.tripPlan.durationDays} Days • ${widget.tripPlan.travelersCount} Travelers',
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600, fontWeight: FontWeight.w500),
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: _shareTrip,
            icon: const Icon(Icons.share_outlined),
            tooltip: 'Share Itinerary',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          tabAlignment: TabAlignment.start,
          tabs: [
            for (int i = 0; i < days.length; i++)
              Tab(
                child: Row(
                  children: [
                    Text('Day ${i + 1}'),
                    const SizedBox(width: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.primary.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        '${days[i].schedule.length}',
                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.primary),
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Category Filter Chips
          Container(
            height: 48,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
            color: Colors.white,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _buildFilterChip('all', 'All Stops', Icons.auto_awesome),
                const SizedBox(width: 6),
                _buildFilterChip('place', 'Places', Icons.place),
                const SizedBox(width: 6),
                _buildFilterChip('food', 'Food & Dining', Icons.restaurant),
                const SizedBox(width: 6),
                _buildFilterChip('activity', 'Activities', Icons.local_activity),
                const SizedBox(width: 6),
                _buildFilterChip('transport', 'Transport', Icons.directions_subway),
              ],
            ),
          ),
          const Divider(height: 1, thickness: 1, color: Color(0x11000000)),

          // Tab Views per Day
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                for (int d = 0; d < days.length; d++)
                  _buildDayScheduleView(days[d], d),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String categoryKey, String label, IconData icon) {
    final isSelected = _selectedCategory == categoryKey;
    return GestureDetector(
      onTap: () => setState(() => _selectedCategory = categoryKey),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.darkEspresso : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? AppTheme.darkEspresso : Colors.grey.shade300,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 13,
              color: isSelected ? AppTheme.accent : Colors.grey.shade700,
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                color: isSelected ? Colors.white : Colors.grey.shade800,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDayScheduleView(DayPlan dayPlan, int dayIndex) {
    final filteredSchedule = _selectedCategory == 'all'
        ? dayPlan.schedule
        : dayPlan.schedule.where((i) => i.category.toLowerCase() == _selectedCategory).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Weather Banner
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: const Color(0xFFFFF9E6),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFFFFE17D)),
          ),
          child: Row(
            children: [
              const Icon(Icons.wb_sunny_rounded, color: Color(0xFFF59E0B), size: 24),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  widget.tripPlan.weatherSummary,
                  style: const TextStyle(fontSize: 13, color: Color(0xFF78350F), fontWeight: FontWeight.w600),
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 12),

        // Day summary card
        if (dayPlan.summary != null && dayPlan.summary!.isNotEmpty) ...[
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.black.withOpacity(0.06)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  dayPlan.title,
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w900),
                ),
                const SizedBox(height: 4),
                Text(
                  dayPlan.summary!,
                  style: TextStyle(fontSize: 13, color: Colors.grey.shade700, height: 1.4),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),
        ],

        // Schedule cards
        if (filteredSchedule.isEmpty)
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 40),
              child: Column(
                children: [
                  Icon(Icons.filter_list_off, size: 40, color: Colors.grey.shade400),
                  const SizedBox(height: 8),
                  Text(
                    'No $_selectedCategory stops found for this day.',
                    style: TextStyle(color: Colors.grey.shade600),
                  ),
                ],
              ),
            ),
          )
        else
          for (final item in filteredSchedule)
            PolaroidCard(
              key: ValueKey(item.id),
              item: item,
              destination: widget.tripPlan.destination,
              onToggleComplete: () => _toggleItemCompletion(dayIndex, item.id),
            ),
      ],
    );
  }
}
