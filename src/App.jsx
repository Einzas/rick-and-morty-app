import axios from "axios";
import { useEffect, useState } from "react";
import { getRandomDimension } from "./helpers/random";
import Location from "./components/Location";
import ResidentList from "./components/ResidentList";
import Header from "./components/Header";

function App() {
  const [location, setLocation] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleMusic = () => {
    const audioElement = document.getElementById("background-music");
    if (isMusicPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };
  const handleInputChange = async (e) => {
    const query = e.target.value;
    if (query) {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location/?name=${query}`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions([]);
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = e.target.locationId.value;
    const URL = `https://rickandmortyapi.com/api/location/${newLocation}`;
    axios
      .get(URL)
      .then((res) => {
        setLocation(res.data);
        setSuggestions([]);
        e.target.locationId.value = "";
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const URL = `https://rickandmortyapi.com/api/location/${getRandomDimension()}`;
    axios
      .get(URL)
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="App min-h-screen bg-[url(/images/bg.png)] px-5 pb-5 ">
      <Header />
      <audio id="background-music" src="/songs/song.mp3" loop />
      <button
        className="fixed top-5 right-5 bg-green-600 px-3 py-2 rounded-full text-white"
        onClick={toggleMusic}
      >
        {isMusicPlaying ? (
          <i className="bx bx-pause"></i>
        ) : (
          <i className="bx bx-play"></i>
        )}
      </button>
      <div className="mt-5 flex flex-col items-center justify-center ">
        <div className="pt-5 relative">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Type a location name..."
              type="text"
              className="border-2 text-gray-200 border-green-300 p-2 bg-transparent"
              onChange={handleInputChange}
              name="locationId"
              id="locationId"
            />
            <button className="border-2 border-green-300 p-2 bg-green-600 ">
              <i className="bx bx-search "></i>
            </button>
            <ul className="absolute bg-white text-black mt-2 w-full max-h-64 overflow-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setLocation(suggestion);
                    setSuggestions([]);
                    locationId.value = "";
                  }}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </form>
        </div>
        <h2 className="mt-5 mb-5 text-green-300">
          Welcome to the crazy universe!
        </h2>
        <Location location={location} />
        <ResidentList location={location} />
      </div>
      {showScrollToTop && (
        <button
          className="fixed bottom-5 right-5 bg-green-600 px-3 py-2 rounded-[100%]"
          onClick={scrollToTop}
        >
          <i className="bx bx-chevron-up text-white"></i>
        </button>
      )}
    </div>
  );
}

export default App;
