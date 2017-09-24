class Event
{
	constructor(name)
	{
		console.log("new event: " + name);
		this.name = name;
		this.listeners = [];

	}

	register(module)
	{
		this.listeners.push(module);
	}

	dispatch()
	{
		var n = this.name;

		this.listeners.forEach(function(el)
		{
			el.callback(n, "test_parameter");
		})
	}
}

class Hub
{
	constructor()
	{
		this.events = {
					'#clock': new Event('#clock'),
					'#focus1': new Event('#focus1'),
					'#focus2': new Event('#focus2')
		};
	}

	test()
	{
		console.log('ok');
	}

	register(name, module)
	{
		this.events[name].register(module);
	}

	create(name)
	{
		this.events[name] = new Event(name);
	}

	dispatch(name)
	{
		this.events[name].dispatch();
	}
}



let EventManager = new Hub();





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
pluggin2.register('#focus1', focusCallback);

setInterval(function(){
	EventManager.dispatch('#clock');
}, 5000);
