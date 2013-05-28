// Model

var Evt = Backbone.Model.extend({});
var Comment = Backbone.Model.extend({});

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
