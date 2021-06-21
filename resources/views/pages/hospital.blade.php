@extends('master')

@section('content')

    <a href="{{URL('hospital/add')}}" class="btn btn-primary">Add Hospital</a>

    <!--begin::student_teacher-->
    <div class="row">
        <div class="col-lg-12">
            <div class="datatable datatable-bordered datatable-head-custom" id="hospital_list"></div>
        </div>
    </div>
    <!--end::student_teacher-->
    <script src="{{ asset('js/module.js') }}" type="text/javascript"></script>
@endsection
