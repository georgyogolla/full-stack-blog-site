import { useParams } from "react-router-dom"; //
import articles from "./articles-content"; //importing the articles from the article-content.js file
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();
  // const {articleId} = params; //destructruing object parameters
  // const {aticleId} = params.articleId;//using full object notation to acces the id of parameters
  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
};
export default ArticlePage;
