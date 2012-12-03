
var Emitter = require('emitter');
var event = require('event');

module.exports = function(selector, options){
	return new swapElements(selector);
}

var swapElements = function(selector) {
	Emitter.call(this);
	this.list = document.querySelectorAll(selector);
	this.length = this.list.length; 
	this.currentIndex = 0; 
	this.active = this.list[this.currentIndex];
	this.active.className = this.active.className += ' visible';
	this.duration = 7000; 
}

swapElements.prototype = new Emitter; 

swapElements.prototype.play = function(duration){
	if (this.timer)
		return

	duration = duration || this.duration; 
	this.timer = setInterval(this.next.bind(this), duration);
	this.emit('play');
	return this; 
};

swapElements.prototype.stop = function(){
	clearInterval(this.timer);
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
	this.active.className = this.active.className.replace( /(?:^|\s)visible(?!\S)/g , '' )
	
	var el = this.active = this.list[i];
	el.className += ' visible';

	this.emit('indexChanged', i);
	
	this.currentIndex = i; 
	return this; 
};