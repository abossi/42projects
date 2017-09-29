function treeObj(div_contener, obj_name){
	this.div_contener = div_contener;
	this.obj_name = obj_name;
	this.div_name = div_contener.attr('id');
	this.actu_focus_list = null;

	this.apply_tree = function(nameEvent, params)
	{
		this.root = params.root;
		this.tree = [];
		for (var i = 0 ; i < params.tree.length ; i++)
		{
			this.tree.push(params.tree[i].split('/'));
		}
		this.refresh_dir();
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
		var result = '<ol class="breadcrumb" style="margin-bottom:10px;"><li><a onclick="' + this.obj_name + '.refresh_dir();" href="#" class="active">' + this.root + '</a></li>';
		var dir_splited = (dir) ? dir.split('/') : '';
		var list_dirs = [];
		var list_files = [];
		var dir_construction = '';
		for (var i = 0 ; i < dir_splited.length ; i++)
		{
		    dir_construction += dir_splited[i];
			result += '<li><a href="#" onclick="' + this.obj_name + '.refresh_dir(\'' + dir_construction + '\');" class="active">' + dir_splited[i] + '</a></li>';
			dir_construction += '/';
		}
		result += '</ol><div class="btn-group btn-group-justified" role="group">' +
		            '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-default">New dir</button>' +
                    '</div>' +
                    '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-default">New file</button>' +
                    '</div>' +
                    '<div class="btn-group" role="group">' +
                    '<button type="button" class="btn btn-danger">Remove</button>' +
                    '</div>' +
                  '</div>'
		result += '<ul class="nav nav-pills nav-stacked" style="overflow:auto;position:absolute;bottom:5px;top:97px;left:5px;right:5px;">';
		var list_files_str = '';
		var list_dirs_str = '';
		for (var i = 0 ; i < this.tree.length ; i++)
		{
			if (this.check_in_dir(dir_splited, this.tree[i]))
			{
				if (this.tree[i].length == (dir_splited.length + 1))
				{
					list_files.push(this.tree[i][this.tree[i].length - 1]);
					list_files_str += '<li role="presentation" style="margin:2px;"><a id="' + this.div_name + '_' + this.tree[i][this.tree[i].length - 1].replace('.', '_') + '" href="#" onclick="EventManager.dispatch(\'#APIRequestFileOpen\', {file: \'' +
					               this.tree[i].join('/') + '\'});">' + this.tree[i][this.tree[i].length - 1] + '</a></li>';
				}
				else
				{
					var to_add = true;
					for (var j = 0 ; j < list_dirs.length ; j++)
					{
						if (list_dirs[j] == this.tree[i][dir_splited.length])
						{
							to_add = false;
							break;
						}
					}
					if (to_add)
					{
						list_dirs.push(this.tree[i][dir_splited.length]);
						list_dirs_str += '<li role="presentation" style="margin:2px;"><a id="' + this.div_name + '_' + this.tree[i][dir_splited.length] + '" href="#" class="btn-info" onclick="' +
						                this.obj_name + '.refresh_dir(\'' + ((dir) ? dir + '/' : '') + this.tree[i][dir_splited.length] + '\');">' + this.tree[i][dir_splited.length] + '</a></li>';
					}
				}
			}
		}
		result += list_dirs_str;
		result += list_files_str;
		result += '</ul>';
		this.list_elem = list_dirs.concat(list_files);
		this.div_contener.html(result);
		this.actu_focus_list = null;
		if (this.list_elem.length)
		{
		    console.log(this.list_elem[0]);
		    this.actu_focus_list = this.list_elem[0];
		    $('#' + this.div_name + '_' + this.actu_focus_list).focus();
		    return ;
		}
	}

	this.get_focus = function()
	{
	    if (this.actu_focus_list == null)
		    $('#' + this.div_name + ' .breadcrumb').get(0).lastChild.lastChild.focus();
		else
		    $('#' + this.div_name + '_' + this.actu_focus_list.replace('.', '_')).focus();
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
	
	this.down_list = function()
	{
	    if (this.actu_focus_list == null)
	        return ;
	    
	    var index = this.list_elem.indexOf(this.actu_focus_list) + 1;
	    if (index == this.list_elem.length)
	        index = 0;
	    this.actu_focus_list = this.list_elem[index];
		$('#' + this.div_name + '_' + this.actu_focus_list.replace('.', '_')).focus();
	}
	
	this.up_list = function()
	{
	    if (this.actu_focus_list == null)
	        return ;
	    
	    var index = this.list_elem.indexOf(this.actu_focus_list) - 1;
	    if (index == -1)
	        index = this.list_elem.length - 1;
	    this.actu_focus_list = this.list_elem[index];
		$('#' + this.div_name + '_' + this.actu_focus_list.replace('.', '_')).focus();
	}
	
	this.keysEvents = [
	    {key: [40], desc: "go down in list", callback: this.down_list.bind(this)},
	    {key: [38], desc: "go up in list", callback: this.up_list.bind(this)}
	];
}