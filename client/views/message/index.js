Template.messageIndex.actions({
    agreeFriend: function() {
        Meteor.call("Relation.agreeFriend", this.from, this._id, function(err, res) {
            if (err) throw err
            alert("添加成功")
        })
    }
})