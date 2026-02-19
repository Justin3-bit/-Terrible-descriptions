import { useState } from “react”;

// ─── DATA ───────────────────────────────────────────────────────────────────
const movies = [
{
id: 1,
title: “The Godfather”,
terriblePlot: “Old Italian man refuses to help a friend, gets shot, then his son becomes a murderer”,
image: “https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg”,
year: 1972,
},
{
id: 2,
title: “Titanic”,
terriblePlot: “Woman lets her boyfriend drown to protect a necklace she throws into the ocean anyway”,
image: “https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg”,
year: 1997,
},
{
id: 3,
title: “The Lion King”,
terriblePlot: “Baby cat watches his dad get trampled, runs away, then comes back years later to fight his uncle over HR dispute”,
image: “https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg”,
year: 1994,
},
{
id: 4,
title: “Home Alone”,
terriblePlot: “Parents forget their kid and two idiots get brutally tortured by an 8-year-old”,
image: “https://upload.wikimedia.org/wikipedia/en/1/1a/Home_alone_poster.jpg”,
year: 1990,
},
{
id: 5,
title: “The Matrix”,
terriblePlot: “Guy takes a pill from a stranger and finds out his whole life is fake, gets a new job fighting robots”,
image: “https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg”,
year: 1999,
},
{
id: 6,
title: “Jurassic Park”,
terriblePlot: “Billionaire opens a zoo but the animals escape because a guy wanted extra money”,
image: “https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg”,
year: 1993,
},
{
id: 7,
title: “Finding Nemo”,
terriblePlot: “Helicopter dad crosses an entire ocean to rescue his son who could’ve just waited at the dentist”,
image: “https://upload.wikimedia.org/wikipedia/en/2/29/Finding_Nemo.jpg”,
year: 2003,
},
{
id: 8,
title: “The Dark Knight”,
terriblePlot: “Billionaire in a bat costume gets outperformed at his own job by a guy in clown makeup”,
image: “https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg”,
year: 2008,
},
];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const styles = `
@import url(‘https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap’);

- { box-sizing: border-box; margin: 0; padding: 0; }

body {
background: #f7f5f2;
font-family: ‘DM Sans’, sans-serif;
min-height: 100vh;
}

.app {
min-height: 100vh;
background: #f7f5f2;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 24px 16px;
}

.header {
text-align: center;
margin-bottom: 40px;
}

.header-eyebrow {
font-family: ‘DM Sans’, sans-serif;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #999;
margin-bottom: 12px;
}

.header-title {
font-family: ‘Playfair Display’, serif;
font-size: clamp(28px, 5vw, 42px);
font-weight: 900;
color: #1a1a1a;
line-height: 1.1;
}

.header-title em {
font-style: italic;
color: #888;
}

.card {
background: #fff;
border-radius: 4px;
width: 100%;
max-width: 420px;
overflow: hidden;
box-shadow: 0 2px 24px rgba(0,0,0,0.07);
}

.card-image-wrap {
position: relative;
width: 100%;
aspect-ratio: 2/3;
overflow: hidden;
background: #e8e4de;
}

.card-image {
width: 100%;
height: 100%;
object-fit: cover;
display: block;
filter: blur(0);
transition: filter 0.4s ease;
}

.card-image.blurred {
filter: blur(28px) brightness(0.85);
transform: scale(1.08);
}

.year-badge {
position: absolute;
top: 14px;
right: 14px;
background: rgba(255,255,255,0.92);
font-family: ‘DM Sans’, sans-serif;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.12em;
color: #555;
padding: 4px 10px;
border-radius: 2px;
}

.card-body {
padding: 28px 28px 24px;
}

.plot-label {
font-size: 10px;
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #bbb;
margin-bottom: 10px;
}

.plot-text {
font-family: ‘Playfair Display’, serif;
font-size: 18px;
font-weight: 700;
color: #1a1a1a;
line-height: 1.45;
margin-bottom: 24px;
}

.reveal-section {
border-top: 1px solid #f0ede8;
padding-top: 20px;
}

.answer-row {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 16px;
min-height: 32px;
}

.answer-label {
font-size: 10px;
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
color: #bbb;
}

.answer-title {
font-family: ‘Playfair Display’, serif;
font-size: 20px;
font-weight: 900;
color: #1a1a1a;
animation: fadeUp 0.35s ease;
}

@keyframes fadeUp {
from { opacity: 0; transform: translateY(6px); }
to   { opacity: 1; transform: translateY(0); }
}

.btn-row {
display: flex;
gap: 10px;
}

.btn {
flex: 1;
padding: 12px 0;
border: none;
border-radius: 3px;
font-family: ‘DM Sans’, sans-serif;
font-size: 13px;
font-weight: 500;
letter-spacing: 0.04em;
cursor: pointer;
transition: opacity 0.15s, transform 0.1s;
}

.btn:active { transform: scale(0.98); }

.btn-reveal {
background: #1a1a1a;
color: #fff;
}

.btn-reveal:hover { opacity: 0.85; }

.btn-next {
background: #f0ede8;
color: #1a1a1a;
}

.btn-next:hover { background: #e8e4de; }

.counter {
text-align: center;
margin-top: 20px;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.1em;
color: #ccc;
}

.dots {
display: flex;
justify-content: center;
gap: 6px;
margin-top: 16px;
}

.dot {
width: 5px;
height: 5px;
border-radius: 50%;
background: #ddd;
transition: background 0.2s;
}

.dot.active { background: #1a1a1a; }
`;

// ─── COMPONENT ───────────────────────────────────────────────────────────────
function shuffle(arr) {
return […arr].sort(() => Math.random() - 0.5);
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
<>
<style>{styles}</style>
<div className="app">
<div className="header">
<p className="header-eyebrow">Movie Trivia</p>
<h1 className="header-title">
Guess the movie,<br />
<em>terribly explained</em>
</h1>
</div>

```
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
        <p className="plot-text">"{movie.terriblePlot}"</p>

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
        </div>
      </div>
    </div>

    <div className="dots">
      {queue.map((_, i) => (
        <div key={i} className={`dot${i === index ? " active" : ""}`} />
      ))}
    </div>

    <p className="counter">{index + 1} / {total}</p>
  </div>
</>
```

);
}
