import './App.css';
import Home from './Page/Home';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import SearchPage from './Page/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path:'search',
    element: <SearchPage/>
  }
])

function App() {
  return (
    <div className="App">
 <div className="App">
  <div className="container w-full h-full">
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("https://wallpaperchain.com/download/neon-space/neon-space-wallpaper-12.jpg")',
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto', // Adjust as needed
        }}
      />
      <div className="relative  backdrop-blur-md p-6 rounded-lg text-white">
        <RouterProvider router={router}>

        </RouterProvider>
      </div>
    </div>
  </div>
</div>

</div>

  );
}

export default App;
