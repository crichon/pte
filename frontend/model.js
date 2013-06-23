// Model

var MyModel =  Backbone.Model.extend({



    save: function(method, model, options){ 
        
        var id = this.get("id");
		
        if(id === null){
            $.ajax({ 
                type:  "POST", 
                url: this.url(),
                data: $.param(this.toJSON())
            });
         }
         else{
            $.ajax({ 
                type: "PUT",
                url: this.url(),
                data: $.param(this.toJSON())
            });
        }	
    }
});

var Menber = MyModel.extend({
    urlRoot: function () { return myUrl + 'api/menbers'; },
});
var Evt = MyModel.extend({
    urlRoot: function () { return myUrl + 'api/evt'; },
});
var Student = MyModel.extend({});

var EvtList = Backbone.Collection.extend({
        model: Evt,
        url : myUrl + 'api/evt'
});

var StudentList = Backbone.Collection.extend({
        model: Student,
        url : myUrl + 'api/student_by_evt'
});

var MenberList = Backbone.Collection.extend({
        model: Menber,
        url : myUrl + 'api/menbers'
});

var Menbers = new MenberList();
var Evts = new EvtList();
var Students = new StudentList();

