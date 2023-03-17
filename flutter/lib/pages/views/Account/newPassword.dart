import 'dart:convert';
import 'package:area/pages/mainPage.dart';
import 'package:area/pages/login_register/registrationPage.dart';
import 'package:flutter/material.dart';
import 'package:area/pages/login_register/boxes.dart';
import 'package:http/http.dart' as http;


class newPassword extends StatefulWidget {

  const newPassword({super.key});

  @override
  State<newPassword> createState() => _newPassword();
}

class _newPassword extends State<newPassword> {
  final firstPassword = TextEditingController();
  final secondPassword = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    firstPassword.dispose();
    secondPassword.dispose();
    super.dispose();
  }

  Future<void> newPasswordToDatabase(TextEditingController username, TextEditingController email)  async {
    var headers = {
      'Content-Type': 'application/json',
      'Cookie': 'AREA=54c4a0c0-276f-4943-b873-013bdb41c6d8'
    };
    var request = http.Request('POST', Uri.parse('http://172.17.0.1:8080/api/v3/change-password'));
    request.body = json.encode({
      "oldPassword": firstPassword.text,
      "newPassword": secondPassword.text,
    });

    request.headers.addAll(headers);
    http.StreamedResponse response = await request.send();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold (
      appBar: AppBar(title: const Center(
          child: Text('Forgot password')
      )),
      body:
      SingleChildScrollView (
        child: Column (
          children : [
            const SizedBox(
              height: 40,
            ),
            createBoxesForLogReg(BoxName: "old password", controller: firstPassword),
            createBoxesForLogReg(BoxName: "new password", controller: secondPassword),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                shadowColor: Colors.greenAccent,
                elevation: 3,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(32.0)),
                minimumSize: const Size(140, 40),
              ),
              onPressed: () {
                newPasswordToDatabase(firstPassword, secondPassword);
              },
              child: const Text('submit'),
            ),
          ],
        ),
      ),
    );
  }
}