import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

function toTitleCase(word) {
  if (!word) {
    return word;
  }

  if (word.length === 0) {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

function BingoSettingsPage() {
  const navigate = useNavigate();

  const [football, setFootball] = useState(false);
  const [commercials, setCommercials] = useState(false);
  const [halftime, setHalftime] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");
  const [customWord, setCustomWord] = useState("");
  const [showError, setShowError] = useState(false);

  function selectedCategories() {
    const categories = [];

    if (football) {
      categories.push("football");
    }

    if (commercials) {
      categories.push("commercials");
    }

    if (halftime) {
      categories.push("halftime");
    }

    return categories;
  }

  function validate() {
    const categories = selectedCategories();

    if (categories.length === 0) {
      setShowError(true);
      return false;
    }

    setShowError(false);
    return true;
  }

  function resetForm() {
    setFootball(false);
    setCommercials(false);
    setHalftime(false);
    setDifficulty("medium");
    setCustomWord("");
    setShowError(false);
  }

  async function onSubmit(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const categories = selectedCategories();
    const params = new URLSearchParams();

    let categoryIndex = 0;
    while (categoryIndex < categories.length) {
      params.append("category", categories[categoryIndex]);
      categoryIndex = categoryIndex + 1;
    }

    params.set("difficulty", difficulty);

    const trimmedCustomWord = customWord.trim();
    if (trimmedCustomWord.length > 0) {
      params.set("customWord", trimmedCustomWord);
    }

    const bingoSessionRef = ref(database, "bingoSessions/" + Date.now());

    await set(bingoSessionRef, {
      categories: categories,
      difficulty: difficulty,
      customWord: trimmedCustomWord
    });

    navigate("/bingo?" + params.toString());
  }

  useEffect(() => {
    if (showError) {
      validate();
    }
  }, [football, commercials, halftime, showError]);

  const selectedCategoryArray = selectedCategories();

  let categoriesSummary = "Categories: none";
  if (selectedCategoryArray.length > 0) {
    const formattedCategories = [];
    let categoryIndex = 0;

    while (categoryIndex < selectedCategoryArray.length) {
      formattedCategories.push(toTitleCase(selectedCategoryArray[categoryIndex]));
      categoryIndex = categoryIndex + 1;
    }

    categoriesSummary = "Categories: " + formattedCategories.join(", ");
  }

  const difficultySummary = "Difficulty: " + toTitleCase(difficulty);

  let customSummary = "Custom: none";
  const trimmedCustomWord = customWord.trim();
  if (trimmedCustomWord.length > 0) {
    customSummary = "Custom: " + trimmedCustomWord;
  }

  const errorClassName = "text-danger mt-2" + (showError ? "" : " d-none");

  return (
    <div>
      <main className="container my-5">
        <div className="mx-auto card shadow-sm p-4 p-md-5 settings-card">
          <div className="mb-4">
            <h2 className="mb-1">Customize Your Bingo Card</h2>
            <p className="form-help mb-0">
              Pick what you care about, then generate your bingo card.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate>
            <fieldset className="mb-4">
              <legend className="h5 mb-2">Buzzword Categories</legend>
              <p className="form-help mb-3">Choose at least one category.</p>

              <div className="d-flex flex-wrap gap-2">
                <label className="chip">
                  <input
                    className="form-check-input m-0"
                    type="checkbox"
                    checked={football}
                    onChange={(event) => {
                      setFootball(event.target.checked);
                    }}
                  />
                  <span>Football moments</span>
                </label>

                <label className="chip">
                  <input
                    className="form-check-input m-0"
                    type="checkbox"
                    checked={commercials}
                    onChange={(event) => {
                      setCommercials(event.target.checked);
                    }}
                  />
                  <span>Commercials</span>
                </label>

                <label className="chip">
                  <input
                    className="form-check-input m-0"
                    type="checkbox"
                    checked={halftime}
                    onChange={(event) => {
                      setHalftime(event.target.checked);
                    }}
                  />
                  <span>Halftime show</span>
                </label>
              </div>

              <div className={errorClassName}>
                Please select at least one category.
              </div>
            </fieldset>

            <div className="mb-4">
              <label htmlFor="difficulty" className="form-label h5">
                Bingo difficulty
              </label>

              <select
                id="difficulty"
                className="form-select"
                value={difficulty}
                onChange={(event) => {
                  setDifficulty(event.target.value);
                }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <div className="form-help mt-2">
                Easy = common moments • Hard = rarer moments
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="customWord" className="form-label h5">
                Optional custom buzzword
              </label>

              <input
                type="text"
                id="customWord"
                className="form-control"
                maxLength={30}
                placeholder="Type a word or phrase (max 30 chars)"
                value={customWord}
                onChange={(event) => {
                  setCustomWord(event.target.value);
                }}
              />

              <div className="form-help mt-2">
                Example: “Dog in a commercial” or “Crazy halftime outfit”
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <span className="summary-pill">{categoriesSummary}</span>
                <span className="summary-pill">{difficultySummary}</span>
                <span className="summary-pill">{customSummary}</span>
              </div>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-dark" type="submit">
                Generate Bingo Card
              </button>

              <button
                className="btn btn-outline-dark"
                type="button"
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default BingoSettingsPage;