window.onload = function () {
    // 导航部分点击切换样式
    elChange("nav-list", "li", "nav-fist");

    /* 商品展示导航部分 */
    elChange("pro-adv", "li", "pro-nav-fist");

    /* 商品受欢迎导航部分 */
    elChange("most-lists", "li", "list-first");

    /* 商品展示部分 */
    morePic("list", "./data/more.json");

}