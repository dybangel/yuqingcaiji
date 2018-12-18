<?
 $do=$_GET['do'];
 //echo "<pre>";
 //echo "{$do}\r\n";
 //echo "\r";
$dbhostip="127.0.0.1";
$username="root";
$userpassword="123456";
$dbdatabasename="dedecmsv57utf8sp1bigscreen4";
$link=mysqli_connect($dbhostip,$username,$userpassword,$dbdatabasename) or die("Unable to connect to the MySQL!");

$sql="select b.attname as aname, count(a.acode)as acount from   (
select SUBSTRING(flag,POSITION('00' IN flag),4) as acode from dede58_archives 
 where flag like '00%'
)a  left join dede58_arcatt b on a.acode=b.att GROUP BY a.acode
";
//$res=mysqli_query($link,$sql);
//地区事件
$result =mysqli_query($link,$sql);
		while($row=mysqli_fetch_assoc($result)){
			foreach ($row as $k=>$v) {
				$row["$k"] = iconv('GB2312', 'UTF-8', $v);
			}
		   $areaarray[] = $row;
		}
//所有事件
$sql="select count(*) as count from dede58_archives";
$result =mysqli_query($link,$sql);
$all_event_row[]=mysqli_fetch_assoc($result);

//本周事件
$sql="SELECT count(*)as count FROM dede58_archives where  DATE_SUB(CURDATE(), INTERVAL 7 DAY) <=  date(from_unixtime(dede58_archives.pubdate))";
$result =mysqli_query($link,$sql);
$this_week_row[]=mysqli_fetch_assoc($result);

//事件级别统计
$sql="select SUBSTRING(b.attname,1,2) as aname, count(a.acode)as acount from   (
select SUBSTRING(flag,POSITION('e' IN flag),3) as acode from dede58_archives 
 where flag like '%e%'
)a  left join dede58_arcatt b on a.acode=b.att GROUP BY a.acode";
//$result=mysqli_query($link,$sql);
$result =mysqli_query($link,$sql);
		while($row=mysqli_fetch_assoc($result)){
			foreach ($row as $k=>$v) {
				$row["$k"] = iconv('GB2312', 'UTF-8', $v);
			}
		   $level_info[] = $row;
		}

//$level_info[]=mysqli_fetch_assoc($result);

//区域事件排名top5
$sql="select * from (select b.attname as aname, count(a.acode)as acount from   (
select SUBSTRING(flag,POSITION('00' IN flag),4) as acode from dede58_archives 
 where flag like '00%'
)a  left join dede58_arcatt b on a.acode=b.att GROUP BY a.acode)a order by acount desc limit 5;
";
$result =mysqli_query($link,$sql);
		while($row=mysqli_fetch_assoc($result)){
			foreach ($row as $k=>$v) {
				$row["$k"] = iconv('GB2312', 'UTF-8', $v);
			}
		   $rijunbaofa_info[] = $row;
		}
//最新5条数据
$sql="select id,title,from_unixtime(pubdate)as pubdate from dede58_archives order by id desc limit 5";
$result =mysqli_query($link,$sql);
		while($row=mysqli_fetch_assoc($result)){
			foreach ($row as $k=>$v) {
				$row["$k"] = iconv('GB2312', 'UTF-8', $v);
			}
		   $new5_info[] = $row;
		}

//行业排名top5
$sql="select SUBSTRING(b.attname,1,2)  as aname, count(a.acode)as acount from   (
select SUBSTRING(flag,POSITION('h' IN flag),3) as acode from dede58_archives 
 where flag like '%h%'
)a  left join dede58_arcatt b on a.acode=b.att GROUP BY a.acode";
$result =mysqli_query($link,$sql);
		while($row=mysqli_fetch_assoc($result)){
			foreach ($row as $k=>$v) {
				$row["$k"] = iconv('GB2312', 'UTF-8', $v);
			}
		   $hangye_info[] = $row;
		}

//事件关键词
$sql="select count(a.typeid) as acount,b.typename as aname from dede58_archives a left join dede58_arctype b on b.id=a.typeid GROUP BY b.typename";
$result =mysqli_query($link,$sql);
		while($row=mysqli_fetch_assoc($result)){
			foreach ($row as $k=>$v) {
				$row["$k"] = iconv('GB2312', 'UTF-8', $v);
			}
		   $guanjianci_info[] = $row;
		}


$myarray = [
    "areadata" => $areaarray,
    "this_week_event" => $this_week_row,
    "all_event_count" => $all_event_row,
    "level_info"=>$level_info,
    "rijunbaofa_info"=>$rijunbaofa_info,
     "new5_info"=>$new5_info,
     "hangye_info"=>$hangye_info,
     "guanjianci_info"=>$guanjianci_info
];
echo json_encode($myarray);

mysqli_close($link);
//echo "close\n";
?>