import React from 'react';

const SkeletonElement = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded ${className || ''} animate-pulse`}></div>
);

const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <SkeletonElement className="w-16 h-16 rounded-full" />
            <div className="flex-grow">
              <SkeletonElement className="h-6 w-1/2 mb-2" />
              <SkeletonElement className="h-4 w-1/3" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <SkeletonElement className="h-5 w-3/4 mb-3" />
              <SkeletonElement className="h-8 w-1/2" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <SkeletonElement className="h-5 w-3/4 mb-3" />
              <SkeletonElement className="h-8 w-1/2" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <SkeletonElement className="h-5 w-3/4 mb-3" />
              <SkeletonElement className="h-8 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
