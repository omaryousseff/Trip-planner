import 'package:flutter/material.dart';

class AppTheme {
  // Brand color palette
  static const Color primary = Color(0xFFFF6B6B);
  static const Color primaryDark = Color(0xFFEE5253);
  static const Color secondary = Color(0xFF4ECDC4);
  static const Color accent = Color(0xFFFFD93D);
  static const Color darkEspresso = Color(0xFF2D241E);
  static const Color warmCream = Color(0xFFFAF7F2);
  static const Color pinterestRed = Color(0xFFE60023);

  // Category indicator colors
  static const Color categoryFood = Color(0xFFE67E22);
  static const Color categoryTransport = Color(0xFF3498DB);
  static const Color categoryPlace = Color(0xFF2ECC71);
  static const Color categoryActivity = Color(0xFF9B59B6);

  static Color getCategoryColor(String category) {
    switch (category.toLowerCase()) {
      case 'food':
        return categoryFood;
      case 'transport':
        return categoryTransport;
      case 'place':
        return categoryPlace;
      case 'activity':
      default:
        return categoryActivity;
    }
  }

  static IconData getCategoryIcon(String category) {
    switch (category.toLowerCase()) {
      case 'food':
        return Icons.restaurant;
      case 'transport':
        return Icons.directions_subway;
      case 'place':
        return Icons.place;
      case 'activity':
      default:
        return Icons.local_activity;
    }
  }

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: warmCream,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        primary: primary,
        secondary: secondary,
        surface: Colors.white,
        background: warmCream,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
        onSurface: darkEspresso,
        brightness: Brightness.light,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: darkEspresso,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: darkEspresso,
          fontSize: 20,
          fontWeight: FontWeight.w900,
          letterSpacing: -0.5,
        ),
      ),
      cardTheme: CardTheme(
        color: Colors.white,
        elevation: 1,
        shadowColor: darkEspresso.withOpacity(0.08),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.black.withOpacity(0.06), width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          elevation: 2,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: const TextStyle(
            fontWeight: FontWeight.w900,
            fontSize: 15,
            letterSpacing: 0.2,
          ),
        ),
      ),
      tabBarTheme: const TabBarTheme(
        labelColor: primary,
        unselectedLabelColor: Colors.grey,
        indicatorColor: primary,
        labelStyle: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
      ),
    );
  }
}
