import {createBrowserRouter} from "react-router-dom";
import App from './App';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";
import FavoritePage from "./pages/FavoritePage";
import SignUpPage from "./pages/SignUpPage";
import AnAnimePage from "./pages/AnAnimePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import UserProfile from "./pages/ProfilePage";
const router= createBrowserRouter([
    {path:'/',
    element: <App/>,
    children:[
        {
            index: true,
            element: <HomePage/>
        },
        {
            path: 'about/',
            element: <AboutPage/>
        },
        {
            path: 'signup/',
            element: <SignUpPage/>
        },
        {
            path: 'login/',
            element:<LoginPage/>
        },
        {
            path: 'favorites/',
            element: <FavoritePage/>
        },
        {
            path: 'anime/:name/',
            element:<AnAnimePage/>
        },

        {
            path:'/search-results/',
            element:<SearchResultsPage/>
        },
        {
            path:'/profile/',
            element:<UserProfile/>
        }
       
    ],
    errorElement: <NotFoundPage/>
},
])
export default router