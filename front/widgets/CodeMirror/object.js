function codeMirrorObj(div_contener){
	this.div_contener = div_contener;
	this.div_name = div_contener.attr('id');
	div_contener.html('<button id="' + this.div_name + '-save" type="button" class="btn btn-primary" disabled="disabled">save</button>' +
		'<span id="' + this.div_name + '-file" style="font-size:20px;margin:15px;"></span>' +
		'<div id="' + this.div_name + '-codemirror" style="position:absolute;bottom:15px;left:5px;right:5px;top:50px;"></div>');
	this.editor = CodeMirror($('#' + this.div_name + '-codemirror').get(0), {
	    lineNumbers: true
	});

	this.edit_text = function(nameEvent, params){
		$('#' + this.div_name + '-codemirror').html('');
		this.editor = CodeMirror($('#' + this.div_name + '-codemirror').get(0), {
			value: params['content'],
		    lineNumbers: true
		});
		$('#' + this.div_name + '-save').removeAttr('disabled');
		$('#' + this.div_name + '-file').html(params['file']);
	}

	this.get_focus = function(){
		this.editor.focus();
	}

	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}