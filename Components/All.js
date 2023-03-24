import { useEffect, useState } from "react";
import Image from 'next/image';
import House from "./House";

const All = () => {

    const [res, setRes] = useState({});
    const [allProperties, setAllProperties] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
        }
    };

    useEffect(() => {
        fetch('https://realty-in-us.p.rapidapi.com/locations/v2/auto-complete?input=ny&limit=10', options)
        .then(response => response.json())
        .then(response => setRes({
            state_code: response.autocomplete[0].state_code,
            city: response.autocomplete[0].city,
            offset: 0,
            limit: 50
        }))
        .catch(err => console.error(err));

        fetch(`https://realty-in-us.p.rapidapi.com/properties/v2/list-for-sale?city=${res.city}&state_code=${res.state_code}&offset=0&limit=50&sort=relevance`, options)
        .then(response => response.json())
        .then(response => {
            setAllProperties(response.properties)
        })
        .catch(err => console.error(err));

    }, [])

    return (
        <div className="flex flex-col items-center">
            <div>Search</div>
            <div>
                {allProperties.map(data => (
                    <House data={data}/>
                ))}
            </div>
        </div>
    )
}

export default All;