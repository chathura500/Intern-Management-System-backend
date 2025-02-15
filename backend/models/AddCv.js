const mongoose = require('mongoose');

const AddCv = new mongoose.Schema({
    fullName: { type: String, required: true },
    initials: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    postalAddress: { type: String, required: true },
    district: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nic: { type: String, required: true, unique: true },
    mobileNumber: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\d{10}$/, 'Mobile number must be 10 digits'] 
    },
    landPhoneNumber: { 
        type: String, 
        match: [/^\d{10}$/, 'Land phone number must be 10 digits'] 
    },
    internshipType: { 
        type: String, 
        enum: ['Data Entry Operator', 'Internship'], 
        required: true 
    },
    olResults: {
        subject1: String,
        subject2: String,
        subject3: String,
        subject4: String,
        subject5: String,
        subject6: String,
        subject7: String,
        subject8: String,
        subject9: String,
        preferdLocation: String
    },

    internshipSubjects: {
        subject01: String,
        subject02: String,
        subject03: String,
        subject04: String,
        gceALGeneralInfo: String,
        qualification: String,
    },


    emergencyContactNumber01: { type: String, required: true },
    emergencyContactNumber02: { type: String },
    previousTrainingAtSlt: { type: Boolean, required: true },
    otherQualifications: { type: String },

    cvs: [{
        pdfData: { type: Buffer},
        fileName: { type: String},
        fileType: { type: String},
        uploadedAt: { type: Date, default: Date.now }
    }],

}, { timestamps: true });

const PDF = mongoose.model('PDF', AddCv);
module.exports = PDF;
