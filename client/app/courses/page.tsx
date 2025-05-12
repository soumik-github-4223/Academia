'use client';

import { useGetUserAllCoursesQuery } from '@/redux/features/courses/courseApi';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Course = {
  id: string;
  title: string;
  description: string;
};

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title') || ''; // Get the search query from the URL
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {}); // Fetch all courses

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (data) {
      // Perform advanced search: match against title and description
      const filtered = data.filter((course: Course) => {
        const searchLower = search.toLowerCase();
        return (
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower)
        );
      });
      setFilteredCourses(filtered);
    }
  }, [data, search]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: Course) => (
            <div key={course.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found matching your search.</p>
      )}
    </div>
  );
};

export default Page;