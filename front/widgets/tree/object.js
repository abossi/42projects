function treeObj(div_contener, obj_name){
	this.div_contener = div_contener;
	this.obj_name = obj_name;
	this.div_name = div_contener.attr('id');

	this.apply_tree = function(nameEvent, params)
	{
		this.root = params.root;
		this.tree = [];
		var result = '<ol class="breadcrumb"><li><a href="#" class="active">' + params.root + '</a></li></ol><ul class="nav nav-pills nav-stacked">';
		var list = [];
		for (var i = 0 ; i < params.tree.length ; i++)
		{
			this.tree.push(params.tree[i].split('/'));
			if (this.tree[i].length == 1)
			{
				list.push(params.tree[i]);
				result += '<li role="presentation"><a href="#" onclick="EventManager.dispatch(\'#APIRequestFileOpen\', {file: \'' + params.tree[i] + '\'});">' + params.tree[i] + '</a></li>';
			}
			else
			{
				var to_add = true;
				for (var j = 0 ; j < list.length ; j++)
				{
					if (list[j] == this.tree[i][0])
					{
						to_add = false;
						break;
					}
				}
				if (to_add)
				{
					list.push(this.tree[i][0]);
					result += '<li role="presentation"><a href="#" class="btn-info" onclick="' + this.obj_name + '.refresh_dir(\'' + this.tree[i][0] + '\');">' + this.tree[i][0] + '</a></li>';
				}
			}
		}
		result += '</ul>';
		this.div_contener.html(result);
	}

	this.refresh_dir = function(dir)
	{
		console.log(dir);
	}

	this.get_focus = function()
	{
		$('#' + this.div_name + ' .breadcrumb').get(0).lastChild.lastChild.focus();
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}