import { useState, useEffect } from 'react'
import Score from './components/Score';

class PlayCard {
    constructor(imgSrc, id) {
        this.imgSrc = imgSrc;
        this.id = id;
        this.played = false;
    }
}

function App() {
    const [data, setData] = useState(null);
    const [currScore, setCurrScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    function shuffle(array) {
        // Doing Fisher-Yates shuffle referenced here 
        // https://javascript.info/task/shuffle
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function resetCards() {
        const nextData = data.map((curr) => {
            return { ...curr, played: false };
        })
        setData(shuffle(nextData))
    }

    function handleClick(id) {
        const item = data.filter((item) => item.id === id)[0];

        // If clicked item already played
        // - reset the entire array
        // - reset the currScore
        if (item.played === true) {
            resetCards()
            setCurrScore(0);
            return;
        }

        // Else
        // - create new array from data, update played
        // - shuffle the board and set to state
        // - update the score
        const nextData = data.map((curr) => {
            if (curr.id === id) {
                return { ...curr, played: true };
            } else {
                return curr;
            }
        });
        setData(shuffle(nextData));
        setCurrScore(currScore + 1);
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

    // Fetch the data on page load
    useEffect(() => {
        fetchData();
    }, [])

    // Maintain the high score based on change to score
    useEffect(() => {
        if (currScore > highScore) {
            setHighScore(currScore);
        }
    }, [currScore, highScore])

    return (
        <div>
            <header>
                <div>
                    <h1>Croc Memory Game</h1>
                    <p>Hunt for crocs... don&apos;t click the same croc twice!</p>
                </div>
                <Score currScore={currScore} highScore={highScore} />
            </header>
            {data ? (
                <main>
                    {data.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { handleClick(item.id) }}
                        >
                            <img src={item.imgSrc} alt="" />
                        </button>
                    ))}
                </main>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default App
