import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`${firebaseRoom.key}`);
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Room`s Name'
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>Create Room</Button>
          </form>
          <p>
            Would you like to get in an existing room?<Link to='/'>click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
