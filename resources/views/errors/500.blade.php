@extends('errors.master')

@section('content')

    <!--begin::Main-->
    <div class="d-flex flex-column flex-root">
        <!--begin::Error-->
        @php $image = asset('media/error/bg5.jpg') @endphp
        <div class="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center" style="background-image: url('{{ $image }}');">
            <!--begin::Content-->
            <div class="container d-flex flex-row-fluid flex-column justify-content-md-center p-12">
                <h1 class="error-title font-weight-boldest text-info mt-10 mt-md-0 mb-12">Oops 500!</h1>
                <p class="font-weight-boldest display-4">Something went wrong here.</p>
                <p class="font-size-h3">We're working on it and we'll get it fixedas soon possible.You can back or use our Help Center.</p>
            </div>
            <!--end::Content-->
        </div>
        <!--end::Error-->
    </div>
    <!--end::Main-->

@endsection