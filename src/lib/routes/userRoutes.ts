import { BlogData, LoginUser, SignupUser } from "@/types/type"
import axiosInstance from "./axiosInterceptor";
// import axiosInstance from "./axiosInterceptor"


export const UserLogin = async (userDetails:LoginUser) => {
    try {
        const response = await axiosInstance.post('/login', userDetails);
        if(response){
            return response.data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const UserChecking = async (token:string) => {
    try {
        const Userresponse = await axiosInstance.get('/user?token='+token);
        console.log(Userresponse,"iiiiiiiiii")
        if(Userresponse){
            return Userresponse.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const  UserSignUp = async (userData:SignupUser) => {
    try {
        const UserResponse = await axiosInstance.post('/signup',userData);
        if(UserResponse){
            return UserResponse.data
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const UploadUserBlog = async (BlogData:BlogData,userId:string) => {
    try {
        const userBlog = await axiosInstance.post('/upload-blog',{BlogData,userId});
        if(userBlog){
            return userBlog.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const FindAllBlogs = async () =>{
    try {
        const allBlogs = await axiosInstance.get('/allBlogs');
        if(allBlogs){
            return allBlogs.data ;
        }
    } catch (error) {
        console.log(error);
    }
}

export const EditBlogs = async (BlogData:any,changed:any) => {
    try {
        const editedBlogs = await axiosInstance.put('/editBlog',{BlogData,changed});
        if(editedBlogs){
            return editedBlogs.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const DeleteBlogs = async (BlogData:any) => {
    try {
        const deletedBlog = await axiosInstance.put('/deleteBlog',BlogData);
        if(deletedBlog){
            return deletedBlog.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export const userDetailsFind = async () => {
    try {
        const userDetails = await axiosInstance.get('/user-details');
        if(userDetails){
            console.log(userDetails);
        }
    } catch (error) {
        console.log(error)
    }
}

export const AllUserBlogs = async (userId:string) => {
    try {
        const blogs = await axiosInstance.get('/allUserBlog?userId='+userId);
        if(blogs){
            return blogs.data
        }
    } catch (error) {
        console.log(error);
    }
}