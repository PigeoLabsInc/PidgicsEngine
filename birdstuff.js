pidgics.FlockArea = function FlockArea(_min, _max) {
	this.min = _min || new pidgics.Vector(0, 0);
	this.max = _max || new pidgics.Vector(0, 0);
	
	this.enforce = function(bird) {
		var pos = bird.position;
		if (pos.x + bird.width < this.min.x || pos.x > this.max.x)
			bird.velocity.x *= -1;
		
		if (pos.y + bird.height < this.min.y || pos.y > this.max.y)
			bird.velocity.y *= -1;
	}.bind(this);
};

pidgics.Sprite = function() {
	this.frame = 0;
	this.frames = pidgics.Sprite.STAND;
	this.state = pidgics.Bird.STAND;
	this.position = new pidgics.Vector(0, 0);
	this.width = 64;
	this.height = 68;
};
pidgics.Sprite.prototype.load_frames = function(state) {
	switch (state) {
		case pidgics.Bird.STAND:
			this.frames = pidgics.Sprite.STAND;
			break;
		case pidgics.Bird.WALK:
			this.frames = pidgics.Sprite.WALK;
			break;
		case pidgics.Bird.TAKE_OFF:
			this.frames = pidgics.Sprite.TAKE_OFF;
			break;
		case pidgics.Bird.FLY:
			this.frames = pidgics.Sprite.FLY;
			break;
		default:
			console.warn('No frames found');
			return; // DO NOTHING, BRUH
	}
	this.state = state;
	this.frame = 0;
	this.position = this.frames[0];
};
pidgics.Sprite.prototype.enforce = function step(bird, index) {
	if (this.state !== bird.state)
		this.load_frames(bird.state);
	else if (++this.frame >= this.frames.length)
		this.frame = 0;
};
pidgics.Sprite.STAND = [
	new pidgics.Vector(0, 0)
];
pidgics.Sprite.WALK = [
	new pidgics.Vector(0, 0),
	new pidgics.Vector(64, 0),
	new pidgics.Vector(128, 0),
	new pidgics.Vector(192, 0),
	new pidgics.Vector(0, 68),
	new pidgics.Vector(64, 68)
];
pidgics.Sprite.TAKE_OFF = [
	new pidgics.Vector(0, 204)
];
pidgics.Sprite.FLY = [
	new pidgics.Vector(64, 204),
	new pidgics.Vector(128, 204),
	new pidgics.Vector(192, 204)
];

pidgics.Swarm = function Swarm() {
	this.enforce = function(bird, index) {
		if (bird.velocity.x !== 0) {
			bird.state = pidgics.Bird.WALK;
			bird.position.x += bird.velocity.x;
		} else
			bird.state = pidgics.Bird.STAND;
	};
};