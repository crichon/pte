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
          $('#editor').wysihtml5();
    },

    newEvents: function(){

		var $inputs = $('#container :input');

		var values = {};
		$inputs.each(function() {
	        values[this.name] = $(this).val();
        });
        
        var branch = "";
        // retrieve branch value
        $('#container :input[name="branch"]:checked').each(function(){ 
            branch += this.getAttribute("value") + " ";})
        
        var newEvt = new Evt({
            id: null,
            title: $('#container :input[name="title"]').val(),
            description:  $('#editor').innerHtml,
            type:  $('#container :input[name="type"]').val(),
            place:  $('#container :input[name="place"]').val(),
            //select a date picker
            begin_date: 1369820521, 
            end_date: 1369820521,
            branch: branch
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
    $('#listModal').hide();
    $('#item-container').hide();
    $('.updateEvt').hide();
}

window.DocsRouter = Backbone.Router.extend({

    routes: {
        "": function(){ clean(); $('#list-container').show(); },
        "update/:id": function(id) { clean(); $('#item-container').show(); $('#updateEvt' + id).show(); $('#edit'+ id).wysihtml5()},
        "add": function() { clean(); $('#container').show(); },
        "evt/:id": "showList"
    },

    showList: function (id) {
        $(".modal-body > ul").empty();
        var myList = Students.where({evt_id: id});
        var li = null;
        if (myList.length > 0){
            for (var i = 0; i < myList.length; i++) {
                li = document.createElement('li');
                li.innerHTML = myList[i].get("student");
                $(".modal-body > ul").append(li);
            }
        }
        else {
                li = document.createElement('li');
                li.innerHTML = "Pas d'étudients inscrits pour le moment"; 
                $(".modal-body > ul").append(li);
        }
            
        $('#listModal').modal();
        router.navigate('');
    },
})

router = new DocsRouter();
Backbone.history.start();

Evts.fetch();

