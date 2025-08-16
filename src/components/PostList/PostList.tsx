import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps{
  posts: Post[];
  handleEdit: (post: Post) => void;
}

export default function PostList({ posts, handleEdit }: PostListProps) {
  const queryClient = useQueryClient();
  const {mutate:deletePostMutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  })
  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
        <div className={css.footer}>
          <button className={css.edit} onClick={()=> handleEdit(post)} >Edit</button>
             <button
              className={css.delete}
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this post?")) {
                  deletePostMutate(post.id);
                }
              }}
            >
             Delete
            </button>
        </div>
      </li>))}
      
    </ul>
  );
}
