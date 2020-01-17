window.onload = function () {

    // 滚动条部分
    // 滚动的内容部分
    var scr_Box = document.getElementById("scr-container");
    // 滚动条部分
    var src_Outer = document.getElementById("src-outer");
    var src_Inner = src_Outer.getElementsByTagName("div")[0];




    // 评论部分开始
    var discuss_box = document.getElementById("discuss-box");

    // 评论输入框
    var inparea = document.getElementById("inparea");
    var remain = document.getElementById("remain");
    // 发表按钮
    var comment = document.getElementById("comment");

    // var numm = 0;
    
    inparea.onkeyup = function () {
        var inner = inparea.value.length;
        remain.innerHTML = 140 - inner;


    }

    // inparea.oninput=function(event){
    //     remain.innerHTML = 140 - event.length;
    // }



    /* 电影排名部分 */

    // 大容器
    var movieBox = document.getElementById("movieBox");
    var movie = movieBox.getElementsByClassName("movieBox");
    var movie_txt = movieBox.getElementsByTagName("p");
    var movie_box = movieBox.getElementsByClassName("row-pic1");




    /* 播放部分滚动条部分结束 */
    src_Inner.style.height = scr_Box.offsetHeight / scr_Box.scrollHeight * src_Outer.clientHeight + "px";


    var rate = (scr_Box.scrollHeight - scr_Box.offsetHeight) / (src_Outer.clientHeight - src_Inner.offsetHeight);
    src_Inner.onmousedown = function () {
        var offsetY = event.clientY - src_Outer.offsetTop - src_Inner.offsetTop;
        document.onmousemove = function () {
            var newY = event.clientY - offsetY - src_Outer.offsetTop;
            var maxY = src_Outer.clientHeight - src_Inner.offsetHeight;
            if (newY > maxY) {
                newY = maxY;
            }
            if (newY < 0) {
                newY = 0;
            }
            src_Inner.style.top = newY + "px";
            scr_Box.scrollTop = newY * rate;


        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
        return false;
    }

    /* 播放部分滚动条部分结束 */

    /* 电影排名部分开始 */

    for (var i = 0; i < movie.length; i++) {
        //  将i  在循环执行时，作为外部自执行函数的参数传入
        (function (i) {
            movie[i].onmouseenter = function () {
                for (var j = 0; j < movie.length; j++) {
                    movie_txt[j].style.display = "block";
                    movie_box[j].style.display = "none";
                }
                movie_txt[i].style.display = "none";
                movie_box[i].style.display = "block";
            }
        })(i);
    }


    /* 电影排名部分结束 */



    /* 猜你喜欢部分开始 */
    onlyPic("list", "./data/films.json");
    /* 猜你喜欢部分结束 */

    /* 强力推荐开始 */

    var more_pic = document.getElementById("more-pic");
    ajax("GET", "./data/hot.json", "", function (data) {
        var data = JSON.parse(data);

        var films = data;

        var str = "";
        for (var i = 0; i < films.length; i++) {
            str += '<a href="' + films[i].http + '" class="pic1"><img src="' + films[i].url + '" alt=""><span>' + films[i].title + '</span></a>'
        }
        more_pic.innerHTML = str;


    })

    /* 强力推荐结束 */


    /* 评论区开始 */
    ajax("get", "./data/discuss.json", "", function (data) {
        var data = JSON.parse(data);
        var films = data;
        var str = "";




        for (var i = 0; i < films.length; i++) {
            var d = new Date(films[i].time);//获取当前系统时间
            var year = d.getFullYear();
            var mon = d.getMonth()+1;
            var day = d.getDate();
            var hour = d.getHours();
            var min = d.getMinutes();

            var time = year + "-" + mon + "-" + day + " " + hour + ":" + min;
            str += '<div class="dis-list"><img src="' + films[i].url + '" alt="" class="portrait"><span class="dis-name">' + films[i].userName + '</span><span class="dis-time">' + time + '</span><p class="dis-txt">' + films[i].message + '</p><div class="icon-dis"></div><span class="dis-num">' + films[i].praise + '</span></div>';
        }
        discuss_box.innerHTML = str;


    })
    /* 评论区结束 */


    /* 
    发表开始
    */
    comment.onclick = function () {
        var d = new Date();
        var year = d.getFullYear();
        var mon = d.getMonth()+1;
        var day = d.getDate();
        var hour = d.getHours();
        var min = d.getMinutes();


        var oInp = inparea.value;
        console.log(oInp);
        // 创建每一条评论的盒子
        var dis_list = document.createElement("div");
        dis_list.className = "dis-list";

        var oImg = document.createElement("img");
        oImg.setAttribute("src", "./images/100_60_60.jpg");
        oImg.className = "portrait";

        var dis_name = createEle("span", "Nancy");
        dis_name.className = "dis-name";

        // 时间
        var dis_time = createEle("span", year + "-" + mon + "-" + day + " " + hour + ":" + min);
        dis_time.className = "dis-time";

        // 发表的信息
        var dis_txt = createEle("p", oInp);
        dis_txt.className = "dis-txt";

        var icon_dis = createEle("div", "");
        icon_dis.className = "icon-dis"

        var dis_num = createEle("span", "15");
        dis_num.className = "dis-num";

        dis_list.appendChild(oImg);
        dis_list.appendChild(dis_name);
        dis_list.appendChild(dis_time);
        dis_list.appendChild(dis_txt);
        dis_list.appendChild(icon_dis);
        dis_list.appendChild(dis_num);
        var discuss_first = discuss_box.getElementsByTagName("div")[0];
        discuss_box.insertBefore(dis_list, discuss_first);
        console.log(discuss_first);



    }

    /* 
    发表结束
    */






}