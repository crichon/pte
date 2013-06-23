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

var MenberView = Backbone.View.extend({
    
	template: _.template( $('#menber-template').html() ),
	
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var EvtListView = Backbone.View.extend({
    
    tagName : "tr",
    template: _.template( $('#list-template').html() ),

    events: {
        'click .delete': 'delete',
    },

    initialize: function () {
	//this.listenTo(this.model, "change", this.update)
	this.model.on('change', this.render, this);
	this.listenTo(this.model, 'remove', this.del);
    },

    del: function(){
        this.unbind();
        this.remove();
    },
    
    delete: function(){
	this.model.destroy();
        this.unbind();
        this.remove();
    },
    
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

var AdminView = Backbone.View.extend({
    el: '#main',

    events:{
          'click #submitEvt': "newEvents",
          'click #submitMenber': "setMenbers",
    },

    initialize: function(){
          this.listenTo(Evts, 'add', this.addEvt);
          this.listenTo(Menbers, 'add', this.addMenbers);
          $('#editor').wysihtml5();
    },

    setMenbers: function(){
	Menbers.each( function (menbre) {
		menbre.set("name", $('#' + menbre.get("type")).val());
		menbre.save();
	});
	handleAlerts("alert-success", "Liste des menbres mises à jour");
	router.navigate("", true);
    },

    newEvents: function(){
	// var $inputs = $('#addForm :input');

        var id = null;
        if($('#addForm :input[name="id"]').val() !== "0")
            id = $('#addForm :input[name="id"]').val();
	else
	    id = null;
        
        var branch = "";
        // retrieve branch value
        $('#addForm :input[name="branch"]:checked').each(function(){ 
            branch += this.getAttribute("value") + " ";})
	branch = branch.toUpperCase();       
 
        var newEvt = new Evt({
            id: id,
            title: $('#addForm :input[name="title"]').val(),
            description:  $('#addForm :input[name="description"]').val(),
            type:  $('#addForm :input[name="type"]:checked').val(),
            place:  $('#addForm :input[name="place"]').val(),
            begin_date: $('#addForm :input[name="begin_date"]').val(),
            end_date: $('#addForm :input[name="end_date"]').val(),
            img_path: $('#addForm :input[name="img_path"]').val(),
            pdf_path: $('#addForm :input[name="pdf_path"]').val(),
            branch: branch
        });
        
        if (newEvt.get("id") === null){
  	    newEvt.save();
            Evts.add(newEvt);
	    Evts.fetch();
	    handleAlerts("alert-success", "événement crée");
	}
        else{
            newEvt.save();
            Evts.add(newEvt, {merge: true});
	    handleAlerts("alert-success", "événements mis à jour");
        }
	// See how to put this in create and add callbacks
	router.navigate("", {trigger: true});
    },

    addEvt: function(evt) {
        var listView = new EvtListView({model: evt, className: evt.get("type")});
        $("#list-container").append(listView.render().el);
    },

    addMenbers: function(menber) {
	var view = new MenberView({model: menber});
	$("#menber-container").prepend(view.render().el);
    },

});

var admin = new AdminView();

function clean() { 
    $('#addForm :input:text').val('');
    $('#addForm :input:radio,#addForm :input:checkbox').removeAttr('checked').removeAttr('selected');
    $('#addForm :input[name="img_path"]').val('');
    $('#addForm :input[name="pdf_path"]').val('');
    $('#addForm :input[name="id"]').val('0');
    var editorInstance = $('#addForm :input[name="description"]').data("wysihtml5").editor
    editorInstance.setValue('');
    
    $('#list-container').hide(); 
    $('#menber-container').hide();
    $('#container').hide();
    $('#listModal').hide();
}

window.DocsRouter = Backbone.Router.extend({

    routes: {
        "": function(){ clean(); $('#list-container').show(); },
        "update/:id": "update", 
        "add": function() { clean(); $('#container').show(); },
	"menbres": function() { clean(); $('#menber-container').show(); },
        "evt/:id": "showList"
    },

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
        router.navigate('');
    },

    update: function(id){
		clean();
        $('#container').show();
        var evt = Evts.get(id);
        var branch = evt.get("branch").split(" ");
        var $inputs = $('#addForm :input');

        //  set id  
        $('#addForm :input[name="id"]').val(evt.get("id"));
        // set type
        $('#addForm :input[value="' + evt.get("type") + '"]')[0].checked = true;
	$('#addForm :input[name="img_path"]').val(evt.get("img_path"));
	$('#addForm :input[name="pdf_path"]').val(evt.get("pdf-path"));
        
	// set editor text
	var editorInstance = $('#addForm :input[name="description"]').data("wysihtml5").editor
        editorInstance.setValue(evt.get("description"));
  
        // set branch and text input
        $inputs.each(function() {
            if (this.type === "text")
                this.value = evt.get(this.name);
            else if (this.type === "checkbox")
                if (branch.indexOf(this.value) >= 0 )
                    this.checked = true;
            // console.log(this);
        });

    }
})

$(document).ready(function() {
    $('#UploadForm').on('submit', function(e) {
        e.preventDefault();
        //show uploading message
        $("#spinner").html('<div style="padding:10px"><img src="images/ajax-loader.gif" alt="Please Wait"/> <span>Uploading...</span></div>');
        $(this).ajaxSubmit({
            target: '#output',
            success:  afterSuccess //call function after success
        });
    });

router = new DocsRouter();
$.when( Evts.fetch() && Students.fetch() && Menbers.fetch() ).done( function() { Backbone.history.start();});
$("#output").hide();
        $.datepicker.setDefaults({ dateFormat: 'yy-mm-dd' });          
	$('.datepicker').datepicker();

});

function afterSuccess(responseText, statusText, xhr, $form)  {
    $("#spinner").empty();
    var answer = JSON.parse(responseText);
    $('input[name="img_path"]').val(answer["img_path"]);
    $('input[name="pdf_path"]').val(answer["pdf_path"]);

}

$('input[type="file"]').change(function(){ $('#UploadForm').submit(); });

