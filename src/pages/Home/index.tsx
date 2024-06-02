import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import { getAllArticles } from "../../services/articles";
import ArticleList from "../../components/Home/ArticleList";
import { IArticle } from "../../types/articles";
import NotFound from "../../components/common/EmptyList";
import Loader from "../../components/common/Loader";

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAllArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await getAllArticles();
      const data = articles.data;
      if (data) {
        setArticles(data);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
     // Function to fetch articles
    fetchAllArticles();
  }, []);

  return (
    <div>
      <Header />
      {/*loader */}
      {isLoading && <Loader />}
      {/* article list & empty list */}
      {!articles.length ? <NotFound /> : <ArticleList articles={articles} />}
    </div>
  );
};

export default Home;
