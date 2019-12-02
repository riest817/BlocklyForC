
$(function () {
  $(".hoge1").hover(overFunc, outFunc);

  function overFunc(){
    $(this).css("background-color", "#FC6");
  }

  function outFunc(){
    $(this).css("background-color", "#09C");
  }
});

$(function () {
  $(".hoge2").hover(overFunc1, smallFunc1);
});

function smallFunc1() {
  //$(this).animate({width: "1000px", height: "40px", position: "absolute", z-index: 0});
  $(this).animate({width: "1000px", height: "40px"});
};
function overFunc1() {
  //$(this).animate({width: "1000px", height: "300px", position: "static", z-index: 999});
  $(this).animate({width: "1000px", height: "300px", position: "static"});
};

 $(function(){
   $("#Menu dt").on("click", function() {
      $(this).next().slideToggle();
   });
});