const smAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/";
const key = "GTQBZ-J5SCF-7KKJV-JPBOX-WADNS-6DFGY";
export default {
    delay: 3000, //防抖延迟
    smAddress: function(addr,callback,delay){
        console.log("addr",addr)
        uni.request({
            url: smAddressUrl,
            data: {
                smart_address: addr,
                key: key
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