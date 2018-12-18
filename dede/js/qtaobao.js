window.onload = function(){
	
}

//获取下拉列表选中项的文本
function getSelectedText(name){
var obj=document.getElementById(name);
	for(i=0;i<obj.length;i++){
	   if(obj[i].selected == true){
		   if (obj[i].innerText.indexOf('─')<0){ //如果不包含"—"号。
		  	 	return obj[i].innerText;
		   }else{
			   var gText='';
			   for(j=0;j<=obj[i].innerText.split('─').length-1;j++){ //循环"—"号的次数
			   		var ginText = obj[i-j].innerText;
			   		var ginText = ginText.replace(/─/g,"");
			   		if(j==0){
						var gText = ginText + gText; //累加上级分类的名称
						//alert("第"+j+"次循环值的是"+gText);
					}else{
						var gText=ginText+"─"+gText; //累加上级分类的名称
						//alert("第"+j+"次循环值的是"+gText);
					}
			   }
			   return gText;
		   }
	   }
	}
}

function Ctextarea(){
	var keywords=encodeURIComponent(document.qform.keywords.value);
	if (keywords==""){
		return false;
	}
	
	var qtitleclass=document.qform.qtitleclass.value; //栏目分类节点名称
	var qtitle=document.qform.qtitle.value; //自定义节点名称

	var Curl=document.getElementById("pdisplay").innerText;
	var duoye=document.qform.duoye.value; //页数
	if (duoye==""){
		duoye=" startid=\"1\" endid=\"\" addv=\"1\" ";
	}else{
		duoye=" startid=\"0\" endid=\""+duoye*40+"\" addv=\"40\" ";
	}
	if(qtitle=="" && qtitleclass==0){
		alert("请选择或填写节点名称");
		return false;
	}else{
var qtc;
if(qtitleclass!=0){
	qtc=getSelectedText("qtitleclass");
}
if(qtitle!=""){
	qtc=qtitle;
}
var NewLine = "\n";
var qconfigOther = "";
qconfigOther+="{dede:listconfig}"+NewLine;
qconfigOther+="{dede:noteinfo notename=\""+qtc+"\" channelid=\"2\" macthtype=\"string\""+NewLine;
qconfigOther+="    refurl=\"http://\" sourcelang=\"gb2312\" cosort=\"asc\""+NewLine;
qconfigOther+="  isref=\"no\" exptime=\"10\" usemore=\"0\" /}"+NewLine;
qconfigOther+="{dede:listrule sourcetype=\"batch\" rssurl=\"\" regxurl=\""+Curl+"\""+NewLine;
qconfigOther+=""+duoye+""+" urlrule=\"area\" musthas=\"http://item.taobao.com\""+NewLine;
qconfigOther+=" nothas=\"on_comment\" listpic=\"1\" usemore=\"0\"}"+NewLine;
qconfigOther+="    {dede:addurls}{/dede:addurls}"+NewLine;
qconfigOther+="    {dede:batchrule}{/dede:batchrule}"+NewLine;
qconfigOther+="    {dede:regxrule}{/dede:regxrule}"+NewLine;
qconfigOther+="    {dede:areastart}<div class=\"tb-content\" data-spm=\"a230r.1.14\">{/dede:areastart}"+NewLine;
qconfigOther+="    {dede:areaend}结果内容区{/dede:areaend}"+NewLine;
//qconfigOther+="            </div>{/dede:areaend}"+NewLine;
qconfigOther+="{/dede:listrule}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="{/dede:listconfig}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="{dede:itemconfig}"+NewLine;
qconfigOther+="{dede:sppage sptype='full' srul='1' erul='5'}{/dede:sppage}"+NewLine;
qconfigOther+="{dede:previewurl}{/dede:previewurl}"+NewLine;
qconfigOther+="{dede:keywordtrim}{/dede:keywordtrim}"+NewLine;
qconfigOther+="{dede:descriptiontrim}欢迎前来淘宝网{/dede:descriptiontrim}"+NewLine;
qconfigOther+="{dede:item field='title' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}<title>[内容]</title>{/dede:match}"+NewLine;
qconfigOther+="   {dede:trim replace=\"\"}-淘宝网{/dede:trim}"+NewLine;
qconfigOther+="   {dede:function}{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='writer' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='source' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='pubdate' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='imgurls' value='' isunit='1' isdown='1'}"+NewLine;
qconfigOther+="   {dede:match}<ul id=\"J_UlThumb\" class=\"tb-thumb tb-clearfix\">[内容]</ul>{/dede:match}"+NewLine;
qconfigOther+="   {dede:trim replace=\"\"}_40x40.jpg{/dede:trim}"+NewLine;
qconfigOther+="   {dede:function}@me=TurnImageTag(@me);"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='body' value='' isunit='1' isdown='1'}"+NewLine;
qconfigOther+="   {dede:match}{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='url' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}<link rel=\"canonical\" href=\"[内容]\"/>{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='price' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}<em class=\"tb-rmb-num\">[内容]</em>{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}{dede:item field='rate' value='' isunit='' isdown=''}"+NewLine;
qconfigOther+="   {dede:match}<em class=\"tb-star\" id=\"J_RateStar\" data-commonApi=\"http://rate.taobao.com/detailCommon.htm?[内容]\">-</em> <i class=\"sep\">{/dede:match}"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="   {dede:function}@me=TurnRateTag(@me);"+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+=""+NewLine;
qconfigOther+="{/dede:function}"+NewLine;
qconfigOther+="{/dede:item}"+NewLine;
qconfigOther+="{/dede:itemconfig}"+NewLine;
		
	document.getElementById("notes").value=qconfigOther;//获取所有配置项
	return false;
	}
}

