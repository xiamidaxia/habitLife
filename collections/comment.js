Comment = new Meteor.Collection("comment")

Comment.type = {
    content: String,
    userId: String,
    createAt: Date
}