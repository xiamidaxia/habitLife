Template.habitIndex.actions({
    delete: function() {
        Meteor.call('Habit.delete', this._id)
    }

})
