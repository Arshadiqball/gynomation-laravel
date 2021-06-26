

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
    <meta charset="utf-8"/>

        {{-- Title Section --}}
        <title>Gynomation</title>

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


        @include('layout.base._layout')


        {!!_attachScripts(isset($custom_script) ? $custom_script : null)!!}


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

    <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            });
    </script>
</html>
