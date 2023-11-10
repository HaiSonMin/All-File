import { faker } from "@faker-js/faker";
import React, { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}
const PostContext = createContext();

const PostProvider = ({ children }) => {
  console.log("Re-Render PostProvider");
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  const valueProvider = useMemo(() => {
    return {
      searchQuery,
      setSearchQuery,
      posts: searchedPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
    };
  }, [searchQuery, searchedPosts]);

  return (
    <PostContext.Provider value={valueProvider}>
      {children}
    </PostContext.Provider>
  );
};

const useContextPosts = function () {
  const context = useContext(PostContext);
  if (!context)
    throw new Error("You use context out side provider, please try again");
  return context;
};

export { PostProvider, PostContext, useContextPosts };
