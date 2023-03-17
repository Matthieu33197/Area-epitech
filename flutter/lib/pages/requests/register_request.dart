import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<http.StreamedResponse> registerToDatabase(TextEditingController username, TextEditingController email, TextEditingController password)  async {
  var headers = {
    'Content-Type': 'application/json',
  };
  var request = http.Request('POST', Uri.parse('${global.serverIPAdress}api/v3/register'));
  request.body = json.encode({
    "username": username.text,
    "email": email.text,
    "password": password.text
  });

  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();

  return response;
}