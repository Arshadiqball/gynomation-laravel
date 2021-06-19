@include('layout.base._header-mobile')

<div class="d-flex flex-column flex-root">
    <!--begin::Page-->
    <div class="d-flex flex-row flex-column-fluid page">

        @include('layout.base._aside')

        <div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">

            @include('layout.base._header')
        
            <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
            
                <div class="py-5">
                    {{-- @include('layout.base._search') --}}
                </div>

                <div class="d-flex flex-column-fluid">

                    <div class="container show-modal">
                        @yield('content')
                    </div>

                </div>

            </div>

            @include('layout.base._footer')
        </div>
        <!--end::Wrapper-->
    </div>
    <!--end::Page-->
</div>
<!--end::Main-->

@include('layout.components.dropdown._quick-assign')
@include('layout.components.dropdown._quick-search')
@include('layout.components.dropdown._quick-user')
@include('layout.components.dropdown._quick-panel')
@include('layout.components.dropdown._chat')
@include('layout.components.dropdown._email')
@include('layout.components._scrolltop')
@include('layout.components._toolbar')
@include('layout.components._demo-panel')