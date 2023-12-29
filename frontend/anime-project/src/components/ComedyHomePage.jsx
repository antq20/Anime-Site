import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ComedyList = () => {
    const [comedy, setComedy] = useState({});
    const [comedyPage, setComedyPage] = useState(5);

    const fetchComedyAnime = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/comedy/${comedyPage}/`);
            setComedy(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching comedy anime:", error);
        }
    };

    useEffect(() => {
        fetchComedyAnime();

        return () => {
        };
    }, [comedyPage]);

    const handleRightButton = () => {
        setComedyPage((prevComedyPage) => {
            const newComedyPage = prevComedyPage + 7;
            return newComedyPage;
        });
    };
    
    const handleLeftButton = () => {
        if (comedyPage >= 5) {
            setComedyPage((prevComedyPage) => {
                const newComedyPage = prevComedyPage - 7;
                return newComedyPage;
            });
        }
    };

    const renderAnimeCards = () => {
        return (
            <div className="card-container">
                <Button className="paginationButton" onClick={handleLeftButton}>
                    {'<'}
                </Button>
                {comedy.data?.map((anime) => (
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

export default ComedyList;
