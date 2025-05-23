import { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "https://images.pexels.com/photos/4518839/pexels-photo-4518839.jpeg",
    readyInMinutes: 30,
    servings: 4,
    summary: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    cuisines: ["Italian"],
    dishTypes: ["main course", "dinner"],
    diets: [],
    instructions: "<ol><li>Cook spaghetti according to package instructions.</li><li>In a separate pan, cook the pancetta until crispy.</li><li>Whisk eggs, grated cheese, and black pepper in a bowl.</li><li>Drain pasta, reserving some pasta water.</li><li>Working quickly, mix hot pasta with egg mixture, adding pasta water as needed to create a creamy sauce.</li><li>Add pancetta and serve immediately.</li></ol>",
    extendedIngredients: [
      { id: 101, name: "spaghetti", amount: 1, unit: "pound" },
      { id: 102, name: "eggs", amount: 4, unit: "" },
      { id: 103, name: "pancetta", amount: 8, unit: "oz" },
      { id: 104, name: "Pecorino Romano", amount: 1, unit: "cup" },
      { id: 105, name: "black pepper", amount: 2, unit: "tsp" }
    ],
    healthScore: 45,
    vegetarian: false
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
    readyInMinutes: 60,
    servings: 6,
    summary: "A popular Indian dish featuring marinated chicken in a spiced curry sauce.",
    cuisines: ["Indian"],
    dishTypes: ["main course", "dinner"],
    diets: [],
    instructions: "<ol><li>Marinate chicken in yogurt and spices for at least 1 hour.</li><li>Grill or bake chicken until cooked through.</li><li>In a separate pan, make the sauce with onions, tomatoes, and spices.</li><li>Add cooked chicken to the sauce and simmer for 10 minutes.</li><li>Stir in cream and garnish with cilantro.</li></ol>",
    extendedIngredients: [
      { id: 201, name: "chicken breast", amount: 2, unit: "lbs" },
      { id: 202, name: "yogurt", amount: 1, unit: "cup" },
      { id: 203, name: "onion", amount: 1, unit: "large" },
      { id: 204, name: "garlic", amount: 4, unit: "cloves" },
      { id: 205, name: "ginger", amount: 1, unit: "tbsp" },
      { id: 206, name: "tomato sauce", amount: 15, unit: "oz" },
      { id: 207, name: "heavy cream", amount: 1, unit: "cup" },
      { id: 208, name: "garam masala", amount: 2, unit: "tbsp" }
    ],
    healthScore: 65,
    vegetarian: false
  },
  {
    id: 3,
    title: "Vegetarian Quinoa Bowl",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
    readyInMinutes: 25,
    servings: 2,
    summary: "A healthy and flavorful quinoa bowl packed with vegetables and protein.",
    cuisines: ["American", "Mediterranean"],
    dishTypes: ["lunch", "main course"],
    diets: ["vegetarian", "gluten free"],
    instructions: "<ol><li>Cook quinoa according to package instructions.</li><li>Roast or sauté your choice of vegetables.</li><li>Prepare a simple dressing with lemon juice, olive oil, and herbs.</li><li>Arrange quinoa and vegetables in bowls.</li><li>Top with avocado, seeds, and dressing.</li></ol>",
    extendedIngredients: [
      { id: 301, name: "quinoa", amount: 1, unit: "cup" },
      { id: 302, name: "broccoli", amount: 2, unit: "cups" },
      { id: 303, name: "bell pepper", amount: 1, unit: "" },
      { id: 304, name: "chickpeas", amount: 15, unit: "oz" },
      { id: 305, name: "avocado", amount: 1, unit: "" },
      { id: 306, name: "olive oil", amount: 2, unit: "tbsp" },
      { id: 307, name: "lemon juice", amount: 1, unit: "tbsp" }
    ],
    healthScore: 95,
    vegetarian: true
  },
  {
    id: 4,
    title: "Classic Beef Burger",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    readyInMinutes: 30,
    servings: 4,
    summary: "A juicy homemade beef burger with all the fixings.",
    cuisines: ["American"],
    dishTypes: ["lunch", "main course"],
    diets: [],
    instructions: "<ol><li>Mix ground beef with salt, pepper, and any desired seasonings.</li><li>Form into patties.</li><li>Grill or pan-fry to desired doneness.</li><li>Toast the buns.</li><li>Assemble burgers with your favorite toppings like lettuce, tomato, onion, and condiments.</li></ol>",
    extendedIngredients: [
      { id: 401, name: "ground beef", amount: 1.5, unit: "lbs" },
      { id: 402, name: "burger buns", amount: 4, unit: "" },
      { id: 403, name: "lettuce", amount: 4, unit: "leaves" },
      { id: 404, name: "tomato", amount: 1, unit: "" },
      { id: 405, name: "onion", amount: 1, unit: "" },
      { id: 406, name: "cheddar cheese", amount: 4, unit: "slices" }
    ],
    healthScore: 40,
    vegetarian: false
  },
  {
    id: 5,
    title: "Thai Green Curry",
    image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
    readyInMinutes: 45,
    servings: 4,
    summary: "A fragrant and spicy Thai curry with coconut milk and vegetables.",
    cuisines: ["Thai", "Asian"],
    dishTypes: ["main course", "dinner"],
    diets: [],
    instructions: "<ol><li>In a large pot, heat oil and cook curry paste until fragrant.</li><li>Add protein of choice and cook until browned.</li><li>Pour in coconut milk and bring to a simmer.</li><li>Add vegetables and cook until tender.</li><li>Season with fish sauce and sugar.</li><li>Serve with rice and garnish with Thai basil and lime.</li></ol>",
    extendedIngredients: [
      { id: 501, name: "green curry paste", amount: 3, unit: "tbsp" },
      { id: 502, name: "coconut milk", amount: 2, unit: "cans" },
      { id: 503, name: "chicken", amount: 1.5, unit: "lbs" },
      { id: 504, name: "bell pepper", amount: 1, unit: "" },
      { id: 505, name: "bamboo shoots", amount: 1, unit: "can" },
      { id: 506, name: "fish sauce", amount: 2, unit: "tbsp" },
      { id: 507, name: "Thai basil", amount: 1, unit: "cup" }
    ],
    healthScore: 70,
    vegetarian: false
  },
  {
    id: 6,
    title: "Mediterranean Salad",
    image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg",
    readyInMinutes: 15,
    servings: 2,
    summary: "A refreshing salad with Mediterranean flavors including feta, olives, and a lemon vinaigrette.",
    cuisines: ["Mediterranean", "Greek"],
    dishTypes: ["salad", "side dish", "lunch"],
    diets: ["vegetarian"],
    instructions: "<ol><li>Combine chopped cucumber, tomato, red onion, and bell pepper in a bowl.</li><li>Add Kalamata olives and cubed feta cheese.</li><li>Mix olive oil, lemon juice, oregano, salt, and pepper for the dressing.</li><li>Pour dressing over salad and toss gently.</li><li>Serve immediately or refrigerate for flavors to meld.</li></ol>",
    extendedIngredients: [
      { id: 601, name: "cucumber", amount: 1, unit: "" },
      { id: 602, name: "tomato", amount: 2, unit: "" },
      { id: 603, name: "red onion", amount: 0.5, unit: "" },
      { id: 604, name: "bell pepper", amount: 1, unit: "" },
      { id: 605, name: "Kalamata olives", amount: 0.5, unit: "cup" },
      { id: 606, name: "feta cheese", amount: 4, unit: "oz" },
      { id: 607, name: "olive oil", amount: 3, unit: "tbsp" },
      { id: 608, name: "lemon juice", amount: 2, unit: "tbsp" }
    ],
    healthScore: 90,
    vegetarian: true
  },
  {
    id: 7,
    title: "Chocolate Chip Cookies",
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg",
    readyInMinutes: 30,
    servings: 24,
    summary: "Classic homemade chocolate chip cookies that are soft in the middle and crispy on the edges.",
    cuisines: ["American"],
    dishTypes: ["dessert", "snack"],
    diets: [],
    instructions: "<ol><li>Preheat oven to 375°F (190°C).</li><li>Cream together butter and sugars until light and fluffy.</li><li>Beat in eggs and vanilla.</li><li>Mix in dry ingredients until combined.</li><li>Fold in chocolate chips.</li><li>Drop by rounded tablespoons onto baking sheets.</li><li>Bake for 9-11 minutes or until golden brown.</li><li>Cool on baking sheets for 2 minutes, then transfer to wire racks.</li></ol>",
    extendedIngredients: [
      { id: 701, name: "butter", amount: 1, unit: "cup" },
      { id: 702, name: "brown sugar", amount: 0.75, unit: "cup" },
      { id: 703, name: "granulated sugar", amount: 0.75, unit: "cup" },
      { id: 704, name: "eggs", amount: 2, unit: "" },
      { id: 705, name: "vanilla extract", amount: 2, unit: "tsp" },
      { id: 706, name: "all-purpose flour", amount: 2.25, unit: "cups" },
      { id: 707, name: "baking soda", amount: 1, unit: "tsp" },
      { id: 708, name: "salt", amount: 0.5, unit: "tsp" },
      { id: 709, name: "chocolate chips", amount: 2, unit: "cups" }
    ],
    healthScore: 25,
    vegetarian: true
  },
  {
    id: 8,
    title: "Roast Chicken with Vegetables",
    image: "https://images.pexels.com/photos/265393/pexels-photo-265393.jpeg",
    readyInMinutes: 90,
    servings: 4,
    summary: "A classic roast chicken dinner with root vegetables and herbs.",
    cuisines: ["American", "British"],
    dishTypes: ["main course", "dinner"],
    diets: [],
    instructions: "<ol><li>Preheat oven to 425°F (220°C).</li><li>Season chicken inside and out with salt, pepper, and herbs.</li><li>Stuff cavity with lemon, garlic, and herbs if desired.</li><li>Place chopped vegetables in a roasting pan and place chicken on top.</li><li>Drizzle everything with olive oil.</li><li>Roast for 70-90 minutes until chicken juices run clear.</li><li>Let rest for 10-15 minutes before carving.</li><li>Serve with roasted vegetables.</li></ol>",
    extendedIngredients: [
      { id: 801, name: "whole chicken", amount: 4, unit: "lbs" },
      { id: 802, name: "potatoes", amount: 1.5, unit: "lbs" },
      { id: 803, name: "carrots", amount: 4, unit: "" },
      { id: 804, name: "onion", amount: 1, unit: "" },
      { id: 805, name: "garlic", amount: 1, unit: "head" },
      { id: 806, name: "lemon", amount: 1, unit: "" },
      { id: 807, name: "olive oil", amount: 3, unit: "tbsp" },
      { id: 808, name: "rosemary", amount: 2, unit: "sprigs" },
      { id: 809, name: "thyme", amount: 4, unit: "sprigs" }
    ],
    healthScore: 75,
    vegetarian: false
  }
];