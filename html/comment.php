<?php

/* 変数の定義 */////////////////////////////////////////////////////////////////////
  $setchar='UTF-8';/* 日本語文字セット UTF-8, Shift_JIS, EUC-JP,ISO-2022-JP */
  $pdate=$date=date("<b>Y/m/d H:i </b>");/* 日時自動記入するとき設定 */
  $lmt=100;/* 投稿文字数制限 */
  $kugiri='<hr style="border:1px solid #eee">';/* 記事の区切り */
/* ここまで *///////////////////////////////////////////////////////////////////////

  mb_language("Japanese");
  ini_set('mbstring.internal_encoding',$setchar);
  if(preg_match('/utf/i',$setchar))$charcode='utf8';
  if(preg_match('/shift|sjis/i',$setchar))$charcode='sjis';
  if(preg_match('/euc/i',$setchar))$charcode='eucjp';
  if(preg_match('/^jis|2022/i',$setchar))$charcode='jis';
  mb_internal_encoding($charcode);
  if(get_magic_quotes_gpc()){$process=array(&$_GET,&$_POST,&$_COOKIE,&$_REQUEST);
  while(list($key,$val)=each($process)){
  foreach($val as $k=>$v){unset($process[$key][$k]);
  if(is_array($v)){$process[$key][stripslashes($k)]=$v;
  $process[]=&$process[$key][stripslashes($k)];}
  else $process[$key][stripslashes($k)]=stripslashes($v);}}
  unset($process);}
  if(file_exists("hpcomment.msg"))$comment=file_get_contents("hpcomment.msg");
  $_POST['comment']=str_replace('　','  ',$_POST['comment']);
  if(!preg_match("/[\e\200-\377]/",$_POST['comment'])||mb_strlen($_POST['comment'])>$lmt)$_POST['comment']="";
  if($_POST['comment']){$_POST['comment']=preg_replace("/(\x20|<br>)+$/i","",$_POST['comment']);
  $m1=array('&','"','#','$','%','\'','`','<','>','=','?','/');
  $m2=array('&amp;','&quot;','&#x0023;','&#x0024;','&#x0025;','&#x0027;','&#x0060;','&lt;','&gt;','&#x003D;','&#x003F;','&#x002F;');
  $_POST['comment']=str_replace($m1,$m2,$_POST['comment']);
  $comment=$pdate.$_POST['comment']."\n".$comment;
  file_put_contents("hpcomment.msg",$comment);
  $btn="parent.document.getElementById('submit').disabled=true;";}
  $comment=str_replace("\r","",rtrim($comment));
  $comment=str_replace("\n","$kugiri",rtrim($comment));
  if($_GET['rep']&&!$_POST['comment'])$comment="";
  header("cache-control: no-store, no-cache, must-revalidate");
  header("cache-control: post-check=0, pre-check=0");
  header("content-type: text/html; charset=UTF-8");
  if($comment){$comment=preg_replace("/&amp;nbsp;/","&nbsp;",$comment);
    $comment=preg_replace("/&lt;br&gt;/i","<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",$comment);
    $comment=preg_replace("/&lt;b&gt;/i","<b>",$comment);
    $comment=preg_replace("/&lt;&#x002F;b&gt;/i","</b>",$comment);
$js="parent.document.getElementById('commentv').innerHTML='$comment';
parent.document.getElementById('commentv').style.display='block';
parent.document.getElementById('comment').value='';";}
  else $js="return false;";
  print <<<HTM
<html><head>
<meta name="cache-control" content="No-cache">
<meta name="cache-control" content="Must-revalidate">
<meta http-equiv="content-type" content="text/html; charset=$setchar">
<script type="text/javascript">
function res(){{$js}{$btn}}
</script>
</head>
<body onload="res()">
</body>
</html>
HTM;
exit();
/***
(c)20011 Telecom Corporation.,http://bellcall.co.jp/
***/
?>


