import 'package:flutter/material.dart';

List<String> getListArgs(json) {
  List<String> listArgs = [];

    for (var infos in json['args']) {
      for (var infos2 in infos.entries) {
        listArgs.add(infos2.key);
        listArgs.add(infos2.value);
      }
    }

    return listArgs;
}