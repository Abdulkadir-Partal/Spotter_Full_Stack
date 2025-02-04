import { useState, useEffect } from "react";
import Card from "./components/card";
import "./App.css";

function App() {
    const [flights, setFlights] = useState([]);
    const [origin, setOrigin] = useState("JFK");
    const [destination, setDestination] = useState("LAX");
    const [loading, setLoading] = useState(false);

    

    const fetchFlights = async () => {
        if (!origin || !destination) {
            alert("Please enter a valid departure and destination point!");
            return;
        }

        setLoading(true);
        const apiKey = import.meta.env.VITE_RAPIDAPI_KEY; 
        const apiUrl = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${origin}&destinationSkyId=${destination}&date=2025-02-10&cabinClass=economy&adults=1&sortBy=best&currency=USD&market=en-US&countryCode=US`;

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                },
            });

            if (!response.ok) {
                throw new Error(`API Hatası: ${response.statusText}`);
            }

            const data = await response.json();
            setFlights(data.flights || []);
        } catch (error) {
            console.error("An error occurred while fetching flights:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    return (
        <div className="container">
            <h1>Google Flights Clone</h1>

            <div className="search-box">
                <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                    placeholder="Origin"
                />
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value.toUpperCase())}
                    placeholder="Destination"
                />
                <button onClick={fetchFlights} disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {loading ? (
                <p>Loading flights...</p>
            ) : (
                <div className="flight-list">
                    {flights.length > 0 ? (
                        flights.map((flight, index) => <Card key={index} flight={flight} />)
                    ) : (
                        <p>No flights found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
