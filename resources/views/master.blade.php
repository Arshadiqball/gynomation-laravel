

@php
    $usertime = env('APP_TIMEZONE','');
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta charset="utf-8"/>

        {{-- Title Section --}}
        <title>{{ config('app.name') }} | {{ config('app.title') }}</title>

        {{-- Meta Data --}}
        <meta charset="UTF-8">
        <meta name="author" content="@yield('page_author', $page_author ?? '')">
        <meta name="description" content="@yield('page_description', $page_description ?? '')"/>
        <meta name="keywords" content="@yield('page_keywords', $page_keywords ?? '')">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="_token" id="domain" domain="{{ URL('/') }}" content="{{csrf_token()}}" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
		<!--begin::Page Vendors Styles(used by this page)-->
		<!-- <link href="//www.amcharts.com/lib/3/plugins/export/export.css" rel="stylesheet" type="text/css" /> -->
		<!--end::Page Vendors Styles-->

        {{-- Favicon --}}
        <link rel="shortcut icon" href="{{ asset('media/logos/favicon.ico') }}" />

        {{-- Fonts --}}
        {{ Theme::getGoogleFontsInclude() }}

        {{-- Global Theme Styles (used by all pages) --}}
        @foreach(config('layout.resources.css') as $style)
            <link href="{{ asset($style) }}" rel="stylesheet" type="text/css"/>
        @endforeach


        <style>
        /* Custom CSS */
        .stdActions{
            display:none;
        }
        .datatable-row:hover .stdActions{
            display:block;
        }

        </style>
        <script src="{{ asset('js/global.js') }}" type="text/javascript"></script>
        <script> var IMG_LINK = "{{env('IMG_LINK')}}"; </script>
    </head>
    <body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled page-loading">

        {{-- Global Theme JS Bundle (used by all pages)  --}}
        @foreach(config('layout.resources.js') as $script)
            <script src="{{ asset($script) }}" type="text/javascript"></script>
        @endforeach
        {{-- Global Config (global config for global JS scripts) --}}

        <script>
            var startdate = moment('01-01-2000');
            var enddate = moment();
            var REG_DATE = '{{ isset($reg_date) ? $reg_date : "01-01-2000" }}';
        </script>

        @include('layout.base._layout')

        <!--begin::Global Config(global config for global JS scripts)-->
		<script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1200 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#8950FC", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#F3F6F9", "dark": "#212121" }, "light": { "white": "#ffffff", "primary": "#E1E9FF", "secondary": "#ECF0F3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#212121", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#ECF0F3", "gray-300": "#E5EAEE", "gray-400": "#D6D6E0", "gray-500": "#B5B5C3", "gray-600": "#80808F", "gray-700": "#464E5F", "gray-800": "#1B283F", "gray-900": "#212121" } }, "font-family": "Poppins" };</script>
		<!--end::Global Config-->

		<!--begin::Page Scripts(used by this page)-->
		<script src="{{ asset('js/pages/custom/inbox/inbox.js') }}"></script>

        {!!_attachScripts(isset($custom_script) ? $custom_script : null)!!}

        <script>

        $(document).ready(function(){
            $('#kt_body').addClass('aside-minimize');
        });

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        rangeData = {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        };

        var arrows;
        if (KTUtil.isRTL()) {
            arrows = {
                leftArrow: '<i class="la la-angle-right"></i>',
                rightArrow: '<i class="la la-angle-left"></i>'
            }
        } else {
            arrows = {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        }

        $('.timepicker').timepicker();
        jQuery(document).ready(function() {


            $(document).on('focus','.datepicker', function(){
                var el = $(this);
                var format = ($(el).data("format"))?$(el).data('format'):"yyyy-mm-dd";
                var orientation = ($(el).data("orientation"))?$(el).data('orientation'): "bottom left";
                $(el).datepicker({
                    rtl: KTUtil.isRTL(),
                    todayHighlight: true,
                    orientation:orientation,
                    templates: arrows,
                    format: format,
                    todayBtn: "linked",
                    clearBtn: true,
                });
            });




        $(document).on('focus','.daterange-picker', function(){
                let e = $(this);
                if(0 !== e.length){
                    var start = moment();
                    var end = moment();

                    e.daterangepicker({
                        buttonClasses: ' btn',
                        applyClass: 'btn-primary',
                        cancelClass: 'btn-secondary',
                        startDate: start,
                        endDate: end,
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                            'Lifetime' : [moment(REG_DATE, "YYYY-MM-DD"),moment()]
                        },
                    }, function(start, end, label) {
                        set_daterange_new_date(start,end,"");
                    });

                }
                function set_daterange_new_date(t,a,r) {
                    startdate = t;
                    enddate = a;
                    $(e).find('input').val( t.format("YYYY-MM-DD") + ' / ' + a.format("YYYY-MM-DD"));

                    if(typeof loadData === "function"){
                        loadData();
                    }
                    var o = "", n = ""; a-t <100||"Today" === r ? (o="Today:", n = t.format("MMM D")) :"Yesterday" === r ? (o="Yesterday:",n=t.format("MMM D")) : n = t.format("MMM D")+" - "+a.format("MMM D"), e.find(".m-subheader__daterange-date").html(n), e.find(".m-subheader__daterange-title").html(o)
                }
            });
        });

        // $(document).on('click','.ranges li',function(){
        //     console.log(123);
        //     $('.ranges li').removeClass('active');
        //     $(this).addClass('active');
        // })

        $(document.body).on('click', '.edit, .add, .view, .convert, .transfer, .addWeekDays, .assign, .global-modal, .global-ajax', function(e){
            e.preventDefault();
            modal({
                'url': $(this).data('url'),
                'size': $(this).data('size'),
                'title': $(this).data('title')
            });
        });

        </script>

        @if(Session::has('warning'))
        <script>
            toastr.warning(`{{ Session::get('message') }}`);
        </script>
        @endif

        @if(Session::has('error'))
        <script>
            toastr.error(`{{ Session::get('message') }}`);
        </script>
        @endif

        @if(Session::has('success'))
        <script>
            toastr.success(`{{ Session::get('message') }}`);
        </script>
        @endif

        @if(Session::has('info'))
        <script>
            toastr.info(`{{ Session::get('message') }}`);
        </script>
        @endif

		<!--begin::Page Vendors(used by this page)-->
		<script src="//www.amcharts.com/lib/3/amcharts.js"></script>
		<script src="//www.amcharts.com/lib/3/serial.js"></script>
		<script src="//www.amcharts.com/lib/3/radar.js"></script>
		<script src="//www.amcharts.com/lib/3/pie.js"></script>
		<script src="//www.amcharts.com/lib/3/plugins/tools/polarScatter/polarScatter.min.js"></script>
		<script src="//www.amcharts.com/lib/3/plugins/animate/animate.min.js"></script>
		<script src="//www.amcharts.com/lib/3/plugins/export/export.min.js"></script>
		<script src="//www.amcharts.com/lib/3/themes/light.js"></script>
		<!--end::Page Vendors-->
		<!--begin::Page Scripts(used by this page)-->
		<script src="{{ asset('js/pages/features/charts/amcharts/charts.js') }}"></script>
        <!--end::Page Scripts-->

        <script src="{{ asset('js/validate.js') }}" type="text/javascript"></script>

        <div class="modal fade" id="modal_ajax" role="dialog" aria-labelledby="eQModalLabel" data-backdrop="static" data-keyboard="true" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header py-3">
                        <h5 class="modal-title" id="eQModalLabel">{{ env('APP_NAME') }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <i class="flaticon2-cross text-hover-primary text-dark-75"></i>
                        </button>
                    </div>
                    <div class="modal-body p-0">
                        <div class="modData"></div>
                    </div>
                </div>
            </div>
        </div>

        <!--begin::Modal-->
        <div class="modal fade" id="delete_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel2">Delete Record</h5>
                    </div>
                    <div class="modal-body">
                        <div class="scroll" data-scroll="true">
                            <p>are you sure, delete this records, if you click on <span class="text-danger">"Delete Button"</span></p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-danger" data-url="" data-name="" id="delete_link"
                        onclick="destroy({
                            'url' : this.getAttribute('data-url'),
                            'name' : this.getAttribute('data-name')
                        })">Delete</a>
                        <button type="button" class="btn btn-light-primary font-weight-bold" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end::Modal-->

    </body>
    <script>

        $(document).ajaxStart(function() {
            console.log('Ajax Started');
        });
        $( document ).ajaxStop(function() {
            console.log('Ajax Ended');
        });

    </script>

    <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
    </script>
</html>
