$(function () {

$("a.show").click(function() {
  var element = $(this).attr("data-show-id");
  $("#article-" + element).slideToggle('medium');
  $("#excerpt-" + element).slideToggle('medium');
});

$("a.hide").click(function() {
  var element = $(this).attr("data-show-id");
  $("#article-" + element).slideToggle('medium');
  $("#excerpt-" + element).slideToggle('medium');
  $("#article-container-" + element).ScrollTo({ duration: 500,   durationMode: 'all'});
});

});

$(document).ready(function() {

if (window.location.hash)
{
  var element = "#" + window.location.hash.substr(1) + " a.show";
  $(element).click();
}
});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

 ga('create', 'UA-40050694-1', 'auto');
 ga('send', 'pageview');
