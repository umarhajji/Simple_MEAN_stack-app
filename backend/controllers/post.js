const Post = require('../models/post');

exports.creatPost =  (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      post: {
         ...createdPost,
        id: createdPost._id,
        // title: createdPost.title,
        // content: createdPost.content,
        // imagePath: createdPost.imagePath
      }
    });
  }).catch(error =>{
    res.status(500).json({
      message: "Creating a post Failed!"
    })
  })
}

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
     return Post.count();
    }).then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
    })
  })
  .catch(error =>{
    res.status(500).json({
      message: "Fetching Post Failed!"
    })
  })
}

exports.getSinglePost = (req, res, next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post)
    }else{
      res.status(400).json({message: "Post not found"})
    }
  }).catch(error =>{
    res.status(500).json({
      message: "Fetching Post Failed"
    })
  })
}

exports.updatePost = (req, res, next) =>{
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename

  }
 const post = new Post({
   _id: req.body.id,
   title: req.body.title,
   content: req.body.content,
   imagePath: imagePath,
   creator: req.userData.userId
 });

  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
  .then((result)=>{

    if(result.matchedCount > 0){
      res.status(200).json({message: "Update Successfully!"})
    }else{
      res.status(401).json({message: "Cant Update"})
    }

  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't update post!"
    });
  });
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    console.log(result)
    if(result.deletedCount > 0){
      res.status(200).json({message: "Deleted Successfully!"})
    }else{
      res.status(401).json({message: "Cant Delete"})
    }
  })
  .catch(error =>{
    res.status(500).json({
      message: "Fetching Posts Failed!"
    })
    });

}
