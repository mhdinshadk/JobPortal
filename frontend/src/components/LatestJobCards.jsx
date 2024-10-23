import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
  return (
    <Card className="w-full max-w-md shadow-lg border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => navigate(`/description/${job._id}`)}>
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        {/* Company logo can be added here */}
        <img src={job?.company?.logo || 'default-logo.png'} alt={`${job?.company?.name} logo`} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <CardTitle className="text-xl font-bold">{job?.company?.name}</CardTitle>
          <p className="text-sm text-gray-500">{job?.position} Positions</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{job?.location || "India"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{job?.salary} LPA</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 font-bold">{job?.description}</p>
      </CardContent>

      {/* <CardFooter>
        <Button className="w-full">
          <Briefcase className="mr-2 h-4 w-4" /> Apply Now
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default LatestJobCards;
