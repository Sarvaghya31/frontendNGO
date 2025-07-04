import React from 'react';
import { Link } from 'react-router-dom';

function IssueComponent({ allIssues }) {

  const trimDescription = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > 30
      ? words.slice(0, 30).join(' ') + '...'
      : text;
  };

  return (
  <div className="p-4 flex flex-col gap-1 ">
    {allIssues.map(issue => (
      <Link
        key={issue._id}
        to={`/user/issues/${issue._id}`}
        className="border border-amber-500 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 h-48 hover:bg-gray-100 w-full flex gap-2 overflow-hidden"
      > 
        <div className="h-full overflow-hidden rounded">
          <img
            src={issue.images || '/noImage.jpg'}
            alt="Issue"
            className="w-40 h-40"
          />
        </div>
        <div className=" ml-4 w-full h-full flex flex-col overflow-hidden">
          <h2 className="text-xl font-semibold truncate">{issue.title}</h2>
          <p className="text-sm text-gray-600 truncate">
            {trimDescription(issue.description)}
          </p>
        </div>
      </Link>
    ))}
  </div>
);
}

export default IssueComponent;
