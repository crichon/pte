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
        
        if (newEvt.get("id") === null)
            Evts.create(newEvt);
        //newEvt.save();
    },

    addEvt: function(evt) {
        var listView = new EvtListView({model: evt, className: evt.get("type")});
        var evtView = new EvtView({model: evt, id: "updateEvt" + evt.get("id"), className: "updateEvt" });
        evtView.$el.hide();
        $("#item-container").append(evtView.render().el);
        $("#list-container").append(listView.render().el);
    },

    addEvts: function(){ Evts.each(this.addEvt()); }

})

var admin = new AdminView();

function clean() { 
    $('#list-container').hide(); 
    $('#container').hide();
    $('#item-container').hide();
    $('.updateEvt').hide();
}

window.DocsRouter = Backbone.Router.extend({

    routes: {
        "": function(){ clean(); $('#list-container').show(); },
        "update/:id": function(id) { clean(); $('#item-container').show(); $('#updateEvt' + id).show();},
        "add": function() { clean(); $('#container').show(); }
    }
})

router = new DocsRouter();
Backbone.history.start();

Evts.fetch();

