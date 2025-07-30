class Consult < ApplicationRecord
  # Associations
  belongs_to :patient
  belongs_to :practice

  # Enums
  enum status: {
    draft: 0,
    ready_for_review: 1,
    in_review_with_specialist: 2,
    treatment_options_available: 3,
    additional_information_needed: 4,
    different_specialty_recommended: 5,
    in_person_visit_recommended: 6,
    canceled: 7,
    closed: 8
  }
end
