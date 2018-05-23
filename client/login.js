var login = new Vue({
    el: '#login',
    created:function(){
        console.log("masuk gaa",localStorage.getItem('userId'))

    },
    data:{
        username:'',
        password:'',
    },
    methods:{
        login(){
            axios.post('http://localhost:7000/login',
            {
                username:this.username, 
                password:this.password
            })
            .then(userlogged=>{
                if(this.username=='admin'){
                    console.log('masuk admin ga')
                    window.location="admin.html"
                }else{
                console.log(userlogged)
                swal("successfully logged in")
                window.location="index.html"
                console.log("dataID",userlogged.data.id)
                localStorage.setItem('token',userlogged.data.token)
                localStorage.setItem('userId',userlogged.data.id)
                localStorage.setItem('userName',userlogged.data.name)
                }
                
            })
            .catch(err=>{
                return alert("maaf terjadi kesalahan")
                console.log(err)
            })
        }
    }

})