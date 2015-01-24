var flock_div = document.getElementById('flock');

// Define boundaries for birds
var bounds = new pidgics.FlockArea(
	new pidgics.Vector(0, 0),
	new pidgics.Vector(window.innerWidth, window.innerHeight)
);

console.dir(bounds);

var onbirdclick = function() {
	this.state = pidgics.Bird.TAKE_OFF;
};

// Create some birds:
var birdies = {
	birds: [],
	sprites: []
};

for (i = 0; i < 12; i++) {
	var element = document.createElement('div');
	element.className = 'Bird'; // <div class="Bird"></div>
	
	var bird = birdies.birds[i] = new pidgics.Bird(element);
	var sprite = birdies.sprites[i] = new pidgics.Sprite();
	
	// set fattness
	bird.width = sprite.width;
	bird.height = sprite.height;
	
	// set position
	bird.position.x = Math.random() * (bounds.max.x - bird.width);
	bird.position.y = bounds.max.y - bird.height;
	
	// set velocity
	bird.velocity = new pidgics.Vector(
		((Math.random() * -5) - 2) + ((Math.random() * 5) + 2),
		0
	);
	
	bird.birdythings.push(sprite);
	
	flock_div.appendChild(element);
}

console.dir(birdies.birds);

// BIRDS MADE!!!

// Draw the flock
function SpriteFlock() {
	this.inherit = pidgics.Flock;
	this.inherit();
	
	this.birdies = birdies.birds;
	this.birdythings.push(bounds);
	this.birdythings.push(new pidgics.Swarm());
	
	var _counter = 0;
	
	this.render_bird = function(bird, index) {
		// draw position
		bird.display.style.left = bird.position.x + 'px';
		bird.display.style.top = bird.position.y + 'px';
		
		// draw sprite/frame
		var sprite = birdies.sprites[index];
		var frame = sprite.frames[sprite.frame];
		
		bird.display.style.backgroundPosition = '-' + frame.x + 'px -' + frame.y + 'px';
		
		if (bird.velocity.x < 0)
			bird.display.style.WebkitTransform = 'scaleX(-1)';
		else
			bird.display.style.WebkitTransform = '';
	};
	
	this.play = function() {
		if (_counter++ % 8 == 0)
			this.tick();
		window.requestAnimationFrame(this.play);
	}.bind(this);
};

var flock = new SpriteFlock();
flock.play();