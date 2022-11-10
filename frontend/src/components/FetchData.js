import React, { useState, useEffect } from 'react';
function FetchData() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/api/retail/prices")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log('result: ', result)
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {console.log('items:', items.toString())}
                {items.Items.map((item, index) => (
                    <li key={index}>
                        {item.productId} {item.retailPrice}
                    </li>
                ))}
            </ul>
        );
    }
}
export default FetchData