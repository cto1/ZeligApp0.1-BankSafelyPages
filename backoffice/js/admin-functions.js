/*Organisation Page*/
$(document).ready(function() {
    $('#timezone-select').timezones();

    var i;
    for ( i = 1; i < 13; i++ ) {
        if ( i === 8 ) {
            $('.hours-select-am').append('<option value="' + i + '" selected>' + i + ':00</option>');
        } else {
            $('.hours-select-am').append('<option value="' + i + '">' + i + ':00</option>');
        }
    }
    var j;
    for ( j = 1; j < 13; j++ ) {
        if ( j === 5 ) {
            $('.hours-select-pm').append('<option value="' + j + '" selected>' + j + ':00</option>');
        } else {
            $('.hours-select-pm').append('<option value="' + j + '">' + j + ':00</option>');
        }
    }
} );


var storage = $.localStorage;


var organisationJSON = storage.get('bizTableJSON');
var dayNumber;

for ( dayNumber = 1; dayNumber < 8; dayNumber++ ) {

    $('.day' + dayNumber + '-tr .disable-day').attr('checked', organisationJSON['day-' + dayNumber].enabled);
    if(!$('.day' + dayNumber + '-tr .disable-day').is(':checked')){
        var target = $('.day' + dayNumber + '-tr .disable-day').parents(':eq(3)');
        target.css({'background-color':'#ddd','cursor':'not-allowed'});
        target.find('select,.all-day').prop('disabled',true);
        $('.day' + dayNumber + '-tr .disable-day').parents(':eq(2)').prop('disabled',false);
    }
    $('.day' + dayNumber + '-tr .hours-select-am').val(organisationJSON['day-' + dayNumber].hoursFrom);
    $('.day' + dayNumber + '-tr .from-am-pm').val(organisationJSON['day-' + dayNumber].fromAMPM);
    $('.day' + dayNumber + '-tr .hours-select-pm').val(organisationJSON['day-' + dayNumber].hoursTo);
    $('.day' + dayNumber + '-tr .to-am-pm').val(organisationJSON['day-' + dayNumber].toAMPM);
    $('.day' + dayNumber + '-tr .all-day').attr('checked', organisationJSON['day-' + dayNumber].allDay);
}

$('#timezone-select').val(storage.get('timeZone'));
$('#lang-select').val(storage.get('lang'));


function initBizHoursData() {

    var bizTableJSON = {
        "day-1": {
            "enabled"  : true,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        },
        "day-2": {
            "enabled"  : true,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        },
        "day-3": {
            "enabled"  : true,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        },
        "day-4": {
            "enabled"  : true,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        },
        "day-5": {
            "enabled"  : true,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        },
        "day-6": {
            "enabled"  : false,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        },
        "day-7": {
            "enabled"  : false,
            "hoursFrom": "8:00",
            "fromAMPM" : "AM",
            "hoursTo"  : "5:00",
            "toAMPM"   : "PM",
            "allDay"   : false
        }
    };

    storage.set('bizTableJSON',bizTableJSON);
    storage.set('lang','English');
    storage.set('timeZone','Etc/Greenwich');

}
function saveOrg() {
    var dayNumber;
    var enabled='',hoursFrom,fromAMPM,hoursTo,toAMPM,allDay,tempName, newData = {};

    for ( dayNumber = 1; dayNumber < 8; dayNumber++ ) {
        enabled = $('.day' + dayNumber + '-tr .disable-day').is(":checked");
        hoursFrom = $('.day' + dayNumber + '-tr .hours-select-am').val();
        fromAMPM = $('.day' + dayNumber + '-tr .from-am-pm').val();
        hoursTo = $('.day' + dayNumber + '-tr .hours-select-pm').val();
        toAMPM = $('.day' + dayNumber + '-tr .to-am-pm').val();
        allDay = $('.day' + dayNumber + '-tr .all-day').is(":checked");

        tempName = 'day-' + dayNumber;
        newData['day-' + dayNumber] = {
            "enabled"  : enabled,
            "hoursFrom": hoursFrom,
            "fromAMPM" : fromAMPM,
            "hoursTo"  : hoursTo,
            "toAMPM"   : toAMPM,
            "allDay"   : allDay

        };
    }
    $('#timezone-select').val(storage.get('timeZone'));

    storage.set('lang',$('#lang-select').val());
    storage.set('timeZone',$('#timezone-select').val());
    storage.set('bizTableJSON', newData);

    showSuccessMsg('Settings Saved');
}

