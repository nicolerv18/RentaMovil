import React, { useEffect, useState } from 'react';
import "../components/layout/Quotes.css";
function Quotes() {
    const quotes = [
        "Confía en tu viaje. Confía en Rentamovil.",
        "Tu aventura comienza con un clic. Rentamovil, tu compañero de viaje.",
        "Explora el mundo a tu ritmo con Rentamovil.",
        "Viaja sin límites, alquila con Rentamovil.",
        "Donde quieras ir, Rentamovil te lleva.",
        "Alquila fácil, viaja feliz con Rentamovil.",
        "Tu viaje, tu estilo. Rentamovil lo hace posible."
    ];

    const [quote, setQuote] =  useState("");

    useEffect(() => {
        if (!quotes || quotes.length === 0) return;
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    },[]);

    return <p className='quote'>{quote}</p>;
}
export default Quotes;