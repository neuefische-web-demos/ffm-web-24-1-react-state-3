import { useEffect, useState } from "react";
import "./styles.css";
import Movie from "./components/Movie/index.js";
import Form from "./components/Form";
import { uid } from "uid";

const initialMovieData = [
  {
    id: "28djdh72",
    name: "The Incredible Hulk",
    isLiked: false,
  },
  {
    id: "dknseu2",
    name: "Spiderman 1-25",
    isLiked: false,
  },
  {
    id: "dkwi02ksk",
    name: "Lord of the Rings",
    isLiked: true,
  },
];

export default function App() {
  const [movies, setMovies] = useState(initialMovieData);
  useEffect(() => console.log('movies state after change', movies), [movies]);

  function handleAddMovie(newMovie){
    setMovies([...movies, {
      id: uid(),
      ...newMovie
    }])
  }

  function handleDeleteMovie(id){
    console.log('before delete', movies);
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  function handleToggleLike(id){
    setMovies(
      movies.map((movie) =>
        // ternary operator: condition ? if true : if false;
        movie.id === id ? {...movie, isLiked: !movie.isLiked } : movie
      )
    );
  }

  return (
    <div className="app">
      <h1>Favorite Movies</h1>
      <ul className="list">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Movie name={movie.name} isLiked={movie.isLiked} id={movie.id} 
            onDeleteMovie={handleDeleteMovie} onToggleLike={handleToggleLike} />
          </li>
        ))}
      </ul>
      <Form onAddMovie={handleAddMovie} />
    </div>
  );
}
