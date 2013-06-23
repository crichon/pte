function displayEvt( evt){

	var evtDate = new Date(((evt.get("type") === "concours" ) ? evt.get("end_date"): evt.get("begin_date")));
	if (evtDate > new Date())
		return true;
	else
		return false;
}

var AppView = Backbone.View.extend({

    el: '#container',

    events: {
    },

    initialize: function() {
      this.listenTo(Evts, 'add', this.addEvt);
      this.listenTo(Menbers, 'add', this.setMenbers);
      // retrieve inscription list order by evt id and add it in dic with evt_d as key and an array of login as value
      $('.nav > li').click( function (evt){ 
          $('li[class="active"]').removeClass('active');
          evt.currentTarget.setAttribute("class", "active");
      });
    },

    addEvt: function(evt) {
	if (displayEvt(evt)){

		var view = new EvtView({model: evt, id:"evt" + evt.get("id"), className: evt.get("type") + " event "});
		$("#event-list").append(view.render().el);
		if ( $('.item').length < 3){
			if ( $('.item').length === 0 ) 
				var cView = new CarouselView({model: evt, className: "item active" });
			else
				var cView = new CarouselView({model: evt, className: "item" });
			$(".carousel-inner").append(cView.render().el);
		}
	}
    },


    setMenbers: function(menber){ 
		$('#'+ menber.get("type") + ' > h5')[0].innerHTML += ": " + menber.get("name"); 
    }
})


$(document).ready(function() {
	var appView = new AppView({});
	$.when( Evts.fetch({ data: {order_by: "begin_date", order: "desc"}}) && Students.fetch() && Menbers.fetch() ).done( function() { Backbone.history.start();});
});
