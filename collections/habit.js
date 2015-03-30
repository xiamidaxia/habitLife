Habit = new Meteor.Collection('Habit')

/*if (Habit.find().count() === 1) {
    var id = Habit.findOne()._id
    Habit.remove({_id:id})
}*/
Habit.type = {
    name: Match.Where(function(x) {
        check(x, String)
        return x.length > 0 && x.length <= 20
    }),
    content: Match.Optional(Match.Where(function(x) {
        check(x, String)
        return x.length < 1000
    })),
    createAt: Number,
    userId: String,
    isPrivate: Boolean
}

var HabitController = RouteController.extend({
    waitOn: function() {
        return Meteor.subscribe('Habit.mine')
    },
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
           habits: Habit.find({userId: {$ne: Meteor.userId()}}, {sort: {createAt: -1}}).map(function(doc) {
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