$('.disable-day:checkbox').change(function () {
    var target = $(this).parents(':eq(3)');
    if($(this).is(':checked')) {
        target.css({'background-color':'#fff','cursor':'default'});
        target.find('select,.all-day').prop('disabled',false);
    }else {
        target.css({'background-color':'#ddd','cursor':'not-allowed'});
        target.find('select,.all-day').prop('disabled',true);
    }
    $(this).parents(':eq(2)').prop('disabled',false);
});

/*Sites Page*/

$('#add-site-timezone-select').timezones();

$('.disableEdit').hide();

function enableEditing(){
  $('.actions-td').show();
  $('.enableEdit').hide();
  $('.disableEdit').show();
}
function disableEditing(){
  $('.actions-td').hide();
  $('.disableEdit').hide();
  $('.enableEdit').show();
}

function sitesActionSelect(sel) {
    var siteId = $(sel).parents(':eq(1)').attr("id");
    if($(sel).val()=="Edit"){
      editSite(siteId);
    }
    if($(sel).val()=="Delete"){
      delSiteModal(siteId);
    }
    $(sel).val("Actions")
}
function editSite(id){
  var target = $('#'+id),
      siteName = target.find('.site-name-td').text(),
      siteLocation = target.find('.site-location-td').text(),
      siteDesc = target.find('.site-desc-td').text(),
      siteUsers = target.find('.site-users-td').text(),
      siteTimeZone = target.find('.site-timezone-td').text(),
      siteLang = target.find('.site-lang-td').text(),
      siteManager = target.find('.site-manager-td').text(),
      siteAssignee = target.find('.site-assignee-td').text(),
      siteBizHours = target.find('.bizHours-td').text();
    
    var modal = $('#edit-site-modal');
    
    modal.find('#edit-site-name').val(siteName);
    modal.find('#edit-site-location').val(siteLocation);
    modal.find('#edit-site-desc').val(siteDesc);
    modal.find('#edit-site-users').val(siteUsers);
    modal.find('#edit-site-timezone-select').val(siteTimeZone);
    modal.find('#edit-site-lang-select').val(siteLang);
    modal.find('#edit-site-manager').val(siteManager);
    modal.find('#edit-assignee').val(siteAssignee);
    modal.find('#edit-biz-hours').val(siteBizHours);
    modal.find('.control-btn-save').data('trID',id);

    modal.modal('show');

}
function saveSite() {
    var modal = $('#edit-site-modal');
    var rowID = modal.find('.control-btn-save').data('trID');

    $('#'+ rowID + ' .site-name-td').text(modal.find('#edit-site-name').val());
    $('#'+ rowID + ' .site-location-td').text(modal.find('#edit-site-location').val());
    $('#'+ rowID + ' .site-desc-td').text(modal.find('#edit-site-desc').val());
    $('#'+ rowID + ' .site-users-td').text(modal.find('#edit-site-users').val());
    $('#'+ rowID + ' .site-timezone-td').text(modal.find('#edit-site-timezone-select').val());
    $('#'+ rowID + ' .site-lang-td').text(modal.find('#edit-site-lang-select').val());
    $('#'+ rowID + ' .site-manager-td').text(modal.find('#edit-site-manager').val());
    $('#'+ rowID + ' .site-assignee-td').text(modal.find('#edit-assignee').val());
    $('#'+ rowID + ' .site-bizHours-td').text(modal.find('#edit-biz-hours').val());
    modal.modal('hide');
    
}
function delSiteModal(id){
    var siteName = $('#'+ id + ' .site-name-td').text();
    var modal = $('#del-site-modal');
    modal.find('.del-site-name').text(siteName);
    modal.find('.control-btn-del').data('trID',id);
    modal.modal('show');
}
function delSite(){
    var modal = $('#del-site-modal');
    var rowID = modal.find('.control-btn-del').data('trID');
    $('#'+rowID).remove();
    modal.modal('hide');
}

function addSiteModal(){
    $('#add-site-modal').modal('show');
}

