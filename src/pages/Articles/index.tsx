import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../../services/articles";
import { IArticleData } from "../../types/articles";
import Button from "../../components/common/Button";
import "./styles.scss";
import Loader from "../../components/common/Loader";
import NotFound from "../../components/common/EmptyList";

const Articles: React.FC = () => {

  const { id } = useParams();
  const [article, setArticle] = useState<IArticleData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const response = await getArticleById(id);
        const articleData = response.data;
        if (articleData) {
          setArticle(articleData);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Function to fetch article by Id
    fetchData();
  },[id]);

  return (
    <>
      {isLoading && <Loader />}
      <Link className="back-link" to={"/"}>
        <Button text={`\u2190 Go Back`} customClassname="back-btn" />
      </Link>
      {!article ? (
        <NotFound />
      ) : (
        <div className="article-wrap">
          <h1 className="article-title">{article?.title}</h1>
          <p className="article-desc">{article?.fullText}</p>
        </div>
      )}
    </>
  );
};

export default Articles;
