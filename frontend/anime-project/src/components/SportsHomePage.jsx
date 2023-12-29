import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SportsList = () => {
    const [sports, setSports] = useState({});
    const [sportsPage, setSportsPage] = useState(5);

    const fetchSportsAnime = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/sports/${sportsPage}/`);
            setSports(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching sports anime:", error);
        }
    };

    useEffect(() => {
        fetchSportsAnime();

        return () => {
        };
    }, [sportsPage]);

    const handleRightButton = () => {
        setSportsPage((prevSportsPage) => {
            const newSportsPage = prevSportsPage + 7;
            return newSportsPage;
        });
    };
    
    const handleLeftButton = () => {
        if (sportsPage >= 5) {
            setSportsPage((prevSportsPage) => {
                const newSportsPage = prevSportsPage - 7;
                return newSportsPage;
            });
        }
    };

    const renderAnimeCards = () => {
        return (
            <div className="card-container">
                <Button className="paginationButton" onClick={handleLeftButton}>
                    {'<'}
                </Button>
                {sports.data?.map((anime) => (
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

export default SportsList;
