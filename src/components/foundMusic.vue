<template>
	<div class='wrap' :style="styleObject">
		<selectList></selectList>
		<router-view></router-view>
	</div>
</template>

<script>
	import selectList from './find/selectList'
	export default {
		name: 'foundMusic',
		props: {
			styleObject: {
				default: function() {
					return {
						height: "570px",
						width: "800px",
						"float": 'right',
						"overflow":'auto'
					}
				}
			}
		},
		components: {
			selectList
		},
		mounted: function() {}
	}
</script>

<style scoped>
	
</style>