const GET_USER_INFO = "https://service.zzerx.cn";
export default {
	do: function (callback,showLog) {
		uni.login({
			provider: 'weixin',
			success: function (loginRes) {
				if(showLog){
				console.log("login code:",loginRes.code);
				}
				uni.request({
					url: GET_USER_INFO, 
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'  
					 }, 
					data: {
						type: "fruitStore-login",
						code: loginRes.code,
						client: "@uniapp/mp-weixin"
					},
					method: "POST",
					success: (res) => {
						if(showLog){
							console.log("POST success:",res.data);
						}
						callback(res.data)
					}
				});
			},
			fail: function () {
				callback({ statu: false, msg: "uni.login fail" });
			}
		});
	},
	getUserProfile: function (callback,showLog) {
		uni.getUserProfile({
			desc: "登录后可同步数据",
			lang: "zh_CN",
			success: (res) => {

				callback(res);
			},
			fail: (fail) => {
				uni.showToast({
					title: "登录失败",
					icon: "error",
					duration: 1000,
				});
				if(showLog){
				console.log("getUserProfile fail:", fail);
				}
				callback(fail);
			},
		});
	}
}
