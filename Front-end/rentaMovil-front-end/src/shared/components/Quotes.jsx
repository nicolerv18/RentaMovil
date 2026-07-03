import React, { useEffect, useState } from 'react';
import "../components/layout/Quotes.css";
import { useTranslation } from 'react-i18next';
function Quotes() {
    const { t } = useTranslation();
    const quotes = [
        t('quotes.quote1'),
        t('quotes.quote2'),
        t('quotes.quote3'),
        t('quotes.quote4'),
        t('quotes.quote5'),
        t('quotes.quote6'),
        t('quotes.quote7')
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