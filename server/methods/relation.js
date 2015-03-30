var m = new MethodRoute('Relation')
m.hook("isLogin")
m.hook(isDoItAgain, {only: ["addFriend"]})
m.add({
    addFriend: function(toId) {
        var begDoc = {
            from: this.userId,
            to: toId,
            status: Relation.enumType.BEG,
            createAt: new Date
        }
        var user = Meteor.users.findOne({_id:this.userId})
        var messageDoc = {
            message: user.username + "请求加你朋友!",
            createAt: new Date,
            from: this.userId,
            to: toId,
            type: Message.enumType.ADD_FRIEND
        }
        check(begDoc, Relation.type)
        check(messageDoc, Message.type)
        //add Message
        Message.insert(messageDoc)
        return Relation.insert(begDoc)
    },
    agreeFriend: function(toId, messageId) {
        if(toId === this.userId) {
            throw new Meteor.Error("addSelf")
        }
        var preDoc = Relation.findOne({from:toId, to:this.userId})
        if (!preDoc || preDoc.status !== Relation.enumType.BEG) {
            throw new Meteor.Error("agreeError")
        }
        //更新
        Relation.update({_id:preDoc._id}, {$set: {status:Relation.enumType.ACCEPT}})
        var friendDoc = {
            from: this.userId,
            to: toId,
            status: Relation.enumType.ACCEPT,
            createAt: new Date
        }
        var user = Meteor.users.findOne({_id:this.userId})
        var messageDoc = {
            message: "你和" + user.username + "成为好友了!",
            createAt: new Date,
            from: this.userId,
            to: toId,
            type: Message.enumType.INFO
        }
        check(friendDoc, Relation.type)
        check(messageDoc, Message.type)
        //add Message
        Message.insert(messageDoc)
        //remove Message
        messageId && Message.remove({_id: messageId, to: this.userId})
        return Relation.insert(friendDoc)
    }

})

function isDoItAgain(toId) {
    if(toId === this.userId) {
        throw new Meteor.Error("addSelf")
    }
    var enumType = Relation.enumType
    var preDoc = Relation.findOne({from:this.userId, to:toId})
    if (preDoc && preDoc.type !== enumType.SUB) {
        throw new Meteor.Error("doItAgain")
    }
}


Meteor.methods(m.create())
