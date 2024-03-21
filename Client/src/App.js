import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Article({ imageToUrl, title, author, description, publishedAt, link }) {
    return (
        <div className="article">
            <img src={imageToUrl} alt="Not Found" />
            <div className="title">
                <h3>{title}</h3>
            </div>
            <p><i>Author</i>: {author}</p>
            <p className="description"><i>Description</i>: {description}</p>
            <p><i>Published Date</i>: {publishedAt}</p>
            <a href={link}>More Info</a>
        </div>
    );
}

function NewsList({ articles }) {
    return (
        <section>
            {articles.map((article, i) => (
                <Article
                    key={i}
                    imageToUrl={article.urlToImage}
                    title={article.title}
                    author={article.author}
                    description={article.description}
                    publishedAt={article.publishedAt}
                    link={article.url}
                />
            ))}
        </section>
    );
}

function App() {
    const [articlesData, setArticlesData] = useState([]);
    const [query, setQuery] = useState("cybersecurity");
    const [hideSearch, setHideSearch] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const date = new Date();
                const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${date.getFullYear()}-${date.getMonth()}-${date.getDate()}&sortBy=publishedAt&apiKey=85af9400c56446819326f5fdfc6afc0e`);
                const data = await response.json();
                if (data.status === 'error' || data.totalResults === 0) {
                    throw new Error(data.message);
                }
                setArticlesData(data.articles);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [query]);

    function handleSubmit(event) {
        event.preventDefault();
        const value = document.getElementById('inputBox').value;
        setQuery(value);
    }

    return (
        <Router>
            <header>
                <h2>News App Using React</h2>
                <ul>
                    <li><Link to="/" onClick={() => { setQuery("cricket"); setHideSearch(true); }}>Cricket</Link></li>
                    <li><Link to="/" onClick={() => { setQuery("politics"); setHideSearch(true); }}>Politics</Link></li>
                    <li><Link to="/" onClick={() => { setQuery("latest"); setHideSearch(true); }}>Latest</Link></li>
                    <li><Link to="/postNews" onClick={() => setHideSearch(false)}>Post News</Link></li>
                </ul>
            </header>

            {hideSearch && (
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter keyword eg. India" id="inputBox" />
                    <button type="submit">Search</button>
                </form>
            )}

            <Routes>
                <Route path="/" element={<NewsList articles={articlesData} />} />
                <Route path="/postNews" element={<PostNews />} />
            </Routes>
        </Router>
    );
}

function PostNews() {
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3001/postNews");
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error("Error fetching post news data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <section>
            <h2>Post News</h2>
        </section>
    );
}

export default App;
