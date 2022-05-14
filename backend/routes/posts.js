const express = require('express');

const authCheck = require('../middleware/auth-check');


const postController = require("../controllers/post");
const extractfile = require("../controllers/file")

const router = express.Router();



router.post("", authCheck, extractfile, postController.creatPost );

router.get("", postController.getAllPosts );

router.get("/:id", postController.getSinglePost )

router.put("/:id", authCheck, extractfile, postController.updatePost );

router.delete("/:id", authCheck, postController.deletePost);

module.exports = router;
