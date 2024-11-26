import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


const Home = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get('http://localhost:5000/api/countries');
            setCountries(response.data);
        };
        fetchCountries();
    }, []);

    return (
        <div>
            <h1>Lista de Países</h1>
            <ul>
                {countries.map(country => (
                    <li key={country.countryCode}>
                        <Link href={`/country/${country.countryCode}`}>{country.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;