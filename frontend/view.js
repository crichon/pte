var EvtView = Backbone.View.extend({
/*
        - afficher la liste des inscrits
        - afficher les commentaires associés à un evt
        - lien pour l'inscription
*/
    tagName : "div",
    template: _.template( $('#evt-template').html() ),

    intitialize: function() {},

    events: {
        'click .comment': 'toggleComment',
        'click .studentsList': 'toggleStudentsList',
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        // voir quel markup utilisé
    var div = document.createElement('div');
    div.innerHTML = this.model.get('desc');
    this.$('.content').append( div );
    return this;
    }

});

