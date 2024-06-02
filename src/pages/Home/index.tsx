import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Home/Header";
import { getAllArticles } from "../../services/articles";
import ArticleList from "../../components/Home/ArticleList";
import { IArticle } from "../../types/articles";
import NotFound from "../../components/common/EmptyList";
import Loader from "../../components/common/Loader";
import Search from "../../components/common/Search";
import { ERROR_MESSAGE, STATUS } from "../../utils/constants";
import Toast from "../../components/common/Toast";
import './styles.scss'

const Home: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const fetchAllArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await getAllArticles();
      const data = articles.data;
      if (data) {
        setArticles(data);
      }
    } catch (error) {
      Toast(STATUS.ERROR, ERROR_MESSAGE.FETCHING_ERROR)
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Function to fetch articles
    fetchAllArticles();
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  // Filtering articles based on search value
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      return article.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, articles]);

  return (
    <div className="home-container">
      <div className="header-wrap">
      <Header />
      <Search onSearch={handleSearch} />
      </div>
      {/*loader */}
      {isLoading && <Loader />}
      {/*check if the article list is not empty */}
      {!filteredArticles.length ? (
        <NotFound />
      ) : (
        <ArticleList articles={filteredArticles} />
      )}
    </div>
  );
};

export default Home;
