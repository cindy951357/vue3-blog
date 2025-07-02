import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HomeFeed from '@/components/main/HomeFeed.vue'
import RecommendPosts from '@/components/main/RecommendPosts.vue'
import MyPosts from '@/components/main/MyPosts.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import AddNewPost from '@/views/AddNewPost.vue'
import SearchResult from '@/views/SearchResult.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: 'recommend',
        component: HomeFeed,
        children: [
          {
            path: 'posts',
            component: RecommendPosts
          }
        ]
      },
      {
        path: 'myposts',
        component: HomeFeed,
        children: [
          {
            path: 'posts',
            component: MyPosts
          }
        ]
      },
      {
        path: 'search',
        component: SearchResult
      },
      {
        path: '',
        redirect: '/recommend/posts'
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
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
