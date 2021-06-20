
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
                                url: DOMAIN + 'appointment/list',
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
                        title: 'Name'
                    }, {
                        field: 'address',
                        title: 'Address'
                    }, {
                        field: 'phone',
                        title: 'Phone'
                    }, {
                        field: 'reason',
                        title: 'Reason'
                    }, {
                        field: 'created_at',
                        title: 'Create At',
                        template: function(row){
                            return moment(row.created_at,'YYYY-MM-DD HH:mm:ss').fromNow();
                        }
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
    
                datatable = $('#appointment_list').KTDatatable(options);
    
                $('#kt_datatable_search_type_2').selectpicker();
    
            }
        }
    }();

    Load2 = function() {
        // Private functions
        return {
            data: function () {
                var options = {
                    // datasource definition
                    data: {
                        type: 'remote',
                        source: {
                            read: {
                                url: DOMAIN + 'users/list',
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
                        title: 'Name'
                    }, {
                        field: 'email',
                        title: 'Email'
                    }, {
                        field: 'created_at',
                        title: 'Create At',
                        template: function(row){
                            return moment(row.created_at,'YYYY-MM-DD HH:mm:ss').fromNow();
                        }
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
    
                datatable = $('#user_list').KTDatatable(options);
    
                $('#kt_datatable_search_type_2').selectpicker();
    
            }
        }
    }();

    Load3 = function() {
        // Private functions
        return {
            data: function () {
                var options = {
                    // datasource definition
                    data: {
                        type: 'remote',
                        source: {
                            read: {
                                url: DOMAIN + 'hospital/list',
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
                        title: 'Name'
                    }, {
                        field: 'email',
                        title: 'Email'
                    }, {
                        field: 'created_at',
                        title: 'Create At',
                        template: function(row){
                            return moment(row.created_at,'YYYY-MM-DD HH:mm:ss').fromNow();
                        }
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
    
                datatable = $('#hospital_list').KTDatatable(options);
    
                $('#kt_datatable_search_type_2').selectpicker();
    
            }
        }
    }();
    
    
    Load.data();
    Load2.data();
    Load3.data();
    