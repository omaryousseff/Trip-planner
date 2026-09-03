# 🗺️ Trip Planner (Flutter & Web)

An AI-powered travel planner and itinerary companion featuring Pinterest place photography, customizable schedules, and turn-by-turn navigation.

---

## 🚀 How to Build the Android APK on GitHub (Zero Local Setup)

This repository is pre-configured with **GitHub Actions** (`.github/workflows/build-apk.yml`) to automatically compile and release an Android APK in the cloud.

### Step 1: Export or Push to GitHub
- In Google AI Studio: Click the **Settings** / menu at the top right and select **Export to GitHub** (or push your repository to GitHub using git).

### Step 2: Run the Workflow
1. Navigate to your repository on **GitHub**.
2. Click the **Actions** tab at the top.
3. In the left sidebar, click **Build Flutter APK**.
4. Click **Run workflow** > Select `release` > Click **Run workflow**.
   *(Note: The workflow also runs automatically whenever you push code).*

### Step 3: Download your APK
1. When the run finishes (green checkmark, ~2 minutes), click on the workflow run.
2. Scroll to the **Artifacts** section at the bottom.
3. Click **TripPlanner-release-apk** to download `app-release.apk` directly to your phone or computer!

---

## 💻 Building the APK Locally

If you have Flutter installed locally:

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <repo-name>

# 2. Install dependencies
flutter pub get

# 3. Build release APK
flutter build apk --release

# 4. Your APK will be at:
# build/app/outputs/flutter-apk/app-release.apk
```

---

## 📁 Flutter Project Structure

```text
├── .github/
│   └── workflows/
│       └── build-apk.yml       # Automated GitHub Actions CI/CD to build APK
├── pubspec.yaml                # Flutter project specifications & dependencies
├── android/                    # Android project wrapper & permissions
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/AndroidManifest.xml
│   ├── build.gradle
│   └── settings.gradle
├── lib/
│   ├── main.dart               # App entry point & bottom navigation shell
│   ├── models/
│   │   └── trip_models.dart    # TripPlan, DayPlan, ScheduleItem, Cost models
│   ├── theme/
│   │   └── app_theme.dart      # Material 3 theme & color schemes
│   ├── widgets/
│   │   ├── polaroid_card.dart  # Polaroid card with top 3 Pinterest photos carousel
│   │   └── photo_lightbox.dart # High-res photo viewer with zoom & Pinterest link
│   ├── screens/
│   │   ├── itinerary_screen.dart # Day tabs, timeline, and category filters
│   │   ├── companion_screen.dart # Live next-stop companion & directions
│   │   ├── planner_screen.dart   # Interactive trip generation form
│   │   └── github_build_guide_screen.dart # In-app guide for GitHub APK build
│   └── services/
│       └── trip_data_service.dart # Local storage & sample data
```

---

## ✨ Features

- **Pinterest Landmark Photography**: Curates the best 3 photos for every attraction and dining stop with swipeable photo carousels, photo counter badges, and attribution.
- **Interactive Daily Itinerary**: Multi-day schedule with category filters (Places, Dining, Activities, Transport).
- **Offline Local Storage**: Saves itineraries locally on the device using `shared_preferences`.
- **Navigation Integration**: Quick tap launches Google Maps or Apple Maps with pre-filled destination query.
- **Smart Packing List & Budget Breakdown**: Tailored recommendations for every trip.
