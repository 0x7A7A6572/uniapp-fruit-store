/**
 *  存放固定的一些内容,样式
 */
import defaultLogoImg from "/static/images/logo.png";
export default {
    logosrc: defaultLogoImg,
    //固定的菜单列表
    menuList: [{
        icon: 'cuIcon-like',
        text: '我的收藏',
        pageUrl: null,
    },
    {
        icon: 'cuIcon-text',
        text: '我的订单',
        pageUrl: "orders",
    },
    {
        icon: 'cuIcon-location',
        text: '地址管理',
        pageUrl: "addrManage",
    },
    {
        icon: 'cuIcon-ticket',
        text: '优惠券',
        pageUrl: "addrManage",
    },
    {
        icon: 'cuIcon-creative',
        text: '建议反馈',
        pageUrl: "suggest",
    },
    {
        icon: 'cuIcon-question',
        text: '关于桔乐小铺',
        pageUrl: "about",
    }],
    //index.vue fab样式
    changeDrawerOffset: "5vw",
    shoppingCartOffset: "25vw",
    shoppingCartFabStyle: {
        /* 购物车Fab样式*/
        on: 'cuIcon-cart',
        off: 'cuIcon-cart',
        onColor: 'red',
        offColor: 'white',
        offBg: 'red',
        onBg: 'red'
    },
    orderTab: ["待付款","待发货","待收货","已完成"]
}