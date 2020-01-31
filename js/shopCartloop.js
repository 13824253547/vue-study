"use strict";
new Vue({
    el: '#app',
    data: {
        shopListArr: [],
        isSelectedAll: false,
        totalPrice: 0,
        isHideDelPanel: true,
        currentDelShop: {}
    },
    mounted(){
        this.getLocalData();
    },
    filters: {
        moneyFormat(money){
            return '¥' + money.toFixed(2);
        }
    },

    methods: {
        getLocalData() {
            this.$http.get('data/cart.json').then(response => {
                const res = response.body;
                if(res){
                    this.shopListArr = res.allShops.shopList;
                    console.log(this.shopListArr);
                }
            }, response => {
                alert('请求数据失败!');
            });
        },

        singerShopPrice(shop, flag){
             if(flag){
                 shop.shopNumber += 1;
             }else {
                 if(shop.shopNumber <= 1){
                     shop.shopNumber = 1;
                     return;
                 }
                 shop.shopNumber -= 1;
             }

            this.getAllShopPrice();
        },

        selectedAll(flag){
            this.isSelectedAll = !flag;
            this.shopListArr.forEach((value, index)=>{
                if(typeof value.checked === 'undefined'){
                    this.$set(value, 'checked', !flag);
                }else {
                    value.checked = !flag;
                }
            });

            this.getAllShopPrice();
        },

        getAllShopPrice(){
            let totalPrice = 0;
            this.shopListArr.forEach((value, index)=>{
                if(value.checked){
                    totalPrice += value.shopPrice * value.shopNumber;
                }
            });

            this.totalPrice = totalPrice;
        },

        singerShopSelected(shop){
            if(typeof shop.checked === 'undefined'){
                this.$set(shop, 'checked', true);
            }else {
                shop.checked = !shop.checked;
            }

            this.getAllShopPrice();
            this.hasSelectedAll();
        },

        hasSelectedAll(){
            let flag = true;
            this.shopListArr.forEach((value, index)=>{
                if(!value.checked){
                    flag = false;
                }
            });
            this.isSelectedAll = flag;
        },

        clickTrash(shop){
            this.isHideDelPanel = false;
            this.currentDelShop = shop;
        },

        delShop(){
            this.isHideDelPanel = true;
            const index = this.shopListArr.indexOf(this.currentDelShop);
            this.shopListArr.splice(index, 1);
            this.getAllShopPrice();
        }

    }
});