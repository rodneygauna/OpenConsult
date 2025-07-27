class ConsultConversation < ApplicationRecord
  belongs_to :user
  belongs_to :consult
end
