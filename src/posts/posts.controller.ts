import { Router, Request, Response } from "express";
import Post from "./post.interface";
import postModel from "./posts.model";
class PostsController {
  public path = "/posts";
  public router = Router();

  private posts: Post[] = [
    {
      author: "Joe",
      content: "Test content",
      title: "Test title",
    },
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
    // this.router.put(`${this.path}/:id`, this.replacePost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  getAllPosts = (request: Request, response: Response) => {
    postModel.find().then((posts) => {
      response.send(posts);
    });
  };

  createAPost = (request: Request, response: Response) => {
    const postData: Post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  getPostById = (request: Request, response: Response) => {
    const id = request.params.id;
    postModel.findById(id).then((post) => {
      response.send(post);
    });
  };

  modifyPost = (request: Request, response: Response) => {
    const id = request.params.id;
    const postData: Post = request.body;
    postModel.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      response.send(post);
    });
  };

  deletePost = (request: Request, response: Response) => {
    const id = request.params.id;
    postModel.findByIdAndDelete(id).then((success) => {
      response.send(success ? 200 : 404);
    });
  };
}

export default PostsController;
