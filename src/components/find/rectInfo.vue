<template>
	<!--<router-link tag='div' class='wrap' :to="info.url">-->
		<div class='Rectwrap' @click="$router.push(info.url)">
			
		
		<div :style='styleObject' class='rect' @mouseenter="overHover" @mouseleave="outHover">
			<transition name='show'>
				<span v-show="!hoverState" class='top'>{{info.num}}</span>
			</transition>
			<transition name="topdown">
				<span v-show="hoverState" class='toup'>{{info.content}}</span>
			</transition>
			<transition name='show1'>
				<div v-show="hoverState" class='bftbn'>
				</div>
			</transition>
			<img :src="info.imageUrl" :style='styleObject' />
			<div>
				{{info.title}}
			</div>
		</div>
		<span ref='title' class='span'>{{info.title}}</span>
	<!--</router-link>-->
	</div>

</template>

<script>
	export default {
		name: 'rect',
		props: {
			styleObject: {
				default: function() {
					return {
						height: "150px",
						width: "160px"
					}
				}
			},
			info: {
				default: function() {
					return {
						imageUrl: 'http://p1.music.126.net/UQU3GlUZXZZWeS0WY6mlTA==/109951162851721668.jpg?param=140y140',
						title: '|欧美男团| 从小鲜肉到大叔，你还在吗？',
						url: '/listDetail/519500448',
						num: '44万',
						content: '编辑推荐：回忆杀-多少人曾爱慕你年轻时'
					}

				}
			}
		},
		mounted() {
			this.$refs.title.style.width = this.styleObject.width;
		},
		data() {
			return {
				hoverState: false
			}
		},
		methods: {
			overHover(e) {
				this.hoverState = true;
			},
			outHover() {
				this.hoverState = false;
			}
		},
		watch: {
			hoverState() {
			}
		}
	}
</script>

<style scoped>
	.rect {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		cursor: pointer;
	}
	
	.rect img {
		width: 100%;
	}
	
	.rect .top {
		position: absolute;
		width: 100%;
		height: 30px;
		left: 0;
		text-align: right;
		line-height: 30px;
		color: #FFF;
		background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, .1));
		font-size: .8rem;
	}
	
	.rect .toup {
		text-align: left;
		position: absolute;
		left: 0;
		line-height: 20px;
		padding: 5px;
		color: #FFF;
		font-size: .8rem;
		background-color: rgba(0, 0, 0, .5)
	}
	
	.topdown-enter-active,
	.topdown-leave-active {
		transition: transform .3s .3s
	}
	
	.topdown-enter,
	.topdown-leave-to {
		transform: translate3d( 0, -100%, 0)
	}
	
	.show-enter-active,
	.show-leave-active {
		transition: opacity .3s
	}
	
	.show-enter,
	.show-leave-to {
		opacity: 0
	}
	
	.show1-enter-active,
	.show1-leave-active {
		transition: opacity .3s
	}
	
	.show1-enter,
	.show1-leave-to {
		opacity: .3
	}
	
	.bftbn {
		position: absolute;
		bottom: 10px;
		right: 10px;
		height: 20px;
		width: 20px;
		border-radius: 100%;
		border: 1px solid #fff;
		background-color: #333;
	}
	
	.bftbn:hover {
		background-color: #000;
	}
	
	.bftbn:after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-30%, -50%);
		width: 0;
		height: 0;
		border-top: 5px solid transparent;
		border-left: 8px solid gainsboro;
		border-bottom: 5px solid transparent;
	}
	
	.span {
		word-break: normal;
		width: auto;
		display: block;
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow: hidden;
		text-align: left;
		font-family: "微软雅黑";
		font-size:.9rem;
		padding:4px;
		box-sizing: border-box;
		cursor: pointer;
		color:#333
	}
	.span:hover{
		color:#000
	}
</style>