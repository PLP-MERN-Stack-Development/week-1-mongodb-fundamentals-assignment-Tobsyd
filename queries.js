// Connect to the database
//use plp_bookstore;

// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre (e.g., Fiction)
db.books.find({ genre: "Fiction" });

//2. Find books published after a certain year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950}});

//3. Find books by a specific author (e.g., George Orwell)
db.books.find({ author: "George Orwell"});

//4. Update the price of a specific book(e.g., update "1984" to $12.99)
db.books.updateOne({title: "1984"}, { $set: { price: 12.99 }});

//5. Delete a book by its title (e.g., delete "Moby Dick")
db.books.deleteOne({title: "Moby Dick"});

// Task 3: Advanced Queries

//1. Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: {$gt:2010}});

//2. Projection: return only title, author, and price
db.books.find({}, {_id: 0, title: 1, author: 1, price:1 });

//3. Sort books by price - ascending
db.books.find().sort({ price: 1 });

//4. Sort books by price - descending
db.books.find().sort({ price: -1 });

//5. Pagination: limit and skip (e.g., Page 2 with 5 books per page)
db.books.find().skip(5).limit(5);

// Task 4: Aggregation Pipelines

//1. Average price of books by genre
db.books.aggregate([
    { $group: {_id: "$genre", averagePrice: { $avg: "price"}}}
]);

//2. Author with the most books
db.books.aggregate([
    { $group: {_id: "$author", count: { $sum: 1 }}},
    { $sort: { count: -1 }},
    { $limit: 1 }
]);

//3. Group books by publication decade and count
db.books.aggregate([
    {
        $group: {_id: { decade: {$concat: [{ $substr: ["$published_year", 0, 3]},"0s"]}}, count: { $sum: 1}}
    },
    { $sort: {"_id.decade": 1 }}
]);

// Task 5: Indexing

//1. Create an index on the `title` field
db.books.createIndex({title: 1 });

//2. Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, public_year: 1});

//3. Use explain() to show performance with index (on title)
db.books.find({ title: "1984"})