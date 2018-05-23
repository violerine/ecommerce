var app = new Vue({
    el: '#app',
    created:function(){
      this.showAllItems()
      const fromCart = JSON.parse(localStorage.getItem('carts'))
      console.log("apa ini",fromCart)
      console.log('username',localStorage.getItem('userName'))
      // this.carts = []
      this.cartsFromLocal=fromCart
    
    },
    watch: {
      carts : function () {
        localStorage.setItem('carts', JSON.stringify(this.carts))
      }
    },
    data: {
      username:localStorage.getItem('userName'),
      carts:[],
      allItem:[],
      itemCount:'',
      cartsFromLocal:[],
      showModal:false
    },
    mounted(){
      // this.addLocal();
    },
    methods:{
      showAllItems(){
        axios.get('http://localhost:7000/items/get')
        .then(items=>{
          this.allItem=items.data
          // console.log(items.data)
        })
        .catch(err=>{
          console.log(err)
        })
      },
      addLocal() {
        console.log('masuk sini');
        
        localStorage.setItem('adhy', 'halo')

        console.log(localStorage.getItem('adhy'));
        
      },
      addCart(item,index){
        // this.itemCount=value
        // console.log("itemname",this.allItem[index].item_name)
        for(var i=0; i<this.carts.length; i++){
          if(this.allItem[index].item_name===this.carts[i].item_name){
           return swal('already added to cart')
          }
        }
        // console.log(index,"index")
        this.carts.push(item)
        localStorage.setItem('carts', JSON.stringify(this.carts))
        // console.log("localst",localStorage.getItem('carts'))
        // console.log("adhy",localStorage.getItem('adhy'))
        // console.log("dapet gaaAa",this.cartsFromLocal)
        // console.log("ini cartnya",this.carts)
      },
      
      checkOut(){
        var user=localStorage.getItem('userId')
        // console.log(this.itemCount)
        axios.post('http://localhost:7000/cart/add', {customer_id:user,items:this.cartsFromLocal})
        .then(data=>{
          console.log(data)
          swal('berhasil checkout')
        })
        .catch(err=>{
          swal('berhasil checkout')
          return err
        })
      },
      logout(){
          localStorage.clear()
          window.location="login.html"
      }
    }
})