import { useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface.tsx';
import './SavedCandidates.css';



const SavedCandidates = () => {
    const [user, setUser] = useState<Candidate[]>(() => {
        const savedUsers = localStorage.getItem('savedUsers');

        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const rejectUser = (index: number) => {
        const updateUsers = user.filter((_, i) => i !== index);
        localStorage.setItem('savedUsers', JSON.stringify(updateUsers));
        setUser(updateUsers); 
    };


    const rows: JSX.Element[] = [];
    user.forEach((user, index) => {
        rows.push(
            <section key={index}>
                <div className='candidate-info'>
                    <div className='candidate-image-container'>
                    <img className='candidate-image' src={`${user.avatar_url}`} alt='candidate'></img>
                    </div>
                    <p className='candidate-name'>{user.login}</p>
                    <p className='candidate-location'>{user.location}</p>
                    <p className='candidate-email'>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                    <p className='candidate-company'>Company: {user.company}</p>
                    <p className='candidate-bio'>{user.bio}</p>
                    <button onClick={() => rejectUser(index)}>Reject</button>
                </div>
                </section>
        );
    }
    );

    return (
        <>
        <h1>Potential Candidates</h1>

        <main>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Company</th>
                <th>Bio</th>
                <th>Reject</th>
              </tr>

            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </main>
        </>

    );
  };

    export default SavedCandidates;
  


