function settingsObj()
{
    this.path = '';
    this.lang = '';
    
    this.OnSettingsGet = function(nameEvent, params)
    {
        this.path = params.path;
        this.lang = params.lang;
        
        $('#settings-path').val(this.path);
        $('#settings-select-lang').val(this.lang);
    }
    
    this.saveChange = function()
    {
        this.path = $('#settings-path').val();
        this.lang = $('#settings-select-lang').val();
        EventManager.dispatch('#APIRequestSettings', {
            path: this.path,
            lang: this.lang
        })
    }
    
	this.register = function(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}

settings = new settingsObj();
settings.register("#OnSettings", settings.OnSettingsGet);