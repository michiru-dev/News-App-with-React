import './Styles/app.scss'
import "./Styles/category.scss"
import { useState, useEffect } from 'react'
import List from './CommonComponents/List'
import CategoryForPc from './CommonComponents/CategoryForPc'
import CateogryForPhone from './CommonComponents/CateogryForPhone'


const categoryArr = [
  "General",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology"
]

const getNews = async (url) => {
  const response = await fetch(url)
  const jsonData = await response.json()
  return jsonData;
}


function App() {
  const [news, setNews] = useState(null)
  const [category, setCategory] = useState("general")
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800)

  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 800)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const fetchData = async () => {
    const fetchedData = await getNews("https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=e2a0a6a03074462db182819abba58907")
    setNews(fetchedData)
  }

  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    const fetchData2 = async () => {
      const fetchCategoryData = await getNews(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=e2a0a6a03074462db182819abba58907`)
      setNews(fetchCategoryData)
    }
    fetchData2()
  }, [category])

  const toggleCategory = (isOpen) => {
    setIsCategoryOpen(isOpen)
  }

  const handleListClick = (category) => {
    if (typeof category === 'undefined') return;
    setCategory(category.toLowerCase())
    setIsCategoryOpen(false)
  }

  const hasNewsList = typeof news?.articles !== 'undefined' && news.articles !== null

  return (
    <div>
      <div className='headerwithCategory'>
        {isSmallScreen ?
          <CateogryForPhone category={category} isCategoryOpen={isCategoryOpen} toggleCategory={toggleCategory} categoryArr={categoryArr} handleListClick={handleListClick} />
          : <CategoryForPc category={category} isCategoryOpen={isCategoryOpen} toggleCategory={toggleCategory} categoryArr={categoryArr} handleListClick={handleListClick} />}
        <h1 className='newsTitle'>HokoHoko News&nbsp;<i className="fa-solid fa-dog"></i></h1>
      </div>
      {hasNewsList ? (<List news={news} />) : (<p>Loading...</p>)}
      <footer>© 2023 Michiru.I</footer>
    </div >
  )

}


export default App;

