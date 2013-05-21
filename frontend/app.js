var AppView = Backbone.View.extend({

    el: '#container',

    events: {
    },


    initialize: function() {
      this.listenTo(Evt, 'add', this.addEvt);
      this.listenTo(Evt, 'reset', this.addEvts);
      this.listenTo(Comment, 'reset', this.addComment);
      this.listenTo(Comment, 'add', this.addComments);
    },

    addEvt: function() {
        var view = new EvtView({model: evt});
        this.$("#evts-container").append(view.render().el);
    },

    addComment: function() {
        var view = new CommentView({model: comment});
        this.$("#comment" + this.model.get('evt_id')).append(view.render().el);
    },

    addEvts: function (){ Evt.each(this.addEvt)},
    addComments: function (){ Evt.each(this.addComment)}

})
