Template.userDetail.actions({
    "addFriend": function() {
        Meteor.call("Relation.addFriend", this._id, function(err, res) {
            if (err) throw err
            console.log(res)
            alert("请求发送成功")
        })
    },
    "addFans": function() {

    }

})