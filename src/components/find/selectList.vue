<template>
	<div :style="styleObject">
		<ul class='list'>
			<router-link tag='li' v-for="item in listNum" :to="item.to" :class='{active:urlNow==item.to}'>
				{{item.theme}}
			</router-link>
		</ul>
		
		
	</div>
</template>

<script>
	import {getUrlLastPath} from '../../common/stringOption.js'
	export default{
		name:'selectList',
		data(){
			return {
				listNum:[
				{to:'recommoned',theme:"个人推荐"},
				{to:'songMenu',theme:"歌单"},
				{to:'broadcasting',theme:"主播电台"},
				{to:'ranking',theme:"排行榜"},
				{to:'singer',theme:"歌手"},
				{to:'lastest',theme:"最新音乐"},
				],
				active:"active",
				urlNow:'',
				
			}
		},
		props:{
			styleObject: {
				default: function() {
					return {
						height: "40px",
						width: "700px",
						"margin-right":'50px',
						"float":'right'
					}
				}
			}
		},
		mounted: function() {
			
			const href=window.location.pathname
			this.urlNow=getUrlLastPath(href,2)
		},
		watch:{
			'$route'(to,from){
				const toUrl=getUrlLastPath(to.path,2)
				const fromUrl=getUrlLastPath(from.path,2)
				this.urlNow=toUrl
				console.log(this.urlNow)
			}
		}
	}
</script>

<style scoped>
	.list{
		margin:0;
		padding:0;
		height:40px;
		border-bottom:1px solid gainsboro;
		box-sizing: border-box;
	}
	.list li{
		list-style-type: none;
		display: inline-block;
		line-height:40px;
		height:40px;
		box-sizing: border-box;
		margin:0 10px 0 10px;
		color:#333;
		cursor: pointer;
	}
	.list  .active{
		border-bottom:2px solid #C62F2F;
		color:#C62F2F;
	}
</style>