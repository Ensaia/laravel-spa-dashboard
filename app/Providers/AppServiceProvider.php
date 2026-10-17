<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/dashboard';

    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->bootAuth();
        $this->bootRoute();
    }

    public function bootAuth()
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return env('SPA_URL') . '/reset-password?token=' . $token. '?email='.urlencode($user->email);
        });
//        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
//            return env('SPA_URL', 'APP_URL').'/reset-password?token=' . $token . '&email=' . urlencode($notifiable->getEmailForPasswordReset());
//        });
            VerifyEmail::createUrlUsing(function ($notifiable) {
                $verificationUrl = URL::temporarySignedRoute(
                    'verification.verify',
                    Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                    [
                        'id' => $notifiable->getKey(),
                        'hash' => sha1($notifiable->getEmailForVerification()),
                    ]
                );
            $spaUrl = env('SPA_URL', 'http://localhost:8000');
            return $verificationUrl;

//            return env('SPA_URL').'/api/'.$temporarySignedUrl;

            // Convert backend URL to SPA URL
            // Example: https://api.test... -> https://spa.test...
//            return str_replace(url('/api'), config('app.SPA_URL') . '/email', $temporarySignedUrl);
        });
    }

    public function bootRoute()
    {
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(10);
        });
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(30);
        });
    }
}
