import React from 'react'
import DropdownContent from './DropdownContent'

function CategoryForPc({ category, isCategoryOpen, toggleCategory, categoryArr, handleListClick }) {
    return (
        <div
            className={`topMenu ${isCategoryOpen && 'parent-dropdown-content'}`}
            onMouseLeave={() => toggleCategory(false)}
        >
            <label
                className="categoryLabel"
                htmlFor="category"
                onMouseEnter={() => toggleCategory(true)}
            >
                Pick Cateogry
            </label>

            <div className="dropdown">
                <button
                    className="dropbtn"
                    onMouseEnter={() => toggleCategory(true)}
                >
                    {category.toUpperCase()}
                </button>

                <DropdownContent categoryArr={categoryArr} handleListClick={handleListClick} />
            </div>
        </div>
    )
}

export default CategoryForPc