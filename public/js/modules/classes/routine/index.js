
var calendar, selectedTime, eSelectedDate, eSelectedTime, action_bar, implementation, student_id = '',stdStartTime = [], days, time, endtime, id,
    stdDays = [],weakDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

let eventColor  = ['#9C00FF', '#0099cc', '#969696', '#19c5b5', '#1c8624', '#960698'];

const classes = function(){
    return{
        search_single: function () {
// console.log(days,student,id,time);
            if(days && !isNaN(student_id) && !isNaN(id) && time && endtime){
                $('#teachers_modal .teachers_data').empty();
                $.ajax({
                    url: DOMAIN+'classes/searchSingle',
                    data: { "student_id":student_id, "day":days, "time":time,"date":date },
                    type: 'POST',
                    dataType: 'json',
                    cache:false,
                    success: function (result) {
                        if(result.success){
                            toastr.success(result.response);
                            $('#eQModalLabel').text('Available teachers at: '+moment(time,'HH:mm:ss').format("HH:mm A")+' to '+moment(endtime,'HH:mm:ss').format("HH:mm A"));
                            var teachers = '';
                            $.each(result.data, function(k, v) {
                                var img = (v.avatar)?v.avatar:DOMAIN+IMG_LINK;
                                teachers += '<div class="col-md-4 mb-5">\n' +
                                '<div class="col-md-12 d-flex align-items-center bg-light p-2 rounded"><div class="symbol symbol-50 symbol-light-success mr-5">\n' +
                                '   <span class="symbol-label">\n' +
                                '       <img src="'+img+'" class="h-100 align-self-end img-thumbnail rounded" alt="">\n' +
                                '   </span>\n' +
                                '</div>\n' +
                                '<div class="d-flex flex-column flex-grow-1 font-weight-bold">\n' +
                                '   <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">'+v.name+'</a>\n' +
                                '<small class="text-muted">'+v.languages+'</small>\n' +
                                '</div>\n' +
                                '   <button class="btn btn-light-warning btn-sm" onclick="classes.transfer_single(\''+v.id+'\');">Transfer</button>\n' +
                                '</div></div>';
                            });
                            $('#modal_ajax  .modData').html('<div class="row p-4">'+teachers+'</div>');

                            $('#modal_ajax').modal('show');
                        }
                        else{
                            toastr.error(result.response);
                        }
                    }
                });
            }
        },
        transfer_single: function (teacher) {
            if(!isNaN(teacher) && !isNaN(student_id) && time && days && !isNaN(id)){
                $.ajax({
                    url: DOMAIN+'classes/transferClass',
                    data: { "student_id":student_id, "teacher_id":teacher, "id":id },
                    type: 'POST',
                    dataType: 'json',
                    success: function (res) {
                        if(res.success){
                            toastr.success(res.response);
                            calendar.refetchEvents();
                        }
                        else{
                            toastr.error(res.response);
                        }
                        $('.modal').modal('hide');
                        $('#kt_quick_assign_toggle').trigger('click');
                    },
                });
            }
        },
        search_teacher: function () {
            if(!isNaN(student_id) && time && date){
                $.ajax({
                    url: DOMAIN+'classes/searchTeacher',
                    data: { "student_id":student_id, "time":time, "date":date},
                    type: 'POST',
                    dataType: 'json',
                    success: function (result) {
                        // console.log(result.test);
                        // $('#modal_ajax .modData').empty();
                        // if(result.success){
                        //     $('#teachers_modalLabel').text('Available teachers at: '+time);

                        //     $.each(result.response, function(k, v) {
                        //         $('#modal_ajax .modData').append('<div class="col-md-4 mb-10">\n' +
                        //         '<div class="col-md-12 d-flex align-items-center bg-light p-2 rounded"><div class="symbol symbol-50 symbol-light-success mr-5">\n' +
                        //         '   <span class="symbol-label">\n' +
                        //         '       <img src="'+v.image+'" class="h-100 align-self-end img-thumbnail rounded" alt="">\n' +
                        //         '   </span>\n' +
                        //         '</div>\n' +
                        //         '<div class="d-flex flex-column flex-grow-1 font-weight-bold">\n' +
                        //         '   <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">'+v.first_name+' '+v.last_name+'</a>\n' +
                        //         '<span class="text-muted">'+v.language+'</span>\n' +
                        //         '</div>\n' +
                        //         '   <button class="btn btn-light-warning btn-sm" onclick="classes.transfer_teacher(\''+v.teacher_id+'\');">Transfer</button>\n' +
                        //         '</div></div>');
                        //     });
                        //     $('#modal_ajax').modal('show');

                        // }
                        // else{
                        //     toastr.error(result.response);
                        // }


                        if(result.success){
                            toastr.success(result.response);
                            $('#eQModalLabel').text('Available teachers at: '+moment(time,'HH:mm:ss').format("HH:mm A")+' to '+moment(endtime,'HH:mm:ss').format("HH:mm A"));
                            var teachers = '';
                            $.each(result.data, function(k, v) {
                                var img = (v.avatar)?v.avatar:DOMAIN+IMG_LINK;
                                teachers += '<div class="col-md-4 mb-5">\n' +
                                '<div class="col-md-12 d-flex align-items-center bg-light p-2 rounded"><div class="symbol symbol-50 symbol-light-success mr-5">\n' +
                                '   <span class="symbol-label">\n' +
                                '       <img src="'+img+'" class="h-100 align-self-end img-thumbnail rounded" alt="">\n' +
                                '   </span>\n' +
                                '</div>\n' +
                                '<div class="d-flex flex-column flex-grow-1 font-weight-bold">\n' +
                                '   <a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">'+v.name+'</a>\n' +
                                '<small class="text-muted">'+v.languages+'</small>\n' +
                                '</div>\n' +
                                '   <button class="btn btn-light-warning btn-sm" onclick="classes.transfer_teacher(\''+v.id+'\');">Transfer</button>\n' +
                                '</div></div>';
                            });
                            $('#modal_ajax  .modData').html('<div class="row p-4">'+teachers+'</div>');

                            $('#modal_ajax').modal('show');
                        }
                        else{
                            toastr.error(result.response);
                        }

                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        },
        transfer_teacher(teacher){
            var reason = prompt('Are you sure you want to transfer teacher? Enter Reason', '');
            if(reason.trim() != '') {
                if(!isNaN(teacher) && time && date){
                    $.ajax({
                        url: DOMAIN+'classes/transferTeacher',
                        data: {"reason" : reason, "teacher_id":teacher, "date":date,"student_id":student_id},
                        type: 'POST',
                        dataType: 'json',
                        success: function (res) {
                            if(res.success){
                                toastr.success(res.response);
                                calendar.refetchEvents();
                            }
                            else{
                                toastr.error(res.response);
                            }
                            $('.modal').modal('hide');
                            $('#kt_quick_assign_toggle').trigger('click');
                        },
                    });
                }
            }
        },
        delete_teacher: function(){
            KTApp.block(action_bar,{overlayColor:"#000000",type:"loader",state:"primary",message:"Loading"});
            var reason = prompt('Are you sure you want to delete teacher? Enter Reason', '');

            if(reason.trim() != '') {
                $.ajax({
                    url: DOMAIN+"classes/deleteClassTeacher",
                    data: {'reason' : reason, 'student_id' : student_id, 'teacher_id': teacher_id, "date":date},
                    type:'POST',
                    dataType: 'json',
                    success: function (result) {
                        if(result.success)
                        {
                            toastr.success(result.response);
                            calendar.refetchEvents();
                        } else{
                            toastr.error(result.response);
                            calendar.refetchEvents();
                        }
                        $('#kt_quick_assign_toggle').trigger('click');
                        KTApp.unblock(action_bar);
                    }
                });
            }
            else{
                KTApp.unblock(action_bar);
            }

        }
    }
}();

$(document).on('change','.updated_all_times',function(){
    $(".updated_all_time select option[value='"+$(".updated_all_times option:selected").val()+"']").attr("selected", "selected");
    $('.updated_all_time').selectpicker('refresh');
});

$(document).on('change','#AllDays',function(){
    if ($(this).prop("checked")) {
        $('.updated_all_days').attr('checked','checked');
    } else {
        $('.updated_all_days').removeAttr('checked');
    }
});

function checkDays(day){
    if($.inArray(day,stdDays) >= 0){
        return 'checked';
    }
    return '';
}

var KTCalendarBasic = function() {

    return {
        //main function to initiate the module
        init: function() {
            var currentdate = new Date();
            var todayDate = moment().startOf('day');
            var YM = todayDate.format('YYYY-MM');
            var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
            var TODAY = todayDate.format('YYYY-MM-DD');
            var NowTime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

            var calendarEl = document.getElementById('kt_calendar');
            calendar = new FullCalendar.Calendar(calendarEl, {
                plugins: [ 'bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list' ],
                themeSystem: 'bootstrap',
                isRTL: KTUtil.isRTL(),
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                height: 800,
                contentHeight: 780,
                aspectRatio: 3,  // see: https://fullcalendar.io/docs/aspectRatio
                nowIndicator: true,
                eventLimit: true, // allow "more" link when too many events
                stickyHeaderDates : true,
                firstDay:1,
                // now: TODAY + 'T09:25:00', // just for demo
                eventTimeFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: true
                },
                defaultView: 'timeGridWeek',
                defaultDate: TODAY,
                displayEventTime: false,
                editable: true,
                // weekends: false,
                // hiddenDays: [0],
                navLinks: true,
                // minTime: "07:00:00",
                // maxTime: "17:00:00",
                // scrollTime: "07:00:00",
                views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week', eventLimit: 2 },
                    timeGridDay: { buttonText: 'day' },
                    pastAndFutureView: {
                        visibleRange: function(currentDate) {
                            // Generate a new date for manipulating in the next step
                            var startDate = new Date(currentDate.valueOf());
                            var endDate = new Date(currentDate.valueOf());

                            // Adjust the start & end dates, respectively
                            startDate.setDate(startDate.getDate() - 1); // One day in the past
                            endDate.setDate(endDate.getDate() + 2); // Two days into the future

                            return { start: startDate, end: endDate };
                        }
                    }
                },
                eventResize:function(info){

                    if (confirm("Update class duration?")) {
                        var endh = moment(info.event.end).format("HH");
                        var endm = moment(info.event.end).format("mm");
                        var day = moment(info.event.start).format("dddd");
                        var date = moment(info.event.start).format("YYYY-MM-DD");
                        $.ajax({
                            url: DOMAIN+'classes/resize_class',
                            data: {
                                "student_id":info.event.extendedProps.student_id,
                                "teacher_id": teacher_id,
                                "day":day,
                                "date": date,
                                "hour": endh,
                                "min": endm
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function (result) {
                                if(result.success === 'yes'){
                                    toastr.success(result.response);
                                    refetchEvents();
                                }else{
                                    toastr.error(result.response);
                                }
                            },
                            error: function (result) {
                                console.log(result);
                            }
                        });
                    }else{
                        info.revert();
                    }
                },
                eventDrop:function(info){
                    if(confirm('Do you want to save changes??')){
                        var diff = moment(info.event.end).diff(info.event.start, 'minutes');
                        var time = moment(info.event.start).format("HH:mm");
                        var day = moment(info.event.start).format("dddd");
                        var date = moment(info.event.start).format("YYYY-MM-DD");
                        var oldDate = moment(info.oldEvent.start).format("YYYY-MM-DD");
                        var color = '#0000ff';
                        if(typeof info.event.backgroundColor !== 'undefined' && info.event.backgroundColor !== null )
                            color = info.event.backgroundColor;
                        if(diff && time && day && date && color){
                            $.ajax({
                                url: DOMAIN+"classes/delete_class/",
                                data: {
                                    "event_id": info.event.id,
                                    "teacher_id": teacher_id,
                                    "student_id":info.event.extendedProps.student_id,
                                    "student_type":info.event.extendedProps.studentType,
                                    "day":  day,
                                    "date": date,
                                    "oldDate": oldDate,
                                    "class_time":time,
                                    "duration":diff,
                                    "color":color
                                },
                                type: 'POST',
                                dataType: 'json',
                                success: function (result) {
                                    if(result.success === 'yes'){
                                        toastr.success(result.response);

                                    }
                                    if(result.success === 'no'){
                                        toastr.error(result.response);
                                        info.revert();
                                    }
                                },
                                error: function(res){
                                    console.log(res);
                                    info.revert();
                                }
                            });

                        }
                        else{
                            toastr.error('Error in data');
                        }
                    }else{
                        info.revert();
                    }
                },
                loading: function( isLoading ) {
                    if(isLoading) {
                        KTApp.block("#kt_calendar", {
                            overlayColor: "#000000",
                            type: "loader",
                            state: "brand",
                            opacity: .07,
                            message: "Loading Classes...",
                            size: "lg"
                        });
                    } else {
                        KTApp.unblock("#kt_calendar");
                    }
                },
                events: function(info, successCallback, failureCallback) {

                    var from = moment(info.startStr).format('YYYY-MM-DD');
                    var to = moment(info.endStr).format('YYYY-MM-DD');
                    KTApp.block("#kt_calendar", {
                        overlayColor: "#000000",
                        type: "loader",
                        state: "brand",
                        opacity: .07,
                        message: "Loading Classes...",
                        size: "lg"
                    });
                    $.ajax({
                        url: DOMAIN +'classes/get_classes',
                        type: 'POST',
                        dataType:"json",
                        async:false ,
                        data: {"teacher_id":teacher_id,"from":from,"to":to,"student":$('#student').val()},
                        success: function(res) {
                            if(res.success){
                                successCallback(
                                   res.data
                                )
                            }else{
                                failureCallback(res.data);
                            }
                            KTApp.unblock("#kt_calendar");
                        }
                    });

                },
                select: function(info) {
                    selectedTime = moment(info.startStr).format('YYYY-MM-DD HH:mm:ss');
                    eSelectedDate = moment(info.startStr).format('YYYY-MM-DD');
                    eSelectedTime = moment(info.startStr).format('hh:mm A');
                    action_bar = $('#kt_quick_assign');
                    implementation = $('#kt_quick_assign_offcanvas');
                    implementation.html(getFormHtml());
                    $('#kt_quick_assign_toggle').trigger('click');
                },
                eventRender: function(info) {
                    var element = $(info.el);
                    element.popover({
                        animation:true,
                        delay: 300,
                        content: info.event.extendedProps.fullname+' ['+info.event.extendedProps.country+']',
                        trigger: 'hover'
                    });

                    console.table(info);

                    if (info.event.extendedProps && info.event.extendedProps.teacher_id) {
                        if (element.find('.fc-content').lenght !== 0) {
                            element.find('.fc-content').append(`<div class="fc-event_action float-right position-absolute"
                            user_id="${info.event.extendedProps.student_id}"></div>`);
                        }
                    }
                    element.find('.fc-content').append('<span class="event_action_btn  float-right position-absolute" teacher_id="'+info.event.extendedProps.teacher_id+'"  id="'+info.event.extendedProps.event_id+'" ><i class="la la-ellipsis-v"></i></span>');

                },
            });

            calendar.render();
        }
    };
}();

jQuery(document).ready(function() {
    KTCalendarBasic.init();
});

jQuery(document).on('change','.checkButtunStatus',function() {
    if($(this).prop('checked')){
        calendar.setOption('editable', true);
        calendar.setOption('selectable', true);
        calendar.setOption('selectHelper', true);
    }else{
        calendar.setOption('editable', false);
        calendar.setOption('selectable', false);
        calendar.setOption('selectHelper', false);
    }
});

function getFormHtml() {

    function getSelectHowlong(name) {
        var hselect = '<select class="form-control howLongInput" id="valTimeMinutes" required name="' + name + '">';

        hselect += '<option value="15">15 Minutes</option>';
        hselect += '<option value="30" selected>30 Minutes</option>';
        hselect += '<option value="60" >1 Hour</option>';
        hselect += '<option value="90" >90 Minutes</option>';
        hselect += '</select>';
        return hselect;
    }

    function getClassUpdatedTime(time,id, classes) {
        var tSelect = '<select name="starttime['+id+']" class="form-control '+classes+'" title="From" required> ';
                tSelect += '<option class="'+moment(time).format('hh:mm A')+'" '+(time == '' ? '' : 'selected')+'>'+moment(time).format('hh:mm A')+'</option>';
                tSelect += '<option value="12:00 AM" '+(time == '' ? 'selected' : '')+'>12:00 AM</option>';
                tSelect += '<option value="12:30 AM">12:30 AM</option>';
                tSelect += '<option value="01:00 AM">01:00 AM</option>';
                tSelect += '<option value="01:30 AM">01:30 AM</option>';
                tSelect += '<option value="02:00 AM">02:00 AM</option>';
                tSelect += '<option value="02:30 AM">02:30 AM</option>';
                tSelect += '<option value="03:00 AM">03:00 AM</option>';
                tSelect += '<option value="03:30 AM">03:30 AM</option>';
                tSelect += '<option value="04:00 AM">04:00 AM</option>';
                tSelect += '<option value="04:30 AM">04:30 AM</option>';
                tSelect += '<option value="05:00 AM">05:00 AM</option>';
                tSelect += '<option value="05:30 AM">05:30 AM</option>';
                tSelect += '<option value="06:00 AM">06:00 AM</option>';
                tSelect += '<option value="06:30 AM">06:30 AM</option>';
                tSelect += '<option value="07:00 AM">07:00 AM</option>';
                tSelect += '<option value="07:30 AM">07:30 AM</option>';
                tSelect += '<option value="08:00 AM">08:00 AM</option>';
                tSelect += '<option value="08:30 AM">08:30 AM</option>';
                tSelect += '<option value="09:00 AM">09:00 AM</option>';
                tSelect += '<option value="09:30 AM">09:30 AM</option>';
                tSelect += '<option value="10:00 AM">10:00 AM</option>';
                tSelect += '<option value="10:30 AM">10:30 AM</option>';
                tSelect += '<option value="11:00 AM">11:00 AM</option>';
                tSelect += '<option value="11:30 AM">11:30 AM</option>';
                tSelect += '<option value="12:00 PM">12:00 PM</option>';
                tSelect += '<option value="12:30 PM">12:30 PM</option>';
                tSelect += '<option value="01:00 PM">01:00 PM</option>';
                tSelect += '<option value="01:30 PM">01:30 PM</option>';
                tSelect += '<option value="02:00 PM">02:00 PM</option>';
                tSelect += '<option value="02:30 PM">02:30 PM</option>';
                tSelect += '<option value="03:00 PM">03:00 PM</option>';
                tSelect += '<option value="03:30 PM">03:30 PM</option>';
                tSelect += '<option value="04:00 PM">04:00 PM</option>';
                tSelect += '<option value="04:30 PM">04:30 PM</option>';
                tSelect += '<option value="05:00 PM">05:00 PM</option>';
                tSelect += '<option value="05:30 PM">05:30 PM</option>';
                tSelect += '<option value="06:00 PM">06:00 PM</option>';
                tSelect += '<option value="06:30 PM">06:30 PM</option>';
                tSelect += '<option value="07:00 PM">07:00 PM</option>';
                tSelect += '<option value="07:30 PM">07:30 PM</option>';
                tSelect += '<option value="08:00 PM">08:00 PM</option>';
                tSelect += '<option value="08:30 PM">08:30 PM</option>';
                tSelect += '<option value="09:00 PM">09:00 PM</option>';
                tSelect += '<option value="09:30 PM">09:30 PM</option>';
                tSelect += '<option value="10:00 PM">10:00 PM</option>';
                tSelect += '<option value="10:30 PM">10:30 PM</option>';
                tSelect += '<option value="11:00 PM">11:00 PM</option>';
                tSelect += '<option value="11:30 PM">11:30 PM</option>';
            tSelect += '</select>';

            return tSelect;
    }

    var htmlForm = '<form class="addclass-event-form" id="addNewClass"><input type="hidden" name="teacher_id" value="'+teacher_id+'">';
    htmlForm += '<div class="form-group mb-4"><select id="student_dropdown" name="student_id" title="-- Select Student --" class="form-control" data-live-search="true" required>';

    htmlForm += '</select></div>';
    htmlForm += '<div class="form-group colors mb-3"><div class="btn-group btn-group-justified popoverColors" data-toggle="buttons">'
    for(var i=0; i<eventColor.length; i++) {
        var active = (i == 0)?'active':'';
        htmlForm += '<label class="btn '+active+'" style="background:' + eventColor[i] + ';border-color:' + eventColor[i] + ';">';
        htmlForm += '<input type="radio"  name="color" class="color" value="' + eventColor[i] + '"><span>&nbsp;</span></label>';
    }
    htmlForm += '</div></div>';

    htmlForm +='<div class="row">';
    htmlForm += '<div class="col-md-6"><input type="text" class="form-control classDate" readonly="readonly" name="startdate" /></div>';
    htmlForm += '<div class="col-md-6">'+ getSelectHowlong('howlong') + '</div></div>';
    htmlForm +='</div>';
    htmlForm +='<div class="separator separator-dashed separator-dark my-3"></div>';
    htmlForm +='<div>';
    htmlForm +='<div id="scheduleDays" class="form-group mb-3"> ';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="AllDays" class="updated_all_days" value="Select All">  Select All </label></div><div class="col-md-6">'+ getClassUpdatedTime('',0,'updated_all_times') + '</div></div></div><div class="separator separator-dashed separator-dark my-3"></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Monday" class="updated_all_days" name="days[1]" value="Monday" '+checkDays('Monday')+'>  Monday </label></div><div class="col-md-6">'+ getClassUpdatedTime('','Monday','updated_all_time') + '</div></div></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Tuesday" class="updated_all_days" name="days[2]" value="Tuesday" '+checkDays('Tuesday')+'>  Tuesday </label></div><div class="col-md-6">'+ getClassUpdatedTime('','Tuesday','updated_all_time') + '</div></div></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Wednesday" class="updated_all_days" name="days[3]" value="Wednesday" '+checkDays('Wednesday')+'>  Wednesday </label></div><div class="col-md-6">'+ getClassUpdatedTime( '','Wednesday','updated_all_time') + '</div></div></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Thursday" class="updated_all_days" name="days[4]" value="Thursday" '+checkDays('Thursday')+'>  Thursday </label></div><div class="col-md-6">'+ getClassUpdatedTime('','Thursday','updated_all_time') + '</div></div></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Friday" class="updated_all_days" name="days[5]" value="Friday" '+checkDays('Friday')+'>  Friday </label></div><div class="col-md-6">'+ getClassUpdatedTime('','Friday','updated_all_time') + '</div></div></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Saturday" class="updated_all_days" name="days[6]" value="Saturday" '+checkDays('Saturday')+'>  Saturday </label></div><div class="col-md-6">'+ getClassUpdatedTime('','Saturday','updated_all_time') + '</div></div></div>';
    htmlForm +='<div class=""><div class="row mb-1">';
    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="Sunday" class="updated_all_days" name="days[7]" value="Sunday" '+checkDays('Sunday')+'>  Sunday </label></div><div class="col-md-6">'+ getClassUpdatedTime('','Sunday','updated_all_time') + '</div></div></div>';

    htmlForm +='</div>';
    htmlForm +='</div>'

    htmlForm += '<div class="row my-3"><div class="col-md-6"><button class="btn btn-primary btn-block btn-sm" type="submit">Submit</button></div>';
    htmlForm += '<div class="col-md-6"><button class="btn btn-danger btn-block btn-sm close_action_bar" type="reset">Cancel</button></div></div>';
    htmlForm += '<div class="clearfix"></div>';
    htmlForm += '</form>';
    getFormStudents();
    return htmlForm
}

function getFormHtmlUpdate(student) {

    function getSelectHowlong(name) {
        var hselect = '<select class="form-control howLongInput" id="valTimeMinutes" required name="' + name + '">';

        hselect += '<option value="15">15 Minutes</option>';
        hselect += '<option value="30" selected>30 Minutes</option>';
        hselect += '<option value="60" >1 Hour</option>';
        hselect += '<option value="90" >90 Minutes</option>';
        hselect += '</select>';
        return hselect;
    }

    function getClassUpdatedTime(time,id, classes) {

        var tSelect = '<select name="starttime['+id+']" class="form-control '+classes+'" title="From" required> ';
                tSelect += '<option class="'+moment(time).format('hh:mm A')+'" '+(time == '' ? '' : 'selected')+'>'+moment(time).format('hh:mm A')+'</option>';
                tSelect += '<option value="12:00 AM" '+(time == '' ? 'selected' : '')+'>12:00 AM</option>';
                tSelect += '<option value="12:30 AM">12:30 AM</option>';
                tSelect += '<option value="01:00 AM">01:00 AM</option>';
                tSelect += '<option value="01:30 AM">01:30 AM</option>';
                tSelect += '<option value="02:00 AM">02:00 AM</option>';
                tSelect += '<option value="02:30 AM">02:30 AM</option>';
                tSelect += '<option value="03:00 AM">03:00 AM</option>';
                tSelect += '<option value="03:30 AM">03:30 AM</option>';
                tSelect += '<option value="04:00 AM">04:00 AM</option>';
                tSelect += '<option value="04:30 AM">04:30 AM</option>';
                tSelect += '<option value="05:00 AM">05:00 AM</option>';
                tSelect += '<option value="05:30 AM">05:30 AM</option>';
                tSelect += '<option value="06:00 AM">06:00 AM</option>';
                tSelect += '<option value="06:30 AM">06:30 AM</option>';
                tSelect += '<option value="07:00 AM">07:00 AM</option>';
                tSelect += '<option value="07:30 AM">07:30 AM</option>';
                tSelect += '<option value="08:00 AM">08:00 AM</option>';
                tSelect += '<option value="08:30 AM">08:30 AM</option>';
                tSelect += '<option value="09:00 AM">09:00 AM</option>';
                tSelect += '<option value="09:30 AM">09:30 AM</option>';
                tSelect += '<option value="10:00 AM">10:00 AM</option>';
                tSelect += '<option value="10:30 AM">10:30 AM</option>';
                tSelect += '<option value="11:00 AM">11:00 AM</option>';
                tSelect += '<option value="11:30 AM">11:30 AM</option>';
                tSelect += '<option value="12:00 PM">12:00 PM</option>';
                tSelect += '<option value="12:30 PM">12:30 PM</option>';
                tSelect += '<option value="01:00 PM">01:00 PM</option>';
                tSelect += '<option value="01:30 PM">01:30 PM</option>';
                tSelect += '<option value="02:00 PM">02:00 PM</option>';
                tSelect += '<option value="02:30 PM">02:30 PM</option>';
                tSelect += '<option value="03:00 PM">03:00 PM</option>';
                tSelect += '<option value="03:30 PM">03:30 PM</option>';
                tSelect += '<option value="04:00 PM">04:00 PM</option>';
                tSelect += '<option value="04:30 PM">04:30 PM</option>';
                tSelect += '<option value="05:00 PM">05:00 PM</option>';
                tSelect += '<option value="05:30 PM">05:30 PM</option>';
                tSelect += '<option value="06:00 PM">06:00 PM</option>';
                tSelect += '<option value="06:30 PM">06:30 PM</option>';
                tSelect += '<option value="07:00 PM">07:00 PM</option>';
                tSelect += '<option value="07:30 PM">07:30 PM</option>';
                tSelect += '<option value="08:00 PM">08:00 PM</option>';
                tSelect += '<option value="08:30 PM">08:30 PM</option>';
                tSelect += '<option value="09:00 PM">09:00 PM</option>';
                tSelect += '<option value="09:30 PM">09:30 PM</option>';
                tSelect += '<option value="10:00 PM">10:00 PM</option>';
                tSelect += '<option value="10:30 PM">10:30 PM</option>';
                tSelect += '<option value="11:00 PM">11:00 PM</option>';
                tSelect += '<option value="11:30 PM">11:30 PM</option>';
            tSelect += '</select>';

            return tSelect;
    }

    var htmlForm = '<form class="update-class-event-form" id="updateNewClass"><input type="hidden" name="teacher_id" value="'+teacher_id+'">';
    htmlForm += '<input type="hidden" name="student_id" value="'+student+'"></input>';

    htmlForm += '<div class="separator separator-dashed separator-dark my-3"></div>';
    htmlForm += '<div class=""><div class="row"><div class="col-md-6"><input type="text" class="form-control classDate" readonly="readonly" name="startdate" /></div>';

    htmlForm += '<div class="col-md-6">'+ getSelectHowlong('howlong') + '</div></div></div>';

    htmlForm += '<div class="separator separator-dashed separator-dark my-3"></div>';
    htmlForm +='<div id="scheduleDays" class="form-group mb-3"> ';
    htmlForm +='<div class=""><div class="row">';

    htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" id="AllDays" class="updated_all_days" value="Select All">  Select All </label></div><div class="col-md-6">'+ getClassUpdatedTime('',0,'updated_all_times') + '</div></div></div><div class="separator separator-dashed separator-dark my-3"></div>';
    var storeArray = [];
    var c = 0;
    $.each(weakDays,myFunction);

    function myFunction(index, item) {

        if(typeof stdStartTime[index] === 'undefined'){

            console.log("not found: "+index);

        }else{
            storeArray.push(stdStartTime[index].day_name);
            htmlForm +='<div class=""><div class="row mb-1">';
            htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" '+ ' name="days['+(c++)+']" id="'+stdStartTime[index].day_name+'" class="updated_all_days" value="'+stdStartTime[index].day_name+'" checked>  '+stdStartTime[index].day_name+' </label></div><div class="col-md-6">'+ getClassUpdatedTime(stdStartTime[index].start_time, stdStartTime[index].day_name,'updated_all_time') + '</div></div></div>';

        }
    }

    function arr_diff (a1, a2) {

        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    }

    var data = arr_diff(storeArray, weakDays);
    for (let i = 0; i < data.length; i++) {

        htmlForm +='<div class=""><div class="row mb-1">';
        htmlForm +='<div class="col-md-6 pt-3"><label><input type="checkbox" '+ ' name="days['+(c++)+']" id="'+data[i]+'" class="updated_all_days" value="'+data[i]+'" >  '+data[i]+' </label></div><div class="col-md-6">'+ getClassUpdatedTime("", data[i],'updated_all_time') + '</div></div></div>';

    }

    stdStartTime = [];

    htmlForm +='<div class="row">';
    // htmlForm += '<div class="form-group col-md-6"><div><label>Class Time</label>'+ getClassTime('starttime') + '</div></div>';
    htmlForm +='</div>';
    htmlForm += '<div class="my-3"><button class="btn btn-primary btn-block btn-sm" type="submit">Submit</button></div>';
    // htmlForm += '<button class="btn btn-danger float-right" id="closeForm" type="reset">Cancel</button>';
    htmlForm += '<div class="clearfix"></div>';
    htmlForm += '</form>';
    htmlForm += '<div class="separator separator-dashed separator-dark my-3"></div>';
    getFormStudents(student);
    return htmlForm;
}

function getFormStudents(student = false){

    $.ajax({
        method:'POST',
        url:DOMAIN+'classes/students',
        dataType:'json',

        beforeSend:function(){
            KTApp.block("#kt_quick_assign", {
                overlayColor: "#000000",
                type: "loader",
                state: "brand",
                opacity: .07,
                message: "Loading Classes Data",
            });
        },
        success:function(res){
            // $('#student_dropdown').html('<option selected="selected" value>--Select Student --</option>');
            if(res.success){
                // KTApp.unblock("#addNewClass");
                $.each(res.data,function(index,student){
                    $('#student_dropdown').append('<option '+((student.id == student_id)?'selected':'')+'  value="'+student.id+'"> '+
                    student.first_name+' '+student.last_name+ ' - '+ student.country_code +'</option>');
                });
                $('#student_dropdown').selectpicker({
                    liveSearch: true
                });
                $('.howLongInput').selectpicker();

                if(!student){
                    $('.classTimeInput, .updated_all_time, .updated_all_times').val(eSelectedTime);
                    $('.classTimeInput, .updated_all_time, .updated_all_times').selectpicker({
                        liveSearch: true
                    });

                    var tit = eSelectedDate+" <small>["+eSelectedTime+"]</small>";
                    $('#kt_quick_assign_header').html(tit);
                    $('.classDate').val(eSelectedDate);
                }else{
                    $('.classDate').val(eSelectedDate);
                }

                $('.classDate').datepicker({
                    rtl: KTUtil.isRTL(),
                    todayHighlight: true,
                    orientation: "auto",
                    format: 'yyyy-mm-dd'
                });

                KTApp.unblock("#kt_quick_assign");
            }
        }
    });
}

$(document.body).on('submit','#addNewClass, #updateNewClass',function(e){
    e.preventDefault();
    var form_id = $(this).attr('id');
    var tID = $('#'+form_id+' input[name=teacher_id]').val();
    $('#'+form_id+'  button[type=submit]').prop('disabled',true);
    var form = $('#'+form_id).serializeArray();
    var color = $('.btn.active').children('.color').val();

    if(form_id == 'addNewClass'){
        if(!color){
            toastr.error("Please select all options in the form");
            $('#'+form_id+'  button[type=submit]').prop('disabled',false);
            return;
        }
        form.push({name:"start",  value:selectedTime});
        form.push({ name: "color", value:color});
        var url = 'classes/storeClasses';
    }else{
        form.push({name:"start",  value:selectedTime});
        var url = 'classes/updateClasses';
    }

    $.ajax({
        type: "POST",
        dataType:'json',
        url: DOMAIN + url,
        data:form,
        beforeSend:function () {
            KTApp.block("#kt_quick_assign", {
                overlayColor: "#000000",
                type: "loader",
                state: "brand",
                opacity: .07,
                message: "Adding New Class...",
            });
        },
        success: function(result)
        {
            $('#kt_quick_assign button[type=submit]').prop('disabled',true);
            if(result.success){
                toastr.success(result.response);
                calendar.refetchEvents();
                $('#kt_quick_assign_toggle').trigger('click');

            }
            else{
                toastr.error(result.response);
            }
            KTApp.unblock("#kt_quick_assign");

        },
        error: function(err){
            KTApp.unblock("#kt_quick_assign");
            $('#kt_quick_assign button[type=submit]').prop('disabled',false);
            console.log(err);
        }
    });


});

// $(document.body).on('submit','#updateNewClass',function(e){
//     e.preventDefault();
//     var tID = $('#updateNewClass input[name=teacher_id]').val();
//     $('#updateNewClass button[type=submit]').prop('disabled',true);
//     var form = $('#updateNewClass').serializeArray();

//         KTApp.block("#kt_quick_assign", {
//             overlayColor: "#000000",
//             type: "loader",
//             state: "brand",
//             opacity: .07,
//             message: "Update Current Class...",
//         });

//         form.push({name:"start",  value:selectedTime});
//         $.ajax({
//             type: "POST",
//             dataType:'json',
//             url: DOMAIN + 'class/assign_update/',
//             data:form,
//             success: function(result)
//             {
//                 console.log(result);
//                 $('#updateNewClass button[type=submit]').prop('disabled',true);
//                 if(result.success ==='yes'){
//                     toastr.success(result.response);

//                     var docPath = window.location.pathname;
//                     var pathArray = docPath.split("/");

//                     if($.inArray('teacher',pathArray) >= 0 && $.inArray('teacher',pathArray) >= 0){
//                         calendar.refetchEvents();
//                         removePopover();
//                     }else{
//                         // window.location.href = g_baseUrl+'teacher/teacher/'+tID;
//                     }


//                 }
//                 else{
//                     toastr.error(result.response);
//                 }
//                 KTApp.unblock("#kt_quick_assign");

//             },
//             error: function(err){
//                 KTApp.unblock("#kt_quick_assign");
//                 $('#updateNewClass button[type=submit]').prop('disabled',false);
//                 console.log(err);
//             }
//         });

// });

$(document).on('click', '.event_action_btn', function(){
    action_bar = $('#kt_quick_assign');
    implementation = $('#kt_quick_assign_offcanvas');
    var eventId = $(this).attr('id');

    var eventTeacherId = $(this).attr('teacher_id');
    implementation.empty();
    let event = calendar.getEventById(eventId);
    console.log(event);
    let e = event.extendedProps;
    id = event.id;
    let student = e.student_id;
    student_id = e.student_id;
    let name1 = event.title;
    days = moment(event.start).format("dddd");
    let tomorrow = moment(event.start).add(1, 'days').format("YYYY-MM-DD");
    let tomorrow_day = moment(tomorrow).format("dddd") ;
    date = moment(event.start).format("YYYY-MM-DD");
    time = moment(event.start).format("hh:mm:ss");
    endtime =  moment(event.end).format("hh:mm:ss");
    eSelectedDate = date;

    // console.log(days,tomorrow,tomorrow_day,date);

    // time = $(this).siblings(".fc-content").children(".fc-time").attr("data-full");
    var myBtns = "";

    $('#kt_quick_assign_toggle').trigger('click');

    console.log(event);

    var links = `<small class="text-muted font-size-sm ml-2">

    <a href="${DOMAIN}user/attendance/${student}" target="_blank" data-skin="light" data-toggle="m-tooltip" data-placement="left"
    data-original-title="Add attendence" class="btn-tooltip mr-2"><i class="la la-calendar-check-o text-primary"></i></a>

    <a href="${DOMAIN}user/show/${student}" target="_blank" data-skin="light" data-toggle="m-tooltip" data-placement="left"
    data-original-title="Go to ${e.fullname} profile" class="btn-tooltip"><i class="la la-user text-success"></i></a>

    </small>`;

    // var links = '<a href="'+DOMAIN+'admin/student/attendance_add/'+student+'" data-skin="light" data-toggle="m-tooltip" data-placement="left" data-original-title="Add attendence" class="btn-tooltip mr-2"><i class="la la-calendar-check-o text-primary"></i></a>'+
    // '<a href="'+DOMAIN+'admin/student/profile/'+student+'" data-skin="light" data-toggle="m-tooltip" data-placement="left" data-original-title="Go to '+name1+'\'s profile" class="btn-tooltip"><i class="la la-user text-success"></i></a>';
    $('#kt_quick_assign_header').html(e.fullname+' '+links);

    $.ajax({
        method:'POST',
        url:DOMAIN+'classes/get_time',
        dataType:'json',
        data: {'student_id':student,'date':date,'teacher_id':eventTeacherId},
        success: function(result) {
            if(result.success){
                stdDays = [];
                $(result.data).each(function(index,res) {
                    console.log(res.start);
                    stdDays.push(res.day);
                    stdStartTime.push({start_time : res.start,day_name : res.day});
                });
                $('.update-class-event-form').remove();
                implementation.append(getFormHtmlUpdate(student));
            }
            console.table(stdDays,stdStartTime);
            myBtns += '<div class="row mb-2">' +
            '<div class=" col-md-12"><button type="button" onclick="classes.delete_teacher();" data-skin="light" data-toggle="m-tooltip" data-placement="left" data-original-title="Remove '+name1+' from this teacher" class="btn btn-sm btn-danger btn-block btn-tooltip">Delete Teacher</button></div></div>';
            myBtns += '<div class="row"><div class="col-md-12 mb-2"><button type="button" onclick="classes.search_single()" data-skin="light" data-toggle="m-tooltip" data-placement="left" data-original-title="Transfer only this class to an available teacher" class="btn btn-sm btn-warning btn-block btn-tooltip">Transfer Class</button></div>'+
            '<div class=" col-md-12 mb-2"><button type="button" onclick="classes.search_teacher()" data-skin="light" data-toggle="m-tooltip" data-placement="left" data-original-title="Permanently transfer all classes to a new teacher" class="btn btn-sm btn-warning btn-block btn-tooltip">Transfer Teacher</button></div></div>';
            implementation.append(myBtns);

        },
        error: function(err){
            console.log(err);
        }
    });

    setTimeout(function(){
        $('.btn-tooltip').tooltip();
    },2000);

});
