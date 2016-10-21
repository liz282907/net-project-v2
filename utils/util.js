function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

function isObjectValueEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}
function format(time,fmt){
  let dateObj = new Date(parseInt(time));
  var o = {
        "M+": dateObj.getMonth() + 1, //月份
        "d+": dateObj.getDate(), //日
        "h+": dateObj.getHours(), //小时
        "m+": dateObj.getMinutes(), //分
        "s+": dateObj.getSeconds(), //秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function replaceHash(destHash){
    // let prevHash = location.hash;

    // const curHash = prevHash.match(/(\w+)/)[1];
    // const newHash = prevHash.replace(curHash,destHash);
    // window.location.hash = newHash ;

    const prevHref = location.href;
      const curHash = location.hash.match(/(\w+)/)[1];
      let curHref = prevHref.replace(curHash,destHash);
      // window.location.href.replace(curHref);
      window.location.href = curHref ;



}

export {removeByValue, isObjectValueEqual,format,replaceHash};
