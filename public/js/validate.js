
$(document).on('keyup change','.form-control[required]',function(){
    validate(this);
});

function validate(that){
    if($.trim($(that).val()) !== ''){
        $(that).removeClass('is-invalid').addClass('is-valid');
        if($(that).attr('type') == 'email'){
            if(!ValidateEmail($(that).val())){
                $(that).removeClass('is-valid').addClass('is-invalid');
                return false;
            }
        }else if($(that).attr('type') == 'number' && $(that).attr('id') == 'phone'){
            if(!Phonenumber($(that).val())){
                $(that).removeClass('is-valid').addClass('is-invalid');
                return false;
            }
        }
        return true;
    }else{
        $(that).removeClass('is-valid').addClass('is-invalid');
        return false;
    }
}

function ValidateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(String(email).toLowerCase()))?true:false;
}

function Phonenumber(phone){
    var phoneno = /^\d{10}$/;
    return (phone.match(phoneno))?true:false;
}

