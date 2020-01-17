var tools = (function () {
    /**
     * 通过id获取元素的方法
     * @param {string} id 传入元素的id名称
     */
    function getById(id) {
        return document.getElementById(id);
    }
    /**
     * 获取css样式
     * @param {object} ele dom元素
     * @param {string} attr 样式属性名
     */
    function getCss(ele, attr) {
        return !ele.currentStyle ? getComputedStyle(ele)[attr] : ele.currentStyle[attr];
    }
    /**
     * 通过标签名获取元素
     * @param {object} ele 获取上下文 如果不传(默认doucument获取)
     * @param {string} tagName  标签名
     */
    function getByTag(ele, tagName) {
        if (arguments.length == 1) {
            return document.getElementsByTagName(arguments[0]);
        }
        return ele.getElementsByTagName(tagName);
    }
    /**
     * 匀速运动函数
     * @param {object} obj 要运动的元素
     * @param {string} attr 运动的样式属性名
     * @param {number} step 步长
     * @param {number} target 目标值
     * @param {function} callback 动画结束之后的回调函数,可选
     */
    function move(obj, attr, step, target, callback) {
        clearInterval(obj.timer);
        var current = parseInt(getCss(obj, attr));//获取当前值
        //根据目标值判断方向
        step = target >= current ? step : -step;
        //把定时器通过自定义属性存在每个运动的元素身上
        obj.timer = setInterval(function () {
            current += step;
            /* 合并判断条件 */
            if (step > 0 && current >= target || step < 0 && current <= target) {
                clearInterval(obj.timer);
                current = target;
                //如果callback存在,就运行,不存在不运行
                callback && callback();
            }
            obj.style[attr] = current + 'px';
        }, 20);
    }
    /**
     * 类数组转数组方法
     * @param {object} likeAry  类数组
     */
    function toArray(likeAry) {
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary.push(likeAry[i]);
        }
        return ary;
    }
    /**
     * 获取n-m之间的随机整数
     * @param {number} n 
     * @param {number} m 
     */
    function getRandom(n, m) {
        return parseInt(Math.random() * (m - n + 1) + n);
    }

    /**
     * 获取所有元素子节点
     * @param {object} parent 父元素
     */
    function children(parent) {
        var ary = [];
        var childs = parent.childNodes;
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                ary.push(childs[i]);
            }
        }
        return ary;
    }
    /**
     * 获取上一个元素兄弟节点
     * @param {object} ele 指定元素
     */
    function prev(ele) {
        var prev = ele.previousSibling;
        // 如果上一个兄弟节点存在,并且nodeType不等予1,继续循环向上找
        while (prev && prev.nodeType != 1) {
            prev = prev.previousSibling;
        }
        return prev;
    }
    /**
     * 获取下一个元素兄弟节点
     * @param {object} ele 指定元素
     */
    function next(ele) {
        var next = ele.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    }

    /**
     * 获取第一个元素子节点
     * @param {object} parent  父元素
     */
    function firstElechild(parent) {
        var childs = parent.childNodes;
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                return childs[i];
            }
        }
    }
    /**
     * 通过class获取元素
     * @param {object} ele 元素 
     * @param {string} cls 类名
     */
    function getByClass(ele, cls) {
        //先获取ele中所有标签(不区分标签名)
        var elements = ele.getElementsByTagName('*');
        var ary = [];
        //遍历elements
        for (var i = 0; i < elements.length; i++) {
            //  eles[i].className   'red aa ccc'
            //先把类名词列表分割成数组 
            var clsAry = elements[i].className.split(' ');  //['red','aa','ccc'] 
            //遍历类名数组,如果存在cls相同的类名,就把这个元素放进ary
            for (var j = 0; j < clsAry.length; j++) {
                if (cls == clsAry[j]) {
                    ary.push(elements[i]);
                    break;
                }
            }
        }
        return ary;
    }
    /**
     * 事件监听的兼容方法
     * @param {object} ele 绑定事件的元素
     * @param {string} eventType 事件类型
     * @param {function} fn  事件处理函数
     */
    function addEvent(ele, eventType, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(eventType, fn);
        } else {
            ele.attachEvent('on' + eventType, function () {
                fn.call(ele); //处理ie中attachEvent事件处理函数this默认指向window问题
            });
        }
    }
    /**
     * 移除事件的兼容方法
     * @param {object} ele 移除事件的元素
     * @param {string} eventType 事件类型
     * @param {function} fn 事件处理函数
     */
    function removeEvent(ele, eventType, fn) {
        if (ele.removeEventListener) {
            ele.removeEventListener(eventType, fn);
        } else {
            ele.detachEvent('on' + eventType, fn);
        }
    }
    /**
     * 绑定鼠标滚轮事件
     * @param {object} ele 元素
     * @param {function} fn 事件处理函数
     */
    function mouseWeelEvent(ele, fn) {
        ele.onmousewheel = fn;
        if (ele.addEventListener) {
            ele.addEventListener('DOMMouseScroll', fn)
        }
    }

    /**
     * 缓冲运动函数
     * @param {object} obj 要运动的元素
     * @param {object} attrObj 多个属性的集合 { left: 500, opacity: 50 }
     * @param {function}} callback 回调函数
     */
    function bufferMove(obj, attrObj, callback) {  //attrObj { left: 500, opacity: 50 }
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var flag = true;  //flag为true表示都到达目标值
            for (var attr in attrObj) {
                var target = attrObj[attr];
                /* 判断透明度属性的处理 */
                if (attr == 'opacity') {
                    var current = getCss(obj, attr) * 100;
                    if (isNaN(current)) {
                        current = 100;
                    }
                } else {
                    var current = parseInt(getCss(obj, attr));
                }
                var speed = (target - current) / 10; //目标值减去当前值除以缓冲系数
                current += speed;  //-0.999  0.999
                if (Math.abs(speed) < 1) {
                    //clearInterval(obj.timer);
                    current = target;
                }
                /* 判断透明度属性的设置 */
                if (attr == 'opacity') {
                    obj.style[attr] = current / 100;
                    obj.style.filter = 'alpha(opacity=' + current + ')';
                } else {
                    obj.style[attr] = current + 'px';
                }
                if (current != target) {// 当有属性的当前值不等于目标值 ，flag 设置false
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 20);
    }
    /**
 * ajax
 * @param {object} obj {method:请求方式,url:请求地址,data：数据}
 * @param {function} successFn  成功返回数据执行的函数
 * @param {funciton} errFn 失败执行的函数
 */
    function ajax(obj, successFn, errFn) {
        //obj { method:  , url:  ,data:  }
        var ajax = new XMLHttpRequest();
        // ajax.open(method, url);
        if (obj.method == "get") {
            if (obj.data) {
                ajax.open(obj.method, obj.url + '?' + obj.data);
            } else {
                ajax.open(obj.method, obj.url);
            }
            ajax.send();

        } else {
            ajax.open(obj.method, obj.url);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            if (obj.data) {
                ajax.send(obj.data);
            } else {
                ajax.send();
            }
        }


        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                //成功执行成功的函数，把响应的数据传过去
                successFn(ajax.responseText);
            } else {
                errFn && errFn('404');
            }
        }
    }




    return {
        getById: getById,
        getByTag: getByTag,
        getByClass: getByClass,
        getCss: getCss,
        prev: prev,
        next: next,
        move: move,
        bufferMove: bufferMove,
        ajax: ajax
    };
})();

