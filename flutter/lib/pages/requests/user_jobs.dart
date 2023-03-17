import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<String> searchJob(String cookie, String name) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/search-job'));
  request.body = '{"name": "$name"}';
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  return respStr;
}

void deletJob(String cookie, String jobToken) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/delete-job'));
  request.body = '{"jobToken": "$jobToken"}';
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
}

void pauseJob(String cookie, String jobToken) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/stop-job'));
  String myJSON = '{"jobToken": "$jobToken", "stop": true}';
  request.body = myJSON;
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  final data = jsonDecode(respStr);

}

void playJob(String cookie, String jobToken) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/stop-job'));
  String myJSON = '{"jobToken": "$jobToken", "stop": false}';
  request.body = myJSON;
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  final data = jsonDecode(respStr);

}

Future<String> getUserSubServices(String cookie) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request(
      'GET',
      Uri.parse(
          '${global.serverIPAdress}api/v3/get-user-sub-services'));
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  return respStr;
}

void subscribeService(String cookie, String serviceName, String? oauthToken) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/update-services'));
  String myJSON = '{"service": "$serviceName", "subscribe": true, "mobile": true, "token": "$oauthToken"}';
  request.body = myJSON;

  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  final data = jsonDecode(respStr);
}

void unsubscribeService(String cookie, String serviceName) async {
  var headers = {
    'Content-Type': 'application/json',
    'Cookie': cookie,
  };
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/update-services'));
  String myJSON = '{"service": "$serviceName", "mobile": true, "subscribe": false}';
  request.body = myJSON;

  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();
  final respStr = await response.stream.bytesToString();
  final data = jsonDecode(respStr);
}

Future<http.StreamedResponse> updateJob(String cookie, String JobToken, TextEditingController name,
    var infosAction, var infosReaction) async {
  Map<String, dynamic> mapAction = {
  };
    for (var i = 2; i < infosAction.length; i += 2)  {
      mapAction['${infosAction[i]}'] = infosAction[i + 1];
    }
  Map<String, dynamic> mapReaction = {
  };
  for (var i = 2; i < infosReaction.length; i += 2)  {
    mapReaction['${infosReaction[i]}'] = infosReaction[i + 1];
  }
  var headers = {'Content-Type': 'application/json', 'Cookie': cookie};
  var request = http.Request('POST',
      Uri.parse('${global.serverIPAdress}api/v3/update-job'));
  request.body = json.encode({
    'jobToken': '',
    'name': name.text,
    'action': infosAction[1],
    'actionArg': mapAction,
    'reaction': infosReaction[1],
    'reactionArg': mapReaction,
    'interval': 10,
    'runNow': 'true'
  });
  request.headers.addAll(headers);
  http.StreamedResponse response = await request.send();

  return response;
}
