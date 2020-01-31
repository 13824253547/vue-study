window.onload = function () {
    leftCategory();
}

function leftCategory() {
    var parentDom = document.getElementsByClassName('category_main_left')[0];
    var childDom = parentDom.getElementsByClassName('category_main_left_con')[0];
    var parentH = parentDom.offsetHeight;
    var childH = childDom.offsetHeight;
    var maxY = 0;
    var minY = -(childH - parentH);
    var buffer = 150;

    var addTransition = function () {
        childDom.style.transition = 'all .2s ease';
        childDom.style.webkitTransition = 'all .2s ease';
    }

    var removeTransition = function () {
        childDom.style.transition = 'none';
        childDom.style.webkitTransition = 'none';
    }

    var changeTranslateY = function (y) {
        childDom.style.transform = 'translateY('+ y +'px)';
        childDom.style.webkitTransform = 'translateY('+ y +'px)';
    }

    var startY = 0, endY = 0, moveY=0;
    var currentY = 0;
    childDom.addEventListener('touchstart', function (e) {
         startY = e.touches[0].clientY;
    });
    childDom.addEventListener('touchmove', function (e) {
        endY = e.touches[0].clientY;
        moveY = startY - endY;
        if((currentY-moveY)<(maxY + buffer) && (currentY-moveY) > (minY-buffer)){
            removeTransition();
            changeTranslateY(currentY - moveY);
        }

    });

    childDom.addEventListener('touchend', function (e) {
         if((currentY-moveY) > maxY){
             currentY = maxY;
             addTransition();
             changeTranslateY(currentY);
         }else if((currentY-moveY) < minY){
             currentY = minY;
             addTransition();
             changeTranslateY(currentY);
         }else {
             currentY = currentY - moveY;
         }

         startY = 0;
         endY = 0;
         moveY = 0;
    });

    var liList = childDom.getElementsByTagName('li');
    mjd.tap(childDom, function (e) {
        for(var i=0; i<liList.length; i++){
            liList[i].className = '';
            liList[i].index = i;
        }

        var li = e.target.parentNode;
        li.className = 'current';

        var distanceY = - (li.first * 50);

        if(distanceY > minY){
            addTransition();
            changeTranslateY(distanceY);
            currentY = distanceY;
        }else {
            changeTranslateY(minY);
            currentY = minY;
        }

         var rightDom = document.getElementsByClassName('category_main_right')[0];
         rightDom.style.transition = 'all .3s ease';
         rightDom.style.webkitTransition = 'all .3s ease';
         rightDom.style.opacity = 0;
         setTimeout(function () {
             rightDom.style.opacity = 1;
         }, 300);
    });


}