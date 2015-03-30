/**
 * @param name
 * @param opts
 *          {
 *              default: {*=}
 *              equalsFunc: {Function=}
 *              reset: {Boolean=}  是否每次模板重新创建时候都重置
 *          }
 * @returns {*}
 */
Blaze.Template.prototype.createVar = function(name, opts) {
    if (this[name]) throw new Error('`'+name+'` is created before.')
    opts = opts || {}
    var rea = this[name] = new ReactiveVar(opts.default, opts.equalsFunc)
    if (opts.reset) {
        this.onCreated(function() {
            rea.set(opts.default)
        })
    }
    return rea
}

/**
 *  actions只是对Tempalte.events替代，但更直观, 以此告别大量的id和class带来的维护负担
 *
 *  @template
 *      <template name="demo">
 *          <a action="add">添加</a>
 *          <input type="text" action="focus, leaveInput">
 *          <button  action="justName">
 *      </template>
 *  @example:
 *      Tempalte.demo.actions({
 *          "add [click, focus]": function(e) {
 *          },
 *          "justName": function() {
 *              //这里不加事件默认是click事件
 *          },
 *          "[keypress]"
 *      })
 *  @param {Object} map
 *
 */
Blaze.Template.prototype.actions = function(map) {
    var eventsMap = {}
    if (!map) return
    _.each(map, function(actionFn, originKey) {
        var keys = originKey.split(/\s+/)
        var actionName, eventNames, arr = []
        if (originKey[0] !== "[") {
            actionName = keys[0]
            keys.shift()
        }
        eventNames = keys.join(" ") || '[click]'
        eventNames = eventNames.substr(1,eventNames.length-2).split(/\s*,\s*/)
        checkEventNames(eventNames, originKey)
        eventNames.forEach(function(eventName) {
            if (actionName)
                arr.push(eventName + " " + '[action*="'+actionName+'"]')
            else
                arr.push(eventName)
        })
        eventsMap[arr.join(", ")] = actionFn
    })

    this.events(eventsMap)

    function checkEventNames(eventArr, originKey) {
        var keys = ["blur", "change", "click", "focus", "focusin", "focusout", "reset", "submit", "keypress"]
        eventArr.forEach(function(item) {
            if (-1 === keys.indexOf(item))
                throw new Error("`" + originKey + "` error: unknow event key `"+item+"`!!")
        })
    }
}

/**
 * @param e
 * @returns {*}
 */
Blaze.TemplateInstance.prototype.t = function(e) {
    var $target = this.$(e.currentTarget)
    var name = $target.attr('t')
    var res
    if (!name) throw new Error("can not find 'name' !!")
    while (true) {
        if (e.delegateTarget === $target[0] || document.body === $target[0]) return []
        res = $target.parent().children('[n="' + name + '"]')
        if (res.length !== 0) return res
        $target = $target.parent()
    }

}

