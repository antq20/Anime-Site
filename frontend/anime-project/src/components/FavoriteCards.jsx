import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";


const FavoriteCards = ({ favorites }) => {
const token= localStorage.getItem("token")
const [animeID,setAnimeID]= useState("")
const handleDelete = async (animeID) => {
        try {
          let response = await axios.delete(`http://127.0.0.1:8000/api/v1/favorites/remove_from_favorites/${animeID}/`, {
            headers: {
              'Authorization': `Token ${token}`
            }
        
        });
        setAnimeID("")
        window.location.reload()
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };



  
const renderAnimeCards = () => {
    return (
      <div className="card-container">
        {favorites?.map((anime) => (
          <div key={anime.id} className="card-wrapper">
            <Link id="cardLink" to={`/anime/${anime.anime_information.name}`}>
              <Card style={{ width: "15rem", height: "25rem" }}>
                <Card.Img variant="top" src={anime.anime_information.img} style={{ height: "300px" }} />
                <Card.Body>
                  <Card.Title id='myAnimeTitle'>{anime.anime_information.name}</Card.Title>
                  <Card.Text>{anime.anime_information.rating}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
            <Button
              id="removeButton"
              onClick={() => {
                handleDelete(anime.anime);
                setAnimeID(anime.anime);
              }}
              variant="danger"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    );
  };
  console.log(favorites);
  

  return (
    <>
      {renderAnimeCards()}
    </>
  );
};

export default FavoriteCards;
