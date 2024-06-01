import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Navbar } from './helpers/Navbar';
import { Registro } from './paginas/Registro';
import { Misrecetas } from './paginas/MisRecetas';
import { VerCredencial } from './paginas/VerCredencial';

export const App = () => {
  return (
<div className="bg-zinc-300 min-h-screen">

           <Navbar />
          <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
            <Routes>
              <Route path="/registro" element={<Registro />} />
              <Route path="/misrecetas" element={<Misrecetas />} />
              <Route path="/obtenercv" element={<VerCredencial />} />
            </Routes> 
        </div>
    </div>
  )
}


