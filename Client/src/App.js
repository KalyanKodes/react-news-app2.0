import React from "react";
import {BrowserRouter , Link} from 'react-router-dom';


function Article({imageToUrl , title , author , description , publishedAt , link}){

    // console.log(imageToUrl ,"\n", title , "\n" , author , "\n" , description , "\n", publishedAt)

    return (
        <div className="article">
            <img src={imageToUrl} alt="Image Not Found" />
            <div className="title">
                <h3>{title}</h3>
            </div>
            <p><i>Author</i>: {author}</p>
            <p className="description"><i>Description</i>: {description}</p>
            <p><i>Published Date</i>: {publishedAt}</p>
            <a href={link}>More Info</a>
        </div>
    )
}

function App(){


    const [articlesData , setArticleData] = React.useState({status: false , data: false});
    const [query , setQuery] = React.useState("cybersecurity");
    const [loginStatus , setLoginStatus] = React.useState(false);


    function LoginForm(){
        const [userName, setuserName] = React.useState('');
        const [password, setPassword] = React.useState('');
    
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log('userName:', userName);
            console.log('Password:', password);
            setuserName('');
            setPassword('');
            if (userName === "Admin" && password === "Root") {
                setLoginStatus(true); 
            }
            else{
                alert("Invalid Details")
            }
        };
        
    
        return (
            <div className="login-container">
                <h1 className="login-title">Login to access the new app</h1>
                <small>This is a sample login form Enter=&gt; <b>Admin</b>: <b>Root</b></small>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userName" className="form-label">UserName:</label>
                        <input
                            type="userName"
                            id="userName"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>
                    <BrowserRouter>
                        <Link to="/login"><button className="submit-button" onClick={handleSubmit}>Login</button></Link>
                        
                    </BrowserRouter>
                </form>
    
            </div>
        );
    };

    React.useEffect(()=>{
        setArticleData({status: false , data: false})
            async function getData(){
                try{
                    let response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=${new Date().getFullYear}-${new Date().getMonth()}-${new Date().getDate()}&sortBy=publishedAt&apiKey=47b293b38f9d48f0949912210da79925`);
                    let data = await response.json();
                    // console.log(data.articles)
                    if(data.status === 'error' || data.totalResults === 0){
                        throw new Error("Unable to Fetch Data");
                    }
                    setArticleData({status: true , data:data})                    
                }catch(error){
                    setArticleData({status: true , data: false})
                    console.log("Error Generated: "+error);
                }
            }
            getData();
        } , [query]);

        function handleSubmit(event){
            event.preventDefault();
            // console.log(event)
            let value = document.getElementById('inputBox').value;
            // console.log(value)
            setQuery(value)
        }



    return (
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


            {!loginStatus ? <LoginForm setLoginStatus={setLoginStatus} />: <section>
            {articlesData.status ? articlesData.data ? 
                articlesData.data.articles.map((article , i)=> {
                    if(article.urlToImage !== null )
                    return (
                        <Article imageToUrl = {article.urlToImage} title = {article.title} key={i} author = {article.author} description= {article.description} publishedAt = {article.publishedAt} link={article.url}/>
                    )
                    
                }
                )
                : "Unabel To Fetch Data" : <div className="loader"></div>}
        </section>}

             
        </>
    )
}








export default App;