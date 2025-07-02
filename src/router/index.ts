import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecommendPosts from '@/components/main/RecommendPosts.vue'
import MyPosts from '@/components/main/MyPosts.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import AddNewPost from '@/views/AddNewPost.vue'
import SearchResult from '@/views/SearchResult.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'recommend',
        component: RecommendPosts
      },
      {
        path: 'myposts',
        component: MyPosts
      },
      {
        path: '',
        redirect: '/recommend' // 預設導向推薦
      },
      {
        path: '/search',
        name: 'search',
        component: SearchResult
      }
    ]
  },
  {
    path: '/post/:id',
    name: 'postDetail',
    component: PostDetailView
  },
  {
    path: '/add',
    name: 'addPost',
    component: AddNewPost
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
