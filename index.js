// animate carousel

var Emitter = require('emitter')
	, classes = require('classes');

module.exports = function(selector, options){
	options || (options = {});
	return new swapElements(selector, options);
}

var swapElements = function(selector, options) {
	Emitter.call(this);
	this.list = document.querySelectorAll(selector);
	this.length = this.list.length; 
	this.currentIndex = options.startIndex || 0;
	this.active = this.list[this.currentIndex];
	classes(this.active).add('active');
	this.animationDuration = options.animationDuration || 600;
	this.duration = 7000; 
}

swapElements.prototype = new Emitter(); 

swapElements.prototype.play = function(duration){
	var self = this; 
	if (self.timer)
		return

	duration = duration || self.duration; 
	self.timer = window.setInterval(function(){
		self.next();
	}, duration);
	self.emit('play');
	return this; 
};

swapElements.prototype.stop = function(){
	window.clearInterval(this.timer);
	this.emit('stop');
	return this; 
}

swapElements.prototype.isFirst = function(){
	return this.currentIndex === 0; 
}

swapElements.prototype.isLast = function(){
	return this.currentIndex === this.length - 1; 
}

swapElements.prototype.next = function(){
	var nextIndex = this.isLast() ? 0 : this.currentIndex + 1;
	this.emit('next');
	this.goto(nextIndex);
};

swapElements.prototype.prev = function(){
	var prev = this.isFirst() ? this.length - 1 : this.currentIndex - 1;
	this.emit('prev');
	this.goto(prev);
	return this; 
};

swapElements.prototype.goto = function(i) {

	var self = this
		, prevElement = self.active; 

	if (self.currentIndex === i)
		return

	// if we are moving forward, then add a 'left' class to the element
	// otherwise, add a 'right' class
	var direction = self.currentIndex < i ? 'left' : 'right';
	classes(prevElement).add(direction);

	// after the animation has finished, remove the active tag. 
	setTimeout(function() {
		classes(prevElement).remove('active').remove(direction);
	}, self.animationDuration);

	// for the new div, add 'next' and 'left' and after a set duration, remove them
	// and add active
	
	var el = self.active = self.list[i]
		, side = (direction === 'left') ? 'next' : 'prev';

	classes(el).add(side);
	el.offsetWidth; // force reflow to get slide-in animation working
	classes(el).add(direction);

	setTimeout(function() { 
		classes(el).remove(direction).remove(side).add('active');
	}, self.animationDuration);

	self.emit('indexChanged', i);
	
	self.currentIndex = i; 
	return this; 
};