import 'package:area/pages/login_register/loginPage.dart';
import 'package:flutter/material.dart';
import 'package:area/pages/login_register/loginWithCookie.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AREA',
      theme: ThemeData(primarySwatch: Colors.blue),
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}
