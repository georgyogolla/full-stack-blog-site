import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = () => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async ({ articleName, onArticleUpdate }) => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(
      `api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      {
        headers,
      }
    );
    const updatedArticle = response.data;
    onArticleUpdate(updatedArticle);
    setName("");
    setCommentText("");
  };
  return (
    <div id="add-comment-form">
      <h3>Add a comment</h3>
      {user && <p>You are posting as {user.email}</p>}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          cols="50"
          rows="5"
        ></textarea>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
