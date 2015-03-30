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

Meteor.publish('Message.mine', function() {
    if (this.userId)
        return Message.find({to: this.userId})
    else
        this.ready()
})
Meteor.publish('Habit.friend.mine', function() {
    var friends = Relation.find({from: this.userId})
    var userIds = Meteor.users.getUserIds(friends, "to")
    var friendHabit = Habit.find({userId: {$in: userIds}, isPrivate: {$ne: true}})
    if (this.userId)
        return [
            friends,
            Meteor.users.getUserCursor(friends, "to"),
            friendHabit
        ]
    else
        this.ready()

})
//最新添加的用户习惯
Meteor.publish('Habit.recently', function() {
    var habitCursor = Habit.find(
        //非自己，非私有
        {userId: {$ne: this.userId}, isPrivate: {$ne: true}},
        {sort: {"createAt": -1}, limit: 10, fields: {isPrivate: 0}}
    )
    return [
        habitCursor, Meteor.users.getUserCursor(habitCursor, "userId")
    ]
})

