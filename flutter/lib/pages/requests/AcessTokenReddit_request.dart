import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<http.StreamedResponse> AccessTokenReddit(String Reddit) async {
  var headers = {'Content-Type': 'application/json'};
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}/api/v3/reddit-auth'));
  request.body = json.encode({
    "access_token": Reddit,
    "refresh_token": ""
  });
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  return response;
}