function CheckSubmit(){

	var keywords=encodeURIComponent(document.qform.keywords.value);
	if (keywords==""){
		alert("请填写关键词！");
		return false;
	}else{
		keywords="&q="+keywords;
	}
	
	// price start
	var price1=Number(document.qform.price1.value); //最低价
	var price2=Number(document.qform.price2.value); //最高价

	if(price1!="" && price2!=""){
		if(price1>price2){
			alert("最低价格"+price1+"不能大于最高价格"+price2+"，请重新填写！");
			return false;
		}else{
		price1="&filter=reserve_price["+price1;
		price2=","+price2+"]";
		}
	}else{
		if(	price1!="" || price2!=""){
			alert("请输入完整的价格！");
			return false;	
		}else{
			price1="";
			price2=""
		}
	}
	
//	if (price1=="" || price2==""){
//		//alert("请输入完整的价格！");
//		//return false;
//	}else{
//		if(price1!="" && price2!="" || price1>price2){
//			alert("最低价格"+price1+"不能大于最高价格"+price2+"，请重新填写！");
//			return false;
//		}else{
//			price1="&filter=reserve_price["+price1;
//			price2=","+price2+"]";
//		}
//	}
	// price end
	
	var xl=document.qform.xl.checked;
	var xy=document.qform.xy.checked;
	if(xl==true && xy==true){
		alert("由于淘宝原因，销量与信用只能同时选择其中一个！");
		return false;
	}else{
		if (xl==true){
			xl="&sort=sale-desc";
		}else{
			xl="";
		}
		if (xy==true){
			xy="&sort=credit-desc";
		}else{
			xy="";
		}
	}
	
	var duoye=document.qform.duoye.value;
	if (duoye==""){
		duoye="";
	}else{
		duoye="&s=(*)";
	}
	
	var pdisplay="http://s.taobao.com/search?tab=ok"+keywords+price1+price2+xl+xy+duoye;
	var popen="<a target=_blank href=http://s.taobao.com/search?tab=ok"+keywords+price1+price2+xl+xy+">打开</a> <a href='javascript:copyText();'>复制链接</a>";
	document.getElementById("pdisplay").innerHTML=pdisplay;
	document.getElementById("popen").innerHTML=popen;
	
	if(document.getElementById("notes").value==""){
		return false;
	}else{
		return true;
	}
}

function reaseDuoYe(){
	document.qform.duoye.value="";
}

function copyText()
{ 
	var url = document.getElementById("popen").innerHTML
	window.clipboardData.setData("Text",url);
	alert("已复制链接");
}