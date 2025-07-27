require "application_system_test_case"

class ConsultResultsTest < ApplicationSystemTestCase
  setup do
    @consult_result = consult_results(:one)
  end

  test "visiting the index" do
    visit consult_results_url
    assert_selector "h1", text: "Consult results"
  end

  test "should create consult result" do
    visit consult_results_url
    click_on "New consult result"

    fill_in "Conclusion", with: @consult_result.conclusion
    fill_in "Consult", with: @consult_result.consult_id
    fill_in "Diagnoses", with: @consult_result.diagnoses
    fill_in "Specialist", with: @consult_result.specialist_id
    fill_in "Treatment", with: @consult_result.treatment
    click_on "Create Consult result"

    assert_text "Consult result was successfully created"
    click_on "Back"
  end

  test "should update Consult result" do
    visit consult_result_url(@consult_result)
    click_on "Edit this consult result", match: :first

    fill_in "Conclusion", with: @consult_result.conclusion
    fill_in "Consult", with: @consult_result.consult_id
    fill_in "Diagnoses", with: @consult_result.diagnoses
    fill_in "Specialist", with: @consult_result.specialist_id
    fill_in "Treatment", with: @consult_result.treatment
    click_on "Update Consult result"

    assert_text "Consult result was successfully updated"
    click_on "Back"
  end

  test "should destroy Consult result" do
    visit consult_result_url(@consult_result)
    click_on "Destroy this consult result", match: :first

    assert_text "Consult result was successfully destroyed"
  end
end
