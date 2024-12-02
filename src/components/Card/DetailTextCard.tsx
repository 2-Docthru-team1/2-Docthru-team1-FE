import type { DetailTextCardProps } from '@/interfaces/cardInterface';

const titleOptions = {
  ingredient: 'Ingredients',
  direction: 'Direction',
  nutrition: 'Nutrition Facts (per serving)',
  benefit: 'The benefits of food'
};

export default function DetailTextCard({ type, content, className }: DetailTextCardProps) {
  const title = titleOptions[type] || '';

  return (
    <div
      className={`flex flex-col gap-[2rem] 
    lg:w-[54.9rem]
    md:w-full
    sm:w-full
    ${className}`}
    >
      <p
        className="font-semibold leading-[2.387rem] text-primary-blue
      lg:text-[2rem]
      md:text-[2rem]
      sm:text-[1.6rem]"
      >
        {title}
      </p>
      <div>
        {type === 'ingredient' && Array.isArray(content) && (
          <ul className="list-disc list-inside">
            {content.map((text, index) => (
              <li
                key={index}
                className="font-medium leading-[2.56rem] text-gray-700
              lg:text-[1.6rem] 
              md:text-[1.6rem] 
              sm:text-[1.4rem] "
              >
                {text}
              </li>
            ))}
          </ul>
        )}
        {type === 'direction' && Array.isArray(content) && (
          <div>
            {content.map((text, index) => (
              <p
                key={index}
                className="font-medium leading-[2.56rem] text-gray-700 mb-[0.5rem]
              lg:text-[1.6rem] 
              md:text-[1.6rem] 
              sm:text-[1.4rem]"
              >
                {text}
              </p>
            ))}
          </div>
        )}
        {type === 'nutrition' && typeof content === 'object' && content !== null && !Array.isArray(content) && (
          <div className="w-full border border-primary-beige rounded-[0.8rem] px-[1.6rem] py-[3rem] flex flex-col items-center gap-[2.8rem]">
            <div
              className="grid gap-[2.8rem]
            lg:grid-cols-4
            md:grid-cols-4
            sm:grid-cols-2"
            >
              <div className="flex flex-col justify-center items-center">
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.calories} Kcal
                </p>
                <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Calories</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.fat}g
                </p>
                <p
                  className="font-bold leading-[2.56rem] text-gray-700
                lg:text-[1.7rem]
                md:text-[1.7rem]
                sm:text-[1.4rem]"
                >
                  Fat
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.carbs}g
                </p>
                <p
                  className="font-bold leading-[2.56rem] text-gray-700
                lg:text-[1.7rem]
                md:text-[1.7rem]
                sm:text-[1.4rem]"
                >
                  Carbs
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.sugars}g
                </p>
                <p
                  className="font-bold leading-[2.56rem] text-gray-700
                lg:text-[1.7rem]
                md:text-[1.7rem]
                sm:text-[1.4rem]"
                >
                  Sugars
                </p>
              </div>
            </div>
            <div
              className="grid gap-[2.8rem]
            lg:grid-cols-3
            md:grid-cols-3
            sm:grid-cols-2"
            >
              <div className="flex flex-col justify-center items-center">
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.protein}g
                </p>
                <p
                  className="font-bold leading-[2.56rem] text-gray-700
                lg:text-[1.7rem]
                md:text-[1.7rem]
                sm:text-[1.4rem]"
                >
                  Protein
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.sodium}mg
                </p>
                <p
                  className="font-bold leading-[2.56rem] text-gray-700
                lg:text-[1.7rem]
                md:text-[1.7rem]
                sm:text-[1.4rem]"
                >
                  Sodium
                </p>
              </div>
              <div
                className="flex flex-col justify-center items-center
                lg:col-span-1 lg:justify-self-auto
                md:col-span-1 md:justify-self-auto
                sm:col-span-2 sm:justify-self-center"
              >
                <p
                  className="font-bold leading-[3.84rem] text-gray-700
                lg:text-[2.4rem]
                md:text-[2.4rem]
                sm:text-[1.8rem]"
                >
                  {content.fiber}g
                </p>
                <p
                  className="font-bold leading-[2.56rem] text-gray-700
                lg:text-[1.7rem]
                md:text-[1.7rem]
                sm:text-[1.4rem]"
                >
                  Fiber
                </p>
              </div>
            </div>
          </div>
        )}
        {type === 'benefit' && Array.isArray(content) && (
          <div>
            <p className="font-medium text-[1.6rem] leading-[2.56rem] text-gray-700 mb-[0.7rem]">{content[0]}</p>
            {content.slice(1).map((text, index) => (
              <p key={index + 1} className="font-medium text-[1.6rem] leading-[2.56rem] text-gray-700 mb-[0.5rem]">
                {index + 1}. {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
