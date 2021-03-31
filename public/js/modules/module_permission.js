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

jQuery(document).ready(function() {
    KTBootstrapSwitch.init();
});

Load = function() {
    // Private functions
    return {
        module: function () {
            if(datatable2){
                datatable2.destroy();
            }
            var options = {
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: DOMAIN + 'module_permission_list/'+$('select[name="parent_id"] option:selected').val(),
                        },
                    },
                    pageSize: 10,
                    serverPaging: false,
                    serverFiltering: false,
                    serverSorting: false,
                },

                // layout definition
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and
                    footer: false, // display/hide footer
                    class:'table-striped table-sm table-hovered datatable-bordered datatable-brand'
                },

                // column sorting
                sortable: true,

                pagination: true,

                // columns definition
                columns: [{
                    field: 'id',
                    title: '#',
                    width: 50,
                    textAlign: 'center',
                }, {
                    field: 'name',
                    title: 'Name'
                },{
                    field: 'permission_roles_count',
                    title: 'Roles',
                    width: 70,
                    textAlign: 'center',
                    template:function(row){
                        var cls = (row.permission_roles_count)?'text-primary':'text-danger';
                        return `<a href="javascript:;" data-id="${row.permission_roles_count}" class="${cls}">${row.permission_roles_count}</a>`
                    }
                },{
                    field: 'permission_users_count',
                    title: 'Users',
                    width: 70,
                    textAlign: 'center',
                    template:function(row){
                        var cls = (row.permission_users_count)?'text-primary':'text-danger';
                        return `<a href="javascript:;" data-id="${row.permission_users_count}" class="${cls}">${row.permission_users_count}</a>`
                    }
                },
                ],
            };

            options.search = {
                input: $('.permissionName'),
                key: 'generalSearch',
            };

            datatable2 = $('#module_table').KTDatatable(options);
        },
        role: function () {
            if(datatable){
                datatable.destroy();
            }
            var options = {
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: DOMAIN + 'role_list',
                        },
                    },
                    pageSize: 10,
                    serverPaging: false,
                    serverFiltering: false,
                    serverSorting: false,
                },

                // layout definition
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and
                    footer: false, // display/hide footer
                    class:'table-striped table-sm table-hovered datatable-bordered datatable-brand'
                },

                // column sorting
                sortable: true,

                pagination: true,

                // columns definition
                columns: [{
                    field: 'id',
                    title: '#',
                    width: 20,
                    textAlign: 'center',
                }, {
                    field: 'name',
                    title: 'Name',
                    template: function(row){
                        return `<a href="javascript:;" class="global-ajax" data-url="role/show/${row.id}" data-size="xl" data-title="Role (${row.name})" data-id="${row.id}">${row.name}</a>`;
                    }
                }, {
                    field: 'users_count',
                    textAlign: 'center',
                    title: 'Users'
                }
                ],
            };

            // options.search = {
            //     input: $('.permissionName'),
            //     key: 'generalSearch',
            // };

            datatable = $('#role_table').KTDatatable(options);
        }
    }
}();

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e){
    var target = $(e.target).attr("href").replace(/^#/, '');
    if(target === 'assign_tab'){
        Load.role();
    }
});

$('select[name="role"]').off().on('change',function(){
    $('#modulePermissionForm .collapse').removeClass('show');
    $('#modulePermissionForm .card-title').addClass('collapsed');
    $('#modulePermissionForm .permission-checkbox').bootstrapSwitch('state',false)
    var record = {
        'url' : 'get_permission_by_role/'+$('select[name="role"] option:selected').val(),
        'method' : 'GET'
    };
    $('#modulePermissionForm .resetPermissions').data('permission','');
    Promise.resolve(a_return(record)).then(
    function(v) {
        $(v.data).each(function(k,p){
            if(p.parent_id != 0){
                var old_data = $('#modulePermissionForm button[data-id="'+p.parent_id+'"]').data('permission');
                var new_data = (old_data)?old_data + ', ' +p.id:p.id;
            }
            $('#modulePermissionForm button[data-id="'+p.parent_id+'"]').data('permission',new_data);
            $('#modulePermissionForm .permissions-div').find('input[data-id="'+p.id+'"]').bootstrapSwitch('state',true);
        });
        $('#modulePermissionForm .collapse').addClass('show');
        $('#modulePermissionForm .card-title').removeClass('collapsed');
    }, function(e) {
        console.log(e);
    });
});

