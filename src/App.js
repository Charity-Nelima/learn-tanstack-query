import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Create query client (required for TanStack Query)
const queryClient = new QueryClient();

// Function to fetch data from API
const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

// Component that displays cat facts
const CatFactApp = () => {
  // useQuery hook - this does all the work!
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['catFact'],        // Unique name for this data
    queryFn: fetchCatFact,        // Function that gets the data
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🐱 Cat Fact Generator</h1>
      
      {/* Show loading message */}
      {isLoading && <p>Getting cat fact...</p>}
      
      {/* Show error message */}
      {error && (
        <div style={{ color: 'red' }}>
          <p>Error: {error.message}</p>
          <button onClick={() => refetch()}>Try Again</button>
        </div>
      )}
      
      {/* Show the cat fact */}
      {data && (
        <div>
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <p style={{ fontSize: '18px' }}>{data.fact}</p>
          </div>
          <button onClick={() => refetch()}>Get New Fact</button>
        </div>
      )}
    </div>
  );
};

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatFactApp />
    </QueryClientProvider>
  );
}

export default App;