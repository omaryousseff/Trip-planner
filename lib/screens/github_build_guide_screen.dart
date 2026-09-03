import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/app_theme.dart';

class GithubBuildGuideScreen extends StatelessWidget {
  const GithubBuildGuideScreen({super.key});

  static const String workflowYaml = '''name: Build Flutter APK

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

      - name: 🚀 Set up Flutter
        uses: subosito/flutter-action@v2
        with:
          channel: 'stable'
          cache: true

      - name: 📦 Install Dependencies
        run: flutter pub get

      - name: 🔨 Build Android APK
        run: flutter build apk --release

      - name: 📤 Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: TripPlanner-release-apk
          path: build/app/outputs/flutter-apk/*.apk
          retention-days: 30
''';

  void _copyYaml(BuildContext context) {
    Clipboard.setData(const ClipboardData(text: workflowYaml));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Copied .github/workflows/build-apk.yml to clipboard!'),
        backgroundColor: AppTheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Build APK on GitHub'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          // Banner
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF24292E), Color(0xFF1B1F23)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.build_circle_outlined, color: Color(0xFF4ECDC4), size: 24),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text(
                        'GitHub Actions APK Builder',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                const Text(
                  'Your repository includes the official GitHub Actions workflow in .github/workflows/build-apk.yml. Every time you push or click "Run workflow" in GitHub Actions, GitHub automatically compiles and outputs your release APK!',
                  style: TextStyle(color: Colors.white70, fontSize: 13, height: 1.45),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // 3 Simple Steps
          const Text(
            '3 Simple Steps to Get Your APK',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
          ),
          const SizedBox(height: 12),

          _buildStepCard(
            stepNumber: '1',
            title: 'Push Code to GitHub',
            description:
                'Push this repository to GitHub or use Google AI Studio\'s "Export to GitHub" button from the top right settings menu.',
            icon: Icons.cloud_upload_outlined,
          ),
          const SizedBox(height: 10),

          _buildStepCard(
            stepNumber: '2',
            title: 'Open GitHub Actions Tab',
            description:
                'Go to your repository on github.com and click on the "Actions" tab. You will see the "Build Flutter APK" workflow run automatically, or click "Run workflow" to trigger it manually.',
            icon: Icons.play_arrow_outlined,
          ),
          const SizedBox(height: 10),

          _buildStepCard(
            stepNumber: '3',
            title: 'Download app-release.apk',
            description:
                'When the build completes (usually ~2 minutes), scroll to the bottom of the workflow summary under "Artifacts" and click "TripPlanner-release-apk" to download!',
            icon: Icons.download_for_offline_outlined,
          ),

          const SizedBox(height: 24),

          // Workflow File Preview
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Workflow File (.github/workflows/build-apk.yml)',
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 13),
              ),
              TextButton.icon(
                onPressed: () => _copyYaml(context),
                icon: const Icon(Icons.copy, size: 15),
                label: const Text('Copy YAML', style: TextStyle(fontSize: 12)),
              ),
            ],
          ),
          const SizedBox(height: 6),

          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF1E1E1E),
              borderRadius: BorderRadius.circular(16),
            ),
            child: const SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: SelectableText(
                workflowYaml,
                style: TextStyle(
                  fontFamily: 'monospace',
                  fontSize: 11,
                  color: Color(0xFFD4D4D4),
                  height: 1.4,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepCard({
    required String stepNumber,
    required String title,
    required String description,
    required IconData icon,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.black.withOpacity(0.06)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 16,
            backgroundColor: AppTheme.primary,
            child: Text(
              stepNumber,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 13),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(icon, size: 16, color: AppTheme.darkEspresso),
                    const SizedBox(width: 6),
                    Text(
                      title,
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade700, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
