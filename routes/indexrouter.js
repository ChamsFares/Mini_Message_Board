const express = require("express");
const router = express.Router();
const messagesController = require("../controller/messageController");

router.get("/", messagesController.index);

router.get("/new", messagesController.newMessageForm);

router.post("/new", messagesController.postNewMessage);

router.get("/message/:id", messagesController.getMessageDetails);

module.exports = router;
