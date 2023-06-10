import React from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function DropdownContent({ categoryArr, handleListClick }) {
    return (
        <div className="dropdown-content">
            <ul id="category">
                {
                    categoryArr.map((category) => (
                        <li key={uuidv4()} onClick={() => handleListClick(category)}>{category}</li>
                    ))
                }
            </ul>
        </div>
    )
}
