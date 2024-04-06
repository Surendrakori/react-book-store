import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import './App.css'
import { CgSearch } from "react-icons/cg";
import "./home.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./nav.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [bookData, setBookData] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const [search, setSearch] = useState("");

  // "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=harry+potter"
        );
        const response2 = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=Sherlock+Holmes"
        );
        const response = [...response1.data.items, ...response2.data.items];
        setData(response);
        // console.log(response[0].id);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleBookData = async (book) => {
    console.log(book);
    setShowAllBooks(!showAllBooks);
    setShowBook(!showBook);
    setBookData(book)
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${search}`
      );
      const searchData = await response.json();
      setData(searchData.items);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo-container">
            <h3>My Books</h3>
          </div>
          <div className="navbar-search-container">
            <input
              type="text"
              placeholder="search for books"
              className="navbar-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="navbar-search-icon" onClick={handleSearch}>
            <CgSearch />
            </div>
          </div>
          <div className="navbar-profile-container">
            <p>
              <IoMdNotificationsOutline />
            </p>
            <p>
              <CgProfile />
            </p>
          </div>
        </div>
      </div>
      <div className="home">
        <div className="home-container">
          <div className="home-container-heading">
            <h3>Books</h3>
          </div>
          {showAllBooks ? (
            <div className="home-container-data">
              {data &&
                data.map((item) => (
                  <div
                    key={item.id}
                    className="home-container-books"
                    onClick={() => handleBookData(item)}
                  >
                    <img
                      src={item.volumeInfo.imageLinks.thumbnail}
                      alt={item.volumeInfo.title}
                    />
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
        </div>
        {showBook ? (
          <div>
            {bookData ? (
              <div>
                {/* <h2>{bookData.volumeInfo.title}</h2> */}
                <p>Author: {bookData.volumeInfo.authors.join(", ")}</p>
                <p>Publisher: {bookData.volumeInfo.publisher}</p>
                <p>Published Date: {bookData.volumeInfo.publishedDate}</p>
                <p>Description: {bookData.volumeInfo.description}</p>
                <img
                  src={bookData.volumeInfo.imageLinks.thumbnail}
                  alt="Book Cover"
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;