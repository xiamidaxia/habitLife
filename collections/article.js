Article = new Meteor.Collection('article')

Article.enumType = {
    'diary': 0
}

Article.type = {
    title: String,
    content: String,
    createAt: Date,
    creater: String,
    joinCount: Number
}

var ArticleController = RouteController.extend({

})

Router.route('articleIndex', {
    path: "/article/:_id",
    controller: ArticleController,
    template: "articleIndex",
    action: function() {
    }
})
