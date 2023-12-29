import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RomanceList = () => {
    const [romance, setRomance] = useState({});
    const [romancePage, setRomancePage] = useState(5);

    const fetchRomanceAnime = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/romance/${romancePage}/`);
            setRomance(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching romance anime:", error);
        }
    };

    useEffect(() => {
        fetchRomanceAnime();

        return () => {
        };
    }, [romancePage]);

    const handleRightButton = () => {
        setRomancePage((prevRomancePage) => {
            const newRomancePage = prevRomancePage + 7;
            return newRomancePage;
        });
    };
    
    const handleLeftButton = () => {
        if (romancePage >= 5) {
            setRomancePage((prevRomancePage) => {
                const newRomancePage = prevRomancePage - 7;
                return newRomancePage;
            });
        }
    };

    const renderAnimeCards = () => {
        return (
            <div className="card-container">
                <Button className="paginationButton" onClick={handleLeftButton}>
                    {'<'}
                </Button>
                {romance.data?.map((anime) => (
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

export default RomanceList;
