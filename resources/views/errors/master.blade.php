
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
        
        {{-- Favicon --}}
        <link rel="shortcut icon" href="{{ asset('media/logos/favicon.ico') }}" />
		<link href="{{ asset('css/pages/error/error-5.css') }}" rel="stylesheet" type="text/css" />

        {{-- Global Theme Styles (used by all pages) --}}
        @foreach(config('layout.resources.css') as $style)
            <link href="{{ asset($style) }}" rel="stylesheet" type="text/css"/>
        @endforeach

        <script src="{{ asset('js/global.js') }}" type="text/javascript"></script> 
    </head>
    <body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled page-loading">
    
        @yield('content')

    </body>
</html>
