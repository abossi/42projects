function dashboardObj()
{
	/***************************************************/
	/*    create all object and connect each events    */
	/***************************************************/
	this.editor = new aceBuildsObj($('#div_1_2'), 'dashboard.editor');
	this.editor.register('#OnFileOpen', this.editor.edit_text);
	this.api = new apiObj();
	this.api.register('#APIRequestFileOpen', this.api.requestFileOpen);
	this.api.register('#APIRequestFileSave', this.api.requestFileSave);
	this.api.register('#APIRequestSettings', this.api.requestSettings);
	this.tree = new treeObj($('#div_1_1'), 'dashboard.tree');
	this.tree.register('#OnTree', this.tree.apply_tree);
	/* end create objects and binding */
	
	this.pluginsTab = [this.tree, this.editor];
	this.keysPress = [];
	this.divX = 1;

	/***************************************************/
	/*      bind keyEvent and mouseEvent for div       */
	/***************************************************/
	this.onkeydown = function(key)
	{
	    console.log(key);
		if (key == 27 && this.divX == 2)
			this.editor.change_focus();
		if (this.keysPress.indexOf(key) == -1)
		    this.keysPress.push(key);
        for (var eventIndex = 0 ; eventIndex < this.keysEvents.length ; eventIndex++)
        {
            if (this.keysPress.sort().toString() == this.keysEvents[eventIndex].key.sort().toString())
            {
                this.keysEvents[eventIndex].callback();
                return ;
            }
        }
        for (var eventIndex = 0 ; eventIndex < this.pluginsTab[this.divX - 1].keysEvents.length ; eventIndex++)
        {
            if (this.keysPress.sort().toString() == this.pluginsTab[this.divX - 1].keysEvents[eventIndex].key.sort().toString())
            {
                this.pluginsTab[this.divX - 1].keysEvents[eventIndex].callback();
                return ;
            }
        }
	}
	
	this.onkeyup = function(key)
	{
	    var index = this.keysPress.indexOf(key);
	    this.keysPress.splice(index, 1);
		if (key == 18)
		{
			if (this.divX == 2)
			{
				this.editor.get_focus();
			}
			else
			{
				this.tree.get_focus();
			}
		}
	}
	$('#div_1_1').on('click', function()
	{
		$('.active_div').toggleClass('active_div');
		$('#div_1_1').toggleClass('active_div');
		dashboard.tree.get_focus();
		dashboard.divX = 1;
	});
	$('#div_1_2').on('click', function()
	{
		$('.active_div').toggleClass('active_div');
		$('#div_1_2').toggleClass('active_div');
		dashboard.editor.get_focus();
		dashboard.divX = 2;
	});
	/* end bind event*/
	
	this.left_panel = function()
	{
		$('#div_1_' + this.divX).toggleClass('active_div');
		this.divX--;
		if (this.divX == 0)
			this.divX = 2;
		$('#div_1_' + this.divX).toggleClass('active_div');
	}
	
	this.right_panel = function()
	{
		$('#div_1_' + this.divX).toggleClass('active_div');
		this.divX++;
		if (this.divX == 3)
			this.divX = 1;
		$('#div_1_' + this.divX).toggleClass('active_div');
	}
	
	this.keysEvents = [
	    {key: [18,37], desc: "left panel", callback: this.left_panel.bind(this)},
	    {key: [18,39], desc: "right panel", callback: this.right_panel.bind(this)}
	]
}

dashboard = new dashboardObj();