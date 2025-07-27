require "test_helper"

class PatientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @patient = patients(:one)
  end

  test "should get index" do
    get patients_url
    assert_response :success
  end

  test "should get new" do
    get new_patient_url
    assert_response :success
  end

  test "should create patient" do
    assert_difference("Patient.count") do
      post patients_url, params: { patient: { address: @patient.address, apartment_number: @patient.apartment_number, city: @patient.city, date_of_birth: @patient.date_of_birth, email: @patient.email, first_name: @patient.first_name, gender_identity: @patient.gender_identity, home_number: @patient.home_number, last_name: @patient.last_name, middle_name: @patient.middle_name, mobile_number: @patient.mobile_number, po_box: @patient.po_box, practice_id: @patient.practice_id, sex: @patient.sex, sexual_orientation: @patient.sexual_orientation, state: @patient.state, suffix: @patient.suffix, work_number: @patient.work_number, zip: @patient.zip } }
    end

    assert_redirected_to patient_url(Patient.last)
  end

  test "should show patient" do
    get patient_url(@patient)
    assert_response :success
  end

  test "should get edit" do
    get edit_patient_url(@patient)
    assert_response :success
  end

  test "should update patient" do
    patch patient_url(@patient), params: { patient: { address: @patient.address, apartment_number: @patient.apartment_number, city: @patient.city, date_of_birth: @patient.date_of_birth, email: @patient.email, first_name: @patient.first_name, gender_identity: @patient.gender_identity, home_number: @patient.home_number, last_name: @patient.last_name, middle_name: @patient.middle_name, mobile_number: @patient.mobile_number, po_box: @patient.po_box, practice_id: @patient.practice_id, sex: @patient.sex, sexual_orientation: @patient.sexual_orientation, state: @patient.state, suffix: @patient.suffix, work_number: @patient.work_number, zip: @patient.zip } }
    assert_redirected_to patient_url(@patient)
  end

  test "should destroy patient" do
    assert_difference("Patient.count", -1) do
      delete patient_url(@patient)
    end

    assert_redirected_to patients_url
  end
end
