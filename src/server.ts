import "dotenv/config";
import App from "./app";
import validateEnv from "./utils/validateEnv";
import PostsController from "./posts/posts.controller";

validateEnv();

const app = new App([new PostsController()], 5000);

// console.log(process.env);
app.listen();
