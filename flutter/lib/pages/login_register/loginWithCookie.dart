import 'dart:convert';
import 'package:area/pages/mainPage.dart';
import 'package:area/pages/login_register/registrationPage.dart';
import 'package:area/pages/views/Account/newPassword.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:area/pages/requests/request_token.dart';
import 'package:area/pages/requests/user_jobs.dart';
import 'package:area/pages/login_register/loginPage.dart';
import 'package:area/pages/login_register/welcomeBackPage.dart';

class LoginWithCookie extends StatefulWidget {
  const LoginWithCookie({super.key});

  @override
  State<LoginWithCookie> createState() => _LoginWithCookie();
}

class _LoginWithCookie extends State<LoginWithCookie> {
  var cookie;
  var data;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder(
          future: getMobileToken(), // the async method that returns a future
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            if (snapshot.hasData) {
              cookie = snapshot.data;
              searchJob(cookie, "").then((value) {
                data = jsonDecode(value);
                if (data['success'].toString() == "true") {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => WelcomeBackPage(cookie: cookie)),
                  );
                } else if (data['success'].toString() == "false") {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginPage()),
                  );
                }
              });
            }
            return MaterialApp(
              title: 'Flutter Demo',
              theme: ThemeData(primarySwatch: Colors.blue),
              debugShowCheckedModeBanner: false,
              home: LoginPage(),
            );
          }),
    );
  }
}
