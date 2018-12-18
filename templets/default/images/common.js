function toInt(str){
	var ret=0;
	var mid_num;
	for(var i=0;i<str.length;i++){
	mid_num=str.charAt(i);
	if(mid_num<'0'||mid_num>'9'){
	return -1;}
	ret=ret*10+(mid_num-'0');}
	return ret;
}

function alltrim(str){
	while(str.substring(0,1).match(/\s/)&&str.length>0){
	if(str.length==1){
	str="";}
	else
	str=str.substring(1,str.length);}
	while(str.substring(str.length-1,str.length).match(/\s/)&&str.length>0){
	if(str.length==1){
	str="";}
	else
	str=str.substring(0,str.length-1);}
	return str;}
	String.prototype.safeHTML=function(){
	return this.replace(/&/g,"&amp;").replace(/\'/g,"&quot;").replace(/\"/g,"&quot;").replace(/<br\/>/g,"").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"");};
	Function.prototype.bind=function(obj){
	var method=this,
	temp=function(){
	return method.apply(obj,arguments);};
	return temp;}
	String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

function searchMsg(){
	var noStr=alltrim(document.getElementById("find").value);
	var no=parseInt(noStr);
	if(isNaN(no)||toInt(noStr)==-1){
	alert("字条编号必须为数字");
	return false;}else if(no<1){
	alert("字条编号必须为正整数");
	return false;}else if(no>2147483647){
	alert("对不起，您搜索的字条不存在");
	return false;}else{
	if(window.location.href.indexOf("index")==-1){
	return true;}
	window.location.href = "default.asp?id="+no;
	return false;}
}

function changeVerifyPic(obj){
	obj=document.getElementById(obj);
    obj.src = "inc/getcode.asp?t=" + Math.random();
    return false;
}

function showVerify(o,p){
	o=document.getElementById(o);
	p=document.getElementById(p);
	if(o.style.display=="none" ){
		p.src="inc/getcode.asp";
		o.style.display="block";
	}
}