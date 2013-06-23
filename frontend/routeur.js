function clean() {
        //if (Evts.length < 1)
            //Evts.fetch();
        $('#evts-container').hide();
        $('#about').hide();
        $('#assos').hide();
        $('#contact').hide();
        $('#home').hide();
        $('.concours').show();
        $('.conferences').show();
    }

function handleAlerts(type, data, target){
/*
  display the given messages in a bootstrap alerts
*/
      if ( target === undefined)
        target = 'alerts';
      var div = document.createElement('div');
      div.setAttribute("class", type);
      div.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>' + data;
      $('#'+target).append(div);
}

window.DocsRouter = Backbone.Router.extend({


    routes: {
        "": "home",
        "conferences": "conferences",
        "conferences/:branch": "conferencesByBranch",
        "concours": "concours",
        "concours/:branch": "concoursByBranch",
        "evt/:id": "byId",
        "concours/list/:id": "showList",
        "about": "about",
        "pte": "assos",
        "contact": "contact",
        "inscription/:bool/:evt_id": "inscription",
        "*other" : "other"
    },

    inscription: function(bool, evt_id){
        clean();
        var data = "";
        if (bool === 0){
            data += "Erreur, veuillez vérifier que vous ne vous êtes pas déjà inscrit. <br /> Sinon merci de nous signaler le problème";
            handleAlerts("alert alert-failure", data);
        }
        else {
            data = "Inscription pris en compte, merci.";
            handleAlerts("alert alert-info", data);
        }
        router.navigate("evt/" + evt_id, {trigger: true});
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
                li.innerHTML = "Pas d'étudiant inscrit pour le moment"; 
                $(".modal-body > ul").append(li);
        }
            
        $('#listModal').modal();
        router.navigate('/concours', true);
    },

    home: function(){ clean();  $('#home').show() },

    conferences: function() {
        clean();
        $('#evt-title')[0].innerHTML = "Les conférences";
        
        var list = $('#filterBranch > a');
        var tmp = "";
        for( var i = 0; i < list.length; i++){
            tmp = list[i].getAttribute("href");
            list[i].setAttribute("href", "./#/conferences/" + tmp.split("/")[3]);
        }
        
        $('#evts-container').show();
        $('.concours').hide();
    },
    
    concours: function() {
        clean();
        $('#evt-title')[0].innerHTML = "Les concours"; 
        
        // Ugly, no time 
        var list = $('#filterBranch > a');
        var tmp = "";
        for( var i = 0; i < list.length; i++){
            tmp = list[i].getAttribute("href");
            list[i].setAttribute("href", "./#/concours/" + tmp.split("/")[3]);
        }

        $('#evts-container').show();
        $('.conferences').hide();
    },

    concoursByBranch: function(branch) {
        clean();
        $('#evt-title')[0].innerHTML = "Les concours"; 
        $('#evts-container').show();
        $('.conferences').hide();
        $('.concours').hide();
        $('.' + branch.toUpperCase() + '.concours').show();
    },
    
    conferencesByBranch: function(branch) {
        clean();
        $('#evt-title')[0].innerHTML = "Les conférences"; 
        
        $('#evts-container').show();
        $('.conferences').hide();
        $('.concours').hide();
        $('.' + branch.toUpperCase() + '.conferences').show();
    },

    byId: function(id) {
        clean();
        $('#evt-title')[0].innerHTML = "Les " + Evts.get(id).get("type"); 
        var list = $('#filterBranch > a');
        var tmp = "";
        for( var i = 0; i < list.length; i++){
            tmp = list[i].getAttribute("href");
            list[i].setAttribute("href", "./#/" + Evts.get(id).get("type") + "/" + tmp.split("/")[3]);
	}
        $('#evts-container').show();
        $('.concours').hide();
        $('.conferences').hide();
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

