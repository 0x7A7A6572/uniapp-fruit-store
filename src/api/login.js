export default {
	do: function (callback) {
		uni.login({
			provider: 'weixin',
			success: function (loginRes) {
				console.log(loginRes.authResult);
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: function (infoRes) {
						console.log('用户昵称为：' + infoRes.userInfo.nickName);
						callback({ statu: true, msg: "uni.login success,getUserInfo success" }, loginRes, infoRes);
					},
					fail: function(){
						callback({ statu: false, msg: "getUserInfo fail" }, loginRes, infoRes);
					}
				});
			},
			fail: function () {
				callback({ statu: false, msg: "uni.login fail" });
			}
		});
	}
}
