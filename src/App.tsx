import './App.css'
import { Application } from './components/application/application'
import { Greet } from './components/greet/greet'
import { Skills } from './components/skills/skills'
import Counter from './components/counter/counter'
import AppProviders from './providers/app-providers'
import { MuiMode } from './components/mui/mui-mode'

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Greet />
        <hr />
        <Application />
        <hr />
        <Skills skills={['HTML', 'CSS']} />
        <hr />
        <Counter />
        <hr />
        <MuiMode />
      </div>
    </AppProviders>
  )
}

export default App
