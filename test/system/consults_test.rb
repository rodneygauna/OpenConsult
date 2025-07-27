require "application_system_test_case"

class ConsultsTest < ApplicationSystemTestCase
  setup do
    @consult = consults(:one)
  end

  test "visiting the index" do
    visit consults_url
    assert_selector "h1", text: "Consults"
  end

  test "should create consult" do
    visit consults_url
    click_on "New consult"

    fill_in "Chief complaint", with: @consult.chief_complaint
    fill_in "Comments to specialist", with: @consult.comments_to_specialist
    fill_in "Main question", with: @consult.main_question
    fill_in "Patient", with: @consult.patient_id
    fill_in "Practice", with: @consult.practice_id
    fill_in "Priority", with: @consult.priority
    fill_in "Provider", with: @consult.provider_id
    fill_in "Specialist", with: @consult.specialist_id
    fill_in "Specialty", with: @consult.specialty
    fill_in "Status", with: @consult.status
    click_on "Create Consult"

    assert_text "Consult was successfully created"
    click_on "Back"
  end

  test "should update Consult" do
    visit consult_url(@consult)
    click_on "Edit this consult", match: :first

    fill_in "Chief complaint", with: @consult.chief_complaint
    fill_in "Comments to specialist", with: @consult.comments_to_specialist
    fill_in "Main question", with: @consult.main_question
    fill_in "Patient", with: @consult.patient_id
    fill_in "Practice", with: @consult.practice_id
    fill_in "Priority", with: @consult.priority
    fill_in "Provider", with: @consult.provider_id
    fill_in "Specialist", with: @consult.specialist_id
    fill_in "Specialty", with: @consult.specialty
    fill_in "Status", with: @consult.status
    click_on "Update Consult"

    assert_text "Consult was successfully updated"
    click_on "Back"
  end

  test "should destroy Consult" do
    visit consult_url(@consult)
    click_on "Destroy this consult", match: :first

    assert_text "Consult was successfully destroyed"
  end
end
