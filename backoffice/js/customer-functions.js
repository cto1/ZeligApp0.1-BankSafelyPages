



$('[id^=task-dd-]').hide();
$('[id^=note-dd-]').hide();

$('.note-detail i.toggle').click(function() {
    var input = $(this).parent().parent();
    var target = $('#' + input.attr('data-toggle'));
    target.slideToggle(0);
});

$('.task-detail .toggle').click(function() {
    $input2 = $(this).parent().parent();
    $target2 = $('#' + $input2.attr('data-toggle'));
    $target2.slideToggle(0);
});


$(function() {
    $('#datetimepicker-edit-task').datetimepicker({
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'bottom'
        },
        viewMode: 'years',
        sideBySide: true,
        locale: 'en-gb',
        format: 'L'
    });
    $('#datetimepicker-add-task').datetimepicker({
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'bottom'
        },
        viewMode: 'years',
        sideBySide: true,
        locale: 'en-gb',
        format: 'L'
    });
});


var msgCount = 2;

var noteCount = 0;

function addNote() {

    noteCount++;

    var template = $('#note-template'),
        clone = template.clone(true,true).removeClass('hide').removeAttr('id'),
        noteText = $('#note-text-input').val();

    clone.find('.note-text p').text($('#note-text-input').val());
    clone.find('#note-').attr('data-toggle', 'note-dd-' + noteCount);
    clone.find('#note-').attr('id', 'note-' + noteCount);
    clone.find('.note-item-control').attr('id', 'note-dd-' + noteCount);


    $(".note-list .list-group").prepend(clone);
    $('#note-text-input').val("");
    $('.note-count').text(noteCount);

    addNoteMsg(noteText);
}

//add note on enter
$('#add-note-form').find('input').keypress(function(e){
    if ( e.which == 13 )
    {
        addNote();
        return false;
    }
});


function delNote() {
    $(this).parent().parent().parent().remove();
    noteCount--;
    $('.note-count').text(noteCount);
}

function editNote() {
    $('#edit-note-modal').on('show.bs.modal', function (event) {
        var target = $(event.relatedTarget),
            noteItem = target.parent().parent().parent(),
            noteID = target.parent().parent().prev().attr("id"),
            noteText = noteItem.find(".note-text p").text(),
            modal = $(this);

        modal.find('#edit-note-form #note-text-input-edit').val(noteText);
        modal.find('#edit-note-form .control-btn-save').attr("data-noteid",noteID);
    });
}

function saveNote() {
    var noteID = $(this).attr("data-noteid"),
        editedText = $('#note-text-input-edit').val();

    $('#'+noteID+' .note-text').text(editedText);
    $('#edit-note-modal').modal('hide');
}


var taskCount = 1;

function addTask() {

    taskCount++;

    var template = $('#task-template'),
        clone = template.clone(true,true).removeClass('hide').removeAttr('id');

    var taskUser = $('#task-ass-user-select').val(),
        taskTitle = $('#task-title-input').val();

    clone.find('.task-title strong').text($('#task-title-input').val());
    clone.find('.task-item-content .task-desc').text($('#task-desc-input').val());
    clone.find('.assigned-user a').text($('#task-ass-user-select').val());
    clone.find('#task-').attr('data-toggle', 'task-dd-' + taskCount);
    clone.find('#task-').attr('id', 'task-' + taskCount);
    clone.find('.task-item-content').attr('id', 'task-dd-' + taskCount);


    $(".task-list .list-group").prepend(clone);
    $('#task-title-input').val("");
    $('#task-desc-input').val("");
    $('#task-ass-user-select').val("No person assigned");
    $('.task-count').text(taskCount);

    addTaskMsg(taskUser,taskTitle);

}


function editTask() {
    $('#edit-task-modal').on('show.bs.modal', function (event) {
        var target = $(event.relatedTarget),
            taskItem = target.parent().parent().parent(),
            taskID = target.parent().parent().prev().attr("id"),
            taskTitle = taskItem.find(".task-title strong").text(),
            taskDesc = taskItem.find(".task-desc").text(),
            taskUser = taskItem.find(".assigned-user a").text(),
            modal = $(this);

        modal.find('#edit-task-form #task-title-input-edit').val(taskTitle);
        modal.find('#edit-task-form #task-desc-input-edit').val(taskDesc);
        modal.find('#edit-task-form #task-ass-user-select-edit').val(taskUser);
        modal.find('#edit-task-form .control-btn-save').attr("data-taskid",taskID);
    });
}

function saveTask() {
    var taskID = $(this).attr("data-taskid"),
        editedTitle = $('#task-title-input-edit').val(),
        editedDesc = $('#task-desc-input-edit').val(),
        editedUser = $('#task-ass-user-select-edit').val();

    $('#'+taskID+' .task-title strong').text(editedTitle);
    $('#'+taskID+' .assigned-user a').text(editedUser);
    $('#'+taskID).next().find('.task-desc').text(editedDesc);
    $('#edit-task-modal').modal('hide');
}

function delTask() {
    $(this).parent().parent().parent().remove();
    taskCount--;
    $('.task-count').text(taskCount);
}

function addTaskMsg(taskUser,taskTitle) {
    msgCount++;

    var template = $('#activity-msg-template'),
        clone = template.clone(true,true).removeClass('hide').removeAttr('id');

    clone.find('.qa-message-content').html('<span>system </span>assigned task <span>"'+taskTitle+'"</span> to <span>'+taskUser+'</span>');
    $(".qa-message-list").prepend(clone);
    $('.msg-count').text(msgCount);
}

