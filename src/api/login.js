const GET_USER_INFO = "https://service.zzerx.cn";
const mock_login = "https://mock.presstime.cn/mock/62c00f334d5d85005785f7c8/friutStore/login";
export default {
	do: function (callback,showLog) {
		uni.login({
			provider: 'weixin',
			success: function (loginRes) {
				if(showLog){
				console.log("login code:",loginRes.code);
				}
				uni.request({
					url: mock_login, 
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'  
					 }, 
					 data: {
						type: "fruitStore-login",
						code: loginRes.code,
						client: "@uniapp/mp-weixin"
					},
					method: "GET",
					success: (res) => {
						console.log("GET success:",res.data);
						callback(res.data)
					}
				});
				// uni.request({
				// 	url: GET_USER_INFO, 
				// 	header: {
				// 		'Content-Type': 'application/x-www-form-urlencoded'  
				// 	 }, 
				// 	data: {
				// 		type: "fruitStore-login",
				// 		code: loginRes.code,
				// 		client: "@uniapp/mp-weixin"
				// 	},
				// 	method: "POST",
				// 	success: (res) => {
				// 		if(showLog){
				// 			console.log("POST success:",res.data);
				// 		}
				// 		callback(res.data)
				// 	}
				// });
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
