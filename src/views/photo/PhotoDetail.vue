<template>
    <router-link to="/photo">
        <v-touch @swipeleft="swipeleft" @swiperight="swiperight" class="img" :style="{background: 'url('+imgSrc+') no-repeat center/contain #000 '}"></v-touch>
    </router-link>
</template>


<script>
    export default {
        data(){
            return {
                imgSrc: '',
                nowIndex: -1
            }
        },
        watch: {
            nowIndex(){
                let nowImg = this.$store.state.photoList[this.nowIndex];
                if(nowImg){
                    this.imgSrc = nowImg.src;
                }
            }
        },
        created(){
            this.nowIndex = this.$route.params.index;
        },
        methods:{
            swiperight(){
                this.nowIndex--;
                if(this.nowIndex == -1){
                    this.nowIndex = this.$store.state.photoList.length - 1;
                }
            },
            swipeleft(){
                this.nowIndex++;
                if(this.nowIndex == this.$store.state.photoList.length){
                    this.nowIndex = 0;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .img {
        position: absolute;
        height: 100%;
        top: 1rem;
        bottom: 1rem;
        left: 0;
        right: 0;
        z-index: -10;
    }
</style>




