const adminUrl = "https://mock.presstime.cn/mock/62c00f334d5d85005785f7c8/friutStore/admin"
export default {
    adminData: function(callback){
        uni.request({
            url: adminUrl, 
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'  
             }, 
             data: {
                id: '**********' //userid 判断是否为管理员
            },
            method: "GET",
            success: (res) => {
                console.log("GET success:",res.data);
                callback(res.data)
            }
        });
    },
}