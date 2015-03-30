Template.registerHelper("fromNow", function(val){
    return moment(val).fromNow()
})

Template.registerHelper("moment", function(val, formatStr) {
    if (arguments.length === 2) {
        formatStr = "YYYY-MM-DD HH:MM:SS"
    }
    return moment(val).format(formatStr)

})
