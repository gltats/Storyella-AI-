let button = document.querySelector("button");
let key = "58f070a40818f233c2b84bto089b72e4";

function showAnswer(response) {
  let joke = response.data.answer;
  let changeDiv = document.querySelector("#ai-answer");

  let styles = {
	padding: "15px",
	margin: "15px",
	border: "1px solid red",
	borderRadius: "20px",
	backgroundColor: "lightyellow",
	color: "darkred",
  };

  Object.assign(changeDiv.style, styles);

  let typewrite = new Typewriter(changeDiv, {
	strings: joke,
	cursor: null,
	delay: 50,
	autoStart: true,
  });
}

document.querySelector("#prompt-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let userPrompt = document.querySelector("#user-prompt").value;
  let justSigns = userPrompt.replace(/[^\W_]+/g, "");
  let numbers = /\b(?!42\b)\d+\b/;
  let justSpaces = " ".repeat(userPrompt.length);
  let nosense = /[^\w\s]/g;

  if (userPrompt === "" || userPrompt === justSpaces || userPrompt === justSigns || userPrompt.match(numbers) || userPrompt.match(nosense)) {
	alert("Please enter a prompt!");
	return;
  }

  let vowels = userPrompt.match(/[aeiouAEIOU]/g) || [];
  let consonants = userPrompt.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || [];
  if (consonants.length / userPrompt.length > 0.7 || vowels.length === 0) {
    alert("Please enter a more meaningful prompt!");
    return;
  }

  if (userPrompt.length > 100) {
    alert("Please enter a prompt with max 100 characters!");
    return;
  }

  let question = {
	prompt: userPrompt,
	context: "Please make it short, maybe 2-3 sentence, if its a number invent a story around it and if it's the number 42 tell a story about how is the answer of life (The hitchhiker's guide to the galaxy).",
  };

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
	question.prompt
  )}&context=${encodeURIComponent(question.context)}&key=${key}`;

  axios.get(apiUrl).then(showAnswer);
});