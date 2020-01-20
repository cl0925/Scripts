/*
解锁 Acrobat Pro 的编辑和整理页面功能，无法使用需要联网的转换、导出和合并功能 —— 还是用 PDF Expert 吧。。

http-response ^https:\/\/createpdf-asr\.acrobat\.com\/createpdf\/api\/users\/me\/(subscriptions|limits) requires-body=1,max-size=0,script-path=scripts/acrobat.js
http-response ^https:\/\/dc-api\.adobe\.io\/\d+\/discovery\/resources\/assets\/exportpdf\/options$ requires-body=1,max-size=0,script-path=scripts/acrobat.js
http-response ^https:\/\/dc-api-v2\.adobe\.io\/\d+\/users\/self\/limits\/conversions$ requires-body=1,max-size=0,script-path=scripts/acrobat.js

Mitm = createpdf-asr.acrobat.com, dc-api.adobe.io, dc-api-v2.adobe.io

作者 @ImSingee，请勿分享此脚本
@supported 96440338D30B

*/

const bodyJson = JSON.parse($response.body)

if ($request.url.startsWith('https://createpdf-asr.acrobat.com')) {
	if ($request.url.endsWith('me/subscriptions')) {
		$done({body: '{"subscriptions":[{"subscription_name":"AcrobatPlus","subscription_level":"Plus","subscription_state":"ACTIVE","sub_ref":"ABCDEFGHIJKLMNOPQ233","biz_source":"CCC_ENTERPRISE","billing_term":null}]}'})
	} else if ($request.url.endsWith('me/limits/acrobat')) {
		$done({body: '{"acrobat_pro":true,"acrobat_std":false}'})
	} else if ($request.url.endsWith('me/limits/conversions')) {
		$done({body: '{"combine_pdf_conversions":{"remaining":-1},"export_pdf_max_file_size":{"limit":102400},"organize_pdf_conversions":{"remaining":-1},"create_pdf_max_file_size":{"limit":102400},"combine_pdf_documents":{"limit":12},"create_pdf_conversions":{"remaining":-1},"export_pdf_conversions":{"remaining":-1},"organize_pdf_max_file_size":{"limit":102400},"combine_pdf_max_file_size":{"limit":102400},"organize_pdf_documents":{"limit":12},"ipp_create_pdf_conversions":{"remaining":0}}'})
	} else {
		$done({})
	}
} else if ($request.url.startsWith('https://dc-api.adobe.io')) {
	if ($request.url.endsWith('exportpdf/options')) {
		$done({body: '{"locales":[{"code":"en-US"},{"code":"en-GB"},{"code":"da-DK"},{"code":"de-DE"},{"code":"es-ES"},{"code":"fi-FI"},{"code":"fr-FR"},{"code":"it-IT"},{"code":"ja-JP"},{"code":"nb-NO"},{"code":"nl-NL"},{"code":"pt-BR"},{"code":"sv-SE"},{"code":"sr-SR"},{"code":"mk-MK"},{"code":"zh-CN"},{"code":"ko-KR"},{"code":"sl-SI"},{"code":"lt-LT"},{"code":"ru-RU"},{"code":"iw-IL"},{"code":"zh-HK"},{"code":"uk-UA"},{"code":"pl-PL"},{"code":"hu-HU"},{"code":"bg-BG"},{"code":"hr-HR"},{"code":"ro-RO"},{"code":"el-GR"},{"code":"mt-MT"},{"code":"no-NO"},{"code":"de-CH"},{"code":"cs-CZ"},{"code":"tr-TR"},{"code":"ca-CA"},{"code":"lv-LV"},{"code":"sk-SK"},{"code":"et-EE"}],"formats":{"pptx":{"provisioned":true},"xlsx":{"provisioned":true},"image":{"provisioned":true},"rtf":{"provisioned":true},"doc":{"provisioned":true},"docx":{"provisioned":true}}}'})
	} else {
		$done({})
	}
} else if ($request.url.startsWith('https://dc-api-v2.adobe.io')) {
	if ($request.url.endsWith('limits/conversions')) {
		$done({body: '{"optimize_pdf_ops":{"remaining":-1},"combine_pdf_conversions":{"remaining":-1},"export_pdf_max_file_size":{"limit":102400},"optimize_pdf_max_file_size":{"limit":102400},"organize_pdf_conversions":{"remaining":-1},"create_pdf_max_file_size":{"limit":102400},"combine_pdf_documents":{"limit":12},"create_pdf_conversions":{"remaining":-1},"ocr_pdf_max_file_size":{"limit":0},"export_pdf_conversions":{"remaining":-1},"organize_pdf_max_file_size":{"limit":102400},"combine_pdf_max_file_size":{"limit":102400},"organize_pdf_documents":{"limit":12},"ipp_create_pdf_conversions":{"remaining":0},"ocr_pdf_conversions":{"remaining":0},"password_encrypt_ops":{"remaining":0},"password_encrypt_max_file_size":{"limit":0}}'})
	} else {
		$done({})
	}
} else {
	$done({})
}


