import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MechaList = () => {
    const [mecha, setMecha] = useState({});
    const [mechaPage, setMechaPage] = useState(5);

    const fetchMechaAnime = async () => {
        try {
            let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/mecha/${mechaPage}/`);
            setMecha(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching mecha anime:", error);
        }
    };

    useEffect(() => {
        fetchMechaAnime();

        return () => {
        };
    }, [mechaPage]);

    const handleRightButton = () => {
        setMechaPage((prevMechaPage) => {
            const newMechaPage = prevMechaPage + 7;
            return newMechaPage;
        });
    };
    
    const handleLeftButton = () => {
        if (mechaPage >= 5) {
            setMechaPage((prevMechaPage) => {
                const newMechaPage = prevMechaPage - 7;
                return newMechaPage;
            });
        }
    };

    const renderAnimeCards = () => {
        return (
            <div className="card-container">
                <Button className="paginationButton" onClick={handleLeftButton}>
                    {'<'}
                </Button>
                {mecha.data?.map((anime) => (
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

export default MechaList;
