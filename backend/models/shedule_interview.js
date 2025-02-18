const mongoose = require('mongoose');

const ScheduleInterviewSchema = new mongoose.Schema({
    interviewLabel: { type: String, required: true },
    interviewDateTime: { type: Date, required: true },
    interviewLocation: { type: String, required: true },
    note: { type: String}
}, { timestamps: true });

const ScheduleInterview = mongoose.model('ScheduleInterview', ScheduleInterviewSchema);
module.exports = ScheduleInterview;