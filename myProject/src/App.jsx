import { useEffect,useState } from "react";
import axios from 'axios';
import "./App.css";

function BookCollection(){
  const [books, setBooks] = useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const result=await axios.get('https://reactnd-books-api.udacity.com/books',{headers:{'Authorization':'whatever-you-want'}
      });

      setBooks(result.data.books);
      }
      catch(error){
        console.log("Status Code: ",error.response.status);
        console.log("Website not found");
      }
    };
    fetchData();
  },[]);
  return(
    <>
    {books.map((book,index)=>(
      <div key={index} className="books-item">
        <h2 className="books-title">{book.title}</h2>
        <div className="books-section">
          <img src={book.imageLinks.smallThumbnail} alt={book.title} className="books-image"/>
          <p className="books-description">{book.description}</p>
        </div>
        <p className="author">{book.authors[0]}</p>
      </div>
    ))}
    </>
  );
}
export default BookCollection;