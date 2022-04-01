import { useState } from "react";
import { IAuthor, IPost, IFile } from "../models/post.model";

type CRUDPost = {
  _id: string;
  title: string;
  description?: string;
  pdf: IFile;
  audio: IFile;
  workshop_id: string | number;
  article_id: string;
  author: IAuthor;
  discord_link: string;
};

const usePosts = (
  initialPosts: IPost[]
): {
  posts: IPost[];
  loading: boolean;
  createPost: (newPost: Omit<CRUDPost, "_id">) => void;
  updatePost: (cat: CRUDPost) => void;
  deletePost: (_id: string) => Promise<{ success: boolean }>;
} => {
  const [posts, setPosts] = useState<IPost[]>(initialPosts || []);
  const [loading, setLoading] = useState<boolean>(false);

  const createPost = async (postData: Omit<CRUDPost, "_id">) => {
    setLoading(true);
    const { newPost }: { newPost: IPost } = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(postData),
    }).then((res) => res.json());

    setPosts((values) => [...values, newPost]);
    setLoading(false);
  };

  const updatePost = async (postData: CRUDPost) => {
    setLoading(true);

    const { newPost }: { newPost: IPost } = await fetch(
      `/api/post/${postData._id}`,
      {
        method: "PUT",
        body: JSON.stringify(postData),
      }
    ).then((res) => res.json());
    const updatedPost = newPost;
    const updatedPostIndex = posts.findIndex(
      (post) => post._id === updatedPost._id
    );
    setPosts((values) => {
      values.splice(updatedPostIndex, 1, updatedPost);
      return [...values];
    });
    setLoading(false);
  };

  const deletePost = async (_id: string) => {
    setLoading(true);
    const success = await fetch(`/api/post/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    const deletedPostIndex = posts.findIndex((cat) => cat._id === _id);
    setPosts((values) => {
      values.splice(deletedPostIndex, 1);
      return [...values];
    });
    setLoading(false);
    return success as { success: boolean };
  };

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
