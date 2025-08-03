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
primaryPractice1 = Practice.find_or_create_by!(name: "Primary Health Practice", city: "San Diego", state: "CA", zip: "92121")
specialPractice1 = Practice.find_or_create_by!(name: "Specialist Practice", city: "San Diego", state: "CA", zip: "92121")

# Users
User.find_or_create_by!(email_address: "alex@example.com") do |user|
  user.first_name = "Alex"
  user.last_name = "Smith"
  user.role = :user
  user.password = "password"
  user.practice = primaryPractice1
end

User.find_or_create_by!(email_address: "jordan@example.com") do |user|
  user.first_name = "Jordan"
  user.last_name = "Lee"
  user.role = :user
  user.password = "password"
  user.practice = specialPractice1
end

Patient.find_or_create_by!(
  first_name: "Sam", last_name: "Jones", practice: primaryPractice1, date_of_birth: "1980-05-01"
)
