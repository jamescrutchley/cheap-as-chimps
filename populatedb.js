#! /usr/bin/env node

console.log(
    'populate db'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Item = require("./models/Item");
  const Category = require("./models/Category");
  
  const items = [];
  const categories = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function itemCreate(index, name, description, price, category, stock) {
    const item = new Item({ name: name, description: description, price: price, category: category, stock: stock });
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }

//name, desc
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Food", "Various foodages"),
      categoryCreate(1, "Chimps", "Monkey fellas" ),
      categoryCreate(2, "Various animals", "Non refundable"),
      categoryCreate(3, "Misc", "Bits and pieces")
    ]);
  }

  //name, description, price, category, stock
  async function createItems() {
    console.log("Adding items");
    await Promise.all([
      itemCreate(0, "Friendly Yoghurt", "Yoghurt you can have a chat with", 4.95, categories[0], 100),
      itemCreate(1, "Phonebox Groceries", "Help yourself", 0.00, categories[0], 10),
      itemCreate(2, "Monkey Bank Robber", "What do you mean he backed out with the gun!?", 1400.00, categories[1], 1),
      itemCreate(3, "Builder Monkey", "Chimp off the old block", 1400.00, categories[1], 1),
      itemCreate(4, "Koko", "Highly educated ... photographer", 2400.00, categories[1], 1),
      itemCreate(5, "Man Moth", "Yeah, they've bred a Man Moth.", 1400.00, categories[2], 1),
      itemCreate(6, "Leech", "He had a look of frightenedness", 422.95, categories[2], 2001),
      itemCreate(7, "Worm", "As me or as a worm?", 0.95, categories[2], 2030),
      itemCreate(8, "Frog with enough venom to kill 1000 people", "Why are they so angry?", 999.95, categories[2], 210),
      itemCreate(9, "Slug", "I'd probably just throw myself into the salt pot.", 422.95, categories[2], 200),
      itemCreate(10, "Tabby cat", "Looks a bit fed up", 300.00, categories[2], 12),
      itemCreate(11, "Tree", "You plant it and it grows", 1.95, categories[3], 20000),
      itemCreate(12, "Levis 36", "It was a jacket!", 422.95, categories[3], 200),

      itemCreate(13, "Pikelet", "Sort of like a crumpet", 2.30, categories[0], 1000),
      itemCreate(14, "Flatworm", "Platyhelminth or summat", 40.25, categories[2], 50),
      itemCreate(15, "Twix Bar", "Age restrictions apply", 0.90, categories[1], 500),
      itemCreate(16, "Kitten", "It's an inappropriate gift", 422.95, categories[2], 20),
      itemCreate(17, "Bird", "Going around, wrecking lives", 422.95, categories[2], 200),


      itemCreate(18, "Octopus", "Do we need 'em?", 422.95, categories[2], 200),
      itemCreate(19, "50p", "It's the principle", 0.50, categories[3], 1),

    ]);
  }
  

  
