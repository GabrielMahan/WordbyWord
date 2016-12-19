class TeachersController < ApplicationController
  def show
    @teacher = Teacher.find_by_id(params[:id])
    @user_signed_in = user_signed_in?
    redirect_to(root_url) unless @teacher && (current_user == @teacher)
  end

  def info
    teacher = Teacher.find(params[:id])

    if request.xhr?

      teacher_hash = {
        teacher: teacher
      }

      render json: teacher_hash.to_json
    else
      redirect_to '/teachers/#{teacher.id}'
    end

  end

  def cohorts
    teacher = Teacher.find(params[:id])

    if request.xhr?
      if teacher.cohorts.nil?
        teacher_has_cohorts = false
      else
        teacher_has_cohorts = true
      end

    cohorts = teacher.cohorts.map do |cohort|
      {
        id: cohort.id,
        name: cohort.name,
        access_code: cohort.access_code,
        size: cohort.students.length,
        number_of_students_with_overdue_assignments: cohort.tally_students_with_overdue_assignments
      }
    end

      teacher_hash = {
        teacherHasCohorts: teacher_has_cohorts,
        teacherCohorts: cohorts,
      }

      render json: teacher_hash.to_json
    else
      redirect_to '/teachers/#{teacher.id}'
    end

  end

  def assign_cohort
    teacher = Teacher.find(params[:id])
    cohort = Cohort.find_by(access_code: params[:cohort][:access_code])
    if cohort
      cohort.teachers << teacher if cohort.teachers.find_by_id(teacher.id).nil?
      render json: "You have been added as a teacher to the #{cohort.name}.".to_json
    else
      errors = {errors: "Invalid access code"}
      render json: errors.to_json
    end
  end

end
