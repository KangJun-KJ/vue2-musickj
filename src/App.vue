<template>
	<div id="app">
		
		<navbar></navbar>
		<!---->
		<leftMenu v-bind="leftSeting"></leftMenu>
		<playUI style='position:absolute;bottom:55px;left:0;'></playUI>
		<router-view ></router-view>
		<Palayer></Palayer>
		
	</div>
</template>

<script>
	
	import Navbar from './components/navbar'
	import leftMenu from './components/leftMenu'
	import Palayer from './components/Palayer'
	import playUI from './components/playUI'
	export default {
		name: 'app',
		components: {
			Navbar,leftMenu,Palayer,playUI
		},
		data() {
			return {
				leftSeting:{
					styleObject:{
						width:200,
						height:570,
						"background-color":"#F5F7F7",
						'float':'left'
					}
				}
			}
		}
	}
</script>

<style scoped>
	@import url("assets/css/reset.css");
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height:680px;
		width:1000px;
		box-shadow: 0 0 15px #A9A9A9;
		margin:auto;
		position: relative;
	}
	
	.header {
		height: 340px;
		background-color: #159957;
		background-image: linear-gradient(120deg, #155799, #159957);
		padding: 140px 0;
		color: white;
		font-weight: bolder;
		font-size: 3rem;
	}
	
	.content {
		margin: 0 auto;
		width: 750px;
	}
	
	.btn {
		text-decoration: none;
		box-sizing: content-box;
		font-size: 1.1rem;
		display: inline-block;
		margin-bottom: 1rem;
		color: rgba(255, 255, 255, 0.7);
		background-color: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
		border-style: solid;
		border-width: 1px;
		border-radius: 0.3rem;
		transition: color 0.2s, background-color 0.2s, border-color 0.2s;
		padding: 0.75rem 1rem;
	}
	
	.btn:hover {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		background-color: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
	}
	
	.innlineblock {
		display: inline-block;
	}
	
	.code {
		text-align: left;
		background-color: rgb(51, 51, 51);
		color: #ffd400;
		font-weight: bold;
		font-size: 1.2rem;
	}
	
	.keyword {
		color: #2ecc71;
	}
	
	.white {
		color: white;
	}
	
	pre {
		padding: 0px;
	}
	
	.item {
		background-color: white;
		box-shadow: 0px 5px 100px black;
		padding: 10px 0px;
		margin: 20px 0;
	}
	
	.item h1 {
		padding: 10px 30px;
		text-align: left;
		color: #f05b72;
	}
	
	.start h1 {
		margin: 20px 0px;
	}
	
	.start h2 {
		text-align: left;
		margin: 10px 0;
	}
	
	.gray {
		color: rgb(224, 224, 224);
	}
	
	.example {
		margin: 50px 0;
	}
	.wrap::-webkit-scrollbar {
		width: 7px;
		height: 16px;
		background-color: #f5f5f5;
	}
	/*定义滚动条的轨道，内阴影及圆角*/
	
	.wrap::-webkit-scrollbar-track {
		/*-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
		border-radius: 10px;
		background-color:rgba(255,255,255,1);
		/*background-color: steelblue;*/
	}
	/*定义滑块，内阴影及圆角*/
	
	.wrap::-webkit-scrollbar-thumb {
		width: 1px;
		height: 10px;
		border-radius: 2px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		background-color: rgba(0, 0, 0, .1)
	}
	.wrap::-webkit-scrollbar-thumb:hover{
		background-color: rgba(0, 0, 0, .2)
	}
</style>