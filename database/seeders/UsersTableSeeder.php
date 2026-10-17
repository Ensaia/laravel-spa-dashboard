<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'mohammed',
                'email' => 'mohammed@laravel.com',
                'email_verified_at' => '',
                'password' => '$2y$12$Y8dfePo0CQOvIRj6GyUqR.1/cWyNNhRtWlfLu99dExVbaCp5nrmkS',
                'remember_token' => 'yqxLorVPMNVYefWYRZBuiF81fXs4phsAbU9Xq2mrPYlzuY3nv7cdeBOjjaKk',
                'created_at' => '2026-10-07 05:15:38',
                'updated_at' => '2026-10-17 10:14:46',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'two_factor_confirmed_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'User',
                'email' => 'user@laravel.com',
                'email_verified_at' => '2026-10-07 05:15:37',
                'password' => '$2y$12$jz7Xszf7mFEmiPA25uAnX.vkzai3d4kX9olgADED0REzbek27tHIO',
                'remember_token' => NULL,
                'created_at' => '2026-10-12 07:05:57',
                'updated_at' => '2026-10-12 07:05:57',
                'two_factor_secret' => NULL,
                'two_factor_recovery_codes' => NULL,
                'two_factor_confirmed_at' => NULL,
            ),
        ));
        
        
    }
}