<template>
	<div class='leftMenuDiv ' :style="styleObject">
		<span class='categoryTitle'>推荐</span>

		<div v-for="(item,index) in listNum" :class="{active:urlNow==item.to}" class="menuitem" @click="$router.push(item.to)">
			<svg class="icon" aria-hidden="true">
				<use :xlink:href="item.icon"></use>
			</svg>
			<span>{{item.theme}}</span>
		</div>
		<span class='categoryTitle'>我创建的歌单</span>
		<div class='gedan' :class="{active:urlNow2==item.to}" v-for='(item,index) in gedan2' @click='$router.push(item.to)'>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-gedan"></use>
			</svg>
			<span>{{item.name}}</span>
		</div>
		<span class='categoryTitle'>收藏的歌单</span>
		<div class='gedan' :class="{active:urlNow2==item.to}"  v-for='(item,index) in gedan' @click='$router.push(item.to)'>
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-gedan"></use>
			</svg>
			<span>{{item.name}}</span>
		</div>
	</div>
</template>

<script>
	import '../assets/js/iconfont.js'
	import { getUrlLastPath } from '../common/stringOption.js'
	export default {
		name: "leftMenu",
		data() {
			return {
				active: "active",
				urlNow: '',
				urlNow2:'',
				listNum: [{
						to: '/foundMusic',
						icon: '#icon-yinle',
						theme: "发现音乐"
					},
					{
						to: '/personFM',
						icon: '#icon-fm',
						theme: "私人FM"
					},
					{
						to: '/mv',
						icon: '#icon-mv',
						theme: "MV"
					},
					{
						to: '/friend',
						icon: '#icon-pengyou',
						theme: "朋友"
					},
				],
				gedan: [{
						name: '尹素婉直播歌单',
						to: "/listDetail/316388951"
					},
					{
						name: '什么都没有还敢说喜欢的音乐',
						to: "/listDetail/153254708"
					},
					{
						name: 'qq飞车里面那些棒到极点的歌！ 你会熟悉的',
						to: "/listDetail/82373060"
					},
					{
						name: '健身必备？华语歌曲也可以！',
						to: "/listDetail/70127853"
					},
					{
						name: '那些听了就爱上的旋律',
						to: "/listDetail/71487662"
					},
				]
				,gedan2:[
					{name: 'KJBU2喜欢的音乐',to: "/listDetail/73893911"},
					{name: '陈粒',to: "/listDetail/785891308"},
					{name: '薛之谦',to: "/listDetail/723553924"},
					{name: 'T-ara',to: "/listDetail/87075248"},
					{name: 'run',to: "/listDetail/100765441"},
				]
			}
		},
		props: {
			styleObject: {
				default: function() {
					return {
						height: 250,
						width: 950
					}
				}
			}
		},
		mounted: function() {
			const width = parseInt(this.styleObject.width)
			const height = parseInt(this.styleObject.height)
			this.styleObject.width += "px"
			this.styleObject.height += "px"

			const href = window.location.pathname
			this.urlNow = '/' + getUrlLastPath(href, 1);
			this.urlNow2=href;
		},
		methods: {

		},
		watch: {
			'$route' (to, from) {
				this.urlNow2=to.path;
				const toUrl = getUrlLastPath(to.path, 1);
				const fromUrl = getUrlLastPath(from.path, 1);
				this.urlNow = '/' + toUrl;
			}
		}
	}
</script>

<style scoped>
	.leftMenuDiv{
		overflow: auto;
		box-sizing: border-box;
		padding-bottom: 50px;
	}
	.leftMenuDiv::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.leftMenuDiv::-webkit-scrollbar-track {
		/*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
		border-radius: 10px;
		background-color:rgba(255,255,255,1);
		/*background-color: steelblue;*/
	}
	/*定义滑块，内阴影及圆角*/
	
	.leftMenuDiv::-webkit-scrollbar-thumb {
		width: 1px;
		height: 10px;
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: rgba(0, 0, 0, .1)
	}
	.leftMenuDiv::-webkit-scrollbar-thumb:hover{
		background-color: rgba(0, 0, 0, .2)
	}
	.icon {
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		color: #666;
		margin-right: 5px;
		vertical-align: -5px;
		margin-left: 20px;
		height: 20px;
		width: 20px;
	}
	
	.gedan {
		height:40px;
		line-height:40px;
		text-align: left;
		cursor: pointer;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.categoryTitle {
		display: block;
		width: 100%;
		text-align: left;
		line-height: 30px;
		color: #888;
		cursor: default;
	}
	
	.menuitem {
		width: 100%;
		height: 30px;
		text-align: left;
		line-height: 30px;
		cursor: pointer;
		box-sizing: border-box;
	}
	
	.menuitem span {
		color: #717171
	}
	
	.menuitem:hover span {
		color: #333
	}
	
	.menuitem:hover .icon {
		color: #111
	}
	
	.active {
		background-color: #E6E7EA;
		border-left: 3px solid red;
	}
</style>