<template>
	<div :style="styleObject" class='wrap'>
		<div class='songInfo'>
			<svg class="icon" aria-hidden="true" >
  									<use xlink:href="#icon-music"></use>
								</svg><span>{{headerInfo.length}}</span>
			<svg class="icon" aria-hidden="true" style="padding-left:2px;">
  									<use xlink:href="#icon-playsmall"></use>
								</svg><span>{{headerInfo.playCount}}</span>
		</div>
		<ul class='header'>
			<li class='item-1'><img :src="headerInfo.imgUrl	" /></li>
			<li class='item-2'>
				<ul>
					<li><span class='title'>{{headerInfo.title}}</span></li>
					<li class='autor'>
						<ul>
							<li><img :src="headerInfo.autorImg" alt="" /></li>
							<li>{{headerInfo.autor}}</li>
							<li>{{headerInfo.createTime}}</li>
						</ul>
					</li>
					<li class='operate'>
						<ul>
							<li><button @click='broadcastAll'>
								<svg class="icon" aria-hidden="true">
  									<use xlink:href="#icon-bofang"></use>
								</svg><span>播放全部</span>
							</button></li>
							<li><button><svg class="icon" aria-hidden="true">
  									<use xlink:href="#icon-folder"></use>
								</svg><span>收藏({{headerInfo.subscribedCount}})</span></button></li>
							<li><button>
								<svg class="icon" aria-hidden="true">
  									<use xlink:href="#icon-fenxiang"></use>
								</svg><span>分享({{headerInfo.shareCount}})</span>
							</button></li>
							<li><button>
								<svg class="icon" aria-hidden="true">
  									<use xlink:href="#icon-download"></use>
								</svg><span>下载全部</span>
							</button></li>
						</ul>
					</li>
					<li class='tag'>
						<span>标签：<em  v-for="(item ,index) in headerInfo.tag">{{index==0?"":"/"}}{{item}}</em></span>
					</li>
					<li class='introduce' :class="{open:IsOpenJieShao}">
						<strong>简介:</strong><span>{{headerInfo.jieshao}}</span>
					</li>
					<li class='zhankai' :class="{xuanzhuan:IsOpenJieShao}">
						<span @click="IsOpenJieShao=!IsOpenJieShao">></span>
					</li>
				</ul>
			</li>
		</ul>

		<TableList :songList="songList"></TableList>
		<span ref='listId' style='display: none;'>{{$route.params.id}}</span>
	</div>
</template>

<script>
	import '../assets/js/iconfont.js'
	import router from './../router'
	import { getCreateTime, getMinute,getUrlLastPath } from '../common/stringOption'
	import TableList from './table'
	import { getRecommend } from './../api/recommend.js'
	import {mapState,mapMutations,mapGetters,mapAction} from 'vuex'
	export default {
		name: 'friend',
		router,
		props: {
			styleObject: {
				default: function() {
					return {
						height: "570px",
						width: "800px",
						"float": 'right'
					}
				}
			}
		},
		data() {
			return {
				headerInfo: {
					imgUrl: "",
					title: "",
					autor: "",
					createTime: "",
					autorImg: "",
					tag: [],
					jieshao: [],
					subscribedCount:"",
					shareCount:"",
					length:"",
					playCount:""
				},
				songList: [],
				IsOpenJieShao: false
			}
		},
		components: {
			TableList
		},
		mounted() {
			this._getRecommend();
		},
		methods: {
			_getRecommend(id) {
				if(!id){
					id=this.$refs.listId.innerText;
				}
				this.clearList();
				this.songList=[];
				var that = this;
				getRecommend("/api/playlist/detail?id=" + id).then(function(json) {
					var data = json.result;
					that.headerInfo.imgUrl = data.coverImgUrl
					that.headerInfo.title = data.name
					that.headerInfo.autor = data.creator.nickname
					that.headerInfo.autorImg = data.creator.avatarUrl
					that.headerInfo.createTime = getCreateTime(data.createTime)
					that.headerInfo.tag = data.tags
					that.headerInfo.jieshao = data.description
					that.headerInfo.subscribedCount = data.subscribedCount
					that.headerInfo.shareCount = data.shareCount
					that.headerInfo.length = data.tracks.length
					var playCount=data.playCount;
					
					that.headerInfo.playCount = playCount>=10000?(Math.floor(playCount/10000)+"万"):playCount
					var songListInfo = data.tracks
				
					for(var i = 0; i < songListInfo.length; i++) {
						that.songList.push({
							name: songListInfo[i].name,
							id: songListInfo[i].id,
							singer: songListInfo[i].artists[0].name,
							album: songListInfo[i].album.name,
							time: getMinute(songListInfo[i].duration),
							songImgUrl:songListInfo[i].album.blurPicUrl,
							isShow: true
						})
					}
				}, function(error) {
					console.error('出错了', error);
				});
			},
			broadcastAll(){
				this.clearList();
				this.$store.commit("setCurrentIndex",0)
				var that=this;
				this.songList.forEach(function(item,index){
					that.$store.commit("addPlaylist",item)
					that.$store.commit("addQueuelist",item)
				})
			},
			...mapMutations([
				'setCurrentIndex',
				'addPlaylist',
				'addQueuelist',
				'clearList'
			]),
			...mapGetters([
				'currentSong'
			])
		},
		computed:{
			...mapState([
				'currentIndex',
				'playlist'
			])
		},
		watch:{
			'$route'(to,from){
				this._getRecommend(getUrlLastPath(to.path,2));
			}
		}
	}
