// place on the screen the chats will appear
let chatArea = document.getElementById('chat-area');

// how many total chats have been sent
let count = 0;

// how many chats each the bot and the user have sent
let botCount = 0;
let userCount = 0;

// next message that will be sent and who will be sending it
let nextMessage = {
  message: "",
  sender: ""
};

// when the bot is done speaking because it has said all of the things in the script
let botSilent = false;

// picks the bot's next message.
function botChat() {
  // set the bot as the sender of the next message
  nextMessage.sender = "bot";

  if (botCount >= botScript.length) {
    nextMessage.message = goodbye
    botSilent = true;
  } else {
    // set the bot's next message as the next string in the botScript array
    nextMessage.message = botScript[botCount];
  }

  // send the bot's message
  send(nextMessage.sender, nextMessage.message);

   // count 1 more chat that the bot has sent
  botCount += 1;

  // start listening again after the bot has sent a message
  listenFor();
}

function lookForChat() {
  // if there have been no chats yet, start the bot
  if (count == 0) {
    startBot();
  }

  // check who sent the last chat
  last = nextMessage.sender;

  if (last == "bot") {
    // if the bot chatted last wait for the user to send a chat
    userChat();

  } else {
    // send the cursor to the compose text area
    composer.focus();

    // if botSilent is true the bot is done chatting
    // set nextMessage.sender to "bot" to make the user chat next
    // run listenFor() to wait for the user to chat
    if (botSilent) {
      nextMessage.sender = "bot";
      nextMessage.message = "";
      listenFor();

    } else {

      // if the user chatted last or the chat just started have the bot send a chat
      // set the appropriate wait time to make the bot feel realistic
      // then run the botChat function which will find the right message for the bot
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

// starts the bot for the first time and clears away the start button from the HTML
function startBot(){
  chatArea.innerHTML = '';
  document.getElementById('compose-area').style.display = 'block';
}

// listener is a variable to decide what input to look for
let enterListener = window;
let startListener = document.getElementById("startButton");
let sendListener = document.getElementById("sendButton");
let composer = document.getElementById("composer");

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
let botScript = [
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
let goodbye = "Time's up. Your therapet has to see her next patient now. Good bye."

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
  lookForChat();
}

function prescription() {
  rect(50, 50, 300, 300, 20);
  fill(255);
  textSize(28);
  textStyle(BOLD);
  fill(0)
text('PRESCRIPTION', 120, 100);
    img = createImg('https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/29e81ea754c047c9a8d92c7040d219ea.png');
  img.hide();
  image(img, 65,70,50, 50);
  img = createImg('pawprintsign.png');
img.hide();
image(img, 220, 230, 80, 80);
  textStyle(ITALIC);
  text('get a real cat', 120, 190);
  textStyle(BOLD);
  textSize(10);
  text('DOCTOR SIGNATURE', 210, 320);
}
