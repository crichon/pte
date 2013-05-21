var EvtView = Backbone.View.extend({
/*
        - afficher la liste des inscrits
        - afficher les commentaires associés à un evt
        - lien pour l'inscription
*/
    tagName : "div",
    className: this.model.get("type"),
    template: _.template( $('#evt-template').html() ),

    events: {
        'click .comment': 'toggleComment',
        'click .studentsList': 'toggleStudentsList',
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJson()));
        // voir quel markup utilisé
    div.innerHTML = this.model.get('desc');
    this.$('.content')).append( div );
    return this;
    }

});

