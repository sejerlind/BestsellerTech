import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../Styles/accordion.scss'


interface Character {
  id: number;
  species: string;
  gender: string;
  name: string;
  image: string;
}

function SoloChar() {
  const [character, setCharacter] = React.useState<Character | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => {
        setCharacter(res.data);
      })
      .catch(err => {
        alert(err.message);
      });
  }, [id]);

  return (
    <div>
      {character && (
        <div>
          <h2>{character.name}</h2>
          <h2>{character.gender}</h2>
          <img src={character.image} alt="profile pic" />

        </div>
      )}
    </div>
  );
}

export default SoloChar;