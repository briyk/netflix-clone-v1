import React from "react";
import requests from "../Request";
import axios from "axios";

const Main = () => {
    // [1] initilize our state
    const [movies, setMovies] = React.useState([]);

    //[2] call api once page loaded
    React.useEffect(() => {
        axios.get(requests.requestPopular).then((res) => {
            setMovies(res.data.results);
        });
    }, []);

    //[3] Pick a movie each time
    const movie = movies[Math.floor(Math.random() * movies.length)];
    // console.log(movie);
    //[4] cut paragraph if more
    const truncateString = (str, num) =>{
        if(str?.length > num){
            return str.slice(0,num) + "..."
        } else{
            return str
        }
    }
    return (
        <div className="w-full h-[600px] overflow-hidden">
            <div className="w-full h-full">
                <div className="w-full h-[600px] absolute bg-gradient-to-r from-black"></div>
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    alt={movie?.title}
                />
            </div>
            <div className="absolute top-[25%] p-6 md:p-8">
                <h1 className="text-3xl md:text-5xl my-3 font-bold">{movie?.title}</h1>
                <div>
                    <button className="btn bg-gray-300 text-black" type="button">
                        Play
                    </button>
                    <button
                        className="btn border border-gray-300 text-white ml-4"
                        type="button"
                    >
                        Watch Later
                    </button>
                </div>
                <p className="my-2 text-gray-400 text-sm"><strong>Released at</strong> {' '} {movie?.release_date}</p>
                <p className="lg:w-[50%] md:max-w-[50%] max-w-[90%] text-gray-400 text-clip">
                    { truncateString(movie?.overview, 140)}
                    </p>
            </div>
        </div>
    );
};

export default Main;
