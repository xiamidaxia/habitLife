Template.habitEdit.actions({
    "submit": function(e, t) {
        e.preventDefault()
        var data = t.t(e).serializeObject()
        if (!data.name) {
            alert('名字不能为空')
            return
        }
        if (data.name.length > 20) {
            alert('名字不能超过20个字符')
            return
        }
        if (data.content && !Match.test(data.content, Habit.type.content)) {
            alert('内容不能超过1000个字符')
            return
        }
        Meteor.call('Habit.update', this._id, data, function(err, res) {
            if (err)  throw err
            Router.go('habitIndex')
        })
    }
})