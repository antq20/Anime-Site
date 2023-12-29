import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FantasyList = () => {
    const [fantasy, setFantasy] = useState({});
    const [fantasyPage, setFantasyPage] = useState(30);

    const fetchFantasyAnime = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/fantasy/${fantasyPage}/`);
            setFantasy(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching fantasy anime:", error);
        }
    };

    useEffect(() => {
        fetchFantasyAnime();

        return () => {
        };
    }, [fantasyPage]);

    const handleRightButton = () => {
        setFantasyPage((prevFantasyPage) => {
            const newFantasyPage = prevFantasyPage + 7;
            return newFantasyPage;
        });
    };
    
    const handleLeftButton = () => {
        if (fantasyPage >= 5) {
            setFantasyPage((prevFantasyPage) => {
                const newFantasyPage = prevFantasyPage - 7;
                return newFantasyPage;
            });
        }
    };

    const renderAnimeCards = () => {
        return (
            <div className="card-container">
                <Button className="paginationButton" onClick={handleLeftButton}>
                    {'<'}
                </Button>
                {fantasy.data?.map((anime) => (
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

export default FantasyList;
