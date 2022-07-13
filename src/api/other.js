const smAddressUrl = "https://service.zzerx.cn/";

export default {
    delay: 3000, //防抖延迟
    smAddress: function(addr,callback,delay){
        console.log("addr",addr)
        uni.request({
            method: "POST",
            url: smAddressUrl,
            data: {
                type: "address",
                address: addr
                // key: key
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'  
            },
            success: (res) => {
                callback(res.data)
            },
            fail: (e)=>{
                uni.showToast({
                    title:"自动识别失败",
                    icon: "error"
                })
            }
        });
    }
}