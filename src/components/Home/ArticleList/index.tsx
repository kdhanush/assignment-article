import React from "react";
import ArticleItem from "./ArticleItem";
import { IArticle } from "../../../types/articles";
import "./styles.scss";

interface Props {
  articles: IArticle[];
}

const ArticleList: React.FC<Props> = ({ articles }) => {
  return (
    <div className="articlelist-wrap">
      {articles &&
        articles?.map((article) => (
          <ArticleItem article={article} key={article?.id} />
        ))}
    </div>
  );
};

export default ArticleList;
