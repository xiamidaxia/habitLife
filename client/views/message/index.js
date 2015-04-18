Template.messageIndex.helpers({
    showAction: function() {
        return this.type === Message.enumType.ADD_FRIEND
    }
})
Template.messageIndex.actions({
    agreeFriend: function() {
        Meteor.call("Relation.agreeFriend", this.from, this._id, function(err, res) {
            if (err) throw err
            alert("添加成功")
        })
    }
})