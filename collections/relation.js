Relation = new Meteor.Collection('Relation')
Relation.enumType = {
    "BEG": 0,       //跪求
    "ACCEPT": 1,    //接受, 形成关系
    "REJECT": 2,    //拒绝
    "SUB": 3        //订阅
}

Relation.type = {
    from: String,
    to: String,
    status: Match.Where(function(x) {
        var enumType = Relation.enumType
        for (var i in enumType) {
            if (enumType[i] === x)
                return true
        }
        return false
    }),
    createAt: Date
}
if (Meteor.isClient) {
    Relation.getFriends = function() {
        return this.find({status: this.enumType.ACCEPT})
    }
}
Router.route("relationFriend", {
    "path": "/relation",
    data: function() {
        return Relation.find({status: Relation.enumType.ACCEPT}).map(function(doc) {
            var user = Meteor.users.findOne({_id: doc.to})
            doc.userId = doc.to
            doc.username = user && user.username
            return doc
        })
    }
})