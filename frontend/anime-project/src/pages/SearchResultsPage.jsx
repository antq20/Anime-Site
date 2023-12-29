import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Card} from "react-bootstrap"

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/${searchQuery}/`);
        console.log(response.data)
        setSearchResults(response.data); 
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);


  const renderAnimeCards = () => {
    return (
        <div className="card-container">
            {/* <Button className="paginationButton" onClick={handleLeftButton}>
        {'<'}
        </Button> */}
            {searchResults.data?.map((anime) => (
                <Link to={`/anime/${anime.attributes.canonicalTitle}`} key={anime.id}>
                <Card key={anime.id}
                name={anime.attributes.canonicalTitle}
                style={{width:"15rem",height:"25rem"}}>
                    <Card.Img variant="top" src={anime.attributes.posterImage.original} style={{height:"300px"}} />
                    <Card.Body>
                        <Card.Title>{anime.attributes.canonicalTitle}</Card.Title>
                    </Card.Body>
                </Card>
                </Link>
            ))}
             {/* <Button className="paginationButton" onClick={handleRightButton}>
        {'>'}
        </Button> */}
        </div>
    );
};

  return (
    <div>
      <h1>Search Results for: {searchQuery}</h1>
      {renderAnimeCards()}
    
    </div>
  );
}

export default SearchResults;
