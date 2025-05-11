import React from 'react';

interface NutritionInfoProps {
  nutrition: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds?: number;
    }[];
  };
}

const IMPORTANT_NUTRIENTS = [
  'Calories', 'Fat', 'Saturated Fat', 'Carbohydrates', 
  'Protein', 'Fiber', 'Sugar', 'Sodium', 'Cholesterol'
];

const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutrition }) => {
  // Filter out only the important nutrients
  const filteredNutrients = nutrition.nutrients.filter(nutrient => 
    IMPORTANT_NUTRIENTS.includes(nutrient.name)
  );

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredNutrients.map((nutrient, index) => (
          <div key={index} className="bg-white p-3 rounded-md shadow-sm">
            <div className="text-gray-500 text-sm mb-1">{nutrient.name}</div>
            <div className="font-semibold text-gray-800">
              {nutrient.amount} {nutrient.unit}
            </div>
            {nutrient.percentOfDailyNeeds && (
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(nutrient.percentOfDailyNeeds)}% Daily Value
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionInfo;