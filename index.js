import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import he from "he";

const app = express();
const port = 3000;
const API_URL = "https://opentdb.com/api.php";
let correctAnswers = [];
let quizQuestions = [];
let userAnswers = []; // Add this line

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  correctAnswers = [];
  quizQuestions = [];
  userAnswers = []; // Add this line
  res.render("index.ejs");
});

app.get("/questions", (req, res) => {
  correctAnswers = [];
  quizQuestions = [];
  userAnswers = []; // Add this line
  setTimeout(() => {
    res.render("questions.ejs");
  }, 400);
});

app.post("/showquestions", async (req, res) => {
  try {
    const commonParams = {
      amount: req.body.amount,
      difficulty: req.body.difficulty,
      category: req.body.category,
      type: req.body.type,
    };

    let result;

    if (req.body.category === "any") {
      // Update commonParams based on conditions
      delete commonParams.category;
    }

    if (req.body.difficulty === "any") {
      // Update commonParams based on conditions
      delete commonParams.difficulty;
    }

    if (req.body.type === "any") {
      // Update commonParams based on conditions
      delete commonParams.type;
    }

    result = await axios.get(API_URL, { params: commonParams });

    console.log(result.data.results);
    let questions = result.data.results;

    var totalItems = req.body.amount;

    for (let i = 0; i < result.data.results.length; i++) {
      correctAnswers.push(result.data.results[i].correct_answer);
      quizQuestions.push(result.data.results[i].question);
    }

    console.log(correctAnswers);

    setTimeout(() => {
      res.render("showques.ejs", { newQuestions: result.data.results });
    }, 1500);
  } catch (error) {
    console.error("Error during API request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/submit-quiz", (req, res) => {
  // Assuming correctAnswers contains the correct answers
  userAnswers = req.body;
  console.log(userAnswers);

  // Calculate the user's score
  const score = calculateScore(userAnswers);
  const userPercent = percentageScore(score, correctAnswers.length);

  // Determine user's performance based on the score
  const performance = determinePerformance(score);

  // Render the result page with the user's score and custom message
  setTimeout(() => {
    res.render("result.ejs", {
      score: userPercent,
      performance: performance,
    });
  }, 1500);
});

// Helper function to calculate the user's score
function calculateScore(userAnswers) {
  let score = 0;

  for (let i = 0; i < correctAnswers.length; i++) {
    const userAnswer = decodeHTMLEntities(userAnswers[`question${i}`]);
    const correctAnswer = decodeHTMLEntities(correctAnswers[i]);

    if (normalizeString(userAnswer) === normalizeString(correctAnswer)) {
      score++;
    }
  }

  return score;
}

// Helper function to decode HTML entities
function decodeHTMLEntities(html) {
  return he.decode(html);
}

// Helper function to normalize strings (remove extra spaces and make it case-insensitive)
function normalizeString(str) {
  return str.trim().toLowerCase();
}

function percentageScore(userScore, totalScore) {
  return (userScore / totalScore) * 100;
}

// Helper function to determine user's performance based on the score
function determinePerformance(score) {
  if (score === correctAnswers.length) {
    return `Congrations! You got ${score} out of ${correctAnswers.length} questions correctly. Great Job!`;
  } else if (score >= correctAnswers.length / 2) {
    return `Weldone! You got ${score} out of ${correctAnswers.length} questions correctly, more than half of the questions right.`;
  } else {
    return `You got ${score} out of ${correctAnswers.length} questions. Keep practicing. You can improve!`;
  }
}

app.get("/viewAnswers", (req, res) => {
  // Pass userAnswers and correctAnswers to the viewAnswers template
  console.log(userAnswers);
  console.log(correctAnswers);
  console.log(quizQuestions);
  res.render("viewAnswers.ejs", {
    userAnswers1: userAnswers, // Replace with the actual variable containing user answers
    correctAnswers1: correctAnswers, // Replace with the actual variable containing correct answers
    quizQuestions1: quizQuestions,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