$('select[name="user_id"]').off().on('change',function(){
    $('#modulePermissionFormUser .collapse').removeClass('show');
    $('#modulePermissionFormUser .card-title').addClass('collapsed');
    $('#modulePermissionFormUser .permission-checkbox-user').bootstrapSwitch('state',false)
    var record = {
        'url' : 'get_permission_by_user/'+$('select[name="user_id"] option:selected').val(),
        'method' : 'GET'
    };
    $('#modulePermissionFormUser .resetPermissionsUser').data('permission','');
    Promise.resolve(a_return(record)).then(
    function(v) {
        $(v.data).each(function(k,p){
            if(p.parent_id != 0){
                var old_data = $('#modulePermissionFormUser button[data-id="'+p.parent_id+'"]').data('permission');
                var new_data = (old_data)?old_data + ', ' +p.id:p.id;
            }
            $('#modulePermissionFormUser button[data-id="'+p.parent_id+'"]').data('permission',new_data);
            $('#modulePermissionFormUser .permissions-div-user').find('input[data-id="'+p.id+'"]').bootstrapSwitch('state',true);
        });
        $('#modulePermissionFormUser .collapse').addClass('show');
        $('#modulePermissionFormUser .card-title').removeClass('collapsed');
    }, function(e) {
        console.log(e);
    });
});

$('select[name="role_id"]').off().on('change',function(){
    var record = {
        'url' : 'get_user_by_role/'+$('select[name="role_id"] option:selected').val(),
        'method' : 'GET'
    };

    Promise.resolve(a_return(record)).then(
    function(v) {
        var options = '';
        $(v.data).each(function(k,u){
            options += `<option  value="${u.id}" selected>${u.name}</option>`;
        });
        $('select[name="user_id"]').html(options).selectpicker('refresh');
    }, function(e) {
        console.log(e);
    });
});

$('#modulePermissionForm,#modulePermissionFormUser').off().on('submit',function(e){
    var formID = $(this).attr('id');
    var path = (formID == 'modulePermissionForm')?'add_role_permission/'+$('select[name="role"] option:selected').val():'add_user_permission/'+$('select[name="user_id"] option:selected').val();
    e.preventDefault();
    $.ajax({
        url:DOMAIN+path,
        data:$(this).serializeArray(),
        type:'post',
        dataType:'json',
        beforeSend:function(){
            KTApp.block('.custom-card', {
                overlayColor: '#000000',
                state: 'success',
                message: 'Saving Please Wait...'
            });
        },
        success:function(res){
            if(res.success){
                toastr.success(res.response);
                KTApp.unblock('.custom-card');
            }
        }
    });
});

$('.permission-select-checkbox,.permission-select-checkbox-user').on('switchChange.bootstrapSwitch', function(event, state) {
    var el = ($(event.target).hasClass('permission-select-checkbox-user'))?'.permissions-div-user':'.permissions-div';
    var parentID = $(event.target).data('id');
    $(el).find('input[data-parent="'+parentID+'"]').bootstrapSwitch('state',state);
});


$('.resetPermissions,.resetPermissionsUser').on('click',function(){
    var parentID = $(this).data('id');
    var el = ($(this).hasClass('resetPermissionsUser'))?'.permissions-div-user':'.permissions-div';
    $(el).find('input[data-parent="'+parentID+'"]').bootstrapSwitch('state',false);
    var data = $(this).data('permission');
    if(isNaN(data)){
        var arr = data.split(", ");
        $(arr).each(function(k,p){
            $(el).find('input[data-id="'+p+'"]').bootstrapSwitch('state',true);
        });
    }else{
        $(el).find('input[data-id="'+data+'"]').bootstrapSwitch('state',true);
    }
});

$('select[name="parent_id"]').off().on('change',function(){
    Load.module();
});

$('#addModulePermissionForm').off().on('submit',function(e){
    e.preventDefault();
    $.ajax({
        url:DOMAIN+'store_permission',
        data:$(this).serializeArray(),
        type:'post',
        dataType:'json',
        beforeSend:function(){
            KTApp.block('.custom-card', {
                overlayColor: '#000000',
                state: 'success',
                message: 'Saving Please Wait...'
            });
        },
        success:function(res){
            if(res.success){
                toastr.success(res.response);
                Load.module();
                KTApp.unblock('.custom-card');
            }
        },
        error:function (res) {
            toastr.error(res.responseJSON.response);
            KTApp.unblock('.custom-card');
        }
    });

    // record = {
    //     'url': 'store_permission',
    //     'method': 'post',
    //     'perameter' : form
    // }
    // Promise.resolve(a_return(record)).then(function(res){
    //     toastr.success(res.response);
    // },function(res){
    //     console.log(res);
    // });
});
