<template>
	<div :style="styleObject">
		MV页面
	</div>
</template>

<script>
	export default{
		name:'MV',
		props:{
			styleObject: {
				default: function() {
					return {
						height: "490px",
						width: "800px",
						"float":'right'
					}
				}
			}
		},
		mounted: function() {
			

		}
	}
</script>

<style scoped>
	
</style>