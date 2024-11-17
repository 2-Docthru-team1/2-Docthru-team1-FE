import type { DetailTextCardProps } from '@/interfaces/cardInterface';

const titleOptions = {
  ingredient: 'Ingredients',
  direction: 'Direction',
  nutrition: 'Nutrition Facts (per serving)',
  benefit: 'The benefits of food'
};

export default function DetailTextCard({ type, content }: DetailTextCardProps) {
  const title = titleOptions[type] || '';

  return (
    <div className="flex flex-col gap-[2rem] w-[54.9rem]">
      <p className="font-semibold text-[2rem] leading-[2.387rem] text-primary-blue">{title}</p>
      <div>
        {type === 'ingredient' && (
          <ul className="list-disc list-inside">
            {(content as string[]).map((text, index) => (
              <li key={index} className="font-medium text-[1.6rem] leading-[2.56rem] text-gray-700">
                {text}
              </li>
            ))}
          </ul>
        )}
        {type === 'direction' && (
          <div>
            {(content as string[]).map((text, index) => (
              <p key={index} className="font-medium text-[1.6rem] leading-[2.56rem] text-gray-700">
                {text}
              </p>
            ))}
          </div>
        )}
        {type === 'nutrition' && (
          <div className="w-full border border-primary-beige rounded-[0.8rem] px-[1.6rem] py-[3rem] flex flex-col items-center gap-[2.8rem]">
            {typeof content === 'object' && !Array.isArray(content) && (
              <>
                <div className="grid grid-cols-4 gap-[2.8rem]">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.calories} Kcal</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Calories</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.fat}g</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Fat</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.carbs}g</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Carbs</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.sugars}g</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Sugars</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-[2.8rem]">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.protein}g</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Protein</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.sodium}mg</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Sodium</p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-[2.4rem] leading-[3.84rem] text-gray-700">{content.fiber}g</p>
                    <p className="font-bold text-[1.7rem] leading-[2.56rem] text-gray-700">Fiber</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {type === 'benefit' && (
          <div>
            <p className="font-medium text-[1.6rem] leading-[2.56rem] text-gray-700">{(content as string[])[0]}</p>
            {(content as string[]).slice(1).map((text, index) => (
              <p key={index + 1} className="font-medium text-[1.6rem] leading-[2.56rem] text-gray-700">
                {index + 1}. {text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
