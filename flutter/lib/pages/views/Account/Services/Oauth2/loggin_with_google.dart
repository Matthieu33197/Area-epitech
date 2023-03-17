import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import '../../../../requests/AcessTokenGoogle_request.dart';

class GoogleSignInApi {
  static final _googleSignIn = GoogleSignIn();

  static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();
}

Future<String?> logginWithGoogle() async {
  var token;

  final user = await GoogleSignInApi.login();
  if (user == null) {
    return ("error");
  } else {
    final authed = await user.authentication;
    token = await AccessTokenGoogle(authed.accessToken!);
    return token;
  }
}
