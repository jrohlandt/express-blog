import { Router, Request, Response, NextFunction } from "express";
import Post from "./post.interface";
import postModel from "./posts.model";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import validationMiddleware from "../middleware/validation.middleware";
import CreatePostDto from "./post.dto";
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
    this.router.post(
      this.path,
      validationMiddleware(CreatePostDto),
      this.createAPost
    );
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreatePostDto, true),
      this.modifyPost
    );
    // this.router.put(`${this.path}/:id`, this.replacePost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private getAllPosts = (request: Request, response: Response) => {
    postModel.find().then((posts) => {
      response.send(posts);
    });
  };

  private createAPost = (request: Request, response: Response) => {
    const postData: Post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  private getPostById = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    postModel.findById(id).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  private modifyPost = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    const postData: Post = request.body;
    postModel.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  private deletePost = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id;
    postModel.findByIdAndDelete(id).then((success) => {
      if (success) {
        response.send(200);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };
}

export default PostsController;
