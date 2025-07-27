# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_27_224205) do
  create_table "consult_conversations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "consult_id", null: false
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["consult_id"], name: "index_consult_conversations_on_consult_id"
    t.index ["user_id"], name: "index_consult_conversations_on_user_id"
  end

  create_table "consult_results", force: :cascade do |t|
    t.integer "consult_id", null: false
    t.integer "specialist_id"
    t.text "conclusion"
    t.string "diagnoses"
    t.text "treatment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["consult_id"], name: "index_consult_results_on_consult_id"
  end

  create_table "consults", force: :cascade do |t|
    t.integer "status"
    t.integer "priority"
    t.string "specialty"
    t.text "chief_complaint"
    t.text "comments_to_specialist"
    t.text "main_question"
    t.integer "patient_id", null: false
    t.integer "practice_id", null: false
    t.integer "provider_id"
    t.integer "specialist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_consults_on_patient_id"
    t.index ["practice_id"], name: "index_consults_on_practice_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "suffix"
    t.date "date_of_birth"
    t.string "mobile_number"
    t.string "home_number"
    t.string "work_number"
    t.string "email"
    t.string "address"
    t.string "apartment_number"
    t.string "po_box"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "sex"
    t.string "gender_identity"
    t.string "sexual_orientation"
    t.integer "practice_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["practice_id"], name: "index_patients_on_practice_id"
  end

  create_table "practices", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "suite"
    t.string "po_box"
    t.string "city"
    t.string "state"
    t.string "zip"
    t.string "phone_number"
    t.string "fax_number"
    t.string "email"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "ip_address"
    t.string "user_agent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
  end

  add_foreign_key "consult_conversations", "consults"
  add_foreign_key "consult_conversations", "users"
  add_foreign_key "consult_results", "consults"
  add_foreign_key "consults", "patients"
  add_foreign_key "consults", "practices"
  add_foreign_key "patients", "practices"
  add_foreign_key "sessions", "users"
end
