import mongoose from "mongoose";

import {
  requiredStringMaxLength,
  requiredString,
  optionalString,
  requiredEnum,
  requireRef,
} from "../utils/validation/validationConstants.js";

const consultSchema = new mongoose.Schema(
  {
    // Consult Status
    status: requiredEnum("Status", [
      "Draft", // Not yet submitted
      "Ready for Review", // Submitted and ready for review by a specialist
      "In Review with Specialist", // Being reviewed by a specialist
      "Treatment Options Available", // Specialist has provided treatment options
      "Additional Information Needed", // Specialist needs more information
      "Different Specialty Recommended", // Specialist recommends a different specialty
      "In Person Visit Recommended", // Specialist recommends an in person visit
      "Cancelled", // Consult was cancelled by the Primary Care Provider
      "Closed", // Primary Care Provider has reviewed and accepted the consult
    ]),
    // Consult Priority
    priority: requiredEnum("Priority", [
      "Routine", // Routine consult
      "Urgent", // Urgent consult
      "Emergent", // Emergent consult
    ]),
    // Consult Information
    specialty: requiredStringMaxLength("Specialty", 255),
    chief_complaint: requiredString("Chief complaint"),
    comments_to_specialist: optionalString(),
    main_question: requiredString("Main question"),
    // Consult Attachments
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
    // Patient Reference
    patient_id: requireRef("Patient"),
    // Practice Reference
    practice_id: requireRef("Practice"),
    // Creating Provider Reference
    creating_provider_id: requireRef("User"),
    // Assigned Specialist Reference
    assigned_specialist_id: requireRef("User"),
    // Consult Conversation Reference
    conversation_id: [requireRef("ConsultConversation")],
  },
  { timestamps: true }
);

const Consult = mongoose.model("Consult", consultSchema);
