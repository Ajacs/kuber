# Kuber
Kuber is a Uber clone for test purposes. It allows to create users as client and drivers, create new trip, track the driver position and from here start a new notification.

Kuber is a REST API, in this version only the endpoints to create content are available.

It provides the following endpoints:

### /api/authenticate

This endpoint let us authenticate a registered user, for this we need to send the registered user email and password, if the data is correct the system responds with a token.

**Request Payload example**
```json
{
    "email": "test@kuber.com",
    "password: "securepassword"
}
```

**Response example**
```json
{
    "token": "thetokenpayload"
}
```
### /api/register

### /api/simulation/start

### /api/trackit/trip_coordinates

### /api/trips

### /api/drivers/validate

### /api/webhooks/notifier



## Requirements
* Node >= 10.1.0
* Python >= 3
* Mongo >= 4.0.3
* Redis >= 5.0.0

## Installation


