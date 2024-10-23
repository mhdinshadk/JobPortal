import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 px-2"
            >
              <Button
                onClick={() => searchJobHandler(category)}
                variant="outline"
                className="w-full py-2 sm:py-3 lg:py-4  md:text-base  rounded-full"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
