{{-- Aside --}}

@php
    $kt_logo_image = 'logo-light.png';
@endphp

@if (config('layout.brand.self.theme') === 'light')
    @php $kt_logo_image = 'logo-dark.png' @endphp
@elseif (config('layout.brand.self.theme') === 'dark')
    @php $kt_logo_image = 'logo-light.png' @endphp
@endif

<!--begin::Aside-->
<div class="aside aside-left d-flex flex-column" id="kt_aside">
    <!--begin::Brand-->
    <div class="aside-brand d-flex flex-column align-items-center flex-column-auto py-4 py-lg-8">
        <!--begin::Logo-->
        <a href="index.html">
            <img alt="Logo" src="{{ asset('media/logos/logo-letter-9.png') }}" class="max-h-40px" />
        </a>
        <!--end::Logo-->
    </div>
    <!--end::Brand-->
    <!--begin::Nav Wrapper-->
    <div class="aside-nav d-flex flex-column align-items-center flex-column-fluid pt-7">
        <!--begin::Nav-->
        <ul class="nav flex-column">
            <!--begin::Item-->
            <!-- <li class="nav-item mb-5" data-toggle="tooltip" data-placement="right" data-container="body" data-boundary="window" 
            title="Finance &amp; Accounting">
                <a href="#" class="nav-link btn btn-icon btn-clean btn-icon-white btn-lg active" data-toggle="tab" data-target="#kt_aside_tab_2" role="tab">
                    <i class="flaticon2-analytics-2 icon-lg icon-lg"></i>
                </a>
            </li> -->
            <!--end::Item-->
            <!--begin::Item-->
            <li class="nav-item mb-5" data-toggle="tooltip" data-placement="right" data-container="body" data-boundary="window" 
            title="Appointments">
                <a href="#" class="nav-link btn btn-icon btn-icon-white btn-lg" data-toggle="tab" data-target="#kt_aside_tab_3" role="tab">
                    <i class="flaticon2-group icon-lg"></i>
                </a>
            </li>
            <!--end::Item-->

        </ul>
        <!--end::Nav-->
    </div>
</div>
<!--end::Aside-->
