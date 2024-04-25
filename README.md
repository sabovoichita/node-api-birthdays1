# node-api-meals

Node JS CRUD API Example

- [x] store info in [JSON file](data/meals.json)
- [x] store info in DB [MySQL](https://www.mysql.com/)
- [ ] store info in file similar to mongo format (check https://github.com/sergeyksv/tingodb)
- [x] UI Example for this app can be found in [meals-planner](https://github.com/sabovoichita/meals-planner)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [JSON file as storage](#json-file-as-storage)
- [DB (MySQL) as storage](#db-mysql-as-storage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ⚙ Install

```sh
git clone https://github.com/sabovoichita/node-api-meals.git
cd node-api
npm install
```

## Usage

```sh
npm start
# or (when you work inside code and want auto restart)
npm run devstart
```

Open http://localhost:3000 to see if it works

## JSON file as storage

Meals are stored inside [data/meals.json](data/meals.json)

```js
// GET meals-json
fetch("http://localhost:3000/meals-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

// POST meals-json/create
fetch("http://localhost:3000/meals-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    order: 1,
    date: "18/03/2024",
    food: "4xPlain Toast",
    symptom: "none",
    avoid: "no"
  })
});

// DELETE meals-json/delete
fetch("http://localhost:3000/meals-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT meals-json/update
fetch("http://localhost:3000/meals-json/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    id: "fedcba1610310163146",
    order: 1,
    date: "18/03/2024",
    food: "4xPlain Toast",
    symptom: "none",
    avoid: "no"
  })
});
```

## DB (MySQL) as storage

Team members are stored in [MySQL](https://www.mysql.com/)

- configure user & pass for mysql connection [routes/meals-db.js](routes/meals-db.js)
- create a database named **meals**
- run [http://localhost:3000/meals/install](http://localhost:3000/meals/install)
- now you can run all CRUD operations
  - the same as for json but change url **"meals-json" -> "meals"**

## TODOs

in case port us used...

- give hints...
- and change port if not possible.

add port config
