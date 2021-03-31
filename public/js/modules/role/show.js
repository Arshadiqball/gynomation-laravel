$('#users_form').off().on('submit',function(e){
    e.preventDefault();
    $.ajax({
        url:DOMAIN+'role/assign_user_role',
        data:$(this).serializeArray(),
        type:'post',
        dataType:'json',
        beforeSend:function(){
            KTApp.block('.modal-content', {
                overlayColor: '#000000',
                state: 'success',
                message: 'Saving Please Wait...'
            });
        },
        success:function(res){
            if(res.success){
                toastr.success(res.response);
                KTApp.unblock('.modal-content');
            }
        }
    });
});

function deleteRole(element){
    $(element).parent().parent().remove();
}


var RoleUserDataTable = function() {

    var demo = function() {
      $('#roleUserTable').KTDatatable({
            data: {
                saveState: {cookie: false},
            },
            search: {
                input: $('#roleUserTableSearch'),
                key: 'generalSearch',
            },
            layout: {
                class: 'datatable-bordered',
            },
            columns:[
                {
                    field: 'UserName',
                    width: 700,
                },
                {
                    field: 'Status',
                    class:'text-center'
                },
                {
                    field: 'Action',
                    class:'text-center'
                },
            ]
      });
    };

    return {
      init: function() {
        demo();
      },
    };
  }();

  jQuery(document).ready(function() {
    RoleUserDataTable.init();
  });
