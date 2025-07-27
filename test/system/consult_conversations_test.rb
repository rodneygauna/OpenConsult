require "application_system_test_case"

class ConsultConversationsTest < ApplicationSystemTestCase
  setup do
    @consult_conversation = consult_conversations(:one)
  end

  test "visiting the index" do
    visit consult_conversations_url
    assert_selector "h1", text: "Consult conversations"
  end

  test "should create consult conversation" do
    visit consult_conversations_url
    click_on "New consult conversation"

    fill_in "Consult", with: @consult_conversation.consult_id
    fill_in "Message", with: @consult_conversation.message
    fill_in "User", with: @consult_conversation.user_id
    click_on "Create Consult conversation"

    assert_text "Consult conversation was successfully created"
    click_on "Back"
  end

  test "should update Consult conversation" do
    visit consult_conversation_url(@consult_conversation)
    click_on "Edit this consult conversation", match: :first

    fill_in "Consult", with: @consult_conversation.consult_id
    fill_in "Message", with: @consult_conversation.message
    fill_in "User", with: @consult_conversation.user_id
    click_on "Update Consult conversation"

    assert_text "Consult conversation was successfully updated"
    click_on "Back"
  end

  test "should destroy Consult conversation" do
    visit consult_conversation_url(@consult_conversation)
    click_on "Destroy this consult conversation", match: :first

    assert_text "Consult conversation was successfully destroyed"
  end
end
