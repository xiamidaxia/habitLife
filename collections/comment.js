Comment = new Meteor.Collection("Comment")

Comment.type = {
    content: String,
    userId: String,
    createAt: Date
}