function addNoteMsg(noteText) {
    msgCount++;

    var template = $('#activity-msg-template'),
        clone = template.clone(true,true).removeClass('hide').removeAttr('id');

    clone.find('.qa-message-content').html('<span>system </span>added new note <span>"'+noteText+'"</span>');
    $(".qa-message-list").prepend(clone);
    $('.msg-count').text(msgCount);
}

var compName = $('.customer-name').text();

function selectMember() {
    $('.member-select').find("tr").removeClass("info");
    var selectedRow = $(this).parent().parent();
    selectedRow.addClass("info");
    var rowIndex = $('tr').index(selectedRow) - 1;

    $('.princ-details tbody tr').removeClass("info");
    $('.princ-details tbody tr:nth-child('+rowIndex+')').addClass("info");




    var memberName = $(this).parent().text();
    var memberType = $(this).parent().next().text();
    var memberState = $(this).parent().next().next().next().next().find('p').text();

    $(".member-type-label").text(memberType);
    $(".member-state-label").text(memberState);


    if(memberState === "Verified"){
        $("span.member-state-label").addClass("label-success").removeClass("label-danger");
    }else{
        $("span.member-state-label").addClass("label-danger").removeClass("label-success");
    }

    if(memberName == compName){
        $('.customer-member-name').addClass("hide").text('');
        $('.breadcrumb').find("li.member-crumb").remove();
        $('.breadcrumb li.comp-crumb').addClass("active");
        $('.company-details').show();
        $('.company-member-details').hide();
    }else{
        $('.customer-member-name').removeClass("hide").text(' - '+memberName);
        $('.breadcrumb').find("li.comp-crumb").removeClass("active");
        $('.breadcrumb').find("li.comp-crumb").html('<a href="#">'+compName+'</a>');
        $('.breadcrumb').find("li.member-crumb").remove();
        $('.breadcrumb').append('<li class="active member-crumb">'+memberName+'</li>');
        $('.company-details').hide();
        $('.company-member-details').show();
    }
}


function showUploadIDsModal() {
    $('#upload-ids-modal').modal('show');
}








var editRowBtn = '<a id="editRowBtn" onclick="editRow.call(this)" style="float: right;display: none;"><i class="fa' +
    ' fa-pencil"' +
    ' aria-hidden="true"></i></a>';
var saveRowBtn = '<a id="saveRowBtn" onclick="saveRow.call(this)" style="float: right"><i class="fa fa-check" aria-hidden="true"></i></a>';


$('.company-details-table tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('info') ) {
        $(this).removeClass('info');
        $(this).find("#editRowBtn").hide();
    }
    else {
        $('.company-details-table tr.info').find("#editRowBtn").hide();
        $('.company-details-table tr.info').removeClass('info');
        $(this).addClass('info');

        $(this).find("#editRowBtn").show();
    }
} );



$('.bankRequ-table tbody').on( 'click', 'tr', function () {
    if ( $(this).hasClass('info') ) {
        $(this).removeClass('info');
        $(this).find("#editRowBtn").hide();
    }
    else {
        $('.bankRequ-table tr.info').find("#editRowBtn").hide();
        $('.bankRequ-table tr.info').removeClass('info');
        $(this).addClass('info');

        $(this).find("#editRowBtn").show();
    }
} );




var storage = $.localStorage;

var compDetailsValues = $('.company-details-table tbody tr').find('td:last-child');

compDetailsValues.each(function(){
    var rowID = $(this).attr('id');
    $('#' + rowID).html(storage.get(rowID,'value'));

});


var bankRequValues = $('.bankRequ-table tbody tr').find('td:last-child');

bankRequValues.each(function(){
    var rowID = $(this).attr('id');
    $('#' + rowID).html(storage.get(rowID,'value'));

});


function saveRow() {

    var rowId = $(this).parent().attr("id");
    var inputId = storage.get(rowId,'id');

    var newVal = $('#' + inputId).val();

    $('.' + inputId + 'Fields').text(newVal);

    var editHtml = storage.get(rowId,'editHtml');

    var updatedRow = {"id" : inputId,"value" : newVal, "editHtml" : editHtml};

    storage.set(rowId,updatedRow);

    $('#' + rowId).html(storage.get(rowId,'value'));
    $('#' + rowId).append(editRowBtn);

}

function editRow() {
    var rowId = $(this).parent().attr("id");
    var inputId = storage.get(rowId,'id');


    $('#' + rowId).html(storage.get(rowId,'editHtml'));

    $('#' + inputId).val(storage.get(rowId,'value'));

    $('#' + rowId).append(saveRowBtn);

}

$('.company-details-table > tbody  tr td:last-child').append(editRowBtn);
$('.bankRequ-table > tbody  tr td:last-child').append(editRowBtn);



$('.compTypeFields').text(storage.get('compType-tr','value'));
$('.orgNameFields').text(storage.get('orgName-tr','value'));
$('.orgPhoneFields').text(storage.get('orgPhone-tr','value'));
$('.orgEmailFields').text(storage.get('orgEmail-tr','value'));
$('.orgMobPhoneFields').text(storage.get('orgMobPhone-tr','value'));
$('.compRegNumberFields').text(storage.get('compRegNumber-tr','value'));
$('.buildingNameNumberFields').text(storage.get('buildingNameNumber-tr','value'));
$('.streetNameFields').text(storage.get('streetName-tr','value'));
$('.townCityNameFields').text(storage.get('townCityName-tr','value'));
$('.countryStateNameFields').text(storage.get('countryStateName-tr','value'));
$('.countryNameFields').text(storage.get('countryName-tr','value'));
$('.postCoodeFields').text(storage.get('postCoode-tr','value'));
$('.tradingNameFields').text(storage.get('tradingName-tr','value'));

