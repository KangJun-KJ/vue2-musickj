<template>
	<div class='wrap' :style="styleObject">
		<div class='btngrounp'>
			<button class='selectBtn active' @click="addActiveClass">歌曲列表</button>
			<button class='selectBtn' @click="addActiveClass">评论</button>
			<button class='selectBtn' @click="addActiveClass">收藏</button>
			<input class='input' type="text" @keyup="filterData" placeholder="搜索歌单音乐" />
		</div>
		<div class='line'></div>
		<ul class='table' >
			<li class='tableheader'>
				<div>操作</div>
				<div>操作</div>
				<div>音乐标题</div>
				<div>歌手</div>
				<div>专辑</div>
				<div>时长</div>
			</li>
			<li class='tablebody 'onselectstart="return false;" v-for='(item ,index) in songList' v-show="item.isShow" @click="chooseLi"  @dblclick="broadcast(index)">
				<div>{{++index<=9?"0"+index:index}}</div>
				<div>操作</div>
				<div :title="item.name" >{{item.name}}</div>
				<div :title="item.singer">{{item.singer}}</div>
				<div :title="item.album">{{item.album}}</div>
				<div :title="item.time">{{item.time}}</div>

			</li>
			<li>
				<loading v-show="!songList.length"></loading>
			</li>
		</ul>
	</div>
</template>

<script>
	import { addClass, removeClass } from '../common/dom.js'
	import loading from './loading'
	import {mapState,mapMutations,mapGetters,mapAction} from 'vuex'
	export default {
		name: 'TableList',
		props: {
			styleObject: {
				default: function() {
					return {
						width: "800px",
						"float": 'right'
					}
				}
			},
			songList: {
				default: function() {
					return []
				}
			}
		},
		components: {
			loading
		},
		mounted: function() {
			console.log(this.songList);
		},
		methods: {
			addActiveClass(e) {
				this.addClassFn(e.target,'active')
			},
			addClassFn(el,className){
				var lastActiveEl = document.getElementsByClassName(className)[0]
				if(lastActiveEl) {
					removeClass(lastActiveEl, className);
				}
				addClass(el, className);
			},
			chooseLi(e){
				this.addClassFn(e.target.parentNode,'clickactive')
			},
			broadcast(index){
				this.clearList();
				this.$store.commit("setCurrentIndex",index-1)
				var that=this;
				this.songList.forEach(function(item,index){
					that.$store.commit("addPlaylist",item)
					that.$store.commit("addQueuelist",item)
				})
				
			},
			filterData(e){
				var keyStr=e.target.value.toLowerCase();
				var num=this.songList;
				for(let i=0;i<num.length;i++){
					if(num[i].name.toLowerCase().indexOf(keyStr)<0&&num[i].singer.toLowerCase().indexOf(keyStr)<0&&num[i].album.toLowerCase().indexOf(keyStr)<0){
						num[i].isShow=false;
					}else{
//						num[i].name="<strong>"+num[i].name+"</strong>"
						num[i].isShow=true;
					}
				}
			},
			...mapMutations([
				'setCurrentIndex',
				'addPlaylist',
				'addQueuelist',
				'clearList'
			])
		}
	}
</script>

<style scoped>
	.wrap {
		position: relative;
	}
	
	.btngrounp {
		width: 800px;
		height: 30px;
	}
	
	.line {
		height: 1px;
		width: 800px;
		background-color: red;
		font-size: 0;
	}
	.input{
		outline: none;
		border:1px solid gainsboro;
		width:200px;
		float:right;
		border-radius: 10px;
		height: 25px;
		box-sizing: border-box;
		padding-left:20px;
		padding-right: 30px;
		color:#222;
		font-size:1rem;
		position:absolute;
	}
	.input::-webkit-input-placeholder{
		color:gray
	}
	.selectBtn {
		height: 30px;
		width: 100px;
		float: left;
		color: #111;
		border: 1px solid gainsboro;
		border-bottom: 0;
		background-color: #FFF;
		display: inline-block;
		box-sizing: border-box;
		outline: none;
		cursor: pointer;
		margin-left: 10px;
	}
	
	.selectBtn:nth-child(1) {
		margin-left: 50px;
	}
	
	.selectBtn:hover {
		background-color: gainsboro
	}
	
	.active {
		background-color: #C62F2F;
		column-rule: ;
		color: #fff;
	}
	
	.active:hover {
		background-color:#C62F2F;
	}
	
	.table {
		width: 100%;
		overflow: hidden;
	}
	
	.tableheader {
		width: 800px;
		height: 30px;
	}
	
	.tableheader div {
		height: 30px;
		line-height: 30px;
		display: inline-block;
		float: left;
		box-sizing: border-box;
		text-align: left;
		padding-left: 10px;
		border-right: 1px solid gainsboro;
		border-bottom: 1px solid gainsboro;
		
	}
	
	.tableheader div:hover {
		background-color: rgba(0, 0, 0, .1);
	}
	
	.tableheader div:active {
		background: linear-gradient(gainsboro, #fff);
	}
	
	.tableheader div:nth-child(1),
	.tablebody div:nth-child(1) {
		width: 10%
	}
	.tablebody div:nth-child(1){
		text-align: right;
		padding-right: 10px;
	}
	.tableheader div:nth-child(2),
	.tablebody div:nth-child(2) {
		width: 10%
	}
	
	.tableheader div:nth-child(3),
	.tablebody div:nth-child(3) {
		width: 30%;
		color:#5F5F5F
	}
	
	.tableheader div:nth-child(4),
	.tablebody div:nth-child(4) {
		width: 20%;
		
	}
	
	.tableheader div:nth-child(5),
	.tablebody div:nth-child(5) {
		width: 20%
	}
	
	.tableheader div:nth-child(6),
	.tablebody div:nth-child(6) {
		width: 10%;
		border-right: 0;
	}
	
	.tablebody {
		width: 800px;
		height:30px;
	}
	
	.tablebody div {
		height: 30px;
		line-height: 30px;
		display: inline-block;
		float: left;
		box-sizing: border-box;
		text-align: left;
		padding-left: 10px;
		border-right: 1px solid gainsboro;
		border-bottom: 1px solid gainsboro;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color:#777
	}
	.tablebody:nth-child(even) {
		background-color: #FAFAFA;
	}
	.tablebody:nth-child(odd) {
		background-color: #F5F5F7;
	}
	.tablebody:hover{
		background-color: #EBECED;
	}
	.clickactive{
		background-color: #E3E3E5!important;
	}
	.clickactive div{
		color:#000  !important;		
	}
	
	
</style>