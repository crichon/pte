var AppView = Backbone.View.extend({

    el: '#container',

    events: {
    },


    initialize: function() {
      this.listenTo(Evts, 'add', this.addEvt);
      this.listenTo(Evts, 'reset', this.addEvts);
      this.listenTo(Comments, 'reset', this.addComments);
      this.listenTo(Comments, 'add', this.addComment);
    },

    addEvt: function(evt) {
        var view = new EvtView({model: evt, className: evt.get("type")});
        $("#evts-container").append(view.render().el);
    },

    addComment: function(comment) {
        var view = new CommentView({model: comment});
        this.$("#comment" + this.model.get('evt_id')).append(view.render().el);
    },

    addEvts: function (){ Evts.each(this.addEvt)},
    addComments: function (){ Evts.each(this.addComment)}

})

var appView = new AppView({});
Evts.fetch();
