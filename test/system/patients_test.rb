require "application_system_test_case"

class PatientsTest < ApplicationSystemTestCase
  setup do
    @patient = patients(:one)
  end

  test "visiting the index" do
    visit patients_url
    assert_selector "h1", text: "Patients"
  end

  test "should create patient" do
    visit patients_url
    click_on "New patient"

    fill_in "Address", with: @patient.address
    fill_in "Apartment number", with: @patient.apartment_number
    fill_in "City", with: @patient.city
    fill_in "Date of birth", with: @patient.date_of_birth
    fill_in "Email", with: @patient.email
    fill_in "First name", with: @patient.first_name
    fill_in "Gender identity", with: @patient.gender_identity
    fill_in "Home number", with: @patient.home_number
    fill_in "Last name", with: @patient.last_name
    fill_in "Middle name", with: @patient.middle_name
    fill_in "Mobile number", with: @patient.mobile_number
    fill_in "Po box", with: @patient.po_box
    fill_in "Practice", with: @patient.practice_id
    fill_in "Sex", with: @patient.sex
    fill_in "Sexual orientation", with: @patient.sexual_orientation
    fill_in "State", with: @patient.state
    fill_in "Suffix", with: @patient.suffix
    fill_in "Work number", with: @patient.work_number
    fill_in "Zip", with: @patient.zip
    click_on "Create Patient"

    assert_text "Patient was successfully created"
    click_on "Back"
  end

  test "should update Patient" do
    visit patient_url(@patient)
    click_on "Edit this patient", match: :first

    fill_in "Address", with: @patient.address
    fill_in "Apartment number", with: @patient.apartment_number
    fill_in "City", with: @patient.city
    fill_in "Date of birth", with: @patient.date_of_birth
    fill_in "Email", with: @patient.email
    fill_in "First name", with: @patient.first_name
    fill_in "Gender identity", with: @patient.gender_identity
    fill_in "Home number", with: @patient.home_number
    fill_in "Last name", with: @patient.last_name
    fill_in "Middle name", with: @patient.middle_name
    fill_in "Mobile number", with: @patient.mobile_number
    fill_in "Po box", with: @patient.po_box
    fill_in "Practice", with: @patient.practice_id
    fill_in "Sex", with: @patient.sex
    fill_in "Sexual orientation", with: @patient.sexual_orientation
    fill_in "State", with: @patient.state
    fill_in "Suffix", with: @patient.suffix
    fill_in "Work number", with: @patient.work_number
    fill_in "Zip", with: @patient.zip
    click_on "Update Patient"

    assert_text "Patient was successfully updated"
    click_on "Back"
  end

  test "should destroy Patient" do
    visit patient_url(@patient)
    click_on "Destroy this patient", match: :first

    assert_text "Patient was successfully destroyed"
  end
end
