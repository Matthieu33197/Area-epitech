# **User's route**

## **Authors**

- adrien.moreau@epitech.eu

## **Routes**

| Action | Method | Route |
| ---- | ---- | ---- |
| Get the services and their logo | `GET` | `/get-services-available` |

## **Routes description**

### **Get the services and their logo**

Request type: `GET`.

URL: `/get-services-available`.

/!\ DOESN'T NEED A COOKIE!!! /!\

Exemple of request in cURL:

```bash
curl --location --request GET 'https://localhost:8080/api/v3/get-services-available' \
```

Here is an example of a **response**:
```json
{
    "success": true,
    "services": [
        {
            "name": "DISCORD",
            "oauth2": false,
            "logo": "iVBORw0K[...]JCo+AghIT2/wH08uKhjfIgGQAAAABJRU5ErkJggg=="
        },
        {
            "name": "YOUTUBE",
            "oauth2": false,
            "logo": "iVBORw0KG[...]JzByAkAAAAASUVORK5CYII="
        },
        {
            "name": "GOOGLE",
            "oauth2": true,
            "logo": "iVBORw0KGgo[...]whZ41AAAAABJRU5ErkJggg=="
        },
        {
            "name": "REDDIT",
            "oauth2": true,
            "logo": "iVBORw0KGgo[...]IwMTktMDctMDNUMDc6NDg6MzgtMDU6MDBEI/WPAAAAAElFTkSuQmCC"
        }
    ]
}
```