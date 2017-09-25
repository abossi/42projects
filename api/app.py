from flask import Flask, send_from_directory, jsonify, request
from flask_socketio import SocketIO
import settings
import os

from ProjectGraph import graph

app = Flask(__name__, static_url_path='')
socketio = SocketIO(app)

@app.route('/', methods=['GET'])
def home():
    return send_from_directory('../front', 'index.html')

@app.route('/front/<path:path>', methods=['GET'])
def get_extern(path):
    return send_from_directory('../front', path)

@app.route('/requestFileOpen', methods=['GET'])
def requestFileOpen():
    if not request.args or not 'file' in request.args:
        return jsonify({
                "status": "error",
                "message": "error in json"
        }), 400
    try:
        with open(os.path.join(settings.PROJECT_PATH, request.args['file'])) as f:
            lines = f.read()
    except FileNotFoundError:
        return {
                "status": "error",
                "message": "file not found",
        }
    except PermissionError:
        return {
                "status": "error",
                "message": "permission denied",
        }
    return jsonify({
    	"file": request.args['file'],
    	"content": lines
    })

@socketio.on('connect', namespace='/chat')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

#@socketio.on('get_graph')
@app.route('/update', methods=['GET'])
def get_graph():
    return graph.update(settings.PROJECT_PATH);
