require "test_helper"

class ConsultsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @consult = consults(:one)
  end

  test "should get index" do
    get consults_url
    assert_response :success
  end

  test "should get new" do
    get new_consult_url
    assert_response :success
  end

  test "should create consult" do
    assert_difference("Consult.count") do
      post consults_url, params: { consult: { chief_complaint: @consult.chief_complaint, comments_to_specialist: @consult.comments_to_specialist, main_question: @consult.main_question, patient_id: @consult.patient_id, practice_id: @consult.practice_id, priority: @consult.priority, provider_id: @consult.provider_id, specialist_id: @consult.specialist_id, specialty: @consult.specialty, status: @consult.status } }
    end

    assert_redirected_to consult_url(Consult.last)
  end

  test "should show consult" do
    get consult_url(@consult)
    assert_response :success
  end

  test "should get edit" do
    get edit_consult_url(@consult)
    assert_response :success
  end

  test "should update consult" do
    patch consult_url(@consult), params: { consult: { chief_complaint: @consult.chief_complaint, comments_to_specialist: @consult.comments_to_specialist, main_question: @consult.main_question, patient_id: @consult.patient_id, practice_id: @consult.practice_id, priority: @consult.priority, provider_id: @consult.provider_id, specialist_id: @consult.specialist_id, specialty: @consult.specialty, status: @consult.status } }
    assert_redirected_to consult_url(@consult)
  end

  test "should destroy consult" do
    assert_difference("Consult.count", -1) do
      delete consult_url(@consult)
    end

    assert_redirected_to consults_url
  end
end
