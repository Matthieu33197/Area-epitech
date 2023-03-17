import 'dart:convert';
import 'package:flutter/material.dart';
import '../../requests/getInfosAccount.dart';
import '../../requests/changeInfosAccount.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:area/pages/login_register/loginPage.dart';
import 'package:area/pages/requests/request_token.dart';
import 'package:area/pages/views/Account/Services/services_setting_createBox.dart';

class AccountView extends StatefulWidget {
  String cookie;
  AccountView({Key? key, required this.cookie}) : super(key: key);

  @override
  State<AccountView> createState() => _AccountViewState();
}

class _AccountViewState extends State<AccountView> {
  File? _image;
  var avatar;

  Future getImage() async {
    final image = await ImagePicker()
        .pickImage(source: ImageSource.gallery, imageQuality: 10);
    if (image == null) return;

    final imageTemporary = File(image.path);

    setState(() {
      _image = imageTemporary;
      List<int> imageBytes = _image!.readAsBytesSync();
      String imageInBase64 = base64Encode(imageBytes);
      avatar = imageInBase64;
    });
  }

  @override
  Widget build(BuildContext context) {
    var infosAccount;

    return Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
              image: AssetImage('assets/background.png'), fit: BoxFit.cover),
        ),
        child: Scaffold(
            backgroundColor: Colors.transparent,
            body: FutureBuilder(
              future: getInfosAccount(widget.cookie),
              // the async method that returns a future
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                if (snapshot.hasData) {
                  // if data is loaded
                  infosAccount = jsonDecode(snapshot.data);
                  var username = infosAccount['user']['username'];
                  var email = infosAccount['user']['email'];
                  var name = infosAccount['user']['name'];
                  var lastname = infosAccount['user']['lstName'];
                  if (infosAccount['user']['avatar'].toString().contains(',') == true) {
                    avatar ??= infosAccount['user']['avatar'].toString().split(',')[1];
                  }
                  else {
                    avatar ??= infosAccount['user']['avatar'].toString();

                  }
                  TextEditingController _username =
                      TextEditingController(text: username);
                  TextEditingController _email =
                      TextEditingController(text: email);
                  TextEditingController _name =
                      TextEditingController(text: name);
                  TextEditingController _lastname =
                      TextEditingController(text: lastname);
                  name ??= '';
                  lastname ??= '';
                  avatar ??= '';
                  return ListView(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 32, vertical: 75),
                      physics: BouncingScrollPhysics(),
                      children: [
                        const Center(
                          child: Text(
                            'Account',
                            style: TextStyle(color: Colors.black, fontSize: 40),
                          ),
                        ),
                        const SizedBox(
                          height: 40,
                        ),
                        avatar == null
                            ? Center(
                                child: Stack(
                                children: [
                                  ClipOval(
                                      child: Material(
                                          color: Colors.transparent,
                                          child: Ink.image(
                                            image: const NetworkImage(
                                              'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png',
                                            ),
                                            fit: BoxFit.cover,
                                            width: 128,
                                            height: 128,
                                          ))),
                                  Positioned(
                                    bottom: 0,
                                    right: 4,
                                    child: CircleAvatar(
                                      radius: 20,
                                      backgroundColor: Colors.blue,
                                      child: IconButton(
                                          icon: const Icon(
                                            Icons.add_a_photo,
                                            color: Colors.white,
                                          ),
                                          onPressed: getImage),
                                    ),
                                  ),
                                ],
                              ))
                            : Center(
                                child: Stack(
                                children: [
                                  ClipOval(
                                      child: Material(
                                          color: Colors.transparent,
                                          child: Ink.image(
                                            image: MemoryImage(
                                                base64Decode(avatar)),
                                            fit: BoxFit.cover,
                                            width: 128,
                                            height: 128,
                                          ))),
                                  Positioned(
                                    bottom: 0,
                                    right: 4,
                                    child: CircleAvatar(
                                      radius: 20,
                                      backgroundColor: Colors.blue,
                                      child: IconButton(
                                          icon: const Icon(
                                            Icons.add_a_photo,
                                            color: Colors.white,
                                          ),
                                          onPressed: getImage),
                                    ),
                                  ),
                                ],
                              )),
                        const Text(
                          'Email',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        SizedBox(
                          height: 8,
                        ),
                        TextField(
                          enabled: false,
                          controller: _email,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        const Text(
                          'Username',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(
                          height: 8,
                        ),
                        TextField(
                          enabled: false,
                          controller: _username,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        Row(
                          children: const [
                            Text(
                              'Firstname',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            SizedBox(
                              width: 110,
                            ),
                            Text(
                              'Lastname',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                          ],
                        ),
                        const SizedBox(
                          height: 8,
                        ),
                        Row(children: <Widget>[
                          Flexible(
                            child: TextField(
                              controller: _name,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Flexible(
                            child: TextField(
                              controller: _lastname,
                              decoration: InputDecoration(
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                            ),
                          ),
                        ]),
                        const SizedBox(
                          height: 20,
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            shadowColor: Colors.greenAccent,
                            elevation: 3,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: const Size(100, 40),
                          ),
                          onPressed: () => OnPressedSave(
                              context, _name.text, _lastname.text),
                          child: const Text('Save'),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
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
                              MaterialPageRoute(builder: (context) => serviceSettingCreateBox(cookie: widget.cookie)), // services setings page
                            ),
                          child: const Text('Services Settings'),
                        ),
                        TextButton(
                          onPressed: () {
                            setMobileToken("token");
                            Navigator.of(context, rootNavigator: true)
                                .pushAndRemoveUntil(
                              MaterialPageRoute(
                                builder: (BuildContext context) {
                                  return const LoginPage();
                                },
                              ),
                              (_) => false,
                            );
                          },
                          style: const ButtonStyle(),
                          child: const Text(
                            'Log out',
                            textAlign: TextAlign.left,
                            style: TextStyle(
                                decoration: TextDecoration.underline,
                                color: Colors.white70,
                                fontSize: 18),
                          ),
                        )
                      ]);
                } else {
                  // if data not loaded yet
                  return const Center(child: CircularProgressIndicator());
                }
              },
            )));
  }

  void OnPressedSave(context, firstname, lastname) async {
    List<int> imageBytes = _image!.readAsBytesSync();
    String image = base64Encode(imageBytes);
    http.StreamedResponse response =
        await updateInfosAccount(widget.cookie, firstname, lastname, image);
    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: Colors.white,
        content: Container(
          padding: const EdgeInsets.all(10),
          child: const Text(
            "New informations saved",
            style: TextStyle(color: Colors.green),
          ),
        ),
      ));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: Colors.white,
        content: Container(
          padding: const EdgeInsets.all(10),
          child: const Text(
            "Too big Image",
            style: TextStyle(color: Colors.red),
          ),
        ),
      ));
    }
  }
}
