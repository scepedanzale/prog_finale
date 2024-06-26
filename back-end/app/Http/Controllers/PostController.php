<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $offset = $request->query('offset', 0); // Impostazione predefinita a 0 se non specificato
        $limit = $request->query('limit', 10); // Impostazione predefinita a 10 se non specificato

        // Esegui la query per ottenere i post con offset e limit
        $posts = Post::skip($offset)->take($limit)->get();
        
        return response()->json($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post= Post::create([
            'track_id' => $request->track_id,
            'user_id' => Auth::user()->id,
            'text' => $request->text,
            'created_at' => Carbon::now()
        ]);
        return $post;
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load('likes.user', 'comments.user', 'user');
        return $post;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post->text = $request->text;
        $post->update();
        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }
}
