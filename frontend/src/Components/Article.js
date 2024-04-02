import React from "react";

// Functional component to display an individual article
function Article({ imageToUrl, title, author, description, publishedAt, link }) {
    return (
        <div className="article">
            {/* Displaying article image */}
            <img src={imageToUrl} alt=" Not Found" />
            <div className="title">
                {/* Displaying article title */}
                <h3>{title}</h3>
            </div>
            {/* Displaying article author */}
            <p><i>Author</i>: {author}</p>
            {/* Displaying article description */}
            <p className="description"><i>Description</i>: {description}</p>
            {/* Displaying article published date */}
            <p><i>Published Date</i>: {publishedAt}</p>
            {/* Link to view more details about the article */}
            <a href={link} target="_blank">More Info</a>
        </div>
    );
}

export default Article;
