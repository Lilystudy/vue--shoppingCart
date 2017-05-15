new Vue({
   el:'#address',
    data:{
        limit:3,
        currentIndex:0,
        addressList:[],
        isDelete:false,
        delIndex:0,
        deliveryModel:1,
        isAdd:false,
        userNameValue:"",
        streetNameValue:"",
        telValue:""


    },
    filter:{



    },
    mounted:function(){
      this.$nextTick(function(){
          this.addressListFn();
      })
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.limit);
        }
    },
    methods:{
        addressListFn:function(p){
            this.$http.get("data/address.json").then(response=>{
                var res=response.data;
                if(status==0){
                    this.addressList=res.result;
                }

            })
        },
        setDefault:function(addressId){

            this.addressList.forEach(function(addressObj,index){

                if(addressObj.addressId == addressId){
                    addressObj.isDefault = true;

                }else{
                    addressObj.isDefault=false;
                }
            });

        },
        deleteItem:function(index){
            this.isDelete=true;
            this.delIndex=index;
            console.log(index);

        },
        sureDelete:function(){
            this.addressList.splice(this.delIndex,1);
            this.isDelete=false;
        },
        editAddress:function(item){
            this.isAdd=true;
            this.userNameValue=item.userName;
            this.streetNameValue=item.streetName;
            this.telValue=item.tel;


        },
        addNewAddress:function(){
          this.isAdd=true;
            this.userNameValue="";
            this.streetNameValue="";
            this.telValue="";


        },
        saveFn:function(){
            alert(123);
            this.isAdd=false;
            let data;
            data="userName:"+this.userName+"streetName"+this.streetName+"tel"+this.tel;
            this.$http.post("data/address.json",data).then(function(){

                    alert("保存成功");

            })

        }


    }
});