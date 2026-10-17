<!DOCTYPE html>
{{--<html lang="{{ env('WEBSITE_LANG') }}" dir="{{ env('WEBSITE_DIR') }}">--}}
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no">
    <meta name="description" content="CoreUI Laravel Vue.js Admin Template">
    <meta name="author" content="Mohammed Ensaia">
    <title>{{env('APP_NAME')}}</title>
    @vite(['resources/js/app.js','resources/sass/app.scss'])
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#ffffff">
    <script>
        const userMode = localStorage.getItem('coreui-free-vue-admin-template-theme');
        const systemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (userMode === 'dark' || (userMode !== 'light' && systemDarkMode)) {
            document.documentElement.dataset.coreuiTheme = 'dark';
        }
    </script>
</head>

<body>
<noscript>
    <strong>نعتذر، لكن هذا التطبيق لا يعمل بشكل صحيح دون تفعيل JavaScript. يرجى تفعيلها للمتابعة.</strong>
</noscript>

<div id="app"></div>

</body>

</html>
