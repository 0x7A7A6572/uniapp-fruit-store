const goodslistUrl = "https://mock.presstime.cn/mock/62c00f334d5d85005785f7c8/friutStore/goodslist"
export default {
    getGoodsList: function(callback){
        uni.request({
            url: goodslistUrl, 
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'  
             }, 
            method: "GET",
            success: (res) => {
                console.log("GET success:",res.data);
                callback(res.data)
            }
        });
    }
}