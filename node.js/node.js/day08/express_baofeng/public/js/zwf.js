(function () {
    var zwf = tools.getById('zwf');
    var span = tools.getByTag(zwf, 'span');
    var input = tools.getByTag(zwf, 'input');
    var count = tools.getByClass(document, 'count')[0];
    var save = tools.getByClass(count, 'part-left')[0];
    var saveBox = tools.getByTag(save, 'i')[0];
    var loginBtn = tools.getByClass(document, 'login-btn')[0];
    var json = {
        username: "1127636967@qq.com",
        password: "Username1127",
    }
    var flag = 1;






    for (var i = 0; i < span.length; i++) {
        span[i].onclick = function () {
            tools.prev(this).focus();
        }
        input[i].onfocus = function () {
            tools.next(this).style.display = 'none';
        }
        input[i].onblur = function () {
            if (!this.value) {
                tools.next(this).style.display = 'block';
            } else {
                blurFn();
            }
        }
    }


    /* 通过flag标记当前标签的状态，当flag为1的时候切换图saveBox的背景位置;当flag为0的时候切换回原来的背景位置 */

    save.onclick = function () {
        if (flag == 1) {
            saveBox.style.background = 'url(images/logoicon.png) -20px -66px no-repeat';
            flag = 0;

        } else {
            saveBox.style.background = 'url(images/logoicon.png) 0 -66px no-repeat';
            flag = 1;
        }
    }

      /* 输入框获取cookie中存储的用户名和密码 */
      var u = getCookie('username');
      input[0].value = u ? u : '';
      var p = getCookie('password');
      input[1].value = p ? p : '';
      for(var i = 0; i < span.length;i++){
          if(input[i].value){
              span[i].style.display = 'none';
          }else{
              span[i].style.display = 'block';
          }
      }

    /* 登录按钮的点击事件 */
    function fun1() {
        var value1 = input[0].value;
        var value2 = input[1].value;
        if ((value1 && value1 == json.username) && (value2 && value2 == json.password)) {
            tools.prev(this.parentNode.parentNode).innerHTML = '';
        } else {
            tools.prev(this.parentNode.parentNode).innerHTML = '账号或密码错误！';
        }
    }
    function fun2() {
        if (flag == 0) {
            var userValue = input[0].value;
            // console.log(input[0].value);
            var passValue = input[1].value;
            // console.log(input[1].value);
            setCookie('username', userValue, 20);
            setCookie('password', passValue, 20);
        }
    }
  

    /* 事件绑定的兼容写法 */
    function bindEvent(ele, eventType, fn) {
        if (ele.addEventListener) {
            ele.addEventListener(eventType, fn);
        } else {
            ele.attachEvent('on' + eventType, function () {
                fn.call(ele); //处理ie中attachEvent事件处理函数this默认指向window问题
            });
        }
    }
    bindEvent(loginBtn, 'click', fun1);
    bindEvent(loginBtn, 'click', fun2);






    function blurFn() {
        var val = this.value;
        var reg = null;
        switch (this.name) {
            case 'username': reg = /^[a-z0-9_-]{4,16}$/; break;
            case 'password': reg = /^\w{6,18}$/; break;
        }
    }
    /* 设置cookie */
    function setCookie(cName, cValue, sec) {
        var date = new Date();
        date.setSeconds(date.getSeconds() + sec);
        document.cookie = cName + '=' + cValue + ';expires' + date;
    }

    /* 获取cookie */
    function getCookie(cName) {
        var cookieObj = {};
        var cstring = document.cookie; //'username=aaa; pass=123; city=bbb'  --> {username:aaa,pass:123}
        var ary = cstring.split('; '); //['username=aaa','pass=123']
        for (var i = 0; i < ary.length; i++) {
            var ary1 = ary[i].split('=');
            cookieObj[ary1[0]] = ary1[1];
        }
        return cookieObj[cName];
    }

})()