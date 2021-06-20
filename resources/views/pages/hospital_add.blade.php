@extends('master')

@section('content')

    {{ Form::open(array('url' => 'hospital/create')) }}
        {{ Form::text('name') }}
        {{ Form::submit('Create') }}
    {{ Form::close() }}

    <!--end::student_teacher-->
    <script src="{{ asset('js/module.js') }}" type="text/javascript"></script>
@endsection
