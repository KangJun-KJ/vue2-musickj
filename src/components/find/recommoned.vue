<template>
	<div class='warp'>
		<slider></slider>
		<div class='typeLine'>
			<span>推荐歌单</span>
			<span>更多></span>
		</div>
		<RectInfo v-for="item in gedanInfo" :info="item"></RectInfo>
		
		<div class='typeLine' style="margin-top:480px!important;">
			<span>独家放送</span>
			<span>更多></span>
		</div>
		<div class='recommend'>
			<img src="../../assets/img/R1.png" alt="" />
			<p>2017快乐男生最新视频集锦，快来围观！</p>
		</div>
		<div class='recommend'>
			<img src="../../assets/img/R2.png" alt="" />
			<p>网易云音乐 第74期 云村音乐人 第一届花式起歌名交流会</p>
		</div>
		<div class='recommend'>
			<img src="../../assets/img/R3.png" alt="" />
			<p>独家专访 陶晶莹：歌迷给我续航的能力</p>
		</div>
		<div class='typeLine' style='margin-top:280px;'>
			<span>推荐MV</span>
			<span>更多></span>
		</div>
		<div class='recommend mvRect'>
			<img src="../../assets/img/M1.png" alt="" />
			<p>因你</p>
			<p>陈伟霆</p>
		</div>
		<div class='recommend mvRect'>
			<img src="../../assets/img/M2.png" alt="" />
			<p>绣蠢</p>
			<p>谭维维</p>
		</div>
		<div class='recommend mvRect'>
			<img src="../../assets/img/M3.png" alt="" />
			<p>瞬间</p>
			<p>G.E.M.邓紫棋</p>
		</div>
	</div>
</template>

<script>
	import Slider from './../slider'
	import RectInfo from './rectInfo'
	import { getRecommend, getJSON } from './../../api/recommend.js'
	export default {
		name: 'recommoned',
		components: {
			Slider,RectInfo
		},
		data() {
			return {
				gedanInfo:[{
					imageUrl: 'http://p1.music.126.net/UQU3GlUZXZZWeS0WY6mlTA==/109951162851721668.jpg?param=140y140',
					title: '|欧美男团| 从小鲜肉到大叔，你还在吗？',
					url: '/listDetail/519500448',
					num: '44万',
					content: '编辑推荐：回忆杀-多少人曾爱慕你年轻时'
				},{
					imageUrl: 'http://p1.music.126.net/HZDCuuF2G3kLaWuvbcvL_Q==/18493785581171025.jpg?param=140y140',
					title: '粤语丨 岁月流情，回味旧日的浪漫故事',
					url: '/listDetail/803927975',
					num: '58万',
					content: '编辑推荐：浩瀚烟波里，怀念昨日梦幻岁月'
				},{
					imageUrl: 'http://p1.music.126.net/pF3q4LdsuLZxrNJWRM3c0w==/18922595114259153.jpg?param=140y140',
					title: '求雨专用｜让开，我要召唤雨神了',
					url: '/listDetail/786922652',
					num: '24万',
					content: '编辑推荐:过个凉爽的三伏天'
				},{
					imageUrl: 'http://p3.music.126.net/4DdXeHzMc3GiPDo9PFre1A==/3446968955860705.jpg?param=140y140',
					title: '超高人气韩国舞曲',
					url: '/listDetail/395962354',
					num: '64万',
					content: '根据你收藏的歌单《尹素婉直播歌单》推荐'
				},{
					imageUrl: 'http://p1.music.126.net/Oyv1qWClyXkSR4PQIqqxog==/18693896697412613.jpg?param=140y140',
					title: '精选集丨『全球十大顶级配乐公司』',
					url: '/listDetail/781200517',
					num: '175万',
					content: '根据你喜欢的单曲《Make it with you》推荐'
				},{
					imageUrl: 'http://p1.music.126.net/YGSqAZdp4rSSSK6jcZcAIg==/109951162958010906.jpg?param=140y140',
					title: '请问你有freestyle吗？',
					url: '/listDetail/777915656',
					num: '656万',
					content: '请问你有freestyle吗？'
				},{
					imageUrl: 'http://p3.music.126.net/pn09233psxrzPiuNMYxZLw==/3261151494032657.jpg?param=140y140',
					title: '国内各大酒吧热播单曲',
					url: '/listDetail/131149502',
					num: '123万',
					content: '根据你喜欢的单曲《Rememb Origina》推荐'
				},{
					imageUrl: 'http://p1.music.126.net/bb_P5JeuZEUAxilF665O7A==/109951162971756852.jpg?param=140y140',
					title: '一位偏执的旅人和ta的平凡之路',
					url: '/listDetail/751202455',
					num: '133万',
					content: '编辑推荐：每个人只能陪你走一段路'
				}
				]
			}
		},
		created() {

		},
		methods: {
			
		},

	}
</script>

<style scoped>
	.warp {
		margin-top: 30px;
		position: relative;
	}
	
	.typeLine {
		clear: both;
		margin: 30px 50px 0 50px;
		border-bottom: 1px solid gainsboro;
		height: 30px;
	}
	
	.typeLine span:nth-child(1) {
		display: block;
		float: left;
		font: normal normal 1.4rem arial, sans-serif #4644CD;
		font-size:1.2rem;
		cursor: default;
		line-height: 30px;
	}
	
	.typeLine span:nth-child(2) {
		display: block;
		float: right;
		font-size: .8rem;
		cursor: pointer;
		line-height: 30px;
	}
	.Rectwrap{
		margin-left:20px;
		margin-top:20px;
		float:left
	}
	.Rectwrap:nth-of-type(2), .Rectwrap:nth-of-type(6) {
		clear:both;
		margin-left:50px;
	}
	.recommend {
		display:inline-block;
		width:220px;
		overflow: hidden;
		float: left;
		margin:20px 0 20px 50px ;
		cursor:pointer;	
	}
	.recommend:nth-of-type(12)
	,.recommend:nth-of-type(13)
	,.recommend:nth-of-type(16)
	,.recommend:nth-of-type(17){
		margin-left: 20px;
	}
	.recommend img{
		width:100%;
		height:150px;
	}
	.recommend p{
		text-align: left;
	}
	.mvRect p:nth-child(2){
		color:#484848;
	}
	.mvRect p:nth-child(3){
		font-size:.8rem;
	}
</style>