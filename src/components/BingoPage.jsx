import React, { useState } from "react";
import { Link, useLocation } from "react-router";

const FOOTBALL_WORDS = [
  "Touchdown",
  "Crowd cheers",
  "Instant replay",
  "Flag on play",
  "Field goal",
  "Coach yelling",
  "Timeout",
  "Missed tackle",
  "Overtime mention",
  "Winning prediction",
  "Quarterback scramble",
  "Fumble recovery",
  "Red zone play",
  "First down signal"
];

const COMMERCIAL_WORDS = [
  "Celebrity cameo",
  "Car commercial",
  "Insurance ad",
  "Fast food ad",
  "Brand slogan",
  "Mascot appears",
  "Funny commercial",
  "Emotional ad",
  "Product close-up",
  "Voice-over narrator",
  "Luxury brand ad",
  "Phone company ad"
];

const HALFTIME_WORDS = [
  "Halftime teaser",
  "Pop song plays",
  "Halftime outfit change",
  "Fireworks",
  "Drone camera",
  "Slow-motion shot",
  "Backup dancers",
  "Stage lights flash",
  "Crowd sings along",
  "Special guest appears",
  "Dance break",
  "Big ending pose"
];

const DEFAULT_WORDS = [
  "Touchdown",
  "Crowd cheers",
  "Instant replay",
  "Flag on play",
  "Field goal",
  "Celebrity cameo",
  "Car commercial",
  "Slow-motion shot",
  "Mascot appears",
  "Insurance ad",
  "Coach yelling",
  "Halftime teaser",
  "FREE",
  "Drone camera",
  "Timeout",
  "Pop song plays",
  "Fast food ad",
  "Confetti shot",
  "Brand slogan",
  "Laughing fans",
  "Missed tackle",
  "Halftime outfit change",
  "Fireworks",
  "Overtime mention",
  "Winning prediction"
];

const FREE_INDEX = 12;

function buildLines() {
  const lines = [];
  let rowIndex = 0;

  while (rowIndex < 5) {
    lines.push([
      rowIndex * 5 + 0,
      rowIndex * 5 + 1,
      rowIndex * 5 + 2,
      rowIndex * 5 + 3,
      rowIndex * 5 + 4
    ]);
    rowIndex = rowIndex + 1;
  }

  let columnIndex = 0;
  while (columnIndex < 5) {
    lines.push([
      0 * 5 + columnIndex,
      1 * 5 + columnIndex,
      2 * 5 + columnIndex,
      3 * 5 + columnIndex,
      4 * 5 + columnIndex
    ]);
    columnIndex = columnIndex + 1;
  }

  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);

  return lines;
}

function getCellStyle(index, markedSquares) {
  const buttonStyle = {
    minHeight: "120px",
    width: "100%",
    border: "2px solid #1f1f1f",
    borderRadius: "14px",
    background: "#fff",
    fontWeight: 600,
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "14px",
    lineHeight: "1.15",
    userSelect: "none",
    cursor: "pointer"
  };

  if (index === FREE_INDEX) {
    buttonStyle.background = "#6c757d";
    buttonStyle.color = "#fff";
    buttonStyle.borderColor = "#6c757d";
    buttonStyle.cursor = "not-allowed";
  }

  if (markedSquares.has(index)) {
    buttonStyle.background = "#212529";
    buttonStyle.color = "#fff";
    buttonStyle.borderColor = "#212529";
  }

  if (index === FREE_INDEX) {
    buttonStyle.background = "#6c757d";
    buttonStyle.color = "#fff";
    buttonStyle.borderColor = "#6c757d";
  }

  return buttonStyle;
}

function collectSelectedWords(categories) {
  let selectedWords = [];

  if (categories.includes("football")) {
    selectedWords = selectedWords.concat(FOOTBALL_WORDS);
  }

  if (categories.includes("commercials")) {
    selectedWords = selectedWords.concat(COMMERCIAL_WORDS);
  }

  if (categories.includes("halftime")) {
    selectedWords = selectedWords.concat(HALFTIME_WORDS);
  }

  if (selectedWords.length === 0) {
    selectedWords = DEFAULT_WORDS.slice();
  }

  return selectedWords;
}

function removeDuplicateWords(words) {
  const uniqueWords = [];
  let wordIndex = 0;

  while (wordIndex < words.length) {
    const currentWord = words[wordIndex];

    if (!uniqueWords.includes(currentWord)) {
      uniqueWords.push(currentWord);
    }

    wordIndex = wordIndex + 1;
  }

  return uniqueWords;
}

function buildDifficultyWords(words, difficulty) {
  let difficultyWords = words.slice();

  if (difficulty === "easy") {
    difficultyWords = difficultyWords.slice(0, 24);
  }

  if (difficulty === "medium") {
    const frontWords = difficultyWords.slice(0, 12);
    const backWords = difficultyWords.slice(Math.max(difficultyWords.length - 12, 0));
    difficultyWords = frontWords.concat(backWords);
  }

  if (difficulty === "hard") {
    difficultyWords = difficultyWords.slice().reverse();
    difficultyWords = difficultyWords.slice(0, 24);
  }

  return difficultyWords;
}

