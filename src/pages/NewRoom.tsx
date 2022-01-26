import { Link } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
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
          <form>
            <input type='text' placeholder='Room`s Name' />
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
