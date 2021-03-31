<!--begin::Demo Panel-->
<div id="kt_demo_panel" class="offcanvas offcanvas-right p-10">
    <!--begin::Header-->
    <div class="offcanvas-header d-flex align-items-center justify-content-between pb-7">
        <h4 class="font-weight-bold m-0">Select A Branch</h4>
        <a href="#" class="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_demo_panel_close">
            <i class="ki ki-close icon-xs text-muted"></i>
        </a>
    </div>
    <!--end::Header-->
    <!--begin::Content-->
    <div class="offcanvas-content">
        <!--begin::Wrapper-->
        <div class="offcanvas-wrapper mb-5 scroll-pull">
            <h5 class="font-weight-bold mb-4 text-center">Branch 1</h5>
            <div class="overlay rounded-lg mb-8 offcanvas-demo">
                <div class="overlay-wrapper rounded-lg">
                    <img src="{{ asset('media/demos/demo1.png') }}" alt="" class="w-100" />
                </div>
                <div class="overlay-layer">
                    <a href="#" class="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Information</a>
                    <a href="#" class="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">View as Role</a>
                </div>
            </div>
            <h5 class="font-weight-bold mb-4 text-center">Branch 2</h5>
            <div class="overlay rounded-lg mb-8 offcanvas-demo">
                <div class="overlay-wrapper rounded-lg">
                    <img src="{{ asset('media/demos/demo2.png') }}" alt="" class="w-100" />
                </div>
                <div class="overlay-layer">
                    <a href="#" class="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Information</a>
                    <a href="#" class="btn btn-white btn-text-primary btn-hover-primary font-weight-boldest text-center min-w-75px shadow" target="_blank">Login as</a>
                </div>
            </div>
        </div>
        <!--end::Wrapper-->
        <!--begin::Purchase-->
        <div class="offcanvas-footer">  
            <a href="#" target="_blank" class="btn btn-block btn-danger btn-shadow font-weight-bolder text-uppercase">View all!</a>
        </div>
        <!--end::Purchase-->
    </div>
    <!--end::Content-->
</div>
<!--end::Demo Panel-->