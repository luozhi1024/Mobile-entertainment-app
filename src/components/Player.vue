<template>
    <div>
        <div class="album">
            <div class="album-mask" :style="{background:'url('+albumImg+') no-repeat center/cover'}"></div>
            <div class="album-img">
            <img :src="albumImg" alt="">
        </div>
        <div class="album-info">
            <p class="album-info-title">{{albumTitle}}</p>
            <p class="album-info-author">{{albumAuthor}}</p>
            <div class="album-info-control clearfix">
                <div class="album-info-control-icon">
                    <i class="icon iconfont icon-shangyishou"  @click="prev"></i>
                    <i class="icon iconfont icon-bofang" v-show="!isPlay" @click="play"></i>
                    <i class="icon iconfont icon-zanting" v-show="isPlay" @click="pause"></i>
                    <i class="icon iconfont icon-xiayishou" @click="next"></i>
                </div>
                <span @click="toggleList=!toggleList" class="album-info-control-menu">歌单</span>
            </div>
        </div>
    </div>

    <transition name="slide">
        <ul class="music-list" v-show="toggleList">
            <li @click="selectMusic(index)" :class="['music-list-item', nowIndex == index?'selected': '']" v-for="(music,index) in musicList" :key="index">
                <span class="music-list-item-title">{{music.title}}&nbsp;-&nbsp;</span>
                <span class="music-list-item-author">{{music.author}}</span>
            </li>
        </ul>

    </transition>

    <div class="audio">
    <audio ref="musicAudio" @play="isPlay=true" @pause="isPlay=false" class="audio-ctrl" :src="musicSrc" autoplay controls></audio>
</div>
        <ul class="lrclist" ref="lrclist">
            <li :class=" lrcIndex==index?'selected': '' " v-for="(lrc,index) in lrcList" :key="lrc.time">
                {{lrc.lrc}}
            </li>

        </ul>
    </div>

</template>

<script>
    import "@/assets/font/musicfont/iconfont.css";
    import axios from  "axios";
    export default {
        props: ["musicList"],
        data() {
            return {
                nowIndex: -1,
                albumImg:
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534392590864&di=ea0b86383d4093227776b1dae2ad5c62&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160317%2Fe053fa57da1043f790a3823fec964b5b_th.jpg",
                albumTitle: "网易云音乐",
                albumAuthor: "网易云",
                isPlay: false,
                toggleList: false,
                musicSrc: "",
                lrcList:[],
                lrcIndex:-1,
            };
        },
        methods: {
            selectMusic(index) {
                this.nowIndex = index;
            },
            play() {
                this.$refs.musicAudio.play();
            },
            pause() {
                this.$refs.musicAudio.pause();
            },
            prev() {
                this.nowIndex--;
                if (this.nowIndex == -1) {
                    this.nowIndex = this.musicList.length - 1;
                }
            },
            next() {
                this.nowIndex++;
                if (this.nowIndex == this.musicList.length) {
                    this.nowIndex = 0;
                }
            },
            parseLrc(text){
                let  line = text.split("\n");
                line.forEach(elem =>  {
                    let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
                    if (time != null){
                        let lrc = elem.split(time)[1];
                        let timeReg = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);
                        let time2Seconds  = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) /1000;
                        this.lrcList.push({
                            time: time2Seconds ,
                            lrc : lrc
                        } )
                    }
                })


            }
        },
        watch: {
            nowIndex() {
                let nowMusic = this.musicList[this.nowIndex];
                this.albumImg = nowMusic.musicImgSrc;
                this.albumTitle = nowMusic.title;
                this.albumAuthor = nowMusic.author;
                this.musicSrc = nowMusic.src;
                this.lrcList = [];
                this.lrcIndex = -1;
                axios.get('/' + nowMusic.lrc).then(res => {
                    this.parseLrc(res.data);

                })
            }
        },
        mounted() {
            let musicAudio = this.$refs.musicAudio;
            this.$refs.musicAudio.addEventListener('timeupdate', () => {
                let currentTime = musicAudio.currentTime;
                this.lrcList.forEach((elem, index)=>{
                    if(Math.ceil(elem.time) >= currentTime &&  Math.floor(elem.time) < currentTime){
                        this.lrcIndex = index;
                        this.$refs.lrclist.scrollTop = this.lrcIndex * 25;

                    }
                })

            })


        }


    };

</script>

<style lang="scss" scoped>
    .clearfix::after {
        content: "";
        display: block;
        clear: both;
    }
    .music-list {
        position: fixed;
        bottom: 2rem;
        width: 100%;
        background-color: #2a2929;
        height: 4rem;
        overflow-y: scroll;
        &-item {
            color: #dcdbdb;
            border-bottom: 0.02rem solid #343433;
            padding: 0.2rem;
            &.selected {
                color:#C20C0C;
            }
        }
    }
    .album {
        display: flex;
        text-align: center;
        position: relative;
        color: #fff;
        &-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(20px);
            z-index: -1;
        }
        &-img {
            flex-grow: 1;
            width: 0;
            margin-left: 0.2rem;
            img {
                width: 100%;
            }
        }
        &-info {
            width: 0;
            flex-grow: 2;
            &-title {
                font-size: 0.5rem;
            }
            &-control {
                position: relative;
                height: 0.9rem;
                line-height: 0.9rem;
                &-icon {
                    float: left;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    .icon {
                        font-size: 0.5rem;
                    }
                }
                &-menu {
                    float: right;
                    margin-right: 0.4rem;
                }
            }
        }
    }
    .slide {
        &-enter {
            transform: translateY(100%);
            &-to {
                transform: translateY(0);
            }
            &-active {
                transition: transform 1s ease;
            }
        }
        &-leave {
            transform: translateY(0);
            &-to {
                transform: translateY(100%);
            }
            &-active {
                transition: transform 1s ease;
            }
        }
    }
    .audio {
        background: #fff;
        height: 1rem;
        position: fixed;
        bottom: 1rem;
        width: 100%;
        &-ctrl {
            width: 100%;
        }
    }
    .lrclist {
        text-align: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 2rem;
        top: 3.3rem;
        overflow-y: scroll;
        z-index: -1;
        padding-top: 2rem;
        .selected {
            color: #C20C0C;
            font-size: 120%;
        }
    }
</style>