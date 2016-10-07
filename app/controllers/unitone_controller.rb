include UnitoneHelper
class UnitoneController < ApplicationController

  def attempts
    if current_user
      attempt_params.each do |key, value|
        new_attempt = Attempt.create!(
          prompt_type: 'UnitOneSentence',
          prompt_id: value[:prompt_id],
          correct?: to_bool(value[:correct]),
          scholar_id: current_user.id,
          scholar_type: current_user.type
        )
      end
    end
  end

  def unitonesentence
    sentence = UnitOneSentence.where(lesson_id: params[:lesson_id]).sample
    prompts = sentence.unit_one_prompts


    if prompts.find_by(answer_type: 'S')
      subject_prompt =  prompts.find_by(answer_type: 'S')
      subjects = subject_prompt.answer.scan(/\w+/)
      subject_prompt_id = subject_prompt.id
    else
      subjects = []
      subject_prompt_id = 0
    end

    if prompts.find_by(answer_type: 'V')
      verb_prompt = prompts.find_by(answer_type: 'V')
      verbs = verb_prompt.answer.scan(/\w+/)
      verb_prompt_id = verb_prompt.id
    else
      verbs = []
      verb_prompt_id = 0
    end

    if prompts.find_by(answer_type: 'O')
      object_prompt = prompts.find_by(answer_type: 'O')
      objects = object_prompt.answer.scan(/\w+/)
      object_prompt_id = object_prompt.id
    else
      objects = []
      object_prompt_id = 0
    end


    return render json: {
      sentence: sentence.content.split,
      svos: {
        subjects: subjects,
        verbs: verbs,
        objects: objects
      },
      svoIds: {
        verbPromptId: verb_prompt_id,
        subjectPromptId: subject_prompt_id,
        objectPromptId: object_prompt_id
      }
    }
  end


  private

  def attempt_params
    params.require(:attempts)
  end

end
