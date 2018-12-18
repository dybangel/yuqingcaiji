function fIdQuery(){
	var url = "http://assistant.mail.yeah.net/assistant/idcard.jsp";
	var value = $("id").value;
	if(!(/^\d{15}$|^\d{18}$|^\d{17}[xX]$/.test(value))){
		alert("������15λ����18λ���֤����");
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
 * ���е���������ڣ���׼���󶼴��������
 * @param	{string}  sUrl ��ַ	
 * @param	{string}  sEvent �ص�������
 * @param	{string}  sParams ����
 * @param	{string}  sExtend ��չ�������ص�ʱԭ�������ڵ���������
 * @param   {string}  sCharSet �ַ������룬Ĭ��utf-8
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
 * ���е������Ļص�����׼���󶼴�����ص�
 * @param	{number}  nCode 1	�����ɹ�	
							0	����ʧ�ܣ������쳣	
 * @param	{obj}	oJson	���ص�����
 * @param	{obj}   sExtend ��չ�������ص�ʱԭ�������ڵ���������
 * TODO�����쳣����
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
					sShowMsg = "����ѯ��IP�ǣ�";	nIndex = 1;
					break;
				case "mobile":
					sShowMsg = "����ѯ���ֻ��ŶΣ�";nIndex = 2;
					break;
				case "id":
					sShowMsg = "���֤�����ǣ�";nIndex = 4;
					break;
				case "addr":
					sShowMsg = "����ѯ�ĵ�ַ�ǣ�";	nIndex = 5;
					break;
				case "zip":
					if(oExtend.times == 3){
						sShowMsg = "����ѯ���ʱ��ǣ�";	nIndex = 6;
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
					sShowMsg = "����ѯ�������ǣ�";	nIndex = 7;
					break;
				default :
					alert("��ѯ����������");
					return;
					break;
		}
		fYodaoGetShowTr(sShowMsg,oExtend.value,"�Բ���","��ѯ���Ϊ��",nIndex);
		
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
 * ��ѯ�����ʾ
 *
 * @param	{obj}	oJson	���ص�����
 * @param	{obj}   sExtend ��չ�������ص�ʱԭ�������ڵ���������
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
						fYodaoGetShowTr("����ѯ��IP�ǣ�",ip,"��IP�������ǣ�",location,1);
					break;
				case "mobile":
						var phonenum = oJson.phonenum;
						var location = oJson.location;
						fYodaoGetShowTr("����ѯ���ֻ��ŶΣ�",phonenum,"���Ź������ǣ�",location,2);
					break;
				case "id":
						var area = oJson.location;
						var info = "�� &nbsp; &nbsp;��"+(oJson.gender == "m" ? "��" : "Ů") + "<br/>�������ڣ�" + (oJson.birthday ? oJson.birthday : "")+  "<br/>�� ֤ �أ�" + (oJson.location ? oJson.location : "") ;
						fYodaoGetShowTr("����ѯ�����֤�ǣ�",oExtend.value,"�˺����ѯ�����",info,4);
					break;
				case "addr":
						var city = oExtend.value;
						var info = oJson.location + "<br/>�ʱࣺ" + (oJson.zipcode ? oJson.zipcode : "����") + " ���ţ�"+(oJson.phone ? oJson.phone : "����");
						fYodaoGetShowTr("����ѯ�ĵ�ַ�ǣ�",city,"�˵�ַ��ѯ�����",info,5);
					break;
				case "zip":
						var zipcode = oExtend.value;
						var info =oJson.location + " ���ţ�"+(oJson.phone ? oJson.phone : "����");
						fYodaoGetShowTr("����ѯ���ʱ��ǣ�",zipcode,"���ʱ��ѯ�����",info,6);
					break;
				case "zone":
						var phone = oJson.phone;
						var info = oJson.location + " �ʱࣺ" + (oJson.zipcode ? oJson.zipcode : "����") ;
						fYodaoGetShowTr("����ѯ�������ǣ�",phone,"�����Ų�ѯ�����",info,7);
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
		alert("��������ȷ��ʽ��IP");
		return false;
	}
	for(var i = 0; i < 4; i++){
		if(ipArray[i].length==0 || !(ipArray[i] >=0 && ipArray[i]<= 255)){
			alert("��������ȷ��ʽ��IP");
			return false;
		}
	}	
	return true;	
}

function fCheckMobile(sMobile){
	if(!(/^1[3|5][0-9]\d{8}$/.test(sMobile))){
		alert("������������11λ�ֻ�����");
		return false;
	}
	return true;
}

function fCheckPost(sPost){
	if(!(/^\d{6}$/.test(sPost))){
		alert("������6λ��������");
		return false;
	}
	return true;
}

function fCheckZone(sZone){
	if(!(/^0\d{2,3}$/.test(sZone))){
		alert("�������ԡ�0����ͷ��3λ����4λ����");
		return false;
	}
	return true;
}

function fCheckId(value){
	if(!(/^\d{15}$|^\d{18}$|^\d{17}[xX]$/.test(value))){
		alert("������15λ����18λ���֤����");
		$("id").focus();
		return false;
	}
	return true;
}

function fCheckAddr(sAddr){
	if(sAddr == ""){
		alert("��������Ҫ��ѯ�ĵ�ַ");
		return false;
	}else if(sAddr.length < 2){
		alert("��ѯ�ĵ�ַ����Ҫ��2����");
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