import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<String?> AccessTokenGoogle(String TokenGoogle) async {
  var headers = {'Content-Type': 'application/json'};
  var request = http.Request(
      'POST', Uri.parse('${global.serverIPAdress}api/v3/google-auth'));
  request.body = json.encode({"access_token": TokenGoogle, "refresh_token": ""});
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();

  if (response.statusCode == 200) {
    return (response.headers['set-cookie']); // retourner le cookie
  } else {
    return "error";
  }
}
