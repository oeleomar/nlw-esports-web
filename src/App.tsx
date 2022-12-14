import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GamerBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const data = async () => {
      const banners = await axios('http://localhost:3333/games');
      setGames(banners.data);
    };
    data();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="Logo da NLW eSPORTS" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
              title={game.title}
              key={game.id}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
