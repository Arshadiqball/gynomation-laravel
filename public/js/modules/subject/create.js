$( "#create" ).click(function( e ) {
    e.preventDefault();
    a($("#create_form").serializeArray(), 'subject/store', 'POST', 'subject_list');
});
