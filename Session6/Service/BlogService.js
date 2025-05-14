const BlogsModel = require("../Models/BlogsModel")

class BlogService {
    static async createBlogDTO(data) {
        const content = data.content;
        const title = data.title;
        const email = data.email;
        const phone = data.phone;

        console.log(data, 'createBlogDTO')

        const blogObj = BlogsModel({
            content,
            title,
            email,
            phone
        });


        try {
            // this line will put things in the DB (TALK TO DB)
            console.log(blogObj, 'bofire')

            const response = await blogObj.save();
            console.log(response, 'after')

            return response;
        } catch (error) {
            return error;
        }
    }


}


module.exports = BlogService