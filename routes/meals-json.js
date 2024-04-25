var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/meals.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const meals = getMeals();
  res.json(meals);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const order = req.body.order;
  const date = req.body.date;
  const food = req.body.food;
  const symptom = req.body.symptom;
  const avoid = req.body.avoid;

  const meals = getMeals();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  meals.push({
    id,
    order,
    date,
    food,
    symptom,
    avoid
  });

  setMeals(meals);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const meals = getMeals().filter(meal => meal.id != id);

  setMeals(meals);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const order = req.body.order;
  const date = req.body.date;
  const food = req.body.food;
  const symptom = req.body.symptom;
  const avoid = req.body.avoid;

  const meals = getMeals();

  const meal = meals.find(meal => meal.id == id);
  if (meal) {
    meal.order = order;
    meal.date = date;
    meal.food = food;
    meal.symptom = symptom;
    meal.avoid = avoid;
  }

  setMeals(meals);

  res.json({ success: true });
});

function getMeals() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setMeals(meals) {
  const content = JSON.stringify(meals, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
