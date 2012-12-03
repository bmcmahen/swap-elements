
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

fadingCarousel.prototype.play = function(duration){
	if (this.timer)
		return

	duration = duration || self.duration; 
	this.timer = window.setInterval(self.next(), duration);
	this.emit('play');
	return this; 
};

fadingCarousel.prototype.stop = function(){
	window.clearInterval(this.timer);
	this.emit('stop');
	return this; 
}

fadingCarousel.prototype.isFirst = function(){
	return this.currentIndex === 0; 
}

fadingCarousel.prototype.isLast = function(){
	return this.current === this.total - 1; 
}

fadingCarousel.prototype.next = function(){
	console.log('next called');
	var nextIndex = this.isLast() ? 0 : this.currentIndex + 1;
	this.emit('next');
	this.goto(nextIndex);
};

fadingCarousel.prototype.prev = function(){
	var prev = this.isFirst() ? this.length - 1 : this.currentIndex - 1;
	this.emit('prev');
	this.goto(prev);
	return this; 
};

fadingCarousel.prototype.goto = function(i) {
	this.active.className = this.active.className.replace( /(?:^|\s)visible(?!\S)/g , '' )
	
	var el = this.active = this.list[i];
	el.className += ' visible';

	this.emit('indexChanged', i);
	
	this.currentIndex = i; 
	return this; 
};