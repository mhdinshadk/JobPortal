import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const query = searchedQuery ? searchedQuery.toLowerCase() : '';

    if (query) {
      const filtered = allJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Job Listings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Section */}
          <div className="w-full md:w-64 -ml-4 md:-ml-8 lg:-ml-12">
            <FilterCard />
          </div>

          {/* Job Listing Section */}
          <div className="flex-grow h-[80vh] overflow-y-auto pb-5">
            {filteredJobs.length === 0 ? (
              <div className="text-center mt-10 text-gray-500">
                No jobs found.
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
