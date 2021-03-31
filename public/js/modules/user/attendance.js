

// Class definition

var KTBootstrapSwitch = function() {

    // Private functions
    var demos = function() {
     // minimum setup
     $('[data-switch=true]').bootstrapSwitch();
    };

    return {
     // public functions
        init: function() {
            demos();
        },
    };
}();


var KTBootstrapTimepicker = function () {

    // Private functions
    var demos = function () {
     // minimum setup
     $('.kt_timepicker_1').timepicker();
    }

    return {
     // public functions
    init: function() {
        demos();
    }
    };
}();

jQuery(document).ready(function() {
    KTBootstrapSwitch.init();
    KTBootstrapTimepicker.init();
});

$('#mark').on('switchChange.bootstrapSwitch', function(event, state) {
    if(state){
        $('.reason').hide();
        $('.mySubjects').removeClass("d-none");
    }else{
        $('.reason').show();
        $('.mySubjects').addClass("d-none");
        $('.my-breadcrumb').addClass('d-none');
    }
});


$(document).on('change','select[name="type"]',function(){
    $('.my-breadcrumb').removeClass('d-none');
    KTApp.block('.mySubjects', {
        overlayColor: '#000000',
        state: 'success',
        message: 'Loading Please Wait...'
    });
    $('.mainSubjects').html('')
    $('.breadcrumb').html(`<li class="breadcrumb-item active">${$('select[name="type"] option:selected').text()}</li>`);
    var record = {
        'url' : 'subject/getSubjectByType/'+$('select[name="type"] option:selected').val(),
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(function(v) {
        let options = '';
        $.each(v.data, function( i, vs ) {
            options += `<option value="${vs.subject_id}">${vs.name}</option>`;
        });
        $('select[name="subject"]').html(options);
        $('select[name="subject"]').selectpicker('refresh');
        $('button[title="Subject"]').click();
        KTApp.unblock('.mySubjects');
    }, function(e) {
        toastr.error(e);
        KTApp.unblock('.mySubjects');
    });

});

$(document).on('change','select[name="subject"]',function(){
    KTApp.block('.mySubjects', {
        overlayColor: '#000000',
        state: 'success',
        message: 'Loading Please Wait...'
    });
    getSubjects($('select[name="subject"] option:selected').val());
    $('.breadcrumb').html(`<li class="breadcrumb-item active">${$('select[name="type"] option:selected').text()}</li><li class="breadcrumb-item active parentSub" data-id="${$('select[name="subject"] option:selected').val()}" data-name="${$('select[name="subject"] option:selected').text()}">${$('select[name="subject"] option:selected').text()}</li>`);
    KTApp.unblock('.mySubjects');
});


$(document).on('click','.getSubSubjects,.breadcrumb-item-click',function(){
    var id = $(this).data('id');
    var name = $(this).data('name');
    if($('.subjectCheckbox[value="'+id+'"]').is(':checked')){
        toastr.error('Uncheck the checkbox first to load child subjects');
    }else{
        $('.breadcrumb-item').removeClass('active').addClass('text-primary breadcrumb-item-click');
        $('.breadcrumb').append(`<li class="breadcrumb-item active childSub" data-id="${id}" data-name="${name}">${name}</li>`);
        $(`.breadcrumb-item-click[data-id="${id}"]`).nextAll().remove();
        $('.breadcrumb-item:first,.breadcrumb-item:last').removeClass('text-primary breadcrumb-item-click').addClass('active');
        getSubjects(id);
    }
});


function getSubjects(id){
    var type_id = $('select[name="type"] option:selected').val();
    var subject_id = $('select[name="subject"] option:selected').val();
    KTApp.block('.mainSubjects', {
        overlayColor: '#000000',
        state: 'success',
        message: 'Loading Please Wait...'
    });
    var record = {
        'url' : 'subject/getSubjects/'+id,
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(function(v) {
        let items = '';
        $.each(v.data, function( i, vs ) {
            var checked = ($('.selectedSubjects .item-'+type_id+subject_id+' tr[data-id="'+vs.id+'"]').length)?'checked':'';
            items += `<div class="d-flex align-items-center py-2 border-bottom mb-2 px-2 subject-list checkbox-list-${type_id+subject_id}">
                        <label class="checkbox checkbox-lg checkbox-outline flex-shrink-0 m-0 mr-4 text-dark-75 text-hover-primary font-weight-bold font-size-lg">
                            <input type="checkbox" class="subjectCheckbox" name="subject" value="${vs.id}" data-name="${vs.name}" ${checked} />
                            <span class="mr-3"></span>
                            ${vs.name}
                        </label>
                        <div class="d-flex flex-column flex-grow-1"></div>
                        <a href="javascript:;" class="btn btn-icon btn-light btn-sm getSubSubjects ${(vs.is_child)?'':'d-none'}" data-id="${vs.id}" data-name="${vs.name}">
                            <span class="svg-icon svg-icon-primary">
                                <span class="svg-icon svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon points="0 0 24 0 24 24 0 24"></polygon>
                                            <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1"></rect>
                                            <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)"></path>
                                        </g>
                                    </svg>
                                </span>
                            </span>
                        </a>
                    </div>`;
        });
        $('.mainSubjects').html(items).show();
    }, function(e) {
        toastr.error(e);
    });

}


$(document).on('click','.delete-selected-item',function(){
    var id = $(this).data('id');
    var item = $(this).data('item');
    $('.item-'+item).find('tr[data-id="'+id+'"]').remove();
    $('.checkbox-list-'+item).find('.subjectCheckbox[value="'+id+'"]').prop('checked',false);
    if($('.item-'+item+' tr').length == 0){
        $('.item-'+item).remove();
    }
});



$(document).on('change','.subjectCheckbox',function(){
    var type_id =  $('select[name="type"] option:selected').val();
    var type_name =  $('select[name="type"] option:selected').text();
    var subject_id =  $('select[name="subject"] option:selected').val();
    var subject_name =  $('select[name="subject"] option:selected').text();
    var id = $(this).val();
    var name = $(this).data('name');
    if($(this).is(':checked')){

        var na = '';
        $('.childSub').each(function(k,v){
            var i = $(v).data('id');
            na += '<span data-parent="'+i+'">'+ $(v).data('name') +'</span>'+ ' > ';
        });

        if($('.selectedSubjects .item-'+type_id+subject_id).length){
            if($('.selectedSubjects .item-'+type_id+subject_id+' tr[data-id="'+id+'"]').length){
                toastr.error('Already Exists');
            }else{

                if($('.selectedSubjects .item-'+type_id+subject_id+' span[data-parent="'+id+'"]').length){
                    $('.selectedSubjects .item-'+type_id+subject_id+' span[data-parent="'+id+'"]').each(function(){
                        $(this).parent().parent().remove();
                    });
                }
                var rate =  $('.selectedSubjects .item-'+type_id+subject_id+' tr').data('rating');
                $('.selectedSubjects .item-'+type_id+subject_id+' tbody').append(`
                <tr data-id="${id}" data-type="${type_id}" data-parent="${subject_id}" data-rating="${rate}">
                    <td class="pl-0 text-dark-75 font-size-lg">
                        ${na+name}
                    </td>

                    <td class="pr-0 text-right">
                        <a href="javascript:;" class="btn btn-icon btn-light btn-hover-danger delete-selected-item btn-sm" data-id="${id}" data-item="${type_id+subject_id}">
                            <span class="svg-icon svg-icon-md svg-icon-danger">
                                <!--begin::Svg Icon | path:assets/media/svg/icons/General/Trash.svg-->
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"></rect>
                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                    </g>
                                </svg>
                                <!--end::Svg Icon-->
                            </span>
                        </a>
                    </td>
                </tr>
                `);
            }
        }else{

            var item = `<div class="card card-custom mb-2 selected-items item-${type_id+subject_id}" data-type="${type_id}" data-subject="${subject_id}">
                <!--begin::Header-->
                <div class="pt-1 px-5">
                    <div class="row">
                        <div class="col-8 pt-2">
                            <h4 class="card-title align-items-start flex-column mb-0">
                                <span class="card-label font-weight-bolder text-dark">${type_name}
                                <span class="svg-icon svg-icon-primary svg-icon-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <polygon points="0 0 24 0 24 24 0 24"/>
                                            <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) " x="11" y="5" width="2" height="14" rx="1"/>
                                            <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                                        </g>
                                    </svg>
                                </span>
                                ${subject_name}</span>
                            </h4>
                        </div>
                        <div class="col-4 text-right content-align-center">
                            <fieldset class="rate">
                                <input type="radio" value="10"><label data-rate="10" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="5 Stars"></label>
                                <input type="radio" value="9"><label data-rate="9" class="half" for="ratin${type_id+subject_id+id}" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="4.5 Stars"></label>
                                <input type="radio" value="8"><label data-rate="8" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="4 Stars"></label>
                                <input type="radio" value="7"><label data-rate="7" class="half" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="3.5 Stars"></label>
                                <input type="radio" value="6"><label data-rate="6" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="3 Stars"></label>
                                <input type="radio" value="5"><label data-rate="5" class="half" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="2.5 Stars"></label>
                                <input type="radio" value="4"><label data-rate="4" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="2 Stars"></label>
                                <input type="radio" value="3"><label data-rate="3" class="half" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="1.5 Stars"></label>
                                <input type="radio" value="2"><label data-rate="2" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="1 Star"></label>
                                <input type="radio" value="1"><label data-rate="1" class="half" data-type="${type_id}" data-subject="${subject_id}" data-toggle="tooltip" data-placement="top" title="0.5 Stars"></label>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="card-body py-0">
                    <!--begin::Table-->
                    <div class="table-responsive">
                        <table class="table table-head-custom table-vertical-center table-sm mb-1">
                            <tbody>
                                <tr data-id="${id}" data-type="${type_id}" data-parent="${subject_id}" data-rating="0">
                                    <td class="pl-0 text-dark-75 font-size-lg">
                                        ${na+name}
                                    </td>
                                    <td class="pr-0 text-right">
                                        <a href="javascript:;" data-toggle="tooltip" data-placement="left" title="Delete" class="btn btn-icon btn-light btn-hover-danger delete-selected-item btn-sm" data-id="${id}" data-item="${type_id+subject_id}">
                                            <span class="svg-icon svg-icon-md svg-icon-danger">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="24" height="24"></rect>
                                                        <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                        <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                    </g>
                                                </svg>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--end::Table-->
                </div>
                <!--end::Body-->
            </div>`;

            $('.selectedSubjects').prepend(item);
        }
        // $('[data-toggle="tooltip"]').tooltip()

    }else{
        $('.selectedSubjects .item-'+type_id+subject_id+' tr[data-id="'+id+'"]').remove();
        if($('.item-'+type_id+subject_id+' tr').length == 0){
            $('.item-'+type_id+subject_id).remove();
        }
    }
});

$(document).on('click','.submitData',function(){
    alert($('tr').data('id'));
});


$(document).on('click','#markAttendance',function(){

    var myData = {
        student: $('input[name=student]').val(),
        status: ($('[name="attendance"]').is(':checked'))?1:0,
        class_start_time: $('input[name=class_start_time]').val(),
        class_end_time: $('input[name=class_end_time]').val(),
        class_date: $('input[name=class_date]').val(),
    };

    if($('[name="attendance"]').is(':checked')){

        var subjects = [];
        $('.selectedSubjects tr').each(function (i, v) {
            subjects.push({
                id: $(v).data('id'),
                type: $(v).data('type'),
                rating: $(v).data('rating'),
                parent: $(v).data('parent'),
            });
        });

        myData.remarks = $('select[name=remarks]').val();
        myData.subjects = subjects;
    }

    $.ajax({
        dataType: 'json',
        type: "POST",
        url: DOMAIN + 'user/markAttendance',
        data: myData,
        beforeSend:function(){
            KTApp.block('.show-modal', {
                overlayColor: '#000000',
                state: 'success',
                message: 'Loading Please Wait...'
            });
        },
        success: function (res) {
            if (res.success) {
                toastr.success(res.response);
            }else{
                toastr.error(res.response);
            }
        },complete:function(){
            KTApp.unblock('.show-modal');
        }
    });
});

$(document).on('click','.rate label',function(){
    var type = $(this).data('type');
    var subject = $(this).data('subject');
    var rate = $(this).data('rate');
    $('.item-'+type+subject+' tr').data('rating',rate);
    $('.item-'+type+subject+'.rate label').css({"color": '#2f2d2d'});
    $(this).css({"color": "#FFD700"});
    $(this).nextAll().css({"color": "#FFD700"});
});


