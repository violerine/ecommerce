Vue.component('item-card', {
    // camelCase in JavaScript
    props: ['item','itemcount','index'],
    data:function(){
      return{
        count: ''
      }
    },
    methods: {
      addCart(e) {
        console.log(e)
        this.$emit('addtocart', e.target.value)
      }
    },
    template: ` 
    <div class="column">
      <div class="">
        <div class="ui card">
          <div class="image">
            <img v-bind:src=item.pic_url>
          </div>
          <div class="content">
            <a class="header">{{ item.item_name }}</a>
            <div class="description">
              Rp.{{item.item_price}},00
            </div>
          </div>
          <div class="extra content"> 
            <a>
              <button type="button" @click="$emit('addtocart',item,index)" class="ui button" >
                Add to Cart
              </button>
            </a>
          </div>
        </div>
      </div>
  </div>`,
  })

  

