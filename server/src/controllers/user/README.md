# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Register user | `POST` | `/register` |
| Login user | `POST` | `/authenticate` |
| Register or Login a user throught google | `POST` | `/google-auth` |
| Unregister user | `POST` | `/unregister` |
| Update user password | `POST` | `/change-password` |
| Update user services | `POST` | `/update-services` |
| Get user's available AREA elements | `GET` | `/get-area-available` |
| Get all services with a flag to know if they are subscribe | `GET` | `/get-user-sub-services` |
| Update the user's data | `POST` | `/update-user-data` |
| Get the user's data | `GET` | `/get-user-data` |

## **Routes description**

### **Register user**

Request type: `POST`.

URL: `/register`.

/!\ DOESN'T NEED A COOKIE!!! /!\

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "itjustworks",
    "email": "itjustworks@bugthesda.com",
    "password": "bugthesda"
}'

fields name and lstName are optional:

--data-raw '{
    "username": "itjustworks",
    "email": "itjustworks@bugthesda.com",
    "password": "bugthesda",
    "name": "",
    "lstName": ""
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Login user**

Request type: `POST`.

URL: `/authenticate`.

/!\ DOESN'T NEED A COOKIE!!! /!\

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "itjustworks@bugthesda.com",
    "password": "bugthesda"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Register or Login a user throught google**

Request type: `POST`.

URL: `/google-auth`.

/!\ DOESN'T NEED A COOKIE!!! /!\

Exemple of request in cURL for WEB front end:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/google-auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "googleToken": "4/0ARtbsJqk9YSsMfkn3Fw5Fdek[...]U2SsTm40lKqoHQOhpdkA"
}'
```

Exemple of request in cURL for MOBILE front end:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/google-auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "access_token": "ya29.A0ARrdaM-FRQGjVPiEI2WxkLHogN9klF[...]ulz-swHgG-H4xukcU",
    "refresh_token: "1//03rW8A71Fxh5hCgYI[...]YuGJhVU6rtxC0x2E",
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Unregister user**

Request type: `POST`.

URL: `/unregister`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/unregister' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "password": "bugthesda"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Update user password**

Request type: `POST`.

URL: `/change-password`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/change-password' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "oldPassword": "bugthesda",
    "newPassword": "bugthesdaa"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Get user's available AREA elements**

Request type: `GET`.

URL: `/get-area-available`.

Exemple of request in cURL:
```bash
curl --location --request GET 'https://localhost:8080/api/v3/get-area-available' \
--header 'Cookie: AREA=[Cookie Token]'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "services": {
        "DISCORD": {
            "actions": [],
            "reactions": [
                {
                    "name": "[Discord] sendServerMessages",
                    "description": "Use a discord bot to display a message in you server.",
                    "args": {
                        "serverID": "Channel on wich our bot will communicate."
                    }
                },
                {
                    "name": "[Discord] sendPrivateMessages",
                    "description": "Use a discord bot to send a private message to a user.",
                    "args": {
                        "userID": "The user who will receive a private message."
                    }
                }
            ]
        },
        "YOUTUBE": {
            "actions": [
                {
                    "name": "[Youtube] NewLike",
                    "description": "To know if a video's like counter changed.",
                    "getArg": [
                        {
                            "videoURL": "The URL of the video you wish to monitor."
                        }
                    ]
                },
                {
                    "name": "[Youtube] newView",
                    "description": "To know if a video's views counter changed.",
                    "getArg": [
                        {
                            "videoURL": "The URL of the video you wish to monitor."
                        }
                    ]
                },
                {
                    "name": "[Youtube] newVideos",
                    "description": "To know if a Youtube channel as uploaded a new video.",
                    "getArg": [
                        {
                            "channelName": "The channel's name you wish to monitor."
                        }
                    ]
                }
            ],
            "reactions": []
        }
    }
}
```
____
### **Get all services with a flag to know if they are subscribe**

Request type: `GET`.

URL: `/get-user-sub-services`.

Exemple of request in cURL:
```bash
curl --location --request GET 'https://localhost:8080/api/v3/get-user-sub-services' \
--header 'Cookie: AREA=[Cookie Token]'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "services": [
        {
            "service": "REDDIT",
            "logo": "iVBORw0KGgo[...]IwMTktMDctMDNUMDc6NDg6MzgtMDU6MDBEI/WPAAAAAElFTkSuQmCC",
            "subscribed": false
        },
        {
            "service": "GOOGLE",
            "logo": "iVBORw0KGgo[...]whZ41AAAAABJRU5ErkJggg==",
            "subscribed": false
        },
        {
            "service": "DISCORD",
            "logo": "iVBORw0K[...]JCo+AghIT2/wH08uKhjfIgGQAAAABJRU5ErkJggg==",
            "subscribed": true
        },
        {
            "service": "YOUTUBE",
            "logo": "iVBORw0KG[...]JzByAkAAAAASUVORK5CYII=",
            "subscribed": true
        }
    ]
}
```
____
### **Update user services**

Request type: `POST`.

URL: `/update-services`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/update-services' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "service": "DISCORD",
    "subscribe": true
}'
```

fields subscribe must be set, either to true to subscribe or false to unsubscribe to the choosen service.

fields service must be set to one of the following options available: REDDIT, GOOGLE, DISCORD, YOUTUBE.

In case of oauth2 services (like REDDIT and GOOGLE) the following exemple should be used:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/update-services' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "service": "GOOGLE",
    "subscribe": true,
    "mobile": false,
    "token": "[OAUTH 2 Token]"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Update the user's data**

Request type: `POST`.

URL: `/update-user-data`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/update-user-data' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "name": "test",
    "lstName": "ok",
    "avatar": "done"
}'

fields name, lstName and avatar are optional, they can also be set to null to delete the information.:
```

Here is an example of a **response**:
```json
{
    "success": true,
    "user": {
        "id": 1,
        "createdAt": "2022-10-06T15:15:03.810Z",
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "password": "bugthesda",
        "name": "test",
        "lstName": "ok",
        "token": "a0d99c30-defe-499a-b5e3-0d169c141a0c",
        "avatar": null,
        "role": "USER"
    }
}
```
____
### **Get the user's data**

Request type: `GET`.

URL: `/get-user-data`.

Exemple of request in cURL:
```bash
curl --location --request GET 'https://localhost:8080/api/v3/get-user-data' \
--header 'Cookie: AREA=[Cookie Token]'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "user": {
        "username": "itjustworks",
        "email": "itjustworks@bugthesda.com",
        "name": "test",
        "lstName": "ok",
        "avatar": "done"
    }
}
```