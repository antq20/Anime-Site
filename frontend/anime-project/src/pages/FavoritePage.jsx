import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import FavoriteCards from "../components/FavoriteCards";
const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  const fetchFavorites = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/v1/favorites/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      console.log("added to favorites")
      setFavorites(response.data);
    } catch (error) {
      console.error('Already in Favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  console.log(favorites)

  return (
    <>
    <FavoriteCards favorites={favorites}/>
    </>
  );
};

export default FavoritePage;
