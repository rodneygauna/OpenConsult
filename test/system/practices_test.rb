require "application_system_test_case"

class PracticesTest < ApplicationSystemTestCase
  setup do
    @practice = practices(:one)
  end

  test "visiting the index" do
    visit practices_url
    assert_selector "h1", text: "Practices"
  end

  test "should create practice" do
    visit practices_url
    click_on "New practice"

    fill_in "Address", with: @practice.address
    fill_in "City", with: @practice.city
    fill_in "Email", with: @practice.email
    fill_in "Fax number", with: @practice.fax_number
    fill_in "Name", with: @practice.name
    fill_in "Phone number", with: @practice.phone_number
    fill_in "Po box", with: @practice.po_box
    fill_in "State", with: @practice.state
    fill_in "Suite", with: @practice.suite
    fill_in "Website", with: @practice.website
    fill_in "Zip", with: @practice.zip
    click_on "Create Practice"

    assert_text "Practice was successfully created"
    click_on "Back"
  end

  test "should update Practice" do
    visit practice_url(@practice)
    click_on "Edit this practice", match: :first

    fill_in "Address", with: @practice.address
    fill_in "City", with: @practice.city
    fill_in "Email", with: @practice.email
    fill_in "Fax number", with: @practice.fax_number
    fill_in "Name", with: @practice.name
    fill_in "Phone number", with: @practice.phone_number
    fill_in "Po box", with: @practice.po_box
    fill_in "State", with: @practice.state
    fill_in "Suite", with: @practice.suite
    fill_in "Website", with: @practice.website
    fill_in "Zip", with: @practice.zip
    click_on "Update Practice"

    assert_text "Practice was successfully updated"
    click_on "Back"
  end

  test "should destroy Practice" do
    visit practice_url(@practice)
    click_on "Destroy this practice", match: :first

    assert_text "Practice was successfully destroyed"
  end
end
