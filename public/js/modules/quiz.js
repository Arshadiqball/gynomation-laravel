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
                    url: DOMAIN + 'quiz/list',
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
        },{
            field: 'name',
            title: 'Name',
            width: 160,
            template: function(row){
                var data = "";
                if(!row.deleted_at){
                    data =  `<div class="row pl-5 stdActions">
                                <a class="btn btn-icon btn-xs btn-light-primary btn-circle mr-2" title="View Branch" href="#" onclick='showAjaxModal(DOMAIN+"quiz/show/${row.id}")'><i class="nav-icon la la-eye"></i></a>
                                <a class="btn btn-icon btn-xs btn-light-info btn-circle mr-2" href="javascript:" data-toggle="modal" data-target="#modal_ajax" onclick='showAjaxModal(DOMAIN+"quiz/edit/${row.id}");' title="Edit"><i class="nav-icon la la-edit"></i> </a>
                                <a class="btn btn-icon btn-xs btn-light-danger btn-circle mr-2" href="javascript:" onclick='confirm_modal("quiz/destroy", ${row.id}, "branch_list")' title="Delete"><i class="nav-icon la la-trash"></i></a>
                                <a class="btn btn-icon btn-xs btn-light-success btn-circle mr-2" href="javascript:" onclick='$("#modal_ajax").children().removeClass("modal-xl");$("#modal_ajax").children().addClass("modal-lg");showAjaxModal("quiz/add_question", ${row.id});' title="Add Question"><i class="nav-icon la la-plus"></i></a>
                            </div>`;                                
                }
                return `<div class="d-flex align-items-center">
                            <div class=" ml-4">
                                <a href="'+ DOMAIN +'admin/student/profile/' + row.id + '" class="text-dark-75 font-weight-bolder font-size-lg mb-0"> ${row.name} </a>
                                ${data}
                            </div>
                        </div>`;
            }
        },{
            field: 'subject',
            title: 'Subject',
            template: function(row) {
                return `${row.subject.name}`;
            },
        },{
            field: 'group',
            title: 'Group Name',
            template: function(row) {
                return `${row.group_quiz.group.name}`;
            },
        },{
            field: 'group_title',
            title: 'Group Quiz Title',
            template: function(row) {
                return `${row.group_quiz.title}`;
            },
        },{
            field: 'questions',
            title: 'Total Questions',
            template: function(row) {
                var c = 0;
                if(row.question != null){
                    console.log(row.question);
                    c++;
                }
                return `${c}`;
            },
        },{
            field: 'attempt',
            title: 'Quiz Attempt',
            template: function(row) {
                var c = 0;
                if(row.result != null){
                    console.log(row.result);
                    c++;
                }
                return `${c}`;
            },
        },{
            field: 'difficulty_level',
            title: 'Difficulty Level',
            template: function(row) {
                return `${row.difficulty_level.name}`;
            },
        },{
            field: 'status',
            title: 'Status',
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
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#cities').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'city');
        });

        $('#states').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'state');
        });

        $('#status, #kt_datatable_search_type_2 ,#cities ,#states').selectpicker();

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