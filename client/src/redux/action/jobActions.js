import axios from "axios";

const URL = "http://localhost:8080";

export const addJobAction = (jobData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${URL}/api/jobs/addjobpost`, jobData);
    if (res.status === 200) {
      dispatch({
        type: "ADD_JOB",
        payload: {
          company_name: res.data.company_name,
          company_email: res.data.company_email,
          company_website_url: res.data.company_website_url,
          company_location: res.data.company_location,
          company_description: res.data.company_description,
          job_tags: {
            organization_type:
              res.data && res.data.job_tags
                ? res.data.job_tags.organization_type
                : undefined,
            industry_sector:
              res.data && res.data.job_tags
                ? res.data.job_tags.industry_sector
                : undefined,
            job_type:
              res.data && res.data.job_tags
                ? res.data.job_tags.job_type
                : undefined,
            location_Type:
              res.data && res.data.job_tags
                ? res.data.job_tags.location_Type
                : undefined,
          },
          job_info: res.data.job_info,
          eligibility: res.data.eligibility,
          package: res.data.package,
          selection_process: res.data.selection_process,
          deadline_date: res.data.deadline_date,
          attendance: res.data.attendance,
          candidates: res.data.candidates,
          timestamp: res.data.timestamp,
        },
      });
      alert("Job added successfully");
      navigate(-1);
    } else {
      alert("try again");
    }
  } catch (error) {
    console.log(error);
    alert("An error occurred while adding the job");
  }
};

export const getJobsAction = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/api/jobs/getalljobs`);

    if (response.status === 200) {
      dispatch({
        type: "GET_JOBS",
        payload: response.data.result,
      });
    } else {
      dispatch({ type: "GET_JOBS_ERROR", error: "Error fetching jobss" });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "GET_JOBS_ERROR", error: error.message });
  }
};

export const deleteJobAction = (jobId, setDeleteStatus) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${URL}/api/jobs/deletejobpost/${jobId}`
    );

    if (response.status === 200) {
      dispatch({
        type: "DELETE_JOB",
        payload: response.data.jobId,
      });
      setDeleteStatus(true);
    } else {
      dispatch({ type: "DELETE_JOB_ERROR", error: response.data.msg });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "DELETE_JOB_ERROR", error: error.message });
  }
};

export const updateJobAction = (jobData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${URL}/api/jobs/updatejobpost/${jobData._id}`,
      jobData
    );

    if (response.status === 200) {
      dispatch({
        type: "UPDATE_JOB",
        payload: response.data.result,
      });
    } else {
      dispatch({ type: "UPDATE_JOB_ERROR", error: response.data.message });
      alert("try again");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "UPDATE_JOB_ERROR", error: error.message });
  }
};

export const applyAction = (uid, jobId, trainingId) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/api/application/job/apply`, {
      uid,
      job_id: jobId,
      training_id: trainingId,
    });

    if (response.status === 200) {
      dispatch({
        type: "APPLY_JOB",
        payload: response.data.result,
      });
      alert("Applied successfully");
    } else {
      dispatch({ type: "APPLY_JOB_ERROR", error: response.data.message });
      alert("try again");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "APPLY_JOB_ERROR", error: error.message });
  }
};

export const WithdrawAction = (uid, jobId, trainingId) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/api/application/job/withdraw`, {
      uid,
      job_id: jobId,
      training_id: trainingId,
    });

    if (response.status === 200) {
      dispatch({
        type: "WITHDRAW_JOB",
        payload: response.data.result,
      });
      alert("Application withdrawn successfully");
    } else {
      dispatch({ type: "APPLY_JOB_ERROR", error: response.data.message });
      alert("try again");
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: "APPLY_JOB_ERROR", error: error.message });
  }
};

export const getCandidates = (applicationType, jobId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${URL}/api/application/appliedstudents/${applicationType}/${jobId}`
    );
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: "APPLIED_CANDIDATES",
        payload: {
          appliedStudents: response.data.appliedStudents,
          companyName: response.data.company_name,
          candidateStatus: response.data.candidate_status,
        },
      });
    } else {
      dispatch({
        type: "APPLY_CANDIDATES_ERROR",
        error: response.data.message,
      });
    }
  } catch (error) {
    dispatch({ type: "APPLY_CANDIDATES_ERROR", error: error.message });
  }
};
