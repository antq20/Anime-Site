import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

const UserProfile=()=>{
    const [username,setUserName] = useState(null)
    const [id,setID]= useState(null)
    const [profileImg, setProfileImg]= useState(null)
    const [newUserName,setNewUserName]= useState(username)
    const[newProfileImg,setNewProfileImg]=useState(profileImg)
    const token= localStorage.getItem('token')
    const[randomImg,setRandomImg]=useState(null)

    const picArray= ["https://cdn.nekosapi.com/images/original/5897ddc9-0003-45b6-b199-52a52f155567.webp",
"https://cdn.nekosapi.com/images/original/9f8f528f-9d75-4df7-b31c-1e908512bfd1.webp",
"https://cdn.vox-cdn.com/thumbor/rt_iaC7JKhrhUUyxW3UK5_Oqh_o=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22200290/gattyysas.jpg",
"https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fcms-image-bucket-production-ap-northeast-1-a7d2.s3.ap-northeast-1.amazonaws.com%2Fimages%2F5%2F3%2F5%2F8%2F28668535-1-eng-GB%2F%E3%82%BD%E3%83%8B%E3%83%BC%E4%B8%8A%EF%BC%89%E8%BF%BD%E5%8A%A0%E3%80%80%E9%AC%BC%E6%BB%85%E3%81%AE%E5%88%8320200805183428557_Data.jpg?width=700&fit=cover&gravity=faces&dpr=2&quality=medium&source=nar-cms",
"https://cdn.vox-cdn.com/thumbor/u2A2BtFPYHIWWGPFjgveAyaGx5s=/0x0:1920x1080/1200x800/filters:focal(807x387:1113x693)/cdn.vox-cdn.com/uploads/chorus_image/image/68876614/Screenshot_20210220_184520__01_min.0.jpg"
]

    const getInfo = async()=>{
        try {
          let response = await axios.get('http://127.0.0.1:8000/api/v1/users/info/', {
            headers: {
              "Authorization": `token ${token}`,
            },
          });
          setUserName(response.data.username);
          setNewUserName(username)
          setID(response.data.id)
          setProfileImg(response.data.profileImg)
          setNewProfileImg(profileImg)
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching user info', error);
        }
      }
    ;

    useEffect(() => {
        getInfo();
    }, []);

    const editInfo = async (e) => {
        try {
          let response = await axios.put(
            `http://127.0.0.1:8000/api/v1/users/updateinfo/${id}/`,
            {
            
              username: newUserName,
              profileImg: newProfileImg,
             
            },
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          );
          console.log('User info updated successfully', response.data);
        } catch (error) {
          console.error('Error updating user info', error);
        }
      };


      const getRandomImage = async(e)=>{
        e.preventDefault()
        const randomIndex = Math.floor(Math.random()* picArray.length);
          setRandomImg(picArray[randomIndex])
          console.log(randomImg)
      }
    ;
    useEffect(() => {
        getRandomImage();
    }, []);

    return (
        <>
          <form className="editProfilePage">
            <h1 id="editProfile">Edit Profile</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                defaultValue={username}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileImg">Profile Image</label>
              <img src={profileImg} alt="Profile" style={{ width: '200px', borderRadius: '100%', height:'200px' , marginLeft:'1rem'}} />
            </div>
            <div className="form-group">
              <label htmlFor="profileImgLink">Profile Image Link</label>
              <input
                id="profileImgLink"
                defaultValue={profileImg}
                style={{ width: '100rem' }}
                onChange={(e) => setNewProfileImg(e.target.value)}
              />
            </div>
            <img src={randomImg} alt="Random" style={{ height: '150px', borderRadius: '8px', marginTop: '10px' }} />
            <h2 style={{width:'100vmin'}}>{randomImg}</h2>
            <Button onClick={getRandomImage}>
              Generate Random
            </Button>
            <Button id="updateButton" onClick={editInfo}>
              Update
            </Button>
          </form>
        </>
      );
}

export default UserProfile