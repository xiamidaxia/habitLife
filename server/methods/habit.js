var m = new MethodRoute("Habit")
m.hook("isLogin")
m.hook("checkIsSelf", {except: ['create']})
m.add({
    "delete": function(habitId) {
        Habit.remove({_id: habitId})
    },
    "create": function(doc) {
        doc.userId = this.userId
        doc.createAt = new Date
        check(doc, Habit.type)
        return {
            id: Habit.insert(doc)
        }
    },
    "update": function(habitId, doc) {
        check(doc, Habit.type)
        Habit.update({_id: habitId}, {$set: doc})
    }
})

Meteor.methods(m.create())

