from flask import Flask, send_from_directory, jsonify, request
from flask_socketio import SocketIO, emit
import settings
import os

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

@app.route('/requestFileSave', methods=['GET'])
def requestFileSave():
    if not request.args or not 'file' in request.args or not 'content' in request.args:
        return jsonify({
                "status": "error",
                "message": "error in json"
        }), 400
    try:
        with open(os.path.join(settings.PROJECT_PATH, request.args['file']), "w") as f:
            f.write(request.args['content'])
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
    	"content": request.args['content']
    })

@socketio.on('connect')
def test_connect():
	result = []
	for root, dirs, files in os.walk(settings.PROJECT_PATH, topdown=True):
		if not '.' in root[len(settings.PROJECT_PATH):]:
			for name in files:
				result.append(os.path.join(root, name)[len(settings.PROJECT_PATH) + 1:])
	emit('emitTree', result)