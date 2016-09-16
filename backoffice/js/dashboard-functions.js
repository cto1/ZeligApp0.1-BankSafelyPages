NProgress.start();
setTimeout(function() {
    $('#page-wrapper').show();
    $('#overlay').hide();
    NProgress.done();

    $('.fade').removeClass('out');

}, 200);

function showSuccessMsg(text) {
    if(text){
        successMsg.find('.msg-text').text(text);
    }
    $('#page-wrapper').append(successMsg);
    $('.success-msg').show().delay(3000).fadeOut(400);
}

function showErrorMsg() {
    $('.error-msg').show().delay(3000).fadeOut(400);
}

function showErrorOverlay() {
    $('#page-wrapper').hide();
    $('#overlay').show();
}

function hideErrorOverlay() {
    $('#overlay').hide();
    $('#page-wrapper').show();
}

$('.menu-items').find("li.active").css("background-color", "#000").parent().addClass("in");
$('.menu-items').find("li.active>a").css("color", "#fff");



var successMsg = $('<div class="panel panel-green success-msg"><div class="panel-heading"><div class="row"><div' +
    ' class="col-xs-3"><i class="fa fa-check fa-3x"></i></div><div class="col-xs-9"><div class="col-xs-9 msg-text">Success Action text</div></div></div></div></div>');



