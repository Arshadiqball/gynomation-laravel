$('#assignStudent').off().on('submit',function(e){
    e.preventDefault();

    var record = {
        'parameter' : $(this).serializeArray(),
        'url' : 'user/assign',
        'method' : 'POST'
    };
    Promise.resolve(a_return(record)).then(
        function(v) {
            toastr.success(v.response);
        }, function(e) {
            console.log(e);
        }
    );
});
