// Model

var MyModel =  Backbone.Model.extend({


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

var Comment = MyModel.extend({});

var EvtList = Backbone.Collection.extend({
        model: Evt,
        url : urlRoot + 'api/evt'
});

var CommentList = Backbone.Collection.extend({
        model: Comment,
        url : urlRoot + 'api/comment'
});

var Evts = new EvtList();
var Comments = new CommentList();


