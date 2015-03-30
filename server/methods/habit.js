var m = new MethodRoute("Habit")
m.hook("isLogin")
m.add({
    "delete": function(habitId) {
        var cur = Habit.find({_id:habitId})
        if (cur.userId === this._id) {
            Habit.remove({_id: habitId})
        } else {
            throw Meteor.Error('permissionDenied')
        }
    },
    "create": function(doc) {
        doc.userId = this.userId
        doc.createAt = (new Date).getTime()
        check(doc, Habit.type)
        return {
            id: Habit.insert(doc)
        }
    },
    "update": function(habitId, doc) {
        check(doc.name, Habit.type.name)
        check(doc.content, Habit.type.content)
        check(doc.isPrivate, Habit.type.isPrivate)
        var cloneDoc = {
            name: doc.name,
            content: doc.content,
            isPrivate: doc.isPrivate
        }
        Habit.update({_id: habitId}, {$set: cloneDoc})
    }
})

Meteor.methods(m.create())

