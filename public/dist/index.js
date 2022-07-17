
$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options").click(() => {
	$("#status-options").toggleClass("active");
	$("#contacts").toggleClass("expanded");

})