class Consult < ApplicationRecord
  # Associations
  belongs_to :patient
  belongs_to :practice

  # Enums
  enum :status, {
    draft: "draft",
    ready_for_review: "ready_for_review",
    in_review_with_specialist: "in_review_with_specialist",
    treatment_options_available: "treatment_options_available",
    additional_information_needed: "additional_information_needed",
    different_specialty_recommended: "different_specialty_recommended",
    in_person_visit_recommended: "in_person_visit_recommended",
    canceled: "canceled",
    closed: "closed"
  }
end
