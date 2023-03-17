import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../requests/user_jobs.dart';
import 'package:expansion_tile_card/expansion_tile_card.dart';
import 'package:area/pages/requests/request_token.dart';
import 'package:area/pages/views/AreaList/createAreaListBox.dart';
import 'package:flutter/widgets.dart';
import 'package:area/pages/mainPage.dart';
import 'dart:convert';

class createBoxAreaList extends StatefulWidget {
  var json;
  int index;
  var cookie;
  createBoxAreaList(
      {Key? key, required this.cookie, required this.json, required this.index})
      : super(key: key);

  @override
  State<createBoxAreaList> createState() => _createBoxAreaList();
}

class _createBoxAreaList extends State<createBoxAreaList> {
  TextEditingController arg = TextEditingController();
  final GlobalKey<ExpansionTileCardState> cardA = GlobalKey();
  final List<TextEditingController> _controllers = [];
  var jobName = TextEditingController();
  var jobActionArg = TextEditingController();
  var jobReactionArg = TextEditingController();
  var listArgs;
  var listServices;
  late bool values = widget.json[widget.index]['is_stoped'];

  @override
  Widget build(BuildContext context) {
    return ExpansionTileCard(
      baseColor: Colors.cyan[50],
      expandedColor: Colors.cyan[50],
      key: cardA,
      title: Text(widget.json[widget.index]['name']),
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
            child: Column(
              children: [
                Text("On / Off"),
                Switch(
                  value: !values,
                  onChanged: (value) {
                    setState(() {
                      if (value == false) {
                        pauseJob(widget.cookie,
                            widget.json[widget.index]['jobToken']);
                      } else {
                        playJob(widget.cookie,
                            widget.json[widget.index]['jobToken']);
                      }
                      values = !value;
                    });
                  },
                ),
                TextButton(
                    style: ButtonStyle(
                      foregroundColor: MaterialStateProperty.all<Color>(
                          Color.fromARGB(255, 75, 33, 243)),
                      overlayColor: MaterialStateProperty.resolveWith<Color?>(
                        (Set<MaterialState> states) {
                          if (states.contains(MaterialState.hovered))
                            return Color.fromARGB(255, 75, 33, 243)
                                .withOpacity(0.04);
                          if (states.contains(MaterialState.focused) ||
                              states.contains(MaterialState.pressed))
                            return Color.fromARGB(255, 75, 33, 243)
                                .withOpacity(0.12);
                          return null; // Defer to the widget's default.
                        },
                      ),
                    ),
                    onPressed: () {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                              title: const Text('Modify a existant job ?'),
                              content: Text("action:    ${widget.json[widget.index]['actionService']} \nreaction: ${widget.json[widget.index]['reactionService']}"),
                              actions: [
                                TextField(
                                  controller: jobName,
                                  style: const TextStyle(color: Colors.black),
                                  decoration: InputDecoration(
                                      fillColor: Colors.grey.shade100,
                                      filled: true,
                                      hintText:
                                          "Service name: ${widget.json[widget.index]['name']}",
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      )),
                                ),
                                TextField(
                                  controller: jobActionArg,
                                  style: const TextStyle(color: Colors.black),
                                  decoration: InputDecoration(
                                      fillColor: Colors.grey.shade100,
                                      filled: true,
                                      hintText:
                                          "Service action: ${widget.json[widget.index]['actionArg']}",
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      )),
                                ),
                                TextField(
                                  controller: jobActionArg,
                                  style: const TextStyle(color: Colors.black),
                                  decoration: InputDecoration(
                                      fillColor: Colors.grey.shade100,
                                      filled: true,
                                      hintText:
                                          "Service reaction:${widget.json[widget.index]['reactionArg'][1]}",
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      )),
                                ),
                                ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                        primary:
                                            Color.fromARGB(255, 96, 43, 230)),
                                    onPressed: () {
                                      Navigator.pop(context);
                                    },
                                    child: const Text('No')),
                                ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                        primary:
                                            Color.fromARGB(255, 73, 54, 244)),
                                    onPressed: () {
                                      deletJob(
                                          widget.cookie,
                                          widget.json[widget.index]
                                              ['jobToken']);
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => HomePage(
                                                cookie: widget
                                                    .cookie)), // services setings page
                                      );
                                    },
                                    child: const Text(
                                      'Delete',
                                    )),
                              ],
                            );
                          });
                    },
                    child: const Text('Edit Area')),
                TextButton(
                    style: ButtonStyle(
                      foregroundColor: MaterialStateProperty.all<Color>(
                          Color.fromARGB(255, 243, 33, 79)),
                      overlayColor: MaterialStateProperty.resolveWith<Color?>(
                        (Set<MaterialState> states) {
                          if (states.contains(MaterialState.hovered))
                            return Color.fromARGB(255, 212, 9, 9)
                                .withOpacity(0.04);
                          if (states.contains(MaterialState.focused) ||
                              states.contains(MaterialState.pressed))
                            return Color.fromARGB(255, 226, 12, 55)
                                .withOpacity(0.12);
                          return null; // Defer to the widget's default.
                        },
                      ),
                    ),
                    onPressed: () {
                      showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                              title: const Text('Delete?'),
                              content: const Text(
                                  'Are you sure you want to delete this Job ?'),
                              actions: [
                                ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                        primary: Colors.green),
                                    onPressed: () {
                                      Navigator.pop(context);
                                    },
                                    child: const Text('No')),
                                ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                        primary: Colors.red),
                                    onPressed: () {
                                      deletJob(
                                          widget.cookie,
                                          widget.json[widget.index]
                                              ['jobToken']);
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) => HomePage(
                                                cookie: widget
                                                    .cookie)), // services setings page
                                      );
                                    },
                                    child: const Text(
                                      'Delete',
                                    )),
                              ],
                            );
                          });
                    },
                    child: const Text('Delet Area'))
              ],
            ),
          ),
        ),
      ],
    );
  }
}
