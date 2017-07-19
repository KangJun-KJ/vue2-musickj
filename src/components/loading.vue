<template>
	<div class="loading">
		<img width="24" height="24" src="../assets/img/loading.gif">
		<span class="desc">{{title}}</span>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: '载入中...'
			}
		}
	}
</script>
<style>
	.loading {
		margin-top:30px;
		width: 100% ;
		text-align: center;
		height:24px;
		position:relative
	}
	.loading img{
		display: block;
		line-height: 24px;
		position:absolute;
		top:0;
		left:calc(50% - 24px);
		height:24px;
		width:24px;
	}
	.loading .desc {
		display: block;
		position:absolute;
		top:0;
		left:50%;
		height:24px;
		color: #000;
		line-height: 24px;
		font-size:small;
	}
</style>