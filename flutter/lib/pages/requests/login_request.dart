import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<http.StreamedResponse> loginToDatabase(
TextEditingController email,
    TextEditingController password) async {
  var headers = {
    'Content-Type': 'application/json'
  };
  var request = http.Request('POST', Uri.parse('${global.serverIPAdress}api/v3/authenticate'));
  request.body = json.encode({
    "email": email.text,
    "password": password.text
  });
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  return response;
}