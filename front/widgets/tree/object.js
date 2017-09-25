function treeObj(div_contener){
	this.div_contener = div_contener;
	this.div_name = div_contener.attr('id');

	this.apply_tree = function(nameEvent, params){
		var result = '';
		for (var i = 0 ; i < params.tree.length ; i++){
			result += '<a onclick="EventManager.dispatch(\'#APIRequestFileOpen\', {file: \'' + params.tree[i] + '\'});">' + params.tree[i] + '</a><br>';
		}
		this.div_contener.html(result);
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}