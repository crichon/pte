function clean() {
        $('#evts-container').hide();
        $('#about').hide();
        $('#assos').hide();
    }

window.DocsRouter = Backbone.Router.extend({

// filtrage par type et branch ?

    routes: {
        "": "init",
        "conferences": "conferences",
        "concours": "concours",
        "about": "about",
        "assos": "assos",
        ":branche" : "branche"
    },

    init: function(){ clean();  $('#evts-container').show() },

    conferences: function() {
        clean();
        $('#evts-container').show();
        $('.concour').hide();
    },
    
    concours: function() {
        clean();
        $('#evts-container').show();
        $('.conference').hide();
    },

    branche: function(branche) {
        clean();
        $('#evts-container').show();
        $('.conference').hide();
        $('.concour').hide();
        $('.' + branche).show(); // evt view on type et branche en class
    },

    about: function() {
        clean();
        $('#about').show();
    },
    
    assos: function() {
        clean()
        $('#assos').show();
    }
});

router = new DocsRouter();
Backbone.history.start();
