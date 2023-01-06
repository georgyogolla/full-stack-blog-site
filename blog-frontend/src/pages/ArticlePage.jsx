import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //useParams is a hook that allows us to access the parameters of the current route
import axios from "axios";
import CommentsList from "../components/CommentsLits";
import AddCommentForm from "../components/AddCommentForm";
import NotFoundPage from "./NotFoundPage";
import articles from "./articles-content";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    loadArticle();
  }, []);

  // const {articleId} = params; //destructruing object parameters
  // const {aticleId} = params.articleId;//using full object notation to acces the id of parameters
  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  const addUpvote = async () => {
    const esponse = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticleInfo = response.data;
    setArticleInfo(updatedArticleInfo);
  };
  return (
    <>
      <h1>{article.title}</h1>

      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <AddCommentForm
        articleName={articleId}
        onArticleUpdate={(updatedArticle) => setArticleInfo(updatedArticle)}
      />
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};
export default ArticlePage;
