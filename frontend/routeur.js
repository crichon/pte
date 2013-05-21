window.DocsRouter = Backbone.Router.extend({

// filtrage par type et branch ?

    routes: {
        "": "init",
        "conferences": "conferences",
        "concours": "concours",
        "about": "about",
        "assos": "assos",
        ":branche" : "branche"
    }

    init: function(){ if ( Evt.length === 0 ) Evt.fetch()},
    
    clean: function() {
        $('#container-evts').hide();
        $('#about').hide();
        $('#assos').hide();

    conferences: function() {
        this.clean();
        $('#container-evts').show();
        $('.conference').show();
    },
    
    concours: function() {
        this.clean();
        $('#container-evts').show();
        $('.conference').hide();
        $('.concours').show();
    },

    branche: function(branche) {
        this.clean();
        $('#container-evts').show();
        $('.conference').hide();
        $('.concours').hide();
        $('.' + branche).show(); // evt view on type et branche en class
    }

    about: function() {
        this.clean();
        $('#about').show();
    }
    
    assos: function() {
        this.clean()
        $(#assos.show());
    }
})

router = new DocsRouter();
Backbone.history.start();
