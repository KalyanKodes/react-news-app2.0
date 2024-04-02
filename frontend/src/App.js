import React from "react";
import Form from "./Components/Form";
import Article from "./Components/Article";

var API_1 = "85af9400c56446819326f5fdfc6afc0e";
var API_2 = "1fabb175ac6f4d81aec50289cd58e946";
var API_3 = "47b293b38f9d48f0949912210da79925";
var API_4 = "08fe3addd41641368dc353b02a66dbb4";

function App(){


    const [articlesData , setArticleData] = React.useState({status: false , data: false});
    const [query , setQuery] = React.useState("tesla");
    const [loginStatus , setLoginStatus] = React.useState(false);
    
    React.useEffect(() => {
        // Initializing articleData state with status false and data false
        setArticleData({ status: false, data: false });
    
        // Asynchronous function to fetch data from News API
        async function getData() {
            try {
                // Fetching data from News API with provided query and API key
                // let response = await fetch(
                //     `https://newsapi.org/v2/everything?
                //     q=${query}&from=
                //     ${new Date().getFullYear()}-
                //     ${new Date().getMonth() + 1}
                //    -${new Date().getDate()
                // }&sortBy=publishedAt&apiKey=${API_4}`);
                let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-03-02&sortBy=publishedAt&apiKey=47b293b38f9d48f0949912210da79925`)
                // Parsing response data to JSON format
                let data = await response.json();
    
                // Checking if response status is 'error' or totalResults is 0
                if (data.status === 'error' || data.totalResults === 0) {
                    throw new Error("Unable to Fetch Data");
                }
    
                // Updating articleData state with fetched data
                setArticleData({ status: true, data: data });
            } catch (error) {
                // Handling errors and updating articleData state accordingly
                setArticleData({ status: true, data: false });
                console.log("Error Generated: " + error);
            }
        }
    
        // Invoking getData function on component mount and when 'query' state changes
        getData();
    }, [query]);
    

        function handleSubmit(event){
            event.preventDefault();
            // console.log(event)
            let value = document.getElementById('inputBox').value;
            // console.log(value)
            setQuery(value)
        }



    return (
        
            
                loginStatus ?  <Form setLoginStatus={setLoginStatus} /> : 

                <>
                        <header>
                            <h2> News App Using React</h2>
                            <ul>
                                <li onClick={()=>setQuery("cricket")}>Cricket</li>
                                <li onClick={()=>setQuery('politics')}>Politics</li>
                                <li onClick={()=>setQuery('latest')}>Latest</li>
                            </ul>
                        </header>

                        <form action="#" onSubmit={handleSubmit} className="search-form">
                                <input type="text" placeholder={"Enter keyword eg.India"} id="inputBox"/>
                                <button onClick={handleSubmit} className="search-form-button">Search</button>
                        </form>

                        <section>
                            {/* Conditional rendering based on the status of the articlesData */}
                            {articlesData.status ? (
                                articlesData.data ? (
                                    // Mapping through the articles and rendering Article component for each article
                                    articlesData.data.articles.map((article , i)=> {
                                        // Checking if the article has an image URL
                                            // Rendering the Article component with relevant data
                                            return (
                                                <Article 
                                                    imageToUrl={article.urlToImage} 
                                                    title={article.title} 
                                                    key={i} 
                                                    author={article.author} 
                                                    description={article.description} 
                                                    publishedAt={article.publishedAt} 
                                                    link={article.url}
                                                />
                                            );
                                    })
                                ) : (
                                    // Rendering error message if data is unavailable
                                    "Unable To Fetch Data"
                                )
                            ) : (
                                // Rendering loader while data is being fetched
                                <div className="loader"></div>
                            )}
                        </section>

                </>
            
                  
        
    )
}








export default App;