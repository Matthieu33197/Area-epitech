import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

int createBoxLogginOauth2(String service) {
  if (service == "DISCORD") return 1;
  if (service == "REDDIT") return 2;
  if (service == "YOUTUBE") return 3;
  if (service == "GOOGLE") return 4;
  return 0;
}
