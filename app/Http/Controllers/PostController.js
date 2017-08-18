'use strict'

const Validator = use('Validator');
const Post = use('App/Model/Post');
const Comment = use('App/Model/Comment');
class PostController {
  * index(request, response) {
    const posts = yield Post.all();
    yield response.sendView('home', {posts: posts.toJSON()});
  }

  * create(request, response) {
    yield  response.sendView('create-post');
  }

  * createComment(request, response) {
    const id = request.param('id');
    const commentData = request.only('username', 'comment');
    const rules = {
      username: 'required',
      comment: 'required',
    };
    const validation = yield Validator.validate(commentData, rules);
    if (validation.fails()) {
      yield request
        .withOnly('username', 'comment')
        .andWith({errors: validation.messages()})
        .flash();
      response.redirect('back');
      return
    }

    const comment = {username: commentData.username, comment: commentData.comment, post_id: id};
    console.log(comment);
    console.log(id);
    console.log(request);
    yield Comment.create(comment);
    response.redirect('/');
  }

  * show(request, response) {
    const id = request.param('id');
    const posts = yield Post.find(id);
    const comments = yield posts.comments().fetch();
    yield response.sendView('show-post', {post: posts.toJSON(), comments: comments.toJSON()});
  }

  * store(request, response) {
    const postData = request.only('title', 'content');
    const rules = {
      title: 'required',
      content: 'required'
    };
    const validation = yield Validator.validate(postData, rules);

    if (validation.fails()) {
      yield request
        .withOnly('title', 'content')
        .andWith({errors: validation.messages()})
        .flash();
      response.redirect('back');
      return
    }

    yield Post.create(postData);
    response.redirect('/');
  }
}

module.exports = PostController;
