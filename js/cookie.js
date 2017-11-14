/*
2017/11/14 cookie.js 新規作成 
 */

// クッキーの値を取得する
function GetCookies()
{
    var result = new Array();

    var allcookies = document.cookie;
    if( allcookies != '' )
    {
        var cookies = allcookies.split( '; ' );

        for( var i = 0; i < cookies.length; i++ )
        {
            var cookie = cookies[ i ].split( '=' );

            // クッキーの名前をキーとして 配列に追加する
            //result[ cookie[ 0 ] ] = decodeURIComponent( cookie[ 1 ] );
            result[ cookie[ 0 ] ] = cookie[ 1 ];
        }
    }
    return result;
}

// クッキーの値をリセットする
function delCookie()
{
  //日付データを作成する
  var date1 = new Date();
  
  //1970年1月1日00:00:00の日付データをセットする
  date1.setTime(0);
  
  //有効期限を過去にして書き込む
  document.cookie = "counts=;expires="+date1.toGMTString();

  //ページを再読み込みする
  location.reload();

}