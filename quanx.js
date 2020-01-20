/*
hostname = raw.githubusercontent.com, *.github.io,
^https:\/\/(raw.githubusercontent|\w+\.github)\.(com|io)\/.*\.js$ url script-response-body quanx.js
*/
var body = $response.body;
body = '\/*\n@supported 96440338D30B\n*\/\n' + body;
$done(body);