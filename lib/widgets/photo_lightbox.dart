import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/trip_models.dart';
import '../theme/app_theme.dart';

class PhotoLightboxModal extends StatefulWidget {
  final ScheduleItem item;
  final int initialIndex;

  const PhotoLightboxModal({
    super.key,
    required this.item,
    this.initialIndex = 0,
  });

  static void show(BuildContext context, ScheduleItem item, {int initialIndex = 0}) {
    showDialog(
      context: context,
      barrierColor: Colors.black.withOpacity(0.92),
      builder: (ctx) => PhotoLightboxModal(
        item: item,
        initialIndex: initialIndex,
      ),
    );
  }

  @override
  State<PhotoLightboxModal> createState() => _PhotoLightboxModalState();
}

class _PhotoLightboxModalState extends State<PhotoLightboxModal> {
  late int _currentIndex;
  late List<String> _photos;

  @override
  void initState() {
    super.initState();
    _photos = widget.item.photos.isNotEmpty
        ? widget.item.photos
        : [widget.item.imageUrl ?? 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26'];
    _currentIndex = widget.initialIndex.clamp(0, _photos.length - 1);
  }

  Future<void> _openUrl(String? urlString) async {
    if (urlString == null || urlString.isEmpty) return;
    final uri = Uri.parse(urlString);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentUrl = _photos[_currentIndex];
    final pinterestSearchUrl =
        'https://www.pinterest.com/search/pins/?q=${Uri.encodeComponent("${widget.item.title} ${widget.item.location}")}';

    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.all(12),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Header Bar with Close & Counter
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: Colors.black80,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white24),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.camera_alt, color: AppTheme.pinterestRed, size: 16),
                    const SizedBox(width: 6),
                    Text(
                      'Pinterest Photo ${_currentIndex + 1}/${_photos.length}',
                      style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () => Navigator.of(context).pop(),
                icon: const Icon(Icons.close, color: Colors.white, size: 28),
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Main Photo with Interactive Viewer (Pinch to zoom)
          Flexible(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: Container(
                color: Colors.black,
                constraints: const BoxConstraints(maxHeight: 460),
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    InteractiveViewer(
                      minScale: 0.8,
                      maxScale: 3.5,
                      child: CachedNetworkImage(
                        imageUrl: currentUrl,
                        fit: BoxFit.contain,
                        placeholder: (ctx, url) => const Center(
                          child: CircularProgressIndicator(color: AppTheme.primary),
                        ),
                        errorWidget: (ctx, url, err) => const Center(
                          child: Icon(Icons.broken_image, color: Colors.white54, size: 48),
                        ),
                      ),
                    ),

                    // Left arrow
                    if (_photos.length > 1)
                      Positioned(
                        left: 8,
                        child: IconButton(
                          onPressed: () {
                            setState(() {
                              _currentIndex = (_currentIndex > 0)
                                  ? _currentIndex - 1
                                  : _photos.length - 1;
                            });
                          },
                          icon: const CircleAvatar(
                            backgroundColor: Colors.black54,
                            child: Icon(Icons.chevron_left, color: Colors.white),
                          ),
                        ),
                      ),

                    // Right arrow
                    if (_photos.length > 1)
                      Positioned(
                        right: 8,
                        child: IconButton(
                          onPressed: () {
                            setState(() {
                              _currentIndex = (_currentIndex < _photos.length - 1)
                                  ? _currentIndex + 1
                                  : 0;
                            });
                          },
                          icon: const CircleAvatar(
                            backgroundColor: Colors.black54,
                            child: Icon(Icons.chevron_right, color: Colors.white),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 12),

          // 3-Thumbnail Preview Strip
          if (_photos.length > 1)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (int i = 0; i < _photos.length; i++)
                  GestureDetector(
                    onTap: () => setState(() => _currentIndex = i),
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      width: 58,
                      height: 58,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: _currentIndex == i ? AppTheme.primary : Colors.white30,
                          width: _currentIndex == i ? 2.5 : 1,
                        ),
                      ),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: CachedNetworkImage(
                          imageUrl: _photos[i],
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          const SizedBox(height: 12),

          // Action Buttons: Open on Pinterest, Open in Maps
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.stone[900]?.withOpacity(0.9) ?? Colors.black87,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white12),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        widget.item.title,
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      Text(
                        widget.item.location,
                        style: const TextStyle(color: Colors.white70, fontSize: 11),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton.icon(
                  onPressed: () => _openUrl(pinterestSearchUrl),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.pinterestRed,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  ),
                  icon: const Icon(Icons.camera_alt, size: 16),
                  label: const Text('Pinterest', style: TextStyle(fontSize: 12)),
                ),
                const SizedBox(width: 6),
                IconButton(
                  onPressed: () => _openUrl(
                    widget.item.googleMapsUrl ??
                        'https://www.google.com/maps/search/?api=1&query=${Uri.encodeComponent("${widget.item.title} ${widget.item.location}")}',
                  ),
                  icon: const Icon(Icons.map, color: AppTheme.secondary),
                  tooltip: 'Open in Maps',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
