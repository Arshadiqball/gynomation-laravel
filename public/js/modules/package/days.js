
$('#package_days_form').submit(function(e){
    e.preventDefault();
    var limit =  $(this).data('limit');
    var selected = parseInt($('#package_days_form .weekDays option:selected').length);
    if(limit == selected){

        var record = {
            'parameter' : $("#package_days_form").serializeArray(),
            'url' : 'packages/days_store',
            'method' : 'POST'
        };
        Promise.resolve(a_return(record)).then(
        function(result) {

            if(result.success){
                Alert.success(result.message);
                modal({
                    'url': `packages/days/${result.data.package_id}`,
                    'size': 'lg',
                    'title': `Package: ${result.data.package_name}`,
                    success: function (res) {
                        console.log('Model Load Successfully');
                    }
                });
            }else{
                Alert.error(result.message);
            }

        }, function(e) {
            console.log(e);
        });

    }else{
        Alert.error('Minium '+limit+' Records');
    }
});

$('.package_days_update').click(function(e){
    e.preventDefault();
    var id = $(this).data('id');
    var limit =  $('#package_days_form_update_'+id).data('limit');
    var selected = parseInt($('#package_days_form_update_'+id+' .weekDays option:selected').length);
    // console.log(limit,selected);
    if(limit == selected){

        var record = {
            'parameter' : $('#package_days_form_update_'+id).serializeArray(),
            'url' : 'packages/days_update/'+id,
            'method' : 'POST'
        };

        Promise.resolve(a_return(record)).then(
        function(result) {
            Alert.success(result.message);
        }, function(e) {
            console.log(e);
        });

    }else{
        Alert.error('Minium '+limit+' Records');
    }
});
