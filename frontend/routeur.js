function clean() {
        $('#evts-container').hide();
        $('#about').hide();
        $('#assos').hide();
        $('#contact').hide();
        $('#home').hide();
        $('.concour').show();
        $('.conference').show();
    }

window.DocsRouter = Backbone.Router.extend({

// filtrage par type et branch ?

    routes: {
        // "": "init",
        "": "home",
        "conferences": "conferences",
        "concours": "concours",
        "about": "about",
        "pte": "assos",
        "contact": "contact",
        ":branche" : "branche"
    },

    // init: function(){ clean();  $('#evt-list').show() },
    home: function(){ clean();  $('#home').show() },

    conferences: function() {
        $('#evt-title')[0].innerHTML = "Les conférences";
        clean();
        $('#evts-container').show();
        $('.concour').hide();
    },
    
    concours: function() {
        clean();
        $('#evt-title')[0].innerHTML = "Les concours"; 
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
    },

    contact: function() {
        clean()
        $('#contact').show();
    }
});

router = new DocsRouter();
Backbone.history.start();
