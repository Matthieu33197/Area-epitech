import 'dart:convert';
import 'package:flutter/material.dart';
import '../../../requests/services_request.dart';
import '../createArea_chooseLogo/createArea_createLogo.dart';
import './createBoxActionReaction.dart';


class chooseActionOrReaction extends StatefulWidget {
  late final String ActionOrReaction;
  String cookie;
  var infosServices;
  chooseActionOrReaction({Key? key, required this.ActionOrReaction, required this.cookie, required this.infosServices}) : super(key: key);

  @override
  State<chooseActionOrReaction> createState() => _chooseActionOrReactionState();
}

class _chooseActionOrReactionState extends State<chooseActionOrReaction> {
  String title = 'null';
  var listActionsOrReactions;


  @override
  Widget build(BuildContext context) {
    if (widget.ActionOrReaction == "actions") {
      title = "n Action";
    } else {
      title = " Reaction";
    }
    return Container (
        decoration: const BoxDecoration(
        image: DecorationImage(
        image: AssetImage('assets/background.png'), fit: BoxFit.cover),
    ),
    child: Scaffold(
        backgroundColor: Colors.transparent,
        body: FutureBuilder(
          future: getActionsAndReactions(widget.cookie), // the async method that returns a future
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              // if data is loaded
              listActionsOrReactions = jsonDecode(snapshot.data);
              return ( SingleChildScrollView(
                      child:
                          Column (
                            children: [
                              Container(
                                  padding: const EdgeInsets.only(left: 15, top: 75),
                                  child: Row(
                                    children: [
                                      IconButton(
                                        icon: const Icon(Icons.arrow_back, color: Colors.black),
                                        onPressed: () => Navigator.of(context).pop(),
                                      ),
                                      Text(
                                        'Choose a${title}',
                                        style: const TextStyle(color: Colors.black, fontSize: 28),
                                      ),
                                    ],
                                  )
                              ),
                          Padding (
                            padding: const EdgeInsets.all(10),
                            child: Wrap(
                                runSpacing: 40.0,
                                spacing: 30.0,
                                children: [
                                  if (listActionsOrReactions['services'][widget.infosServices['service']][widget.ActionOrReaction] == null)
                                    Text("No available ${widget.ActionOrReaction} for this service")
                                  else
                                    for(var infos in listActionsOrReactions['services'][widget.infosServices['service']][widget.ActionOrReaction])
                                      createBoxActionReaction(json: infos, ActionOrReaction: widget.ActionOrReaction, ServiceLogo: widget.infosServices['logo'])
                                ]
                            ),
                          ),
                      ],
                          )
                    )
              );
            } else {
              // if data not loaded yet
              return const Center (child: CircularProgressIndicator());
            }
          },
        )
    )
    );
  }
}