class ConsultConversation < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :consult
end
