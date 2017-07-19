<template>
	<div :style="styleObject" class='player'>
		<div class='btngrounp '>
			<svg class="icon previcon" :style="themeColor" aria-hidden="true" @click="prevSong">
				<use xlink:href="#icon-shangyishou"></use>
			</svg>
			<svg v-show="playing" :style="themeColor" @click='StopMusic' class="icon bofang" aria-hidden="true">
				<use xlink:href="#icon-zanting"></use>
			</svg>
			<svg v-show="!playing" :style="themeColor" @click="broadcastMusic" class="icon bofang" aria-hidden="true">
				<use xlink:href="#icon-CombinedShape"></use>
			</svg>
			<svg class="icon nexticon" :style="themeColor" @click="nextSong" aria-hidden="true">
				<use xlink:href="#icon-xiayishou"></use>
			</svg>
		</div>
		<!--{{currentIndex}}-->
		<!--<audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>-->

		<div class='timeshow'>{{audioInfo.TimeNow}}</div>
		<div class='progressWrap'>
			<progressBar  :percent="percent()" @percentChange="onProgressBarChange" @percentChange3="changeTimeNow"></progressBar>
		</div>
		<div class='timeshow'>{{audioInfo.durTime}}</div>
		<div class='voiceIcon'>
			<svg  @click="broadcastMusic" class="icon " aria-hidden="true">
				<use xlink:href="#icon-shengyin-copy"></use>
			</svg>
		</div>
		<div class='voice'>
			<progressBar  :percent="vioceRercent()" @percentChange2="vioceOnProgressBarChange" @percentChange="vioceOnProgressBarChange"></progressBar>
		</div>
		<div class='playMode' :title="playModeExplain[mode]">
			<svg class="icon ModeIcon"  @click='changeMode'aria-hidden="true">
			  <use :xlink:href="playModeNum[mode]"></use>
			</svg>
		</div>
		<div class='listMenu' >
			<div class='tubiao'><svg  class="icon listIcon" aria-hidden="true" @click="openSongList">
			  <use xlink:href="#icon-menu"></use>
			</svg></div>
			<div class='listnum' title="打开播放列表" @click="openSongList">{{playlist.length}}</div>
		</div>
		<songList v-bind="ListSetting" v-show="IsShowSonglist"></songList>
		<audio ref="audio" :src="audioInfo.src"  @canplay="ready" @timeupdate="timeUpdate" @ended="MusicOver"></audio>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapAction } from 'vuex'
	import '../assets/js/iconfont.js'
	import { getRecommend } from './../api/recommend.js'
	import progressBar from './progress-bar'
	import { getMinuteS } from './../common/stringOption.js'
	import songList from './songlist'
	export default {
		name: "Player",
		components: {
			progressBar,songList
		},
		props: {
			styleObject: {
				default: function() {
					return {
						height: "55px",
						width: "1000px",
						"position":"relative"
					}
				}
			},
			themeColor: {
				default() {
					return {
						"color": "#E83C3C"
					}
				}
			}
		},
		data() {
			return {
				audioInfo: {
					src: "",
					durTime: "00:00",
					TimeNow: "00:00",
					volumn: ""
				},
				playModeNum:['#icon-ttpodicon-copy','#icon-suiji','#icon-danquxunhuan'],
				playModeExplain:['列表播放','随机播放','单曲播放'],
				ListSetting:{
					styleObject:{
						"position":"absolute",
						"right":'0px',
						"bottom":"55px",
						"width":"530px",
						"height":"480px",
					}
				}
			}
		},
		mounted() {},
		methods: {
			broadcastMusic(e) {
				if(this.currentIndex == -1) {
					return;
				}
				this.$store.commit('startmusic');
				this.$refs.audio.play();

			},
			StopMusic(e) {
				this.$store.commit('stopmusic');
				this.$refs.audio.pause();
			},
			timeUpdate(e) {
				this.audioInfo.TimeNow = getMinuteS(this.$refs.audio.currentTime);
				this.setSongTime(parseInt(this.$refs.audio.currentTime));
			},
			MusicOver(){
				this.nextSong();
			},
			ready(e) {
				this.$refs.audio.play();
				this.startmusic();
				this.audioInfo.durTime = getMinuteS(this.$refs.audio.duration);
			},
			onProgressBarChange(percent) {
				const currentTime = this.$refs.audio.duration * percent
				this.$refs.audio.currentTime = currentTime
				if(!this.playing) {
					this.broadcastMusic()
				}
			},
			vioceOnProgressBarChange(percent) {
				this.$refs.audio.volume=percent
			},
			percent() {
				if(this.currentIndex == -1) {
					return 0;
				}
				return this.$refs.audio.currentTime / this.$refs.audio.duration
			},
			vioceRercent(){
				if(this.currentIndex == -1) {
					return 0;
				}
				return this.$refs.audio.volume;
			},
			changeTimeNow(percent){
				const currentTime = this.$refs.audio.duration * percent
				this.audioInfo.TimeNow = getMinuteS(currentTime);
			},
			prevSong() {
				this.$store.commit('changeCurrIndex', -1);
			},
			nextSong() {
				this.$store.commit('changeCurrIndex', 1);
			},
			changeMode(){
				this.changePlayMode();
			},
			openSongList(){
				this.changeIsShowSonglist();
			},
			...mapMutations([
				'stopmusic',
				'startmusic',
				'changeCurrIndex',
				'changePlayMode',
				"changeIsShowSonglist",
				'addHistoryList',
				'changeLyric',
				'setSongTime'
			]),
			...mapGetters([
				'currentSong'
			])
		},
		computed: {
			...mapState([
				'playing',
				'currentIndex',
				'playlist',
				'mode',
				'IsShowSonglist',
				'playHistory',
				'lyric',
				'songTime'
			])
		},
		watch: {
			currentIndex() {
				var that = this;
				that.$store.commit('addHistoryList');
				getRecommend("/newapi/music/url?id=" + this.currentSong().id).then(function(json) {
					that.audioInfo.src = json.data[0].url;
				}, function(error) {
					console.error('出错了', error);
				});
				
			}
		}
	}
