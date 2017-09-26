function treeObj(div_contener, obj_name){
	this.div_contener = div_contener;
	this.obj_name = obj_name;
	this.div_name = div_contener.attr('id');

	this.apply_tree = function(nameEvent, params)
	{
		this.root = params.root;
		this.tree = [];
		var result = '<ol class="breadcrumb"><li><a href="#" class="active">' + params.root + '</a></li></ol><ul class="nav nav-pills nav-stacked" style="overflow:auto;position:absolute;bottom:5px;top:60px;left:5px;right:5px;">';
		var list = [];
		var list_files = '';
		var list_dirs = '';
		for (var i = 0 ; i < params.tree.length ; i++)
		{
			this.tree.push(params.tree[i].split('/'));
			if (this.tree[i].length == 1)
			{
				list.push(params.tree[i]);
				list_files += '<li role="presentation" style="margin:2px;"><a href="#" onclick="EventManager.dispatch(\'#APIRequestFileOpen\', {file: \'' + params.tree[i] + '\'});">' + params.tree[i] + '</a></li>';
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
					list_dirs += '<li role="presentation" style="margin:2px;"><a href="#" class="btn-info" onclick="' + this.obj_name + '.refresh_dir(\'' + this.tree[i][0] + '\');">' + this.tree[i][0] + '</a></li>';
				}
			}
		}
		result += list_dirs;
		result += list_files;
		result += '</ul>';
		this.div_contener.html(result);
	}

	this.check_in_dir = function(dir_ref, dir_to_check)
	{
		if (dir_to_check.length <= dir_ref.length)
			return false;

		for (var i = 0 ; i < dir_ref.length ; i++)
		{
			if (dir_ref[i] != dir_to_check[i])
				return false;
		}
		return true;
	}

	this.refresh_dir = function(dir)
	{
		console.log(dir);

		var result = '<ol class="breadcrumb"><li><a onclick="' + this.obj_name + '.refresh_dir();" href="#" class="active">' + this.root + '</a></li>';
		var dir_splited = (dir) ? dir.split('/') : '';
		var list = [];
		var dir_construction = '';
		for (var i = 0 ; i < dir_splited.length ; i++)
		{
		    dir_construction += dir_splited[i];
			result += '<li><a href="#" onclick="' + this.obj_name + '.refresh_dir(\'' + dir_construction + '\');" class="active">' + dir_splited[i] + '</a></li>';
			dir_construction += '/'; 
		}
		result += '</ol><ul class="nav nav-pills nav-stacked" style="overflow:auto;position:absolute;bottom:5px;top:60px;left:5px;right:5px;">';
		var list_files = '';
		var list_dirs = '';
		for (var i = 0 ; i < this.tree.length ; i++)
		{
			if (this.check_in_dir(dir_splited, this.tree[i]))
			{
				if (this.tree[i].length == (dir_splited.length + 1))
				{
					list.push(this.tree[i][this.tree[i].length - 1]);
					list_files += '<li role="presentation" style="margin:2px;"><a href="#" onclick="EventManager.dispatch(\'#APIRequestFileOpen\', {file: \'' + this.tree[i].join('/') + '\'});">' + this.tree[i][this.tree[i].length - 1] + '</a></li>';
				}
				else
				{
					var to_add = true;
					for (var j = 0 ; j < list.length ; j++)
					{
						if (list[j] == this.tree[i][dir_splited.length])
						{
							to_add = false;
							break;
						}
					}
					if (to_add)
					{
						list.push(this.tree[i][dir_splited.length]);
						list_dirs += '<li role="presentation" style="margin:2px;"><a href="#" class="btn-info" onclick="' + this.obj_name + '.refresh_dir(\'' + ((dir) ? dir + '/' : '') + this.tree[i][dir_splited.length] + '\');">' + this.tree[i][dir_splited.length] + '</a></li>';
					}
				}
			}
		}
		result += list_dirs;
		result += list_files;
		result += '</ul>';
		this.div_contener.html(result);
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