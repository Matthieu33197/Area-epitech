# **How To Create Services**

## **Authors**

- adrien.moreau@epitech.eu

## **All Services**

First you need to add your new service in the database. To do so go in server/prisma/schema.prisma in enum Service add in all caps your service name.

Once done in server/src/area/(action or reaction) and in server/src/middleware/expected_area add a file named after your service.

Once done in your file in server/src/area/(action or reaction) import what you need, create and export your action(s)/reaction(s)

And create a map to contain all your action(s)/reaction(s) infos and export it.

Now in your file in server/src/middleware/expected_area import what you need, create a map that will contain your expected action(s)/reaction(s) name and a function to check if all the necessary elemnt are available and add your own needed. Finally export your map.

Now link your action(s)/reaction(s) in the proper file in server/src/area using your action(s)/reaction(s) name.

Finally add your expected input in server/src/middleware/check_area.js

Now to complete your new service, add it's image to the folder server/img and in server/src/controllers/general/general.js add your service to the iconMap.

Now your service is available :)

## **Addition for Oauth2 Services**

All the following is done in server/src/controllers/api_access

Add a file with your service name in it, in this file import what you need and create an (async) function to get your service access token and another function to refresh it. Export boths of them.

In apiMaps.js add your function to get the access token to oauth2Map and add your function to refresh your token in oauth2RefreshMap.

Now your service oauth2 is available :)