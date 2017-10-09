import Vue from 'vue'
import Router from 'vue-router'
import FoundMusic from './../components/foundMusic'
import PersonFM from './../components/personFM/personFM'
import Mv from './../components/mv'
import Friend from './../components/friend'
import ListDetail from './../components/listDetail'
import Recommoned from './../components/find/recommoned'
import SongMenu from './../components/find/songMenu'
import Broadcasting from './../components/find/broadcasting'
import Ranking from './../components/find/ranking'
import Singer from './../components/find/singer'
import Lastest from './../components/find/lastest'


Vue.use(Router)

export default new Router({
	mode:"history",
  routes: [
   {
      path: '/',
     	redirect:'/foundMusic'
   },
    {
      path: '/foundMusic',
      name: 'foundMusic',
      component:FoundMusic,
      children:[
      	{path:'/',redirect:'recommoned'},
      	{path:'recommoned',component:Recommoned},
      	{path:'songMenu',component:SongMenu},
      	{path:'broadcasting',component:Broadcasting},
      	{path:'ranking',component:Ranking},
      	{path:'singer',component:Singer},
      	{path:'lastest',component:Lastest},
      ]
    },
    {
      path: '/FM',
      name: 'personFM',
      component: PersonFM	
    },
     {
      path: '/mv',
      name: 'mv',
      component: Mv	
    },
     {
      path: '/Friend',
      name: 'friend',
      component: Friend	
    },
     {
      path: '/ListDetail/:id',
      name: 'ListDetail',
      component: ListDetail	
    }
    
  ]
})
