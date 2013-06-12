// Model

var MyModel =  Backbone.Model.extend({

    url: urlRoot + 'api/evt',

    save: function(method, model, options){ 
        
        var id = this.get("id");
		
        if(id === null){
            $.ajax({ 
                type:  "POST", 
                url: this.url,
                data: $.param(this.toJSON())
            });
         }
         else{
            $.ajax({ 
                type: "PUT",
                url: this.url + "/" + id,
                data: $.param(this.toJSON())
            });
        }	
    }
});

var Evt = MyModel.extend({
        //url : urlRoot + 'api/evt'
});

var Student = MyModel.extend({});

var EvtList = Backbone.Collection.extend({
        model: Evt,
        url : urlRoot + 'api/evt'
});

var StudentList = Backbone.Collection.extend({
        model: Student,
        url : urlRoot + 'api/student_by_evt'
});

var Evts = new EvtList();
var Students = new StudentList();

