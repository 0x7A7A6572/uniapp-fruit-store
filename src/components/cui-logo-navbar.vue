<template>
	<view>
		<image class='logo margin-top-xl'  :src="logo"
			mode="heightFix">
		</image>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "cui-logo-navbar",
		data() {
			return {

			};
		},
		props: {
			logo: {
				type: String
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style scoped>

	.logo {
		position: fixed;
		z-index: 1;
		height: 5vh;
		width: 100vw;
		margin-left: 2vw;
	}

</style>
