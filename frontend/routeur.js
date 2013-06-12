function clean() {
        //if (Evts.length < 1)
            //Evts.fetch();
        $('#evts-container').hide();
        $('#about').hide();
        $('#assos').hide();
        $('#contact').hide();
        $('#home').hide();
        $('.concour').show();
        $('.conference').show();
    }

window.DocsRouter = Backbone.Router.extend({


    routes: {
        "": "home",
        "conferences": "conferences",
        "concours": "concours",
        "evt/:id": "byId",
        "concours/list/:id": "showList",
        "about": "about",
        "pte": "assos",
        "contact": "contact",
        "*other" : "other"
    },

    other: function() { this.home(); },

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
    },

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

    byId: function(id) {
        clean();
        $('#evts-container').show();
        $('.concour').hide();
        $('.conference').hide();
        $('#evt' + id).show();
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
