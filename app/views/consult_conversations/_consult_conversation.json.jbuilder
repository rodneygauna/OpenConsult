json.extract! consult_conversation, :id, :user_id, :consult_id, :message, :created_at, :updated_at
json.url consult_conversation_url(consult_conversation, format: :json)
