import 'dart:convert';
import 'package:flutter/material.dart';
import '../../requests/user_jobs.dart';
import './areaList_view.dart';

class areaListBuilder extends StatefulWidget {
  String cookie;
  areaListBuilder({Key? key, required this.cookie}) : super(key: key);

  @override
  State<areaListBuilder> createState() => _areaListBuilder();
}

class _areaListBuilder extends State<areaListBuilder> {
  var listServices;

  @override
  Widget build(BuildContext context) {
    return Container (
        decoration: const BoxDecoration(
        image: DecorationImage(
        image: AssetImage('assets/background.png'), fit: BoxFit.cover),
    ),
    child: Scaffold(
        backgroundColor: Colors.transparent,
        //button refresh: ButtonRefresh
        
        body: FutureBuilder(
      future: searchJob(
          widget.cookie, ""), // the async method that returns a future
      builder: (BuildContext context, AsyncSnapshot snapshot) {
        if (snapshot.hasData) {
          // if data is loaded
          listServices = jsonDecode(snapshot.data);
          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Wrap(runSpacing: 40.0, spacing: 30.0, children: [
                Container(
                  padding: const EdgeInsets.only(left: 15, top: 75),
                  child: const Text(
                    'The list of your AREA',
                    style: TextStyle(color: Colors.black, fontSize: 40),
                  ),
                ),
              
                if (listServices['job'].length == null)
                  const Text("No available for this service")
                else
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      shadowColor: Colors.greenAccent,
                      elevation: 3,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(32.0)),
                      minimumSize: const Size(100, 40),
                    ),
                    onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => areaListBuilder(cookie: widget.cookie)), // services setings page
                    ),
                    child: const Text('refresh'),
                  ),
                  for (var i = 0; i < listServices['job'].length; i++)
                    createBoxAreaList(cookie: widget.cookie, json: listServices['job'], index: i),
              ]),
              
            ),
            
          );
          
        } else {
          // if data not loaded yet
          return const Center(child: CircularProgressIndicator());
        }
      },
    )));
  }
}
