//今日热榜 crate by makexp 2020.01.14
//^https:\/\/api\.tophub\.today\/account\/sync* url script-response-body jrrb.js

var obj = JSON.parse($response.body);
 obj={
 "data": {
  "is_vip": "1",
  "vip_expired": "4092599349",
  "is_vip_now": true
 },
 "error": false,
 "status": 200
};
$done({body: JSON.stringify(obj)});
//
