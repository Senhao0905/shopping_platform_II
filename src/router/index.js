import { createRouter, createWebHistory } from 'vue-router'
import MemberCenter from "../views/MemberCenter.vue"
import HomeView from "../views/HomeView.vue"
import UserInfoView from "../views/UsreInfo.vue"
import MyMarketView from "../views/MyMarket.vue"
import CommodityView from "../views/Commodity.vue"
import OrderView from "../views/OrderView.vue"
import ShopCar from "../views/ShopCar.vue"
import Login from "../views/LoginView.vue"
import Checkout from "../views/Checkout.vue"
import CarView from "../views/CarView.vue"
import OrderInfoView from "../views/OrderInfo.vue"
import CategoryView from "../views/Category.vue"
import ComputerView from "../views/Computer.vue"
import AccessoriesView from "../views/Accessories.vue"
import LifeView from "../views/Life.vue"
import CasualView from "../views/Casual.vue"
import FoodView from "../views/Food.vue"
import CommodityPage from "../views/CommodityPage.vue"
import OrderDetail from "../views/OrderDetail.vue"
import OrderDetailUser from "../views/OrderDetailUser.vue"
import AddCommodity from "../views/AddCommodity.vue"
import CommodityEdit from "../views/CommodityEdit.vue"
import RegisterView from "../views/RegisterView.vue"
import { compile } from 'vue'
import SearchPageView from "../views/SearchPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
// AddCommodity CommodityEdit

      path: '/my-market',
      name: 'my-market',
      component: MyMarketView,
      children: [
        {
          path: 'commodity',
          component: CommodityView
        },
        {
          path: 'orderview',
          component: OrderView
        },
        {
          path :'orderDetail',
          component : OrderDetail
        },
        {
          path:'AddCommodity',
          component : AddCommodity
        },
        {
          path : 'CommodityEdit',
          component : CommodityEdit
        }
      ]
    },
    {
      path: '/member-center',
      name: 'member-center',
      component: MemberCenter,
      children: [
        {
          path: 'userInfo',
          component: UserInfoView
        },
        {
          path: 'orderInfo',
          component: OrderInfoView
        },
        {
          path:'orderDetailUser',
          component : OrderDetailUser
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/shopping-car',
      name: 'shopping-car',
      component: ShopCar,
      children: [
        {
          path:'carview',
          component : CarView
        }
      ]

    },
    {
      path: '/category',
      name: 'category',
      component : CategoryView,
      children: [
        {
          path: 'computer',
          component : ComputerView
        },
        {
          path: 'accessories',
          component : AccessoriesView
        },
        {
          path: 'life',
          component : LifeView
        },
        {
          path: 'casual',
          component :CasualView
        },
        {
          path:'food',
          component : FoodView
        }
      ]
    },
    {
      path : '/checkout:propText',
      name :'checkout',
      component : Checkout,
      props : true
    },
    {
      path :'/commodityPage:number',
      name : 'commodityPage',
      component : CommodityPage,
      props  : true
    },
    {
      path: '/search-page:keyword',
      name: 'search-page',
      component: SearchPageView,
      props:true
    },
  ]
})

export default router

// login判斷
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin');
  console.log(isLogin);
  if (isLogin == "true") {  
    if(to.path == '/login') {
      alert('已登入')
      next('/');
    }
    next();
  } 
  else {
    if( to.path === '/my-market/orderview' || to.path ==='/member-center/userInfo' || to.path === '/shopping-car/carview'){
      alert("請先登入 !");
      next('/login');
    }   
    else
      next()
  }
})

