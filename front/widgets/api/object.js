function apiObj(){

	/***************************************************/
	/*                 start socket.io                 */
	/***************************************************/
	var socket = io.connect('http://' + document.domain + ':' + location.port);
    /*socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });*/
    socket.on('emitTree', function(data){
        EventManager.dispatch('#OnTree', {tree: data[0], root: data[1]});
    });

	this.requestFileOpen = function(nameEvent, params)
	{
	    var deferred = new $.Deferred();
		$.ajax({
			url : '/requestFileOpen',
			type : 'GET',
			data: {
				file: params['file']
			},
			success : function(json){
				EventManager.dispatch('#OnFileOpen', json);
				deferred.resolve(json); //affectation du json dans une variable global
				return json;
			},
			error : function(resultat, statut, erreur){
				alert('Impossible to open file!');
			}
	    });
	    return deferred.promise();
	}

	this.requestFileSave = function(nameEvent, params)
	{
	    var deferred = new $.Deferred();
		$.ajax({
			url : '/requestFileSave',
			type : 'GET',
			data: {
				file: params['file'],
				content: params['content']
			},
			success : function(json){
				EventManager.dispatch('#OnFileSave', json);
				deferred.resolve(json); //affectation du json dans une variable global
				return json;
			},
			error : function(resultat, statut, erreur){
				console.log(resultat);
				alert('Impossible to save file!');
			}
	    });
	    return deferred.promise();
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}