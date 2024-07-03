import { useState } from 'react'
import Header from './routes/header'
import { MantineProvider } from "@mantine/core";
import Main from './components/main/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MantineProvider>
      <Header/>
      <Main/>
    </MantineProvider>
    </>
  )
}

export default App
