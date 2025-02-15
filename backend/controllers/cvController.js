const PDF = require('../models/AddCv');

const uploadPDF = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one PDF file is required" });
        }

        const {
            fullName, initials, gender, postalAddress, district, dateOfBirth, nic, 
            mobileNumber, landPhoneNumber, internshipType, emergencyContactNumber01, 
            emergencyContactNumber02, previousTrainingAtSlt, otherQualifications,
            olResults, internshipSubjects
        } = req.body;  

        const parsedOlResults = olResults ? JSON.parse(olResults) : {};
        const parsedInternshipSubjects = internshipSubjects ? JSON.parse(internshipSubjects) : {};

        let existingCv = await PDF.findOne({ nic });

        if (!existingCv) {
            existingCv = new PDF({
                fullName,
                initials,
                gender,
                postalAddress,
                district,
                dateOfBirth,
                nic,
                mobileNumber,
                landPhoneNumber,
                internshipType,
                emergencyContactNumber01,
                emergencyContactNumber02,
                previousTrainingAtSlt,
                otherQualifications,
                olResults: parsedOlResults,
                internshipSubjects: parsedInternshipSubjects,
                cvs: [] 
            });
        }

        req.files.forEach(file => {
            existingCv.cvs.push({
                pdfData: file.buffer,
                fileName: file.originalname,
                fileType: file.mimetype
            });
        });

        await existingCv.save();
        res.status(200).json({ message: "PDF(s) uploaded successfully" });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error uploading PDFs: ${err.message}` });
    }
};

const fetchAllCvs = async (req, res) => {

    try {

        const fetch_cv = await PDF.find().select('-cvs.pdfData'); // this is only temporary solution to fetch all the data without pdfData
        // const fetch_cv = await PDF.find() use this to fetch all the data
        res.status(200).json(fetch_cv);
        
    } catch (error) {
        res.status(500).json({message : `${error}`})
        
    }

}

module.exports = { uploadPDF, fetchAllCvs };
