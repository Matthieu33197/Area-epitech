import 'package:flutter/material.dart';
import 'package:expansion_tile_card/expansion_tile_card.dart';
import 'dart:convert';
import './getListArgs.dart';

class createBoxActionReaction extends StatefulWidget {
  var json;
  String ActionOrReaction;
  String ServiceLogo;
  createBoxActionReaction({Key? key, required this.json, required this.ActionOrReaction, required this.ServiceLogo}) : super(key: key);

  @override
  State<createBoxActionReaction> createState() => _createBoxActionReactionState();
}

class _createBoxActionReactionState extends State<createBoxActionReaction> {
  TextEditingController arg = TextEditingController();
  final GlobalKey<ExpansionTileCardState> cardA = GlobalKey();
  List<String> infosActionOrReaction = [];
  final List<TextEditingController> _controllers = [];
  var listArgs;

  @override
  Widget build(BuildContext context) {
    infosActionOrReaction.add(widget.ActionOrReaction.substring(0, widget.ActionOrReaction.length - 1));
    infosActionOrReaction.add(widget.json['name']);
    listArgs = getListArgs(widget.json);

    for (var i = 0; i < widget.json['args'].length; i++) {
      _controllers.add(TextEditingController());
    }
    return ExpansionTileCard(
      baseColor: Colors.cyan[50],
      expandedColor: Colors.cyan[50],
      key: cardA,
      leading: CircleAvatar(
          backgroundColor: Colors.cyan[50],
          child: Image.memory(base64Decode(widget.ServiceLogo)),
      ),
      title: Text(widget.json['name']),
      subtitle: Text(widget.json['description']),
      children: <Widget>[
        const Divider(
          thickness: 1.0,
          height: 1.0,
        ),
        Align(
          alignment: Alignment.centerLeft,
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 16.0,
              vertical: 8.0,
            ),
            child: Center(
              child: Column (
                children: [
                  for (var i = 0, j = 0; i < listArgs.length; i += 2, j++)
                TextFormField(
                controller: _controllers[j],
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.symmetric(vertical: 15.0, horizontal: 12.0),
                  labelText: listArgs[i + 1],
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(
                      width: 2,
                    ),
                  ),
                  //fillColor: Colors.green
                ),
              ),

                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shadowColor: Colors.greenAccent,
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(32.0)),
                    minimumSize: const Size(75, 30),
                  ),
                  onPressed: ()   {
                    bool allArgsFill = true;
                    for (var i = 0; i < widget.json['args'].length; i++)  {
                      if (_controllers[i].text.isEmpty == true) {
                        allArgsFill = false;
                      }
                    }
                    if (allArgsFill == true) {
                      for (var i = 0, j = 0; i < listArgs.length; i += 2, j++) {
                        infosActionOrReaction.add(listArgs[i]);
                        infosActionOrReaction.add(_controllers[j].text);
                      }
                      Navigator.pop(context, infosActionOrReaction);
                    }
                    else {
                      ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            backgroundColor: Colors.white,
                            content: Container(
                              padding: const EdgeInsets.all(10),
                              child: const Text(
                                "You need to fill all the arguments !",
                                style: TextStyle(color: Colors.red),
                              ),
                            ),
                          )
                      );
                      }
                    },
                  child: const Text('Submit'),
                )
              ],
            ),
          ),
          ),
        ),
      ],
    );

  }
}