import 'dart:convert';

import 'package:area/pages/views/CreateArea/createArea_subscribeService/createArea_subscribeService.dart';
import 'package:flutter/material.dart';
import '../createArea_chooseActionOrReaction/createArea_chooseActionOrReaction.dart';

class createLogo extends StatefulWidget {
  String ActionOrReaction;
  String cookie;
  var infosServices;
  createLogo({Key? key, required this.ActionOrReaction, required this.cookie, required this.infosServices}) : super(key: key);

  @override
  State<createLogo> createState() => _createLogoState();
}

class _createLogoState extends State<createLogo> {
  @override
  Widget build(BuildContext context) {

    return InkWell(
      onTap: () async {
        _navigateAndDisplaySelection(context);
      },
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20.0),
        child: Image.memory(base64Decode(widget.infosServices['logo']),
            width: 150.0, height: 150.0),
      ),
    );
  }

  Future<void> _navigateAndDisplaySelection(BuildContext context) async {
    var infosActionOrReaction = await Navigator.push(
      context,
        MaterialPageRoute(
            builder: (context) =>
                chooseActionOrReaction(ActionOrReaction: widget.ActionOrReaction, cookie: widget.cookie, infosServices: widget.infosServices)));
    if (!mounted) return;
    if (infosActionOrReaction.length != 0) {
        Navigator.pop(context, infosActionOrReaction);
    }

  }
}