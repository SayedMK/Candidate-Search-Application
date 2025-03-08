import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API.tsx";

import { Candidate } from "../interfaces/Candidate.interface.tsx";
import CandidateCard from "../components/CandidateCard.tsx";

import './CandidateSearch.css';



const CandidateSearch = () => {
  const [index, setIndex] = useState<number>(0);
  const [candidateList, setCandidateList] = useState<Candidate[]>([]);
  const [savedUsers, setSavedUsers] = useState<Candidate[]>([]);
  const [users, setUsers] = useState<Candidate[]>([]);


  useEffect(() => {
    const getUserData = async () => {
      try {
        const candidates: Candidate[] = await searchGithub();
        setCandidateList(candidates);
        
        const getUserDetails = await Promise.all(
          candidates.map(async (user: Candidate) => {
            const userDetails: Candidate = await searchGithubUser(user.login);
            return userDetails;
          })
        );

        setUsers(getUserDetails);
      } catch (error) {
        console.error(error);
      } 
    };
    getUserData();
  }, []);

  useEffect(() => {
    console.log('Candidate List:', candidateList);
    console.log('User Details:', users);
  }, [candidateList, users]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('savedUsers');
    if (savedUsers) {
      setSavedUsers(JSON.parse(savedUsers));
    }
  }, []);

  const currentUser = users[index];

  const nextUser = () => {
    setIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const saveUser = () => {
    const updateSavedUser = [...savedUsers, currentUser];
    setSavedUsers(updateSavedUser);

    localStorage.setItem('savedUsers', JSON.stringify(updateSavedUser));

    nextUser();
    
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      <div className = 'candidate-card'>
        {users.length > 0 && <CandidateCard user={currentUser} />}
      </div>

      <div className = 'button-container'>
        <button id='next-button' onClick={nextUser}>Next</button>
        <button  id='save-button'  onClick={saveUser}>Save</button>
        </div>

    </div>
  );
};

//get the data from the api
//display the data on the cardbox component

//disply add and delete button 

//save the data to the local storage when the user clicks on the save button

export default CandidateSearch;
