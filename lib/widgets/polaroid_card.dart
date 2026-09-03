import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/trip_models.dart';
import '../theme/app_theme.dart';
import 'photo_lightbox.dart';

class PolaroidCard extends StatefulWidget {
  final ScheduleItem item;
  final String destination;
  final VoidCallback? onToggleComplete;

  const PolaroidCard({
    super.key,
    required this.item,
    required this.destination,
    this.onToggleComplete,
  });

  @override
  State<PolaroidCard> createState() => _PolaroidCardState();
}

class _PolaroidCardState extends State<PolaroidCard> {
  late PageController _pageController;
  int _activePhotoIndex = 0;
  late List<String> _photos;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _photos = widget.item.photos.isNotEmpty
        ? widget.item.photos.take(3).toList()
        : [widget.item.imageUrl ?? 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26'];
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _openDirections() async {
    final query = '${widget.item.title} ${widget.item.location} ${widget.destination}'.trim();
    final url = widget.item.googleMapsUrl ??
        'https://www.google.com/maps/search/?api=1&query=${Uri.encodeComponent(query)}';
    final uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final categoryColor = AppTheme.getCategoryColor(widget.item.category);
    final categoryIcon = AppTheme.getCategoryIcon(widget.item.category);
    final isCompleted = widget.item.completed;

    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isCompleted ? Colors.green.shade200 : Colors.black.withOpacity(0.08),
          width: isCompleted ? 2 : 1.2,
        ),
        boxShadow: [
          BoxShadow(
            color: isCompleted
                ? Colors.green.withOpacity(0.05)
                : const Color(0xFF2D241E).withOpacity(0.08),
            offset: const Offset(0, 4),
            blurRadius: 12,
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Polaroid Frame with 3-Photo Carousel
            Container(
              height: 220,
              decoration: BoxDecoration(
                color: const Color(0xFF1E1E1E),
                borderRadius: BorderRadius.circular(14),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(14),
                child: Stack(
                  children: [
                    // Photo PageView
                    PageView.builder(
                      controller: _pageController,
                      itemCount: _photos.length,
                      onPageChanged: (idx) {
                        setState(() => _activePhotoIndex = idx);
                      },
                      itemBuilder: (ctx, i) {
                        return CachedNetworkImage(
                          imageUrl: _photos[i],
                          fit: BoxFit.cover,
                          width: double.infinity,
                          placeholder: (ctx, url) => Container(
                            color: Colors.stone[900],
                            child: const Center(
                              child: CircularProgressIndicator(
                                color: AppTheme.primary,
                                strokeWidth: 2,
                              ),
                            ),
                          ),
                          errorWidget: (ctx, url, err) => Container(
                            color: Colors.stone[800],
                            child: const Center(
                              child: Icon(Icons.broken_image, color: Colors.white54),
                            ),
                          ),
                        );
                      },
                    ),

                    // Top Left: Time badge
                    Positioned(
                      top: 10,
                      left: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFF2D241E).withOpacity(0.85),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.access_time, color: AppTheme.accent, size: 14),
                            const SizedBox(width: 4),
                            Text(
                              widget.item.time,
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                fontFamily: 'monospace',
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Top Right: Best 3 Photos counter badge
                    Positioned(
                      top: 10,
                      right: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.black87,
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.white24, width: 0.8),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.camera_alt, color: AppTheme.pinterestRed, size: 13),
                            const SizedBox(width: 4),
                            Text(
                              '${_activePhotoIndex + 1}/${_photos.length} Photos',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 11,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Bottom Overlay: Source & Zoom Inspect Button
                    Positioned(
                      bottom: 8,
                      left: 10,
                      right: 10,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          // Pinterest tag
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: Colors.black.withOpacity(0.75),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Container(
                                  width: 6,
                                  height: 6,
                                  decoration: const BoxDecoration(
                                    color: AppTheme.pinterestRed,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 5),
                                Text(
                                  widget.item.photoSource ?? 'Pinterest',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ),

                          // Inspect Fullscreen
                          InkWell(
                            onTap: () {
                              PhotoLightboxModal.show(
                                context,
                                widget.item,
                                initialIndex: _activePhotoIndex,
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: Colors.white.withOpacity(0.92),
                                shape: BoxShape.circle,
                                boxShadow: const [
                                  BoxShadow(
                                    color: Colors.black26,
                                    blurRadius: 4,
                                  ),
                                ],
                              ),
                              child: const Icon(Icons.fullscreen, size: 18, color: Color(0xFF2D241E)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // 3-Thumbnail Gallery Strip
            if (_photos.length > 1) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  for (int i = 0; i < _photos.length; i++)
                    Expanded(
                      child: GestureDetector(
                        onTap: () {
                          _pageController.animateToPage(
                            i,
                            duration: const Duration(milliseconds: 250),
                            curve: Curves.easeInOut,
                          );
                        },
                        child: Container(
                          margin: EdgeInsets.only(right: i < _photos.length - 1 ? 6 : 0),
                          height: 44,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: _activePhotoIndex == i
                                  ? AppTheme.primary
                                  : Colors.black.withOpacity(0.1),
                              width: _activePhotoIndex == i ? 2.5 : 1,
                            ),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(6),
                            child: CachedNetworkImage(
                              imageUrl: _photos[i],
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ],

            const SizedBox(height: 12),

            // Category Badge & Completion Checkbox
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: categoryColor.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: categoryColor.withOpacity(0.3)),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(categoryIcon, color: categoryColor, size: 14),
                      const SizedBox(width: 4),
                      Text(
                        widget.item.category.toUpperCase(),
                        style: TextStyle(
                          color: categoryColor,
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  widget.item.duration,
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const Spacer(),
                InkWell(
                  onTap: widget.onToggleComplete,
                  borderRadius: BorderRadius.circular(8),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: isCompleted ? Colors.green.shade50 : Colors.grey.shade100,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: isCompleted ? Colors.green.shade400 : Colors.grey.shade300,
                      ),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          isCompleted ? Icons.check_circle : Icons.radio_button_unchecked,
                          color: isCompleted ? Colors.green.shade700 : Colors.grey.shade500,
                          size: 16,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          isCompleted ? 'Done' : 'Mark done',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: isCompleted ? Colors.green.shade700 : Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 10),

            // Title
            Text(
              widget.item.title,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: const Color(0xFF2D241E),
                decoration: isCompleted ? TextDecoration.lineThrough : null,
              ),
            ),

            const SizedBox(height: 4),

            // Location with Pin
            Row(
              children: [
                const Icon(Icons.place_outlined, size: 15, color: Colors.grey),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    widget.item.location,
                    style: TextStyle(
                      fontSize: 13,
                      color: Colors.grey.shade700,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 8),

            // Description
            Text(
              widget.item.description,
              style: TextStyle(
                fontSize: 14,
                height: 1.45,
                color: Colors.grey.shade800,
              ),
            ),

            // Local Tip Banner
            if (widget.item.tips != null && widget.item.tips!.isNotEmpty) ...[
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
                    const Icon(Icons.lightbulb, color: Color(0xFFD97706), size: 16),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        widget.item.tips!,
                        style: const TextStyle(
                          fontSize: 12,
                          color: Color(0xFF78350F),
                          fontWeight: FontWeight.w600,
                          height: 1.35,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],

            const SizedBox(height: 12),

            // Cost & Directions Footer
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (widget.item.costEstimate != null && widget.item.costEstimate!.isNotEmpty)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.stone[100],
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      'Est: ${widget.item.costEstimate}',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.grey.shade800,
                      ),
                    ),
                  )
                else
                  const SizedBox.shrink(),

                // Get directions button
                ElevatedButton.icon(
                  onPressed: _openDirections,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2D241E),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 0,
                  ),
                  icon: const Icon(Icons.directions, size: 16, color: AppTheme.secondary),
                  label: const Text(
                    'Directions',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
