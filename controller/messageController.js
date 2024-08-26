const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
const index = (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
};
const newMessageForm = (req, res) => {
  res.render("form", { title: "New Message" });
};

const postNewMessage = (req, res) => {
  const messageText = req.body.text;
  const messageUser = req.body.user;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
};
const getMessageDetails = (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];

  if (message) {
    res.render("message", { title: "Message Details", message: message });
  } else {
    res.redirect("/");
  }
};
module.exports = {
  index,
  postNewMessage,
  newMessageForm,
  getMessageDetails,
};
