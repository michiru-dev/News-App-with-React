import React from 'react'
import DetailButton from './DetailButton'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'

function List({ news }) {

    const article = news.articles

    const list = article.map(article => {
        const url = article.url
        return (
            <Link to={url} target="_blank" href="noopener noreferrer" className='link' key={uuidv4()}>
                <li className="newsContent">
                    <h1 className='title'>{article.title}&emsp;<DetailButton /></h1>
                    <div className='imgBox'><img src={article.urlToImage} alt="" /></div>
                </li>
            </Link>
        )
    })


    return (
        <div className='listDiv'>
            <ul>{list}</ul>
        </div>
    )
}

export default List