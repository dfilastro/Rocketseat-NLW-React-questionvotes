import { useNavigate } from 'react-router-dom';

import { auth, firebase } from '../services/firebase';

// webpack {snowpack, vite, ...}
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function Home() {
  const navigate = useNavigate();

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then((result) => {
      console.log(result);

      navigate('/rooms/new');
    });
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
          <form>
            <input type='text' placeholder='Type the room`s code' />
            <Button type='submit'>Get in the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
