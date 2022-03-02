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
        <div className="px-5 py-5">
            <div className='flex justify-center'>
                <div className='px-8 pt-5 pb-8 m-auto mb-4 bg-white rounded-md shadow-md'>
                    <form className='flex items-center py-2 border-b border-teal-500'>
                        <input
                            placeholder='Buscar ciudad'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='w-full py-1 mr-3 font-semibold leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none'
                        ></input>
                        <div className="flex">
                            <button className='flex items-center px-2 py-1 mr-1 text-sm font-bold text-white bg-teal-500 border-4 border-teal-500 rounded-full hover:bg-teal-700 hover:border-teal-700' onClick={sendCity}><BsSearch className="mr-2" />Actual</button>
                            <button className='flex items-center px-2 py-1 text-sm font-bold text-white bg-teal-500 border-4 border-teal-500 rounded-full hover:bg-teal-700 hover:border-teal-700' onClick={sendCity2}><BsSearch className="mr-2" />3 Days</button>
                        </div>
                    </form>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default InputSection;