</script>

<style scoped>
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	
	.wrap {
		overflow-y: auto;
		position:relative;
	}
	.songInfo{
		position:absolute;
		right:20px;
		top:40px;
	}
	ul>li {
		list-style-type: none;
		display: inline-block;
		float: left
	}
	
	.header {
		display: block;
		margin-left: 50px;
		margin-top: 30px;
		height: 250px;
	}
	
	.item-1 img {
		width: 200px;
		height: 200px;
		border: 1px solid #666;
	}
	
	.item-2 {
		margin-left: 30px;
		width: calc(100% - 330px);
		float: left;
	}
	
	.item-2 ul {
		display: block;
	}
	
	.item-2 li .title {
		display: block;
		font-size: 1.5rem;
		text-align: left;
		color: #000
	}
	
	.autor {
		display: block;
		height: 30px;
	}
	
	.autor li:nth-child(2),
	.autor li:nth-child(3) {
		line-height: 30px;
		margin-left: 20px;
	}
	
	.autor li:nth-child(3) {
		color: gray;
		font-size: .8rem
	}
	
	.autor img {
		width: 30px;
		height: 30px;
		border-radius: 100%;
	}
	
	.operate,
	.tag,
	.zhankai {
		margin-top: 10px;
	}
		
		
	.operate button{
		outline: none;
		background-color: #fff;
		border:1px solid gainsboro;
		height:30px;
		padding:0 5px;
		cursor: pointer;
		border-radius: 5px;
		font-size:.8rem;
	}
	.operate li:nth-child(2),
	.operate li:nth-child(3),
	.operate li:nth-child(4)
	{
		margin-left:10px;
	}
	.operate button:hover{
		background-color: rgba(0,0,0,.1)
	}
	.operate button span{
		padding-left: 5px;
	}
	.tag {
		width: 500px;
		text-align: left;
		line-height: 30px;
	}
	
	.tag em {
		font-size: .8rem;
		color: #60A2D6
	}
	
	.introduce {
		text-align: left;
		max-height: 40px;
		overflow: hidden;
		line-height: 20px;
		color: .6rem;
		color: grey;
		transition: all .5s ease-out
	}
	
	.open {
		max-height: 1200px;
	}
	
	.zhankai {
		cursor: pointer;
		color: grey;
		font-size: 1.5rem;
		float: right;
		margin-right: 10px;
		transform: rotate(90deg);
		transition: transform .3s ease-in-out
	}
	
	.xuanzhuan {
		transform: rotate(270deg);
	}
</style>