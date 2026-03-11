import React, { useState } from 'react';

interface CommunityCardProps {
  name: string;
  avatar: string;
  distance: string;
  message: string;
  savings?: string;
  rangeImprovement?: string;
  likes: number;
  comments: number;
  timeAgo: string;
  isPointoOwner?: boolean;
  isUpgradePending?: boolean;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CommunityCard: React.FC<CommunityCardProps> = ({
  name, avatar, distance, message, savings, rangeImprovement, likes, comments, timeAgo, isPointoOwner, isUpgradePending,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="text-sm font-bold text-gray-900 truncate">{name}</h4>
            {isPointoOwner && (
              <span className="shrink-0 inline-flex items-center gap-0.5 bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Pointo Owner
              </span>
            )}
            {isUpgradePending && (
              <span className="shrink-0 inline-flex items-center gap-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                ⚡ Upgrade Pending
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">{distance} · {timeAgo}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-3">{message}</p>

      {(savings || rangeImprovement) && (
        <div className="flex gap-2 mb-3">
          {rangeImprovement && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              {rangeImprovement}
            </span>
          )}
          {savings && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg">
              💰 {savings}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2 border-t border-gray-50">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
        >
          <HeartIcon filled={liked} />
          <span>{likeCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
          <CommentIcon />
          <span>{comments}</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityCard;
