// chatArea is the variable that stores the place on the screen the chats will appear.
var chatArea = document.getElementById('chat-area');

// count is a variable that stores how many total chats have been sent.
var count = 0;

// botCount and userCount are variables that store how many chats each the bot and the user have sent.
var botCount = 0;
var userCount = 0;

// nextMessage is an object variable that stores the next message that will be sent and who will be sending it.
var nextMessage = {
  message: "",
  sender: ""
};


// botSilent is a variable that stores when the bot is done speaking because it has said all of the things in the script.
var botSilent = false;

// botChat is the function that picks the bot's next message.

function botChat() {
  // Set the bot as the sender of the next message.
  nextMessage.sender = "bot";

  if (botCount >= botScript.length) {
    nextMessage.message = goodbye
    botSilent = true;
  } else {
    // Set the bot's next message as the next string in the botScript array.
    nextMessage.message = botScript[botCount];
  }

  // Send the bot's message.
  send(nextMessage.sender, nextMessage.message);

//   // Count 1 more chat that the bot has sent

  botCount += 1;

  // Start listening again after the bot has sent a message.
  listenFor();
}

function lookForChat() {
  // If there have been no chats yet, start the bot.
  if (count == 0) {
    startBot();
  }


  // check who sent the last chat
  last = nextMessage.sender;

  if (last == "bot") {
    // if the bot chatted last wait for the user to send a chat
    userChat();

  } else {
    // Send the cursor to the compose text area.
    composer.focus();

    // If botSilent is true the bot is done chatting
    // Set nextMessage.sender to "bot" to make the user chat next
    // Run listenFor() to wait for the user to chat.
    if (botSilent) {
      nextMessage.sender = "bot";
      nextMessage.message = "";
      listenFor();

    } else {

      // If the user chatted last or the chat just started have the bot send a chat.
      // Set the appropriate wait time to make the bot feel realistic.
      // Then run the botChat function which will find the right message for the bot
      if (count == 0) {
        wait = 100;
      } else {
        wait = 500;
      }
      setTimeout(function(){
        botChat();
      }, wait);
    }
  }
}


// startBot is a function that starts the bot for the first time. It clears away the start button from the HTML.
function startBot(){
  chatArea.innerHTML = '';
  document.getElementById('compose-area').style.display = 'block';
}

// listener is a variable to decide what input to look for
var enterListener = window;
var startListener = document.getElementById("startButton");
var sendListener = document.getElementById("sendButton");
var composer = document.getElementById("composer");

// Listen for the enter key on the start screen to start the chat
if (count == 0) {
  listenFor()
}

// A pair of functions that chain together to decide what part of the page to listen to, and then see if the 'enter' key is pressed. If it is, run the chat() function to submit an answer if there is one, and ask a new question.
function listenFor() {

  enterListener.addEventListener("keydown", listen);
  startListener.addEventListener("click", listen);
  sendListener.addEventListener("click", listen);
}

function listen(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!e.shiftKey) {
      pauseListening();
      lookForChat();
    }
  }
  if (e.type == "click") {
    pauseListening();
    lookForChat();
  }
}

// To avoid double submitting on enter key if someone clicks the button we have to stop listening for enter until the therapet sends a question.
function pauseListening() {
  enterListener.removeEventListener("keydown", listen);
  startListener.removeEventListener("click", listen);
  sendListener.removeEventListener("click", listen);
}

// send is the function that sends the next message stored in nextMessage object.


function send(sender, message) {

  // Insert the nextMessage into the HTML.
  chatArea.insertAdjacentHTML("beforeend", "<div id='chat-" + count + "' class='chat-container'><div class='chat-wrapper' id='chat-a-" + count + "'><p id='a-' class='chat-" + sender + "'>" + message + "</p><div class='avatar avatar-" + sender + "'></div></div></div>");

  // Scroll the most recent message onto the screen.
  document.getElementById('chat-' + count).scrollIntoView();

  // Count one more message that has been sent.
  count += 1;
}

// botScript is a list of questions the therapet will ask the user.
var botScript = [
  "Meow..meow Meow?",
  "Meow",
  "Meow meow",
  "rrmeowww",
  "Meow meow?",
  "meOWW",
  "Mmmeow",
  "rrroaoww meow",
  "meow?",
  "meOw",
  "Mmmeow",
  "Meow moewwoeeow meow meowerr Rremeowa mewoewso Meow Meowewe.. meoww"
];

// goodbye is a variable that stores what the therapet will say when it runs out of other things to say.
var goodbye = "Time's up. Your therapet has to see her next patient now. Good bye.";

// userChat is the function that waits for the user to send a message.

function userChat() {

  // Find where the user is inputing text.
  compose_area = document.getElementById('composer');

  // Set the user as the sender of the next message.
  nextMessage.sender = "user";

  // Get the user's input in the compose_area and clear the compose_area.
  nextMessage.message = compose_area.value;
  compose_area.value = "";

  // Send user's message.
  send(nextMessage.sender, nextMessage.message);

  // Count 1 more chat that the user has sent.
  userCount += 1;

  // Ask the bot for another chat.
  lookForChat()

}
