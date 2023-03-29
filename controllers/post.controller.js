const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = async (req, res) => {
  try {
    const readPost = await PostModel.find({});
    res.send(readPost);
  } catch (err) {
    console.log("Error to get data : " + err);
  }
};

module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, { $set: updatedRecord }, { new: true, upsert: true, setDefaultsOnInsert: true });
    res.send(updatedPost);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndRemove(req.params.id).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    console.log("Delete Error : " + err);
    return res.status(500).json({ message: err });
  }
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) return res.status(404).send("Post not found");

    // if (post.likers.includes(req.body.id))
    // return res.status(400).send("You already liked this post");

    await post.updateOne({ $push: { likers: req.body.id } });
    res.status(200).json({ message: "The post has been liked" });

    await UserModel.findByIdAndUpdate(req.body.id, { $push: { likes: req.params.id } });
  } catch (err) {
    console.log("Like Error : " + err);
    return res.status(500).json({ message: err });
  }
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const post = await PostModel.findById(req.params.id);

    if (!post) return res.status(404).send("Post not found");

    await post.updateOne({ $pull: { likers: req.body.id } });
    res.status(200).json({ message: "The post has been unliked" });

    await UserModel.findByIdAndUpdate(req.body.id, { $pull: { likes: req.params.id } });
  } catch (err) {
    console.log("Like Error : " + err);
    return res.status(500).json({ message: err });
  }
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send("ID unknown : " + req.params.id);

  try {
    const post = await PostModel.findById(req.params.id);

    await post.updateOne({
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          commenterPseudo: req.body.commenterPseudo,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    });
    res.status(200).json({ message: "You have commented the post" });
    (err, docs) => {
      if (!err) res.send(docs);
      else return res.status(400).send(err);
    }
    
  } catch (err) {
    console.log("Comment Error : " + err);
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = async (req, res) => {};
module.exports.deleteCommentPost = async (req, res) => {};
