"use strict";

$(document).ready(function() {
    load.getPermissions();
});

var startdate = moment();
var enddate = moment();

jQuery(document).ready(function() {
    startdate = moment().subtract(6,"days"), enddate = moment();
    let e = $("#permissions_daterangepicker");
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
let table =  $('#permissionsList');
let selected = [];

let loaded = 0;
let show_comment = 0;
let candidate_datatable;
const load = function(){
    return{
        getPermissions: function () {
            var from = startdate.format("YYYY-MM-DD");
            var to = enddate.format("YYYY-MM-DD");
            $.ajax({
                type: "GET",
                dataType:'json',
                cache: false,
                data: {"from": from,"to":to},
                // url: g_baseUrl + 'admin/hr/permissions/get',
                url: g_baseUrl + 'permission/list',
                success: function(result)
                {
                    if(result.success){
                        load.permissionTable(result.response);
                    }
                },
                error: function(res){
                    console.log(res);
                }
            });
        },
        permissionTable: function(data){
            let datatable, query;
            if(loaded !== 0){
                $('#permissionsList').KTDatatable ().destroy();
            }
            datatable = $('#permissionsList').KTDatatable ({
                data: {
                    type: "local",
                    source: data,
                    saveState: {cookie: true},
                    pageSize: 100
                },
                layout: {
                    theme: 'default',
                    class: '',
                    scroll: false,
                    //height: 700,
                    footer: false

                },
                sortable: true,
                pagination: true,
                smoothScroll: {scrollbarShown: true},
                search: {input: $('#search')},
                rows: {autoHide: false},
                columns: [
                    {
                        field: "ID",
                        title:"#",
                        sortable:!1,
                        width: 40,
                        height: 75,
                        textAlign: 'center',
                        selector: { class: 'm-checkbox--solid m-checkbox--brand' }
                    },
                    {
                        field: "name",
                        title: "Permission",
                    },{
                        field: "guard_name",
                        title: "Guard",
                    },{
                        field: "Actions",
                        title: "Actions",
                        sortable: false,
                        filterable: false,
                        width: 50,
                        overflow: 'visible',
                        template: function (row) {

                            return '<div class="dropdown dropdown-inline">'+                            
                                '<a href="javascript:;" class="btn btn-sm btn-light btn-text-primary btn-icon mr-2" data-toggle="dropdown">'+
                                    '<span class="svg-icon svg-icon-md">'+                                  
                                        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">'+                                      
                                            '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+         
                                                '<rect x="0" y="0" width="24" height="24"></rect>'+                                          
                                                '<path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>'+               
                                            '</g>'+                                  
                                        '</svg>'+                              
                                    '</span>'+                         
                                '</a>'+                       
                                '<div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">'+                              
                                    '<ul class="navi flex-column navi-hover py-2">'+                                  
                                        '<li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">Choose an action:</li>'+                                                               
                                        '<li class="navi-item">'+                                      
                                            '<a href="#" data-toggle="modal" data-target="#modal_ajax" onclick="showAjaxModal(\''+g_baseUrl+'permission/show/'+row.id+'\');" class="navi-link">'+                                          
                                                '<span class="navi-icon"><i class="la la-eye"></i></span>'+           
                                                '<span class="navi-text">View</span>'+                                      
                                            '</a>'+                                  
                                        '</li>'+  
                                        '<li class="navi-item">'+                                      
                                            '<a href="#" data-toggle="modal" data-target="#modal_ajax" onclick="showAjaxModal(\''+g_baseUrl+'permission/edit/'+row.id+'\');" class="navi-link">'+                                          
                                                '<span class="navi-icon"><i class="la la-edit"></i></span>'+           
                                                '<span class="navi-text">Edit</span>'+                                      
                                            '</a>'+                                  
                                        '</li>'+
                                        '<li class="navi-item">'+                                      
                                            '<a href="#" data-toggle="modal" onclick="confirm_modal(\''+g_baseUrl+'permission/delete/'+row.id+'\');" class="navi-link">'+                                          
                                                '<span class="navi-icon"><i class="la la-trash"></i></span>'+           
                                                '<span class="navi-text">Delete</span>'+                                      
                                            '</a>'+                                  
                                        '</li>'+                                                                
                                    '</ul>'+                          
                                '</div>'+                      
                            '</div>';

                        }
                    }]
            });
            //query = datatable.getDataSourceQuery();
            $('#status').on('change', function () {
                let permission_status = $(this).val().toLowerCase();
                datatable.search(permission_status, 'guard_name');
            });
            loaded = 1;
        },
        getCandidates: function () {
            var from = startdate.format("YYYY-MM-DD");
            var to = enddate.format("YYYY-MM-DD");
            $.ajax({
                type: "POST",
                dataType:'json',
                cache: false,
                data: {"from": from,"to":to},
                url: g_baseUrl + 'admin/hr/candidates/get',
                success: function(result)
                {

                 
                    
                    test(result.response);
                    load.candidateTable(result.response);
                },
                error: function(res){
                    console.log(res);
                }
            });
        },
        candidateTable: function (data) {

            
                
            if(loaded !== 0){
               
                candidate_datatable.destroy(); 
                // $("#search").typeahead("destroy"); 

            }
           
           
             candidate_datatable = $('#candidatesList').KTDatatable ({
                data: {
                    type: "local",
                    source: data,
                    saveState: {cookie: true},
                    pageSize: 100
                },
                layout: {
                    theme: 'default',
                    class: '',
                    scroll: false,
                    //height: 700,
                    footer: false
                },
                sortable: true,
                pagination: true,
                smoothScroll: {scrollbarShown: true},
                search: {input: $('#search2')},
                rows: {autoHide: false},
                columns: [
                    {
                        field: "ID",
                        title:"#",
                        sortable:!1,
                        width: 40,
                        height: 75,
                        textAlign: 'center',
                        selector: { class: 'm-checkbox--solid m-checkbox--brand' }
                    },
                    {
                        field: "name",
                        title: "Name",
                        template: function (row) {
                            return row.image+'<strong><a class="m-link m-link--brand" data-toggle="modal" data-target="#modal_ajax" onclick="showAjaxModal(\''+g_baseUrl+'modal/popup/candidate_view/'+row.candidate_id+'\')">'+row.first_name+' '+row.last_name+'</a></strong>';
                        }
                    },{
                        field: "phone",
                        title: "Phone",
                    },{
                        field: "cnic",
                        title: "cnic" 
                    },{
                        field: "area",
                        title: "Area",
                    },{
                        field: "shift",
                        title: "Shift",
                        template: function (row) {
                            let shift;
                            switch(row.shift) {
                                case '1': shift = 'Day';
                                    break;
                                case '2': shift = 'Night';
                                    break;
                                default: shift = 'Undefined';
                            }
                            return shift;
                        }
                    },{
                        field: "registration",
                        title: "Registered",
                        template: function (row) {
                            return moment(row.registration,'YYYY-MM-DD HH:mm:ss').format('DD-MM-YY');
                        }
                    },{
                        field: "status",
                        title: "Status",
                        width: 80,
                        template: function (row) {
                            let status;
                            switch(row.status) {
                                case '0': status = '<span class="badge badge-danger"> Rejected </span>';
                                    break;
                                case '1': status = '<span class="badge badge-primary"> Applied </span>';
                                    break;
                                case '2': status = '<span class="badge badge-focus"> Pending </span>';
                                    break;
                                case '3': status = '<span class="badge badge-warning"> Shortlisted </span>';
                                    break;
                                case '4': status = '<span class="badge badge-danger"> Interview Call </span>';
                                    break;
                                case '5': status = '<span class="m-badge m-badge--primary m-badge--wide"> Not Answering </span>';
                                    break;
                                case '6': status = '<span class="badge badge-danger"> Not Interested </span>';
                                    break;
                                default: status = '<span class="badge badge-secondary"> Undefined </span>';
                            }
                            return status;
                        }
                    },{
                        field: "Actions",
                        title: "Actions",
                        sortable: false,
                        filterable: true,
                        overflow: 'visible',
                        template: function (row) {
                            return '<div class="m-btn-group m-btn-group--pill btn-group btn-group-sm" role="group" aria-label="candidate-action">\n' +
                                '<button type="button" data-toggle="modal" data-target="#modal_ajax" onclick="showAjaxModal(\''+g_baseUrl+'modal/popup/candidate_view/'+row.candidate_id+'\');" class="m-btn btn m-btn--xs btn-brand"><i class="la la-eye"></i></button>\n' +
                                '<button type="button" data-toggle="modal" data-target="#modal_ajax" onclick="showAjaxModal(\''+g_baseUrl+'modal/popup/candidate_edit/'+row.candidate_id+'\');" class="m-btn btn m-btn--xs btn-warning"><i class="la la-edit"></i></button>\n' +
                                '<button type="button" class="m-btn btn m-btn--xs btn-danger" onclick="delCandidates(\''+row.candidate_id+'\');"><i class="la la-trash"></i></button>\n' +
                                '</div>';
                        }
                    }]
            });

           

    //  $('#kt_typeahead_1_validate, #kt_typeahead_2_validate').typeahead({
    //   hint: true,
    //   highlight: true,
    //   minLength: 1
    //  }, {
    //   name: 'candidates',
    //   source: substringMatcher(states)
    //  });
    
   
 

            let query = candidate_datatable.getDataSourceQuery();
            $('#candidate_status').on('change', function (){
                let candidate_status = $(this).val().toLowerCase();
                candidate_datatable.search(candidate_status, 'status');
            }).val(typeof query.status !== 'undefined' ? query.status : '');

            $('#shifts').on('change', function () {
                let candidate_shift = $(this).val().toLowerCase();
                candidate_datatable.search(candidate_shift, 'shift');
            }).val(typeof query.shift !== 'undefined' ? query.shift : '');

            candidate_datatable.on('m-datatable--on-check', function (e, args) {
                let count = candidate_datatable.getSelectedRecords().length;
                $('#group_selected_count').html(count);
                if (count > 0) {
                    selected.push(args.toString());
                    $('#group_selection_show').collapse('show');
                }
            }).on('m-datatable--on-uncheck m-datatable--on-layout-updated', function (e, args) {
                var count = candidate_datatable.getSelectedRecords().length;
                $('#group_selected_count').html(count);
                for( var i = 0; i < selected.length-1; i++){
                    if ( selected[i] === args.toString()) {
                        selected.splice(i, 1);
                    }
                }
                if (count === 0) {
                    selected = [];
                    $('#group_selection_show').collapse('hide');
                }
            });
            loaded = 1;
        }
    }
}();
   function test(data){
    let t = new Bloodhound({
        datumTokenizer:Bloodhound.tokenizers.obj.whitespace("first_name","last_name","phone","email","cnic"),
        queryTokenizer:Bloodhound.tokenizers.whitespace,
        local:data
    });
    $("#search").typeahead(
        {hint: !0, highlight: !0, minLength: 1},
        {
            name: 'candidates',
            display: function(candidate){ return candidate.first_name+' '+candidate.last_name + ' - '+candidate.area},
            source: t
        }).on('typeahead:selected', function (obj, selected) {
        candidate_datatable.search(selected.candidate_id,"candidate_id");

    }).on('input', function() {
        console.log(this.value);
            if(this.value == ''){
            
                load.getCandidates();
                
            }
    });
  }

$( "#assign_user_permission" ).submit(function( event ) {
    alert(1);
    $.ajax({
        type: "POST",
        dataType:'json',
        cache: false,
        data:  $('#assign_user_permission').serialize(),
        url: g_baseUrl + 'permission/assign_user_permission',
        success: function(result)
        {
            if(result.success){
                // load.permissionTable(result.response);
                alert('success');
            }
        },
        error: function(res){
            console.log(res);
            alert('error');
        }
    });
});