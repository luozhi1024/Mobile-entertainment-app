import Vue from 'vue';
import Router from 'vue-router';
import movie from '@/views/movie/movie.vue';
import music from '@/views/music/music.vue';
import book from '@/views/book/book.vue';
import photo from '@/views/photo/photo.vue';
import moviedata from '@/views/movie/moviedata.vue'
import PhotoDetail from '@/views/photo/PhotoDetail.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/movie'
    },
        {
            path: '/movie',
            name: 'movie',
            component: movie
        }, {
            path: '/music',
            name: 'music',
            component: music
        }, {
            path: '/book',
            name: 'book',
            component: book
        }, {
            path: '/photo',
            name: 'photo',
            component: photo
        },{
            path: '/moviedata/:movieId',
            name: 'moviedata',
            component: moviedata
        }, {
            path: '/photodetail/:index',
            name: 'photodetail',
            component: PhotoDetail
        }
    ],
});