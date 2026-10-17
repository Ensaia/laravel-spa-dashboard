<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

//Route::get('user/auth', App\Http\Controllers\AuthController::class);
// 'verified'

Route::post('/email/verification-notification',function(Request $request){
//    if($request->user()->hasVerifiedEmail()){
//        return response()->json(['message' => 'تم التحقق من البريد الإلكتروني بالفعل.'],400);
//    }
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['status' => 'تم إرسال رابط التحقق'],204);
})->middleware(['auth:sanctum'],'throttle:6,1')->name('verification.send');

Route::get('/email/verify/{id}/{hash}',function(EmailVerificationRequest $request){
    $request->fulfill();
    return response()->json(['message' => 'تم التحقق من البريد الإلكتروني بنجاح.'],200);
})->middleware(['auth:sanctum','signed'])->name('verification.verify');

Route::middleware(['auth:sanctum','verified'])->group(function () {
    /**
     *
     */
     Route::get('user/auth', App\Http\Controllers\AuthController::class);
    /**
    *
    */
        Route::controller(\App\Http\Controllers\DashboardController::class)->group(function () {
        Route::get('/dashboard', 'index');
        });
/**
 *
 */
    Route::controller(\App\Http\Controllers\UserController::class)->group(function () {
        Route::get('/users', 'index');
        Route::post('/user/create', 'store');
        Route::get('/user/show/{user}', 'show');
        Route::put('/user/update/{user}', 'update');
        Route::delete('/user/destroy/{user}', 'destroy');
    });
    // Route::controller(\App\Http\Controllers\RoleController::class)->group(function () {
    //     Route::get('/roles', 'index');
    //     Route::post('/role/create', 'store');
    //     Route::get('/role/edit/{role}', 'edit');
    //     Route::put('/role/update/{role}', 'update');
    //     Route::delete('/role/destroy/{role}', 'destroy');
    // });
});
