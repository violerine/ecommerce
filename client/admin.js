var admin = new Vue({
    el: '#admin',
    data:{
        formdata : new FormData(),
        picurl:'',
        item_name:'',
        item_price:''
    },
    methods:{
        previewFile(file){
            console.log(file)
            var filedata=file.target.files[0]
            this.formdata.append('image',filedata)
        },
        uploadPic(){
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            console.log(this.formdata)
            axios.post("http://localhost:7000/Items/upload",this.formdata,config)
            .then(({data})=>{
                console.log("masukkkk ga disini")
                console.log("data",data)
                console.log(data.link)
                this.picurl=data.link
            })
            .catch(err=>{
                console.log('errorzzzz')
                console.log(err)
            })
        },

        addNewItem(){
            axios.post("http://localhost:7000/items/add",{item_name:this.item_name,item_price:this.item_price,pic_url:this.picurl})
            .then(({data})=>{
                console.log(data)
                swal("New item added")
            })
            .catch(err=>{
                console.log(err)
            })
        },
        logout(){
            window.location="home.html"
            localStorage.clear()
        }
    },


})