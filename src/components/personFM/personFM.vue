<template>
	<div :style="styleObject">
		<div class='fm'>
			<div class='fmHeader'>
				<ul class='zhaopian'>
					<!--<li ><img :src="playlist[currentIndex].songImgUrl" alt="" /></li>-->
					<li v-for='(item,index) in playlist' 
						v-show="(currentIndex-index>=1||currentIndex-index<=1)&&(index<playlist.length)"
						:class="move[index]">
						<img :src="playlist[index].songImgUrl" alt="" />
					</li>
				</ul>
			</div>
			<div class='fmlyric'></div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations,mapGetters,mapAction} from 'vuex'
	import { getRecommend } from './../../api/recommend.js'
	import { getCreateTime, getMinute,getUrlLastPath } from '../../common/stringOption'
	export default {
		name: 'personFM',
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
		data(){
			return {
				move:['first','wait','wait']
			}
		},
		created: function() {
			this.clearList();
			this.init();
		},
		methods: {
			init(){
				var that=this;
				getRecommend("/personal_fm").then(function(json) {
					var data=json.data;
					for(var i=0;i<data.length;i++){
						that.addPlaylist({
							name: data[i].name,
							id: data[i].id,
							singer: data[i].artists[0].name,
							album: data[i].album.name,
							time: getMinute(data[i].duration),
							songImgUrl:data[i].album.picUrl,
							isShow: true
						})
					}
					that.setCurrentIndex(0);
				}, function(error) {
					console.error('出错了', error);
				});
			},
			...mapMutations([
				'setCurrentIndex',
				'addPlaylist',
				'addQueuelist',
				'clearList',
				'setFMFlag'
			]),
			...mapGetters([
				'currentSong'
			])
		},
		computed: {
			...mapState([
				'currentIndex',
				'playlist',
				'IsFMPlay'
			])
		},
		watch:{
			currentIndex(newIndex,oldIndex){
				if(oldIndex!=-1){
					if(newIndex>oldIndex){
						console.log(this.move);
						this.move[newIndex]	='center';
						this.move[newIndex-1]='left';
						console.log(this.move);
					}else{
						this.move[newIndex]	='first';
						this.move[newIndex+1]='wait';
					}
				}
			}
			
		}
	}
</script>

<style scoped>
	.fm {
		width:600px;
		margin:auto;
	}
	.zhaopian{
		margin-top: 50px;
		width:300px;
		height:300px;
		position:relative;
		overflow: hidden;

	}
	.zhaopian li{
		position:absolute;
		left:0%;
		height:100%;
		width:100%;
		transition: all .5s;
	}
	.zhaopian img{
		height:100%;
		width:100%;	
	}
	.zhaopian .first{
		left:0;
	}
	.zhaopian .left{
		left:-30px;
		transform: scaleY(.8);
	}
	.zhaopian .center{
		left:30px;
		width:calc(100% - 30px)
	}
	.zhaopian .wait{
		left:100%;
	}
</style>