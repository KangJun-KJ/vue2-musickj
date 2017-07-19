<template>

		<div>
			<img class='img' src="../assets/img/header.png"/>
			<span class='span'>KJBU2
			<em></em></span>
		</div>

</template>

<script>
	export default {
		name:'Myheader'
	}
</script>

<style scoped>
	.img{
		width:30px;
		height:30px;
		border-radius: 100%;
		margin:0;
		padding:0;float:left;
		
	}
	.span{
		line-height:30px;
		padding-left:5px;	
		color:rgba(255,255,255,.7);
		cursor: pointer;
	}
	.span em{
		margin-top:13px;
		
		margin-left:5px;
		float:right;
		width: 0;
	    height: 0;
	    border-left: 5px solid transparent;
	    border-right: 5px solid transparent;
	    border-top: 5px solid rgba(255,255,255,.7);
	}
	.span:hover{
		color:rgba(255,255,255,1)
	}
	.span:hover em{
		border-top: 5px solid rgba(255,255,255,1);
	}
</style>