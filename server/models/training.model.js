const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    // Session Details
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    },
    
    // Location
    location: {
        type: String,
        default: 'To be announced',
    },

    // Trainer Details
    trainer: {
        name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            default: 'No bio available',
        },
        contact: {
            type: String,
            default: 'Not provided',
        },
    },

    // Eligibility Criteria
    eligibility: {
        department: {
            type: String,
            default: 'All Departments',
        },
        batch: {
            type: String,
            default: 'All Batches',
        },
        // Add any additional eligibility criteria as needed
    },

    // Registration Information
    registration: {
        isOpen: {
            type: Boolean,
            default: true,
        },
        registrationDeadline: {
            type: Date,
        },
        // Add any additional registration-related fields
    },

    // Attendees
    attendees: [{
        // You might store user IDs or other identifiers here
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        attendanceStatus: {
            type: String,
            enum: ['Present', 'Absent', 'Not Marked'],
            default: 'Not Marked',
        },
    }],

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
});

const Training = mongoose.model('TrainingSession', trainingSchema);

module.exports = Training;
