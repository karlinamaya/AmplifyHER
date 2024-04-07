$(document).ready(function() {
  var selections = []; // Array containing user choices
  var quiz = $('#quiz'); // Quiz div object

  // Display initial question
  displayQuestion();

  // Event listener for answer choice buttons to redirect based on genre
  $(document).on('click', '.answer-button', function() {
    var choiceIndex = $(this).data('index');
    var genres = ["ambient", "afrobeat", "blues", "classical", "country", "disco", "dubstep", "edm", "funk", "gospel", "house", "indie", "jazz", "latin", "opera", "pop", "punk", "reggae", "rock", "soul"];
    
    // Check if the choice index is within bounds
    if (choiceIndex >= 0 && choiceIndex < genres.length) {
      var selectedGenre = genres[choiceIndex];
      window.location.href = '/quiz/genres/' + selectedGenre + '.html'; // Redirect based on genre
    } else {
      console.error('Invalid choice index.');
    }
  });

  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement() {
    var qElement = $('<div>', {
      class: 'question-container',
      id: 'question'
    });

    var question = $('<p>').append("Select a genre"); // Only one question
    qElement.append(question);

    var answerButtons = createAnswerButtons();
    qElement.append(answerButtons);

    return qElement;
  }

  // Creates rectangular answer choice buttons
  function createAnswerButtons() {
    var buttonContainer = $('<div class="answer-container">');
    var choices = ["Ambient", "Afrobeat", "Blues", "Classical", "Country", "Disco", "Dubstep", "Edm", "Funk", "Gospel", "House", "Indie", "Jazz", "Latin", "Opera", "Pop", "Punk", "Reggae", "Rock", "Soul"]; // Directly list choices

    for (var i = 0; i < choices.length; i++) {
      var button = $('<div class="answer-button">').text(choices[i]);
      button.attr('data-index', i); // Set data attribute to track choice
      buttonContainer.append(button);
    }

    return buttonContainer;
  }

  // Displays next question
  function displayQuestion() {
    quiz.empty();
    var nextQuestion = createQuestionElement();
    quiz.append(nextQuestion);
  }
});