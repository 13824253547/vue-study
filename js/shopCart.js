window.onload = function () {
    deleteProduct();
}

function deleteProduct() {
    var panel = document.getElementsByClassName('panel')[0];
    var panelContent = panel.getElementsByClassName('panel_content')[0];
    var trashes = document.getElementsByClassName('shop_deal_right');
    var checkBoxs = document.getElementsByClassName('cart_check_box');

    var up;
    for(var i=0; i<trashes.length; i++){
        (function (index) {
            mjd.tap(trashes[i], function (e) {
                 up = trashes[index].firstElementChild;
                 up.style.transition = 'all .2s ease';
                 up.style.webkitTransition = 'all .2s ease';
                 up.style.transformOrigin = '0 5px';
                 up.style.webkitTransformOrigin = '0 5px';
                 up.style.transform = 'rotate(-45deg)';
                 up.style.webkitTransform = 'rotate(-45deg)';
                 panel.style.display = 'block';
                 panelContent.className = 'panel_content jump'

            });
        })(i);
    }
}