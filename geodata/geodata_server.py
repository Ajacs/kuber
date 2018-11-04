from flask import Flask, jsonify, request
import geopy
import geopy.distance
app = Flask(__name__)


@app.route('/api/coordinates', methods=['POST'])
def new_coordinates():
    print(request.data)
    content = request.get_json()
    latitude = content['latitude'] if 'latitude' in content else None
    longitude = content['longitude'] if 'longitude' in content else None
    km = content['km'] or 1

    if latitude and longitude and km:
        start = geopy.Point(latitude, longitude)
        destination = geopy.distance.VincentyDistance(
        kilometers=km).destination(start, 0)
        print(destination.latitude);
        print(destination.longitude)
        return jsonify({
            'status': 'success',
            'latitude': destination.latitude,
            'longitude': destination.longitude,
            'km': km
        })
    else:
        return jsonify({
            'message': 'Error receiving data'
        })



if __name__ == '__main__':
    app.run()
