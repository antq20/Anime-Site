import React, { useState, useEffect } from 'react';
import { Card, Button, CardFooter } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdventureList = () => {
    const [adventure, setAdventure] = useState({});
    const [adventurePage, setAdventurePage] = useState(5);

    const fetchAdventureAnime = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/adventure/${adventurePage}/`);
            setAdventure(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching adventure anime:", error);
        }
    };

    useEffect(() => {
        fetchAdventureAnime();

        return () => {
        };
    }, [adventurePage]);

    const handleRightButton = () => {
        setAdventurePage((prevAdventurePage) => {
            const newAdventurePage = prevAdventurePage + 7;
            return newAdventurePage;
        });
    };
    
    const handleLeftButton = () => {
        if (adventurePage >= 5) {
            setAdventurePage((prevAdventurePage) => {
                const newAdventurePage = prevAdventurePage - 7;
                return newAdventurePage;
            });
        }
    };

    const renderAnimeCards = () => {
        return (
            <div className="card-container">
                <Button className="paginationButton" onClick={handleLeftButton}>
                    {'<'}
                </Button>
                {adventure.data?.map((anime) => (
                    <Link id='cardLink' to={`/anime/${anime.attributes.canonicalTitle}`} key={anime.id}>
                        <Card key={anime.id} name={anime.attributes.canonicalTitle} style={{ width: "15rem", height: "25rem" }}>
                            <Card.Img variant="top" src={anime.attributes.posterImage.original} style={{ height: "300px" }} />
                            <Card.Body>
                                <Card.Title id='myAnimeTitle'>{anime.attributes.canonicalTitle}</Card.Title>
                                <Card.Text>{anime.attributes.averageRating} / 100</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                ))}
                <Button className="paginationButton" onClick={handleRightButton}>
                    {'>'}
                </Button>
            </div>
        );
    };

    return renderAnimeCards();
};

export default AdventureList;
