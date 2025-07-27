class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy

  # Normalize email
  normalizes :email_address, with: ->(e) { e.strip.downcase }

  # Associations
  belongs_to :practice, optional: true

  has_many :submitted_consults, class_name: "Consult", foreign_key: "provider_id"
  has_many :assigned_consults, class_name: "Consult", foreign_key: "specialist_id"

  has_many :consult_conversations

  # Enums
  # User: Default User
  # Super User: Has elvated prvledges, e.g., the office manager has access to specific settings
  # Admin: Is the administrator of the app and has full access to everything
  enum role: { user: 0, super_user: 1, admin: 2 }

  # Utility method
  def full_name
    [ first_name, middle_name, last_name, suffix ].compact.join(" ")
  end
end
