<template>
<div>
    <ul>
        <li  @click="godetail(movie.id)" class="movie" v-for="movie in movieList" :key = "movie.id">
        <div class="movie-img"><img :src="movie.images.large" alt=""></div>
            <div class="movie-info">
            <div class="movie-info-title"><span>{{movie.title}}</span></div>
            <div>观众评:
            <span class="movie-info-average">{{movie.rating.average}}</span></div>
            <div class="movie-info-star">主演：
            <span v-for="item in movie.casts " :key="item.id">{{item.name}}&nbsp;</span></div>
            </div>
        </li>
    </ul>
    <div class="end" v-show="isEnd">
        <h3>数据到底了</h3>
    </div>
    <div class="loading" v-show="isloading">
        <img src="@/assets/img/loading.gif" alt="">
    </div>
</div>

</template>


<script>
    import axios from "axios";
    export default {
        data(){
          return{
              movieList:[],
              isEnd:false,
              isloading:true
            };
        },
        methods:{
            getdata(){
                let url1 = "https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/top250?start=0&count=5";
                let url2 = "https://api.myjson.com/bins/fuo30";
                this.isloading = true;
                axios.get(url2).then(res => {
                 let getlist =  res.data.subjects.slice(
                        this.movieList.length,
                        this.movieList.length + 5
                    );
                    if (getlist.length < 5){
                        this.isEnd = true;
                    }
                    this.movieList = this.movieList.concat(getlist);
                    this.isloading = false;
                });
            },
            godetail(movieId){
                this.$router.push(`/moviedata/${movieId}`);
            }

        },
        created(){
            this.$emit("switchtab","movie");
            this.getdata();
        },
        mounted() {
            window.onscroll = () => {
                let scrollTop = document.documentElement.scrollTop;
                let scrollHeight = document.documentElement.scrollHeight;
                let clientHeight = document.documentElement.clientHeight;

                if (scrollHeight == Math.ceil(scrollTop) + clientHeight && !this.isEnd) {
                    // 请求数据
                    this.getdata();
                }
            };
        }
    }
</script>

<style lang="scss" scoped>
    .movie {
        display: flex;
        padding: 0.2rem;
        border-bottom: 0.02rem solid #ccc;
        &-img {
            flex-grow: 1;
            width: 0;
            img {
                width: 100%;
            }
        }
        &-info {
            flex-grow: 3;
            width: 0;
            margin-left: 0.2rem;
            &-title {
                color: #333;
                font-weight: 700;
                font-size: 0.34rem;
            }
            &-average {
                font-weight: 700;
                color: #faaf00;
            }
            &-star {
                color: #666;
                font-size: 0.26rem;
            }
        }
    }
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2.2rem;
        height: 2.2rem;
        img {
            width: 90%;
            position: absolute;
            padding: 0.1rem;
            text-align: center;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 0.2rem;
        }
    }
    .end {
        text-align: center;
    }
</style>
