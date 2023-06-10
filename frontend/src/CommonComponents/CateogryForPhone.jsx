import React from 'react'
import DropdownContent from './DropdownContent'

function CateogryForPhone({ category, isCategoryOpen, toggleCategory, categoryArr, handleListClick }) {
    return (
        <div
            className={`topMenu ${isCategoryOpen && 'parent-dropdown-content'}`}
            onClick={() => toggleCategory(!isCategoryOpen)}
        >
            <label
                className="categoryLabel"
                htmlFor="category"
            >
                Pick Cateogry
            </label>

            <div className="dropdown">
                <button
                    className="dropbtn"
                >
                    {category.toUpperCase()}
                </button>

                <DropdownContent categoryArr={categoryArr} handleListClick={handleListClick} />
            </div>
        </div>
    )
}

export default CateogryForPhone