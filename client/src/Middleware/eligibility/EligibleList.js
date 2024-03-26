import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobsAction } from "../../redux/action/jobActions";

function EligibilityList() {
  const [eligibilityStatus, setEligibilityStatus] = useState([]);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobActions.jobs);
  const eligibility_info = useSelector(
    (state) => state.auth.data.eligibility_info
  );

  useEffect(() => {
    dispatch(getJobsAction());
  }, [dispatch]);

  useEffect(() => {
    if (jobs && eligibility_info) {
      const eligibilityStatus = jobs.map((job) => {
        const jobEligibility = {
          eligible_courses: job.eligibility.eligible_courses
            ? job.eligibility.eligible_courses.split(",")
            : [],
          passout_batch: job.eligibility.passout_batch,
          avg_cgpa: parseFloat(job.eligibility.avg_cgpa),
          min_12_percent: parseFloat(job.eligibility.min_12_percent),
        };

        const userEligibility = {
          avg_cgpa: parseFloat(eligibility_info.avg_cgpa),
          hsc_marks: parseFloat(eligibility_info.hsc_marks),
          ssc_marks: parseFloat(eligibility_info.ssc_marks),
          batch: eligibility_info.batch,
          branch: eligibility_info.branch,
        };

        const isEligible =
          (jobEligibility.eligible_courses.length === 0 ||
            jobEligibility.eligible_courses.includes(userEligibility.branch)) &&
          jobEligibility.passout_batch ===
            (parseInt(userEligibility.batch, 10) + 4).toString() &&
          jobEligibility.avg_cgpa <= userEligibility.avg_cgpa &&
          jobEligibility.min_12_percent <= userEligibility.hsc_marks;

        return { job_id: job._id, isEligible };
      });

      setEligibilityStatus(eligibilityStatus);
    }
  }, [jobs, eligibility_info]);

  return eligibilityStatus;
}

export default EligibilityList;
