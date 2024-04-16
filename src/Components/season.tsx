import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/accordion.scss";

interface Episode {
  id: number;
  name: string;
  episode: string;
}

function Season(props: any) {
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${props.test}`)
      .then((res) => {
        setEpisode(res.data); 
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [props.test]); 

  return (
    <>
      {episode ? (
        <div className="episode-detailes">
        <p className="episode-detailes__name">{episode.name}</p>
        <p className="episode-detailes__season">{episode.episode.substring(1,3)}</p>
        <p>{episode.episode.substring(4)}</p>
        </div>
      ) : (
        <p>No name was found</p>
      )}
    </>
  );
}

export default Season;