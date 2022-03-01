import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Outlet, useNavigate } from "react-router-dom";

function InputSection() {
    const navigate = useNavigate()
    const [city, setCity] = useState("")

    const sendCity = (e) => {
        e.preventDefault()
        navigate('/current', { state: { nameCity: city } })
    }
    const sendCity2 = (e) => {
        e.preventDefault()
        navigate('/days', { state: { nameCity: city } })
    }

    return (
        <div className="py-5 px-5">
            <div className='flex justify-center'>
                <div className='bg-white shadow-md rounded-md px-8 pt-5 pb-8 mb-4 m-auto'>
                    <form className='flex items-center border-b border-teal-500 py-2'>
                        <input
                            placeholder='Buscar ciudad'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1  leading-tight focus:outline-none font-semibold'
                        ></input>
                        <div className="flex">
                            <button className='flex items-center bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 mr-1 rounded-full font-bold' onClick={sendCity}><BsSearch className="mr-2"/>Actual</button>
                            <button className='flex items-center bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-full font-bold' onClick={sendCity2}><BsSearch className="mr-2"/>3 Days</button>
                        </div>
                    </form>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default InputSection;