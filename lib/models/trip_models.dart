// Data Models for Trip Planner Flutter App
import 'dart:convert';

class Coordinates {
  final double lat;
  final double lng;

  const Coordinates({required this.lat, required this.lng});

  Map<String, dynamic> toJson() => {'lat': lat, 'lng': lng};

  factory Coordinates.fromJson(Map<String, dynamic> json) => Coordinates(
        lat: (json['lat'] as num).toDouble(),
        lng: (json['lng'] as num).toDouble(),
      );
}

class AlternativePhoto {
  final String url;
  final String caption;
  final String source;
  final String sourceType;
  final String? pinUrl;

  const AlternativePhoto({
    required this.url,
    required this.caption,
    required this.source,
    this.sourceType = 'pinterest',
    this.pinUrl,
  });

  Map<String, dynamic> toJson() => {
        'url': url,
        'caption': caption,
        'source': source,
        'sourceType': sourceType,
        'pinUrl': pinUrl,
      };

  factory AlternativePhoto.fromJson(Map<String, dynamic> json) =>
      AlternativePhoto(
        url: json['url'] ?? '',
        caption: json['caption'] ?? '',
        source: json['source'] ?? 'Pinterest',
        sourceType: json['sourceType'] ?? 'pinterest',
        pinUrl: json['pinUrl'],
      );
}

class ScheduleItem {
  final String id;
  final String time;
  final String title;
  final String description;
  final String location;
  final String category; // 'food' | 'transport' | 'place' | 'activity'
  final String duration;
  final String? costEstimate;
  final String? tips;
  final Coordinates? coordinates;
  final String? imageUrl;
  final List<String> photos; // Best 3 photos from Pinterest
  final String? photoCaption;
  final String? photoSource;
  final String? photoSourceType;
  final String? officialWebsiteUrl;
  final String? tripAdvisorUrl;
  final String? googleMapsUrl;
  final List<AlternativePhoto> alternativePhotos;
  bool completed;

