$(function() {
    $("#wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "slideLeft"
    });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

var personCount = 0;
var numbersArr = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten"];
$('.content').on("click","#addPerson",function(){

    personCount++;

var $template = $('#personTemplate'),
    $clone = $template.clone().removeClass('hide').removeAttr('id').insertBefore($('#addPerson'));
var inputs = $clone.find('input,select');
    $(inputs).each(function() {
      $(this).attr( 'id', this.id + '' + personCount );
    });
    $clone.find('#pCount').text(numbersArr[personCount]);

});
for (i = 1; i < 32; i++) {
    $('#processDay').append('<option val="'+i+'">'+i+'</option>');
}


function diffAddress(sel) {
    if(sel.value === "Yes"){
        $('.diff-address').show();
    }else{
        $('.diff-address').hide();
    }
}

function sendtoAddress(sel) {
    if(sel.value === "Other"){
    $('.send-address').show();
    }else{
        $('.send-address').hide();
    }
}
function isFran(sel) {
    if(sel.value === "Yes"){
        $('.franchise-type').show();
    }else{
        $('.franchise-type').hide();
    }
}
function isTaxOther(sel) {
    if(sel.value === "Yes"){
        $('.taxOther').show();
    }else{
        $('.taxOther').hide();
    }
}
function isStockEx(sel) {
    if(sel.value === "Yes"){
        $('.stockExchange').show();
    }else{
        $('.stockExchange').hide();
    }
}
function isCCJ(sel) {
    if(sel.value === "Yes"){
        $('.ccjTrue').show();
    }else{
        $('.ccjTrue').hide();
    }
}
function isTaxArrears(sel) {
    if(sel.value === "Yes"){
        $('.taxArrearsTrue').show();
    }else{
        $('.taxArrearsTrue').hide();
    }
}

function selectedTitle(sel) {
    if(sel.value === "Other"){
    $(sel).parents(':eq(1)').next().show();
    }else{
        $(sel).parents(':eq(1)').next().hide();
    }
}
function isRoleOther(check){
    if($(check).is(':checked')) { 
        $(check).parents(':eq(3)').next().show();
     }else{
        $(check).parents(':eq(3)').next().hide();
    }
}
function selectedHomeAddress(sel) {
    if(sel.value === "Other"){
    $(sel).parents(':eq(1)').next().show();
    }else{
        $(sel).parents(':eq(1)').next().hide();
    }
}
function isOtherNationality(sel) {
    if(sel.value === "Yes"){
        $('.otherNatTrue').show();
    }else{
        $('.otherNatTrue').hide();
    }
}
function isOtherTaxResCountry(sel) {
    if(sel.value === "Yes"){
        $(sel).parents(':eq(1)').next().show();
    }else{
        $(sel).parents(':eq(1)').next().hide();
    }
}
function isPersCards(sel) {
    if(sel.value === "Yes"){
        $('.persCardsTrue').show();
    }else{
        $('.persCardsTrue').hide();
    }
}
function isBankAcc(sel) {
    if(sel.value === "Yes"){
        $('.bankAccTrue').show();
    }else{
        $('.bankAccTrue').hide();
    }
}
function isCourtProc(sel) {
    if(sel.value === "Yes"){
        $('.courtProcTrue').show();
    }else{
        $('.courtProcTrue').hide();
    }
}
function persCardSelected(sel) {
    if(sel.value === "Other"){
    $(sel).parents(':eq(1)').next().show();
    }else{
        $(sel).parents(':eq(1)').next().hide();
    }
}
function isChequeBook(sel) {
    if(sel.value === "Yes"){
        $('.chequeBookTrue').show();
    }else{
        $('.chequeBookTrue').hide();
    }
}
function isPayinBook(sel) {
    if(sel.value === "Yes"){
        $('.payinBookTrue').show();
    }else{
        $('.payinBookTrue').hide();
    }
}  
 
function isConfirmRead(check){
    if($(check).is(':checked')) { 
        $(check).parents(':eq(3)').next().show();
     }else{
        $(check).parents(':eq(3)').next().hide();
    }
}
function isOverdraft(sel) {
    if(sel.value === "Yes"){
        $('.overdraftTrue').show();
    }else{
        $('.overdraftTrue').hide();
    }
}



    var storage = $.localStorage;


    var bizDetailsInputs = $('#businessDetails,#additionalDetails').find('input,select');

    var bizDetailsInputsClone = bizDetailsInputs.clone();

    bizDetailsInputsClone.each(function () {
        $(this).removeAttr( "onchange" );
        var inputID = $(this).attr('id');

        var trID = inputID;
        var trVal = $('#' + inputID).val();
        var trEdit = $('#' + inputID).closest(".col-sm-7").html();

        var tr = { "id": trID, "value": trVal, "editHtml": trEdit };


        storage.set(trID + '-tr', tr);
    });

    var bankingRequirements = $('#bankingRequirements').find('input[type=text],select');
    var bankingRequirementsClone = bankingRequirements.clone();
    bankingRequirementsClone.each(function () {
        $(this).removeAttr( "onchange" );
        var inputID = $(this).attr('id');

        var trID = inputID;
        var trVal = $('#' + inputID).val();
        var trEdit = $('#' + inputID).closest(".col-sm-7").html();

        var tr = { "id": trID, "value": trVal, "editHtml": trEdit };


        storage.set(trID + '-tr', tr);
    });




