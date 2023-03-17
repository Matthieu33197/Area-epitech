import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<String> getServicesAvailable(String cookie) async {
  var headers = {'Content-Type': 'application/json', 'Cookie': cookie};
  var request = http.Request(
      'GET', Uri.parse('${global.serverIPAdress}api/v3/get-user-sub-services'));

  request.headers.addAll(headers);

  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  return respStr;
}

Future<String> getActionsAndReactions(String cookie) async {
  var headers = {'Content-Type': 'application/json', 'Cookie': cookie};
  var request = http.Request(
      'GET', Uri.parse('${global.serverIPAdress}api/v3/get-area-available'));

  request.headers.addAll(headers);

  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();

  return respStr;
}
