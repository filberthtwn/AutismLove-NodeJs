const AppError = require('../../utils/appError');
const catchAsync = require('../../utils/catchAsync');
const models = require('./../../models');

exports.createSurvey = catchAsync(async (req, res, next) => {
    const {survey_name, question_groups} = req.body;

    if (!question_groups){
        return next(new AppError("Surveys field required", 400));
    }

    const survey = await models.Survey.create({
        name: survey_name
    });

    for (const questionGroup of question_groups) {

        const sideEffect = await models.SideEffect.create({
            name: questionGroup.side_effect_name,
            survey: survey.id
        });

        for (const question of questionGroup.questions) {
            await models.SurveyQuestion.create({
                type: question.type,
                question: question.question,
                side_effect: sideEffect.id
            });
        }
    }

    res.status(201).json({
        success: true,
        message: 'Survey created successfully',
        data: {
            survey: req.body
        }
    });
});