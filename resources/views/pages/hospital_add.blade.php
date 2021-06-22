@extends('master')

@section('content')

    <form action="{{URL('/hospitals/create')}}">
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="address" placeholder="Address">
        <input type="text" name="phone" placeholder="Phone">
        <input type="text" name="lat" placeholder="lat">
        <input type="text" name="lng" placeholder="lng">
        <input type="submit" value="Submit">
    </form>

    <!--end::student_teacher-->
    <script src="{{ asset('js/module.js') }}" type="text/javascript"></script>
@endsection
