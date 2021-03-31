@extends('master')

@section('content')
<h1 class="text-primary">THREAD : {{$topic->id}} || TOPIC : {{ucwords($topic->first_name)}} {{ucwords($topic->last_name)}}</h1>
<h5>ENTER YOUR COMMENT</h5>
<form action="javascript:;" id="commenting">
    @csrf
    <div class="form-group">
        <textarea class="form-control" name="body" placeholder="Add a public comment..."></textarea>
        <input type="hidden" name="topic_id" value="{{ $topic->id }}" />
    </div>
    <div class="form-group">
        <input type="submit"  class="btn-submit-prop btn btn-primary" value="Add Comment" />
    </div>
</form>
      
<hr />

<h5>COMMENTS</h5>

<hr />

@include('pages.commentRecurse', ['comments' => $comments, 'topic_id' => $topic->id])

{!! _attachScripts(isset($page_script) ? $page_script : null) !!}

@endsection
