{
    console.log('Hello');
    //method to submit the form data for new post using AJAX
    //sending data function
    let createPost = function(){
        let newPostForm = $('#new-post-form');


        newPostForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    console.log("hello home_posts.ejs"+data.data.post);
                    $('#post-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    console.log(newPost)
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    } 

    //method to delete a post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            console.log('Hello I have stopped the delete action');


            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    
                    $(`#post-${data.data.post_id}`).remove();
                    
                },error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    //method to create a post in Dom
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small> 
            ${post.content}
        <div id="user">
            <small>
                ${post.user.name}
            </small>
        </div>
        <div class="comments-container">
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Add comment..." required>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="Add comment">
            </form>
        </div>
        <div class="post-comments-list-container">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
        
        </li>`);
    }

    let convertPostToAjax = function () {
        let deleteLinks = $('.delete-post-btn');
        for (deleteLink of deleteLinks) {
          deletePost(deleteLink);
        }
      };
      convertPostToAjax();


    createPost();

}