import mongoose from "mongoose";

import {
  requiredString,
  requireRef,
} from "../utils/validation/validationConstants.js";

const consultConversationSchema = new mongoose.Schema(
  {
    // Conversation Reference
    consult_id: requireRef("Consult"),
    // Conversation Messages
    messages: [
      {
        // Message Content
        message: requiredString("Message"),
        // Message Author Reference
        author_id: requireRef("User"),
      },
    ],
    // Conversation Attachments
    attachments: [
      {
        // Attachment Name
        name: requiredString("Attachment name"),
        // Attachment URL
        url: requiredString("Attachment URL"),
        // Attachment Author Reference
        author_id: requireRef("User"),
      },
    ],
  },
  { timestamps: true }
);

export const ConsultConversation = mongoose.model(
  "ConsultConversation",
  consultConversationSchema
);
