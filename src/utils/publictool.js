//原生js注册
export function addEvent(obj, sType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sType, fn, false);
    } else {
        obj.attachEvent('on' + sType, fn);
    }
};
export function removeEvent(obj, sType, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(sType, fn, false);
    } else {
        obj.detachEvent('on' + sType, fn);
    }
};
export function prEvent(ev) {
    var oEvent = ev || window.event;
    if (oEvent.preventDefault) {
        oEvent.preventDefault();
    }
    return oEvent;
}
//获取盒子相对于浏览器的高度
export function getOffset(o) {
    var left = 0,
        top = 0;
    while (o != null && o != document.body) {
        top += o.offsetTop;
        left += o.offsetLeft;
        o = o.offsetParent;
    }
    return {
        left: left,
        top: top
    };
}
//将数组深度转字符串或转回数组
export function getObjStr(obj) {
    if (typeof obj == 'string') {
        // console.log('字符串')
        return JSON.parse(JSON.parse(new String(JSON.stringify(obj)).toString()))
    } else {
        //    console.log('不是字符串')
        return new String(JSON.stringify(obj)).toString()
    }
}
// 事件戳格式化
// export function getTime(time) {
//     let str = ''
//     let date = new Date(time)
//     let year = date.getFullYear()
//     let month = date.getMonth() + 1
//     let day = date.getDate()
//     str = `${year}-${month}-${day}`
//     return str
// }
export function getTime(time) {
    if (time && time != 'null') {
        var strDate = ''
        var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

        strDate = Y + M + D + h + m + s;
        return strDate;
    } else {
        return
    }

}
// 检验某个字符串是否包含某个字段
export function inDexOfStr(str, s) {
    if (str.indexOf(s) != -1) {
        // return true
        console.log(1111)
    } else {
        // return false
        console.log(2222)
        
    }
}