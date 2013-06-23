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
	this.$('.event-desc')[0].innerHTML = this.model.get("description");
        this.$el.addClass(this.model.get("branch"));
        return this;
    }

});

var CarouselView = Backbone.View.extend({
    tagName : "div",
    template: _.template( $('#carousel-template').html() ),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
	return this;
    }
});

