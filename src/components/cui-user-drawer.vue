<template>
	<view class="cu-list menu card-menu shadow-lg">
		<view class="user-info">
			<view class="head-imge cu-avatar xl text-xsl round ">
				<button class=" cu-avatar xl round " style="width:100%;height:100%" open-type="getUserInfo"
					bindgetuserinfo="onGetUserInfo"
					:style="{backgroundImage: 'url(' + userInfo.avatarUrl +')'}"></button>
				<view :class="'cu-tag  badge cuIcon-crownfill ' + (userInfo.vip ? 'bg-yellow' : 'bg-grey') ">
				</view>
			</view>
			<view class="user-name">
				<text class="text-white text-bold text-xxl">{{userInfo.nickName}} </text>
			</view>


		</view>
		<view class="cu-list menu user-list sm-border card-menu">
			<view v-for="item in menuList" :class="'cu-item ' + isPageAction(item.pageUrl)" @click="pageChange(item.pageUrl)" :key="item.text">
				<view class="content">
					<text :class="[item.icon, getItemColor(item.color)]" ></text>
					<text :class="getItemColor(item.color)">{{item.text}}</text>
				</view>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cui-user-drawer",
		data() {
			return {

			};
		},
		computed: {
			isPageAction() {
				return (pageurl) => {
					return pageurl == null ? "" : "arrow";
				}
			},
			getItemColor() {
				return (color)=>{
					return color == null ? "text-grey" : color;
				}
			}
		},
		methods: {
			pageChange: function(pageurl) {
				console.log("NavChange ->",pageurl);
				uni.navigateTo({
					url: "/pages/" + pageurl + "/" + pageurl
					});
			}
		},
		props: {
			menuList: {
				type: Array
			},
			userInfo: {
				type: Object,
				default: {
					type: 'admin',
					vip: true,
					avatarUrl: '/static/images/avatar.png',
					nickName: '未登录',
					loveGoods: '暂无喜欢的商品',
					oderrs: [{
						orderId: "订单id",
						orderStatu: "订单状态",
						waybillNumber: "KD0000000000000",
						goodsList: [{
							goodsId: 1,
							buyCount: 1
						}]
					}],
					adds: [{
						name: "方先生",
						addr: "xx市xx区xx小区xx号",
						namber: "13888888888"
					}],
					coupons: [{
						id: "优惠券id",
						name: "满200减20优惠券",
						full: 200,
						reduction: 20
					}]
				}
			}
		}
	}
</script>

<style>
	.user-info {
		text-align: center;
	}

	.user-info .head-imge {
		margin-top: 10vh;
	}

	.user-list {
		margin-top: 5vh;
	}

	.user-name {
		overflow: hidden;
		text-overflow: ellipsis;
		width: 50vw;
		margin: 0 auto;
	}

	.user-name text {
		white-space: nowrap;
	}
</style>
