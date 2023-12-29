import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { apiFavorites } from "../utilities"
import { Navigate } from "react-router-dom"
import { Button } from "react-bootstrap"



const anAnime =() =>{
    const token= localStorage.getItem('token')
    const[anime,setAnime]=useState(null)
    const[inFavorites, setInFavorites]= useState("")
    const[favoritesIDList,setFavoritesIDLIST]= useState([])
    const[yturl,setYtUrl]=useState("")
    const {name}= useParams()
    const navigate= useNavigate()
    
    const getAnime = async()=>{
        let response = await axios.get(`http://127.0.0.1:8000/api/v1/kitsu/${name}/`)
        setAnime(response.data.data[0])
        console.log(response.data)
        setInFavorites(Number(response.data.data[0].id))
        console.log(inFavorites)
    }

    const getYoutubeVideo = async()=>{
        let response = await axios.get(`http://127.0.0.1:8000/api/v1/youtube/${name}/`)
        setYtUrl(response.data.items[0].id.videoId)
    }

    useEffect(()=>{
        getAnime()
        getYoutubeVideo()
    },[])

    const addToFavorites= async ()=>{
        let response = await apiFavorites.post("add_to_favorites/",{
            anime
        }, {
            headers:{
                'Authorization': `Token ${token}`
            }
        })
        console.log("added")
        setInFavorites(true)
        navigate(0)
    }
   

    const isInFavorites = async () =>{
        let response = await apiFavorites.get("",
        {
            headers:{
                'Authorization': `Token ${token}`
            }
        })
        setFavoritesIDLIST(response.data)
    }

    useEffect(()=>{
        isInFavorites()
    },[])

    useEffect(() => {
        console.log(favoritesIDList);
      }, [favoritesIDList]);


    const checkFavorites=()=>{
        const ids= favoritesIDList.map(anime => anime.anime)
        console.log(ids)
        if(ids.includes(inFavorites)){
            return true
        }
        else{
            return false
        }

    }
// console.log(anime.attributes.coverImage.original)

    return(


   <>
    {anime?
        <div className="anAnimeContainer" style={{
        backgroundImage: `url(${anime.attributes.coverImage.original})`,
        backgroundSize: 'cover',  
        width: '100vw',
        // height: '100vh', 
    

    }}>
        <div className="AnimePage" style={{
        background: 'rgba(0, 0, 0, 0.5)',        
        backgroundSize: 'cover',  
        width: '100vw',
        height: '100vh', 
    }}>
           <img id= "posterImage"src={`${anime.attributes.posterImage.large}`}></img>
            <div className="AnimePageInfo">
            <h1 id="anAnimeTitle">{anime.attributes.canonicalTitle}</h1>
            <div className="animeSummary">
            <h3>Summary</h3>
            <p>{anime.attributes.description}</p>
            </div>
            <div className="videoDiv">
            <div className="animeInfo">
                <h1 className="headers">Age Rating</h1>
                <p>{anime.attributes.ageRating}</p>
                <h2 className="headers">Age Rating Guide</h2>
                <p>{anime.attributes.ageRatingGuide}</p>
                <h3 className="headers">Total Number Of Episodes</h3>
                <p>{anime.attributes.episodeCount}</p>
                <Button id="favoriteButton" onClick={addToFavorites}>{checkFavorites()?"Favorited":"Add to favorites"}</Button>

            </div>
            <iframe id="video" width="560"
height="315" src={`https://www.youtube.com/embed/${yturl}`} frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
></iframe>
</div>
          
            </div> 

           
            </div>

        </div>    
        

        :
        null
    }



    </>

    )
}

export default anAnime