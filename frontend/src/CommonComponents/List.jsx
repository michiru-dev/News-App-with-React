import React from "react";
import DetailButton from "./DetailButton";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

function List({ news }) {
  const article = news.articles;

  const list = article.map((article) => {
    const url = article.url;
    return (
      <li className="newsContent" key={uuidv4()}>
        <Link
          to={url}
          target="_blank" //新しいタブ
          href="noopener noreferrer" //セキュリティ
          className="link"
        >
          <h1 className="title">
            {article.title}&emsp;
            <DetailButton />
          </h1>
          <div className="imgBox">
            <img src={article.urlToImage} alt="" />
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div className="listDiv">
      <ul className="newsContentUl">{list}</ul>
    </div>
  );
}

export default List;
