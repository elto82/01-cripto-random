
import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumberFromApi = async (): Promise<number> => {
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new")
  const numberString = await res.text()
  //throw new Error('Help me')

  return +numberString

}

const App = () => {

  const [number, setNumber] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>()
  const [key, forceRefresh] = useReducer((x) => x + 1, 0)

  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi()
      .then(num => setNumber(num))
      .catch(error => setError(error.message))
  }, [key])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])

  useEffect(() => {
    if (error) setIsLoading(false)
  }, [error])


  return (
    <>
      <div className="card read-the-docs">
        {
          isLoading ? (<h2>Loading...</h2>)
            : !error && <h2>Number Random:{number} </h2>
        }
        {
          !isLoading && error && <h3>{error} </h3>
        }

        <button onClick={forceRefresh} disabled={isLoading}>
          {
            isLoading ? 'Loading...' : 'Generate new number'
          }
        </button>

      </div>
      <hr />
    </>
  )
}

export default App
