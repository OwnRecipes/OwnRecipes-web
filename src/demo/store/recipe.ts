/* eslint-disable func-names */

import { getEnv } from '../../common/utility';
import { RecipeDto, RecipeListDto } from '../../recipe/store/RecipeTypes';

/* eslint-disable quotes, quote-props, comma-dangle */
export const demoRecipes: Array<RecipeDto> = [
  {
    "id": 1,
    "photo": `${getEnv('PUBLIC_URL')}/images/steak.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/steak.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 506,
            "title": "salt",
            "denominator": 1
          },
          {
            "id": 507,
            "title": "pepper",
            "denominator": 1
          },
          {
            "id": 508,
            "title": "vinegar",
            "denominator": 1
          },
          {
            "id": 509,
            "title": "chili",
            "denominator": 1
          },
          {
            "id": 510,
            "title": "onion",
            "denominator": 1
          },
          {
            "id": 511,
            "numerator": 2,
            "denominator": 1,
            "measurement": "cup",
            "title": "olive oil"
          },
          {
            "id": 512,
            "numerator": 4,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "curry"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 2,
        "title": "summer"
      }
    ],
    "tags": [
      {
        "id": 1,
        "title": "vegan"
      },
      {
        "id": 2,
        "title": "vegetarian"
      },
      {
        "id": 3,
        "title": "nut-free"
      },
      {
        "id": 4,
        "title": "gluten-free"
      }
    ],
    "subrecipes": [
      {
        "numerator": 1,
        "denominator": 1,
        "measurement": "tablespoon",
        "title": "Tasty Chili 2",
        "slug": "tasty-chili-2",
        "child_recipe_id": 2
      },
      {
        "numerator": 1,
        "denominator": 1,
        "measurement": "cup",
        "title": "Tasty Chili 3",
        "slug": "tasty-chili-3",
        "child_recipe_id": 3
      }
    ],
    "pub_username": "roy",
    "pub_date": "2011-05-21",
    "update_date": "2022-04-29",
    "title": "Tasty Chili",
    "slug": "tasty-chili",
    "info": "This chili is requested every winter by friends and family. I have been  making this chili every since I was a small child and learned from my grandma",
    "directions": "Brown the ground pork and ground sirlion in a medium pan. Add a teaspoon of sereano pepper while browning the meat. Season with kosher salt and pepper.\nChop the onion, bell pepper and one Serrano pepper and place them in a large pot.\nOpen up and drain both cans of kidney beans and add them to the large pot.\nOpen up both cans of stewed chili style tomatoes and add them to the pot.\nDrain the grease away from the browned meat and add the meat to the pot.\nPour in the tomato juice over the meat mixture.\nAdd kosher salt, black pepper, two table spoons of chili powder, and two teaspoons of ground cumin. Stir well.\nCook slowly over medium low heat for an hour. If it starts to bubble turn down the heat. Taste during the cooking process to check the seasoning add more to taste.",
    "source": "",
    "prep_time": 20,
    "cook_time": 40,
    "servings": 6,
    "rating": 5,
    "rating_count": 2,
    "public": true,
    "author": 1,
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 1,
      "title": "American"
    }
  },
  {
    "id": 4,
    "photo": `${getEnv('PUBLIC_URL')}/images/soup.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/soup.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 521,
            "numerator": 1,
            "denominator": 1,
            "title": "small butternut squash, cubed"
          },
          {
            "id": 522,
            "numerator": 2,
            "denominator": 1,
            "title": "red bell peppers, seeded and diced"
          },
          {
            "id": 523,
            "numerator": 1,
            "denominator": 1,
            "title": "sweet potato, peeled and cubed"
          },
          {
            "id": 524,
            "numerator": 3,
            "denominator": 1,
            "title": "Yukon Gold potatoes, cubed"
          },
          {
            "id": 525,
            "numerator": 1,
            "denominator": 1,
            "title": "red onion, quartered"
          },
          {
            "id": 526,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "chopped fresh thyme"
          },
          {
            "id": 527,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "chopped fresh rosemary"
          },
          {
            "id": 528,
            "numerator": 1,
            "denominator": 4,
            "measurement": "cup",
            "title": "olive oil"
          },
          {
            "id": 529,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "balsamic vinegar"
          },
          {
            "id": 530,
            "title": "salt and freshly ground black pepper",
            "denominator": 1
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 2,
        "title": "summer"
      }
    ],
    "tags": [
      {
        "id": 1,
        "title": "vegan"
      }
    ],
    "subrecipes": [],
    "pub_username": "Demo User",
    "pub_date": "2011-05-21",
    "update_date": "2018-02-05",
    "title": "Tasty Chili 4",
    "slug": "tasty-chili-4",
    "info": "This chili is requested every winter by friends and family. I have been  making this chili every since I was a small child and learned from my grandma",
    "directions": "Brown the ground pork and ground sirlion in a medium pan. Add a teaspoon of sereano pepper while browning the meat. Season with kosher salt and pepper.\nChop the onion, bell pepper and one Serrano pepper and place them in a large pot.\nOpen up and drain both cans of kidney beans and add them to the large pot.\nOpen up both cans of stewed chili style tomatoes and add them to the pot.\nDrain the grease away from the browned meat and add the meat to the pot.\nPour in the tomato juice over the meat mixture.\nAdd kosher salt, black pepper, two table spoons of chili powder, and two teaspoons of ground cumin. Stir well.\nCook slowly over medium low heat for an hour. If it starts to bubble turn down the heat. Taste during the cooking process to check the seasoning add more to taste.",
    "source": "",
    "prep_time": 60,
    "cook_time": 60,
    "servings": 8,
    "rating": 3,
    "rating_count": 132,
    "public": true,
    "author": 3,
    "course": {
      "id": 1,
      "title": "Entry"
    },
    "cuisine": {
      "id": 1,
      "title": "Mexican"
    }
  },
  {
    "id": 508,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/tomato-chili-potato-rosti.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/tomato-chili-potato-rosti.jpg`,
    "ingredient_groups": [
      {
        "title": "Potato rosti",
        "ingredients": [
          {
            "id": 201,
            "numerator": 800,
            "denominator": 1,
            "measurement": "gram",
            "title": "cooked and cooled down potatoes"
          },
          {
            "id": 202,
            "numerator": 1,
            "denominator": 2,
            "measurement": "bunch",
            "title": "spring onions"
          },
          {
            "id": 203,
            "numerator": 1,
            "denominator": 1,
            "measurement": "",
            "title": "chili"
          },
          {
            "id": 204,
            "numerator": 30,
            "denominator": 1,
            "measurement": "gram",
            "title": "sunflower seeds"
          },
          {
            "id": 205,
            "numerator": 2,
            "denominator": 1,
            "measurement": "",
            "title": "buns"
          },
          {
            "id": 207,
            "numerator": 3,
            "denominator": 1,
            "measurement": "",
            "title": "boiled eggs"
          },
          {
            "id": 209,
            "numerator": 100,
            "denominator": 1,
            "measurement": "gram",
            "title": "cream cheese"
          },
          {
            "id": 210,
            "numerator": 80,
            "denominator": 1,
            "measurement": "gram",
            "title": "grated cheese"
          }
        ]
      },
      {
        "title": "Tomato Dip",
        "ingredients": [
          {
            "id": 221,
            "numerator": 5,
            "denominator": 1,
            "measurement": "",
            "title": "tomatoes"
          },
          {
            "id": 222,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "tomato paste"
          },
          {
            "id": 223,
            "numerator": 2,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "hot paprika spice"
          },
          {
            "id": 224,
            "numerator": 0,
            "denominator": 0,
            "title": "salt"
          },
          {
            "id": 225,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "olive oil"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 2,
        "title": "summer"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      },
      {
        "id": 3,
        "title": "nut-free"
      }
    ],
    "subrecipes": [],
    "pub_username": "roy",
    "pub_date": "2018-05-21",
    "update_date": "2018-05-21",
    "title": "Tomato-Chili-Potato-Rosti",
    "slug": "tomato-chili-potato-rosti",
    "info": "Delicious side dish for buffet or parties.",
    "directions": "Potato-Rosti:\nGrind the potatoes and chop the onions into small pieces. Chop the chili and roast it in a pan without oil. Dice the buns, roast it and puree it. Mix potatoes, onions, chili and buns.\nPeel the boiled eggs, add salt and cream chesse, and puree it. Add it to the potatoes. Mix the cheese in.\nWith a tablespoon, form small rostis.\nBake at 220 °C for approx. 25 minutes.\n\nTomato Dip:\nMix all ingredients.\nDecorate the cooled down potato-rosti.",
    "source": "",
    "prep_time": 60,
    "cook_time": 25,
    "servings": 4,
    "rating": 4,
    "rating_count": 42,
    "public": true,
    "author": 2,
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 1,
      "title": "American"
    }
  },
  {
    "id": 509,
    "photo": null,
    "photo_thumbnail": null,
    "ingredient_groups": [
      {
        "title": "Wild Garlic Potatoe Cake",
        "ingredients": [
          {
            "id": 8936,
            "numerator": 500,
            "denominator": 1,
            "measurement": "gram",
            "title": "potatoes"
          },
          {
            "id": 8937,
            "numerator": 0,
            "denominator": 0,
            "title": "Salt"
          },
          {
            "id": 8938,
            "numerator": 2,
            "denominator": 1,
            "measurement": "bunch",
            "title": "of  wild garlic"
          },
          {
            "id": 8939,
            "numerator": 1,
            "denominator": 1,
            "title": "chili"
          },
          {
            "id": 8940,
            "numerator": 100,
            "denominator": 1,
            "measurement": "gram",
            "title": "feta cheese"
          },
          {
            "id": 8941,
            "numerator": 100,
            "denominator": 1,
            "measurement": "gram",
            "title": "green olives"
          },
          {
            "id": 8942,
            "numerator": 4,
            "denominator": 1,
            "title": "eggs"
          },
          {
            "id": 8943,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "paprika powder"
          },
          {
            "id": 8944,
            "numerator": 100,
            "denominator": 1,
            "measurement": "gram",
            "title": " cream"
          },
          {
            "id": 8945,
            "numerator": 0,
            "denominator": 0,
            "title": "nutmeg"
          }
        ]
      },
      {
        "title": "Asparagus",
        "ingredients": [
          {
            "id": 8946,
            "numerator": 1.5,
            "denominator": 1,
            "measurement": "kilogram",
            "title": "of asparagus"
          },
          {
            "id": 8947,
            "numerator": 30,
            "denominator": 1,
            "measurement": "gram",
            "title": "butter"
          },
          {
            "id": 8948,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "lemon juice"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 2,
        "title": "summer"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian",
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "vici",
    "pub_date": "2022-06-08T13:27:15.525308-05:00",
    "update_date": "2022-06-08T13:27:15.525562-05:00",
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 10,
      "title": "German"
    },
    "title": "Wild Garlic Potato Cake with Asparagus",
    "slug": "demo-wild-garlic-potato-cake-with-asparagus",
    "info": "",
    "directions": "Wild Garlic Potato Cake: \nPeel and cut the potatoes in slices. Cook them in hot salted water.\nChop finely the wild garlic and chili. cut the green olives in small slices.\nPut the feta, chili, olives, eggs paprika powder and cream  in a bowl and mix the ingredients well. Give it in a casserole dish and bake it in the oven for 30 min on 200 Grad Celsius.\n\nAsparagus:\nPeel and cut the asparagus in pieces\nGive the butter in a pan. Whe the butte ris melted give the asparagus in the pan and  roast it for 10 min. \nAt last give the lemon juice over the asparagus.",
    "source": "",
    "prep_time": -313373,
    "cook_time": -313373,
    "servings": 4,
    "public": true,
    "author": 3
  },
  {
    "id": 510,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/vegan-banana-bread.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/vegan-banana-bread.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 8949,
            "numerator": 2,
            "denominator": 1,
            "title": "ripe bananas"
          },
          {
            "id": 8950,
            "numerator": 120,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "maple syrup"
          },
          {
            "id": 8951,
            "numerator": 4,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "coconut oil or vegan butter"
          },
          {
            "id": 8952,
            "numerator": 4,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "plant-based milk"
          },
          {
            "id": 8953,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "apple cider vinegar"
          },
          {
            "id": 8954,
            "numerator": 70,
            "denominator": 1,
            "measurement": "gram",
            "title": "tender oat flakes"
          },
          {
            "id": 8955,
            "numerator": 170,
            "denominator": 1,
            "measurement": "gram",
            "title": "wholemeal flour"
          },
          {
            "id": 8956,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "walnuts"
          },
          {
            "id": 8957,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "cashew nuts"
          },
          {
            "id": 8958,
            "numerator": 3,
            "denominator": 2,
            "measurement": "teaspoon",
            "title": "baking powder"
          },
          {
            "id": 8959,
            "numerator": 1,
            "denominator": 2,
            "measurement": "teaspoon",
            "title": "cinnamon"
          },
          {
            "id": 8960,
            "numerator": 1,
            "denominator": 1,
            "measurement": "pinch",
            "title": "of salt"
          },
          {
            "id": 8961,
            "numerator": 25,
            "denominator": 1,
            "measurement": "gram",
            "title": "chocolate drops (optional)"
          }
        ]
      }
    ],
    "seasons": [],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "vici",
    "pub_date": "2022-06-08T13:32:44.087643-05:00",
    "update_date": "2022-06-08T13:32:45.917856-05:00",
    "course": {
      "id": 0,
      "title": "-"
    },
    "cuisine": {
      "id": 0,
      "title": "-"
    },
    "title": "The best vegan banana bread",
    "slug": "demo-the-best-vegan-banana-bread",
    "info": "",
    "directions": "Preheat the oven to 180°C top/bottom heat. Brush a 20 cm loaf tin with a little oil and set aside.\n    In a large bowl, mash the bananas and mix in all of the other wet ingredients (milk, melted coconut oil, maple syrup, apple cider vinegar).\n    Then crush the walnuts and cashews and stir into the wet mixture with the other dry ingredients (oatmeal, whole wheat flour, baking powder, cinnamon, salt).\n    Finally, stir in the chocolate drops.\n    Pour the batter into the loaf pan and smooth out.\n    Halve the banana, place on the dough, press down lightly and drizzle with a little maple syrup.\n    Bake the bread uncovered for 30 minutes. Then reduce the heat to 150°C and bake for another 20 minutes. (If the bread gets too dark, cover it with some baking paper or aluminum foil.)\n    Then let it cool for about 30 minutes and then carefully remove it from the mold.\n    As soon as the bread has cooled down, you can garnish it with more chocolate drops if you like.",
    "source": "",
    "prep_time": -313373,
    "cook_time": -313373,
    "servings": 4,
    "public": true,
    "author": 3
  },
  {
    "id": 511,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/beef-on-prunes.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/beef-on-prunes.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 8962,
            "numerator": 800,
            "denominator": 1,
            "measurement": "gram",
            "title": "beef stew"
          },
          {
            "id": 8963,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "olive oil"
          },
          {
            "id": 8964,
            "numerator": 1,
            "denominator": 1,
            "title": "onion"
          },
          {
            "id": 8965,
            "numerator": 2,
            "denominator": 1,
            "title": "cloves of garlic"
          },
          {
            "id": 8966,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "chopped parsley"
          },
          {
            "id": 8967,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "cinnamon"
          },
          {
            "id": 8968,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "cumin"
          },
          {
            "id": 8969,
            "numerator": 1,
            "denominator": 2,
            "measurement": "teaspoon",
            "title": "grated ginger"
          },
          {
            "id": 8970,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "black pepper"
          },
          {
            "id": 8971,
            "numerator": 1,
            "denominator": 2,
            "measurement": "teaspoon",
            "title": "saffron (or turmeric)"
          },
          {
            "id": 8972,
            "numerator": 1,
            "denominator": 2,
            "measurement": "liter",
            "title": "of water"
          },
          {
            "id": 8973,
            "numerator": 180,
            "denominator": 1,
            "measurement": "gram",
            "title": "pitted prunes"
          },
          {
            "id": 8974,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "honey"
          },
          {
            "id": 8975,
            "numerator": 0,
            "denominator": 0,
            "title": "Salt"
          },
          {
            "id": 8976,
            "numerator": 0,
            "denominator": 0,
            "title": "sesame"
          },
          {
            "id": 8977,
            "numerator": 0,
            "denominator": 0,
            "title": "almonds"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 2,
        "title": "summer"
      }
    ],
    "tags": [],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "vici",
    "pub_date": "2022-06-08T13:36:56.882587-05:00",
    "update_date": "2022-06-08T13:36:59.943829-05:00",
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 11,
      "title": "European"
    },
    "title": "Beef on prunes",
    "slug": "demo-beef-on-prunes",
    "info": "",
    "directions": "Wash the meat, pat dry and cut into large pieces. Heat the oil in a pot. Peel and finely dice the onion and garlic. Add the meat, onion, garlic, parsley and spices to the saucepan and brown well on all sides.\n     Deglaze with water, reduce the heat and simmer, covered, for 1 1/2 hours.\n     Add the prunes to the saucepan with the honey and salt and simmer, covered, over medium-high heat for 30 minutes.\n     Chop the almonds and toast them with the sesame seeds in a small pan until fragrant. Scatter the mixture over the meat and serve.",
    "source": "",
    "prep_time": -313373,
    "cook_time": -313373,
    "servings": 1,
    "public": true,
    "author": 3
  },
  {
    "id": 512,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/creamy-apple-pie.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/creamy-apple-pie.jpg`,
    "ingredient_groups": [
      {
        "title": "For the yeast dough",
        "ingredients": [
          {
            "id": 8995,
            "numerator": 100,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "milk"
          },
          {
            "id": 8996,
            "numerator": 400,
            "denominator": 1,
            "measurement": "gram",
            "title": "of flour"
          },
          {
            "id": 8997,
            "numerator": 1,
            "denominator": 2,
            "title": "yeast cube (21 g)"
          },
          {
            "id": 8998,
            "numerator": 80,
            "denominator": 1,
            "measurement": "gram",
            "title": "of sugar"
          },
          {
            "id": 8999,
            "numerator": 50,
            "denominator": 1,
            "measurement": "gram",
            "title": "soft butter"
          },
          {
            "id": 9000,
            "numerator": 1,
            "denominator": 1,
            "title": "egg"
          },
          {
            "id": 9001,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "vanilla sugar"
          },
          {
            "id": 9002,
            "numerator": 0,
            "denominator": 0,
            "title": "Salt"
          }
        ]
      },
      {
        "title": "For the Filling",
        "ingredients": [
          {
            "id": 9003,
            "numerator": 400,
            "denominator": 1,
            "measurement": "gram",
            "title": "of apples"
          },
          {
            "id": 9004,
            "numerator": 3,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "lemon juice"
          },
          {
            "id": 9005,
            "numerator": 50,
            "denominator": 1,
            "measurement": "gram",
            "title": "of raisins"
          },
          {
            "id": 9006,
            "numerator": 50,
            "denominator": 1,
            "measurement": "gram",
            "title": "of sugar"
          },
          {
            "id": 9007,
            "numerator": 0,
            "denominator": 0,
            "title": "butter for the mold"
          }
        ]
      },
      {
        "title": "For the icing",
        "ingredients": [
          {
            "id": 9008,
            "numerator": 100,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "sweet cream"
          },
          {
            "id": 9009,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "sugar"
          },
          {
            "id": 9010,
            "numerator": 1,
            "denominator": 1,
            "measurement": "pinch",
            "title": "cinnamon"
          },
          {
            "id": 9011,
            "numerator": 0,
            "denominator": 0,
            "title": "flaked almonds"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 3,
        "title": "autumn"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "vici",
    "pub_date": "2022-06-08T13:45:53.938359-05:00",
    "update_date": "2022-06-08T13:46:18.137762-05:00",
    "course": {
      "id": 6,
      "title": "Cake"
    },
    "cuisine": {
      "id": 11,
      "title": "European"
    },
    "title": "Creamy apple pie",
    "slug": "demo-creamy-apple-pie",
    "info": "",
    "directions": "Prepare a dough from the yeast dough ingredients as described in the \"Dwarf Snails\" recipe (leave some flour for flouring).\n     Peel, core and cut the apples into wedges. In a saucepan, add 2 tablespoons of water and the lemon juice. Stir in the apple slices, the raisins and the sugar, bring to the boil and let stand.\n     Preheat the oven to 200°C. Grease a tart pan.\n     Knead the yeast dough vigorously again, roll out on a floured work surface to fit the shape and leave a border. Spread the apples evenly on top.\n     Bake in the middle of the oven for 20 minutes.\n     For the glaze, lightly whip the cream, sugar and cinnamon, pour over the cake and bake for a further 10 minutes.\n     Remove from the oven, decorate with slivered almonds and cool on a wire rack.",
    "source": "",
    "prep_time": 30,
    "cook_time": 30,
    "servings": 4,
    "public": true,
    "author": 3
  },
  {
    "id": 513,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/crunchy-muesli.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/crunchy-muesli.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9012,
            "numerator": 180,
            "denominator": 1,
            "measurement": "gram",
            "title": "of rolled oats"
          },
          {
            "id": 9013,
            "numerator": 110,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "liquid honey"
          },
          {
            "id": 9014,
            "numerator": 50,
            "denominator": 1,
            "measurement": "gram",
            "title": "grated coconut"
          },
          {
            "id": 9015,
            "numerator": 50,
            "denominator": 1,
            "measurement": "gram",
            "title": "sunflower seeds"
          },
          {
            "id": 9016,
            "numerator": 50,
            "denominator": 1,
            "measurement": "gram",
            "title": "chopped walnuts"
          },
          {
            "id": 9017,
            "numerator": 40,
            "denominator": 1,
            "measurement": "gram",
            "title": "of sesame"
          },
          {
            "id": 9018,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "sunflower oil"
          },
          {
            "id": 9019,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "vanilla sugar"
          },
          {
            "id": 9020,
            "numerator": 1,
            "denominator": 1,
            "measurement": "pinch",
            "title": "salt"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 4,
        "title": "winter"
      }
    ],
    "tags": [
      {
        "id": 1,
        "title": "vegan"
      },
      {
        "id": 2,
        "title": "vegetarian"
      },
      {
        "id": 10,
        "title": "easy"
      },
      {
        "id": 11,
        "title": "gift"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "vici",
    "pub_date": "2022-06-08T13:53:10.220946-05:00",
    "update_date": "2022-06-08T13:53:11.667687-05:00",
    "course": {
      "id": 1,
      "title": "Breakfast"
    },
    "cuisine": {
      "id": 11,
      "title": "European"
    },
    "title": "Crunchy muesli variety",
    "slug": "demo-crunchy-muesli-variety",
    "info": "",
    "directions": "Preheat the oven to 120°C. Line a baking tray with parchment paper and spread the ingredients well mixed on it. Bake for at least 35 minutes until golden, turning frequently, then allow to cool.\n     Store the muesli airtight and use within 3-4 weeks.\n     Instead of oatmeal, the muesli is mixed with yoghurt or quark and refined with fruit.",
    "source": "",
    "prep_time": 5,
    "cook_time": 35,
    "servings": 6,
    "public": true,
    "author": 3
  },
  {
    "id": 514,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/chicken-roulade-with-dried-plums.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/chicken-roulade-with-dried-plums.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9029,
            "numerator": 4,
            "denominator": 1,
            "title": "Chicken breasts"
          },
          {
            "id": 9030,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "chopped dried plums"
          },
          {
            "id": 9031,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "plum butter"
          },
          {
            "id": 9032,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "curd"
          },
          {
            "id": 9033,
            "numerator": 1,
            "denominator": 1,
            "title": "onion"
          },
          {
            "id": 9034,
            "numerator": 0,
            "denominator": 0,
            "title": "butter or oil for cooking"
          },
          {
            "id": 9035,
            "numerator": 0,
            "denominator": 0,
            "title": "salt"
          },
          {
            "id": 9036,
            "numerator": 0,
            "denominator": 0,
            "title": "paprika spice, sweet"
          },
          {
            "id": 9037,
            "numerator": 0,
            "denominator": 0,
            "title": "pepper"
          },
          {
            "id": 9038,
            "numerator": 2,
            "denominator": 1,
            "title": "slice of ham"
          },
          {
            "id": 9039,
            "numerator": 10,
            "denominator": 1,
            "measurement": "gram",
            "title": "melted butter"
          },
          {
            "id": 9040,
            "numerator": 2,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "apricot jam"
          },
          {
            "id": 9041,
            "numerator": 0,
            "denominator": 0,
            "title": "vegetable stock or buoillon"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 1,
        "title": "spring"
      }
    ],
    "tags": [],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "Demo User",
    "pub_date": "2022-06-08T14:07:56.461828-05:00",
    "update_date": "2022-06-08T14:08:02.948341-05:00",
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 11,
      "title": "European"
    },
    "title": "Chicken-roulade with dried plums",
    "slug": "demo-chicken-roulade-with-dried-plums",
    "info": "Not the usual beef roulade.",
    "directions": "Cut the chicken breast fillets lengthways almost to the end, unfold and carefully flatten.\nPuree the plums, the plum jam and the quark with the hand blender.\nPeel the onion, chop finely and sauté in a little fat until light brown.\nSeason the fillets with salt, onions, some paprika spice and pepper. Halve the ham and place half a slice of ham on top of each fillet. Spread the fillets with the plum mixture, roll up lengthwise and secure with toothpicks. Place the rolls in an ovenproof dish.\nPreheat the oven to 180°C.\nMelt the butter, dissolve the jam in it and brush the fillets with it. Pour in some broth and cook in the oven for about 20 minutes.\nTake the rolls out and let them cool down a bit. Cut into thin slices and garnish arranged on a platter.\n\nSide dish:\nSalad and veggies.",
    "source": "",
    "prep_time": 25,
    "cook_time": 20,
    "servings": 4,
    "public": true,
    "author": 99
  },
  {
    "id": 515,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/tortilla-couscous-rolls.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/tortilla-couscous-rolls.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9042,
            "numerator": 120,
            "denominator": 1,
            "measurement": "gram",
            "title": "couscous"
          },
          {
            "id": 9043,
            "numerator": 300,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "boiling water"
          },
          {
            "id": 9044,
            "numerator": 1,
            "denominator": 1,
            "title": "handful spinach"
          },
          {
            "id": 9045,
            "numerator": 1,
            "denominator": 1,
            "title": "sprig of parsley"
          },
          {
            "id": 9046,
            "numerator": 1,
            "denominator": 4,
            "title": "lemon juice"
          },
          {
            "id": 9047,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "salt"
          },
          {
            "id": 9048,
            "numerator": 1,
            "denominator": 2,
            "measurement": "teaspoon",
            "title": "chili flakes"
          },
          {
            "id": 9049,
            "numerator": 1,
            "denominator": 1,
            "measurement": "pinch",
            "title": "pepper"
          },
          {
            "id": 9050,
            "numerator": 3,
            "denominator": 1,
            "title": "tortilla-wraps"
          }
        ]
      }
    ],
    "seasons": [],
    "tags": [
      {
        "id": 1,
        "title": "vegan"
      },
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "Demo User",
    "pub_date": "2022-06-09T14:27:03.468629-05:00",
    "update_date": "2022-06-09T14:27:04.501239-05:00",
    "course": {
      "id": 7,
      "title": "Side Dish"
    },
    "cuisine": {
      "id": 0,
      "title": "-"
    },
    "title": "Tortilla couscous rolls",
    "slug": "demo-tortilla-couscous-rolls",
    "info": "Those delicious rolls are a nice addition to finger food, or even as standalone with a dip.",
    "directions": "Pour the boiling water over the couscous and let it steep until the water is completely absorbed.\nFinely puree the remaining ingredients with a blender and stir into the couscous.\nSpread the couscous filling evenly over the tortilla wraps. Then roll up the wraps and cut off finger-thick slices.\nYou can serve the rolls with skewers and a barbecue sauce.",
    "source": "",
    "prep_time": 10,
    "cook_time": -313373,
    "servings": 4,
    "public": true,
    "author": 99
  } ,
  {
    "id": 516,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/simsalabim-cheescake-with-pudding.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/simsalabim-cheescake-with-pudding.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9073,
            "numerator": 550,
            "denominator": 1,
            "measurement": "gram",
            "title": "flour"
          },
          {
            "id": 9074,
            "numerator": 1,
            "denominator": 1,
            "measurement": "teaspoon",
            "title": "baking powder"
          },
          {
            "id": 9075,
            "numerator": 2,
            "denominator": 1,
            "title": "eggs"
          },
          {
            "id": 9076,
            "numerator": 275,
            "denominator": 1,
            "measurement": "gram",
            "title": "shortening"
          },
          {
            "id": 9077,
            "numerator": 485,
            "denominator": 1,
            "measurement": "gram",
            "title": "sugar"
          },
          {
            "id": 9078,
            "numerator": 1,
            "denominator": 1,
            "measurement": "kilogram",
            "title": "blueberries"
          },
          {
            "id": 9079,
            "numerator": 500,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "milk"
          },
          {
            "id": 9080,
            "numerator": 2,
            "denominator": 1,
            "measurement": "package",
            "title": "vanilla pudding powder"
          },
          {
            "id": 9081,
            "numerator": 500,
            "denominator": 1,
            "measurement": "gram",
            "title": "curd or cream cheese"
          },
          {
            "id": 9082,
            "numerator": 2,
            "denominator": 1,
            "measurement": "package",
            "title": "vanilla sugar"
          },
          {
            "id": 9083,
            "numerator": 0,
            "denominator": 0,
            "title": "shortening for the baking sheet"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 4,
        "title": "winter"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "Demo User",
    "pub_date": "2022-06-09T14:34:43.436216-05:00",
    "update_date": "2022-06-09T14:35:35.474435-05:00",
    "course": {
      "id": 6,
      "title": "Cake"
    },
    "cuisine": {
      "id": 11,
      "title": "European"
    },
    "title": "Simsalabim cheesecake with pudding",
    "slug": "demo-simsalabim-cheesecake-with-pudding",
    "info": "This blueberry cake is magical.",
    "directions": "Knead 350 g flour, baking powder, 2 eggs, 150 g shortening and 125 g sugar, leave to rest. For the crumble, knead 200 g flour, 150 g sugar and 125 g shortening. Let the dough rest. Wash berries.\n\nHeat the milk, mix the pudding powder with 150 ml water, 60 g sugar and 1 egg yolk. Boil the milk and let it cool down. Mix the quark, 150 g sugar and vanilla sugar, pour into the pudding. Beat the egg whites and fold into the cream.\n\nPreheat the oven to 200 °C. Roll out the pastry on a greased baking sheet. Spread the quark mixture on the dough. Scatter berries and sprinkles on top. Bake for about 50 minutes.",
    "source": "",
    "prep_time": 15,
    "cook_time": 50,
    "servings": 1,
    "public": true,
    "author": 99
  },
  {
    "id": 517,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/gorgonzola-asparagus.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/gorgonzola-asparagus.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9111,
            "numerator": 1,
            "denominator": 1,
            "measurement": "kilogram",
            "title": "of green asparagus"
          },
          {
            "id": 9112,
            "numerator": 0,
            "denominator": 0,
            "title": "salt"
          },
          {
            "id": 9113,
            "numerator": 0,
            "denominator": 0,
            "title": "sugar"
          },
          {
            "id": 9114,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "butter"
          },
          {
            "id": 9115,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "lemon juice"
          },
          {
            "id": 9116,
            "numerator": 150,
            "denominator": 1,
            "measurement": "gram",
            "title": "Gorgonzola"
          },
          {
            "id": 9117,
            "numerator": 2,
            "denominator": 1,
            "title": "tomatoes"
          },
          {
            "id": 9118,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "chopped parsley"
          },
          {
            "id": 9119,
            "numerator": 0,
            "denominator": 0,
            "title": "pepper"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 1,
        "title": "spring"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "Demo User",
    "pub_date": "2022-06-09T14:44:04.001019-05:00",
    "update_date": "2022-06-09T14:45:15.736852-05:00",
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 0,
      "title": "-"
    },
    "title": "Gorgonzola asparagus",
    "slug": "demo-gorgonzola-asparagus",
    "info": "Asparagus and gorgonzola are a perfect team.",
    "directions": "Wash and peel the asparagus, cut off the woody end pieces. Heat salted water with a little sugar, half the butter and the lemon juice and cook the asparagus in it for about twelve minutes.\n\nSlice the gorgonzola. Drain the asparagus, place in a heat-resistant dish and cover the lower part with Gorgonzola. Bake in the oven for about four minutes.\n\nWash the tomatoes and cut into small cubes. Heat the remaining butter, toss the diced tomatoes and half the parsley in it and sauté briefly. Season with salt and pepper and spread over the asparagus.\n\nServe garnished with the remaining parsley.\n\nSide dish:\nServe with salad and potatoes. Vegetable patties also fit very well.",
    "source": "",
    "prep_time": 5,
    "cook_time": 10,
    "servings": 4,
    "public": true,
    "author": 99
  },
  {
    "id": 518,
    "photo": null,
    "photo_thumbnail": null,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9196,
            "numerator": 500,
            "denominator": 1,
            "measurement": "gram",
            "title": "mushrooms"
          },
          {
            "id": 9197,
            "numerator": 3,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "olive oil"
          },
          {
            "id": 9198,
            "numerator": 0,
            "denominator": 0,
            "title": "salt, pepper"
          },
          {
            "id": 9199,
            "numerator": 3,
            "denominator": 1,
            "title": "cloves of garlic"
          },
          {
            "id": 9200,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "balsamic vinegar"
          },
          {
            "id": 9201,
            "numerator": 1,
            "denominator": 1,
            "measurement": "bunch",
            "title": "of parsley"
          },
          {
            "id": 9202,
            "numerator": 1,
            "denominator": 1,
            "measurement": "bunch",
            "title": "thyme"
          },
          {
            "id": 9203,
            "numerator": 0,
            "denominator": 0,
            "title": "lettuce leaves for serving"
          }
        ]
      }
    ],
    "seasons": [],
    "tags": [
      {
        "id": 1,
        "title": "vegan"
      },
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [
      {
        "child_recipe_id": 521,
        "slug": "demo-magical-menu",
        "numerator": 0,
        "denominator": 0,
        "measurement": "",
        "title": "Magical Menu"
      }
    ],
    "pub_username": "Demo User",
    "pub_date": "2022-06-10T00:02:36.771801-05:00",
    "update_date": "2022-06-10T00:18:39.511006-05:00",
    "course": {
      "id": 2,
      "title": "Entry"
    },
    "cuisine": {
      "id": 10,
      "title": "German"
    },
    "title": "Balsamic mushrooms",
    "slug": "demo-balsamic-mushrooms",
    "info": "This appetizer is part of a magic menu, see subrecipes.",
    "directions": "Clean mushrooms. Heat the oil in a pan and fry the mushrooms, remove and season.\n\nPeel and crush the garlic and sauté in the pan. Deglaze with the vinegar and return the mushrooms to the pan.\n\nChop parsley and thyme finely and mix with the mushrooms.\n\nArrange on lettuce leaves and serve.",
    "source": "",
    "prep_time": 5,
    "cook_time": 10,
    "servings": 4,
    "public": true,
    "author": 99
  },
  {
    "id": 519,
    "photo": null,
    "photo_thumbnail": null,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9204,
            "numerator": 1,
            "denominator": 1,
            "measurement": "kilogram",
            "title": "beef fillet"
          },
          {
            "id": 9205,
            "numerator": 0,
            "denominator": 0,
            "title": "salt, pepper"
          },
          {
            "id": 9206,
            "numerator": 1,
            "denominator": 1,
            "measurement": "bunch",
            "title": "mixed herbs"
          },
          {
            "id": 9207,
            "numerator": 100,
            "denominator": 1,
            "measurement": "gram",
            "title": "unshelled walnuts"
          },
          {
            "id": 9208,
            "numerator": 100,
            "denominator": 1,
            "measurement": "gram",
            "title": "butter cheese"
          },
          {
            "id": 9209,
            "numerator": 1,
            "denominator": 1,
            "measurement": "package",
            "title": "streaky bacon"
          },
          {
            "id": 9210,
            "numerator": 0,
            "denominator": 0,
            "title": "oil for frying"
          },
          {
            "id": 9211,
            "numerator": 3,
            "denominator": 1,
            "title": "onions"
          },
          {
            "id": 9212,
            "numerator": 3,
            "denominator": 1,
            "title": "carrots"
          },
          {
            "id": 9213,
            "numerator": 200,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "bouillon"
          },
          {
            "id": 9214,
            "numerator": 125,
            "denominator": 1,
            "measurement": "gram",
            "title": "crème fraîche"
          }
        ]
      }
    ],
    "seasons": [],
    "tags": [],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [
      {
        "child_recipe_id": 521,
        "slug": "demo-magical-menu",
        "numerator": 0,
        "denominator": 0,
        "measurement": "",
        "title": "Magical Menu"
      }
    ],
    "pub_username": "Demo User",
    "pub_date": "2022-06-10T00:14:06.846116-05:00",
    "update_date": "2022-06-10T00:18:46.061308-05:00",
    "course": {
      "id": 4,
      "title": "Main"
    },
    "cuisine": {
      "id": 10,
      "title": "German"
    },
    "title": "Herb fillet pocket",
    "slug": "demo-herb-fillet-pocket",
    "info": "This main course is part of a magic menu, see subrecipes.",
    "directions": "Wash the meat and pat dry with kitchen paper. Cut lengthways, unfold and pat dry. Season the inside well with pepper.\n\nChop the herbs, chop the nuts, dice the cheese. Mix the herbs, nuts and cheese and spread the mixture over the meat. Fold the meat halves together, cover with bacon on top and tie with firm twine.\n\nHeat the oil in a roasting pan, place the roast bacon-side down and sear over medium-high heat. Cut the onion into rough cubes. Slice the carrots. Turn the roast over, sear it and add the chopped vegetables all around. Deglaze with a little bouillon and let stew for about 2 hours with the lid closed. Gradually add boullion during this time. This is also a good opportunity to prepare the side dish.\n\nRemove the roast from the roaster and cover. Puree the roast stock with the vegetables, stir in the crème fraîche, season with salt and pepper and heat up.\n\nRemove the twine, slice the roast, arrange on plates and serve garnished with a little sauce.\n\nSide dish:\nSpaetzle, dumplings, green beans and salad.",
    "source": "",
    "prep_time": 15,
    "cook_time": 140,
    "servings": 4,
    "public": true,
    "author": 99
  },
  {
    "id": 520,
    "photo": null,
    "photo_thumbnail": null,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9215,
            "numerator": 100,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "eggnog"
          },
          {
            "id": 9216,
            "numerator": 500,
            "denominator": 1,
            "measurement": "milliliter",
            "title": "strong, hot coffee"
          },
          {
            "id": 9217,
            "numerator": 0,
            "denominator": 0,
            "title": "some whipped cream"
          },
          {
            "id": 9218,
            "numerator": 1,
            "denominator": 2,
            "measurement": "tablespoon",
            "title": "ground coffee"
          },
          {
            "id": 9219,
            "numerator": 1,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "cocoa"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 4,
        "title": "winter"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [
      {
        "child_recipe_id": 521,
        "slug": "demo-magical-menu",
        "numerator": 0,
        "denominator": 0,
        "measurement": "",
        "title": "Magical Menu"
      }
    ],
    "pub_username": "Demo User",
    "pub_date": "2022-06-10T00:16:39.330134-05:00",
    "update_date": "2022-06-10T00:18:51.368542-05:00",
    "course": {
      "id": 5,
      "title": "Dessert"
    },
    "cuisine": {
      "id": 10,
      "title": "German"
    },
    "title": "Eggnog coffee",
    "slug": "demo-eggnog-coffee",
    "info": "This dessert is part of a magic menu, see subrecipes.",
    "directions": "Preheat 4 cups, pour the eggnog into the cups and carefully top up with the coffee. Use a tablespoon to add a whipped cream to the coffee.\n\nMix the coffee powder with the cocoa. Dust the mixture over the cream and serve with a spoon.\n\nTip:\nCups can be preheated with hot water, or they can be filled with a little water and briefly placed in the microwave.",
    "source": "",
    "prep_time": 7,
    "cook_time": -313373,
    "servings": 4,
    "public": true,
    "author": 99
  },
  {
    "id": 521,
    "photo": null,
    "photo_thumbnail": null,
    "ingredient_groups": [],
    "seasons": [],
    "tags": [],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [
      {
        "child_recipe_id": 518,
        "slug": "demo-balsamic-mushrooms",
        "numerator": 0,
        "denominator": 0,
        "measurement": "",
        "title": "Balsamic mushrooms"
      },
      {
        "child_recipe_id": 519,
        "slug": "demo-herb-fillet-pocket",
        "numerator": 0,
        "denominator": 0,
        "measurement": "",
        "title": "Herb fillet pocket"
      },
      {
        "child_recipe_id": 520,
        "slug": "demo-eggnog-coffee",
        "numerator": 0,
        "denominator": 0,
        "measurement": "",
        "title": "Eggnog coffee"
      }
    ],
    "pub_username": "Demo User",
    "pub_date": "2022-06-10T00:18:07.279894-05:00",
    "update_date": "2022-06-10T00:18:18.673456-05:00",
    "course": {
      "id": 0,
      "title": "-"
    },
    "cuisine": {
      "id": 10,
      "title": "German"
    },
    "title": "Magical Menu",
    "slug": "demo-magical-menu",
    "info": "Magic menu for special moments.",
    "directions": "-",
    "source": "",
    "prep_time": -313373,
    "cook_time": -313373,
    "servings": 4,
    "public": true,
    "author": 99
  },
  {
    "id": 522,
    "photo": `${getEnv('PUBLIC_URL')}/images/demo/beetroot-cream-soup-with-croutons.jpg`,
    "photo_thumbnail": `${getEnv('PUBLIC_URL')}/images/demo/beetroot-cream-soup-with-croutons.jpg`,
    "ingredient_groups": [
      {
        "title": "",
        "ingredients": [
          {
            "id": 9230,
            "numerator": 1,
            "denominator": 1,
            "title": "unwaxed lemon"
          },
          {
            "id": 9231,
            "numerator": 2,
            "denominator": 1,
            "title": "shallots"
          },
          {
            "id": 9232,
            "numerator": 600,
            "denominator": 1,
            "measurement": "gram",
            "title": "beetroot"
          },
          {
            "id": 9233,
            "numerator": 1,
            "denominator": 1,
            "title": "walnut-sized piece of horseradish"
          },
          {
            "id": 9234,
            "numerator": 2,
            "denominator": 1,
            "measurement": "tablespoon",
            "title": "margarine"
          },
          {
            "id": 9235,
            "numerator": 1,
            "denominator": 1,
            "measurement": "liter",
            "title": "chicken stock"
          },
          {
            "id": 9236,
            "numerator": 4,
            "denominator": 1,
            "title": "slices of whole grain toast"
          },
          {
            "id": 9237,
            "numerator": 200,
            "denominator": 1,
            "measurement": "gram",
            "title": "Cremefine (use like crème fraîche)"
          },
          {
            "id": 9238,
            "numerator": 0,
            "denominator": 0,
            "title": "pepper"
          },
          {
            "id": 9239,
            "numerator": 1,
            "denominator": 2,
            "measurement": "bunch",
            "title": "of chives"
          }
        ]
      }
    ],
    "seasons": [
      {
        "id": 1,
        "title": "winter"
      }
    ],
    "tags": [
      {
        "id": 2,
        "title": "vegetarian"
      }
    ],
    "rating": 0,
    "rating_count": 0,
    "subrecipes": [],
    "pub_username": "Demo User",
    "pub_date": "2022-06-10T00:31:06.962942-05:00",
    "update_date": "2022-06-10T00:31:07.857306-05:00",
    "course": {
      "id": 2,
      "title": "Entry"
    },
    "cuisine": {
      "id": 0,
      "title": "-"
    },
    "title": "Beetroot cream soup with croutons",
    "slug": "demo-beetroot-cream-soup-with-croutons",
    "info": "",
    "directions": "Wash the lemon in hot water and rub dry. Using a vegetable peeler, peel off the peel very thinly, cut into fine strips and set aside. Halve the lemon and squeeze the juice. Wash, peel and finely dice the shallots. Peel and roughly dice the beetroot. Peel horseradish and grate finely.\n\nHeat half of the margarine in a pan. Fry the shallots in it until golden brown. Add beetroot and stew for about 5 minutes. Season with salt and pepper. Deglaze with chicken stock and lemon juice and cook over medium heat for about 30 minutes.\n\nCut the crust off the toast. Cut the toast into cubes. Heat the remaining margarine. Roast the toast cubes and lemon juice for about 2 minutes until golden brown. Salt and pepper lightly. Take out and set aside.\n\nPuree the beetroot cream soup. Stir the cremefine (remain about 4 tablespoons) into the beetroot cream soup, and heat, do not boil. Season with horseradish.\n\nWash the chives, shake dry and cut into small rolls. Serve the beetroot cream soup with the remaining cremefine and lemon croutons, sprinkle with the chives and serve.",
    "source": "",
    "prep_time": 15,
    "cook_time": 40,
    "servings": 4,
    "public": true,
    "author": 99
  }
];
/* eslint-enable quotes, quote-props, comma-dangle */

export const toRecipeListDto = (recipeDto: RecipeDto): RecipeListDto => ({
  id:              recipeDto.id,
  title:           recipeDto.title,
  slug:            recipeDto.slug,
  photo_thumbnail: recipeDto.photo_thumbnail,
  info:            recipeDto.info,
  rating:          recipeDto.rating,
  rating_count:    recipeDto.rating_count,
  pub_date:        recipeDto.pub_date,
});

const config = {
  pattern: '(.*)/recipe/recipes/(.*)/',
  fixtures: function (match: Array<string>) {
    // console.log(`fixtures running for recipe. match=${JSON.stringify(match)}`);

    if (match.length < 3) return demoRecipes[0];
    const slug = match[2];
    if (slug == null) return demoRecipes[0];

    const recipe = demoRecipes.find(item => item.slug === slug);
    return recipe ?? demoRecipes[0];
  },
  get: function (_match: Array<string>, data: Record<string, string | number | boolean>) {
    return { body : data };
  },
  delete: function () {
    return {
      status: 204,
    };
  },
};

export default config;
