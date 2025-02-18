const ScheduleInterview = require('../models/shedule_interview');

const createInterview = async (req, res) => {
    try {
        const { interviewLabel, interviewDateTime, interviewLocation, note } = req.body;

        const newInterview = new ScheduleInterview({
            interviewLabel,
            interviewDateTime,
            interviewLocation,
            note
        });

        await newInterview.save();
        res.status(201).json({ message: 'Interview scheduled successfully', interview: newInterview });
    } catch (error) {
        res.status(500).json({ message: `Error scheduling interview: ${error.message}` });
    }
};

const deleteInterview = async (req, res) => {
    try {
        const interviewId = req.params.id;

        const interview = await ScheduleInterview.findById(interviewId);
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        await ScheduleInterview.findByIdAndDelete(interviewId);
        res.status(200).json({ message: 'Interview deleted successfully', deletedInterview: interview });
    } catch (error) {
        res.status(500).json({ message: `Error deleting interview: ${error.message}` });
    }
};

const updateInterview = async (req, res) => {
    try {
        const interviewId = req.params.id;
        const { interviewLabel, interviewDateTime, interviewLocation, note } = req.body;

        const interview = await ScheduleInterview.findById(interviewId);
        if (!interview) {
            return res.status(404).json({ message: 'Interview not found' });
        }

        interview.interviewLabel = interviewLabel || interview.interviewLabel;
        interview.interviewDateTime = interviewDateTime || interview.interviewDateTime;
        interview.interviewLocation = interviewLocation || interview.interviewLocation;
        interview.note = note || interview.note;

        await interview.save();
        res.status(200).json({ message: 'Interview updated successfully', updatedInterview: interview });
    } catch (error) {
        res.status(500).json({ message: `Error updating interview: ${error.message}` });
    }
};

const fetchAllInterviews = async (req, res) => {
    try {
        const interviews = await ScheduleInterview.find();
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ message: `Error fetching interviews: ${error.message}` });
    }
};

module.exports = { createInterview, deleteInterview, updateInterview, fetchAllInterviews };