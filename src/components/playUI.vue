<template>
	<div>
		<div class='miniWrap' v-show="!IsFullScreen&&currentIndex!=-1" @mouseover="openIconShow=true" @mouseout="openIconShow=false" @click='openFullScreen'>
			<div class='img'>
				<img :src="currentIndex!=-1?getSongImgUrl():''" alt="" />
				<svg class="icon openIcon" aria-hidden="true" v-show="openIconShow">
					<use xlink:href="#icon-zuidahua2"></use>
				</svg>
			</div>
			<div class='songInfo'>
				<p :title="getSongName()">{{getSongName()}}</p>
				<p :title="getSingerName()">{{getSingerName()}}</p>
			</div>
		</div>
		<transition name='fade'>
			<div class='fullscreen' v-show='IsFullScreen'>
				<div class='background'>
					 <img width="100%" height="100%" :src="currentIndex!=-1?getSongImgUrl():''">
				</div>
				<div class='imgRound'>
					 <div class='imgWrap play':class="{pause:!playing}">
					 	<img  :src="currentIndex!=-1?getSongImgUrl():''">
					 </div>
				</div>
				<div class='lyricWrap'>
					<h2>{{currentIndex==-1?"":currentSong().name}}</h2>
					<span>歌手：{{currentIndex==-1?"":currentSong().singer}}</span>
					<span>专辑：{{currentIndex==-1?"":currentSong().album}}</span>
					<div class="lyric" ref='lyricDiv'>
						<div v-for="(item,index) in lyricArr" :class='item.className' >
							<p v-if="item.lyric.length">
								{{item.lyric}}
							</p>
							<div v-else style='height:30px;'>
							</div>
							
						</div>
					</div>
				</div>
				
				<div class='suoxiaoBtn' @click="closeFullScreen">
					<svg class="icon " aria-hidden="true" >
						<use xlink:href="#icon-zuixiaohua"></use>
					</svg>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapAction } from 'vuex'
	import { getRecommend } from './../api/recommend.js'
	import '../assets/js/iconfont.js'
	import {addClass,removeClass,HasKey} from '../common/dom.js'
	export default {
		data() {
			return {
				openIconShow: false,
				lyricArr:[]
			}
		},
		mounted(){
			
		},
		methods: {
			showLyric(lyric){
				this.lyricArr=[];
				var num=lyric.split('\n');
				var that=this;
				for(let i=0;i<num.length;i++){
					this.lyricArr.push({
						className:"lyric"+i,
						time:that.getTime(num[i].substr(num[i].indexOf('[')+1,num[i].indexOf(']')-1)),
						lyric:num[i].substr(num[i].indexOf(']')+1)
					})
					
				}
			},
			getTime(str){
				var a=str.split(':');
				var time=parseInt(a[0])*60+parseInt(a[1]);
				return time;
			},
			openFullScreen() {
				this.setFullScreen(true);
			},
			closeFullScreen() {
				this.setFullScreen(false);
			},
			...mapGetters([
				'getSongImgUrl',
				'getSongName',
				'getSingerName'
			]),
			...mapMutations([
				'setFullScreen'
			]),
			...mapGetters([
				'currentSong'
			])
		},
		computed: {
			...mapState([
				'currentIndex',
				'IsFullScreen',
				'playing',
				'lyric',
				'songTime'
			])
		},
		watch:{
			currentIndex(){
				var that=this;
				getRecommend("/lyric?id="+this.currentSong().id+"&lv=-1&kv=-1&tv=-1" ).then(function(json) {
					if(HasKey(json.lrc,'lyric')){
						that.showLyric(json.lrc.lyric);
					}else{
						that.showLyric("获取不到歌词");
					}
					
				}, function(error) {
					console.error('出错了', error);
				});
				console.log(this.currentSong());
			},
			songTime(){
				var t=parseInt(this.songTime);
				var num=this.lyricArr;	
				var that=this;
				
				for(let i=0;i<num.length-1;i++){
					if(num[i].time<=t&&num[i+1].time>=t&&num[i].lyric!=""){
						if(document.getElementsByClassName('active')[0])
							removeClass(document.getElementsByClassName('active')[0],'active');
						addClass(document.getElementsByClassName("lyric"+i)[0],'active');
//						console.log(document.getElementsByClassName("active")[0].offsetTop);
//						console.log(that.$refs.lyricDiv.scrollTop);
//						console.log(that.$refs.lyricDiv.scrollHeight);
						var x=document.getElementsByClassName("active")[0].offsetTop-200;
						
						that.$refs.lyricDiv.scrollTop=x;
//						this.$refs.lyricDiv.scrollTop=document.getElementsByClassName("active")[0].offsetTop-this.$refs.lyricDiv.scrollTop
					}
				}
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
	
	.miniWrap {
		height: 60px;
		border: 1px solid gainsboro;
		box-sizing: border-box;
		background-color: #FFF;
	}
	
	.img {
		float: left;
	}
	
	.img img {
		height: 60px;
		width: 60px;
	}
	
	.openIcon {
		position: absolute;
		top: 0px;
		left: 0px;
		padding: 10px;
		width: 40px;
		height: 40px;
		color: #fff;
		background-color: rgba(0, 0, 0, .5);
		cursor: pointer;
	}
	
	.songInfo {
		float: left;
		width: 140px;
		box-sizing: border-box;
	}
	
	.songInfo p {
		padding-left: 10px;
		line-height: 30px;
		text-align: left;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    cursor: default;
	}
	.active{
		color:#fff;
	}
	.fullscreen{
		position:absolute;
		z-index: 1111;
		bottom:0px;
		left:0px;
		width:1000px;
		height:570px;
		background-color: #fff;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
	}
	
	.fade-enter, .fade-leave-to {
		width:60px;
		height:60px;
		opacity: 0;
	}
	.background{
		position: absolute;
        left: 0;
        top: 0;
        width: 90%;
        height: 90%;
        z-index: -1;
        opacity: .3;
        filter: blur(10px);
	}
	.imgRound{
		float: left;
		width:50%;
		height:100%;
	}
	.imgRound .imgWrap{
		padding:calc(50% - 150px);
		width:50%;
		border-radius: 50%;
	}
	.imgWrap img{
		width:100%;
		height:100%;
		max-width:250px;
		max-height:250px;	
	}
	.imgRound  .play{
		 animation: rotate 20s linear infinite ;
	}
	.imgRound  .pause{
		animation-play-state: paused;
	}
	.imgRound .imgWrap img{
		box-sizing: border-box;
		border-radius: 50%;border: 30px solid #000;
	}
	.lyricWrap{
		float: left;
		width:50%;
		height:100%;
		text-align: left;
	}
	.lyricWrap h2{
		margin-top:10px;
	}
	.lyric{
		width:80%;
		padding-bottom:80%;
		height:0px;
		overflow: auto;
		overflow-x: hidden;
		margin-top:30px;
	}
	.lyric p{
		height:40px;
	}
	.suoxiaoBtn{
		position: absolute;
		right:30px;
		top:30px;
		width:40px;
		height:20px;
		background-color: #fff;
		color:#000;
		padding:5px;
		border-radius: 5px;
		border:1px solid rgba(0,0,0,.3);
		cursor: pointer;
	}
	.suoxiaoBtn svg{
		width:30px;
		height:20px;
	}
	.lyric::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.lyric::-webkit-scrollbar-track {
		/*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
		border-radius: 10px;
		/*background-color: steelblue;*/
	}
	/*定义滑块，内阴影及圆角*/
	
	.lyric::-webkit-scrollbar-thumb {
		width: 1px;
		height: 10px;
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: rgba(0, 0, 0, .1)
	}
	.lyric::-webkit-scrollbar-thumb:hover{
		background-color: rgba(0, 0, 0, .2)
	}
	@keyframes rotate{
		0%{
			transform: rotate(0deg);
		}
		0%{
			transform: rotate(-360deg);
		}
	}
</style>