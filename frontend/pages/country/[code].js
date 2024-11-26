import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const CountryInfo = () => {
    const router = useRouter();
    const { code } = router.query;
    const [countryInfo, setCountryInfo] = useState(null);

    useEffect(() => {
        if (code) {
            const fetchCountryInfo = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/country/${code}`);
                    setCountryInfo(response.data);
                } catch (error) {
                    console.error('Error fetching country info:', error);
                }
            };
            fetchCountryInfo();
        }
    }, [code]);

    if (!countryInfo) return <div>Cargando...</div>;
    console.log(countryInfo)
    return (
        <div class="card">
            <h1>{countryInfo.name}</h1>
            <img src={countryInfo.flag} alt={`Flag of ${countryInfo.name}`} />
            <h2>Países Limítrofes</h2>
            <ul>
                {countryInfo.borders.map(border => (
                    <li key={border.countryCode}>
                        <Link href={`/country/${border.countryCode}`}>{border.commonName}</Link>
                    </li>
                ))}
            </ul>
            <h2>Población</h2>
            <p>{countryInfo.population}</p>
        </div>
    );
};

export default CountryInfo;
