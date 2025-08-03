require "test_helper"

class ConsultResultsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @consult_result = consult_results(:one)
  end

  test "should get index" do
    get consult_results_url
    assert_response :success
  end

  test "should get new" do
    get new_consult_result_url
    assert_response :success
  end

  test "should create consult_result" do
    assert_difference("ConsultResult.count") do
      post consult_results_url, params: { consult_result: { conclusion: @consult_result.conclusion, consult_id: @consult_result.consult_id, diagnoses: @consult_result.diagnoses, specialist_id: @consult_result.specialist_id, treatment: @consult_result.treatment } }
    end

    assert_redirected_to consult_result_url(ConsultResult.last)
  end

  test "should show consult_result" do
    get consult_result_url(@consult_result)
    assert_response :success
  end

  test "should get edit" do
    get edit_consult_result_url(@consult_result)
    assert_response :success
  end

  test "should update consult_result" do
    patch consult_result_url(@consult_result), params: { consult_result: { conclusion: @consult_result.conclusion, consult_id: @consult_result.consult_id, diagnoses: @consult_result.diagnoses, specialist_id: @consult_result.specialist_id, treatment: @consult_result.treatment } }
    assert_redirected_to consult_result_url(@consult_result)
  end

  test "should destroy consult_result" do
    assert_difference("ConsultResult.count", -1) do
      delete consult_result_url(@consult_result)
    end

    assert_redirected_to consult_results_url
  end
end
