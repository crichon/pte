// Model

var MyModel =  Backbone.Model.extend({

    save: function(method, model, options){ 
		$.ajax({ 
			type:"POST",
			url:this.url,
			data: $.param(this.toJSON())
		});
	}
});

var Evt = MyModel.extend({
        url : urlRoot + 'api/evt'
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

