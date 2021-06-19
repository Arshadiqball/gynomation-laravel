/******/ (() => { // webpackBootstrap
"use strict";

Load = function() {
    // Private functions
    return {
        data: function () {
            var options = {
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: DOMAIN + 'callback/list/'+startdate.format("YYYY-MM-DD")+'/'+enddate.format("YYYY-MM-DD"),
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
                    footer: false // display/hide footer
                },
                
                rows: {
                    callback: function (row, data, index) {
                        if(data['deleted_at']){
                            $(row).addClass('table-danger');
                        }
                    },
                    afterTemplate: function (row, data, index) {
                        if(data['deleted_at']){
                            // console.log();
                            $(row).find('td').eq(0).html(`<span style="width: 20px;"><label class="checkbox disabled">
                            <input type="checkbox" disabled value="1">&nbsp;<span></span></label></span>`);
                        }
                    }
                    //overflowHide: false
                },

                // column sorting
                sortable: true,

                pagination: true,

                // columns definition
                columns: [{
                    field: 'id',
                    title: '#',
                    sortable: false,
                    width: 20,
                    selector: {
                        class: 'disabled'
                    },
                    textAlign: 'center',
                }, {
                    field: 'type',
                    title: 'Type',
                    template: function(row){
                        var data = "";
                        if(!row.deleted_at){
                            is_view = `<a class="btn btn-icon btn-xs btn-light-warning btn-circle mr-2 view" href="javascript:;" data-url="callback/show/${row.id}" data-size="xl" data-title="Show Callback"><i class="nav-icon la la-eye"></i></a>`;
                            is_edit = `<a class="btn btn-icon btn-xs btn-light-info btn-circle mr-2 edit" href="javascript:;" data-url="callback/edit/${row.id}" data-title="Edit Callback" data-size="xl" title="Edit"><i class="nav-icon la la-edit"></i> </a>`;
                            is_delete = `<a class="btn btn-icon btn-xs btn-light-danger btn-circle mr-2" href="javascript:" onclick='confirm_modal("callback/destroy", ${row.id}, "callback_list")' title="Delete"><i class="nav-icon la la-trash"></i></a>`;
                            is_convert = `<a class="btn btn-icon btn-xs btn-light-warning btn-circle mr-2 convert" href="javascript:" data-url="callback/convert/${row.id}" data-title="Convert Callback" data-size="xl"><i class="nav-icon la la-edit"></i></a>`;
                            data =  `<div class="row pl-5 stdActions">
                                        
                                        ${(can_view) ? is_view : ''}
                                        ${(can_edit) ? is_edit : ''}
                                        ${(can_delete) ? is_delete : ''}
                                        ${(can_convert) ? is_convert : ''}
                                        
                                    </div>`;                                
                        }
                        return `<div class="d-flex align-items-center">
                                    <div>
                                        <a href="#" class="text-dark-75 font-weight-bolder mb-0"> ${row.first_name} ${row.last_name} </a>
                                        ${data}
                                    </div>
                                </div>`;
                    }
                }, {
                    field: 'country',
                    title: 'Country',
                    template: function(row){
                        return row.country;
                    }
                }, {
                    field: 'email',
                    title: 'Email',
                    width: 150,
                    template: function(row) {
                        var data = "";
                        if(!row.deleted_at){
                            is_chat = `<a class="btn btn-icon btn-xs btn-light-success btn-circle mr-2"  href="#" data-toggle="modal" data-target="#kt_chat_modal" title="Chat" >
                            <i class="nav-icon flaticon2-chat-1"></i> </a> `;
                            is_email = `<a class="btn btn-icon btn-xs btn-light-warning btn-circle mr-2 email_send" href="#" data-item="${row.email}" title="EMail" >
                            <i class="nav-icon la la-envelope"></i> </a>`;
                            
                            data =  `<div class="row pl-5 stdActions">
                                    
                            ${(can_chat) ? is_chat : ''}
                            ${(can_email) ? is_email : ''}
                            
                            </div>`;                                
                        }
                        return `<div class="d-flex align-items-center">
                                    <div>
                                        <a href="#" class="text-dark-75 mb-0"> ${row.email} </a>
                                        ${data}
                                    </div>
                                </div>`;
                    },
                }, {
                    field: 'phone',
                    title: 'Phone',
                    template: function(row) {
                        var data = "";
                        if(!row.deleted_at){
                            console.log(can_sms);
                            is_sms = `<a class="btn btn-icon btn-xs btn-light-success btn-circle mr-2"  href="#" data-toggle="modal" data-target="#kt_chat_modal" title="Chat" >
                            <i class="nav-icon flaticon2-chat-1"></i> </a> `;
                            
                            data =  `<div class="row pl-5 stdActions">
                            
                            ${(can_sms) ? is_sms : ''}
                            
                            </div>`;                                
                        }
                        return `<div class="d-flex align-items-center">
                                    <div>
                                        <a href="#" class="text-dark-75 mb-0"> +${row.phone.replace(',','-')} </a>
                                        ${data}
                                    </div>
                                </div>`;
                    }
                }, {
                    field: 'students_count',
                    title: 'Students',
                    class:'text-center'
                }, {
                    field: 'created_at',
                    title: 'Registration',
                    template: function(row){
                        return moment(row.created_at,'YYYY-MM-DD HH:mm:ss').fromNow();
                    }
                }, {
                    field: 'status',
                    title: 'Status',
                    template: function(row) {
                        
                        return `<span class="label label-lg font-weight-bold ${status[row.status].class} label-inline">${status[row.status].title}</span>`;
                    },
                }],
            };

            // enable extension
            options.extensions = {
                // boolean or object (extension options)
                checkbox: true,
            };
            options.search = {
                input: $('#search'),
                key: 'generalSearch'
            };

            datatable = $('#callback_list').KTDatatable(options);

            $('#status').on('change', function() {
                console.log($(this).val().toLowerCase());
                datatable.search($(this).val().toLowerCase(), 'status');
            });
            
            $('#country').on('change', function() {
                datatable.search($(this).val().toLowerCase(), 'country');
            });

            $('#status, #kt_datatable_search_type_2 ,#country').selectpicker();

            datatable.on(
                'datatable-on-click-checkbox',
                function(e) {
                    // datatable.checkbox() access to extension methods
                    var ids = datatable.checkbox().getSelectedId();
                    var count;

                    if(Array.isArray(ids[0])){
                         count = ids[0].length;
                    }else{
                        count = ids.length;
                    }
                    
                    $('#kt_datatable_selected_records_2').html(count);

                    if (count > 0) {
                        $('#kt_datatable_group_action_form_2').collapse('show');
                    } else {
                        $('#kt_datatable_group_action_form_2').collapse('hide');
                    }
                });

            $('#kt_datatable_fetch_modal_2').on('show.bs.modal', function(e) {
                var id = datatable.checkbox().getSelectedId();
                var c = document.createDocumentFragment();
                for (var i = 0; i < id.length; i++) {
                    var li = document.createElement('li');
                    li.setAttribute('data-id', id[i]);
                    li.innerHTML = 'Selected record ID: ' + id[i];
                    c.appendChild(li);
                }
                $('#kt_datatable_fetch_display_2').append(c);
            }).on('hide.bs.modal', function(e) {
                $('#kt_datatable_fetch_display_2').empty();
            });
            
            $('#delete_all').on('show.bs.modal', function(e) {
                DATA = datatable.checkbox().getSelectedId();
                document.getElementById('delete_all_link').setAttribute('data-url' , 'callback/destroy_all');
                document.getElementById('delete_all_link').setAttribute('data-name' , 'callback_list');
            }).on('hide.bs.modal', function(e) {
                DATA = null;
            });

            $(document).on('click','.update_status_btn', function(e) {
                e.preventDefault();
                $('#update_all').modal('show');
                DATA = datatable.checkbox().getSelectedId();
                document.getElementById('update_all_link').setAttribute('data-url' , 'callback/update_status');
                document.getElementById('update_all_link').setAttribute('data-name' , 'callback_list');
                document.getElementById('update_all_link').setAttribute('data-item' , $(this).data('id'));
            }).on('hide.bs.modal', function(e) {
                DATA = null;
            });
        }
    }
}();

$(document).on('click','.transfer_btn', function(e) {
    $('.transfer_all').modal('show');
    DATA = datatable.checkbox().getSelectedId();
    document.getElementById('transfer_all_link').setAttribute('data-url' , 'callback/transfer');
    document.getElementById('transfer_all_link').setAttribute('data-name' , 'callback_list');
    document.getElementById('transfer_all_link').setAttribute('data-item' , $(this).data('id'));
}).on('hide.bs.modal', function(e) {
    DATA = null;
});

Load.data();

/******/ })();