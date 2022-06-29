<template>
	<view>
	<!-- fab导航按钮 -->
	<cui-float-action-button :action="action" :offset="changeDrawerOffset" @click="changeDrawer">
	</cui-float-action-button>
	<cui-float-action-button :action="shoppingCartAction" :actionStyle="shoppingCartFabStyle"
		:offset="shoppingCartOffset">
		<text class="cuIcon-null cu-tag  badge  bg-yellow text-xsl">{{shoppingCart.goodsList.length}}</text>
	</cui-float-action-button>
	<!-- 抽屉主页 -->
	<scroll-view scroll-y class="DrawerPage" :class="drawerStatus ?'show':''">
		<cui-verticalnav>
			<!-- 顶部logo -->
			<cui-logo-navbar :logo="logosrc" @click="changeDrawer"></cui-logo-navbar>
			<!-- {{username}} -->
		</cui-verticalnav>
	</scroll-view>
	<!-- 点击抽屉外关闭抽屉 -->
	<view class="DrawerClose" :class="drawerStatus ?'show':''" @click="changeDrawer">
	</view>
	<!-- 抽屉内 -->
	<scroll-view scroll-y class="DrawerWindow" :class="drawerStatus ?'show':''">
		<cui-user-drawer :menuList="menuList">
			<view v-if="userInfo.type == 'admin'" class="cu-item arrow" bindtap="toAdmin">
				<view class="content">
					<text class="cuIcon-crownfill text-yellow"></text>
					<text class="text-yellow">后台数据管理</text>
				</view>
			</view>
		</cui-user-drawer>
	</scroll-view>
		</view>
</template>

<script>
	import {useStore} from 'vuex';
	import CONST from '@/utils/const.js';
	import cuiVerticalnav from '@/components/cui-verticalnav.vue';
	import cuiFloatActionButton from '@/components/cui-float-action-button.vue';
	import cuiLogoNavbar from '@/components/cui-logo-navbar.vue';
	import cuiUserDrawer from '@/components/cui-user-drawer.vue';
	export default {
		data() {
			return {
				/* 用户信息*/
				userInfo: {
					avatarUrl: "",
					type: "admin"
				},
				menuList: CONST.menuList,
				logosrc: CONST.logosrc,
				/* 控制抽屉打开/关闭状态 */
				drawerStatus: false,
				action: false,
				shoppingCartAction: false,
				/* 购物车数据 */
				shoppingCart: {
					goodsList: [{
							goodsId: 1,
							buyCount: 1
						},
						{
							goodsId: 2,
							buyCount: 3
						},
					]
				},
				changeDrawerOffset: CONST.changeDrawerOffset,
				shoppingCartOffset: CONST.shoppingCartOffset,
				shoppingCartFabStyle: CONST.shoppingCartFabStyle
			};
		},
		computed: {
			username() {
				let res = useStore().getters.userInfo;
				console.log("computed>>>",res);
				return res;
			}
		},
		mounted() {
			
		},
		components: {
			cuiVerticalnav,
			cuiFloatActionButton,
			cuiLogoNavbar,
			cuiUserDrawer,
			useStore
		},
		methods: {
			changeDrawer(e) {
				console.log(e,this.action )
				this.drawerStatus = !this.drawerStatus;
				this.action = !this.action;
			},


		}
	}
</script>

<style>
	page {
		background: var(--pageBackgroundColor);
	}

	.main {
		margin-top: 50rpx;
		/* text-align: center; */
	}


	.notice {
		background-color: rgb(253, 242, 204);
		text-align: left;
		padding-left: 5vw;
		padding: 15rpx;
	}

	.about-info {
		/* width: 95vw; */
		/* position: relative; */
		padding-top: 5vh;
		padding-bottom: 5vh;
		bottom: 0vh;
		text-align: center;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60rpx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30rpx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50rpx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	/* zdy */

	.user-info {
		text-align: center;
	}

	.user-info .head-imge {
		margin-top: 5vh;
	}

	.user-list {
		margin-top: 8vh;
	}

	/* 购物车*/
	.cartStyle {
		text-align: center;
	}

	/**折叠 */

	.li {
		background: #fff;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 20rpx 30rpx 30rpx;
	}

	.toggle {
		font-size: 32rpx;
		border-bottom: 1rpx solid #eee;
	}

	.li-align {
		display: flex;
		align-content: center;
		align-items: center;
	}

	.content {
		font-size: 24rpx;
		padding-right: 50rpx;
	}

	.li-wrap .line {
		border-bottom: 1rpx solid #eee;
	}

	.entry {
		width: 18rpx;
		height: 32rpx;
		margin-left: 20rpx;
	}

	.common {
		font-size: 32rpx;
		padding-right: 50rpx;
		border-bottom: 1rpx solid #eee;
	}

	.float-button {
		z-index: 9;
		position: absolute;
		bottom: 5%;
		right: 5vw;
		width: 15vw;
		height: 15vw;
		border-radius: 50%;
	}

	.inside-float-buttom {
		z-index: 9;
		position: absolute;
		bottom: 5%;
		right: 25vw;
		width: 15vw;
		height: 15vw;
		border-radius: 50%;
	}

	.fill {
		z-index: 10;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		/* margin-top: -50rpx; */
	}

	/*new tab
/* pages/component/nav/nav.wxss */
	.VerticalNav.nav {
		width: 200rpx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: '';
		width: 8rpx;
		height: 30rpx;
		border-radius: 10rpx 0 0 10rpx;
		position: absolute;
		background-color: orangered;
		top: 0;
		right: 0rpx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
	}

	/* 修改原样式*/
	.cu-avatar.lg {
		width: 196rpx;
		height: 196rpx;
		font-size: 2em;
	}

	.cu-list.menu-avatar>.cu-item {
		position: relative;
		display: flex;
		padding-right: 10rpx;
		height: 240rpx;
		background-color: var(--white);
		justify-content: flex-end;
		align-items: center;
	}

	.cu-list.menu-avatar>.cu-item .content {
		position: absolute;
		left: auto;
		width: calc(100% - 96rpx - 60rpx - 120rpx - 20rpx);
		line-height: 1.6em;
	}

	.cuformgroup {
		/* padding: 1rpx 30rpx; */
		display: flex;
		align-items: center;
		min-height: 100rpx;
		justify-content: space-between;
	}
</style>
