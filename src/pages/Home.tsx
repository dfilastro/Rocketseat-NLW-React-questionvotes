import { useNavigate } from 'react-router-dom';

// webpack {snowpack, vite, ...}
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) await signInWithGoogle();

    navigate('/rooms');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    navigate(`/rooms/${roomCode}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='question symbol illustration' />
        <strong>Create rooms of Q&amp;A Live</strong>
        <p>Solve questions of your audience in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='letmeask logo' />
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt='Google`s logo' />
            Create your room with Google
          </button>
          <div className='separator'>Or get into a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Type the room`s code'
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type='submit'>Get in the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
