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

This endpoint let us resgister a new user, for this we need to send the following request payload:

**Request payload**
```json
{
	"email": "test@kuber.com",
	"password": "password",
	"name": "Foo",
	"lastname": "Bar"
}
```

or if you want to create a new user with the driver role:

**Request payload to create a new driver**
```json
{
	"email": "test@kuber.com",
	"password": "securepassword",
	"name": "Foo",
        "lastname": "Bar",
        "driver": true
}
```

### /api/trackit/trip_coordinates

This endpoint let us register the driver new coordinates and save to the database in order to have a register of the information for a current trip, the information contains data like: driver_id, client_id, trip_id, latitude, longitude.

### /api/trips

This endpoint let us create a new Trip. To do this the user needs to be registered on the system, because it requires a Authorization header with the user token.

### /api/drivers/validate

This enspoint let us verificate if a user is a driver.

### /api/webhooks/notifier

This endpoint creates a new Notification. For this test the notification is only a new record on the notifications table in the database.

### /api/coordinates

This endpoint do the calculus for the new coordinates based on the current position of the driver.

### /api/simulation/start

This endpoint starts a new Simulation, to do this, requires the credentials of a registered user. After the user provides this information the system find the driver (Just findOne, not the nearest).

This endpoints generates tripPositionTracking, trip, notifications new records on the database.

When you start a new simulation the system clean the database.

### For more information please visit:
https://documenter.getpostman.com/view/5599090/RzZ6HLZu

## Requirements
* Node >= 10.1.0
* Python >= 3
* Mongo >= 4.0.3
* Redis >= 5.0.0

## Installation

First of all rename `.env_example` to `.env`, replace the values with the data provided in the email.

For the Kuber service install the dependencies executing:

```
npm install
```

In order to execute the `/api/coordinates` endpoint you need follow this steps (We use python because `geopy` library is really use in order to do the calculus of the new coordinates):

Creates the virtual env:
```
cd geodata
python3 -m venv env
source env/bin/activate
```

Execute the server:
```
python geodata_server.py
```

Also you need to execute the nodejs worker:

```
npm run worker
```

And finally execute the kuber main server:

```
npm run start
```

## Running tests
We use Mocha, Chai to run the functional tests. Simply run:

```
npm test
```
