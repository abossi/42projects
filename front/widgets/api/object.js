function apiObj(){

	/***************************************************/
	/*                 start socket.io                 */
	/***************************************************/
	var socket = io.connect('http://' + document.domain + ':' + location.port);
    /*socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });*/

	this.requestFileOpen = function(nameEvent, params){
	    var deferred = new $.Deferred();
		$.ajax({
			url : '/requestFileOpen',
			type : 'GET',
			data: {
				file: params['file']
			},
			success : function(json){
				console.log(json);
				EventManager.dispatch('#OnFileOpen', json);
				deferred.resolve(json); //affectation du json dans une variable global
				return json;
			},
			error : function(resultat, statut, erreur){
				alert('Impossible to get project list!');
			}
	    });
	    return deferred.promise();
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}