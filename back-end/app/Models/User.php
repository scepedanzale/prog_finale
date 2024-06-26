<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use App\Models\Follower;
use App\Models\Post;
use App\Models\SavedPost;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'birth_day',
        'biography',
        'profile_img'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function followers(){
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id')->with('posts.likes');
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id')->with('posts.likes');
    }

    public function posts(){
        return $this->hasMany(Post::class);
    }
    
    public function isFollowing($userId)
    {
        return $this->followings()->where('user_id', $userId)->exists();
    }

    public function likesUser(){
        return $this->belongsToMany(Post::class, 'likes', 'user_id', 'post_id');
    }

    public function savedPosts(){
        return $this->belongsToMany(Post::class, 'saved_posts', 'user_id', 'post_id')->with('user');
    }
}
