interface ChallengeData {
  status: string;
  title: string;
  tags: string[];
  closingDate: string;
}

interface ChallengeCardProps {
  data: ChallengeData;
}

export default function ChallengeCard({ data }: ChallengeCardProps) {
  if (!data) {
    return <div className="text-center">로딩중...</div>;
  }

  return (
    <div className="w-80 border border-gray-200 rounded-lg p-4 flex flex-col gap-3 bg-white shadow-sm">
      <div className="flex justify-start items-center">
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            data.status === 'On going' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
          }`}
        >
          {data.status}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
      <div className="flex gap-2 mt-2">
        {data.tags.map((tag, index) => (
          <span
            key={index}
            className={`text-xs font-medium px-3 py-1 rounded-lg ${
              tag === 'Traditional' ? 'bg-[#F0C9D8] text-gray-600' : 'bg-[#FFFFFF] text-gray-800 border border-[#D4D4D4]'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-4">Closing on {data.closingDate}</p>
    </div>
  );
}
