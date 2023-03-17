# The File system

## A global overview:
- At the root of our mobile part (Flutter folder), we can find a Dockerfile. It is thanks to this dockerfile that we can "compile" our flutter code to get the app (.apk extension).
- Once compiled, the APK (Compiled app) will be waiting for us in the "app" folder.
- In the assets folder, we will find different images used in the application.
- The "main project" is located in the folder named "lib".
- For our naming convention, we use the camelCase method

### The assets folder:
> Inside this folder, we can find the images used in the app. We can see that the images are sorted into their corresponding folder depending on their use.

### The 'lib' folder
> The "lib" folder is where the magic happens.

In the "lib" folder we can see two elements:
- The pages folder
- The main.dart file

The **'main.dart'** file contains the **basics of the app**, and doesn't have much purpos besides initializing / launching the app.

### Pages
The **"pages"** folder contains the *elements that compose the app**. Once opened, we can see 2 files and 3 folders:

<details>
<summary>mainPage.dart</summary>
<br>
This file contains the first page that greats the user after login or sign up. As you can see it returns a navbar <strong>using the PersistentBottomBarScaffold function</strong> (This function is defined in the persistentBottomNavBar.dart folder). This navbar can be seen on the user's buttom screen in order to help him navigate between 3 menu points. These menu points are: <strong>Create Area,Area List and Account.</strong>
</details>

<details>
<summary>persistentBottomNavBar.dart</summary>
<br>
As said in the part above, <strong>this file contains the PersistentBottomBarScaffold function</strong>. This function creates the buttom navbar that can be seen on the user's buttom screen after the login.
</details>

- The [login_register](/doc/mobile/pages/login_register.md) folder
- The [requests](/doc/mobile/pages/requests.md) folder
- The [views](/doc/mobile/pages/views/) folder