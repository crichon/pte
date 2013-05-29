
var AdminView = Backbone.View.extend({
    el: '#container',

    events:{
        'click #submitEvt': "newEvents"
    },

    newEvents: function(){

        var test = new Date();

        var newEvt = new Evt({
            id: null,
            title: $('input[name="title"]').val(),
            description:  $('input[name="desc"]').val(),
            type:  $('input[name="type"]').val(),
            place:  $('input[name="place"]').val(),
            //date:  $('input["date"]').value(),
            begin_date: 1369820521, 
            end_date: 1369820521,
            student_count: 0,
            branch: $('input[name="branch"]').val()
        });

        newEvt.save();
    }
});

var admin = new AdminView();

