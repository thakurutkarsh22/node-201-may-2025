const BlogService = require("../Service/BlogService");
const {validateUserInput} = require("../JoiSchema/BlogInputSchema");


async function createNewBlog(req, res) {
    const body = req.body;

    if(validateUserInput(body)) {
        try {
            console.log("before createNewBlog")
            const response = await BlogService.createBlogDTO(body);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({message: error})
        }
    } else {
        res.status(400).json({message: "please give the valid input"})
    }


    
}

function getAlBlogs(req, res) {
    
}

function getBlogById(req, res) {
    
}

function deleteBlogByID(req, res) {
    
}


module.exports = {
    createNewBlog,
    getAlBlogs,
    getBlogById,
    deleteBlogByID
}