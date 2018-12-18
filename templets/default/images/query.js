function fIdQuery(){
	var url = "http://assistant.mail.yeah.net/assistant/idcard.jsp";
	var value = $("id").value;
	if(!(/^\d{15}$|^\d{18}$|^\d{17}[xX]$/.test(value))){
		alert("请输入15位或者18位身份证号码");
		$("id").focus();
		return false;
	}
	var queryValue = value.substring(0,6);
	fYodaoCall(url,"fYodaoCallBack","&idcard="+queryValue,"&extend={'type':'id','value':'"+value+"'}");
}


function fYodaoQuery(type,v,times){
	
	var url = "http://www.youdao.com/smartresult-xml/search.s";
//	var url = "http://www.outfoxer.net/smartresult/search.s";

	var value = v || $(type).value;
	if(type == "ip" && !fCheckIP(value)){
		 $(type).focus();
	}else if(type == "mobile" && !fCheckMobile(value)){
		 $(type).focus();
	}else if(type == "addr" && !fCheckAddr(value)){
		 $(type).focus();
	}else if(type == "zip" && !fCheckPost(value)){
		 $(type).focus();
	}else if(type == "zone" && !fCheckZone(value)){
		 $(type).focus();
	}else if(type == "id" && !fCheckId(value)){
		 $(type).focus();
	}else{
		var sType= type;
		if(type == "addr" || type == "zone"){
			sType = "zip";
		} 

		value = encodeURI(value);
		var sExtend = "&extend={'type':'"+type+"','value':'"+encodeURI($(type).value)+"','times':1}";
		if(v){
			sExtend = "&extend={'type':'"+type+"','value':'"+encodeURI($(type).value)+"','times':"+times+"}";
		}
		if(type == "id"){
			value += "&verify=false";
		}
		fYodaoCall(url,"fYodaoCallBack","&type="+sType+"&q="+value,sExtend);
	}
	
}	

/**
 * 与有道交互的入口，标准请求都从这儿发出
 * @param	{string}  sUrl 地址	
 * @param	{string}  sEvent 回调函数名
 * @param	{string}  sParams 参数
 * @param	{string}  sExtend 扩展参数，回调时原样返回在第三个参数
 * @param   {string}  sCharSet 字符集编码，默认utf-8
 *
 * @return  {void}  
 *           
 */
function fYodaoCall(sUrl,sEvent,sParams,sExtend,sCharSet){
	var sHost = window.location.host;
	try{
		sHost = sHost.substr(sHost.indexOf(".")+1,sHost.length);
	}catch(e){}
	sUrl += "?jsFlag=true&keyfrom="+sHost;
	sUrl += "&event="+sEvent;
	if(sParams){
		sUrl += sParams;
	}
	if(sExtend){
		sUrl += sExtend;
	}
	sUrl += "&patch=" + Date.parse(new Date()); 
	fCommonGetScript(sUrl,"gbk");
}

var gQueryMax = 1000;
/**
 * 与有道交互的回调，标准请求都从这儿回调
 * @param	{number}  nCode 1	操作成功	
							0	操作失败，但无异常	
 * @param	{obj}	oJson	返回的数据
 * @param	{obj}   sExtend 扩展参数，回调时原样返回在第三个参数
 * TODO其它异常操作
 * @return  {void}  
 *           
 */
function fYodaoCallBack(nCode,oJson,oExtend)
{
	if(nCode >= 1){
		if(oExtend && oExtend.type){
			fYodaoQueryBack(oJson,oExtend);
		}
	}else if (nCode == 0){		
		var sShowMsg = "";
		var nIndex = 0;
		switch(oExtend.type){
				case "ip":
					sShowMsg = "您查询的IP是：";	nIndex = 1;
					break;
				case "mobile":
					sShowMsg = "您查询的手机号段：";nIndex = 2;
					break;
				case "id":
					sShowMsg = "身份证号码是：";nIndex = 4;
					break;
				case "addr":
					sShowMsg = "您查询的地址是：";	nIndex = 5;
					break;
				case "zip":
					if(oExtend.times == 3){
						sShowMsg = "您查询的邮编是：";	nIndex = 6;
					}else{
						gQueryMax--;
						if(gQueryMax > 0){
							if(oExtend.times == 1){
								var value = oExtend.value.substr(0,4)+"00";
								fYodaoQuery("zip",value,2)	;
							}else if(oExtend.times == 2){
								var value = oExtend.value.substr(0,2)+"0000";
								fYodaoQuery("zip",value,3)	;
							}
						}
						return;
					}
					break;					
				case "zone":
					sShowMsg = "您查询的区号是：";	nIndex = 7;
					break;
				default :
					alert("查询出错，请重试");
					return;
					break;
		}
		fYodaoGetShowTr(sShowMsg,oExtend.value,"对不起，","查询结果为空",nIndex);
		
	}
}
var gIndex = -1 ;
function fYodaoGetShowTr(queryInfo,query,resultInfo,result,index){
	var sHtml = '\
	<div class="Tools_resu"><a href="#"  onclick="fYodaoRemoveTr();return false;" class="T_r_close"></a>\
		<table class="Tool_res_tab" cellspacing="0" cellpadding="0">\
		  <tr>\
			<td class="td_L">'+queryInfo+'</td>\
			<td><span class="Cblack">'+query+'</span></td>\
		  </tr>\
		  <tr>\
			<td class="td_L">'+resultInfo+'</td>\
			<td><span class="Cblack">'+result+'</span></td>\
		  </tr>\
		</table>\
	</div>\
	';
	if(gIndex != -1){
		document.getElementById("queryTable").deleteRow(gIndex);
	}
	var trObj = document.getElementById("queryTable").insertRow(index);
	gIndex = index;
	trObj.className = "Tools_tbg2";
	var tdObj = document.createElement("TD");
	tdObj.className = "tc";
	tdObj.colSpan  = 2; 
	trObj.appendChild(tdObj);
	tdObj.innerHTML = sHtml;
	return trObj;
}

