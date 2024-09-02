const db = require("../db/db");
const index = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messages ORDER BY added DESC");
    res.render("index", { title: "Mini Messageboard", messages: result.rows });
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
};
const newMessageForm = (req, res) => {
  res.render("form", { title: "New Message" });
};

const postNewMessage = async (req, res) => {
  const { text, user } = req.body;

  try {
    await db.query("INSERT INTO messages (text, user_name) VALUES ($1, $2)", [
      text,
      user,
    ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
};
const getMessageDetails = async (req, res) => {
  const messageId = req.params.id;
  try {
    const result = await db.query("SELECT * FROM messages WHERE id = $1", [
      messageId,
    ]);
    const message = result.rows[0];

    if (message) {
      res.render("message", { title: "Message Details", message: message });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.id;

  try {
    await db.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/error");
  }
};
module.exports = {
  index,
  postNewMessage,
  newMessageForm,
  getMessageDetails,
  deleteMessage,
};
