CREATE TABLE stock (
  product_id INTEGER PRIMARY KEY,
  quantity INTEGER NOT NULL CHECK (quantity >= 0)
);
