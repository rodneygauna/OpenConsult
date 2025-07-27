# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Practices
primaryPractice1 = Practice.create!(name: "Primary Health Practice", city: "San Diego", state: "CA", zip: "92121")
specialPractice1 = Practice.create!(name: "Specialist Practice", city: "San Diego", state: "CA", zip: "92121")

# Users
primaryUser1 = User.create!(
  first_name: "Alex", last_name: "Smith", role: :user,
  email_address: "alex@example.com", password: "password", practice: primaryPractice1
)

specialistUser1 = User.create!(
  first_name: "Jordan", last_name: "Lee", role: :user,
  email_address: "jordan@example.com", password: "password", practice: specialPractice1
)

Patient.create!(first_name: "Sam", last_name: "Jones", practice: primaryPractice1, date_of_birth: "1980-05-01")
