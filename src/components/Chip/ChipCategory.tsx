import type { ChipCategoryProps } from '@/interfaces/chipInterface';

const mediaTypeMapping: Record<string, string> = {
  recipeWeb: 'Recipe Web',
  socialMedia: 'Social Media',
  youtube: 'Youtube',
  blog: 'Blog'
};

export default function ChipCategory({ mediaType }: ChipCategoryProps) {
  const displayMediaType = mediaTypeMapping[mediaType] || mediaType;

  return (
    <>
      <div className="inline-flex h-[2.6rem] gap-[1rem] items-center justify-center rounded-[0.8rem] border-[0.1rem] border-solid border-gray-300 bg-primary-white py-[0.5rem] px-[0.7rem]">
        <p className="text-[1.3rem] font-[500] text-gray-600">{displayMediaType}</p>
      </div>
    </>
  );
}
