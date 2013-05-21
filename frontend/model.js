// Model

var Evt = Backbone.Model.extend({});
var Comment = Backbone.Model.extend({});

var EvtList = BaseCollection.extend({
        model: Item,
        url : urlRoot + 'api/evt'
});

var CommentList = BaseCollection.extend({
        model: Item,
        url : urlRoot + 'api/comment'
});

var Evts = new EvtList();
var Comments = new CommentList();
