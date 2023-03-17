# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Create or update a given job | `POST` | `/update-job` |
| Search in your job list | `POST` | `/search-job` |
| Delete a given job | `POST` | `/delete-job` |
| Stop a given job | `POST` | `/stop-job` |

## **Routes description**

### **Create or update a given job**

Request type: `POST`.

URL: `/update-job`.

Exemple of request in cURL:

If `jobToken` is equal to an existing job said job will be updated otherwise it will be created.

```bash
curl --location --request POST 'https://localhost:8080/api/v3/update-job' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "jobToken": "",
    "name": "aa",
    "action": "[Youtube] NewLike",
    "actionArg": {
        "videoURL": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    "reaction": "[Discord] sendPrivateMessages",
    "reactionArg": {
        "userID": "143472015762784256"
    },
    "interval": 10,
    "runNow": "true"
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "job": {
        "jobToken": "6ac30488-cc49-4b07-b3a4-3d88aa15bb8b",
        "name": "aa",
        "actionService": "YOUTUBE",
        "action": "[Youtube] NewLike",
        "actionArg": {
            "videoURL": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        "reactionService": "DISCORD",
        "reaction": "[Discord] sendPrivateMessages",
        "reactionArg": {
            "userID": "143472015762784256"
        },
        "interval": 10,
        "is_stoped": false
    }
}
```
____
### **Search in your job list**

Request type: `POST`.

URL: `/search-job`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/search-job' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{}'

fields name, action, reaction and service are optional:

--data-raw '{
    "name": "[arg]",
    "action": "[arg]",
    "reaction": "[arg]",
    "service": "[arg]"
}'
```

Here is an example of a **response**:
```json
{
    "success": true,
    "job": [
        {
            "jobToken": "805c0715-6f6c-4d11-88f2-ca26333ca7aa",
            "name": "aa",
            "actionService": "YOUTUBE",
            "action": "[Youtube] NewLike",
            "actionArg": {
                "videoURL": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            "reactionService": "DISCORD",
            "reaction": "[Discord] sendPrivateMessages",
            "reactionArg": {
                "userID": "143472015762784256"
            },
            "interval": 600,
            "is_stoped": false
        },
        {
            "jobToken": "853291c4-918e-48ac-ae42-897909798498",
            "name": "srdtfu",
            "actionService": "YOUTUBE",
            "action": "[Youtube] NewLike",
            "actionArg": {
                "videoURL": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            },
            "reactionService": "DISCORD",
            "reaction": "[Discord] sendPrivateMessages",
            "reactionArg": {
                "userID": "143472015762784256"
            },
            "interval": 600,
            "is_stoped": false
        }
    ]
}
```
____
### **Delete a given job**

Request type: `POST`.

URL: `/delete-job`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/delete-job' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "jobToken": "[Job Token]"
}'
```

Here is an example of a **response**:
```json
{
    "success": true
}
```
____
### **Stop or Resume a given job**

Request type: `POST`.

URL: `/stop-job`.

Exemple of request in cURL:
```bash
curl --location --request POST 'https://localhost:8080/api/v3/stop-job' \
--header 'Content-Type: application/json' \
--header 'Cookie: AREA=[Cookie Token]' \
--data-raw '{
    "jobToken": "[Job Token]",
    "stop": true
}'
```

if stop is true, stop the given job. if stop is false, resume the given job.

Here is an example of a **response**:
```json
{
    "success": true
}
```