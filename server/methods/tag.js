var m = new MethodRoute("Tag")
m.hook("isLogin")
m.add({
    "delete": function(tagId) {
        var cur = Tag.find({_id:tagId})
        if (cur.userId === this._id) {
            Habit.remove({_id: tagId})
        } else {
            throw Meteor.Error('permissionDenied')
        }
    },
    "add": function(doc) {
        doc.userId = this.userId
        doc.createAt = new Date
        check(doc, Tag.type)
        return {
            id: Tag.insert(doc)
        }
    },
    "change": function(tagId, newContent) {
        check(newContent, Tag.type.content)
        Tag.update({_id: tagId}, {$set: {content: newContent}})
    }
})

Meteor.methods(m.create())

