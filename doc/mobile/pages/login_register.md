# The "login_register" folder

4 files cand be found in this folder:

<details>
<summary>boxes.dart</summary>
<br>
This file's main purpos is to host the <strong>createBoxesForLogReg</strong> function. This will enable us in the future to create text boxes in order to save on clarty and space.
</details>

<details>
<summary>loginPage.dart</summary>
<br>
The first thing the user is greated with: <strong>Login</strong>. The login page is composed by two text boxes (email and password) created with the <strong>createBoxesForLogReg</strong> function (found in the 'boxes.dart' file) and a <a href="/doc/mobile/pages//requests.md">sign in button</a>. The button is used to send the user's credentials to the server. If the credentials are correct, the user will be redirected to the main page. If not, an error message will be displayed. We can also find a sign up button that is created with the <strong>createTextButton</strong> function(), and will redirect the user to the sign up page.
</details>

<details>
<summary>registrationPage.dart</summary>
<br>
The famous sign up page also called <strong>registration page</strong>. The first thing a user has to do is register ! Here he can input his username, email and password. These fields are create using once more the <strong>createBoxesForLogReg</strong> function (found in the 'boxes.dart' file) and the information is sent to the server when the <a href="/doc/mobile/pages//requests.md">register button</a> is clicked.
</details>

<details>
<summary>textButton.dart</summary>
<br>
This file's main purpos is to host the <strong>createTextButton</strong> function. This will enable us in the future to create clickable text for redirections.
</details>
