<template>
	<div class="progress-bar" >
		<div class="bar-inner"ref="progressBar"  @click="progressClick">
			<div class="progress" ref="progress" ></div>
			<div class="progress-btn-wrapper" ref="progressBtn" @mousedown.pre="progressTouchStart" @mousemove.pre="progressTouchMove"　v-on:mouseup="progressTouchEnd" >
				<div class="progress-btn"></div>
			</div>
		</div>
	</div>
</template>

<script>
	const progressBtnWidth = 16
	//const transform = prefixStyle('transform')
	import {mapState} from 'vuex'
	export default {
		props: {
			percent: {
				type: Number,
				default: 0
			},
			progressType:"progress"
		},
		created() {
			this.touch = {}
		},
		methods: {
			progressTouchStart(e) {
				if(e.button!==0){
					return ;
				}
				if(this.currentIndex==-1){
					return 
				}
				this.touch.initiated = true
				this.touch.startX = e.pageX
				this.touch.left = this.$refs.progress.clientWidth
			},
			progressTouchMove(e) {
				if(e.button!==0){
					return ;
				}
				console.log(111)
				if(!this.touch.initiated) {
					return
				}
				const deltaX = e.pageX - this.touch.startX
				const offsetWidth = Math.min(this.$refs.progressBar.clientWidth , Math.max(0, this.touch.left + deltaX))
				this._offset(offsetWidth);
				this._triggerPercent2();
				this._triggerPercent3();
			},
			progressTouchEnd() {
				this.touch.initiated = false
				this._triggerPercent()
			},
			progressTouchOut(e){
				console.log(e.button)
				if(e.button!==0){
					return ;
				}
					this.touch.initiated = false
			},
			progressClick(e) {
				if(e.button!==0){
					return ;
				}
				if(this.currentIndex==-1){
					return 
				}
				const rect = this.$refs.progressBar.getBoundingClientRect()
				const offsetWidth = e.pageX - rect.left
				this._offset(offsetWidth)
				// 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
				// this._offset(e.offsetX)
				this._triggerPercent()
			},
			_triggerPercent() {
				const barWidth = this.$refs.progressBar.clientWidth 
				const percent =Math.min(this.$refs.progress.clientWidth / barWidth,1)
				
				this.$emit('percentChange', percent)
			},
			_triggerPercent2() {
				const barWidth = this.$refs.progressBar.clientWidth 
				const percent =Math.min(this.$refs.progress.clientWidth / barWidth,1)
				this.$emit('percentChange2', percent)
			},
			_triggerPercent3() {
				const barWidth = this.$refs.progressBar.clientWidth 
				const percent = Math.min(this.$refs.progress.clientWidth / barWidth,1)
				this.$emit('percentChange3', percent)
			},
			_offset(offsetWidth) {
				this.$refs.progress.style.width = `${offsetWidth}px`
				//      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
				this.$refs.progressBtn.style.left=`${offsetWidth}px`
				
			}
		},
		computed: {
			...mapState([
				'playing',
				'currentIndex'
			])
		},
		watch: {
			percent(newPercent) {
				if(newPercent >= 0 && !this.touch.initiated) {
					const barWidth = this.$refs.progressBar.clientWidth
					const offsetWidth = newPercent * barWidth
					this._offset(offsetWidth)
				}
			}
		}
	}
</script>

<style scope>
	.progress-bar {
		height: 30px;
		width:100%;
	}
	
	.bar-inner {
		position: relative;
		top: 13px;
		height: 4px;
		background: rgba(0, 0, 0, 0.3);
	}
	
	.progress {
		position: absolute;
		height: 100%;
		background: #E83C3C;
	}
	
	.progress-btn-wrapper {
		position: absolute;
		left: -8px;
		top: -13px;
		width: 16px;
		height: 16px;
	}
	
	.progress-btn {
		position: relative;
		top: 7px;
		left: -8px;
		box-sizing: border-box;
		width: 16px;
		height: 16px;
		border: 3px solid #fff;
		box-shadow: 0 0 5px gray;
		border-radius: 50%;
		background: #E83C3C;
	}
</style>