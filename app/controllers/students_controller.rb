class StudentsController < ApplicationController
  def show
    @student = Student.find_by_id(params[:id])
    @user_signed_in = user_signed_in?
    teachers = @student.cohorts.map { |cohort| cohort.teachers }.flatten if @student
    redirect_to(root_url) unless @student && ((current_user == @student) || teachers.include?(current_user))
  end

  def info
    student = Student.find(params[:id])

    if request.xhr?

      if student.cohorts.nil?
        student_belongs_to_cohort = false
      else
        student_belongs_to_cohort = true
      end

      cohorts = student.cohorts

      student_hash = {student: student, studentBelongsToCohort: student_belongs_to_cohort, studentCohorts: cohorts}
      render json: student_hash.to_json
    else
      redirect_to "/students/#{student.id}"
    end

  end


  def completed_assignments
    student = Student.find(params[:id])

    if request.xhr?
      completed_assignments = student.completed_assignments.map do |assignment|
        lesson = assignment.lesson

        {
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          lesson_name: assignment.lesson.name,
          cohort_id:  assignment.cohort_id,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p'),
          score: "#{student.total_correct_attempts_by_lesson(lesson)}/#{student.total_attempts_by_lesson(lesson)}",
          streak: "#{student.streak(lesson)}"
        }
      end

      student_hash = {completedAssignments: completed_assignments}
      render json: student_hash.to_json
    else
      redirect_to "/students/#{student.id}"
    end

  end

  def past_due_assignments
    student = Student.find(params[:id])

    if request.xhr?
      past_due_assignments = student.past_due_assignments.map do |assignment|
        {
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          lesson_name: assignment.lesson.name,
          cohort_id:  assignment.cohort_id,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p')
        }
      end

      student_hash = {pastDueAssignments: past_due_assignments}
      render json: student_hash.to_json
    else
      redirect_to "/students/#{student.id}"
    end

  end

  def pending_assignments
    student = Student.find(params[:id])

    if request.xhr?
      pending_assignments = student.pending_assignments.map do |assignment|
        {
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          lesson_name: assignment.lesson.name,
          cohort_id:  assignment.cohort_id,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p')
        }
      end

      student_hash = {pendingAssignments: pending_assignments}
      render json: student_hash.to_json
    else
      redirect_to "/students/#{student.id}"
    end
  end

  def attempted_lessons
    student = Student.find(params[:id])

    if request.xhr?
      attempted_lessons = student.incomplete_practice_lessons.map do |lesson|
        {
          lesson_id: lesson.id,
          lesson_name: lesson.name,
          unit_id: lesson.unit.id,
          score: "#{student.total_correct_attempts_by_lesson(lesson)}/#{student.total_attempts_by_lesson(lesson)}",
          streak: "#{student.streak(lesson)}"
        }
      end

      student_hash = {attemptedLessons: attempted_lessons}
      render json: student_hash.to_json
    else
      redirect_to "/students/#{student.id}"
    end

  end

  def mastered_lessons
    student = Student.find(params[:id])

    if request.xhr?
      mastered_lessons = student.mastered_lessons.map do |lesson|
        {
          lesson_id: lesson.id,
          lesson_name: lesson.name,
          unit_id: lesson.unit.id,
          score: "#{student.total_correct_attempts_by_lesson(lesson)}/#{student.total_attempts_by_lesson(lesson)}",
          streak: "#{student.streak(lesson)}"
        }
      end

      student_hash = {masteredLessons: mastered_lessons}
      render json: student_hash.to_json
    else
      redirect_to "/students/#{student.id}"
    end

  end


  def assign_cohort
    student = Student.find(params[:id])
    cohort = Cohort.find_by(access_code: params[:cohort][:access_code])
    if cohort
      cohort.students << student if cohort.students.find_by_id(student.id).nil?
      render json: "You have been added as a student to the #{cohort.name}. View any new assignments by clicking on the tabs below.".to_json
    else
      errors = {errors: "Invalid access code"}
      render json: errors.to_json
    end
  end

end