function fYodaoRemoveTr(){
	if(gIndex != -1){
		$("queryTable").deleteRow(gIndex);
	}
	gIndex = -1;
}
/**
 * 查询后的显示
 *
 * @param	{obj}	oJson	返回的数据
 * @param	{obj}   sExtend 扩展参数，回调时原样返回在第三个参数
 *  
 * @return  {void}            
 */
function fYodaoQueryBack(oJson, oExtend)
{
	if(oJson){
		switch(oExtend.type){
				case "ip":
						var ip = oJson.ip;
						var location = oJson.location;
						fYodaoGetShowTr("您查询的IP是：",ip,"此IP归属地是：",location,1);
					break;
				case "mobile":
						var phonenum = oJson.phonenum;
						var location = oJson.location;
						fYodaoGetShowTr("您查询的手机号段：",phonenum,"卡号归属地是：",location,2);
					break;
				case "id":
						var area = oJson.location;
						var info = "性 &nbsp; &nbsp;别："+(oJson.gender == "m" ? "男" : "女") + "<br/>出生日期：" + (oJson.birthday ? oJson.birthday : "")+  "<br/>发 证 地：" + (oJson.location ? oJson.location : "") ;
						fYodaoGetShowTr("您查询的身份证是：",oExtend.value,"此号码查询结果：",info,4);
					break;
				case "addr":
						var city = oExtend.value;
						var info = oJson.location + "<br/>邮编：" + (oJson.zipcode ? oJson.zipcode : "暂无") + " 区号："+(oJson.phone ? oJson.phone : "暂无");
						fYodaoGetShowTr("您查询的地址是：",city,"此地址查询结果：",info,5);
					break;
				case "zip":
						var zipcode = oExtend.value;
						var info =oJson.location + " 区号："+(oJson.phone ? oJson.phone : "暂无");
						fYodaoGetShowTr("您查询的邮编是：",zipcode,"此邮编查询结果：",info,6);
					break;
				case "zone":
						var phone = oJson.phone;
						var info = oJson.location + " 邮编：" + (oJson.zipcode ? oJson.zipcode : "暂无") ;
						fYodaoGetShowTr("您查询的区号是：",phone,"此区号查询结果：",info,7);
					break;
				default :
					break;
			}
	
	}
}

function fCheckIP(sIp){
	var ipArray,j;
	ipArray = sIp.split(".");
	if(ipArray.length != 4){
		alert("请输入正确格式的IP");
		return false;
	}
	for(var i = 0; i < 4; i++){
		if(ipArray[i].length==0 || !(ipArray[i] >=0 && ipArray[i]<= 255)){
			alert("请输入正确格式的IP");
			return false;
		}
	}	
	return true;	
}

function fCheckMobile(sMobile){
	if(!(/^1[3|5][0-9]\d{8}$/.test(sMobile))){
		alert("请输入完整的11位手机号码");
		return false;
	}
	return true;
}

function fCheckPost(sPost){
	if(!(/^\d{6}$/.test(sPost))){
		alert("请输入6位邮政编码");
		return false;
	}
	return true;
}

function fCheckZone(sZone){
	if(!(/^0\d{2,3}$/.test(sZone))){
		alert("请输入以“0”开头的3位或者4位区号");
		return false;
	}
	return true;
}

function fCheckId(value){
	if(!(/^\d{15}$|^\d{18}$|^\d{17}[xX]$/.test(value))){
		alert("请输入15位或者18位身份证号码");
		$("id").focus();
		return false;
	}
	return true;
}

function fCheckAddr(sAddr){
	if(sAddr == ""){
		alert("请输入您要查询的地址");
		return false;
	}else if(sAddr.length < 2){
		alert("查询的地址至少要有2个字");
		return false;
	}
	return true;
}


function fYodaoFocusTr(obj,id){
	obj.style.borderColor='#889297';
	obj.style.backgroundColor='#FFFFE8';
	while(obj.tagName != "TR"){
		obj = obj.parentNode;
	}
	obj.className = "bgc_bgray";
	if(gSelectId){
		document.getElementById(gSelectId).className = "";
	}
	gSelectId = id;
	document.getElementById(id).className = "Tools_tbg"; 
}

function fYodaoBlueTr(obj){
	obj.style.borderColor='#7F9DB9';
	obj.style.backgroundColor='#FFF';
	/*while(obj.tagName != "TR"){
		obj = obj.parentNode;
	}
	obj.className = "";*/
}

var gSelectId ;
function fInitStyle(){	
	var sUrl=location.hash; 
	var oReq = new Object(); 
	if(sUrl.indexOf("#")!=-1) 
	{  
		var str = sUrl.substr(1); 
		strs = str.split("&"); 
		for(var i=0;i<strs.length;i++) 
		{ 
			oReq[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		}  
	} 
	var type = oReq["t"];
	var index = 0
	if(type){
		index = type-1;		
	}
	var oTr = document.getElementById("queryTable").getElementsByTagName("TR")[index];
	oTr.className = "Tools_tbg";
	oTr.getElementsByTagName("INPUT")[0].focus();;
	gSelectId = oTr.id;
}