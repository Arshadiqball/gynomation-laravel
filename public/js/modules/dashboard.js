"use strict";

let datatable1, current_classes = [];  
const dashboard = function(){
    return{
        loadLeads: function(){
            var leadsTable = $('#fresh_students');
            $.ajax({
                url:DOMAIN+'lead',
                data:{"from":startdate.format("YYYY-MM-DD"),"to":enddate.format("YYYY-MM-DD"),'type':'student'},
                type:'post',
                dataType: 'json',
                beforeSend: function(){
                    $('> tbody', leadsTable).empty();
                },
                success: function(res){
                    $('#fresh_students').KTDatatable ({
                        data: {
                            saveState: {cookie: false},
                            pageSize: 100,
                            source: res.data,
                            pagination: true
                        },
                        search: {
                            input: $('#newLeads_Search')
                        },
                        layout: {
                            scroll: true,
                            height: 600,
                            class:"table table-striped table-hover table-sm datatable-bordered"
                        },
                        columns: [
                            {
                                field: "id",
                                title:"#",
                                width:40,
                                textAlign: 'center'
                            },
                            {
                                field: "first_name",
                                title:"Name",
                                textAlign: 'center',
                                template: function(row){
                                    return row.first_name+' '+row.last_name;
                                }
                            },
                            {
                                field: "name",
                                title:"Country",
                                textAlign: 'center',
                            }
                        ]
                    });
                
                },complete:function(){
                    
                }
            });
        },
        loadTrials: function(){
            var leadsTable = $('#trial_students');
            $.ajax({
                url:DOMAIN+'lead',
                data:{"from":startdate.format("YYYY-MM-DD"),"to":enddate.format("YYYY-MM-DD"),'type':'trial'},
                type:'post',
                dataType: 'json',
                beforeSend: function(){
                    $('> tbody', leadsTable).empty();
                    // KTApp.block('.show-modal', {
                    //     overlayColor: '#000000',
                    //     state: 'success',
                    //     message: 'Loading Please Wait...'
                    // });
                },
                success: function(res){
                    $('#trial_students').KTDatatable ({
                        data: {
                            saveState: {cookie: false},
                            pageSize: 100,
                            source: res.data,
                            pagination: true
                        },
                        search: {
                            input: $('#newLeads_Search')
                        },
                        layout: {
                            scroll: true,
                            height: 600,
                            class:"table table-striped table-hover table-sm datatable-bordered"
                        },
                        columns: [
                            {
                                field: "id",
                                title:"#",
                                width:40,
                                textAlign: 'center'
                            },
                            {
                                field: "name",
                                title:"Name",
                                width:80,
                                textAlign: 'center',
                                template: function(row){
                                    return row.first_name+' '+row.last_name;
                                }
                            },
                            {
                                field: "name",
                                title:"State",
                                textAlign: 'center',
                                width:80,
                            }
                        ]
                    });
                
                },complete:function(){
                    // KTApp.unblock('.show-modal');
                }
            });
        },
        loadUnsigned: function(){
            var leadsTable = $('#unsigned_students');
            $.ajax({
                url:DOMAIN+'user',
                data:{"from":startdate.format("YYYY-MM-DD"),"to":enddate.format("YYYY-MM-DD"),'type':'unsigned'},
                type:'post',
                dataType: 'json',
                beforeSend: function(){
                    $('> tbody', leadsTable).empty();
                    
                    // KTApp.block('.show-modal', {
                    //     overlayColor: '#000000',
                    //     state: 'success',
                    //     message: 'Loading Please Wait...'
                    // });
                },
                success: function(res){
                    $('#unsigned_students').KTDatatable ({
                        data: {
                            saveState: {cookie: false},
                            pageSize: 100,
                            source: res.data,
                            pagination: true
                        },
                        search: {
                            input: $('#newLeads_Search')
                        },
                        layout: {
                            scroll: true,
                            height: 600,
                            class:"table table-striped table-hover table-sm datatable-bordered"
                        },
                        columns: [
                            {
                                field: "id",
                                title:"#",
                                width:40,
                                textAlign: 'center'
                            },
                            {
                                field: "name",
                                title:"Name",
                                width:80,
                                textAlign: 'center',
                                template: function(row){
                                    return row.first_name+' '+row.last_name;
                                }
                            },
                            {
                                field: "name",
                                title:"State",
                                textAlign: 'center',
                                width:80,
                            }
                        ]
                    });
                
                },complete:function(){
                    // KTApp.unblock('.show-modal');
                }
            });
        },
        loadLeaves: function(){
            var leadsTable = $('#leave_students');
            $.ajax({
                url:DOMAIN+'user',
                data:{"from":startdate.format("YYYY-MM-DD"),"to":enddate.format("YYYY-MM-DD"),'type':'leave'},
                type:'post',
                dataType: 'json',
                beforeSend: function(){
                    $('> tbody', leadsTable).empty();
                    // KTApp.block('.show-modal', {
                    //     overlayColor: '#000000',
                    //     state: 'success',
                    //     message: 'Loading Please Wait...'
                    // });
                },
                success: function(res){
                    $('#leave_students').KTDatatable ({
                        data: {
                            saveState: {cookie: false},
                            pageSize: 100,
                            source: res.data,
                            pagination: true
                        },
                        search: {
                            input: $('#newLeads_Search')
                        },
                        layout: {
                            scroll: true,
                            height: 600,
                            class:"table table-striped table-hover table-sm datatable-bordered"
                        },
                        columns: [
                            {
                                field: "id",
                                title:"#",
                                width:40,
                                textAlign: 'center'
                            },
                            {
                                field: "name",
                                title:"Name",
                                width:80,
                                textAlign: 'center',
                                template: function(row){
                                    return row.first_name+' '+row.last_name;
                                }
                            },
                            {
                                field: "name",
                                title:"State",
                                textAlign: 'center',
                                width:80,
                            }
                        ]
                    });
                
                },complete:function(){
                    // KTApp.unblock('.show-modal');
                }
            });
        },
        loadUnmarked: function(){
            var leadsTable = $('#unmarked_students');
            $.ajax({ 
                url:DOMAIN+'user',
                data:{"from":startdate.format("YYYY-MM-DD"),"to":enddate.format("YYYY-MM-DD"),'type':'unmarked'},
                type:'post',
                dataType: 'json',
                beforeSend: function(){
                    $('> tbody', leadsTable).empty();
                    // KTApp.block('.show-modal', {
                    //     overlayColor: '#000000',
                    //     state: 'success',
                    //     message: 'Loading Please Wait...'
                    // });
                },
                success: function(res){
                    $('#unmarked_students').KTDatatable ({
                        data: {
                            saveState: {cookie: false},
                            pageSize: 100,
                            source: res.data,
                            pagination: true
                        },
                        search: {
                            input: $('#newLeads_Search')
                        },
                        layout: {
                            scroll: true,
                            height: 600,
                            class:"table table-striped table-hover table-sm datatable-bordered"
                        },
                        columns: [
                            {
                                field: "id",
                                title:"#",
                                width:40,
                                textAlign: 'center'
                            },
                            {
                                field: "name",
                                title:"Name",
                                width:80,
                                textAlign: 'center',
                                template: function(row){
                                    return row.first_name+' '+row.last_name;
                                }
                            },
                            {
                                field: "name",
                                title:"State",
                                textAlign: 'center',
                                width:80,
                            }
                        ]
                    });
                
                },complete:function(){
                    // KTApp.unblock('.show-modal');
                }
            });
        },
        loadCounts: function(){
            $.ajax({ 
                url:DOMAIN+'dashboard_counts',
                data:{"from":startdate.format("YYYY-MM-DD"),"to":enddate.format("YYYY-MM-DD")},
                type:'post',
                dataType: 'json',
                beforeSend:function(){
                    KTApp.block('.widget-card', {
                        overlayColor: '#000000',
                        state: 'success',
                        message: 'Loading Please Wait...'
                    });
                },
                success: function(res){
                    $('.student').html(res.data.student);
                    $('.candidate').html(res.data.candidate);
                    $('.agent').html(res.data.agent);
                    $('.ticket').html(res.data.ticket);
                        
                    $('.trial').html(res.data.trial);
                    $('.onleave').html(res.data.onleave);
                    $('.unsigned').html(res.data.unsigned);
                    $('.unmarked').html(res.data.unmarked);
                    $('.fresh').html(res.data.fresh);

                    $('.current_classes').html(res.data.current_classes);
                    $('.absend_teacher').html(res.data.absend_teacher);
                    $('.teachers').html(res.data.teachers);
                    $('.terminated_teacher').html(res.data.terminated_teacher);
                    $('.fresh_candidate').html(res.data.candidate);
                },complete:function(){
                    KTApp.unblock('.widget-card');
                }
            });
        }
    }
}();

function loadData(){
    $(document).on('click','.collapsed',function(){
        if($(this).data('target') == '#load_fresh_students'){
            dashboard.loadLeads();
        }else if($(this).data('target') == '#load_trial_students'){
            dashboard.loadTrials();
        }else if($(this).data('target') == '#load_leave_students'){
            dashboard.loadLeaves();
        }else if($(this).data('target') == '#load_unsigned_students'){
            dashboard.loadUnsigned();
        }else if($(this).data('target') == '#load_unmarked_students'){
            dashboard.loadUnmarked();
        }
    });
    dashboard.loadCounts();
}
