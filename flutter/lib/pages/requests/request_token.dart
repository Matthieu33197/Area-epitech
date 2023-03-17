import './global.dart' as global;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';
import 'dart:io';
// import 'package:device_info/device_info.dart';
// import 'package:flutter/services.dart';

Future<SharedPreferences> _prefs = SharedPreferences.getInstance();

Future<String> getMobileToken() async {
  final SharedPreferences prefs = await _prefs;
  return prefs.getString(global.serverIPAdress) ?? '';
}

/// ----------------------------------------------------------
/// Method that saves the token in Shared Preferences
/// ----------------------------------------------------------
Future<bool> setMobileToken(String token) async {
  final SharedPreferences prefs = await _prefs;
  return prefs.setString(global.serverIPAdress, token);
}
