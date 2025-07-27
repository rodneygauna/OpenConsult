require "test_helper"

class ConsultConversationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @consult_conversation = consult_conversations(:one)
  end

  test "should get index" do
    get consult_conversations_url
    assert_response :success
  end

  test "should get new" do
    get new_consult_conversation_url
    assert_response :success
  end

  test "should create consult_conversation" do
    assert_difference("ConsultConversation.count") do
      post consult_conversations_url, params: { consult_conversation: { consult_id: @consult_conversation.consult_id, message: @consult_conversation.message, user_id: @consult_conversation.user_id } }
    end

    assert_redirected_to consult_conversation_url(ConsultConversation.last)
  end

  test "should show consult_conversation" do
    get consult_conversation_url(@consult_conversation)
    assert_response :success
  end

  test "should get edit" do
    get edit_consult_conversation_url(@consult_conversation)
    assert_response :success
  end

  test "should update consult_conversation" do
    patch consult_conversation_url(@consult_conversation), params: { consult_conversation: { consult_id: @consult_conversation.consult_id, message: @consult_conversation.message, user_id: @consult_conversation.user_id } }
    assert_redirected_to consult_conversation_url(@consult_conversation)
  end

  test "should destroy consult_conversation" do
    assert_difference("ConsultConversation.count", -1) do
      delete consult_conversation_url(@consult_conversation)
    end

    assert_redirected_to consult_conversations_url
  end
end
