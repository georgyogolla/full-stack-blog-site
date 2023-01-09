import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //useParams is a hook that allows us to access the parameters of the current route
import axios from "axios";
import CommentsList from "../components/CommentsLits";
import AddCommentForm from "../components/AddCommentForm";
import NotFoundPage from "./NotFoundPage";
import articles from "./articles-content";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { canUpvote } = articleInfo;
  const { articleId } = useParams();

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticle = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      loadArticle();
    }
  }, [isLoading, user]);

  // const {articleId} = params; //destructruing object parameters
  // const {aticleId} = params.articleId;//using full object notation to acces the id of parameters
  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      {
        headers,
      }
    );
    const updatedArticleInfo = response.data;
    setArticleInfo(updatedArticleInfo);
  };

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>

      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "upvote" : "Already upvoted"}
          </button>
        ) : (
          <button>Log In to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdate={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log In to comment</button>
      )}
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};
export default ArticlePage;
