const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  company_name: {
    type: String,
    default: "",
    required: true
  },
  company_email: {
    type: String,
    default: "",
    
  },
  company_website_url: {
    type: String,
    default: "",
    
  },
  company_location: {
    type: String,
    default: "",
    
  },
  company_description: {
    type: String,
    default: "",

  },
  job_tags: {
    organization_type: {
      type: String,
      default: "",
    },
    industry_sector: {
      type: String,
      default: "",
    },
    job_type: {
      type: String,
      default: "",
    },
    location_Type: {
      type: String,
      default: "",
    },
  },
  job_info: {
    job_profile: {
      type: String,
      default: "",
    },
    job_description: {
      type: String,
      default: "",
    },
    job_registration_link: {
      type: String,
      default: "",
    },
    job_location: {
      type: String,
      default: "",
    },
  },
  eligibility: {
    eligible_courses: {
      type: String,
      default: "",
    },
    passout_batch: {
      type: String,
      default: "",
    },
    avg_cgpa: {
      type: String,
      default: "",
    },
    min_12_percent: {
      type: String,
      default: "",
    },
    service_agreement_duration: {
      type: String,
      default: "",
    },
  },
  package: {
    base_salary: {
      type: String,
      default: "",
    },
    stock_options: {
      type: String,
      default: "",
    },
  },
  selection_process: {
    written_test: {
      type: Boolean,
      default: false,
    },
    technical_interview: {
      type: Boolean,
      default: false,
    },
    hr_interview: {
      type: Boolean,
      default: false,
    },
  },
  deadline_date: {
    type: Date,
    required: true
  },
  attendance: {
    type: Boolean,
    default: false,
  },
  candidates: [
    {
      uid: {
        type: String,
        default: "",
      },
      candidate_status: {
        type: String,
        default: "Applied",
        enum: [
          "Applied",
          "Appeared for Test",
          "Absent",
          "Shortlisted",
          "Selected",
        ],
      },
      timestamp: {
        type: Date,
      },
    },
  ],
  timestamp: {
    type: Date,
  },
});

const jobPost = mongoose.model("Company", jobPostSchema);
module.exports = jobPost;
