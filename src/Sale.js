import React, { useState, useEffect } from 'react';

function Blog() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [priceFilter, setPriceFilter] = useState(0);
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/Sale')
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setFilteredItems(data);
                const maxPrice = Math.max(...data.map(item => item.price));
                setMaxPrice(maxPrice);
                setPriceFilter(maxPrice);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handlePriceFilterChange = (e) => {
        const newPriceFilter = parseInt(e.target.value);
        setPriceFilter(newPriceFilter);
        filterItems(categoryFilters, searchQuery, newPriceFilter);
    };

    const handleCategoryFilterChange = (e) => {
        const category = e.target.value;
        let updatedCategoryFilters = [...categoryFilters];
        if (updatedCategoryFilters.includes(category)) {
            updatedCategoryFilters = updatedCategoryFilters.filter(item => item !== category);
        } else {
            updatedCategoryFilters.push(category);
        }
        setCategoryFilters(updatedCategoryFilters);
        filterItems(updatedCategoryFilters, searchQuery, priceFilter);
    };

    const handleSearchInputChange = (e) => {
        const newSearchQuery = e.target.value;
        setSearchQuery(newSearchQuery);
        filterItems(categoryFilters, newSearchQuery, priceFilter);
    };

    const filterItems = (categories, search, price) => {
        let filtered = items.filter(item => item.price <= price);
        if (categories.length > 0) {
            filtered = filtered.filter(item => categories.includes(item.category));
        }
        if (search) {
            filtered = filtered.filter(item => item.city && item.city.toLowerCase().includes(search.toLowerCase()));
        }
        setFilteredItems(filtered);
    };
    

    return (
        <div>
            <h2>Items for sale:</h2>
            <div>
                <label htmlFor="priceFilter">Price Filter:</label>
                <input
                    type="range"
                    id="priceFilter"
                    name="priceFilter"
                    min="0"
                    max={maxPrice}
                    value={priceFilter}
                    onChange={handlePriceFilterChange}
                />
                <span>${priceFilter}</span>
            </div>
            <div>
                <label>Category Filter:</label><br />
                <input type="checkbox" id="wanted" name="category" value="Wanted" checked={categoryFilters.includes('Wanted')} onChange={handleCategoryFilterChange} />
                <label htmlFor="wanted">Wanted</label><br />
                <input type="checkbox" id="sale" name="category" value="Sale" checked={categoryFilters.includes('Sale')} onChange={handleCategoryFilterChange} />
                <label htmlFor="sale">Sale</label><br />
                <input type="checkbox" id="academicService" name="category" value="AcademicService" checked={categoryFilters.includes('AcademicService')} onChange={handleCategoryFilterChange} />
                <label htmlFor="academicService">Academic Service</label><br />
            </div>
            <div>
                <label htmlFor="locationSearch">Search by Location:</label>
                <input
                    type="text"
                    id="locationSearch"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            {filteredItems.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>Content: {post.content}</p>
                    <p>City: {post.city}</p>
                    <p>Price: ${post.price}</p>
                    <p>Category: {post.category}</p>
                    <img src={post.pictureURL} alt={post.title} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '5px' }} />
                </div>
            ))}
        </div>
    );
}

export default Blog;
