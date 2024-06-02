import React from "react";
import { IArticle } from "../../../../types/articles";
import { Link } from "react-router-dom";
import Button from "../../../common/Button";
import "./styles.scss";

interface Props {
  article: IArticle;
}

const ArticleItem: React.FC<Props> = ({ article: { id, title, summary } }) => {

  return (
    <div className="articleitem-wrap">
      <h3 className="article-title">{title}</h3>
      <p className="article-desc">{summary}</p>
      <Link className="readmore-button" to={`articles/${id}`}>
        <Button
          text={"Read more"}
          customClassname="more-btn"
        />
      </Link>
    </div>
  );
};

export default ArticleItem;
