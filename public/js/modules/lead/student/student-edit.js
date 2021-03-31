$('#lead_student_form').off().on('submit',function(e){
    e.preventDefault();
    var id = $(this).data('id');
    var type = $(this).data('type');
    var path = (type == 'convert')?'lead/convert_student/':'lead/update_student/';

    var record = {
        'parameter' : $(this).serializeArray(),
        'url' : path+id,
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(
    function(v) {
        // Alert.success(v.response);
        toastr.success(v.response);
    }, function(e) {
        toastr.error(e);
    });
});


$('select[name="package_id"]').off().on('change',function(e){
    var record = {
        'url' : 'api/package/days_list/'+$('select[name="package_id"] option:selected').val(),
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(
    function(v) {
        let options = '';
        $.each(v.data, function( i, vs ) {
            console.log(vs);
            options += `<option value="${vs.id}">${vs.data}</option>`;
        });
        $('select[name="package_day_id"]').html(options);
        $('select[name="package_day_id"]').selectpicker('refresh');
    }, function(e) {
        toastr.error(e);
    });
});

$('select[name="subject_id"]').off().on('change',function(e){
    var record = {
        'url' : 'api/subject/type_list/'+$('select[name="subject_id"] option:selected').val(),
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(function(v) {
        let options = '';
        $.each(v.data, function( i, vs ) {
            console.log(vs);
            options += `<option value="${vs.id}">${vs.name}</option>`;
        });
        $('select[name="subject_type_id"]').html(options);
        $('select[name="subject_type_id"]').selectpicker('refresh');
    }, function(e) {
        toastr.error(e);
    });
});

$('select[name="country_id"]').off().on('change',function(e){
    var record = {
        'url' : 'api/state_list/'+$('select[name="country_id"] option:selected').val(),
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(function(v) {
        let options = '';
        $.each(v.data, function( i, vs ) {
            console.log(vs);
            options += `<option value="${vs.id}">${vs.name}</option>`;
        });
        $('select[name="state_id"]').html(options);
        $('select[name="state_id"]').selectpicker('refresh');
    }, function(e) {
        toastr.error(e);
    });
});

$('select[name="state_id"]').off().on('change',function(e){
    var record = {
        'url' : 'api/city_list/'+$('select[name="state_id"] option:selected').val(),
        'method' : 'POST',
    };
    Promise.resolve(a_return(record)).then(function(v) {
        let options = '';
        $.each(v.data, function( i, vs ) {
            console.log(vs);
            options += `<option value="${vs.id}">${vs.name}</option>`;
        });
        $('select[name="city_id"]').html(options);
        $('select[name="city_id"]').selectpicker('refresh');
    }, function(e) {
        toastr.error(e);
    });
});
