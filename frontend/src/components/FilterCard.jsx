import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 md:mb-0 md:w-64">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5" />
        Filter Jobs
      </h2>
      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-md font-semibold mb-2">{data.filterType}</h3>
          <div className="flex flex-wrap md:flex-col gap-2">
            {data.array.map((item) => (
              <Button
                key={item}
                onClick={() => handleFilter(item)}
                variant={selectedCategory === item ? "default" : "outline"}
                className="w-full"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};



export default FilterCard;
