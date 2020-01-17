window.onload = function () {

    //1.获取元素
    // 轮播1
    var bannerCenter = document.getElementsByClassName("banner_center")[0]; //banner背景
    // 获取左右按钮
    var btns = bannerCenter.getElementsByTagName("div");

    var bannerUl = document.getElementsByClassName("banner_list")[0]; //banner图片
    var bannerP = document.getElementsByClassName("banner_but")[0]; //banner按钮
    var bannerLi = bannerUl.getElementsByTagName("li");
    var bannerSpan = bannerP.getElementsByTagName("span");

    // 索引
    var index = 0;
    // 定时器
    var timer;

    /*
        轮播2
     */
    var auto2Box = document.getElementById("auto2");
    var auto2_left = auto2Box.getElementsByTagName("div")[0];
    var auto2_right = auto2Box.getElementsByTagName("div")[1];
    var auto2_view = document.getElementById("auto2_view");
    var auto2Ul = auto2_view.getElementsByTagName("div")[0];

    //2.从后台获取数据，js动态设置标签
    var arr2 = new Array();

    ajax("get", "banner.txt", "", function (res) {
        // 获取到返回的ajax值，把字符串变成js代码

        arr2 = eval(res);

        var strLi = "";
        var strSpan = "";

        for (var i = 0; i < arr2.length; i++) {
            strLi += "<li><img src='" + arr2[i].src + "'></li>";
            strSpan += "<span></span>";

        }

        bannerUl.innerHTML = strLi;
        bannerP.innerHTML = strSpan;
        for (var i = 0; i < arr2.length; i++) {
            bannerSpan[i].style.backgroundImage = "url(" + arr2[i].s + ")";
        }
        // 默认样式
        bannerSpan[0].className = "active";
        console.log(arr2[0].s);


        bannerLi[0].style.opacity = 1;

        // 开启定时器
        timer = setInterval(autoPlay, 2000);
        /* if(){

        } */

        // 给span添加事件     小圆圈和左右下标保持同步
        for (var i = 0; i < bannerSpan.length; i++) {

            (function (i) {
                bannerSpan[i].onclick = function () {
                    // 把index赋值给i,让左右箭头和小圆圈一致
                    index = i;
                    auto(i);
                }
            })(i);
        }


    })


    // 切换样式函数
    function auto(ind) {

        for (var j = 0; j < bannerLi.length; j++) {
            // 先失去样式
            hs(bannerLi[j], { opacity: 0 });
            bannerSpan[j].className = "";
        }
        // 获取样式
        bannerSpan[ind].className = "active";
        bannerSpan[ind].style.backgroundImage = "url(" + arr2[ind].s + ")";
        hs(bannerLi[ind], { opacity: 1 });



    }
    // 自动切换样式函数
    function autoPlay() {
        index++;
        if (index == bannerLi.length) {
            index = 0;
        }

        auto(index);
    }


    // 点击上一张
    btns[1].onclick = function () {
        index--;
        if (index == -1) {
            index = bannerLi.length - 1;
        }
        auto(index);

    }
    // 点击下一张
    btns[2].onclick = function () {

        autoPlay();
    }


    // 移入鼠标，自动播放结束
    bannerCenter.onmouseenter = function () {
        console.log("移出鼠标");
        clearInterval(timer);
    }



    //移出鼠标，自动播放开始
    bannerCenter.onmouseleave = function () {
        timer = setInterval(autoPlay, 2000);

    }



    /* 
        轮播2开始    
    */
    var index1 = 0;
    var imgWidth = parseInt(getComputedStyle(auto2_view).width);
    //      点击上一页
    auto2_left.onclick = function () {
        //    获取img的宽度 就是要移动的距离
        index1--;
        if (index1 < 0) {
            index1 = 0;
        }
        console.log(index);
        move(auto2Ul, "left", 30, imgWidth * -index1);
       
    }
    //      点击下一页
    auto2_right.onclick = function () {
        //    获取img的宽度 就是要移动的距离
        index1++;
        if (index1 > 2) {
            index1 = 2;
        }
        console.log("22"+index1);
        move(auto2Ul, "left", 30, imgWidth * -index1);
    }


    /* 
        轮播2结束   
    */


    /* 商品展示部分 */
        // 强力推荐
        morePic("list","./data/films.json");
        // 热映大片
        morePic("list2","./data/hotpic.json");


        elChange("nav-lists", "li", "nav-fist");






}