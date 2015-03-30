Habit = new Meteor.Collection('Habit')

Habit.type = {
    name: Match.Where(function(x) {
        check(x, String)
        return x.length > 0 && x.length <= 20
    }),
    content: Match.Optional(Match.Where(function(x) {
        check(x, String)
        return x.length < 1000
    })),
    createAt: Date,
    userId: String,
    isPrivate: Boolean
}
if (Meteor.isClient) {
    //获取朋友的习惯
    Habit.getFriendsHabit = function() {
        var friends = Relation.getFriends()
        var friendIds = Meteor.users.getUserIds(friends, "to")
        return Habit.find({userId: {$in: friendIds}})
    }
    Habit.getRecently = function() {
        return Habit.find({userId: {$ne: Meteor.userId()}}, {sort: {createAt: -1}})
    }
}
var HabitController = RouteController.extend({
    onBeforeAction: function() {
        if(this.ready()) {
            if(Habit.find().count() === 0) {
                Router.go("habitCreate")
            } else {
                this.next()
            }
        }
    }
})

//列表页
Router.route('habitIndex', {
    "path": "/habit",
    controller: HabitController,
    data: function() {
        return {
            habits: Habit.find({userId: Meteor.userId()}, {sort: {createAt: -1}})
        }
    },
    action: function() {
        if(this.ready()) {
            this.title('习惯')
            this.render()
        }
    }
})

//详情页面
Router.route('habitItem', {
    "path": "/habit/item/:_id",
    controller: HabitController,
    data: function() {
        return Habit.findOne({_id: this.params._id});
    },
    action: function() {
        if(this.ready()) {
            this.title('习惯选项')
            this.render()
        }

    }
})

//创建
Router.route('habitCreate', {
    "path": "/habit/create",
    data: function() {
        return {}
    },
    action: function() {
        if(this.ready()) {
            this.title("创建习惯")
            this.render()
        }
    }
})
//编辑
Router.route('habitEdit', {
    "path": "/habit/edit/:_id",
    controller: HabitController,
    data: function() {
        return Habit.findOne({_id: this.params._id})
    },
    action: function() {
        if(this.ready()) {
            this.title("编辑习惯")
            this.render()
        }
    }
})
//指定用户
Router.route('habitUser', {
    "path": "/habit/user/:userId",
    data: function() {
        //return Meteor.subscribe("Habit.user", this.params.userId)
    },
    action: function() {
        if(this.ready()) {
            this.title(this.params.userId + "的习惯")
            this.render()
        }
    }
})
//最近的习惯
Router.route('habitRecently', {
    "path": "/habit/recently",
    data: function() {
        return {
           habits: Habit.getRecently().map(function(doc) {
                var user = Meteor.users.findOne({_id: doc.userId})
                if (user) {
                    doc.username = user.username
                }
                return doc
           })
        }
    },
    action: function() {
        if(this.ready()) {
            this.title("最新的习惯")
            this.render()
        }
    }
})

Router.route('habitFriend', {
    "path": "/habit/friend",
    data: function() {
        return Habit.getFriendsHabit()
    }
})