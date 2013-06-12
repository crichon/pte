var EvtView = Backbone.View.extend({
/*
        - afficher la liste des inscrits
        - lien pour l'inscription
*/
    tagName : "li",
    template: _.template( $('#evt-template').html() ),

    intitialize: function() {},
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

