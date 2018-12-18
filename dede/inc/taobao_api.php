<?php 
class taobaoke{ protected $url = 'http://gw.api.taobao.com/router/rest?'; protected $appKey = '21275084'; protected $appSecret = '8a4558db7ba307ff6816f30a5e0f9836'; protected $userNick; protected $paramArr = array( 'method' => 'taobao.taobaoke.items.get', 'format' => 'xml', 'v' => '2.0', 'sign_method'=> 'md5', 'fields' => 'num_iid,title,pic_url,price,click_url,volume,commission', 'keyword'=>'连衣裙', 'cid'=>0, 'start_price'=>'30', 'end_price'=>'99999', 'start_credit'=>'4heart', 'sort'=>'commissionVolume_desc', 'start_commissionRate'=>'1000', 'end_commissionRate'=>'8000', 'start_commissionNum'=>'10', 'end_commissionNum'=>'900000', 'real_describe'=>'true', 'page_no'=>1, 'page_size'=>10, ); public function __construct($mainParam='关键词,1000,30,1000,10',$appKey,$appSecret){ $this->userNick=$userNick; $mainParamArr=explode(',',$mainParam); $this->paramArr['keyword']=$mainParamArr[0]; if(isset($mainParamArr[1])){ $this->paramArr['start_commissionRate']=$mainParamArr[1]; } if(isset($mainParamArr[2])){ $this->paramArr['start_price']=$mainParamArr[2]; } if(isset($mainParamArr[3])){ $this->paramArr['end_price']=$mainParamArr[3]; } if(isset($mainParamArr[4])){ $this->paramArr['page_size']=$mainParamArr[4]; } $this->appKey=$appKey; $this->appSecret=$appSecret; $this->paramArr['timestamp']=date('Y-m-d H:i:s'); $this->paramArr['app_key']=$this->appKey; } public function getTaokeResult(){ $sign = $this->createSign($this->paramArr,$this->appSecret); $strParam = $this->createStrParam($this->paramArr); $strParam .= 'sign='.$sign; $url = $this->url.$strParam; $cnt=0; while($cnt < 3 && ($result=@$this->vita_get_url_content($url))===FALSE){ $cnt++; } $result = $this->getXmlData($result); return $result['taobaoke_items']['taobaoke_item']; } protected function vita_get_url_content($url) { if(!function_exists('curl_init')) { $file_contents = file_get_contents($url); } else { $ch = curl_init(); $timeout = 5; curl_setopt ($ch, CURLOPT_URL, $url); curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true); curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout); curl_setopt ($ch, CURLOPT_TIMEOUT,$timeout*3); $file_contents = curl_exec($ch); curl_close($ch); } return $file_contents; } protected function createSign ($paramArr,$appSecret) { $sign = $appSecret; ksort($paramArr); foreach ($paramArr as $key => $val) { if ($key !='' && $val !='') { $sign .= $key.$val; } } $sign = strtoupper(md5($sign.$appSecret)); return $sign; } protected function createStrParam ($paramArr) { $strParam = ''; foreach ($paramArr as $key => $val) { if ($key != '' && $val !='') { $strParam .= $key.'='.urlencode($val).'&'; } } return $strParam; } protected function getXmlData ($strXml) { $pos = strpos($strXml, 'xml'); if ($pos) { $xmlCode=simplexml_load_string($strXml,'SimpleXMLElement', LIBXML_NOCDATA); $arrayCode=$this->get_object_vars_final($xmlCode); return $arrayCode ; } else { return ''; } } protected function get_object_vars_final($obj){ if(is_object($obj)){ $obj=get_object_vars($obj); } if(is_array($obj)){ foreach ($obj as $key=>$value){ $obj[$key]=$this->get_object_vars_final($value); } } return $obj; } } ?>  
