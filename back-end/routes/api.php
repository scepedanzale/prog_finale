<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;


Route::resource('/user', UserController::class);
Route::get('/user-auth', [UserController::class, 'user_auth']);

/* follows */
Route::get('/user/follow/{userId}', [UserController::class, 'follow']);
Route::get('/user/unfollow/{userId}', [UserController::class, 'unfollow']);
Route::get('/user/is_following/{followerId}', [UserController::class, 'isFollowing']);

Route::resource('/post', PostController::class);
