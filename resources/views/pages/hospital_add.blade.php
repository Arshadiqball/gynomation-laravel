@extends('master')

@section('content')

    <form action="{{URL('/hospitals/create')}}">
        <label for="fname">Name:</label><br>
        <input type="text" name="name">
        <input type="submit" value="Submit">
    </form>

    <!--end::student_teacher-->
    <script src="{{ asset('js/module.js') }}" type="text/javascript"></script>
@endsection
