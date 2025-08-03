class ConsultsController < ApplicationController
  before_action :set_consult, only: %i[ show edit update destroy ]

  # GET /consults or /consults.json
  def index
    @consults = Consult.all
  end

  # GET /consults/1 or /consults/1.json
  def show
  end

  # GET /consults/new
  def new
    @consult = Consult.new
  end

  # GET /consults/1/edit
  def edit
  end

  # POST /consults or /consults.json
  def create
    @consult = Consult.new(consult_params)

    respond_to do |format|
      if @consult.save
        format.html { redirect_to @consult, notice: "Consult was successfully created." }
        format.json { render :show, status: :created, location: @consult }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @consult.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /consults/1 or /consults/1.json
  def update
    respond_to do |format|
      if @consult.update(consult_params)
        format.html { redirect_to @consult, notice: "Consult was successfully updated." }
        format.json { render :show, status: :ok, location: @consult }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @consult.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /consults/1 or /consults/1.json
  def destroy
    @consult.destroy!

    respond_to do |format|
      format.html { redirect_to consults_path, status: :see_other, notice: "Consult was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_consult
      @consult = Consult.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def consult_params
      params.expect(consult: [ :status, :priority, :specialty, :chief_complaint, :comments_to_specialist, :main_question, :patient_id, :practice_id, :provider_id, :specialist_id ])
    end
end
