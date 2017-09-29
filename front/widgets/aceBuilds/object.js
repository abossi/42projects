function aceBuildsObj(div_contener, obj_name){
	this.div_contener = div_contener;
	this.obj_name = obj_name;
	this.div_name = div_contener.attr('id');
	div_contener.html('<button id="' + this.div_name + '-save" type="button" onclick="' + obj_name + '.save_file();" class="btn btn-primary" disabled="disabled">save</button>' +
		'<span id="' + this.div_name + '-file" style="font-size:20px;margin:15px;"></span>' +
		'<div id="' + this.div_name + '-ace" style="position:absolute;bottom:5px;left:5px;right:5px;top:50px;"></div>');
	this.editor = ace.edit(this.div_name + '-ace');
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/javascript");

	this.save_file = function()
	{
		EventManager.dispatch('#APIRequestFileSave', {
			file: $('#' + this.div_name + '-file').text(),
			content: this.editor.getValue()});
	}

	this.edit_text = function(nameEvent, params)
	{
		this.editor.setValue(params['content']);
		$('#' + this.div_name + '-save').removeAttr('disabled');
		$('#' + this.div_name + '-file').html(params['file']);
		var extend = params['file'].split('.');
		extend = extend[extend.length - 1];

		switch (extend)
		{
			case 'py':
	    		this.editor.session.setMode("ace/mode/python");
	    		break;
	    	case 'js':
	    		this.editor.session.setMode("ace/mode/javascript");
	    		break;
	    	case 'html':
	    		this.editor.session.setMode("ace/mode/html");
	    		break;
	    	case 'c':
	    	case 'cpp':
	    		this.editor.session.setMode("ace/mode/c_cpp");
	    		break;
		}
		$('.active_div').toggleClass('active_div');
		this.div_contener.addClass('active_div');
		dashboard.divX = parseInt(this.div_name.split('_')[2]);
		this.editor.focus();
	}

	this.get_focus = function()
	{
		this.editor.focus();
	}

	this.change_focus = function()
	{
		this.editor.blur();
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
	
	this.keysEvents = [
	    {key: [27], desc: "escape edit mode", callback: this.change_focus.bind(this)},
	    {key: [17, 83], desc: "save current file", callback: this.save_file.bind(this)}
	]
}