import { useState } from "react";
import { movies } from "../data/movies";
import "../styles/MovieGuesser.css";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function MovieGuesser() {
  const [queue] = useState(() => shuffle(movies));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const movie = queue[index];
  const total = queue.length;

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    setRevealed(false);
    setIndex((prev) => (prev + 1) % total);
  }

  return (
    <div className="app">
      <div className="header">
        <p className="header-eyebrow">Movie Trivia</p>
        <h1 className="header-title">
          Guess the movie,<br />
          <em>terribly explained</em>
        </h1>
      </div>

      <div className="card">
        <div className="card-image-wrap">
          <img
            key={movie.id}
            src={movie.image}
            alt={revealed ? movie.title : "Mystery movie"}
            className={`card-image${revealed ? "" : " blurred"}`}
          />
          <span className="year-badge">{movie.year}</span>
        </div>

        <div className="card-body">
          <p className="plot-label">The plot</p>
          <p className="plot-text">{movie.terriblePlot}</p>

          <div className="reveal-section">
            <div className="answer-row">
              <span className="answer-label">The movie</span>
              {revealed && (
                <span className="answer-title">{movie.title}</span>
              )}
            </div>
            <div className="btn-row">
              {!revealed ? (
                <button className="btn btn-reveal" onClick={handleReveal}>
                  Reveal Answer
                </button>
              ) : (
                <button className="btn btn-reveal" onClick={handleNext}>
                  Next Movie →
                </button>
              )}
            </div>
            {/* <div className="btn-row">
              
                <button className="btn btn-reveal" onClick={handleReveal}>
                  Reveal Answer
                </button>
                <button className="btn btn-reveal" onClick={handleNext}>
                  Next Movie →
                </button>
            </div> */}
           

          </div>
        </div>
      </div>

      {/* <div className="dots">
        {queue.map((_, i) => (
          <div key={i} className={`dot${i === index ? " active" : ""}`} />
        ))}
      </div> */}

      {/* <p className="counter">{index + 1} / {total}</p> */}
    </div>
  );
}
