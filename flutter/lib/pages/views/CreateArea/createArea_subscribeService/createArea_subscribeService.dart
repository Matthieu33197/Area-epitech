import 'package:flutter/material.dart';
import 'package:area/pages/requests/subscribeService_request.dart';
import '../createArea_chooseActionOrReaction/createArea_chooseActionOrReaction.dart';


class subscribeService extends StatefulWidget {
  String ActionOrReaction;
  String cookie;
  var infosServices;
  subscribeService({Key? key, required this.ActionOrReaction, required this.cookie, required this.infosServices}) : super(key: key);

  @override
  State<subscribeService> createState() => _subscribeServiceState();
}

class _subscribeServiceState extends State<subscribeService> {
  @override
  Widget build(BuildContext context) {
    return Container (
        decoration: const BoxDecoration(
        image: DecorationImage(
        image: AssetImage('assets/background.png'), fit: BoxFit.cover),
    ),
    child: Scaffold(
      backgroundColor: Colors.transparent,
      body:
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
              'Subscribe to ${widget.infosServices['service']} ?',
              style: const TextStyle(color: Colors.black, fontSize: 28),
            ),
          ],
        )
      ),
      const SizedBox(
        height: 100,
      ),
        Center( child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          shadowColor: Colors.greenAccent,
          elevation: 3,
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(32.0)),
          minimumSize: const Size(140, 40),
        ),
        onPressed: () async {
          bool response = await subscribeServiceRequest(widget.cookie, widget.infosServices['service'], true);
          if (response == true) {
            if (!mounted) return;
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                backgroundColor: Colors.white,
                content: Container (
                  padding: const EdgeInsets.all(10),
                  child: const Text(
                    "successful subscription !",
                    style: TextStyle(color: Colors.green),
                  ),
                ),
              ),
            );
            if (!mounted) return;
            var infosActionOrReaction = await Navigator.of(context).push(
                MaterialPageRoute(
                    builder: (context) =>
                        chooseActionOrReaction(ActionOrReaction: widget.ActionOrReaction, cookie: widget.cookie, infosServices: widget.infosServices)));
            if (!mounted) return;
            if (infosActionOrReaction.length != 0) {
              Navigator.pop(context, infosActionOrReaction);
            }
          }
          else {
            if (!mounted) return;
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                backgroundColor: Colors.white,
                content: Container (
                  padding: const EdgeInsets.all(10),
                  child: const Text(
                    "Can't do this !",
                    style: TextStyle(color: Colors.red),
                  ),
                ),
              ),
            );
          }


        },
        child: const Text('Yes !'),
      ),
        ),
        ],
          )
    )
    );
  }
}