/**
 * 注：通过add添加的方法, 会在方法调用的作用域里添加`this.name`, 即为MethodRoute创建的名字，
 *  且必须和集合名字一致，否则容易出问题
 * @param name
 * @constructor
 */
MethodRoute = function(name) {
    this._name = name
    this._hooks = []
    this._methods = null
}

MethodRoute.addGlobalHooks = function(hooks) {
    this._hooks = hooks
}

MethodRoute.prototype = {
    add: function(methods) {
        this._methods =  methods
    },
    /**
     * @param {Function | Ignore}
     * @param {Object=}
     * @example
     *      m.hook("isLogin", {except: ["name1"]})
     *      //or
     *      m.hook(function(userId){
     *          if (!this.userId) {
     *              throw new Meteor.Error("unlogin")
     *          }
     *      }, {only: ["name1"]})
     */
    hook: function(fn, opts) {
        this._hooks.push([fn, opts])
    },
    _getHook: function(name) {
        var newHooks = []
        this._hooks.forEach(function(hook) {
            var fn = hook[0]
            var opts = hook[1] || {}
            if (typeof fn === "string") {
                //这里获取全局定义的钩子
                if (!MethodRoute._hooks[fn])
                    throw new Error('can not find hook: ' + fn)
                fn = MethodRoute._hooks[fn]
            }
            if (Object.keys(opts).length === 0) {
                return newHooks.push(fn)
            }
            _.each(opts, function(arr, key) {
                switch(key) {
                    case "only":
                        if (-1 !== arr.indexOf(name)) {
                            newHooks.push(fn)
                        }
                        break
                    case "except":
                        if (-1 === arr.indexOf(name)) {
                            newHooks.push(fn)
                        }
                        break
                    default:
                        throw new Error("unknow key: " + key)
                }
            })
        })
        return newHooks
    },
    create: function() {
        var newMethods = {}
        var self = this
        _.each(this._methods, function(fn, key) {
            var newHooks = self._getHook(key)
            var keyname = self._name + "." + key
            newMethods[keyname] = function() {
                var ret
                //添加name
                this.name = self._name
                if (Meteor.isDebug) {
                    console.log(keyname + ": " + EJSON.stringify(arguments))
                }
                try {
                    if(newHooks.length !== 0) {
                        for (var i = 0, len = newHooks.length; i < len; i++) {
                            ret = newHooks[i].apply(this, arguments)
                            if(ret) return ret
                        }
                    }
                    return fn.apply(this, arguments)
                } catch(e) {
                    e.error = keyname + '.' + e.error
                    throw e
                }
            }
        })
        return newMethods
    }
}
