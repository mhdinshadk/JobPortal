import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="overflow-x-auto w-full">
            <Table className="min-w-full">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-sm sm:text-base">Date</TableHead>
                        <TableHead className="text-sm sm:text-base">Job Role</TableHead>
                        <TableHead className="text-sm sm:text-base">Company</TableHead>
                        <TableHead className="text-sm sm:text-base text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                You haven't applied for any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                                <TableCell className="text-sm sm:text-base">
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className="text-sm sm:text-base">
                                    {appliedJob.job?.title}
                                </TableCell>
                                <TableCell className="text-sm sm:text-base">
                                    {appliedJob.job?.company?.name}
                                </TableCell>
                                <TableCell className="text-sm sm:text-base text-right">
                                    <Badge
                                        className={`${
                                            appliedJob?.status === 'rejected'
                                                ? 'bg-red-400'
                                                : appliedJob.status === 'pending'
                                                ? 'bg-gray-400'
                                                : 'bg-green-400'
                                        }`}
                                    >
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;
