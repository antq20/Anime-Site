import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import RomanceList from "../components/RomanceHomePage";
import ComedyList from "../components/ComedyHomePage";
import MechaList from "../components/MechaHomePage";
import MysteryList from "../components/MysteryHomePage";
import FantasyList from "../components/FantasyHomePage";
import SportsList from "../components/SportsHomePage";
import AdventureList from "../components/AdventureHomePage";


const HomePage = () => {

    return (
        <>
            <h1>Action and Adventure</h1>
            <AdventureList/>
            <h1>Romance</h1>
            <RomanceList/>
            <h1>Comedy</h1>
            <ComedyList/>
            <h1>Mecha</h1>
            <MechaList/>
            <h1>Mystery</h1>
            <MysteryList/>
            <h1>Fantasy</h1>
            <FantasyList/>
            <h1>Sports</h1>
            <SportsList/>

        </>
    );
};

export default HomePage;
