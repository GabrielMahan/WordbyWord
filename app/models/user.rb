class User < ApplicationRecord
  validates :last_name, presence: true, length: { maximum: 50}
  validates :email, presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }, uniqueness: { case_sensitive: false }

    def attempts_by_lesson(lesson)
      prompt_ids = lesson.prompt_ids
      Attempt.where(scholar_id: id, scholar_type: self.type).select do |attempt|
        prompt_ids.include?(attempt.prompt_id)
      end
    end

    def total_correct_attempts_by_lesson(lesson)
      self.attempts_by_lesson(lesson).select { |attempt| attempt.correct? }.length
    end

    def total_attempts_by_lesson(lesson)
      self.attempts_by_lesson(lesson).length
    end

    def streak(lesson)
      user_attempts = self.attempts_by_lesson(lesson)
      total_attempts = user_attempts.length
      total_correct = user_attempts.select { |attempt| attempt.correct? }.length
      streak = 0
      for attempt in user_attempts.reverse
        break unless attempt.correct?
        streak += 1
      end
      streak
    end


  self.inheritance_column = "status"
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
end
