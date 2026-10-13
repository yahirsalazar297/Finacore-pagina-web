import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Academy } from './pages/Academy'
import { Tools } from './pages/Tools'
import { AIPage } from './pages/AIPage'
import { Impact } from './pages/Impact'
import { Plans } from './pages/Plans'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/academia" element={<Academy />} />
          <Route path="/herramientas" element={<Tools />} />
          <Route path="/inteligencia-artificial" element={<AIPage />} />
          <Route path="/impacto" element={<Impact />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
