#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid;

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
defined_port = 5000
defined_host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def close_db(exception):
    """
    method to close the database session
    """
    storage.close()


@app.route('/2-hbnb')
def hbnb(the_id=None):
    """
    built on the previous function
    """
    state_objects = storage.all('State').values()
    states = dict([state.name, state] for state in state_objects)
    amenity_objects = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('2-hbnb.html',
                           cache_id=uuid.uuid4(),
                           states=states,
                           amenity_objects=amenity_objects,
                           places=places,
                           users=users)

if __name__ == "__main__":
    """
    the flask module app"""
    app.run(host=defined_host, port=defined_port)
