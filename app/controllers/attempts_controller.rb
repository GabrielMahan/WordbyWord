class AttemptsController < ApplicationController

  def streak
    if current_user
      lesson = Lesson.find(params[:lesson_id])
      user_attempts = current_user.attempts_by_lesson(lesson)
      total_attempts = user_attempts.length
      total_correct = user_attempts.select { |attempt| attempt.correct? }.length
      streak = 0
      
      for attempt in user_attempts.reverse
        break unless attempt.correct?
        streak += 1
      end

      return render json: {totalAttempts: total_attempts, totalCorrect: total_correct, streak: streak}
    end
  end


end
