class ConsultResultsController < ApplicationController
  before_action :set_consult_result, only: %i[ show edit update destroy ]

  # GET /consult_results or /consult_results.json
  def index
    @consult_results = ConsultResult.all
  end

  # GET /consult_results/1 or /consult_results/1.json
  def show
  end

  # GET /consult_results/new
  def new
    @consult_result = ConsultResult.new
  end

  # GET /consult_results/1/edit
  def edit
  end

  # POST /consult_results or /consult_results.json
  def create
    @consult_result = ConsultResult.new(consult_result_params)

    respond_to do |format|
      if @consult_result.save
        format.html { redirect_to @consult_result, notice: "Consult result was successfully created." }
        format.json { render :show, status: :created, location: @consult_result }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @consult_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /consult_results/1 or /consult_results/1.json
  def update
    respond_to do |format|
      if @consult_result.update(consult_result_params)
        format.html { redirect_to @consult_result, notice: "Consult result was successfully updated." }
        format.json { render :show, status: :ok, location: @consult_result }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @consult_result.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /consult_results/1 or /consult_results/1.json
  def destroy
    @consult_result.destroy!

    respond_to do |format|
      format.html { redirect_to consult_results_path, status: :see_other, notice: "Consult result was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_consult_result
      @consult_result = ConsultResult.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def consult_result_params
      params.expect(consult_result: [ :consult_id, :specialist_id, :conclusion, :diagnoses, :treatment ])
    end
end
