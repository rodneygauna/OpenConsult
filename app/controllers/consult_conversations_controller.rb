class ConsultConversationsController < ApplicationController
  before_action :set_consult_conversation, only: %i[ show edit update destroy ]

  # GET /consult_conversations or /consult_conversations.json
  def index
    @consult_conversations = ConsultConversation.all
  end

  # GET /consult_conversations/1 or /consult_conversations/1.json
  def show
  end

  # GET /consult_conversations/new
  def new
    @consult_conversation = ConsultConversation.new
  end

  # GET /consult_conversations/1/edit
  def edit
  end

  # POST /consult_conversations or /consult_conversations.json
  def create
    @consult_conversation = ConsultConversation.new(consult_conversation_params)

    respond_to do |format|
      if @consult_conversation.save
        format.html { redirect_to @consult_conversation, notice: "Consult conversation was successfully created." }
        format.json { render :show, status: :created, location: @consult_conversation }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @consult_conversation.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /consult_conversations/1 or /consult_conversations/1.json
  def update
    respond_to do |format|
      if @consult_conversation.update(consult_conversation_params)
        format.html { redirect_to @consult_conversation, notice: "Consult conversation was successfully updated." }
        format.json { render :show, status: :ok, location: @consult_conversation }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @consult_conversation.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /consult_conversations/1 or /consult_conversations/1.json
  def destroy
    @consult_conversation.destroy!

    respond_to do |format|
      format.html { redirect_to consult_conversations_path, status: :see_other, notice: "Consult conversation was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_consult_conversation
      @consult_conversation = ConsultConversation.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def consult_conversation_params
      params.expect(consult_conversation: [ :user_id, :consult_id, :message ])
    end
end
