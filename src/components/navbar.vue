<template>
	<div class='navbar'>
		<div class='logo'></div>
		<div class='btn-left' @click="$router.go(-1);"></div>
		<div class='btn-right' @click="$router.go(1);"></div>
		<div class='search'>
			<input class='search_input' @focus="showList" @blur="closeList" :placeholder="palceholder" />
		</div>
		<ul class='rightset'>
			<li v-for="(item,index) in xlink"><svg class="icon" aria-hidden="true"><use :xlink:href="item"></use></svg></li>
		</ul>
		<myheader class='myheader'></myheader>
	</div>
	
</template>
<script >
	import  '../assets/js/iconfont.js'
	import Myheader from './header.vue'
	export default {
		name:"navbar",
		data(){
			return {
				palceholder:"搜索音乐、歌手、歌词	、用户",
				xlink:["#icon-genghuanpifu",'#icon-youjian','#icon-set','#icon-zuixiaohua','#icon-jianhao','#icon-zuidahua','#icon-x']
			}
		},
		components: {
			Myheader
		},
		methods:{
			showList:function(){
				this.palceholder="";
			},
			closeList:function(){
				this.palceholder="搜索音乐、歌手、歌词、用户";
			}
		}
	}
</script>

<style scoped>
	.navbar{
		width:100%;
		height:55px;
		background-color: #C62F2F;
	}
	.navbar .logo{
		width:200px;
		height:55px;
		background: url('../assets/img/logo.png') ;
		background-size: cover;
		background-repeat: no-repeat;
		display: inline-block;
		float:left;
	}
	.navbar .btn-left,.navbar .btn-right{
		display: inline-block;
		height:25px;
		width:25px;
		border:.1px solid #666;
		float:left;
		margin-top:15px;
		background-size:20px;
		background-position: center;
		background-repeat: no-repeat;
	}
	.navbar .btn-left{
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		border-right: 0px !important;
		background-image: url('../assets/img/pre.png');
		cursor: pointer;
	}
	.navbar .btn-left:active,
	.navbar .btn-right:active{
		padding-top:1px;
	}
	.navbar .btn-right{
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
		background-image: url('../assets/img/next.png');
		cursor: pointer;
	}
	.search{
		display: inline-block;
		float:left;
		margin-top:15px;
		margin-left:10px;
		width:200px;
		height:25px;
	}
	.search input{
		width:100%;
		height:25px;
		background-color: #A82828;
		border: 0;
		padding-left:20px;
		border-radius: 40px;
		color:#FFF;
		font-size:1rem;
		line-height: 1rem;
	}
	.search input::-webkit-input-placeholder {
		color:rgba(255,255,255,.6);
		font-size:.8rem;
		line-height:.8rem;
	}
	.search input:focus{
		outline: none;
	}
	
	.myheader{
		display: inline-block;
		float:right;
		margin:13px 10px 12px 20px;
		height:30px;
	}
	.rightset{
		list-style-type: none;
		float:right;
		height:30px;
		margin:13px 10px 12px 20px;
	}
	.icon {
	   vertical-align: -0.15em;
	   fill: currentColor;
	   overflow: hidden;
	   color:#D56767;
	   height:20px;
	   width:20px;
	   line-height: 30px;
	}
	.rightset li{
		display: inline-block;
		margin:3px;
		cursor:pointer;
	}
	.icon:hover{
		color:#fff;
	}
	.rightset li:nth-child(1) {
		margin-right:10px;
	}
	.rightset li:nth-child(2){
		margin-right:10px;
	}
	.rightset li:nth-child(3){
		margin-right:30px;
	}
	
	.rightset li:nth-child(4) .icon{
		margin-top:-13px!important;
		height:17px;
		width:17px;
	}
	
</style>