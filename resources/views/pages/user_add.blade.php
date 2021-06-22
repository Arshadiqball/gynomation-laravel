@extends('master')

@section('content')

    <form action="{{URL('/users/create')}}">
        <label for="fname">Name:</label><br>
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="email" placeholder="EMail">
        <input type="password" name="password" placeholder="Password">
        <select name="hospital_id" title="Hospitals">
            <option disabled selected>Select Hospital</option>
        @foreach(App\Hospital::all() as $hospital)
            <option value='{{$hospital->id}}'>{{$hospital->name}}</option>
        @endforeach
        </select>
        <input type="submit" value="Submit">
    </form>

    <!--end::student_teacher-->
    <script src="{{ asset('js/module.js') }}" type="text/javascript"></script>
@endsection
