
import { Link } from 'react-router-dom'

import { RouteIndex } from '../helpers/RouteName'




export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-800 font-inter p-4 relative overflow-hidden">
      
      <div className="absolute left-[-5%] top-[10%] text-[20rem] sm:text-[30rem] md:text-[40rem] lg:text-[45rem] xl:text-[50rem] font-extrabold text-gray-300 opacity-70 leading-none select-none -z-0">
        4
      </div>
     
      <div className="absolute right-[-5%] bottom-[10%] text-[20rem] sm:text-[30rem] md:text-[40rem] lg:text-[45rem] xl:text-[50rem] font-extrabold text-gray-300 opacity-70 leading-none select-none -z-0">
        4
      </div>

     
      <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-full bg-gray-200 shadow-xl border-4 border-gray-300 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-7xl font-extrabold text-gray-800 mb-4 animate-bounce">OOPS!</h1>
          <p className="text-sm sm:text-base mb-1 text-gray-600">The page you’re looking for doesn’t exist.</p>
          <p className="text-sm sm:text-base mb-6 text-gray-600">Let’s get you back to Speakverse.</p>
          <button
            className="px-6 py-3 rounded-full font-semibold text-white
                       bg-gradient-to-r from-blue-500 to-indigo-600
                       hover:from-blue-600 hover:to-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                       transition duration-300 ease-in-out
                       shadow-lg hover:shadow-xl"
          >
            <Link to={RouteIndex}>GO TO HOME</Link>
          </button>
        </div>
      </div>
    </div>
  );
}



