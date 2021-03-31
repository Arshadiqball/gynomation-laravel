
$( ".commenting2" ).off().on("click", function(  ) {
    var form = $(this).data('form');
    var record = {
        'parameter' : $('#'+form).serializeArray(),
        'url' : "commentStore",
        'method' : 'POST'
    };

    Promise.resolve(a_return(record)).then(
    function(v) {
        toastr.success(v.response);
    }, function(e) {
        console.log(e);
        toastr.error(e);
    });
});

$( ".btn-submit-prop" ).click(function( e ) {
    e.preventDefault();
    var record = {
        'parameter' : $("#commenting").serializeArray(),
        'url' : "commentStore",
        'method' : 'POST'
    };

    Promise.resolve(a_return(record)).then(
    function(v) {
        toastr.success(v.response);
    }, function(e) {
        console.log(e);
        toastr.error(e);
    });
});