# **How to create actions and reactions**

## **Authors**

- adrien.moreau@epitech.eu

## **Actions**

First in server/src/area/action and in server/src/middleware/expected_area find the file with your service name.

Once done in your service's file in server/src/area/action create and export your new action(s).

Add your new action(s) info in your info map.

Now in your file in server/src/middleware/expected_area import what you need, create a map that will contain your expected action(s) name and a function to check if all the necessary elemnt are available and add your own needed. Finally export your map.

Now your action(s) is available :)

## **Reactions**

First in server/src/area/reaction and in server/src/middleware/expected_area find the file with your service name.

Once done in your service's file in server/src/area/reaction create and export your new reaction(s)

Add your new reaction(s) info in your info map.

Now in your file in server/src/middleware/expected_area import what you need, create a map that will contain your expected reaction(s) name and a function to check if all the necessary elemnt are available and add your own needed. Finally export your map.

Now your reaction(s) is available :)

## **Oauth 2 action(s)/reaction(s)**

Don't forget to use apiGetter from server/src/controllers/api_access and to add in your check the user's token.