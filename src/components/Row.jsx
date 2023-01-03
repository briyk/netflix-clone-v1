import React from 'react'
import axios from 'axios'
import Movies from './Movies';
import {MdChevronLeft , MdChevronRight} from 'react-icons/md'

const Row = ({ title, fetchURL ,rowID }) => {

    const [movies, setMovies] = React.useState([]);

    

    React.useEffect(() => {
        axios.get(fetchURL).then(res => {
            setMovies(res.data.results)
        })
    }, [fetchURL])
    // Create Sliders
    const sliderLeft = () =>{
        const slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }
    const sliderRight = () =>{
        const slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
  
    // console.log(movies)
    return (
        <div className='mt-4 p-6'>
            <h1 className='text-gray-200 text-2xl md:text- font-bold border-l-4 border-[#e50914]'>
                <span className='ml-2'>{title}</span>
            </h1>
            <div className='relative flex items-center group'>
                <MdChevronLeft
                 onClick={sliderLeft}
                 size={35} 
                 className="bg-white rounded-full text-black cursor-pointer abolute opacity-50 hover:opacity-100 hidden group-hover:block left-0"/>
                <div id={`slider${rowID}`} className="w-full h-full scroll-smooth overflow-x-scroll whitespace-nowrap scrollbar-hide relative">
                    {
                        movies.map((item, index) => (
                            <Movies item={item} key={index}/>
                        ))
                    }
                </div>
                <MdChevronRight
                  onClick={sliderRight}
                 size={35} 
                 className="bg-white rounded-full text-black cursor-pointer abolute opacity-50 hover:opacity-100 hidden group-hover:block right-0"/>
            </div>
        </div>
    )
}

export default Row