</script>

<style scoped>
	.icon {
		width: 35px;
		height: 35px;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		line-height: 55px;
		display: inline-block;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		margin-top: 10px;
	}
	
	.player {
		clear: both;
		box-shadow: 0 0 5px gainsboro;
		box-sizing: border-box;
		position:relative;
	}
	
	.btngrounp {
		height: 55px;
		width: 200px;
		display: inline-block;
		float: left;
	}
	
	.progressWrap {
		display: inline-block;
		float: left;
		width: 400px;
		height: 55px;
		margin-top: 13px;
		margin-left: 20px;
		margin-right: 10px;
	}
	
	.voice {
		display: inline-block;
		float: left;
		width: 80px;
		height: 55px;
		margin-top: 13px;
		margin-left: 20px;

	}
	.playMode{
		display: inline-block;
		margin-left:20px;
		float: left;
		height: 20px;
		cursor: pointer;
		margin-top:17px;
	}
	.ModeIcon{
		margin:0;
		padding:0;
		width:20px;
		height:20px;
	}
	.listMenu{
		display: inline-block;
		margin-right:10px;
		margin-top: 0px!important;
		float: right;
		height: 55px;
	}
	.listMenu .tubiao{
		width:20px;
		height:20px;
		line-height:20px;
		text-align: left;
		margin-top:18px;
		float: left;
		
	}
	.listIcon{
		width:100%;
		height:100%;
		margin:0;
		padding:0;
		cursor: pointer;
	}
	.listMenu .listnum{
		box-sizing: border-box;
		margin-left:16px;
		width:40px;
		height:20px;
		line-height:20px;
		text-align: left;
		padding-left:10px;
		margin-top:18px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		background-color: #E1E2E2;
		cursor: pointer;
	}
	
	.voiceIcon {
		display: inline-block;
		float: left;
		width: 40px;
		height: 55px;
	}
	
	.voiceIcon .icon {
		margin-top: 15px;
		width: 25px;
		height: 25px;
		color: grey;
	}
	
	.voiceIcon .icon:hover {
		color: gray!important;
	}
	
	.timeshow {
		display: inline-block;
		float: left;
		line-height: 55px;
		font-size: .8rem;
	}
	
	.btngrounp .icon:hover {
		color: #D33030!important;
	}
	
	.bofang {
		transform: scale(1.15);
	}
	
	.previcon {
		margin-right: 20px;
	}
	
	.nexticon {
		margin-left: 20px;
	}
</style>