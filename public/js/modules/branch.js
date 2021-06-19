/******/ (() => { // webpackBootstrap
"use strict";

var startdate = moment();
var enddate = moment();

Load = function() {
    // Private functions

    var options = {
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: DOMAIN + 'branch/list',
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
                    is_view = `<a class="btn btn-icon btn-xs btn-light-warning btn-circle mr-2 branch_view" href="javascript:;" data-url="branch/show/${row.id}" data-title="${row.name}" data-size="xl"><i class="nav-icon la la-eye"></i></a>`;
                    is_edit = `<a class="btn btn-icon btn-xs btn-light-info btn-circle mr-2 branch_edit" href="javascript:;" data-url="branch/edit/${row.id}" data-title="Edit Branch" data-size="xl" title="Edit"><i class="nav-icon la la-edit"></i> </a>`;
                    is_delete = `<a class="btn btn-icon btn-xs btn-light-danger btn-circle mr-2" href="javascript:" onclick='confirm_modal("branch/destroy", ${row.id}, "branch_list")' title="Delete"><i class="nav-icon la la-trash"></i></a>`;
                    data =  `<div class="row pl-5 stdActions">

                                ${(can_view) ? is_view : ''}
                                ${(can_edit) ? is_edit : ''}
                                ${(can_delete) ? is_delete : ''}

                            </div>`;
                }
                return `<div class="d-flex align-items-center">
                            <div class=" ml-4">
                                <a href="'+ DOMAIN +'admin/student/profile/' + row.id + '" class="text-dark-75 font-weight-bolder font-size-lg mb-0"> ${row.name} </a>
                                ${data}
                            </div>
                        </div>`;
            }
        }, {
            field: 'city',
            title: 'City',
            width: 100
        }, {
            field: 'email',
            title: 'Email',
            width: 220,
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
                            <div class=" ml-4">
                                <a href="#" class="text-dark-75 font-weight-bolder font-size-lg mb-0"> ${row.email} </a>
                                ${data}
                            </div>
                        </div>`;
            },
        }, {
            field: 'phone',
            title: 'Phone',
            width: 100
        }, {
            field: 'user_count',
            title: 'Total Users',
            width: 100
        }, {
            field: 'status',
            title: 'Status',
            width: 80,
            template: function(row) {
                return `<span class="label label-lg font-weight-bold ${status[row.status].class} label-inline">${status[row.status].title}</span>`;
            },
        }],
    };

    var branchData = function() {
        // enable extension
        options.extensions = {
            // boolean or object (extension options)
            checkbox: true,
        };
        options.search = {
            input: $('#search'),
            key: 'generalSearch'
        };

        var datatable = $('#branch_list').KTDatatable(options);

        $('#status').on('change', function() {
            console.log($(this).val().toLowerCase());
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#cities').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'city');
        });

        $('#status, #kt_datatable_search_type_2 ,#cities').selectpicker();

        datatable.on(
            'datatable-on-click-checkbox',
            function(e) {
                // datatable.checkbox() access to extension methods
                var ids = datatable.checkbox().getSelectedId();
                var count = ids.length;

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
            document.getElementById('delete_all_link').setAttribute('data-url' , 'branch/destroy_all');
            document.getElementById('delete_all_link').setAttribute('data-name' , 'branch_list');
        }).on('hide.bs.modal', function(e) {
            DATA = null;
        });

        $(document).on('click','.update_status_btn', function(e) {
            e.preventDefault();

            $('#update_all').modal('show');
            DATA = datatable.checkbox().getSelectedId();
            document.getElementById('update_all_link').setAttribute('data-url' , 'branch/update_status');
            document.getElementById('update_all_link').setAttribute('data-name' , 'branch_list');
            document.getElementById('update_all_link').setAttribute('data-item' , $(this).data('id'));
        }).on('hide.bs.modal', function(e) {
            DATA = null;
        });
    };

    return {
        // public functions
        init: function() {
            branchData();
        },
    };
}();

$(document.body).on('click', '.branch_edit, .branch_add, .branch_view', function(e){
    e.preventDefault();
    modal({
        'url': $(this).data('url'),
        'size': $(this).data('size'),
        'title': $(this).data('title')
    });
});

jQuery(document).ready(function() {
    Load.init();

    startdate = moment().subtract(6,"days"), enddate = moment();
    let e = $("#branches_daterangepicker");
    if(0 !== e.length){

    var start = moment().subtract(29, 'days');
    var end = moment();

    e.daterangepicker({
        buttonClasses: ' btn',
        applyClass: 'btn-primary',
        cancelClass: 'btn-secondary',

        startDate: start,
        endDate: end,
        ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, function(start, end, label) {
        set_daterange_new_date(start,end,"")
        console.log(start + ' / ' + end);
        e.val( start.format('MM/DD/YYYY') + ' / ' + end.format('MM/DD/YYYY'));
    }),set_daterange_new_date(start,end,"");
    }
    function set_daterange_new_date(t,a,r) {
        startdate = t;
        enddate = a;
        var o = "", n = ""; a-t <100||"Today" === r ? (o="Today:", n = t.format("MMM D")) :"Yesterday" === r ? (o="Yesterday:",n=t.format("MMM D")) : n = t.format("MMM D")+" - "+a.format("MMM D"), e.find(".m-subheader__daterange-date").html(n), e.find(".m-subheader__daterange-title").html(o)
    }
});

/******/ })();
