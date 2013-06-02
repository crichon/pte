var EvtListView = Backbone.View.extend({
    
    tagName : "div",
    template: _.template( $('#list-template').html() ),

    events: {
        'click .delete': 'del',
    },

    del: function(){
        this.model.destroy();
        this.unbind();
        this.remove();
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

var EvtView = Backbone.View.extend({
    
    tagName : "div",
    template: _.template( $('#evt-template').html() ),
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});


var AdminView = Backbone.View.extend({
    el: '#container',

    events:{
          'click #submitEvt': "newEvents",
          'click #updateEvt': "newEvents"
    },

    initialize: function(){
          this.listenTo(Evts, 'add', this.addEvt);
          this.listenTo(Evts, 'reset', this.addEvts);
          this.listenTo(Comments, 'reset', this.addComments);
          this.listenTo(Comments, 'add', this.addComment);
    },

    newEvents: function(){

		var $inputs = $('#container :input');

		var values = {};
		$inputs.each(function() {
	        values[this.name] = $(this).val();
        });

        var newEvt = new Evt({
            id: null,
            title: $('input[name="title"]').val(),
            description:  $('input[name="desc"]').val(),
            type:  $('input[name="type"]').val(),
            place:  $('input[name="place"]').val(),
            //select a date picker
            begin_date: 1369820521, 
            end_date: 1369820521,
            student_count: 0,
            branch: $('input[name="branch"]').val()
        });

        newEvt.save();
    },

    addEvt: function(evt) {
        var listView = new EvtListView({model: evt, className: evt.get("type")});
        var evtView = new EvtView({model: evt, id: "updateEvt" + evt.get("id"), className: "updateEvt" });
        evtView.$el.hide();
        $("#item-container").append(evtView.render().el);
        $("#list-container").append(listView.render().el);
    },

    addComment: function(comment) {
    },

    addEvts: function (){ 
        Evts.each(this.addEvt)},
    addComments: function (){ 
        Evts.each(this.addComment)}

})

var admin = new AdminView();

window.DocsRouter = Backbone.Router.extend({

    routes: {
        "": function(id){ $('#list-container').show(); $('#item-container').hide(); $('.updateEvt').hide(); },
        "update/:id": function(id) { 
            $('#list-container').hide(); 
            $('#item-container').show();
            $('#updateEvt' + id).show();}
    }
})

router = new DocsRouter();
Backbone.history.start();

Evts.fetch();

