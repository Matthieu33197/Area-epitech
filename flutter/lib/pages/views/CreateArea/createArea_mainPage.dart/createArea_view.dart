import 'dart:ui';

import 'package:area/pages/views/CreateArea/createArea_chooseLogo/createArea_chooseLogo.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../../requests/createJob.dart';


class CreateAreaView extends StatefulWidget {
  final String cookie;
  var infosAction = [];
  var infosReaction = [];
  CreateAreaView({super.key, required this.cookie});

  @override
  State<CreateAreaView> createState() => _CreateAreaViewState();
}

class _CreateAreaViewState extends State<CreateAreaView> {
  TextEditingController AreaName = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container (
        decoration: const BoxDecoration(
        image: DecorationImage(
        image: AssetImage('assets/background.png'), fit: BoxFit.cover),
    ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
      body: ListView (
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 75),
        children: [
          Container(
            padding: const EdgeInsets.only(left: 15, top: 0),
            child: const Text(
              'Create Your Area',
              style: TextStyle(color: Colors.black, fontSize: 40),
            ),
          ),
          const SizedBox(
            height: 40,
          ),
          Padding (
            padding: const EdgeInsets.all(10),
            child:
            TextField(
              controller: AreaName,
              style: const TextStyle(color: Colors.black),
              decoration: InputDecoration(
                  fillColor: Colors.white70,
                  filled: true,
                  hintText: "Enter the name of your Area",
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  )),
            ),
          ),
          const SizedBox(
              height: 20,
          ),
            Container(
            width: 340.0,
            height: 140.0,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24.0),
              color: Colors.black87,
            ),
            padding: const EdgeInsets.all(10),
            child: Column ( children: [
              const SizedBox(
                height: 10,
              ),
              Row (
                mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const SizedBox(
                      width: 70,
                    ),
                const Text(
                'IF THIS',
                style: TextStyle(
                  fontFamily: 'Arial',
                  fontSize: 26,
                  color: Colors.white,
                  height: 1,
                ),
                textAlign: TextAlign.center,
              ),
              widget.infosAction.isNotEmpty ?
              TextButton(
                onPressed: () {
                  setState(() {
                  widget.infosAction = [];
                  });
                },
                style: const ButtonStyle(),
                child: const Text(
                  'delete',
                  textAlign: TextAlign.left,
                  style: TextStyle(
                      decoration: TextDecoration.underline,
                      color: Colors.red,
                      fontSize: 18),
                ),
              ) : const SizedBox(width: 60,),
              ]
              ),
              const SizedBox(
                height: 20,
              ),
              widget.infosAction.isEmpty ? ElevatedButton(
                style: ElevatedButton.styleFrom(
                  shadowColor: Colors.greenAccent,
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(32.0)),
                  minimumSize: const Size(100, 40),
                ),
                onPressed: () => onPressedIfThis(),
                child: const Text('ADD'),
              ) : Text(widget.infosAction[1],
                style: const TextStyle(
                  fontFamily: 'Arial',
                  fontSize: 20,
                  color: Colors.white,
                  height: 1,
                ),
                textAlign: TextAlign.center,
              )
            ],
            ),
          ),
            const SizedBox(
              height: 100,
            ),
            Container(
              width: 340.0,
              height: 140.0,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(24.0),
                color: Colors.black87,
              ),
              padding: const EdgeInsets.all(10),
              child: Column ( children: [
                const SizedBox(
                  height: 10,
                ),
                Row (
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const SizedBox(
                        width: 70,
                      ),
                      const Text(
                        'THEN THAT',
                        style: TextStyle(
                          fontFamily: 'Arial',
                          fontSize: 26,
                          color: Colors.white,
                          height: 1,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      widget.infosReaction.isNotEmpty ?
                      TextButton(
                        onPressed: () {
                          setState(() {
                            widget.infosReaction = [];
                          });
                        },
                        style: const ButtonStyle(),
                        child: const Text(
                          'delete',
                          textAlign: TextAlign.left,
                          style: TextStyle(
                              decoration: TextDecoration.underline,
                              color: Colors.red,
                              fontSize: 18),
                        ),
                      ) : const SizedBox(width: 60,),
                    ]
                ),
                const SizedBox(
                  height: 20,
                ),
                widget.infosReaction.isEmpty ? ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shadowColor: Colors.greenAccent,
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(32.0)),
                    minimumSize: const Size(100, 40),
                  ),
                  onPressed: () => onPressedThenThat(),
                  child: const Text('ADD'),
                ) : Text(widget.infosReaction[1],
                  style: const TextStyle(
                    fontFamily: 'Arial',
                    fontSize: 20,
                    color: Colors.white,
                    height: 1,
                  ),
                  textAlign: TextAlign.center,
                )

                ],
            ),
          ),
          const SizedBox(
            height: 25,
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              shadowColor: Colors.greenAccent,
              elevation: 3,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32.0)),
              minimumSize: const Size(100, 40),
            ),
            onPressed: () => submitArea(),
            child: const Text('Submit'),
          )
      ],
      ),
    ),
    );
  }
  void onPressedThenThat() async {
    var data = await Navigator.of(context).push(
        MaterialPageRoute(builder: (context) => chooseLogo(ActionOrReaction: 'reactions', cookie: widget.cookie,)));
    setState(() {
      widget.infosReaction = data;
    });
  }
  void onPressedIfThis() async {
    var data = await Navigator.of(context).push(
        MaterialPageRoute(builder: (context) => chooseLogo(ActionOrReaction: 'actions', cookie: widget.cookie)));
    setState(() {
      widget.infosAction = data;
    });
  }
  void submitArea() async {
    if (AreaName.text.isEmpty == true || widget.infosAction.isEmpty == true ||
        widget.infosReaction.isEmpty == true) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: Colors.white,
            content: Container(
              padding: const EdgeInsets.all(10),
              child: const Text(
                "Missing informations !",
                style: TextStyle(color: Colors.red),
              ),
            ),
          )
      );
    }
    else {
      http.StreamedResponse response = (await createJob(
      AreaName, widget.infosAction, widget.infosReaction,
          widget.cookie));
    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: Colors.white,
        content: Container(
        padding: const EdgeInsets.all(10),
        child: const Text(
          "AREA successfully created !",
          style: TextStyle(color: Colors.green),
            ),
          ),
        )
      );
      setState(() {
        AreaName.clear();
        widget.infosAction = [];
        widget.infosReaction = [];
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: Colors.white,
            content: Container(
              padding: const EdgeInsets.all(10),
              child: const Text(
                "AREA Not created !",
                style: TextStyle(color: Colors.red),
              ),
            ),
          )
      );
    }

  }
  }
}

