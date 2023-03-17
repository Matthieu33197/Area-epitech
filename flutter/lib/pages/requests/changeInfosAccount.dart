import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<http.StreamedResponse> updateInfosAccount(String cookie, String firstname, String lastname, String avatar) async {
  var headers = {'Content-Type': 'application/json', 'Cookie': cookie};
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/update-user-data'));
  request.body = json.encode({
    "name": firstname,
    "lstName": lastname,
    "avatar": avatar
  });
  request.headers.addAll(headers);

  http.StreamedResponse response = await request.send();

  return response;
}