  ScheduleItem({
    required this.id,
    required this.time,
    required this.title,
    required this.description,
    required this.location,
    required this.category,
    required this.duration,
    this.costEstimate,
    this.tips,
    this.coordinates,
    this.imageUrl,
    this.photos = const [],
    this.photoCaption,
    this.photoSource = 'Pinterest',
    this.photoSourceType = 'pinterest',
    this.officialWebsiteUrl,
    this.tripAdvisorUrl,
    this.googleMapsUrl,
    this.alternativePhotos = const [],
    this.completed = false,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'time': time,
        'title': title,
        'description': description,
        'location': location,
        'category': category,
        'duration': duration,
        'costEstimate': costEstimate,
        'tips': tips,
        'coordinates': coordinates?.toJson(),
        'imageUrl': imageUrl,
        'photos': photos,
        'photoCaption': photoCaption,
        'photoSource': photoSource,
        'photoSourceType': photoSourceType,
        'officialWebsiteUrl': officialWebsiteUrl,
        'tripAdvisorUrl': tripAdvisorUrl,
        'googleMapsUrl': googleMapsUrl,
        'alternativePhotos':
            alternativePhotos.map((p) => p.toJson()).toList(),
        'completed': completed,
      };

  factory ScheduleItem.fromJson(Map<String, dynamic> json) {
    var rawPhotos = json['photos'];
    List<String> photosList = [];
    if (rawPhotos is List) {
      photosList = rawPhotos.map((e) => e.toString()).toList();
    }

    var rawAlts = json['alternativePhotos'];
    List<AlternativePhoto> altsList = [];
    if (rawAlts is List) {
      altsList = rawAlts
          .map((e) => AlternativePhoto.fromJson(e as Map<String, dynamic>))
          .toList();
    }

    return ScheduleItem(
      id: json['id'] ?? '',
      time: json['time'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      location: json['location'] ?? '',
      category: json['category'] ?? 'activity',
      duration: json['duration'] ?? '',
      costEstimate: json['costEstimate'],
      tips: json['tips'],
      coordinates: json['coordinates'] != null
          ? Coordinates.fromJson(json['coordinates'])
          : null,
      imageUrl: json['imageUrl'],
      photos: photosList,
      photoCaption: json['photoCaption'],
      photoSource: json['photoSource'] ?? 'Pinterest',
      photoSourceType: json['photoSourceType'] ?? 'pinterest',
      officialWebsiteUrl: json['officialWebsiteUrl'],
      tripAdvisorUrl: json['tripAdvisorUrl'],
      googleMapsUrl: json['googleMapsUrl'],
      alternativePhotos: altsList,
      completed: json['completed'] ?? false,
    );
  }
}

class DayPlan {
  final int day;
  final String title;
  final String date;
  final String? summary;
  final List<ScheduleItem> schedule;

  DayPlan({
    required this.day,
    required this.title,
    required this.date,
    this.summary,
    required this.schedule,
  });

  Map<String, dynamic> toJson() => {
        'day': day,
        'title': title,
        'date': date,
        'summary': summary,
        'schedule': schedule.map((s) => s.toJson()).toList(),
      };

  factory DayPlan.fromJson(Map<String, dynamic> json) => DayPlan(
        day: json['day'] ?? 1,
        title: json['title'] ?? '',
        date: json['date'] ?? '',
        summary: json['summary'],
        schedule: (json['schedule'] as List? ?? [])
            .map((e) => ScheduleItem.fromJson(e as Map<String, dynamic>))
            .toList(),
      );
}

class CostEstimate {
  final String currency;
  final String estimatedTotalPerPerson;
  final String? accommodationEstimate;
  final String? foodAndDrinkEstimate;
  final String? transportEstimate;
  final String? activitiesEstimate;

  CostEstimate({
    required this.currency,
    required this.estimatedTotalPerPerson,
    this.accommodationEstimate,
    this.foodAndDrinkEstimate,
    this.transportEstimate,
    this.activitiesEstimate,
  });

  Map<String, dynamic> toJson() => {
        'currency': currency,
        'estimatedTotalPerPerson': estimatedTotalPerPerson,
        'accommodationEstimate': accommodationEstimate,
        'foodAndDrinkEstimate': foodAndDrinkEstimate,
        'transportEstimate': transportEstimate,
        'activitiesEstimate': activitiesEstimate,
      };

  factory CostEstimate.fromJson(Map<String, dynamic> json) => CostEstimate(
        currency: json['currency'] ?? 'USD',
        estimatedTotalPerPerson: json['estimatedTotalPerPerson'] ?? '',
        accommodationEstimate: json['accommodationEstimate'],
        foodAndDrinkEstimate: json['foodAndDrinkEstimate'],
        transportEstimate: json['transportEstimate'],
        activitiesEstimate: json['activitiesEstimate'],
      );
}

class TripPlan {
  final String id;
  final String destination;
  final String occasion;
  final int durationDays;
  final int travelersCount;
  final String travelerType;
  final String budget;
  final String pace;
  final List<String> interests;
  final String weatherSummary;
  final List<String> packingList;
  final CostEstimate? currencyAndCostEstimate;
  final List<DayPlan> days;

  TripPlan({
    required this.id,
    required this.destination,
    required this.occasion,
    required this.durationDays,
    required this.travelersCount,
    required this.travelerType,
    required this.budget,
    required this.pace,
    required this.interests,
    required this.weatherSummary,
    required this.packingList,
    this.currencyAndCostEstimate,
    required this.days,
  });

  Map<String, dynamic> toJson() => {
        'id': id,
        'destination': destination,
        'occasion': occasion,
        'durationDays': durationDays,
        'travelersCount': travelersCount,
        'travelerType': travelerType,
        'budget': budget,
        'pace': pace,
        'interests': interests,
        'weatherSummary': weatherSummary,
        'packingList': packingList,
        'currencyAndCostEstimate': currencyAndCostEstimate?.toJson(),
        'days': days.map((d) => d.toJson()).toList(),
      };

  factory TripPlan.fromJson(Map<String, dynamic> json) => TripPlan(
        id: json['id'] ?? '',
        destination: json['destination'] ?? '',
        occasion: json['occasion'] ?? 'Vacation',
        durationDays: json['durationDays'] ?? (json['days'] as List?)?.length ?? 1,
        travelersCount: json['travelersCount'] ?? 1,
        travelerType: json['travelerType'] ?? 'Solo',
        budget: json['budget'] ?? 'Moderate',
        pace: json['pace'] ?? 'Balanced',
        interests: (json['interests'] as List? ?? []).map((e) => e.toString()).toList(),
        weatherSummary: json['weatherSummary'] ?? '',
        packingList: (json['packingList'] as List? ?? []).map((e) => e.toString()).toList(),
        currencyAndCostEstimate: json['currencyAndCostEstimate'] != null
            ? CostEstimate.fromJson(json['currencyAndCostEstimate'])
            : null,
        days: (json['days'] as List? ?? [])
            .map((e) => DayPlan.fromJson(e as Map<String, dynamic>))
            .toList(),
      );
}
