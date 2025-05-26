const express = require("express");
const { createNewBlog, getAlBlogs, getBlogById, deleteBlogByID } = require("../Controllers/BlogsController");
const router = express.Router();

//  "v1/activity/users/"

router.post("/createBlog", createNewBlog)
router.get("/getAllBlog", getAlBlogs)
router.get("/getByID/:blogID", getBlogById)
router.delete("/delete/:id", deleteBlogByID)


module.exports = router;