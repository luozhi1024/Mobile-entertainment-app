<template>
    <Player :musicList="musicList"></Player>
</template>


<script>
    import axios from "axios";
    import Player from '@/components/Player.vue';

    export default {
        components: {
            Player
        },
        data(){
          return{
              musicList:[]
          };
        },
        created(){
            this.$emit("switchtab","music");
            axios.get('/data/musicdata.json').then(res =>{
                this.musicList = res.data.musicData;
            });
        },


    }
</script>

<style lang="scss" scoped>
</style>
