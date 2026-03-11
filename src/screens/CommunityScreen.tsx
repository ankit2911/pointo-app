import React from 'react';
import { communityPosts } from '../data/communityPosts';
import CommunityCard from '../components/CommunityCard';

const CommunityScreen: React.FC = () => {
  return (
    <div className="p-4 pb-6">
      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-gray-900">Community</h1>
        <p className="text-sm text-gray-500 mt-0.5">See what riders near you are saying</p>
      </div>

      {/* Stats bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
          <p className="text-lg font-extrabold text-green-700">2.4K</p>
          <p className="text-[10px] text-green-600 font-medium">Upgrades</p>
        </div>
        <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center">
          <p className="text-lg font-extrabold text-emerald-700">₹18L</p>
          <p className="text-[10px] text-emerald-600 font-medium">Total Saved</p>
        </div>
        <div className="flex-1 bg-teal-50 rounded-xl p-3 text-center">
          <p className="text-lg font-extrabold text-teal-700">4.8★</p>
          <p className="text-[10px] text-teal-600 font-medium">Avg Rating</p>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {communityPosts.map((post) => (
          <CommunityCard
            key={post.id}
            name={post.name}
            avatar={post.avatar}
            distance={post.distance}
            message={post.message}
            savings={post.savings}
            rangeImprovement={post.rangeImprovement}
            likes={post.likes}
            comments={post.comments}
            timeAgo={post.timeAgo}
            isPointoOwner={post.isPointoOwner}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityScreen;
