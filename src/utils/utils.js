export default {
    
    // 递归判断两个对象相等，接收两个对象为参数
     deepEqual: function(x, y) {
        if (x === y) {
            // 指向同一内存时，为true
            return true;
            // 判断两个对象都是引用数据类型时并且不为空
        } else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
            // 满足以上条件继续判断对象的属性名长度是否相等
            if (Object.keys(x).length != Object.keys(y).length)
                return false;
            // 属性长度相等就遍历第一个对象， 
            for (var prop in x) {
                // 判断第二个对象中是否有第一个对象的属性
                if (y.hasOwnProperty(prop)) {
                    // 如果有就将属性值作为参数给当前递归函数，重新判断
                    if (!this.deepEqual(x[prop], y[prop])) return false;
                } else
                    return false;
            }
            return true;
        } else
            return false;
    },

    /** 时间戳转时间 */
    getData: function(n){
        n=new Date(n);
        return n.toLocaleDateString().replace(/\//g, "/") + " " + n.toTimeString().substr(0, 8);
      }  

}