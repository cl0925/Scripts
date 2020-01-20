// 去除 IT 之家新闻列表广告

/*
let obj = {
    "toplist": [],
    "newslist": [
        {
            "newsid": 463445,
            "title": "优酷视频会员限时3.5折大促：酷喵VIP会员年卡168元",
            "postdate": "2019-12-17T15:28:04.733",
            "orderdate": "2019-12-17T15:28:04.733",
            "description": "优酷VIP会员大促，酷喵VIP会员年卡限时低至3.5折168元。",
            "image": "http://img.ithome.com/newsuploadfiles/thumbnail/2019/12/463445_240.jpg?r=1576567684733",
            "hitcount": 1407,
            "commentcount": 29,
            "cid": 93,
            "sid": 0,
            "url": "/0/463/445.htm",
            "aid": 2
        },
        {
            "newsid": 463444,
            "title": "比亚迪将于12月20日解锁华为手机NFC车钥匙功能",
            "postdate": "2019-12-17T15:26:08.623",
            "orderdate": "2019-12-17T15:26:08.623",
            "description": "根据比亚迪官方的消息，12月20日，在比亚迪技术体验创享会上，比亚迪DiLink将与华为钱包合作，解锁手机NFC车钥匙功能",
            "image": "http://img.ithome.com/newsuploadfiles/thumbnail/2019/12/463444_240.jpg?r=1576567568623",
            "hitcount": 4623,
            "commentcount": 99,
            "cid": 160,
            "sid": 0,
            "url": "/0/463/444.htm"
        }
    ],
}
*/

let obj = JSON.parse($response.body);
let data = obj["newslist"];
let del_num = [];
for (item of data) {
    if ("aid" in item) {
        del_num.unshift(data.indexOf(item))
    }
};
for (n of del_num) {
    data.splice(n, 1)
};
obj["newslist"] = data;
$done({ body: JSON.stringify(obj) }); 