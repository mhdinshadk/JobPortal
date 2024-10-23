import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

import { Briefcase, MapPin, Clock } from 'lucide-react';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) return `${seconds} seconds ago`;
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        if (days < 30) return `${days} days ago`;
        if (months < 12) return `${months} months ago`;
        return `${years} years ago`;
    };

    return (
        <div className="p-6 rounded-lg shadow-lg bg-gray-100 border border-gray-300 hover:shadow-xl transition-transform transform hover:scale-105 max-w-2xl mx-auto flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-600">{daysAgoFunction(job?.createdAt)}</p>
                <Button variant="outline" className="rounded-full text-black hover:bg-blue-200" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Section */}
            <div className="flex items-center gap-4 my-4">
                <Avatar className="w-14 h-14 border border-black">
                    <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
                </Avatar>
                <div className="flex-1">
                    <h2 className="font-semibold text-lg text-blue-700 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-500" />
                        {job?.company?.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{job?.location || 'India'}</span>
                    </div>
                </div>
            </div>

            {/* Job Title and Description */}
            <div className="my-4">
                <h1 className="font-bold text-xl mb-2 text-black">{job?.title}</h1>
                <p className="text-sm text-gray-700 line-clamp-3">{job?.description}</p>
            </div>

            {/* Badges Section */}
            <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="text-green-600 font-semibold bg-green-100 border border-green-300">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-red-600 font-semibold bg-red-100 border border-red-300">
                    {job?.jobType}
                </Badge>
                <Badge className="text-pink-600 font-semibold bg-pink-100 border border-pink-300">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto text-gray-600 hover:bg-blue-200"
                >
                    Details
                </Button>
                <Button className="bg-gray-800 text-white w-full sm:w-auto hover:bg-gray-400">
                    Save For Later
                </Button>
            </div>
            
        </div>
        
    );
};

export default Job;