function fillCardWords(words) {
  const filledWords = words.slice();
  let defaultIndex = 0;

  while (filledWords.length < 24 && defaultIndex < DEFAULT_WORDS.length) {
    const fallbackWord = DEFAULT_WORDS[defaultIndex];

    if (fallbackWord !== "FREE" && !filledWords.includes(fallbackWord)) {
      filledWords.push(fallbackWord);
    }

    defaultIndex = defaultIndex + 1;
  }

  return filledWords;
}

function insertFreeSpace(words) {
  const cardWords = words.slice(0, 24);
  cardWords.splice(FREE_INDEX, 0, "FREE");
  return cardWords;
}

function buildCardWords(categories, difficulty, customWord) {
  let selectedWords = collectSelectedWords(categories);
  selectedWords = removeDuplicateWords(selectedWords);
  selectedWords = buildDifficultyWords(selectedWords, difficulty);

  if (customWord.trim().length > 0) {
    if (selectedWords.length > 0) {
      selectedWords[0] = customWord.trim();
    } else {
      selectedWords.push(customWord.trim());
    }
  }

  selectedWords = removeDuplicateWords(selectedWords);
  selectedWords = fillCardWords(selectedWords);

  return insertFreeSpace(selectedWords);
}

function BingoPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedCategories = searchParams.getAll("category");
  const selectedDifficulty = searchParams.get("difficulty") || "medium";
  const customWord = searchParams.get("customWord") || "";

  const cardWords = buildCardWords(
    selectedCategories,
    selectedDifficulty,
    customWord
  );

  const bingoLines = buildLines();

  const [markedSquares, setMarkedSquares] = useState(() => {
    return new Set([FREE_INDEX]);
  });

  function toggleMark(index) {
    if (index === FREE_INDEX) {
      return;
    }

    setMarkedSquares((previousMarkedSquares) => {
      const nextMarkedSquares = new Set(previousMarkedSquares);

      if (nextMarkedSquares.has(index)) {
        nextMarkedSquares.delete(index);
      } else {
        nextMarkedSquares.add(index);
      }

      return nextMarkedSquares;
    });
  }

  function clearMarks() {
    setMarkedSquares(new Set([FREE_INDEX]));
  }

  let hasBingo = false;
  let lineIndex = 0;

  while (lineIndex < bingoLines.length) {
    const currentLine = bingoLines[lineIndex];
    let allMarked = true;

    let itemIndex = 0;
    while (itemIndex < currentLine.length) {
      if (!markedSquares.has(currentLine[itemIndex])) {
        allMarked = false;
      }
      itemIndex = itemIndex + 1;
    }

    if (allMarked) {
      hasBingo = true;
    }

    lineIndex = lineIndex + 1;
  }

  let statusText = "No bingo yet — keep watching 👀";
  if (hasBingo) {
    statusText = "BINGO! You got it!";
  }

  let statusClassName = "text-muted";
  if (hasBingo) {
    statusClassName = "fw-bold";
  }

  const pageWrapStyle = {
    paddingTop: "24px",
    paddingBottom: "24px"
  };

  const titleStyle = {
    fontSize: "44px",
    fontWeight: 800,
    marginBottom: "6px",
    textAlign: "center"
  };

  const subtitleStyle = {
    textAlign: "center",
    color: "#6c757d",
    marginBottom: "18px"
  };

  const settingsSummaryStyle = {
    textAlign: "center",
    color: "#6c757d",
    marginBottom: "16px"
  };

  const controlsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "22px"
  };

  const gridWrapStyle = {
    display: "flex",
    justifyContent: "center"
  };

  const gridStyle = {
    width: "min(920px, 100%)",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "14px"
  };

  const statusWrapStyle = {
    textAlign: "center",
    marginTop: "22px"
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid #dee2e6",
    background: "#f8f9fa",
    fontWeight: 700,
    marginTop: "10px"
  };

  const markedSquareCount = markedSquares.size;

  let settingsSummaryText = "Difficulty: " + selectedDifficulty;
  if (customWord.trim().length > 0) {
    settingsSummaryText = settingsSummaryText + " • Custom word: " + customWord.trim();
  }

  const cardButtonElements = cardWords.map((word, index) => {
    let isDisabled = false;

    if (index === FREE_INDEX) {
      isDisabled = true;
    }

    return (
      <button
        key={index}
        type="button"
        disabled={isDisabled}
        style={getCellStyle(index, markedSquares)}
        onClick={() => {
          toggleMark(index);
        }}
      >
        {word}
      </button>
    );
  });

  return (
    <main className="container" style={pageWrapStyle}>
      <h2 style={titleStyle}>Your Bingo Card</h2>
      <p style={subtitleStyle}>Click a square when it happens during the game!</p>
      <p style={settingsSummaryStyle}>{settingsSummaryText}</p>

      <div style={controlsStyle}>
        <Link to="/bingo-settings" className="btn btn-outline-dark">
          Back to Settings
        </Link>
        <button type="button" className="btn btn-dark" onClick={clearMarks}>
          Clear Marks
        </button>
      </div>

      <div style={gridWrapStyle}>
        <div style={gridStyle}>{cardButtonElements}</div>
      </div>

      <div style={statusWrapStyle}>
        <p className="fw-bold mb-1">Progress:</p>
        <p className={statusClassName} style={{ marginBottom: "0px" }}>
          {statusText}
        </p>
        <div>
          <span style={badgeStyle}>Marked: {markedSquareCount}/25</span>
        </div>
      </div>
    </main>
  );
}

export default BingoPage;