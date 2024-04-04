import { useState, useEffect } from 'react'
import Card from './components/Card';

class PlayCard {
    constructor(imgSrc, id) {
        this.imgSrc = imgSrc;
        this.id = id;
        this.played = false;
    }
}

function App() {
    const [data, setData] = useState(null);

    function shuffle() {
        const array = Array.from(data);
        // Doing Fisher-Yates shuffle referenced here 
        // https://javascript.info/task/shuffle
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        setData(array);
    }

    async function fetchData() {
        try {
            const response = await fetch('https://api.stockx.vlour.me/search?query=Crocs')

            if (!response.ok) {
                throw new Error('Network response not ok');
            }

            const result = await response.json();
            let cardData = [];

            for (let i = 0; i < 12; i++) {
                const item = result.hits[i];
                const id = item.id.substring(0, 6);
                const imgSrc = item.image;
                const card = new PlayCard(imgSrc, id);
                cardData.push(card);
            }
            setData(cardData)

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>Croc Memory Game</h1>
            {data ? (
                <main>
                    {data.map(item => (
                        <Card key={item.id}>
                            <img src={item.imgSrc} alt="" />
                        </Card>
                    ))}
                    <button onClick={shuffle}>Shuffle</button>
                </main>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default App
