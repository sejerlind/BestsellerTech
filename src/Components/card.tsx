import React, { useEffect, useState } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa"
import Season from "./season";

interface Location {
  name: string;
}
interface Origin {
  name: string;
}

interface Character {
  id: number;
  species: string;
  gender: string;
  name: string;
  status: string;
  location: Location;
  origin: Origin;
  episode: string[]
  image: string;
}

  interface Navigation {
    next: string | null;
    prev: string | null;
  }



function Card() {
  const [selected, setSelected] = useState(null);

  const toggle = (id:any) => {
    if (selected === id) {
      return setSelected(null)
    }
    setSelected(id)
  }
    const [page, setPage] = useState(1)
    const [Characters, setCharacters] = React.useState<Character[]>([]);
    const [navigation, setNavigation] = React.useState<Navigation>({ next: null, prev: null});
    const [totalPages, setTotalPages] = useState<number>(0);
    const [panelHeights, setPanelHeights] = useState<{ [key: number]: string }>({});
    const [inputValue, setInputValue] = useState<string>("");


    useEffect(() => {
      let card:any = document.querySelector(".card-wrapper");
      let noCards:any = document.querySelector(".noCharacters");
      let api = `https://rickandmortyapi.com/api/character/?name=${inputValue}&page=${page}`;
      axios
        .get(api)
        .then(res => {
          setCharacters(res.data.results);    
          setNavigation(res.data.info);    
          setTotalPages(res.data.info.pages);
          card.style.display = "block"; 
          noCards.style.display = "none" 
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            // Handle 404 error;
            card.style.display = "none";
            noCards.style.display = "flex"
          } else {
            // Handle other errors
            alert(err.message);
          }
        });
    }, [inputValue, page]);

    const extractEpisodeNumber = (url: string): string => {
      const match = /\/(\d+)$/.exec(url);
      return match ? match[1] : "";
    };

    useEffect(() => {
      const calculatePanelHeights = () => {
        const newPanelHeights: { [key: number]: string } = {};
        document.querySelectorAll(".accordion-panel").forEach((panel) => {
          const id = parseInt(panel.getAttribute("data-id") || "");
          newPanelHeights[id] = `${panel.scrollHeight}px`;
        });
        setPanelHeights(newPanelHeights);
      };
  
      calculatePanelHeights();
  
      window.addEventListener("resize", calculatePanelHeights);
      return () => window.removeEventListener("resize", calculatePanelHeights);
    }, [selected]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setPage(1);
    };

    const handleNextPage = () => {
      if (navigation.next) {
        setPage(page + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (navigation.prev) {
        setPage(page - 1);
      }
    };

    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    return (
      <>
        <div className="card">
        <input placeholder="Search" className="card-input" value={inputValue} onChange={handleInputChange} />
        <div className="card-navigation">
          <button className={`${page > 1 ? "work" : "disable"} card-button`} disabled={1 >= page} onClick={handlePrevPage}><FaIcons.FaChevronDown/></button>
          <span>Page {page} of {totalPages}</span>
          <button className={`${page < totalPages ? "work" : "disable"} card-button card-button__next`} disabled={page >= totalPages} onClick={handleNextPage}><FaIcons.FaChevronDown/></button>
        </div>
          <div className="card-heading">
            <p className="card-heading__content">Name</p>
            <p className="card-heading__content">Gender</p>
            <p className="card-heading__content">Species</p>
            <p className="card-heading__content">Status</p>
            <p className="card-heading__content">Location</p>
            <p className="card-heading__content">Episode</p>
          </div>
          <div className="noCharacters">
            <p>No characters to show 😭 </p>
          </div>
          <div className="card-wrapper">
          {Characters.map(character => (
              <div className="card-body" key={character.id} onClick={() => toggle(character.id)}>
                <h3 className="card-content__wrapper">
                  <button  type="button" aria-expanded={selected === character.id ? "true" : "false"} className="accordion-trigger" aria-controls={`sect${character.id}`} id={`accordion${character.id}id`}>
                    <p className="card-content__data">
                      <FaIcons.FaChevronDown className="accordion-icon" data-selected={selected === character.id ? 'is__selected' : 'not__selected'}/>
                      {character.name}
                    </p>
                    <p className="card-content__data">{character.gender}</p>
                    <p className="card-content__data">{character.species}</p>
                    <p className="card-content__data">{character.status}</p>
                    <p className="card-content__data">{character.location.name}</p>
                    <p className="card-content__data">{character.episode.length} Episodes</p>
                  </button>
                </h3>
                <div id={`sect${character.id}`} role="region" aria-labelledby={`accordion${character.id}id`} className="accordion-panel" data-hidden={selected === character.id ? "show" : "hidden"} data-id={character.id} style={{ maxHeight: selected === character.id ? panelHeights[character.id] || "none" : "0" }}>        
                  <div className="card-content">
                 <div className="card-content__data-wrapper">
                    <img className="card-content__data card-content__data-image" src={character.image} alt="profile pic" />
                    <div className="card-content__data-content">
                      <p className="card-content__data"><span className="card-content__data-title">Name:</span> {character.name}</p>
                      <p className="card-content__data"><span className="card-content__data-title">Gender:</span> {character.gender}</p>
                      <p className="card-content__data"><span className="card-content__data-title">Species:</span> {character.species}</p>
                      <p className="card-content__data"><span className="card-content__data-title">Status:</span> {character.status}</p>
                      <p className="card-content__data"><span className="card-content__data-title">Location:</span> {character.location.name}</p>
                      <p className="card-content__data"><span className="card-content__data-title">Origin:</span> {character.origin.name}</p>
                      <p className="card-content__data">Appears in {character.episode.length} episodes</p>
                    </div>
                  </div>
                  <div className="card-content__data-ep">
                      <div className="card-content__data-ep__titles">
                      <p className="card-content__data-ep__titles-name">Name of episode</p>
                      <p>Season</p>
                      <p>Episode</p>
                        </div> 
                      <div className="card-content__data-ep__content">
                  {character.episode.map(url => (
                    <Season key={url} test={extractEpisodeNumber(url)} className="card-content__data" />
                ))}
                </div>
                </div>
                  </div>
                </div>
                </div>
            ))}
          </div>
          <button className="card-button-top" onClick={topFunction}><FaIcons.FaChevronUp/></button>
        </div>
      </>
    )
}

export default Card