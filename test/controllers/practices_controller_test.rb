require "test_helper"

class PracticesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @practice = practices(:one)
  end

  test "should get index" do
    get practices_url
    assert_response :success
  end

  test "should get new" do
    get new_practice_url
    assert_response :success
  end

  test "should create practice" do
    assert_difference("Practice.count") do
      post practices_url, params: { practice: { address: @practice.address, city: @practice.city, email: @practice.email, fax_number: @practice.fax_number, name: @practice.name, phone_number: @practice.phone_number, po_box: @practice.po_box, state: @practice.state, suite: @practice.suite, website: @practice.website, zip: @practice.zip } }
    end

    assert_redirected_to practice_url(Practice.last)
  end

  test "should show practice" do
    get practice_url(@practice)
    assert_response :success
  end

  test "should get edit" do
    get edit_practice_url(@practice)
    assert_response :success
  end

  test "should update practice" do
    patch practice_url(@practice), params: { practice: { address: @practice.address, city: @practice.city, email: @practice.email, fax_number: @practice.fax_number, name: @practice.name, phone_number: @practice.phone_number, po_box: @practice.po_box, state: @practice.state, suite: @practice.suite, website: @practice.website, zip: @practice.zip } }
    assert_redirected_to practice_url(@practice)
  end

  test "should destroy practice" do
    assert_difference("Practice.count", -1) do
      delete practice_url(@practice)
    end

    assert_redirected_to practices_url
  end
end
