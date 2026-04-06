import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GalleryPage } from './components/Gallery/GalleryPage';
import { PlaygroundPage } from './components/Playground/PlaygroundPage';
import { Header } from './components/shared/Header';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1"><GalleryPage /></main>
          </div>
        } />
        <Route path="/style/:styleId" element={<PlaygroundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