var sitesCount = 2;
function addSite(btn){
  sitesCount++;
  var target = $(btn).parents(':eq(1)'),
      siteName = target.find('#add-site-name').val(),
      siteLocation = target.find('#add-site-location').val(),
      siteDesc = target.find('#add-site-desc').val(),
      siteUsers = target.find('#add-site-users').val(),
      siteTimeZone = target.find('#add-site-timezone-select').val(),
      siteLang = target.find('#add-site-lang-select').val(),
      siteManager = target.find('#add-site-manager').val(),
      siteAssignee = target.find('#add-site-assignee').val(),
      siteBizHours = target.find('#add-biz-hours').val();

      $('#sites-table tbody').append('<tr id="site'+sitesCount+'-tr"><td class="site-name-td">'+siteName+'</td><td' +
          ' class="site-location-td">'+siteLocation+'</td><td class="site-desc-td">'+siteDesc+'</td><td' +
          ' class="site-manager-td">'+siteManager+'</td><td class="site-assignee-td">'+siteAssignee+'</td><td' +
          ' class="site-users-td">'+siteUsers+'</td><td class="site-timezone-td">'+siteTimeZone+'</td><td' +
          ' class="site-lang-td">'+siteLang+'</td><td class="site-bizHours-td">'+siteBizHours+'</td><td' +
          ' class="actions-td"><select class="actions-select" onchange="sitesActionSelect(this);"><option value="Actions">Actions</option><option value="Edit">Edit</option><option value="Delete">Delete</option></select></td></tr>');
      $('#add-site-modal').modal('hide');
}


/*Departments Page*/

function addDepModal(){
    $('#add-dep-modal').modal('show');
}

function depActionSelect(sel) {
    var depId = $(sel).parents(':eq(1)').attr("id");
    if($(sel).val()=="Edit"){
        editDep(depId);
    }
    if($(sel).val()=="Delete"){
        delDepModal(depId);
    }
    $(sel).val("Actions")
}
function editDep(id){
    var target = $('#'+id),
        depName = target.find('.dep-name-td').text(),
        depDesc = target.find('.dep-desc-td').text(),
        depAssignee = target.find('.dep-assignee-td').text(),
        depUsers = target.find('.dep-users-td').text();


    var modal = $('#edit-dep-modal');

    modal.find('#edit-dep-name').val(depName);
    modal.find('#edit-dep-desc').val(depDesc);
    modal.find('#edit-dep-assignee').val(depAssignee);
    modal.find('#edit-dep-users').val(depUsers);

    modal.find('.control-btn-save').data('trID',id);

    modal.modal('show');

}
function saveDep() {
    var modal = $('#edit-dep-modal');
    var rowID = modal.find('.control-btn-save').data('trID');

    $('#'+ rowID + ' .dep-name-td').text(modal.find('#edit-dep-name').val());
    $('#'+ rowID + ' .dep-desc-td').text(modal.find('#edit-dep-desc').val());
    $('#'+ rowID + ' .dep-assignee-td').text(modal.find('#edit-dep-assignee').val());
    $('#'+ rowID + ' .dep-users-td').text(modal.find('#edit-dep-users').val());
    modal.modal('hide');

}
function delDepModal(id){
    var depName = $('#'+ id + ' .dep-name-td').text();
    var modal = $('#del-dep-modal');
    modal.find('.del-dep-name').text(depName);
    modal.find('.control-btn-del').data('trID',id);
    modal.modal('show');
}
function delDep(){
    var modal = $('#del-dep-modal');
    var rowID = modal.find('.control-btn-del').data('trID');
    $('#'+rowID).remove();
    modal.modal('hide');
}

var depsCount = 2;
function addDep(btn){
    depsCount++;
    var target = $(btn).parents(':eq(1)'),
        depName = target.find('#add-dep-name').val(),
        depDesc = target.find('#add-dep-desc').val(),
        depAssignee = target.find('#add-dep-assignee').val(),
        depUsers = target.find('#add-dep-users').val();

    $('#departments-table tbody').append('<tr id="dep'+depsCount+'-tr"><td class="dep-name-td">'+depName+'</td><td class="dep-desc-td">'+depDesc+'</td><td class="dep-assignee-td">'+depAssignee+'</td><td' +
        ' class="dep-users-td">'+depUsers+'</td><td' +
        ' class="actions-td"><select class="actions-select" onchange="depActionSelect(this);"><option value="Actions">Actions</option><option value="Edit">Edit</option><option value="Delete">Delete</option></select></td></tr>');
    $('#add-dep-modal').modal('hide');
}


/*App Settings Page*/

function saveAppSettings() {
    showSuccessMsg('Settings Saved');
}