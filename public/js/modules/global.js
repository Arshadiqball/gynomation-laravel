"use strict";

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
    }
});

let successAlert = function(second){ Swal.fire("Good job!", second, "success"); };
let errorAlert = function(second){ Swal.fire("Error!", second, "error"); };
let confirmAlert = function(second){ Swal.fire({
    title:"Are you sure?",
    text:"You won't be able to revert this!",
    type:"warning",
    showCancelButton:!0,
    confirmButtonText:"Yes, delete it!"})
    .then(function(e){
        e.value&&Swal.fire("Deleted!","Your file has been deleted.","success")
    })
};
function bulk_edit(val, type, ids) {
    val = parseInt(val);
    if(Array.isArray(ids) && ids.length > 0 && type && $.isNumeric(val)){
        $.ajax({
            type:"post",
            url: g_baseUrl+'admin/ajax/bulk_edit',
            data:{"val":val,"type":type,"ids":ids},
            success: function(res){
                if(res === 'success'){
                    location.reload();
                }
            }
        });
    }
}
function confirm_modal(delete_url) {
    jQuery('#delete_modal').modal('show', {backdrop: 'static'});
    document.getElementById('delete_link').setAttribute('href' , delete_url);
}
function showAjaxModal(url) {
    jQuery('#modal_ajax .modal-body .modData').html('<div class="modal-loader"><img src="${DOMAIN}images/loader.gif" /></div>');
    jQuery('#modal_ajax').modal('show', {backdrop: 'true'});
    $.ajax({
        url: url,
        success: function(response)
        {
            $('#modal_ajax .modal-body .modData').html(response);
            var ps = new PerfectScrollbar('#modal_ajax .modal-body .modData');
        }
    });
}
