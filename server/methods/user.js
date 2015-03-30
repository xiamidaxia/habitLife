//meteor默认的用户集合是`users`
var m = new MethodRoute('users')

m.add({
    info: function(userId) {
        return Meteor.users.findOne({_id:userId})
    }
})

Meteor.methods(m.create())
