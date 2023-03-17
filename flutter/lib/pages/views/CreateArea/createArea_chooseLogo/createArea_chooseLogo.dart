import 'package:area/pages/requests/subscribeService_request.dart';
import 'package:area/pages/views/CreateArea/createArea_chooseLogo/createArea_createLogo.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import '../../../requests/services_request.dart';

class chooseLogo extends StatefulWidget {
  final String ActionOrReaction;
  final String cookie;
  const chooseLogo({Key? key, required this.ActionOrReaction, required this.cookie}) : super(key: key);

  @override
  State<chooseLogo> createState() => _chooseLogo();
}

class _chooseLogo extends State<chooseLogo> {
  var listServices;
  late String title;

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
          future: getServicesAvailable(widget.cookie), // the async method that returns a future
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              // if data is loaded
              listServices = jsonDecode(snapshot.data);
              return SingleChildScrollView(
                child:
                    Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.only(left: 40, top: 75),
                          child: const Text(
                            'Choose a Service',
                            style: TextStyle(color: Colors.black, fontSize: 40),
                          ),
                        ),
                          Padding (
                            padding: const EdgeInsets.all(40),
                            child:
                            Wrap(
                                runSpacing: 40.0,
                                spacing: 30.0,
                                children: [
                                  for(var infos in listServices['services']) if (infos['subscribed'].toString() == "true") createLogo(ActionOrReaction: widget.ActionOrReaction, cookie: widget.cookie, infosServices: infos)
                                ]
                            ),
                          ),
                          ],
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