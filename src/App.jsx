import { useState, useEffect } from 'react'
import Card from './components/Card';

function App() {
    const [data, setData] = useState(null)

    async function fetchData() {
        try {
            const response = await fetch('https://fakerapi.it/api/v1/companies?_quantity=12')

            if (!response.ok) {
                throw new Error('Network response not ok');
            }

            const data = await response.json();
            setData(data.data);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1>My data test</h1>
            {data ? (
                <main>
                    {data.map(item => (
                        <Card key={item.id}>
                            <p>{item.name}</p>
                        </Card>
                    ))}
                </main>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default App
