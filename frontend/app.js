var AppView = Backbone.View.extend({

    el: '#container',

    events: {
    },

    initialize: function() {
      this.listenTo(Evts, 'add', this.addEvt);
      this.listenTo(Evts, 'reset', this.addEvts);
      Evts.fetch();
      Students.fetch();
      // retrieve inscription list order by evt id and add it in dic with evt_d as key and an array of login as value
      $('.nav > li').click( function (evt){ 
          $('.active').removeClass('active');
          evt.currentTarget.setAttribute("class", "active");
      });
      // Activate navbar
    },

    addEvt: function(evt) {
        var view = new EvtView({model: evt, id:"evt" + evt.get("id"), className: evt.get("type") + " event "});
        // hide or unhide evt depending on the url
        $("#event-list").append(view.render().el);
    },

    addEvts: function (){ Evts.each(this.addEvt)},

})

var appView = new AppView({});
