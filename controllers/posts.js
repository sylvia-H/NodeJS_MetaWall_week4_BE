const successHandler = require('../helper/successHandlers');
const errorHandler = require('../helper/errorHandlers');
const Post = require('../model/post');

const PostController = {
  async getPosts(req, res) {
    // 貼文時間序列
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    // 搜尋貼文內容
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const posts = await Post.find(q)
      .populate({
        path: 'author',
        select: 'name avatar',
      })
      .populate({
        path: 'comments',
      })
      .sort(timeSort);
    successHandler(res, posts);
  },
  async createPosts(req, res) {
    try {
      const { author, content } = req.body;
      if (author && content) {
        await Post.create({
          author,
          content,
          tags: [req.body.tags || 'general'],
          image: [req.body.image || ''],
          likes: [req.body.likes || 0],
          comments: [req.body.comment || ''],
          privacy: [req.body.privacy || 'private'],
        });
        PostController.getPosts(req, res);
      } else {
        errorHandler(res, 400, 4001);
      }
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async deleteAllPosts(req, res) {
    const posts = await Post.deleteMany({});
    successHandler(res, posts);
  },
  async deletePosts(req, res) {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id)
        .then((result) => {
          if (result) {
            PostController.getPosts(req, res);
          } else {
            errorHandler(res, 400, 4003);
          }
        })
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
  async editPosts(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      await Post.findByIdAndUpdate(id, body)
        .then((result) => {
          if (result) {
            PostController.getPosts(req, res);
          } else {
            errorHandler(res, 400, 4003);
          }
        })
        .catch(() => errorHandler(res, 400, 4003));
    } catch {
      errorHandler(res, 400, 4002);
    }
  },
};

module.exports = PostController;
