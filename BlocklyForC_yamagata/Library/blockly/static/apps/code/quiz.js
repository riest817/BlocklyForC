function Quiz_switch() {


  for (var i = 1; i <= Code.MAX_PAGE; i++ ) {
  var idName = "quiz" + i;

    if ( i == Code.PAGE ) { document.getElementById(idName).style.display="block"; }
    else { document.getElementById(idName).style.display="none"; }
  }

}