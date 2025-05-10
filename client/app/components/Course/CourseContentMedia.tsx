import CoursePlayer from '@/app/admin/utils/CoursePlayer';
import React from 'react';

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo }: Props) => {
    
  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
    </div>
  );
};

export default CourseContentMedia;