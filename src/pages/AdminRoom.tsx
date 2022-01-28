import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId!);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const questionRef = await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='letmeask' />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined>Close Room</Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} Question(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map((question) => {
            return (
              <Question
                key={question.id} // algorítmo de reconciliação
                content={question.content}
                author={question.author}
              >
                <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt='Remove question' />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
