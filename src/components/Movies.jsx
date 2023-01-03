import React, {useState} from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { useUserAuth } from '../context/authContext';
import { db } from '../firebase';
import {arrayUnion,doc,updateDoc} from 'firebase/firestore'

const Movies = ({item}) => {
    const [like,setLike] = useState(false) ;
    const [saved, setSaved] = useState(false);
    const { user } = useUserAuth();

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
          setLike(!like);
          setSaved(true);
          await updateDoc(movieID, {
            savedMovies: arrayUnion({
              id: item.id,
              title: item.title,
              img: item.backdrop_path,
            }),
          });
        } else {
          alert('Please log in to save a movie');
        }
      };

    return (
        
            <div key={item?.id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                <img src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.overview} className="w-full h-full d-block" />
                <div className='absolute top-0 left-0  hover:bg-black/70 w-full h-full opacity-0 hover:opacity-100 text-gray- overflow-hidden'>
                    <p className='font-medium text-lg flex justify-center items-center w-full h-full px-2 text-center'>{item.title}</p>
                    <p onClick={saveShow}>
                        {
                            like ?
                                <FaHeart
                                    size={20} className='absolute top-4 left-4 text-red-500'
                                // onClick={() => setLike(!like)}
                                /> :
                                <FaRegHeart size={20} className='absolute top-4 left-4 text-gray-100'
                                // onClick={() => setLike(!like)}
                                />
                        }
                    </p>
                </div>
            </div>
     
    )
}

export default Movies