/*
　┏┓　　　┏┓
┏┛┻━━━┛┻┓
┃　　　　　　　┃
┃　　　━　　　┃
┃　┳┛　┗┳　┃
┃　　　　　　　┃
┃　　　┻　　　┃
┃　　　　　　　┃
┗━┓　　　┏━┛
　　┃　　　┃										神兽看守，BUG没有
　　┃　　　┃
　　┃　　　┗━━━┓
　　┃　　　　　　　┣┓
　　┃　　　　　　　┏┛
　　┗┓┓┏━┳┓┏┛
　　　┃┫┫　┃┫┫
　　　┗┻┛　┗┻┛

 */
$(function(){
		// 点我展开的
        /*
            避免多次点击
        var jieliu = true;
        $(".onclick-me").click(function(){
            num++;
            if (jieliu === true) {
                updown();
                jieliu = false ;
            };
        });
        function updown() {
            $(".xinxi").slideToggle(1000,function(){
                jieliu = true ;
            })
        }*/
         var clicknum = 0;
        $(".xinxi").css("display","none")
        $(".onclick-me").click(function(){
            clicknum++;
            $(".xinxi").stop().slideToggle(1000,function(){
                if(clicknum%2 != 0){
                    $(".onclick-me").text("个人简介");
                }else{
                    $(".onclick-me").text("点我展开");
                }
            });
        })
})



$(function () {
    //主页导航滚动
    (function () {
        var navLi = $(".top-bar ul li");                // 数值  相当于轮播图的小点点
        var indexs = $("#content > div");               // 轮播的项目   相当于轮播的图片
        var index_ctrl = $('#index_ctrl').find("a");    // 在index_ctrl查找子元素中所有的span
        var oNow = 0;   
        var oFlag = true;                               // 用于储存
        navLi.click(function(){
            if(oFlag){      // 如果oFlag为真
                console.log (oFlag)
                indexs.hide();  // 所有的轮播图片隐藏
                indexs.eq( navLi.index(this)).show(1000); // indexs中 第（点击的小点点的索引值）个显示
                oNow = navLi.index(this);                 // oNow = 点击的小点点的索引值
                $(".title_en").animate({width:"0px"},200,function(){    // 小红线的盒子  先不展示出来
                    $(".down").slideUp(200);                            // 轮播的项目 拉上去
                });
                oFlag=false;        // oFlag = 假 （全局）
                console.log (oFlag)

                $(".title_en").animate({width:"420px"},2000,function(){ // 小红线的盒子 缓慢展开
                    $(".down").slideDown(600);                          // 轮播的项目 拉下来
                    oFlag=true;                                         // oFlag = 真 （全局）
                    console.log (oFlag)

                });
            }
        })
        index_ctrl.eq(1).click(function () {                // 右边的按钮
            if(oFlag){                                      // 如果oFlag为真
                indexs.hide();                              // 所有的轮播项目隐藏
                ++oNow > indexs.length - 1 ? oNow = 0 : oNow;   // oNow加1后 大于
                indexs.eq(oNow).show(1000);                     // 点击后 当前轮播项目的下一项出现
                $(".title_en").animate({width:"0px"},200,function(){
                    $(".down").slideUp(200);
                });
                oFlag=false;
                $(".title_en").animate({width:"420px"},1500,function(){
                    $(".down").slideDown(600);
                    oFlag=true;
                });
            }
        })
        index_ctrl.eq(0).click(function () {        //  左边的大按钮，跟右边的相反
            if(oFlag){
                indexs.hide();
                --oNow < 0 ? oNow = indexs.length - 1 : oNow;
                indexs.eq(oNow).show(1000);
                $(".title_en").animate({width:"0px"},200,function(){
                    $(".down").slideUp(200);
                });
                oFlag=false;
                $(".title_en").animate({width:"420px"},1500,function(){
                    $(".down").slideDown(600);
                    oFlag=true;
                });
            }
        })
    })();


 //轮播图


    (function () {
        function scroll(boxid,ctrlId,id){       // 第一个参数是图片的父亲，第二个是左右按钮的父亲，第三个是整个轮播图的id
            var sliders=document.getElementById(boxid).children;    // 获取图片的父亲
            var scroll_ctrl=document.getElementById(ctrlId);        // 获取轮播图左右按钮的父亲
            var scrollWidth=560;                                    // 获取轮播图的宽度
            for (var j=1;j<sliders.length;j++){                     // 遍历所有的图片，把其放在右边候场
                sliders[j].style.left=scrollWidth+"px";
            };
            var spans = scroll_ctrl.children;                       // 获取轮播图左右按钮
            var iNow=0;                                             // 控制轮播图的索引
            var flag = true;
            for(var key in spans) {
                //遍历所有的按钮
                spans[key].onclick = function () {
                    //如果当前的按钮类名是右边的
                    if (this.className == "box-1-gt" && flag==true) {
                        //点击右边按钮的原理：1 当前的图片从左边出去（需要一个变量保存当前的序号）
                        //                    2 让当前的序号加1
                        //                    3 下一张图片快速移动到右边候场
                        //                    4 从右边移入
                        flag=false;
                        $(sliders).eq(iNow).animate({
                            left: -scrollWidth
                        }, 1000);
                        ++iNow > sliders.length - 1 ? iNow = 0 : iNow;
                        sliders[iNow].style.left = scrollWidth + "px";
                        $(sliders).eq(iNow).animate({
                            left: 0
                        }, 1000, function () {
                            flag=true;
                        });
                    }
                    else if (this.className == "box-1-lt" && flag==true) {
                        //点击左边按钮的原理：1 当前的图片从右边出去（需要一个变量保存当前的序号）
                        //                    2 让当前的序号减1
                        //                    3 下一张图片快速移动到左边候场
                        //                    4 从左边移入
                        flag=false;
                        $(sliders).eq(iNow).animate({
                            left: scrollWidth
                        }, 1000 );
                        --iNow < 0 ? iNow = sliders.length - 1 : iNow;
                        sliders[iNow].style.left = -scrollWidth + "px";
                        $(sliders).eq(iNow).animate({
                            left: 0
                        }, 1000, function () {
                            flag=true;
                        });
                    }
                }
            }
            //添加定时器
            //定时器相当于点击了右侧的按钮
            var timer=null;
            timer=setInterval(autoplay,2500);
            function autoplay(){
                $(sliders).eq(iNow).animate({
                    left: -scrollWidth
                }, 1000);
                ++iNow > sliders.length - 1 ? iNow = 0 : iNow;
                sliders[iNow].style.left = scrollWidth + "px";
                //animate(sliders[iNow], {left: 0});
                $(sliders).eq(iNow).animate({
                    left: 0
                }, 1000);
            }

            //清除定时器
            var box=document.getElementById(id);
            box.onmouseover= function () {
                clearInterval(timer);
            }
            box.onmouseout= function () {
                timer=setInterval(autoplay,2500);
            }
        }
        scroll("box_2","index_ctr","box_1");
        scroll("copy_box_2","copy_index_ctr","copy_box_1");
    })()




   
})

$(function () {
    // 个人作品的
    
})

