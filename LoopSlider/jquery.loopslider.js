/**
*
* jquery.loopslider.js
*
* @description. Another jQuery slider. Works well with any content.
* @version 1.0 
* @author Henry Algus <henryalgus@gmail.com>
*
*/

(function($,window,undefined) {

// Main plugin hook
	
$.fn.loopSlider = function(options) {
	return this.each(function() {
		new $.loopSlider(this,options);
	});
};

$.loopSlider = function(el,options) {
	// setup defaults
	var defaults = {
		speed:3000,
		pauseDelay:5000,
		showPager:false,
		showArrows:false,
		containerClass:'loop-slider-list',
		pagerClass:'pager',
		arrowsClass:'arrows'
	};	
		
	this.options = $.extend({}, defaults, options || {});		
	this.mainContainer = $(el);	
	var children = this.mainContainer.children();
	this.list = this.mainContainer.append($('<div/>',{'class':this.options.containerClass}).css({position:'relative'}).append(children).append(children.first().clone()));
	this.scrollSpeed = this.options.speed;
	this.pauseDelay = this.options.pauseDelay;	
	this.showPager = this.options.showPager;	
	this.showArrows = this.options.showArrows;
	this.slideType = this.options.slideType;
	this.items = this.list.children().children();
	this.itemCount = this.items.length - 1;
	
	var self = this;
	// init on load
	$(window).load(function() { self.init();});	
};
	
$.loopSlider.fn = $.loopSlider.prototype = {};

$.loopSlider.fn.extend = $.loopSlider.extend = $.extend;

$.loopSlider.fn.extend({
	init: function() {
		var self = this;
		
		this.slideWidth = this.list.width();
		this.totalWidth = 0;
		// calculate total width
		if(this.items.length > 0) {
			this.items.each(function(i) { 
					$(this).css({float:'left',width:self.list.width()}).addClass('slide-'+(i+1));
					self.totalWidth+=$(this).outerWidth(true); 
					if(i === 0) {
						$(this).addClass('active');
					}
				}
			);		
		}

		this.list.css({overflow:'hidden'}).children('.'+this.options.containerClass).width(self.totalWidth);
		
		this.interval = null;	
		// set first item as first page
		this.currentItem = 1;
		this.slideObj = this.list.children('.'+this.options.containerClass);
		this.pager = false;
		// if pager is set, create pager
		if(this.showPager) {
			this.createPager();
		}
		// if arrows are set, lets create arrows
		if(this.showArrows){
			this.createArrows();
		}
		this.slideObj.css({left:0});
		// if slider has more than one object, let's start sliding
		if(this.itemCount > 1) {
			this.slideForward();
		}
	},
	// slide forward
	slideForward:function() {
		var self = this;
		this.interval = setInterval(function() {		
			self.currentItem = self.currentItem + 1;
			self.moveSlide();
			var activeSlide = (self.currentItem > self.itemCount)?1:self.currentItem;
			self.slideObj.children().each(function(){
				$(this).removeClass('active');
				if($(this).hasClass('slide-'+activeSlide)) {
					$(this).addClass('active');
				}
			});	
			// if pager is set, lets setup appopriate classes	
			if(self.pager) {
				self.pager.children().each(function(){
					$(this).removeClass(self.options.pagerClass+'-active');
					if($(this).data('page') == activeSlide) {
						$(this).addClass(self.options.pagerClass+'-active');
					}
				});
			}
		},this.pauseDelay);		
	},
	// slider "moving" animation
	moveSlide:function() {
		var self = this;
		self.slideObj.animate({
						left: -(self.slideWidth * (self.currentItem - 1))
		}, self.scrollSpeed, function() {	
						if(self.currentItem > self.itemCount) {
							self.currentItem = 0;
							self.slideObj.css({left:0});
						}
		});	
	},
	// create arrows
	createArrows:function() {
		if(!this.pager) {
			this.createPager();
			this.list.parent().find("."+this.options.pagerClass).css({'visibility':'hidden'});
		}
		// do not create pager if we have less than 2 items
		if(this.itemCount < 2) {
			return false;
		}
		var self = this;
		// next arrow actions
		this.nextArrow = $("<a/>",{"class":this.options.arrowsClass+'-r'}).attr('href','#').text(">").bind("click",function(e){
			e.preventDefault();
			var p = self.currentItem + 1;
			if(p > self.itemCount){
				p = 1;
			}
			self.list.parent().find("."+self.options.pagerClass+'-'+p).trigger("click");		
		});	
		this.list.parent().append(this.nextArrow);
		// previous arrow actions
		this.previousArrow = $("<a/>",{"class":this.options.arrowsClass+'-l'}).attr("href","#").text("<").bind("click",function(e){
			e.preventDefault();
			var p = self.currentItem - 1;
			if(p < 1){
				p = self.itemCount;
			}
			self.list.parent().find("."+self.options.pagerClass+'-'+p).trigger("click");		
		});
		this.list.parent().children("."+self.options.pagerClass).before(this.previousArrow);
	},
	// creates pager
	createPager:function() {
		// do not create pager if we have less than 2 items
		if(this.itemCount < 2) {
			return false;
		}
		var d = $("<div />",{'class':this.options.pagerClass});
		this.list.parent().css({position:'relative'}).append(d);
		var self = this;
		// cycle through items
		this.items.each(function(i){
			// cycle all items
			if(i < self.itemCount) {
				var page = i+1;
				var a = $("<a />",{'class':self.options.pagerClass+'-link '+self.options.pagerClass+'-'+page,'href':''}).data('page',page).text(page);
				a.bind('click',function(e){
					// pager click action
					e.preventDefault();
					self.pager.children().removeClass(self.options.pagerClass+'-active');
					$(this).addClass(self.options.pagerClass+'-active');
					clearInterval(self.interval);	
					self.currentItem = $(this).data('page');
					self.moveSlide();
					self.slideForward();
				});
				// current page is active, setup active class
				if(page == self.currentItem) {
					a.addClass(self.options.pagerClass+'-active');
				}

				d.append(a);
			}
		});	
		this.pager = this.mainContainer.parent().children("."+this.options.pagerClass);		
	}
});
})(jQuery,window);