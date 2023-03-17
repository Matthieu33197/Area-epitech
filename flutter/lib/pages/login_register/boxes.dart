import 'dart:convert';
import 'package:area/pages/mainPage.dart';
import 'package:area/pages/login_register/registrationPage.dart';
import 'package:area/pages/views/Account/newPassword.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class createBoxesForLogReg extends StatefulWidget {
  String BoxName;
  var controller = TextEditingController();
  createBoxesForLogReg({super.key, required this.BoxName, required this.controller});

  @override
  State<createBoxesForLogReg> createState() => _createBoxesForLogReg();
}

class _createBoxesForLogReg extends State<createBoxesForLogReg> {
  bool _isObscure = true;

  @override
  Widget build(BuildContext context) {
    return (
            Padding (
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
              child:
              TextFormField(
                maxLength: 32,
                obscureText: widget.BoxName == "password" ? _isObscure : false,
                controller: widget.controller,
                decoration: InputDecoration(
                  suffixIcon: widget.BoxName == "password" ? IconButton(
                    icon: Icon(
                      _isObscure ? Icons.visibility_off : Icons.visibility,
                    ),
                    onPressed: () {
                      setState(() {
                        _isObscure = !_isObscure;
                      });
                    },
                  ) : null,
                contentPadding: const EdgeInsets.symmetric(vertical: 25.0, horizontal: 20.0),
                  labelText: "Enter your ${widget.BoxName}",
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(25.0),
                    borderSide: const BorderSide(
                    ),
                  ),
                  //fillColor: Colors.green
                ),
              ),
            )
    );
  }
}