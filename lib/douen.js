/**
 * 作者：timi.yang
 * 开发日期：2017/3/3
 * 版权所有 违者必究
 */
//定义一个对象 - 名字是$
var $$ = function() {};
//第二种写法
$$.prototype = {
    // 获取id
    $id:function(id){
        return document.getElementById(id)
    },
    //获取tag类名
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },
    //去除左边空格
    ltrim:function(str){
        return str.replace(/(^\s*)/g,'');
    },
    //去除右边空格
    rtrim:function(str){
        return str.replace(/(\s*$)/g,'');
    },
    //去除空格
    trim:function(str){
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //arttemplate语法
    bindTemplate:function (tempalteId,data){
        var html = template(tempalteId, data);
        return html;
    },
    artTemplate:function (str,data){
        var render = template.compile(str);
        return render(data)
    },
    //简单的数据绑定formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
    },
    //给一个对象扩充功能
    extend:function (target,source) {
        //遍历对象
        for(var i in source){
            target[i] = source[i];
        }
        return target;
    },
    extendMany:function () {
        var key,i = 0,len = arguments.length,target = null,copy;
        if(len === 0){
            return;
        }else if(len === 1){
            target = this;
        }else{
            i++;
            target = arguments[0];
        }
        for(; i < len; i++){
            for(key in arguments[i]){
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    //随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    /*获取页面传递过来的参数*/
    simpleQuery:function (){
        var params= window.location.search;//params:?id,date
        var arr = params.substring(1).split(",");
        return arr;
    },
    // 把window.location.search传过来的数据转化为字符串
    querystring: function(){//获取URL查询字符串参数值的通用函数
        var str = window.location.search.substring(1);//获取查询字符串，即"id=1&name=location"的部分
        var arr = str.split("&");//以&符号为界把查询字符串分割成数组
        var json = {};//定义一个临时对象
        for(var i=0;i<arr.length;i++)//遍历数组
        {
            var c = arr[i].indexOf("=");//获取每个参数中的等号小标的位置
            if(c==-1) continue;//如果没有发现测跳到下一次循环继续操作
            var d = arr[i].substring(0,c);//截取等号前的参数名称，这里分别是id和name
            var e = arr[i].substring(c+1);//截取等号后的参数值
            json[d] = e;//以名/值对的形式存储在对象中
        }
        return json;//返回对象
    },
    //将一个对象拷贝给另一个对象
    extend:function(end,source){
        for(var end in source){
            end[i] = source[i];
        }
        return end;
    },
    //清除浮动
    clear:function () {
        if(event && event.stopPropagation) {
          event.stopPropagation();  //  w3c 标准
        }else{
          event.cancelBubble = true;  // ie 678  ie浏览器
        }
    },
    // 防止短时间内重复执行(函数节流)
    jieliu:function (day,fun) { // 第一个参数是延迟多长时间后执行，第二个参数是延迟后执行的语句
        var timer = null ;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fun;// 传进来一个回调函数
                fun(); // 调用传进来的函数
            },day)
        }
    }
}
//在框架中实例化，这样外面使用的就不用实例化了
$$ = new $$();

