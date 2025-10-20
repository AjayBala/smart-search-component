import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import stencilLogo from './assets/stencilLogo.svg'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
         <a href="https://stenciljs.com/" target="_blank">
          <img src={stencilLogo} className="logo react" alt="Stencil logo" />
        </a>
      </div>
      <h2>Vite + React + Smart Search Web Component </h2>
   
           <smart-search theme="auto"></smart-search>
    </>
  )
}

export default App
