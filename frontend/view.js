var EvtView = Backbone.View.extend({
/*
        - afficher la liste des inscrits
        - afficher les commentaires associés à un evt
        - lien pour l'inscription
*/
    tagName : "li",
    template: _.template( $('#evt-template').html() ),

    intitialize: function() {},

    events: {
        'click .comment': 'toggleComment',
        'click .studentsList': 'toggleStudentList',
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

