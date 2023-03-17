import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import './global.dart' as global;

Future<http.StreamedResponse> createJob(TextEditingController nameArea,
    var infosAction, var infosReaction, String cookie) async {
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
    'name': nameArea.text,
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
