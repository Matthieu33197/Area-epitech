# The "requests" folder

12 files are in this folder:

<details>
<summary>AcessTokenGoogle_request.dart</summary>
<br>
This files perpouse is to get the access token from google.
</details>

<details>
<summary>AcessTokenReddit_request.dart</summary>
<br>
This files perpouse is to get the access token from Reddit.
</details>

<details>
<summary>changeInfosAccount.dart</summary>
<br>
This files perpouse is to update the user's information. This is done on the profile page of the app.
</details>

<details>
<summary>createJob.dart</summary>
<br>
This file houses the <strong>createJob</strong> function that allows us to create what we call an AREA. An Area is a mix of multiple components: a name, an action and a reaction. These are the 3 main components that will allow us to create it. As you can see, we have multiple arguments:<br>
<br>
- "name": string representing the name of the area<br>
- "action": string representing the action service choosen by the user<br>
- "actionArg": string representing the argument(s) of the action service (can be optional depending on the service)<br>
- "reaction": string representing the reaction service choosen by the user<br>
- "reactionArg": string representing the argument(s) of the reaction service (can be optional depending on the service)<br>
<br>
Once all of these are filled, we will send a request to the database in order to create the area.
</details>

<details>
<summary>getInfosAccount.dart</summary>
<br>
This files perpouse is to retrive the user's information. This is done when you navigate to your profile page.
</details>

<details>
<summary>global.dart</summary>
<br>
The purpose of this file is to store all the avaible servers in order to switch between them. This is done because we have multiple servers, some for production and some for testing.
</details>

<details>
<summary>login_request.dart</summary>
<br>
As it's name says, this file houses the <strong>loginToDatabase</strong> function. This function is used to send the user's credentials to the server for login. If the credentials are correct, the user will be redirected to the main page. If not, an error message will be displayed. The information needed for the login is:<br>
<br>
- "email": string representing the user's email<br>
- "password": string representing the user's password
</details>

<details>
<summary>register_request.dart</summary>
<br>
As it's name says, this file houses the <strong>registerToDatabase</strong> function. This function is used to send the user's credentials to the server in order to be registered. If the credentials are correct, the user will be redirected to the main page. If not, an error message will be displayed. The information needed for the login is:<br>
<br>
- "username": string representing the user's username<br>
- "email": string representing the user's email<br>
- "password": string representing the user's password
</details>

<details>
<summary>request_token.dart</summary>
<br>
This segments allows to fet a variable from our current instance. In our case this is called a <strong>cookie</strong>
</details>

<details>
<summary>services_request.dart</summary>
<br>
In this file, we have two functions. The first one is the <strong>getServicesAvailable</strong> function. This function is used to get all the services available in the database. The second one is the <strong>getActionsAndReactions</strong> function. This function pre-loads all the action and reactions avaible for the user. These are two simple requests that use cookies !
</details>

<details>
<summary>subscribeService_request.dart</summary>
<br>
In here we got a function called <strong>subscribeServiceRequest</strong>. This function is used to send a subcription request to the server. The information needed for the request is:<br>
<br>
- "service": string representing the service choosen by the user<br>
- "subscribe": a boolean that is true if the user wants to subscribe to the service and false if he wants to unsubscribe
</details>

<details>
<summary>user_jobs.dart</summary>
<br>
In this file we can every interactions that user does with the jobs. This goes from retreiving the subscribed services for the jovb creation, to the deletion of a job. This file includes the following functions:<br><br>
- "searchJob": this function helps us to make a search in the 'Area List' tab of our app.<br>
- "deletJob": As its name describes it, this allows us to delete a created AREA.<br>
- "pauseJob": Enables us to pause an AREA.<br>
- "playJob": Helps us to resume/execute and AREA.<br>
- "getUserSubServices": The function returnes the service(s) the user is subscribed to.<br>
- "subscribeService": Enables the user to subscribe to a service<br>
- "unsubscribeService": Unsubscribes the user from the selected service<br>
- "updateJob": Function that allows us to edit some fields/information of a given AREA.<br>
</details>