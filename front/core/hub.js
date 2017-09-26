class Event
{
	constructor(name, params)
	{
		console.log("new event: " + name);
		this.name = name;
		this.listeners = [];
		this.params = params;
	}

	register(module)
	{
		this.listeners.push(module);
	}

	dispatch(params)
	{
		var n = this.name;
		var params_send = {};

		for (var i in this.params)
		{
			if (!params.hasOwnProperty(this.params[i]))
			{
				console.error('missing parameters ' + this.params[i] + ' for event ' + n);
				return ;
			}
			params_send[this.params[i]] = params[this.params[i]];
		}

		this.listeners.forEach(function(el)
		{
			el.callback(n, params_send);
		})
	}
}

class Hub
{
	constructor()
	{
		this.events = {
					'#APIRequestFileOpen': new Event('#APIRequestFileOpen', ['file']),
					'#OnFileOpen': new Event('#OnFileOpen', ['file', 'content']),
					'#OnTree': new Event('#OnTree', ['tree', 'root']),
					'#APIRequestFileSave': new Event('#APIRequestFileSave', ['file', 'content']),
					'#OnFileSave': new Event('#OnFileSave', ['file', 'content'])
		};
	}

	register(name, module)
	{
		this.events[name].register(module);
	}

	create(name)
	{
		this.events[name] = new Event(name);
	}

	dispatch(name, params)
	{
		this.events[name].dispatch(params);
	}
}



let EventManager = new Hub();




/*
class FakePluggin
{
	constructor(domTarget)
	{
		this.domTarget = domTarget;
	}

	register(eventName, callback)
	{
		EventManager.register(eventName, { 'callback': callback.bind(this) });
	}
}

function dummyCallback(eventName, eventParameter1)
{
	this.domTarget.appendChild(document.createTextNode('New event "' + eventName + '" [ ' + eventParameter1 + ' ]'));
	this.domTarget.appendChild(document.createElement('br'));
}

function anotherDummyCallback(eventName, eventParameter1)
{
	this.domTarget.appendChild(document.createTextNode('Another new event "' + eventName + '" [ ' + eventParameter1 + ' ]'));
	this.domTarget.appendChild(document.createElement('br'));
}

function focusCallback(eventName, eventParameter1)
{
	this.domTarget.appendChild(document.createTextNode('Sibling received a focus event'));
	this.domTarget.appendChild(document.createElement('br'));
}

var pluggin1 = new FakePluggin(document.querySelector('#div_1_1'));
var pluggin2 = new FakePluggin(document.querySelector('#div_1_2'));


//EventManager.createEvent('#clock');
pluggin1.register('#clock', dummyCallback);
pluggin2.register('#clock', anotherDummyCallback);
pluggin1.register('#focus2', focusCallback);

setInterval(function(){
	EventManager.dispatch('#clock');
}, 5000);*/
