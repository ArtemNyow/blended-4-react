import axios from "axios";
import { Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsResponse{
    posts: Post[],
    totalCount:number
}

export const fetchPosts = async (searchText:string, page:number, limit:number):Promise<FetchPostsResponse> => {
    const response = await axios.get<Post[]>('/posts',{
        params: {
            ...(searchText !== '' && {q:searchText}),
            _limit: limit,
            _page:page,
        }
    })
    return {
        posts: response.data,
        totalCount: Number(response.headers["x-total-count"]),
   }
    
    
    
};


export const createPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
    const { data } = await axios.post<Post>("/posts", newPost);
    return data;
}
export const editPost = async (newDataPost:Post) => {
    const { data } = await axios.patch<Post[]>(`/posts/${newDataPost.id}`, newDataPost)
    return data
};

export const deletePost = async (postId:number) => {
    const { data } = await axios.delete<Post>(`/posts/${postId}`)
    return data
};
