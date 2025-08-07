# TanStack Query Beginner's Guide

## 📍 Overview

Every React developer has felt the pain of managing server state - the loading spinners that never end, the stale data that won't refresh, the complex caching logic. This capstone shows how **TanStack Query** - a modern data synchronization library for React applications - transforms that experience. This beginner-friendly toolkit helps anyone get started with TanStack Query, from understanding its core concepts to building their first working application.

## 🎯 Project Goals

- **Learn TanStack Query** - A powerful library I had limited experience with
- **Create a simple runnable project** - A cat facts generator that demonstrates core features  
- **Document the steps clearly** - So other developers can replicate this learning process
- **Test and iterate** - Refined the guide based on common beginner challenges

## ✅ What You'll Learn

Learn TanStack Query in 15 minutes with practical examples.

### What You'll Build

A simple app that fetches cat facts from an API. You'll learn:

- How to fetch data with TanStack Query
- Loading and error states
- Data caching
- Manual refresh functionality

## Why TanStack Query?

**Problem:** Fetching data in React is complicated. You need to handle loading states, errors, caching, and re-fetching manually.

**Solution:** TanStack Query does all of this automatically.

**Real-world use:** Companies like Netflix and Coinbase use TanStack Query to manage data in their apps.

## What is TanStack Query?

TanStack Query is a library that makes fetching data easy. It handles:

- **Loading states** (showing "Loading..." automatically)
- **Error handling** (retry failed requests)
- **Caching** (don't re-fetch the same data)
- **Background updates** (refresh data when needed)

## Project Structure

After completing the setup, your project will look like this:

```
my-tanstack-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js              # Main component with TanStack Query implementation
│   ├── index.js            # React app entry point
│   └── App.css             # Styles (optional)
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
└── README.md              # Project documentation
```

### Key Files You'll Modify

- **`src/App.js`** - Contains all TanStack Query logic and components
- **`package.json`** - Updated with TanStack Query dependency
- **`README.md`** - This documentation

## Requirements

Before starting, you need:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Code editor** (VS Code recommended)
- **Web browser** (Chrome, Firefox, Safari, or Edge)

Check if Node.js is installed:
```bash
node --version
```

## Setup Instructions

### Step 1: Create React App
```bash
npx create-react-app my-tanstack-app
cd my-tanstack-app
```

### Step 2: Install TanStack Query
```bash
npm install @tanstack/react-query
```

### Step 3: Run the App
```bash
npm start
```

Your browser should open to http://localhost:3000

## Complete Working Example

Replace everything in `src/App.js` with this code:

```javascript
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
```

## What This Code Does

1. **Creates QueryClient:** Required wrapper for TanStack Query
2. **Defines fetchCatFact:** Simple function that gets data from an API
3. **Uses useQuery hook:** The main TanStack Query feature that:
   - Calls `fetchCatFact` automatically
   - Provides `data`, `isLoading`, and `error` states
   - Gives you a `refetch` function to get new data
4. **Handles all states:** Loading, error, and success

## Key Features You Get For Free

### Automatic Loading States
```javascript
{isLoading && <p>Loading...</p>}
```
Shows loading message while fetching data.

### Error Handling
```javascript
{error && <p>Error: {error.message}</p>}
```
Automatically catches and displays errors.

### Caching
Click "Get New Fact" quickly multiple times. Notice how fast it is? That's caching!

### Background Updates
Leave the tab and come back. TanStack Query automatically refreshes stale data.

## Common Problems & Solutions

### Problem: "useQuery must be used within QueryClientProvider"
**Fix:** Make sure your component is wrapped in `<QueryClientProvider>`:
```javascript
<QueryClientProvider client={queryClient}>
  <YourComponent />
</QueryClientProvider>
```

### Problem: "Cannot read properties of undefined"
**Fix:** Always use optional chaining with data:
```javascript
// ❌ Wrong
<p>{data.fact}</p>

// ✅ Correct  
<p>{data?.fact}</p>
```

### Problem: CORS errors
**Fix:** Use CORS-enabled APIs for testing:
- https://catfact.ninja/fact ✅
- https://jsonplaceholder.typicode.com/users ✅
- https://reqres.in/api/users ✅

## Configuration Options

### Basic Configuration
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // Data stays fresh for 5 minutes
      retry: 3,                      // Retry failed requests 3 times
      refetchOnWindowFocus: true,    // Refresh when window gets focus
    },
  },
});
```

### Per-Query Configuration
```javascript
const { data } = useQuery({
  queryKey: ['catFact'],
  queryFn: fetchCatFact,
  staleTime: 10 * 60 * 1000,        // Override default stale time
  enabled: shouldFetch,              // Only fetch when shouldFetch is true
  refetchInterval: 30000,            // Auto-refresh every 30 seconds
});
```

## Next Steps

Once you understand the basics, explore:

- **Mutations** - Update data on the server
- **Multiple Queries** - Fetch different types of data
- **Dependent Queries** - Fetch data based on other data
- **Infinite Queries** - Load more data (pagination)

## AI Prompts Used & Learning Reflections

### 🤖 Key AI Prompts That Guided This Project

**Problem-Solving and Learning Context Prompt:**
[Understanding the framework better](https://ai.moringaschool.com/ai-software/ai-use-cases/usecases-comprehend/#_prompt_1_understand_how_a_specific_feature_works) 

**Documentation Prompt:**
[Project README documentation.](https://ai.moringaschool.com/ai-software/ai-use-cases/usecases-documentation/#_prompt_1_project_readme_generation) 
### 💭 Learning Reflections

**What AI Helped With:**
- **Concept Clarity:** AI explained complex concepts like "stale time" and "cache time" in simple terms
- **Code Quality:** AI suggested better patterns for error handling and state management  
- **Documentation Structure:** AI helped organize information in a logical, learner-friendly flow

**Iterative Improvements:**
- Started with a complex user management example, AI suggested simplifying to a single API call
- Initial error handling was basic, AI recommended comprehensive error states with retry functionality

**Productivity Impact:**
- Reduced learning time from estimated 2-3 days to 4-6 hours
- AI provided multiple implementation approaches, allowing me to choose the most beginner-friendly

**Key Learning Insight:** AI excels at breaking down complex topics into digestible chunks and anticipating user questions, making it an excellent learning companion for new technologies.


## Helpful Resources

### Official Documentation
- [TanStack Query Docs](https://tanstack.com/query/latest) - Complete guide
- [API Reference](https://tanstack.com/query/latest/docs/react/reference) - All options explained

### Video Tutorials
- [React Query in 100 Seconds](https://www.youtube.com/watch?v=novnyCaa7To) - Quick overview
- [Complete React Query Tutorial](https://www.youtube.com/watch?v=seU46c6Jz7E) - Detailed walkthrough

### Blog Posts
- [Practical React Query](https://tkdodo.eu/blog/practical-react-query) - Real-world patterns
- [Common Mistakes](https://tkdodo.eu/blog/react-query-common-mistakes) - What to avoid