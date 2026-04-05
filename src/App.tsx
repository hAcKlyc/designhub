import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GalleryPage } from './components/Gallery/GalleryPage';
import { PlaygroundPage } from './components/Playground/PlaygroundPage';
import { Header } from './components/shared/Header';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/style/:styleId" element={<PlaygroundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
