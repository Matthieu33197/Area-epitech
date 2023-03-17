import 'package:flutter/material.dart';
import 'package:area/pages/views/Account/account_view.dart';
import 'package:area/pages/views/AreaList/areaList_view.dart';
import 'package:area/pages/views/AreaList/createAreaListBox.dart';
import 'package:area/pages/views/CreateArea/createArea_mainPage.dart/createArea_view.dart';
import 'package:area/pages/persistentBottomNavBar.dart';
import 'package:area/pages/requests/request_token.dart';
import 'dart:async';

class HomePage extends StatefulWidget {
  final String cookie;

  HomePage({super.key, required this.cookie});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _tab1navigatorKey = GlobalKey<NavigatorState>();
  final _tab2navigatorKey = GlobalKey<NavigatorState>();
  final _tab3navigatorKey = GlobalKey<NavigatorState>();
  // Timer? timer;
// setMobileToken();
  @override
  Widget build(BuildContext context) {
    setMobileToken(widget.cookie);
    return PersistentBottomBarScaffold(
      items: [
        PersistentTabItem(
          tab: CreateAreaView(cookie: widget.cookie),
          icon: Icons.add,
          title: 'Create Area',
          navigatorkey: _tab1navigatorKey,
        ),
        PersistentTabItem(
          tab: areaListBuilder(cookie: widget.cookie),
          icon: Icons.list,
          title: 'Area List',
          navigatorkey: _tab2navigatorKey,
        ),
        PersistentTabItem(
          tab: AccountView(cookie: widget.cookie),
          icon: Icons.person,
          title: 'Account',
          navigatorkey: _tab3navigatorKey,
        ),
      ],
    );
  }
}
