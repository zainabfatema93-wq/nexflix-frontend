import React from "react";
import toast from "react-hot-toast";
import RecommendedMovies from "../components/RecommendedMovies";

import { getAIRecommendations } from "../lib/AIModel";
const steps = [
  {
    name: "genre",
    label: "What is your preferred genre?",
    options: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"],
  },
  {
    name: "mood",
    label: "What is your current mood?",
    options: ["Happy", "Sad", "Excited", "Calm", "Adventurous"],
  },
  {
    name: "decade",
    label: "What decade do you prefer?",
    options: ["1980s", "1990s", "2000s", "2010s", "2020s"],
  },
  {
    name: "language",
    label: "What language do you prefer?",
    options: ["English", "Spanish", "French", "German", "Japanese"],
  },
  {
    name: "length",
    label: "What is your preferred movie length?",
    options: ["Short(1-2 hours)", "Medium(2-3 hours)", "Long(3+ hours)"],
  },
];
const initialState = {
  genre: "",
  mood: "",
  decade: "",
  language: "",
  length: "",
};

const AIRecommendations = () => {
  const [inputs, setInputs] = React.useState(initialState);
  const [step, setStep] = React.useState(0);
  const [recommendations, setRecommendations] = React.useState([]);
  const [loading, setIsLoading] = React.useState(false);

  const handleOption = (value) => {
    console.log("Selected option:", value);
    setInputs({ ...inputs, [steps[step].name]: value });
  };

  // Go to the next question
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };
  // Go to the previous question
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleGetAIRecommendations = async () => {
    if (
      !inputs.genre ||
      !inputs.mood ||
      !inputs.decade ||
      !inputs.language ||
      !inputs.length
    ) {
      toast.error("Please fill in all the fields before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const userPrompt = `Given the following user inputs:
Genre: ${inputs.genre}
Mood: ${inputs.mood}
Decade: ${inputs.decade}
Language: ${inputs.language}
Length: ${inputs.length}

Recommend 10 ${inputs.mood.toLowerCase()} ${inputs.language.toLowerCase()} ${inputs.genre.toLowerCase()} movies from the ${inputs.decade} decade with a runtime of ${inputs.length}.

Return the list as a plain JSON array like:
["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5", "Movie 6", "Movie 7", "Movie 8", "Movie 9", "Movie 10"]`;

      const result = await getAIRecommendations(userPrompt);
      setIsLoading(false);

      if (result) {
        const cleanedResult = result
          .replace(/```json/i, "")
          .replace(/```/i, "")
          .trim();

        try {
          const recommendationsArray = JSON.parse(cleanedResult);
          setRecommendations(recommendationsArray);
          console.log("AI Recommendations:", recommendationsArray);
        } catch (error) {
          console.error(error);
          toast.error("Invalid AI response.");
        }
      } else {
        toast.error("No recommendations found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to get recommendations.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181818] via-[#232323] to-[#181818] relative overflow-hidden">
      {!(recommendations && recommendations.length > 0) && (
        <img
          src="/NETFLIX_BACKGROUND_IMAGE.jpeg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[2px]"
        />
      )}

      {recommendations.length > 0 ? (
        <div className="relative w-full max-w-7xl mx-auto px-8 py-10">
          <h2 className="text-4xl font-extrabold text-white text-center mb-8">
            AI Movie Recommendations
          </h2>

          <RecommendedMovies movieTitles={recommendations} />
        </div>
      ) : (
        <div className="relative w-full max-w-md mx-auto rounded-2xl bg-[#181818]/90 shadow-2xl border border-[#333] px-8 py-10 mt-4 flex flex-col items-center min-h-[480px]">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-white tracking-tight drop-shadow-lg">
            AI Movie Recommendation
          </h2>
          <div className="w-full flex items-center mb-8">
            <div className="flex-1 h-2 bg-[#232323] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#e50914] transition-all duration-300"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-white text-sm font-semibold">
              {step + 1}/{steps.length}
            </span>
          </div>
          <div className="w-full flex flex-col flex-1">
            <div className=" mb-6 flex-1">
              <h3 className="text-lg font-semibold text-white mb-6 text-center">
                {steps[step].label}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {steps[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOption(option)}
                    className={`w-full py-3 rounded-xl border-2 transition font-semibold text-base flex items-center justify-center gap-2 focus:outline-none focus:ring-2 active:scale-95 duration-150 focus:ring-[#e50914] shadow-sm ${
                      inputs[steps[step].name] === option
                        ? "bg-[#e50914] border-[#e50914] text-white shadow-lg hover:bg-[#b0060f]"
                        : "bg-[#232323] border-[#444] text-white hover:bg-[#e50914]/80 hover:border-[#e50914]/80"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="px-6 py-2 rounded-lg font-semibold transition border-2 border-[#444] text-white bg-[#181818] hover:bg-[#232323]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={
                  step === steps.length - 1
                    ? handleGetAIRecommendations
                    : handleNext
                }
                disabled={loading || !inputs[steps[step].name]}
                className="px-6 py-2 rounded-lg font-semibold transition border-2 border-[#444] text-white bg-[#e50914] hover:bg-[#b0060f] ml-2"
              >
                {loading
                  ? "Loading..."
                  : step === steps.length - 1
                    ? "Finish"
                    : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
