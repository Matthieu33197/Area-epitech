import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:area/pages/requests/global.dart' as global;
import 'package:area/pages/requests/user_jobs.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';

// connect vith reddit
final url = Uri.https('www.reddit.com', '/api/v1/authorize', {
  'response_type': 'code',
  'client_id': '-N7geXrRgbc11UXfGCjsfQ',
  'redirect_uri': 'com.example.area://callback',
  'scope': 'identity,account,mysubreddits,subscribe,privatemessages,read',
  'state': 'aaaaa',
  'duration': 'permanent',
});

void connectServiceReddit(String cookie) async {
  debugPrint(url.toString());
  dynamic response;
  try {
    response = await FlutterWebAuth.authenticate(
        url: url.toString(), callbackUrlScheme: 'com.example.area');
  } catch (error) {
    debugPrint(error.toString());
  }
  var uri = Uri.parse(response);
  var code = uri.queryParameters['code'];
  subscribeService(cookie, "REDDIT", code);
}
