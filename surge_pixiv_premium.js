/*

搬砖：Pixiv (P站) 解除热门度搜索 伪装vip
Surge4：

http-response https://oauth.secure.pixiv.net/auth/token requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20pixiv%20premium.js,script-update-interval=-1
http-request https://app-api.pixiv.net/v1/search.*popular script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20pixiv%20search.js,script-update-interval=-1

Surge MITM = oauth.secure.pixiv.net, app-api.pixiv.net,

QX使用不完美 暂不适配
好东西.. API请勿滥用 
来源作者: onewayticket255
频道: @NobyDa

*/
let body = $response.body
body=JSON.parse(body)
body['response']['user']['is_premium']=true
body=JSON.stringify(body)
$done({body})