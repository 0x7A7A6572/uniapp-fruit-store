<template>
	<view>
		<cui-logo-navbar :logo="null" class="navbar">
			<text class="cuIcon-back navbar-func" @click="back"></text>
		</cui-logo-navbar>
		<cui-order-card></cui-order-card>
	</view>
</template>

<script>
	import cuiLogoNavbar from '@/components/cui-logo-navbar.vue';
	import cuiOrderCard from '@/components/cui-order-card.vue';
	
	export default {
		data() {
			return {
				logosrc: "/static/images/logo.png",
			}
		},
		methods: {
			back: ()=>{
				console.log("Page bacak ->");
				uni.navigateBack();
			}
		},
		components: {
			cuiLogoNavbar,
			cuiOrderCard
		}
	}
</script>

<style scoped>
	.navbar {
		width: 100%;
		background: var(--navBackgroundColor);
		padding: 0.5em;
	}

	.navbar-func {
		font-size: 2em;
		color: white;
		padding: 0.5em;
	}
</style>
