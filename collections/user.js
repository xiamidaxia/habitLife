Meteor.users.getUserIds = function(cursor, key) {
    var userIds = []
    cursor.forEach(function(doc) {
        userIds.push(doc[key])
    })
    userIds = _.union(userIds)
    return userIds
}

Meteor.users.getUserCursor =  function (cursor, key) {
    var userIds = this.getUserIds(cursor, key)
    return this.find({_id: {$in: userIds}}, {fields: {username: 1}})
}


//todo 添加用户编号, 类似QQ号
Router.route('userLogin', {
    "path": "/user/login",
    action: function() {
        if (this.ready()) {
            this.render()
        }
    }
})

Router.route('userRegister', {
    "path": "/user/register"
})

//todo 这里要做修改，修改获取用户消息方式
Router.route('userDetail', {
    "path": "/user/:userId",
    controller: RouteController.extend({
        "getUser": function() {
            return Meteor.users.findOne({_id:this.params.userId})
        }
    }),
    data: function() {
        return this.getUser()
    }
})