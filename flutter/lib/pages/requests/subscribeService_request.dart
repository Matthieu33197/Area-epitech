import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<bool> subscribeServiceRequest(String cookie, String service, bool subscribe) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie
  };
  var request = http.Request('POST', Uri.parse('${global.serverIPAdress}api/v3/update-services'));
  request.body = json.encode({
  "service": service,
  "subscribe": subscribe
  });
  request.headers.addAll(headers);

  http.StreamedResponse response = await request.send();

  if (response.statusCode == 200) {
    return true;
  } else {
    return false;
  }

}