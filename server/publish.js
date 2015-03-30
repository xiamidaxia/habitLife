/*Meteor.publish('publicLists', function() {
 return ListCollection.find({userId: {$exists: false}});
 });

 Meteor.publish('privateLists', function() {
 if (this.userId) {
 return ListCollection.find({userId: this.userId});
 } else {
 this.ready();
 }
 });*/

Meteor.publish('Tag.mine', function() {
    /*    var self = this
     setTimeout(function() {
     self.ready()
     }, 5000)*/
    if(this.userId)
        return Tag.find({userId: this.userId})
    else
        this.ready()
})

Meteor.publish('Habit.mine', function() {
    if(this.userId)
        return Habit.find({userId: this.userId})
    else
        this.ready()
})

Meteor.publish('Habit.user', function(userId) {
    return Habit.find({userId: userId})
})

//最新添加的用户习惯
Meteor.publish('Habit.recently', function() {
    var habitCursor = Habit.find(
        //非自己，非私有
        {userId: {$ne: this.userId}, isPrivate: {$ne: true}},
        {sort: {"createAt": -1}, limit: 10, fields: {isPrivate: 0}}
    )
    var userIds = []
    var userCursor
    habitCursor.forEach(function(doc) {
        //doc.username = Meteor.users.findOne({_id: doc.userId}).username
        userIds.push(doc.userId)
    })
    userIds = _.union(userIds)
    userCursor = Meteor.users.find({_id: {$in: userIds}}, {fields: {username: 1}})
    return [
        habitCursor, userCursor
    ]
})
