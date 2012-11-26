
var Emitter = require('emitter');

module.exports = function(selector, options){
	return new fadingCarousel(selector);
}

var fadingCarousel = function(selector) {
	Emitter.call(this);
	this.list = document.querySelectorAll(selector);
	this.length = this.list.length; 
	this.currentIndex = 0; 
	this.active = this.list[this.currentIndex];
	this.duration = 7000; 
}

fadingCarousel.prototype = new Emitter; 

fadingCarousel.prototype.play = function(){
	if (this.timer)
		return
	this.timer = setInterval(this.next(), self.duration);
	this.emit('play');
	return this; 
};

fadingCarousel.prototype.stop = function(){
	clearInterval(this.timer);
	this.emit('stop');
	return this; 
}

fadingCarousel.prototype.next = function(){
	var nextIndex = this.currentIndex + 1 === this.length ? 
			0 : 
			this.currentIndex + 1; 

	this.emit('next');

	this.goto(nextIndex);
};

fadingCarousel.prototype.prev = function(){
	var prev;

	if ((this.currentIndex - 1) < 0) {
		prev = this.length - 1; 
	} else {
		prev = this.currentIndex - 1; 
	}

	this.emit('prev');

	this.goto(prev);
	return this; 
};

fadingCarousel.prototype.goto = function(i) {
	this.active.className = this.active.className.replace( /(?:^|\s)visible(?!\S)/g , '' )
	
	var el = this.active = this.list[i];
	el.className += ' visible';

	this.emit('index', i);
	
	this.currentIndex = i; 
	return this; 
};