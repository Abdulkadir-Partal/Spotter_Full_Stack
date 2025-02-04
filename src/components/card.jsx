import "./Card.css";

function Card({ flight }) {
    return (
        <div className="flight-card">
            <h3>{flight.airline_name}</h3>
            <p>{flight.departure_airport} → {flight.arrival_airport}</p>
            <p className="price">${flight.price}</p>
        </div>
    );
}

export default Card;
