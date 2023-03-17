import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:area/pages/requests/user_jobs.dart';
import 'package:area/pages/views/Account/Services/create_box_service_list.dart';

class serviceSettingCreateBox extends StatefulWidget {
  String cookie;
  serviceSettingCreateBox({Key? key, required this.cookie}) : super(key: key);

  @override
  State<serviceSettingCreateBox> createState() => _serviceSettingCreateBox();
}

class _serviceSettingCreateBox extends State<serviceSettingCreateBox> {
  var listServices;

  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage('assets/background.png'), fit: BoxFit.cover),
        ),
        child: Scaffold(
            backgroundColor: Colors.transparent,
            body: FutureBuilder(
              future: getUserSubServices(
                  widget.cookie), 
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                if (snapshot.hasData) {
                  listServices = jsonDecode(snapshot.data);
                    return SingleChildScrollView(
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Wrap(runSpacing: 40.0, spacing: 30.0, children: [
                          Container(
                            padding: const EdgeInsets.only(left: 15, top: 75),
                            child: const Text(
                              'services',
                              style:
                                  TextStyle(color: Colors.black, fontSize: 40),
                            ),
                          ),
                          if (listServices['services'].length == null)
                            const Text("No services avalable for now.")
                          else
                            for (var i = 0;
                                i < listServices['services'].length;
                                i++)
                              createBoxServiceList(
                                  cookie: widget.cookie,
                                  json: listServices['services'],
                                  index: i)
                        ]
                        ),
                      ),
                    );
                } else {
                  return const Center(child: CircularProgressIndicator());
                }
              },
            )));
  }
}