<template>
	<div :style="styleObject" class='list' onselectstart="return false">
		<div class='listHeader'>
			<span class='listBtn' :class="{active:!showList}" @click='selectListBtn'>播放列表</span><span class='historyBtn' :class="{active:showList}" @click='selectHistoryBtn'>历史记录</span>
		</div>
		<div class='list_operator'>
				<div>总{{playlist.length}}首歌</div>
		</div>
		<ul class='list_content' >
			<li v-for="(item,index) in (!showList?playlist:playHistory)" class='list_item' @click="broadcast(index)">
				<div class='list_item4' ><div v-show="index===currentIndex&&!showList"></div></div><div class='list_item1'>{{item.name}}</div><div class='list_item2'>{{item.singer}}</div><div class='list_item3'>{{item.time}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapGetters, mapAction } from 'vuex'
	export default{
		name:'songlist',
		props:{
			styleObject:{
				default:function(){
					return {
						"width":"100px",
						"height":"119px",
						"color":"yellow"
					}
				}
			}
		},
		data(){
			return {
				showList:false
			}
		},
		methods:{
			broadcast(index){
				if(this.showList){
					this.HistoryFoundInPlay(index);
					return ;
				}
				this.$store.commit("setCurrentIndex",index)
			},
			selectListBtn(){
				this.showList=false;
			},
			selectHistoryBtn(){
				this.showList=true;
			},
			...mapMutations([
				'setCurrentIndex',
				'addPlaylist',
				'addQueuelist',
				'clearList',
				'HistoryFoundInPlay'
			])
		}
		,
		computed: {
			...mapState([
				'playing',
				'currentIndex',
				'playlist',
				'mode',
				'playHistory'
			])
		}
	}
</script>

<style scoped>
	.list{
		box-shadow: -1px -1px 1px gainsboro;
		border:1px solid gainsboro;
		border-bottom: 0;
		background-color: #fff;
		box-sizing: border-box;
		z-index: 10001;
		padding-bottom: 0;
		overflow: hidden;
	}
	.listHeader{
		height:30px;
		width:100%;
		background-color: #F4F4F6;
		padding-top:10px;
		padding-bottom:10px;
	}
	.listBtn,.historyBtn{
		display: inline-block;
		line-height:30px;
		height:30px;	
		width: 100px;
		border:1px solid gainsboro;
		color:gray;
		cursor: pointer;
	}
	.listBtn{
		border-top-left-radius: 5px;;
		border-bottom-left-radius: 5px;;
	}
	.historyBtn{
		border-top-right-radius: 5px;;
		border-bottom-right-radius: 5px;;
	}
	.listHeader .active{
		background-color: gray;
		color:#fff;
	}
	.list_operator{
		height:35px;
	}
	.list_content{
		text-align: left;
		overflow: hidden;
		overflow-y: auto;
		height:calc(100% - 80px);
	}
	.list_content li{
		width:100%;
		height:30px;
	}
	.list_content li>div{
		line-height: 30px;
		display: inline-block;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    font-size: .8rem;
	    position:relative;
	}
	.list_item{
		width:100%;
	}
	.list_item4{
		width:5%;
		position: relative;
		padding-bottom: 10px;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.list_item4 div{
		width: 0;
	    height: 0;
	    border-top: 5px solid transparent;
	    border-left: 10px solid #C62F2F;
	    border-bottom: 5px solid transparent;
	}
	.list_item1{
		width:50%;
	}
	.list_item2{
		width:30%;
	}
	.list_item3{
		width:10%;
	}
	.list_item:nth-child(odd){
		background-color: #F5F5F7;
	}
	.list_item:nth-child(even){
		background-color: #FAFAFA;
	}
	.list_item:hover{
		background-color: #EBECED;
	}
	
	.list_content::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.list_content::-webkit-scrollbar-track {
		/*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
		border-radius: 10px;
		background-color:rgba(255,255,255,1);
		/*background-color: steelblue;*/
	}
	/*定义滑块，内阴影及圆角*/
	
	.list_content::-webkit-scrollbar-thumb {
		width: 1px;
		height: 10px;
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: rgba(0, 0, 0, .1)
	}
	.list_content::-webkit-scrollbar-thumb:hover{
		background-color: rgba(0, 0, 0, .2)
	}
</style>