import 'dart:convert';
import 'package:area/pages/mainPage.dart';
import 'package:area/pages/login_register/registrationPage.dart';
import 'package:area/pages/views/Account/newPassword.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:area/pages/requests/request_token.dart';
import 'package:area/pages/requests/user_jobs.dart';
import 'package:area/pages/login_register/loginPage.dart';
import 'dart:io';

class WelcomeBackPage extends StatefulWidget {
  var cookie;
  WelcomeBackPage({Key? key, required this.cookie})
      : super(key: key);

  @override
  _WelcomeBackPage createState() => _WelcomeBackPage();
}

class _WelcomeBackPage extends State<WelcomeBackPage> {
 @override
  void initState() {
    super.initState();
    new Future.delayed(
        const Duration(seconds: 1),
        () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => HomePage(cookie: widget.cookie)),
            ));
  }
    @override
  Widget build(BuildContext context) {
    return new Scaffold(
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              "Welcome back !",
              style: new TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            new Padding(
              padding: const EdgeInsets.all(20.0),
            ),
          ],
        ),
      ),
    );
  }
}
