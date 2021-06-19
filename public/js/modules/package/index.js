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
                            url: DOMAIN + 'packages/list/'+startdate.format("YYYY-MM-DD")+'/'+enddate.format("YYYY-MM-DD"),
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
                    field: 'name',
                    title: 'Name',
                    width: 120,
                    template: function(row){
                        var data = "";
                        if(!row.deleted_at){
                            is_view = `<a class="btn btn-icon btn-xs btn-light-warning btn-circle mr-2 view" href="javascript:;" data-url="packages/show/${row.id}" data-title="View Package" data-size="md"><i class="nav-icon la la-eye"></i></a>`;
                            is_edit = `<a class="btn btn-icon btn-xs btn-light-info btn-circle mr-2 edit" href="javascript:;" data-url="packages/edit/${row.id}" data-title="Edit Package" data-size="md" title="Edit"><i class="nav-icon la la-edit"></i> </a>`;
                            is_delete = `<a class="btn btn-icon btn-xs btn-light-danger btn-circle mr-2" href="javascript:" onclick='confirm_modal("packages/destroy", ${row.id}, "package_list")' title="Delete"><i class="nav-icon la la-trash"></i></a>`;
                            data =  `<div class="row pl-5 stdActions">

                                        ${(can_view) ? is_view : ''}
                                        ${(can_edit) ? is_edit : ''}
                                        ${(can_delete) ? is_delete : ''}

                                    </div>`;
                        }
                        return `<div class="d-flex align-items-center">
                                    <div class=" ml-4">
                                        <a href="#" class="text-dark-75 font-weight-bolder font-size-lg mb-0"> ${row.name} </a>
                                        ${data}
                                    </div>
                                </div>`;
                    }
                }, {
                    field: 'days',
                    title: 'Days',
                    width: 80,
                    template:function(row){
                        return `${row.days} <a href="javascript:;" class="addWeekDays" data-url="packages/days/${row.id}" data-title="Package: ${row.name}" data-size="lg">Days</a>`;
                    }
                }, {
                    field: 'status',
                    title: 'Status',
                    width: 80,
                    template: function(row) {
                        return `<span class="label label-lg font-weight-bold ${status[row.status].class} label-inline">${status[row.status].title}</span>`;
                    },
                }, {
                    field: 'created_at',
                    title: 'Created',
                    width: 100,
                    template: function(row) {
                        return (row.created_at) ? moment(row.created_at).format('Y-m-d') : '-';
                    },
                }, {
                    field: 'updated_at',
                    title: 'Updated',
                    width: 100,
                    template: function(row) {
                        return (row.updated_at) ? moment(row.updated_at).format('Y-m-d') : '-';
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

            datatable = $('#package_list').KTDatatable(options);

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
                document.getElementById('delete_all_link').setAttribute('data-url' , 'package/destroy_all');
                document.getElementById('delete_all_link').setAttribute('data-name' , 'package_list');
            }).on('hide.bs.modal', function(e) {
                DATA = null;
            });

            $(document).on('click','.update_status_btn', function(e) {
                e.preventDefault();
                $('#update_all').modal('show');
                DATA = datatable.checkbox().getSelectedId();
                document.getElementById('update_all_link').setAttribute('data-url' , 'package/update_status');
                document.getElementById('update_all_link').setAttribute('data-name' , 'package_list');
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
    document.getElementById('transfer_all_link').setAttribute('data-url' , 'package/transfer');
    document.getElementById('transfer_all_link').setAttribute('data-name' , 'package_list');
    document.getElementById('transfer_all_link').setAttribute('data-item' , $(this).data('id'));
}).on('hide.bs.modal', function(e) {
    DATA = null;
});

Load.data();

/******/ })();
