import useRandom from './hooks/useRandom';
import './App.css';



const AppTanStack = () => {
  const query = useRandom()


  return (
    <>
      <div className="card read-the-docs">
        {
          query.isFetching
            ? (<h2>Loading...</h2>)
            : (<h2>Number Random:{`${query.data}`} </h2>)
        }
        {
          !query.isLoading && query.isError && <h3>{`${query.error}`} </h3>
        }

        <button onClick={() => query.refetch()} disabled={query.isFetching}>
          {
            query.isFetching ? 'Loading...' : 'Generate new number'
          }
        </button>

      </div>

    </>
  );
};

export default AppTanStack;
