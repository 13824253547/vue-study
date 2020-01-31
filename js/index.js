window.onload = function () {
    changeNavBarColor();
    secondKill();
    changeBanner();
};

window.onresize = function () {
    setTimeout(function () {
        window.location.reload();
    }, 200);
}


function changeNavBarColor() {
    var headerBox = document.getElementsByClassName('jd_header_box')[0];
    var banner = document.getElementsByClassName('jd_banner')[0];

    var bannerH = banner.offsetHeight;

    window.onscroll = function () {
        var scrollTopH = document.body.scrollTop;
        var opt = 0;
        if(scrollTopH <= bannerH){
            opt = scrollTopH / bannerH * 0.85;
        }else {
            opt = 0.85;
        }
        headerBox.style.background = 'rgba(201, 21, 35, '+ opt +')';
    }
}


function secondKill() {
    var sencondTime = document.getElementsByClassName('s_kill_time')[0];
    var spans = sencondTime.getElementsByTagName('span');
    var timer = null, time = 8 * 60 * 60;
    timer = setInterval(function () {
        time--;
        if(time < 0){
            clearInterval(timer);
        }

        var h = Math.floor(time / (60 * 60));
        var m = Math.floor(time % (60 * 60) / 60);
        var s = time % 60;

        spans[0].innerHTML = h >= 10 ? Math.floor(h/10): 0;
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = m >= 10 ? Math.floor(m/10): 0;
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = s >= 10 ? Math.floor(s/10): 0;
        spans[7].innerHTML = s % 10;

    }, 1000);
}


function changeBanner() {
    var banner = document.getElementsByClassName('jd_banner')[0];
    var bannerW = banner.offsetWidth;
    var imageBox = banner.getElementsByTagName('ul')[0];
    var indicatorBox = banner.getElementsByTagName('ol')[0];
    var allPoints = indicatorBox.getElementsByTagName('li');


    var addTransition = function () {
        imageBox.style.transition = 'all .2s ease';
        imageBox.style.webkitTransition = 'all .2s ease';
    }

    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }

    var changeTranslateX = function (x) {
        imageBox.style.transform = 'translateX(' + x + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + x + 'px)';
    }

    var index = 1;
    var timer = null;
    timer = setInterval(scrollImg, 1000);
    function scrollImg() {
        index++;
        addTransition();
        changeTranslateX(-index * bannerW);
    }



    mjd.transitionEnd(imageBox, function (e) {
            if(index >= 9){
                index = 1;
            } else if(index <=0){
                index = 8;
            }

            removeTransition();
            changeTranslateX(-index * bannerW);

            changePoints();
    })


    var changePoints = function () {
        for(var i=0; i<allPoints.length; i++){
            allPoints[i].className = '';
        }

        var pointIndex = index;
        if(pointIndex >= 9){
            pointIndex = 1;
        }else if(index <=0){
            pointIndex = 8;
        }

        allPoints[pointIndex - 1].className = 'current';
    }

    var startX = 0;
    var endX = 0;
    var distanceX = 0;


    imageBox.addEventListener('touchstart', function (e) {
          clearInterval(timer);
          startX = e.touches[0].clientX;
    });


    imageBox.addEventListener('touchmove', function (e) {
         e.preventDefault();
         endX = e.touches[0].clientX;
         distanceX = startX - endX;
         removeTransition();
         changeTranslateX(-index*bannerW - distanceX);
    });

    imageBox.addEventListener('touchend', function () {
         if(Math.abs(distanceX) > 1/3 * bannerW && endX != 0) {
             if (distanceX > 0) {
                 index++
             } else if (distanceX < 0) {
                 index--;
             }
         }

          addTransition();
          changeTranslateX(-index*bannerW);
          timer = setInterval(scrollImg, 1000);
          startX = 0;
          endX = 0;
          distanceX = 0;
    });




}