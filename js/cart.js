new Vue({
    el:'#app',
    data:{
       productList:[],
        checkAll:false,
        totalMoney:0,
        delFlag:false,
        curProduct:""



    },
    filters:{
        formatMoney: function(value){
            return '￥'+value.toFixed(2)+'元';
        }
    },
    mounted:function(){
        //初始化渲染页面
        this.$nextTick(function(){
          this.cartView();

        })
    },

    methods:{
        //循环取数据列表
       cartView:function(){
           let _this=this;
          this.$http.get('data/cart.json').then(res =>{
              this.productList= res.body.result.list;

          })
       },
        //数量加减
        countFn:function(product,numb) {
            if (numb > 0) {
                 product.count++;
            } else {
                 product.count--;
                if (product.count<1){
                    product.count = 1;
                }
            }
            this.calcTotalPrice();
        },
        //单选
        selectedProduct:function(item){
            if(typeof item.checked == 'undefined'){
                this.$set(item,'checked',true);//局部注册属性
                // Vue.set(item,'checked',true);//全局设置监听未添加的是属性

            }else{
                item.checked=!item.checked
            }
            this.calcTotalPrice();
        },
        //全选
        checkAllFn:function(flag) {
            this.checkAll=flag;
            let _this=this;
            this.productList.forEach((item,index)=>{
                if(typeof item.checked == 'undefined'){
                    this.$set(item,'checked',true);//全局设置监听未添加的是属性

                }else{
                    item.checked=this.checkAll
                }

            });
            this.calcTotalPrice();
        },
        //总金额计算
       calcTotalPrice:function(){
            this.totalMoney=0;
            this.productList.forEach((item,index)=>{
                 if(item.checked ){
                    this.totalMoney += item.count*item.price;
                }

            })
        },
        //点击删除 存当前要删除项
       delConfirm:function(item){
           this.delFlag=true;
           this.curProduct=item;


       },
        //确认删除
        delProduct:function(){
            this.delFlag=false;
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.calcTotalPrice();
        }




    }



});
