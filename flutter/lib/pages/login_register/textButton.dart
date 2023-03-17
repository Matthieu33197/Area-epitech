import 'dart:convert';
import 'package:area/pages/mainPage.dart';
import 'package:area/pages/login_register/registrationPage.dart';
import 'package:area/pages/views/Account/newPassword.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class createTextButton extends StatefulWidget {
  String TextButtonName;
  Widget Function() onTap;
  createTextButton({super.key, required this.TextButtonName, required this.onTap});

  @override
  State<createTextButton> createState() => _createTextButton();
}

class _createTextButton extends State<createTextButton> {

  @override
  Widget build(BuildContext context) {
    return (
        TextButton(
            onPressed: () => Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => widget.onTap())),
            child: Text(widget.TextButtonName))
    );
  }
}