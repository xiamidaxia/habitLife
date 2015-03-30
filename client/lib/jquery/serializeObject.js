/**
 * @returns {{}}
 */
$.fn.serializeObject = function () {
    var _object = {}
    var arr = this.serializeArray()
    var _checkboxItems = {}
    arr.forEach(function(item){
        item.value = item.value.trim()
        if (item.value.trim() !== "") {
            //加入类型
            if ($.isNumeric(item.value)) {
                item.value = Number(item.value)
            }
            if (item.value === "false") {
                item.value = false
            }
            if (item.value === "true") {
                item.value = true
            }
            //为checkbox
            if (_checkboxItems[item.name]) {
                _object[item.name].push(item.value)
                return
            }

            //把checkbox选项缓存
            if (_object[item.name]) {
                _checkboxItems[item.name] = true
                _object[item.name] = [_object[item.name], item.value]
                return
            }

            _object[item.name] = item.value
        }
    })
    return _object
}