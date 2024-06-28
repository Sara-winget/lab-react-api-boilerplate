import { useEffect, useState } from "react";
import axios from 'axios';


function App(){
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const result=await axios.get('https://reactnd-books-api.udacity.com/books',{headers:{'Authorization':'whatever-you-want'}
      });

      setBooks(result.data.books);
      }
      catch(error){
        if (error.response) {
          
          console.log("Status Code: ", error.response.status);
          setError("Status code falls out of range of 200");
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received: ", error.request);
          setError("Error: No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error setting up request: ", error.message);
          setError("Error: ${error.message}");
        }
      }
    };
    fetchData();
  },[]);

  return(
    <>
      {error && <div className="error-message">{error}</div>}
      {books.map((book,index)=>(
        <div key={index} className="books-item">
          <h2>{book.title}</h2>
          <div>
            <img src={book.imageLinks.smallThumbnail} alt={book.title} className="books-image"/>
            <p>{book.description}</p>
          </div>
          <p>{book.authors[0]}</p>
        </div>
      ))}
    </>
  );
}
export default App;
