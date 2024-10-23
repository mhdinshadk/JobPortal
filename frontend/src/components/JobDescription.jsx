import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <Card className="max-w-5xl mx-auto my-10 shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            {singleJob?.title || 'Job Title'}
          </CardTitle>
          <Button
            onClick={!isApplied ? applyJobHandler : null}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="bg-primary-foreground text-primary">
            {singleJob?.jobType || 'Full-time'}
          </Badge>
          <Badge variant="secondary" className="bg-primary-foreground text-primary">
            {singleJob?.location || 'Remote'}
          </Badge>
          <Badge variant="secondary" className="bg-primary-foreground text-primary">
            {singleJob?.salary} LPA
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="mt-6 space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3">Job Description</h3>
          <p className="text-gray-600">{singleJob?.description}</p>
        </section>

        <Separator />

        <section>
          <h3 className="text-xl font-semibold mb-3">Details</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Role: {singleJob?.title}</li>
            <li>Location: {singleJob?.location || 'Not specified'}</li>
            <li>Experience: {singleJob?.experience} years</li>
            <li>Positions Available: {singleJob?.postion}</li>
            <li>Applicants: {singleJob?.applications?.length || 0}</li>
            <li>Posted Date: {singleJob?.createdAt?.split('T')[0]}</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h3 className="text-xl font-semibold mb-3">Requirements</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Proficiency in relevant technologies</li>
            <li>Good communication and problem-solving skills</li>
            <li>Ability to work in a team and manage tasks independently</li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
};

export default JobDescription;
