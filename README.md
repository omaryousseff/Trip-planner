# 🗺️ AI Trip Planner

An AI-powered travel planner and itinerary companion featuring Pinterest place photography, interactive Google Maps routes, customizable schedules, and turn-by-turn navigation.

---

## 🚀 How to Build the Android APK on GitHub Actions

This repository includes a ready-to-use **GitHub Actions** workflow (`.github/workflows/build-apk.yml`) to automatically compile a fully functional Android APK in the cloud with zero local Android Studio setup.

### Step 1: Export or Push to GitHub
- In Google AI Studio: Click the **Settings** / menu at the top right and select **Export to GitHub** (or push your repository to GitHub using `git`).

### Step 2: (Optional) Set Secrets or Inputs
If your app makes calls to your deployed backend or Google Maps:
1. On GitHub, go to **Settings** > **Secrets and variables** > **Actions**.
2. Add secrets:
   - `VITE_API_BASE_URL`: (Optional) Your hosted backend URL (e.g., `https://your-cloud-run-service.run.app`).
   - `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps Platform API key.

### Step 3: Run the Workflow
1. Navigate to your repository on **GitHub**.
2. Click the **Actions** tab at the top.
3. In the left sidebar, select **Build Android APK**.
4. Click **Run workflow** (optionally input your backend API URL).
*(Note: The workflow also runs automatically whenever you push to `main` or `master`).*

### Step 4: Download Your APK
1. When the build finishes (green checkmark, ~2-3 minutes), click on the completed workflow run.
2. Scroll down to the **Artifacts** section at the bottom.
3. Download **AI-Trip-Planner-Debug-APK** and transfer the `.apk` file to your Android device to install!

---

## 💻 Building the APK Locally

If you have Android Studio / Android SDK installed locally:

```bash
# 1. Install dependencies
npm install

# 2. Build the web app
npm run build

# 3. Add Android platform (first time only)
npx cap add android

# 4. Sync assets into Android
npx cap sync android

# 5. Open Android project in Android Studio or compile with Gradle:
npx cap open android
# Or directly via CLI:
cd android && ./gradlew assembleDebug
```
