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

        // Save the files with specific names
        req.files.forEach((file, index) => {
            const cvName = `CV${index + 1}.pdf`;  // Name the files as CV1, CV2, CV3, etc.
            
            existingCv.cvs.push({
                pdfData: file.buffer,
                fileName: cvName,
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
        const fetch_cv = await PDF.find().select('-cvs.pdfData');
        res.status(200).json(fetch_cv);
    } catch (error) {
        res.status(500).json({ message: `${error}` });
    }
};

const fetchLimitedData = async (req, res) => {
    try {
        const userId = req.params._id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Fetch user and exclude 'pdfData' from 'cvs'
        const user = await PDF.findById(userId).select("_id nic fullName createdAt district cvs.fileName");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has more than 3 CVs
        if (user.cvs.length > 4) {
            return res.status(400).json({ message: "User has uploaded more than 3 CVs" });
        }

        // Check the third CV
        const thirdCV = user.cvs[2]; // 3rd CV (index 2)
        if (thirdCV && thirdCV.fileName === "CV3.pdf") {
            return res.status(200).json({
                message: "Third CV found",
                userDetails: {
                    id: user._id,
                    nic: user.nic,
                    fullName: user.fullName,
                    district: user.district,
                    createdAt: user.createdAt
                },
                thirdCV: thirdCV
            });
        } else {
            return res.status(404).json({ message: "Third CV is not CV3.pdf" });
        }

    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const deleteSelectedData = async (req, res) => {  
    try {
        const userId = req.params._id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await PDF.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await PDF.findByIdAndDelete(userId);

        return res.status(200).json({ message: "User deleted successfully", deletedUser: user });

    } catch (error) {
        return res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const  userId  = req.params._id;  
        const { applicationStatus } = req.body;  

        if (!['approved', 'declined'].includes(applicationStatus)) {
            return res.status(400).json({ message: "Invalid status. Must be 'approved' or 'declined'." });
        }

        const user = await PDF.findById(userId);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the application status
        user.applicationStatus = applicationStatus;
        await user.save();

        res.status(200).json({ message: `User's application has been ${applicationStatus}.`, updatedApplication: applicationStatus });

    } catch (error) {
        res.status(500).json({ message: `Error updating application status: ${error.message}` });
    }
};




module.exports = { uploadPDF, fetchAllCvs, fetchLimitedData, deleteSelectedData, updateApplicationStatus };
