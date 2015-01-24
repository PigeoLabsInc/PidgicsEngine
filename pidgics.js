var pidgics = new (function Pidgics(){
	
	/*
		 
		          _    __     _
		    ___  (_)__/ /__ _(_)______
		   / _ \/ / _  / _ `/ / __(_-<
		  / .__/_/\_,_/\_, /_/\__/___/
		 /_/          /___/
		 
		 
		 	> Only the best physics engine of all time.
		 
	*/
	
	
	/* Base pidgics objects */
	this.Vector = function Vector(_x, _y) {
		this.x = _x || 0;
		this.y = _y || 0;
	};
	
	this.Bird = function Bird(_display) {
		this.display = _display;
		this.birdythings = [];
		
		this.position = new pidgics.Vector(0, 0);
		this.velocity = new pidgics.Vector(0, 0);
		this.width = 1;
		this.height = 1;
		
		this.state = 0;
		this.dead = false;
	};
	this.Bird.prototype.onkilled = function onkilled() {
		/* To be implemented by developer, much like a DOM event */
	};
	this.Bird.prototype.birdstuff = function birdstuff(index) {
		for (var i = 0, len = this.birdythings.length; i < len; i++)
			this.birdythings[i].enforce(this, index);
	};
	this.Bird.STAND = 0;
	this.Bird.WALK = 1;
	this.Bird.TAKE_OFF = 2;
	this.Bird.FLY = 3;
	
	this.Flock = function Flock() {
		this.birdies = [];
		this.birdythings = [];
		
		var _clock;
		var _buffer = 0;
		
		var apply = function() {
			for (var i = 0, len = this.birdies.length; i < len; i++) {
				var bird = this.birdies[i];
			
				for (var j = 0, len1 = this.birdythings.length; j < len1; j++)
					this.birdythings[j].enforce(bird, i);
			
				if (bird.dead) {
					this.birdies.splice(i, 1);
					bird.onkilled.call(bird);
					
					i -= 1;
					len -= 1;
					
					continue;
				}
			
				bird.birdstuff(i);
				this.render_bird(bird, i);
			}
		}.bind(this);
		
		this.tick = function() {
			if (!_clock)
				_clock = (new Date()).getTime();
			
			var TICK = 0.0167; // Framerate, essentially.
			var MAX_TICKS = 4;
			
			var time = new Date().getTime();
			var delta = time - _clock;
			
			if (delta <= 0.0)
				return; // we needn't render anything
			
			delta *= 0.001;
			_clock = time;
			_buffer += delta;
			
			var i = 0;
			while (_buffer >= TICK && ++i < MAX_TICKS) {
				apply(TICK); // apply bird stuff to birds
				_buffer -= TICK;
			}
		};
		
		this.render_bird = function(bird, index) {
			//
		};
		
		this.render_all = function() {
			apply();
		};
	};
})();