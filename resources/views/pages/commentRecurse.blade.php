@foreach($comments as $comment)

    <div class="display-comment @if($comment->parent_id != null) ml-25 @endif" >
        <strong>{{ $comment->user->name }}</strong>
        <p>{{ $comment->body }}</p>
        <a href="" id="reply"></a>
        <form action="javascript:;" id="commenting2-{{$comment->id}}" >
            @csrf
            <div class="form-group">
                <textarea class="form-control" name="body" placeholder="Add a public sub comment..."></textarea>
                <input type="hidden" name="topic_id" value="{{ $topic_id }}" />
                <input type="hidden" name="parent_id" value="{{ $comment->id }}" />
            </div>
            <div class="form-group">
                <input type="button" data-form="commenting2-{{$comment->id}}" class="btn-submit-prop2 btn btn-primary btn-sm commenting2" value="Reply" />
            </div>
        </form>
        @include('pages.commentRecurse', ['comments' => $comment->replies])
    </div>
    
@endforeach
