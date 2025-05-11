export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
  servings: number;
  readyInMinutes: number;
  license?: string;
  sourceName?: string;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  healthScore: number;
  spoonacularScore?: number;
  pricePerServing?: number;
  analyzedInstructions?: any[];
  cheap?: boolean;
  creditsText?: string;
  cuisines?: string[];
  dairyFree?: boolean;
  diets?: string[];
  gaps?: string;
  glutenFree?: boolean;
  instructions?: string;
  ketogenic?: boolean;
  lowFodmap?: boolean;
  occasions?: string[];
  sustainable?: boolean;
  vegan?: boolean;
  vegetarian?: boolean;
  veryHealthy?: boolean;
  veryPopular?: boolean;
  weightWatcherSmartPoints?: number;
  dishTypes?: string[];
  extendedIngredients?: Ingredient[];
  summary?: string;
  winePairing?: WinePairing;
  nutrition?: {
    nutrients: Nutrient[];
  };
}

export interface Ingredient {
  id: number;
  aisle?: string;
  image?: string;
  consistency?: string;
  name: string;
  original?: string;
  originalName?: string;
  amount: number;
  unit: string;
  meta?: string[];
  metaInformation?: string[];
  measures?: {
    us: Measure;
    metric: Measure;
  };
}

export interface Measure {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Nutrient {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds?: number;
}

export interface WinePairing {
  pairedWines: string[];
  pairingText: string;
  productMatches: any[];
}