window.mjd = {};
mjd.transitionEnd = function (obj, callBack) {
    if(typeof obj != 'object') return;
    obj.addEventListener('transitionEnd', function (e) {
         callBack && callBack(e);
    });

    obj.addEventListener('webkitTransitionEnd', function (e) {
         callBack && callBack(e);
    });
}


mjd.tap = function (obj, callback) {
    var startTime = 0;
    var isMove = false;

    obj.addEventListener('touchstart', function () {
        startTime = Date.now();
    });

    obj.addEventListener('touchmove', function () {
        isMove = true;
    });

    obj.addEventListener('touchend', function (e) {
        if(Date.now() - startTime < 200 && !isMove){
            callback && callback(e);
        }

        startTime = 0;
        isMove = false;
    });
}