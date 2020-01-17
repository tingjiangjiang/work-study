

/*
    getStyle:获取样式函数
 
    obj:获取样式的元素
    styleName:获取的样式名（string）
*/
function getStyle(obj, styleName) {
    // if(obj.currentStyle){
    //     return obj.currentStyle[styleName];
    // }else{
    //     return getComputedStyle(obj)[styleName];
    // }
    return obj.currentStyle ? obj.currentStyle[styleName] : getComputedStyle(obj)[styleName];
}


/*
           返回一个带文本的标签
           elType：标签名称
           text:文本
       */
function createEle(elType, text) {
    var el = document.createElement(elType);
    el.innerHTML = text;
    return el;
}




// el:运动元素
// styleName:样式名称
// speed:速度(每一次递增的值)
// target：目标值
function move(el, styleName, speed, target) {
    // 清除上一次未停止的定时器
    clearInterval(el.timer);
    // 没有运动的初始位置
    var origin = parseInt(getStyle(el, styleName));
    // 判断速度的正负(只需要判断一次)
    speed = origin < target ? speed : -speed;

    // 将定时器作为元素的自定义属性，方便下一次清除
    el.timer = setInterval(function () {
        // 获取当前left,字符串转化为数值计算
        var cur = parseInt(getStyle(el, styleName));
        // 新位置 = 当前位置+速度
        var newPos = cur + speed;
        // 到达目标位置停止定时器
        if ((speed > 0 && newPos > target) || (speed < 0 && newPos < target)) {
            newPos = target;
            clearInterval(el.timer);
        }
        // 更改位置
        el.style[styleName] = newPos + "px";
    }, 20);
}
/* 
    实现缓速运动的函数
    el:运动元素
    obj:改变的样式和值，以对象形式传入
    callback:运动结束执行的回调函数（可以省略）
*/
function hs(el, obj, callback) {
    clearInterval(el.timer);
    for (var styleName in obj) {
        if (styleName == "opacity") {
            obj[styleName] = obj[styleName] * 100;
        }
    }
    el.timer = setInterval(function () {
        // 假设所有属性都到达终点
        var flag = true;
        for (var styleName in obj) {
            var now = 0;

            if (styleName == "opacity") {
                now = getStyle(el, styleName) * 100;
            } else {
                now = parseInt(getStyle(el, styleName));
            }
            var speed = (obj[styleName] - now) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            var newPos = now + speed;
            // 当前属性没有到达对应的目标值
            if (newPos != obj[styleName]) {
                // 假设不成立
                flag = false;
            }
            if (styleName == "opacity") {
                el.style[styleName] = newPos / 100;
            } else {
                el.style[styleName] = newPos + "px";
            }
        }
        if (flag) {
            clearInterval(el.timer);
            // callback&&callback();
            if (callback) {
                callback();
            }
        }
    }, 30);
}
/*
    做ajax 的函数
    method：请求方式
    url:地址
    data:参数
    success:成功回调函数
*/
function ajax(method, url, data, success) {
    // 1.创建异步请求对象
    var xhr = new XMLHttpRequest();
    // 2.建立连接
    if (method.toUpperCase() == "GET") {
        if (data) {
            // 键值对形式接在 url的后面
            xhr.open(method, url + "?" + data);
        } else {
            xhr.open(method, url);
        }
        xhr.send();
    } else if (method.toUpperCase() == "POST") {
        xhr.open(method, url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }

    // 4.监听请求结果
    xhr.onreadystatechange = function () {
        // 
        if (xhr.readyState == 4 && xhr.status == 200) {
            //5.根据返回的数据渲染页面 
            success(xhr.responseText);
        }
    }
}


/* 

    验证码生成
    el：需要生成验证码的容器

*/
function code(el) {
    var str = "qwertyuiopasdfghjklzxcvbnm1234567890";

    var arr = str.split("");

    arr.sort(function (a, b) {
        return Math.random() - 0.5;
    });

    var str = arr.join("");
    el.innerHTML = str.slice(0, 4);
}




/* 
    渲染电视剧电影页面
    el：需要渲染到的大容器 id
    url：渲染的文件路径

*/

function morePic(el, url) {
    var oList = document.getElementById(el);
    ajax("GET", url, "", function (data) {
        var data = JSON.parse(data);
        console.log(data);
        var films = data.films;

        var str = "";
        for (var i = 0; i < films.length; i++) {
            str += '<li><a href="' + films[i].http + '"><div><img src="' + films[i].url + '" alt=""><span class="type"></span><span class="hd">' + films[i].txt + '</span></div></a><div><p class="tit">' + films[i].title + '</p><p class="txt">' + films[i].message + '</p><span class="fen">' + films[i].grade + '</span></div></li>';
        }
        oList.innerHTML = str;

        var oTypes = oList.getElementsByClassName("type");
        for (var j = 0; j < oTypes.length; j++) {
            var t = films[j].type;
            switch (t) {
                case 1:
                    oTypes[j].innerHTML = "vip专享";
                    oTypes[j].className = "type type1";
                    break;
                case 2:
                    oTypes[j].innerHTML = "<span class='linet'>5元</span>vip免费";
                    oTypes[j].className = "type type2";
                    break;
                case 3:
                    oTypes[j].innerHTML = "<span class='linet'>5元</span>vip限时";;
                    oTypes[j].className = "type type3";
                    break;
            }
        }
    })

}

/* 
    onlyPic:只有电影图片和文字评分
    el：需要渲染到的大容器 id
    url：渲染的文件路径

*/


function onlyPic(el, url) {
    var oList = document.getElementById(el);
    ajax("GET", url, "", function (data) {
        var data = JSON.parse(data);
        console.log(data);
        var films = data.films;

        var str = "";
        for (var i = 0; i < films.length; i++) {
            str += '<li><a href="' + films[i].http + '"><div><img src="' + films[i].url + '" alt=""></div></a><div><p class="tit">' + films[i].title + '</p><p class="txt">' + films[i].message + '</p><span class="fen">' + films[i].grade + '</span></div></li>';
        }
        oList.innerHTML = str;


    })

}

/* 
    elChange：元素点击切换样式
    elParent：父元素，id
    elSelf：切换的元素，TagName
    elClassName：切换的样式类名
*/

function elChange(elParent, elSelf, elClassName) {
    var nav_Ul = document.getElementById(elParent);
    var nav_Lis = nav_Ul.getElementsByTagName(elSelf);

    for (var i = 0; i < nav_Lis.length; i++) {
        (function (i) {
            nav_Lis[i].onclick = function () {
                for (var j = 0; j < nav_Lis.length; j++) {
                    nav_Lis[j].className = "";
                }
                nav_Lis[i].className = elClassName;

            }
        })(i);
    }
}







