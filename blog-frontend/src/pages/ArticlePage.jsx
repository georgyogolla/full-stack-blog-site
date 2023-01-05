import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //useParams is a hook that allows us to access the parameters of the current route
import axios from "axios";
import articles from "./articles-content";
import NotFoundPage from "./NotFoundPage";

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
  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
};
export default ArticlePage;
