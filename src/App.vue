<template>
  <div id="app">
    <commonheader :selectMenu="selectMenu"></commonheader>
    <router-view class="content" @switchtab ="switchtab"/>
    <commonfooter :footerBgColor="selectMenu.bgColor"  :menuList="menuList"></commonfooter>
  </div>
</template>
<script>

  import  commonheader from "@/components/commonheader.vue";
  import  commonfooter from "@/components/commonfooter.vue"
  export default {
      components :{
          commonheader,
          commonfooter,
      },
       methods: {
          // changeTitle(menu){
          //     this.selectMenu = menu;
          // },
          switchtab(menuname){
              this.menuList.forEach(menu => {
                  if(menu.name == menuname){
                        this.selectMenu = menu;
                  }
                  
              });
          }
      },
      data(){
          return{
              menuList: [
                  {
                      title: '电影',
                      bgColor: '#e54847',
                      name: 'movie',
                      path: '/movie'
                  },{
                      title: '音乐',
                      bgColor: '#C20C0C',
                      name: 'music',
                      path: '/music'
                  },{
                      title: '书籍',
                      bgColor: '#795548',
                      name: 'book',
                      path: '/book'
                  },{
                      title: '图片',
                      bgColor: '#3f51b5',
                      name: 'photo',
                      path: '/photo'
                  }
              ],
              selectMenu: {}
          }
      }

  }
</script>

<style lang="scss">
.content{
  margin: 1rem 0;
}

</style>
