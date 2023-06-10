import "./Styles/app.scss";
import "./Styles/category.scss";
import { useState, useEffect } from "react";
import List from "./CommonComponents/List";
import CategoryForPc from "./CommonComponents/CategoryForPc";
import CateogryForPhone from "./CommonComponents/CateogryForPhone";

const categoryArr = [
  "General",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

function App() {
  const [news, setNews] = useState(null);
  const [category, setCategory] = useState("general");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 800);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(
        //これは普通のURLと一緒/news-feedsの部分はserverで設定したもの
        //envの中の↓これはserverのポート番号と一緒じゃないと動かない
        `${process.env.REACT_APP_NODEJS_SERVER}/news-feeds?category=${category}`
        // fetchをする時は≒GETなのでmethodを省ける
        //その他の場合は、URLの後の第二引数にこんな感じでmethodを記載 {method: "POST"}
      )
        .then((res) => res.json())
        .catch((_) => {
          throw new Error("Error with news feed fetching");
        });
      if (res.status !== "ok") {
        throw new Error("Error with news feed fetching");
      }
      setNews(res);
    };
    fetchNews();
  }, [category]);

  const toggleCategory = (isOpen) => {
    setIsCategoryOpen(isOpen);
  };

  const handleListClick = (category) => {
    if (typeof category === "undefined") return;
    setCategory(category.toLowerCase());
    setIsCategoryOpen(false);
  };

  const hasNewsList =
    typeof news?.articles !== "undefined" && news.articles !== null;

  return (
    <div>
      <div className="headerwithCategory">
        {isSmallScreen ? (
          <CateogryForPhone
            category={category}
            isCategoryOpen={isCategoryOpen}
            toggleCategory={toggleCategory}
            categoryArr={categoryArr}
            handleListClick={handleListClick}
          />
        ) : (
          <CategoryForPc
            category={category}
            isCategoryOpen={isCategoryOpen}
            toggleCategory={toggleCategory}
            categoryArr={categoryArr}
            handleListClick={handleListClick}
          />
        )}
        <h1 className="newsTitle">
          HokoHoko News&nbsp;<i className="fa-solid fa-dog"></i>
        </h1>
      </div>
      {hasNewsList ? <List news={news} /> : <p>Loading...</p>}
      <footer>© 2023 Michiru.I</footer>
    </div>
  );
}

export default App;
