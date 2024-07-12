import './App.css';
import AuthExample from './component/AuthExample';
import Fetch_data from './component/fetch_data';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ImageUploader from './component/imageuploader';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthExample />,
    },
    {
      path: "/fetch_data",
      element: <Fetch_data />,
    },
    {
      path:"/upload",
      element: <ImageUploader />
    },
    {
      path: "*",
      element: <h1>This route is not match for our routes</h1>
    }
  ])

  return (
    <>
    <div className="App"> 
      <RouterProvider router={router}></RouterProvider>
    </div>
    </>
  );
}

export default App;
