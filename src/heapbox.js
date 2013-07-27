;(function ( $, window, document, undefined ) {


    var pluginName = "heapbox",
        defaults = {
            theme: "darksky",
	    effect: {
		"type": "slide",
		"speed": "slow"
            },
	    openStart: function(){},
	    openComplete: function(){},
	    closeStart: function(){},
	    closeComplete: function(){},
	    onChange: function(){},
        };

    function Plugin( element, options ) {
        
	    /* Settings */
	    this.element = element;
            this.options = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
	    this.instance;
	    this.callbackManager = new Array();

            this.init();
    }

    Plugin.prototype = {

    init: function() {       
		this.instance = this.createInstance();
		this.remapOptions();
		$(this.element).before(this.heapBoxEl);
		this._hideSelect();
		this._setEvents();
	},
	/*
    *  Generate new ID for selectbox
	*/
	createInstance: function() {
         return {
	          heapId: Math.round(Math.random() * 99999999),
		      state: false,
		 };
	    },
	remapOptions: function() {
		
		this._createElements();

	    },
	_setEvents: function() {
		var self = this;
		$(document).on("click", "html", function(e){ e.stopPropagation();self._closeheap(true,function(){},function(){});});   
	},
    _createElements: function() {

		var self = this;
		heapBoxEl = $('<div/>', {  
			id: 'heapbox_'+this.instance.heapId,
			class: 'heapBox',
			data: {'sourceElement':this.element}
		});

		heapBoxHolderEl = $('<a/>', {  
	       	href: '#',
			class: 'holder',
			text: $(this.element).children().first().text(),
			click: function(e){
			   e.preventDefault();
			   e.stopPropagation();
			   self._handlerClicked();
			}
		});

		heapBoxHandlerEl = $('<a/>', {  
	       	href: '#',
			class: 'handler',
			click: function(e){
			   e.preventDefault();
			   e.stopPropagation();
			   self._handlerClicked();
			}
		});

		heapBoxheapEl = $('<div/>', {  
			class: 'heap'
		});

		heapBoxheapOptionsEl = $('<ul/>', {  
			class: 'heapOptions'
		});
	
		heapBoxheapEl = this._getheap();
		
		heapBoxEl.append(heapBoxHolderEl);		
		heapBoxEl.append(heapBoxHandlerEl);
		heapBoxEl.append(heapBoxHandlerEl);

		heapBoxEl.append(heapBoxheapEl);
		this.heapBoxEl = heapBoxEl;
		
        },
	_getheap: function() {
		
		var self = this;
	
		heapBoxheapEl = $('<div/>', {  
			class: 'heap'
		});

		heapBoxheapOptionsEl = $('<ul/>', {  
			class: 'heapOptions'
		});
	
		heapBoxheapEl.append(heapBoxheapOptionsEl);

		$(this.element).children().each(function(){
			
			heapBoxOptionLiEl = $('<li/>', {  
				class: 'heapOption'
			});

			heapBoxheapOptionAEl = $('<a/>', {  
				href: '#',
				rel: $(this).attr('value'),
				title: $(this).text(),
				text: $(this).text(),
				click: function(e){
			   	    e.preventDefault();
			            e.stopPropagation();
				    self._heapChanged(self,this);
				}
			});
			heapBoxOptionLiEl.append(heapBoxheapOptionAEl);
			heapBoxheapOptionsEl.append(heapBoxOptionLiEl);
		});

		heapBoxheapEl.append(heapBoxheapOptionsEl);
		
		
		return heapBoxheapEl;

	},

	/*
	 * Selectbox open-close handler
	*/
	_handlerClicked: function(stageReady) {
		
		if(this.instance.state) {
	           this._closeheap();
		}
		else
		{
		  if(!stageReady) this._closeOthers();
		  else this._openheap();
		  //!stageReady ? :this._openheap();
		}
	},

	/*
	 * Selectbox change handler
	*/
	_heapChanged: function(self,clickedEl) {
	

		holderEl = $("#heapbox_"+this.instance.heapId).find(".holder");
		holderEl.text($(clickedEl).text());
		holderEl.attr("rel",$(clickedEl).attr("rel"));
		this._closeheap(true,function(){},function(){});

		//todo
		$(this.element).val($(clickedEl).attr("rel"));
		this.options.onChange($(clickedEl).attr("rel"));
	},
	_heapSetFirst: function(self) {
		holderEl = $("#heapbox_"+this.instance.heapId).find(".holder");
		holderEl.text($(this.element).children().first().text());
		holderEl.attr("rel",$(this.element).children().first().attr("value"));
		$(this.element).val($(this.element).children().first().attr("value"));		
	},
	/*
	 * Close opened selectbox
	*/
	_closeheap: function(internal,closeStartEvent,closeCompleteEvent) {
		
		this.instance.state = false;
		heapEl = $("#heapbox_"+this.instance.heapId).find(".heap");		
		
		if(internal){
		  closeStartEvent = closeStartEvent;
		  closeCompleteEvent = closeCompleteEvent;
		}else{
		  closeStartEvent = this.options.closeStart;
		  closeCompleteEvent = this.options.closeComplete;
		}
			
		closeStartEvent.call();		

		switch(this.options.effect.type) {
		
		  case "fade":
			heapEl.fadeOut(this.options.effect.speed,closeCompleteEvent);	
			break;
		  case "slide":
			heapEl.slideUp(this.options.effect.speed,closeCompleteEvent);	
			break;
		  case "standard":
			heapEl.hide(this.options.effect.speed,closeCompleteEvent);	
			break;
		  default: 
			heapEl.slideUp(this.options.effect.speed,closeCompleteEvent);	
			break;

		}
	},
	
	/*
	 * Open selectbox
	*/
	_openheap: function() {
		
		this.instance.state = true;
		heapEl = $("#heapbox_"+this.instance.heapId).find(".heap");		
		
		this.options.openStart.call();

		switch(this.options.effect.type) {
		
		  case "fade":
			heapEl.fadeIn(this.options.effect.speed,this.options.openComplete);	
			break;
		  case "slide":
			heapEl.slideDown(this.options.effect.speed,this.options.openComplete);	
			break;
		  case "standard":
			heapEl.show(this.options.effect.speed,this.options.openComplete);	
			break;
		  default: 
			heapEl.slideDown(this.options.effect.speed,this.options.openComplete);	
			break;
		}
	},

	/*
	 * Close other selectboxes
	*/
	_closeOthers: function() {
	
		var self = this;
	
		$('div[id^=heapbox_]').each(function(index){

			 el = $("div#"+$(this).attr("id"));

			 if(el.data("sourceElement"))
			 {
				sourceEl = $.data(this, "sourceElement");
				heapBoxInst = $.data(sourceEl, "plugin_" + pluginName);
				
				if(self.instance.heapId != heapBoxInst.instance.heapId)
				{	
				     if(heapBoxInst.instance.state)
				     {
				       self._callbackManager('change','_closeOthers',true);
				       heapBoxInst._closeheap(true,function(){},function(){self._callbackManager('change','_closeOthers',false);});
				     }
				}
			 }
		});

		 self._callbackManager('test','_closeOthers');
	},

	/*
	 * Manager of callback queue
	*/
	_callbackManager: function(type,identificator,state) 
	{	
		if(!this.callbackManager[identificator])
			this.callbackManager[identificator] = 0;
			
		if(type == "change")
		{
			state ? this.callbackManager[identificator]++ : this.callbackManager[identificator]--;
			this._callbackManager('test',identificator);

		}else if(type == "test"){
			if(this.callbackManager[identificator] == 0) this._handlerClicked(true);
		}

			
	},

	/*
	 * Data setter
	*/
	_setData: function(jsonOptions) {
		self = this;
		var jsonData = jQuery.parseJSON(jsonOptions);
		$(this.element).find("option").remove();
		
		$.each(jsonData,function(){
	
			option = $('<option/>', {  
                          value: this.value,
			  text: this.text
			});
			
			$(self.element).append(option);	
		});

		this._update();
	},

	/*
	 * Selectbox update
	*/
	_update: function() {
	
		heap = this._getheap();
		$("div#heapbox_"+this.instance.heapId+" .heap").remove();
		$("div#heapbox_"+this.instance.heapId).append(heap);
		this._heapSetFirst(this);

	},
	_hideSelect: function() {
		$(this.element).css("display","none");
	}
    };

    $.fn[pluginName] = function ( options, optional ) {

        return this.each(function () {
	
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
	    }
	    else
	    {
		heapBoxInst = $.data(this, "plugin_" + pluginName);

		switch(options)
		{
		case "update":
			heapBoxInst._update();
			break;
		case "set":
			heapBoxInst._setData(optional);
			break;
		}
	    }	
        });
    };

})( jQuery, window, document );
