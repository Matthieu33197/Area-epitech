import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:area/pages/requests/user_jobs.dart';
import 'package:expansion_tile_card/expansion_tile_card.dart';
import 'package:area/pages/requests/request_token.dart';
import 'package:flutter/widgets.dart';
import 'package:area/pages/views/Account/Services/create_loggin_with_button.dart';
import 'package:area/pages/views/Account/Services/Oauth2/connect_service_reddit.dart';
import 'dart:convert';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'Oauth2/connect_service_google.dart';

class createBoxServiceList extends StatefulWidget {
  var json;
  int index;
  var cookie;
  createBoxServiceList(
      {Key? key, required this.cookie, required this.json, required this.index})
      : super(key: key);

  @override
  State<createBoxServiceList> createState() => _createBoxServiceList();
}

class _createBoxServiceList extends State<createBoxServiceList> {
  TextEditingController arg = TextEditingController();
  final GlobalKey<ExpansionTileCardState> cardA = GlobalKey();
  final List<TextEditingController> _controllers = [];
  var listArgs;
  var listServices;
  late bool values = widget.json[widget.index]['subscribed'];
  @override
  Widget build(BuildContext context) {
    return ExpansionTileCard(
      baseColor: Colors.cyan[50],
      expandedColor: Colors.cyan[50],
      key: cardA,
      title: Text(widget.json[widget.index]['service']),
      children: <Widget>[
        const Divider(
          thickness: 1.0,
          height: 1.0,
        ),
        if (widget.json[widget.index]['service'] == "REDDIT")
          SignInButton(
            Buttons.Reddit,
            text: "Sign up with Reddit",
            onPressed: () {
              connectServiceReddit(widget.cookie);
            },
          ),
        if (widget.json[widget.index]['service'] == "GOOGLE")
          SignInButton(
            Buttons.Google,
            text: "Sign up with Google",
            onPressed: connectServiceGoogle,
          ),
        if (widget.json[widget.index]['service'] == "GOOGLE" ||
            widget.json[widget.index]['service'] == "REDDIT")
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Color.fromARGB(255, 255, 73, 73),
            ),
            onPressed: () {
              unsubscribeService(
                  widget.cookie, widget.json[widget.index]['service']);
            },
            child: Text('Logout ${widget.json[widget.index]['service']}'),
          ),
        Align(
          alignment: Alignment.centerLeft,
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 16.0,
              vertical: 8.0,
            ),
            child: Column(
              children: [
                if (widget.json[widget.index]['service'] != "GOOGLE" &&
                    widget.json[widget.index]['service'] != "REDDIT")
                  Text("Subscribe"),
                if (widget.json[widget.index]['service'] != "GOOGLE" &&
                    widget.json[widget.index]['service'] != "REDDIT")
                  Switch(
                    value: values,
                    onChanged: (value) {
                      setState(() {
                        if (value == false) {
                          unsubscribeService(widget.cookie,
                              widget.json[widget.index]['service']);
                        } else {
                          subscribeService(widget.cookie,
                              widget.json[widget.index]['service'], "");
                        }
                        values = value;
                      });
                    },
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

// keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
