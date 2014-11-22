/**
*
* jquery.loopscroller.js
*
* @description. Another jQuery slider. Works well with any content.
* @version 1.0 
* @author Henry Algus <henryalgus@gmail.com>
*
*/

(function($,window,undefined) {
// main plugin hook
$.fn.loopScroller = function(options) {
	return this.each(function() {
		new $.loopScroller(this,options);
	});
};

var defaults = {};
	
$.loopScroller = function(el,options) {
	// defaults
	var defaults = {
		// default frame rate
		frameRate:24,
		// default slides per frame 
		slidesPerFrame:1,
		// default content element
		contentElement:'p',
		// pause on hover event?
		hoverPause:true
	}	
	
	var self = this;
	
	this.totalWidth = 0;	
	this.options = $.extend({}, defaults, options || {});	
	this.mainContainer = $(el);
	// set framerate and speed
	this.frameRate = this.options.frameRate;
	this.scrollSpeed = this.options.slidesPerFrame;
	this.contentElement = this.options.contentElement;
	this.hoverPause = this.options.hoverPause;
	// wrap everything into div and add class
	this.list = this.mainContainer.wrap('<div></div>').parent().addClass('loop-scroll-list');	
	// get items	
	this.items = this.list.children().children();
	$(window).load(function() { self.init();  });
		
};
	
$.loopScroller.fn = $.loopScroller.prototype = {};

$.loopScroller.fn.extend = $.loopScroller.extend = $.extend;

$.loopScroller.fn.extend({
	init: function() {
		var self = this;
		this.interval = null;		
		this.startPosition = 0;
		this.currentPosition = 0;
		this.loopCount = 0;
		// calculate animation delay
		this.animationDelay = Math.floor(1000 / this.frameRate);
		
		// calculate total length of content
		if(this.items.length > 0) {
			this.items.each(function() { 
					self.totalWidth+=$(this).outerWidth(true); 
				}
			);	
		}
		
		// add classes
		this.items.first().addClass('first');
		this.items.last().addClass('last');
		
		// remember original items and width
		this.originalItems = this.items;
		this.originalWidth = this.totalWidth;
		this.scrollObj = this.items.parent();
		
		// create first element which creates "virtual width"
		this.firstObj = $("<"+this.contentElement+">").addClass('current-first').css({marginLeft:0,fontSize:1}).html("&nbsp;");
		this.scrollObj.prepend(this.firstObj);
		
		// calculate max scroll
		this.scrollMax = this.totalWidth - this.list.width();
		this.list.children().width(this.totalWidth);	
		
		// lets go
		this.moveForward();
		if(this.hoverPause) {
			// stop everything on hover
			this.list.hover(function(){		
				clearInterval(self.interval);	
			},
			function(){
				// go
				self.moveForward();
			});
		}
	},
	// next frame
	moveForward: function() {
		var self = this;
		self.interval = setInterval(function() {
			// move slides..
			if(self.list.scrollLeft() < self.scrollMax) {
				self.currentPosition = self.currentPosition += self.scrollSpeed;	
				self.list.scrollLeft(self.currentPosition);
			} else {
				// content ended.. start again
				if(self.loopCount > 0) {
					// remove everything before last and first (until current first)
					var currentFirst  = self.scrollObj.children(".last:first");				
					currentFirst.prevUntil(".current-first").remove();
					currentFirst.remove();
					// assign virtual width
					self.firstObj.css({marginLeft:self.originalWidth * self.loopCount});
				}
				// clone new content
				self.scrollObj.append(self.originalItems.clone());
				// change scroller width
				self.scrollMax = self.scrollMax + self.originalWidth;
				self.totalWidth = self.totalWidth + self.originalWidth;
				self.list.children().width(self.totalWidth);
				// memorize loops
				self.loopCount++;
			}

		},this.animationDelay);
	}
});	  
})(jQuery,window);