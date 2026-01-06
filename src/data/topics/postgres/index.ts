import { TopicQuestion } from '../types';

export const postgresQuestions: TopicQuestion[] = [
  {
    id: 'postgres-1',
    topic: 'PostgreSQL',
    question: 'What is PostgreSQL and why use it?',
    answer: `PostgreSQL is an open-source relational database known for its reliability, feature robustness, and performance. It supports advanced data types (JSON, arrays), full-text search, and ACID compliance, making it suitable for complex applications.`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-2',
    topic: 'PostgreSQL',
    question: 'What is the difference between VARCHAR and TEXT in PostgreSQL?',
    answer: `**VARCHAR(n)**: Variable-length string with a maximum length limit.
**TEXT**: Variable-length string with no specific limit (up to 1GB).
Performance-wise, they're similar in modern PostgreSQL versions.`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-3',
    topic: 'PostgreSQL',
    question: 'What are indexes in PostgreSQL and why are they important?',
    answer: `Indexes are data structures that improve query performance by allowing faster data retrieval. They work like a book's index, pointing to where data lives. Common types include B-tree (default), Hash, GIN, and GiST.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-4',
    topic: 'PostgreSQL',
    question: 'What is a foreign key constraint?',
    answer: `A foreign key is a field that links one table to another. It ensures referential integrity by preventing actions that would destroy links between tables. For example, preventing deletion of a user if they have posts.`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-5',
    topic: 'PostgreSQL',
    question: 'What is JSONB in PostgreSQL?',
    answer: `JSONB is a binary representation of JSON data that allows efficient storage and querying. Unlike JSON type, JSONB supports indexing and faster processing. It's useful for storing semi-structured data.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-6',
    topic: 'PostgreSQL',
    question: 'What are PostgreSQL transactions and ACID properties?',
    answer: `Transactions group multiple operations into a single unit. ACID properties ensure:
**Atomicity**: All or nothing
**Consistency**: Valid state transitions
**Isolation**: Concurrent transactions don't interfere
**Durability**: Committed data persists`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-7',
    topic: 'PostgreSQL',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    answer: `**INNER JOIN**: Returns only matching rows from both tables.
**LEFT JOIN**: Returns all rows from the left table and matching rows from the right table. Non-matching rows from the right table show NULL.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-8',
    topic: 'PostgreSQL',
    question: 'What are triggers in PostgreSQL?',
    answer: `Triggers are functions that automatically execute when certain events occur (INSERT, UPDATE, DELETE). They're useful for maintaining data integrity, logging changes, or enforcing business rules.`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-9',
    topic: 'PostgreSQL',
    question: 'What is a view in PostgreSQL?',
    answer: `A view is a virtual table based on a SQL query. It doesn't store data itself but provides a way to simplify complex queries, restrict data access, or present data in a specific format.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-10',
    topic: 'PostgreSQL',
    question: 'What is connection pooling and why is it important?',
    answer: `Connection pooling maintains a pool of database connections that can be reused, avoiding the overhead of creating new connections for each request. It improves performance and resource utilization, especially important in serverless environments.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-11',
    topic: 'PostgreSQL',
    question: 'What are CTEs (Common Table Expressions)?',
    answer: `CTEs are temporary named result sets that exist within a single statement.

\`\`\`sql
WITH active_users AS (
  SELECT * FROM users WHERE status = 'active'
),
user_posts AS (
  SELECT user_id, COUNT(*) as post_count
  FROM posts GROUP BY user_id
)
SELECT u.name, up.post_count
FROM active_users u
JOIN user_posts up ON u.id = up.user_id;
\`\`\`

**Recursive CTE:**
\`\`\`sql
WITH RECURSIVE hierarchy AS (
  -- Base case
  SELECT id, name, manager_id, 1 as level
  FROM employees WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case
  SELECT e.id, e.name, e.manager_id, h.level + 1
  FROM employees e
  JOIN hierarchy h ON e.manager_id = h.id
)
SELECT * FROM hierarchy;
\`\`\`

**Benefits:** Readability, reusability within query, recursive queries`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-12',
    topic: 'PostgreSQL',
    question: 'What are window functions in PostgreSQL?',
    answer: `Window functions perform calculations across rows related to the current row.

\`\`\`sql
-- Row number
SELECT name, department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;

-- Running total
SELECT date, amount,
  SUM(amount) OVER (ORDER BY date) as running_total
FROM sales;

-- Lead/Lag (access other rows)
SELECT date, amount,
  LAG(amount) OVER (ORDER BY date) as prev_amount,
  LEAD(amount) OVER (ORDER BY date) as next_amount
FROM sales;

-- Ranking functions
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC),       -- Gaps in rank
  DENSE_RANK() OVER (ORDER BY salary DESC), -- No gaps
  NTILE(4) OVER (ORDER BY salary DESC)      -- Quartiles
FROM employees;
\`\`\`

**PARTITION BY:** Divides rows into groups
**ORDER BY:** Ordering within partition`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-13',
    topic: 'PostgreSQL',
    question: 'How do you use EXPLAIN ANALYZE for query optimization?',
    answer: `EXPLAIN ANALYZE shows the query execution plan and actual runtime statistics.

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123;
\`\`\`

**Output interpretation:**
\`\`\`
Seq Scan on orders  (cost=0.00..1234.00 rows=10 width=100) (actual time=0.015..15.234 rows=8 loops=1)
  Filter: (user_id = 123)
  Rows Removed by Filter: 9992
Planning Time: 0.084 ms
Execution Time: 15.301 ms
\`\`\`

**Key metrics:**
- **Seq Scan:** Full table scan (bad for large tables)
- **Index Scan:** Uses index (good)
- **cost:** Estimated cost (startup..total)
- **rows:** Estimated vs actual row count
- **Execution Time:** Actual time

**Optimization tips:**
- Add indexes for filter conditions
- Look for Seq Scans on large tables
- Compare estimated vs actual rows`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-14',
    topic: 'PostgreSQL',
    question: 'What is the difference between UNION and UNION ALL?',
    answer: `**UNION:** Combines results and removes duplicates
\`\`\`sql
SELECT name FROM customers
UNION
SELECT name FROM employees;
-- Removes duplicate names
\`\`\`

**UNION ALL:** Combines results keeping all duplicates
\`\`\`sql
SELECT name FROM customers
UNION ALL
SELECT name FROM employees;
-- Keeps all names, including duplicates
\`\`\`

**Performance:**
- UNION ALL is faster (no deduplication)
- Use UNION ALL when duplicates are acceptable or impossible

**Other set operations:**
\`\`\`sql
-- INTERSECT: rows in both queries
SELECT id FROM A INTERSECT SELECT id FROM B;

-- EXCEPT: rows in first but not second
SELECT id FROM A EXCEPT SELECT id FROM B;
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-15',
    topic: 'PostgreSQL',
    question: 'What are materialized views in PostgreSQL?',
    answer: `Materialized views store query results physically (unlike regular views).

**Create:**
\`\`\`sql
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT 
  date_trunc('month', order_date) as month,
  SUM(amount) as total
FROM orders
GROUP BY 1;
\`\`\`

**Refresh:**
\`\`\`sql
-- Full refresh
REFRESH MATERIALIZED VIEW monthly_sales;

-- Concurrent refresh (no lock)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
\`\`\`

**Index for concurrent refresh:**
\`\`\`sql
CREATE UNIQUE INDEX ON monthly_sales (month);
\`\`\`

**Use cases:**
- Pre-computed aggregations
- Expensive queries run frequently
- Reporting dashboards
- Data warehousing

**Trade-off:** Faster reads, but data can be stale`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-16',
    topic: 'PostgreSQL',
    question: 'How do you work with JSON and JSONB in PostgreSQL?',
    answer: `**JSONB operators:**
\`\`\`sql
-- Access field
SELECT data->>'name' FROM users;           -- As text
SELECT data->'address'->'city' FROM users; -- Nested

-- Contains
SELECT * FROM users WHERE data @> '{"role": "admin"}';

-- Key exists
SELECT * FROM users WHERE data ? 'email';

-- Path exists
SELECT * FROM users WHERE data #> '{address,city}' IS NOT NULL;
\`\`\`

**JSONB functions:**
\`\`\`sql
-- Build JSON
SELECT jsonb_build_object('name', name, 'age', age) FROM users;

-- Aggregate to array
SELECT jsonb_agg(name) FROM users;

-- Expand object
SELECT * FROM jsonb_each_text('{"a":1, "b":2}');

-- Update nested field
UPDATE users SET data = jsonb_set(data, '{address,city}', '"NYC"');
\`\`\`

**Index JSONB:**
\`\`\`sql
CREATE INDEX ON users USING GIN (data);
CREATE INDEX ON users ((data->>'email'));
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-17',
    topic: 'PostgreSQL',
    question: 'What are the isolation levels in PostgreSQL?',
    answer: `**1. Read Uncommitted:** (Same as Read Committed in PostgreSQL)

**2. Read Committed (default):**
- Sees only committed data
- Each statement sees latest committed data
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
\`\`\`

**3. Repeatable Read:**
- Sees only data committed before transaction start
- Prevents non-repeatable reads
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
\`\`\`

**4. Serializable:**
- Strictest level
- Transactions behave as if run sequentially
\`\`\`sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

**Phenomena prevented:**
| Level | Dirty Read | Non-repeatable | Phantom |
|-------|------------|----------------|---------|
| Read Committed | Yes | No | No |
| Repeatable Read | Yes | Yes | Yes |
| Serializable | Yes | Yes | Yes |`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-18',
    topic: 'PostgreSQL',
    question: 'What are partial indexes in PostgreSQL?',
    answer: `Partial indexes only index rows matching a condition, reducing size and improving performance.

\`\`\`sql
-- Index only active users
CREATE INDEX idx_active_users ON users (email)
WHERE status = 'active';

-- Index only recent orders
CREATE INDEX idx_recent_orders ON orders (user_id, created_at)
WHERE created_at > '2024-01-01';

-- Index only non-null values
CREATE INDEX idx_premium ON users (subscription_id)
WHERE subscription_id IS NOT NULL;
\`\`\`

**Query must match condition:**
\`\`\`sql
-- Uses partial index
SELECT * FROM users WHERE status = 'active' AND email = 'test@test.com';

-- Does NOT use partial index
SELECT * FROM users WHERE email = 'test@test.com';
\`\`\`

**Benefits:**
- Smaller index size
- Faster index maintenance
- Better cache efficiency

**Use cases:** Soft deletes, status columns, date ranges`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-19',
    topic: 'PostgreSQL',
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    answer: `**DELETE:**
\`\`\`sql
DELETE FROM users WHERE id = 1;
DELETE FROM users;  -- All rows
\`\`\`
- DML operation
- Logged, can be rolled back
- Triggers fire
- Slower for many rows

**TRUNCATE:**
\`\`\`sql
TRUNCATE TABLE users;
TRUNCATE users, orders RESTART IDENTITY CASCADE;
\`\`\`
- DDL operation
- Very fast (deallocates pages)
- Can be rolled back in transaction
- Triggers don't fire
- Resets identity/serial

**DROP:**
\`\`\`sql
DROP TABLE users;
DROP TABLE IF EXISTS users CASCADE;
\`\`\`
- DDL operation
- Removes table structure
- Cannot be rolled back
- Cascades to dependent objects

**Summary:**
| Operation | Removes | Logged | Rollback | Triggers |
|-----------|---------|--------|----------|----------|
| DELETE | Rows | Yes | Yes | Yes |
| TRUNCATE | All rows | No | Yes | No |
| DROP | Table | No | No | No |`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-20',
    topic: 'PostgreSQL',
    question: 'How do you implement full-text search in PostgreSQL?',
    answer: `**Create search vector:**
\`\`\`sql
-- Stored column
ALTER TABLE articles ADD COLUMN search_vector tsvector;
UPDATE articles SET search_vector = 
  to_tsvector('english', title || ' ' || content);

-- Index
CREATE INDEX idx_search ON articles USING GIN (search_vector);
\`\`\`

**Search query:**
\`\`\`sql
SELECT * FROM articles
WHERE search_vector @@ to_tsquery('english', 'database & performance');
\`\`\`

**Search with ranking:**
\`\`\`sql
SELECT title, 
  ts_rank(search_vector, query) as rank
FROM articles, to_tsquery('english', 'postgresql') query
WHERE search_vector @@ query
ORDER BY rank DESC;
\`\`\`

**Phrase search:**
\`\`\`sql
WHERE search_vector @@ phraseto_tsquery('full text search');
\`\`\`

**Keep search_vector updated:**
\`\`\`sql
CREATE TRIGGER update_search BEFORE INSERT OR UPDATE
ON articles FOR EACH ROW EXECUTE
FUNCTION tsvector_update_trigger(search_vector, 'pg_catalog.english', title, content);
\`\`\``,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-21',
    topic: 'PostgreSQL',
    question: 'What are stored procedures vs functions in PostgreSQL?',
    answer: `**Functions:**
\`\`\`sql
CREATE FUNCTION get_user_count() RETURNS integer AS $$
  SELECT COUNT(*) FROM users;
$$ LANGUAGE SQL;

-- Usage
SELECT get_user_count();
\`\`\`

**Procedures (PostgreSQL 11+):**
\`\`\`sql
CREATE PROCEDURE transfer_funds(
  from_account integer,
  to_account integer,
  amount numeric
) AS $$
BEGIN
  UPDATE accounts SET balance = balance - amount WHERE id = from_account;
  UPDATE accounts SET balance = balance + amount WHERE id = to_account;
  COMMIT;  -- Can control transactions
END;
$$ LANGUAGE plpgsql;

-- Usage
CALL transfer_funds(1, 2, 100.00);
\`\`\`

**Key differences:**
| Feature | Function | Procedure |
|---------|----------|-----------|
| Returns value | Yes | No |
| Transaction control | No | Yes (COMMIT/ROLLBACK) |
| Called with | SELECT | CALL |
| In expressions | Yes | No |`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-22',
    topic: 'PostgreSQL',
    question: 'What is VACUUM and why is it important?',
    answer: `VACUUM reclaims storage occupied by dead tuples (deleted/updated rows).

**Why needed:**
PostgreSQL uses MVCC - updates/deletes create new row versions. Old versions become "dead tuples" that need cleanup.

**Basic VACUUM:**
\`\`\`sql
VACUUM users;           -- Reclaim space, don't return to OS
VACUUM FULL users;      -- Reclaim space, return to OS (locks table)
VACUUM ANALYZE users;   -- Also update statistics
\`\`\`

**Autovacuum:** Runs automatically (recommended)
\`\`\`sql
-- Check autovacuum settings
SHOW autovacuum;

-- Table-specific settings
ALTER TABLE users SET (autovacuum_vacuum_threshold = 50);
\`\`\`

**Monitoring:**
\`\`\`sql
SELECT relname, n_dead_tup, last_vacuum, last_autovacuum
FROM pg_stat_user_tables;
\`\`\`

**Best practices:**
- Don't disable autovacuum
- Monitor dead tuple counts
- VACUUM ANALYZE after bulk operations`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-23',
    topic: 'PostgreSQL',
    question: 'What are table partitioning strategies in PostgreSQL?',
    answer: `Partitioning splits large tables into smaller pieces for better performance.

**Range Partitioning:**
\`\`\`sql
CREATE TABLE orders (
  id serial,
  order_date date,
  amount numeric
) PARTITION BY RANGE (order_date);

CREATE TABLE orders_2024_q1 PARTITION OF orders
  FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
CREATE TABLE orders_2024_q2 PARTITION OF orders
  FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
\`\`\`

**List Partitioning:**
\`\`\`sql
CREATE TABLE users (
  id serial,
  country text
) PARTITION BY LIST (country);

CREATE TABLE users_us PARTITION OF users FOR VALUES IN ('US');
CREATE TABLE users_eu PARTITION OF users FOR VALUES IN ('UK', 'DE', 'FR');
\`\`\`

**Hash Partitioning:**
\`\`\`sql
CREATE TABLE logs PARTITION BY HASH (user_id);

CREATE TABLE logs_0 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE logs_1 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 1);
\`\`\`

**Benefits:** Faster queries, easier maintenance, parallel operations`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-24',
    topic: 'PostgreSQL',
    question: 'How do you handle NULL values in PostgreSQL?',
    answer: `**NULL comparison:**
\`\`\`sql
-- Wrong (always evaluates to NULL)
SELECT * FROM users WHERE name = NULL;

-- Correct
SELECT * FROM users WHERE name IS NULL;
SELECT * FROM users WHERE name IS NOT NULL;
\`\`\`

**COALESCE:** Return first non-null value
\`\`\`sql
SELECT COALESCE(nickname, name, 'Anonymous') FROM users;
\`\`\`

**NULLIF:** Return NULL if equal
\`\`\`sql
SELECT NULLIF(count, 0);  -- Returns NULL if count is 0
\`\`\`

**NULL in aggregates:**
\`\`\`sql
COUNT(*);     -- Counts all rows including NULL
COUNT(name);  -- Counts non-null values only
SUM(amount);  -- Ignores NULL values
\`\`\`

**NULL-safe comparison:**
\`\`\`sql
-- IS DISTINCT FROM (treats NULL as value)
WHERE a IS DISTINCT FROM b;     -- Handles NULL
WHERE a IS NOT DISTINCT FROM b;  -- NULL = NULL is true
\`\`\`

**Default value:**
\`\`\`sql
CREATE TABLE users (
  status text NOT NULL DEFAULT 'active'
);
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-25',
    topic: 'PostgreSQL',
    question: 'What are sequences in PostgreSQL?',
    answer: `Sequences generate unique integer values, commonly used for auto-incrementing IDs.

**Create sequence:**
\`\`\`sql
CREATE SEQUENCE user_id_seq
  START 1
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  CACHE 1;
\`\`\`

**Using with columns:**
\`\`\`sql
-- SERIAL (auto-creates sequence)
CREATE TABLE users (
  id SERIAL PRIMARY KEY
);

-- IDENTITY (SQL standard, PostgreSQL 10+)
CREATE TABLE users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);
\`\`\`

**Sequence functions:**
\`\`\`sql
SELECT nextval('user_id_seq');   -- Get next value
SELECT currval('user_id_seq');   -- Current value (after nextval)
SELECT setval('user_id_seq', 100);  -- Set current value

-- Reset sequence
ALTER SEQUENCE user_id_seq RESTART WITH 1;
\`\`\`

**Fix sequence after data import:**
\`\`\`sql
SELECT setval('user_id_seq', (SELECT MAX(id) FROM users));
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-26',
    topic: 'PostgreSQL',
    question: 'What is the difference between B-tree and GIN indexes?',
    answer: `**B-tree (default):**
\`\`\`sql
CREATE INDEX idx_email ON users (email);
\`\`\`
- Best for equality and range queries
- Supports: =, <, >, <=, >=, BETWEEN, IN
- One index per column (or composite)
- Good for high-cardinality columns

**GIN (Generalized Inverted Index):**
\`\`\`sql
CREATE INDEX idx_tags ON posts USING GIN (tags);
CREATE INDEX idx_jsonb ON data USING GIN (jsonb_column);
\`\`\`
- Best for composite values (arrays, JSONB, full-text)
- Supports: @>, ?, ?|, ?&, @@
- Stores multiple entries per row
- Slower writes, faster reads

**Other index types:**
\`\`\`sql
-- GiST: Geometric, full-text, ranges
CREATE INDEX idx_location ON places USING GIST (coordinates);

-- BRIN: Block Range Index (very large tables)
CREATE INDEX idx_date ON logs USING BRIN (created_at);

-- Hash: Equality only (rarely used)
CREATE INDEX idx_hash ON users USING HASH (id);
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-27',
    topic: 'PostgreSQL',
    question: 'How do you implement row-level security (RLS)?',
    answer: `Row-level security restricts which rows users can access.

\`\`\`sql
-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policy (users see only their documents)
CREATE POLICY user_documents ON documents
  USING (user_id = current_user_id());

-- Different policies for operations
CREATE POLICY select_policy ON documents
  FOR SELECT USING (is_public = true OR user_id = current_user_id());

CREATE POLICY insert_policy ON documents
  FOR INSERT WITH CHECK (user_id = current_user_id());

CREATE POLICY update_policy ON documents
  FOR UPDATE USING (user_id = current_user_id());
\`\`\`

**Bypass RLS:**
\`\`\`sql
-- Owner bypasses by default
ALTER TABLE documents FORCE ROW LEVEL SECURITY;

-- Grant bypass
GRANT BYPASS RLS ON TABLE documents TO admin;
\`\`\`

**Use cases:**
- Multi-tenant applications
- Data isolation
- Compliance requirements`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-28',
    topic: 'PostgreSQL',
    question: 'What are LATERAL joins in PostgreSQL?',
    answer: `LATERAL allows subqueries to reference columns from preceding tables.

**Without LATERAL (doesn't work):**
\`\`\`sql
-- Error: cannot reference "u" in subquery
SELECT u.*, p.*
FROM users u,
  (SELECT * FROM posts WHERE user_id = u.id LIMIT 3) p;
\`\`\`

**With LATERAL:**
\`\`\`sql
SELECT u.name, p.title
FROM users u
CROSS JOIN LATERAL (
  SELECT * FROM posts 
  WHERE user_id = u.id 
  ORDER BY created_at DESC 
  LIMIT 3
) p;
\`\`\`

**TOP-N per group pattern:**
\`\`\`sql
-- Get top 3 posts per user
SELECT u.name, p.title, p.created_at
FROM users u
LEFT JOIN LATERAL (
  SELECT * FROM posts 
  WHERE posts.user_id = u.id 
  ORDER BY created_at DESC 
  LIMIT 3
) p ON true;
\`\`\`

**Use cases:**
- Top-N per group
- Correlated subqueries in FROM
- Set-returning functions`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-29',
    topic: 'PostgreSQL',
    question: 'What is the difference between LIMIT and FETCH?',
    answer: `**LIMIT (PostgreSQL/MySQL syntax):**
\`\`\`sql
SELECT * FROM users ORDER BY id LIMIT 10;
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;
\`\`\`

**FETCH (SQL standard):**
\`\`\`sql
SELECT * FROM users ORDER BY id
FETCH FIRST 10 ROWS ONLY;

SELECT * FROM users ORDER BY id
OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;
\`\`\`

**FETCH with ties:**
\`\`\`sql
-- Include all rows with same value as last row
SELECT * FROM products ORDER BY price
FETCH FIRST 5 ROWS WITH TIES;
-- If 5th product has same price as 6th, includes both
\`\`\`

**Recommendation:**
- LIMIT is more common in PostgreSQL
- FETCH for SQL standard compliance
- FETCH WITH TIES for handling duplicates`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-30',
    topic: 'PostgreSQL',
    question: 'How do you perform upsert (INSERT ... ON CONFLICT)?',
    answer: `**Insert or update on conflict:**
\`\`\`sql
INSERT INTO users (email, name)
VALUES ('john@example.com', 'John')
ON CONFLICT (email) 
DO UPDATE SET name = EXCLUDED.name, updated_at = NOW();
\`\`\`

**Insert or ignore:**
\`\`\`sql
INSERT INTO users (email, name)
VALUES ('john@example.com', 'John')
ON CONFLICT DO NOTHING;
\`\`\`

**With constraint name:**
\`\`\`sql
INSERT INTO users (email, name)
VALUES ('john@example.com', 'John')
ON CONFLICT ON CONSTRAINT users_email_key
DO UPDATE SET name = EXCLUDED.name;
\`\`\`

**Conditional update:**
\`\`\`sql
INSERT INTO products (sku, price, stock)
VALUES ('ABC123', 99.99, 100)
ON CONFLICT (sku)
DO UPDATE SET 
  price = EXCLUDED.price,
  stock = products.stock + EXCLUDED.stock
WHERE products.price < EXCLUDED.price;  -- Only if new price is higher
\`\`\`

**EXCLUDED:** References the row that would have been inserted`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-31',
    topic: 'PostgreSQL',
    question: 'What are generated columns in PostgreSQL?',
    answer: `Generated columns compute values from other columns automatically.

**Stored generated column:**
\`\`\`sql
CREATE TABLE products (
  price numeric,
  quantity integer,
  total numeric GENERATED ALWAYS AS (price * quantity) STORED
);

-- total is auto-computed and stored
INSERT INTO products (price, quantity) VALUES (10, 5);
SELECT total FROM products;  -- Returns 50
\`\`\`

**Constraints:**
- Cannot be written to directly
- Can be indexed
- Must be STORED (PostgreSQL doesn't support VIRTUAL yet)

**Use cases:**
\`\`\`sql
-- Full name from parts
CREATE TABLE users (
  first_name text,
  last_name text,
  full_name text GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED
);

-- Search vector
CREATE TABLE articles (
  title text,
  content text,
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || content)
  ) STORED
);
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-32',
    topic: 'PostgreSQL',
    question: 'How do you use array data types in PostgreSQL?',
    answer: `**Define array column:**
\`\`\`sql
CREATE TABLE posts (
  id serial PRIMARY KEY,
  tags text[],
  scores integer[]
);
\`\`\`

**Insert arrays:**
\`\`\`sql
INSERT INTO posts (tags, scores)
VALUES ('{tech, database}', '{90, 85, 92}');

INSERT INTO posts (tags) 
VALUES (ARRAY['tech', 'database']);
\`\`\`

**Query arrays:**
\`\`\`sql
-- Contains element
SELECT * FROM posts WHERE 'tech' = ANY(tags);

-- Contains all elements
SELECT * FROM posts WHERE tags @> ARRAY['tech', 'database'];

-- Array length
SELECT array_length(tags, 1) FROM posts;

-- Access element (1-indexed)
SELECT tags[1] FROM posts;
\`\`\`

**Array functions:**
\`\`\`sql
-- Aggregate into array
SELECT array_agg(name) FROM users;

-- Unnest array to rows
SELECT unnest(tags) FROM posts;

-- Array operations
SELECT array_append(tags, 'new') FROM posts;
SELECT array_remove(tags, 'old') FROM posts;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-33',
    topic: 'PostgreSQL',
    question: 'What is pg_stat_statements and how do you use it?',
    answer: `pg_stat_statements tracks execution statistics of all SQL statements.

**Enable extension:**
\`\`\`sql
CREATE EXTENSION pg_stat_statements;
\`\`\`

**Configure in postgresql.conf:**
\`\`\`
shared_preload_libraries = 'pg_stat_statements'
pg_stat_statements.track = all
\`\`\`

**Query slow queries:**
\`\`\`sql
SELECT 
  query,
  calls,
  total_exec_time / 1000 as total_seconds,
  mean_exec_time as avg_ms,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
\`\`\`

**Most called queries:**
\`\`\`sql
SELECT query, calls
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 10;
\`\`\`

**Reset statistics:**
\`\`\`sql
SELECT pg_stat_statements_reset();
\`\`\`

**Use cases:**
- Find slow queries
- Identify optimization opportunities
- Monitor query patterns`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-34',
    topic: 'PostgreSQL',
    question: 'What are advisory locks in PostgreSQL?',
    answer: `Advisory locks are application-defined locks using arbitrary integers.

**Session-level locks:**
\`\`\`sql
-- Acquire lock (blocks until available)
SELECT pg_advisory_lock(12345);

-- Try to acquire (returns false if unavailable)
SELECT pg_try_advisory_lock(12345);

-- Release lock
SELECT pg_advisory_unlock(12345);
\`\`\`

**Transaction-level locks:**
\`\`\`sql
-- Released automatically at end of transaction
SELECT pg_advisory_xact_lock(12345);
\`\`\`

**Use cases:**
\`\`\`sql
-- Prevent concurrent processing of same record
SELECT pg_try_advisory_lock(user_id)
FROM users WHERE id = 123;

-- If returns true, we have the lock
-- Process the user...
SELECT pg_advisory_unlock(123);
\`\`\`

**Benefits:**
- Very fast (no table overhead)
- Application-defined semantics
- Cross-session synchronization

**Example:** Job queue, deduplication, rate limiting`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-35',
    topic: 'PostgreSQL',
    question: 'How do you implement audit logging in PostgreSQL?',
    answer: `**Using triggers:**
\`\`\`sql
CREATE TABLE audit_log (
  id serial PRIMARY KEY,
  table_name text,
  operation text,
  old_data jsonb,
  new_data jsonb,
  changed_by text DEFAULT current_user,
  changed_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (table_name, operation, old_data, new_data)
  VALUES (
    TG_TABLE_NAME,
    TG_OP,
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_audit
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger();
\`\`\`

**Query audit log:**
\`\`\`sql
SELECT * FROM audit_log 
WHERE table_name = 'users' 
ORDER BY changed_at DESC;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-36',
    topic: 'PostgreSQL',
    question: 'What is COPY and how is it used for bulk operations?',
    answer: `COPY is the fastest way to load/export data in PostgreSQL.

**Import from CSV:**
\`\`\`sql
COPY users (name, email, created_at)
FROM '/path/to/users.csv'
WITH (FORMAT csv, HEADER true);
\`\`\`

**Export to CSV:**
\`\`\`sql
COPY users TO '/path/to/export.csv'
WITH (FORMAT csv, HEADER true);

-- Export query result
COPY (SELECT * FROM users WHERE active = true)
TO '/path/to/active_users.csv'
WITH (FORMAT csv, HEADER true);
\`\`\`

**From stdin (psql):**
\`\`\`bash
cat users.csv | psql -c "COPY users FROM STDIN CSV HEADER"
\`\`\`

**Options:**
- FORMAT: csv, text, binary
- HEADER: true/false
- DELIMITER: comma, tab, etc.
- NULL: string representing NULL
- ENCODING: file encoding

**Performance tips:**
- Disable indexes before, rebuild after
- Increase maintenance_work_mem
- Use unlogged tables for intermediate data`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-37',
    topic: 'PostgreSQL',
    question: 'What are the different JOIN types in PostgreSQL?',
    answer: `**INNER JOIN:** Only matching rows
\`\`\`sql
SELECT * FROM orders o
INNER JOIN users u ON o.user_id = u.id;
\`\`\`

**LEFT JOIN:** All left rows + matching right
\`\`\`sql
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Users without orders have NULL for order columns
\`\`\`

**RIGHT JOIN:** All right rows + matching left
\`\`\`sql
SELECT * FROM orders o
RIGHT JOIN users u ON o.user_id = u.id;
\`\`\`

**FULL OUTER JOIN:** All rows from both
\`\`\`sql
SELECT * FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;
\`\`\`

**CROSS JOIN:** Cartesian product (all combinations)
\`\`\`sql
SELECT * FROM sizes CROSS JOIN colors;
\`\`\`

**NATURAL JOIN:** Join on columns with same name
\`\`\`sql
SELECT * FROM orders NATURAL JOIN customers;
-- Joins on all matching column names
\`\`\`

**Self JOIN:**
\`\`\`sql
SELECT e.name, m.name as manager
FROM employees e
JOIN employees m ON e.manager_id = m.id;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-38',
    topic: 'PostgreSQL',
    question: 'What is the difference between COUNT(*) and COUNT(column)?',
    answer: `**COUNT(*):**
- Counts all rows
- Includes NULL values
- Most efficient

\`\`\`sql
SELECT COUNT(*) FROM users;
-- Returns total row count
\`\`\`

**COUNT(column):**
- Counts non-NULL values only
- Slightly slower

\`\`\`sql
SELECT COUNT(email) FROM users;
-- Counts rows where email is not NULL
\`\`\`

**COUNT(DISTINCT column):**
\`\`\`sql
SELECT COUNT(DISTINCT country) FROM users;
-- Counts unique non-NULL values
\`\`\`

**Performance comparison:**
\`\`\`sql
-- Fast (uses statistics)
SELECT reltuples FROM pg_class WHERE relname = 'users';

-- Exact but slower
SELECT COUNT(*) FROM users;

-- Slower (checks column)
SELECT COUNT(email) FROM users;
\`\`\`

**Use COUNT(*) unless you specifically need to exclude NULLs.**`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-39',
    topic: 'PostgreSQL',
    question: 'What are expression indexes in PostgreSQL?',
    answer: `Expression indexes index the result of an expression rather than column values.

**Index on lowercase:**
\`\`\`sql
CREATE INDEX idx_lower_email ON users (LOWER(email));

-- Query uses index
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';
\`\`\`

**Index on date part:**
\`\`\`sql
CREATE INDEX idx_year ON orders (EXTRACT(year FROM created_at));

-- Uses index
SELECT * FROM orders WHERE EXTRACT(year FROM created_at) = 2024;
\`\`\`

**Index on JSONB field:**
\`\`\`sql
CREATE INDEX idx_status ON data ((jsonb_column->>'status'));

-- Uses index
SELECT * FROM data WHERE jsonb_column->>'status' = 'active';
\`\`\`

**Index on computed value:**
\`\`\`sql
CREATE INDEX idx_total ON orders ((price * quantity));
\`\`\`

**Key requirement:**
The query expression must EXACTLY match the index expression.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-40',
    topic: 'PostgreSQL',
    question: 'How do you implement soft deletes in PostgreSQL?',
    answer: `**Table structure:**
\`\`\`sql
CREATE TABLE users (
  id serial PRIMARY KEY,
  name text,
  deleted_at timestamptz DEFAULT NULL
);

CREATE INDEX idx_not_deleted ON users (id) WHERE deleted_at IS NULL;
\`\`\`

**Soft delete:**
\`\`\`sql
UPDATE users SET deleted_at = NOW() WHERE id = 1;
\`\`\`

**Query active records:**
\`\`\`sql
SELECT * FROM users WHERE deleted_at IS NULL;
\`\`\`

**Using views:**
\`\`\`sql
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;
\`\`\`

**Using RLS:**
\`\`\`sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY hide_deleted ON users
  FOR SELECT USING (deleted_at IS NULL);
\`\`\`

**Restore:**
\`\`\`sql
UPDATE users SET deleted_at = NULL WHERE id = 1;
\`\`\`

**Hard delete old soft-deleted:**
\`\`\`sql
DELETE FROM users 
WHERE deleted_at < NOW() - INTERVAL '30 days';
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-41',
    topic: 'PostgreSQL',
    question: 'What are the pg_dump and pg_restore utilities?',
    answer: `**pg_dump:** Backup database
\`\`\`bash
# SQL format
pg_dump mydb > backup.sql

# Custom format (compressed, supports parallel restore)
pg_dump -Fc mydb > backup.dump

# Directory format (parallel dump)
pg_dump -Fd -j 4 mydb -f backup_dir

# Specific table
pg_dump -t users mydb > users.sql

# Schema only
pg_dump --schema-only mydb > schema.sql

# Data only
pg_dump --data-only mydb > data.sql
\`\`\`

**pg_restore:** Restore from dump
\`\`\`bash
# From custom format
pg_restore -d mydb backup.dump

# Parallel restore
pg_restore -d mydb -j 4 backup.dump

# Create database
pg_restore -C -d postgres backup.dump
\`\`\`

**Restore SQL format:**
\`\`\`bash
psql mydb < backup.sql
\`\`\`

**Best practices:**
- Use custom format (-Fc) for flexibility
- Test restores regularly
- Store backups off-site`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-42',
    topic: 'PostgreSQL',
    question: 'What is the difference between HAVING and WHERE?',
    answer: `**WHERE:** Filters rows BEFORE grouping
\`\`\`sql
SELECT department, AVG(salary)
FROM employees
WHERE status = 'active'  -- Filter rows first
GROUP BY department;
\`\`\`

**HAVING:** Filters groups AFTER aggregation
\`\`\`sql
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;  -- Filter after grouping
\`\`\`

**Combined:**
\`\`\`sql
SELECT department, COUNT(*) as emp_count
FROM employees
WHERE hire_date > '2020-01-01'   -- Filter rows (before GROUP BY)
GROUP BY department
HAVING COUNT(*) > 5;              -- Filter groups (after GROUP BY)
\`\`\`

**Key differences:**
| WHERE | HAVING |
|-------|--------|
| Filters rows | Filters groups |
| Before GROUP BY | After GROUP BY |
| Can't use aggregates | Can use aggregates |
| Uses indexes | Runs after aggregation |`,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-43',
    topic: 'PostgreSQL',
    question: 'What are EXCLUDE constraints in PostgreSQL?',
    answer: `EXCLUDE constraints prevent overlapping or conflicting data using operators.

**Prevent overlapping time ranges:**
\`\`\`sql
CREATE EXTENSION btree_gist;  -- Required for range operators

CREATE TABLE bookings (
  room_id integer,
  during tstzrange,
  EXCLUDE USING gist (room_id WITH =, during WITH &&)
);

-- This works
INSERT INTO bookings VALUES (1, '[2024-01-01, 2024-01-05)');

-- This fails (overlaps)
INSERT INTO bookings VALUES (1, '[2024-01-03, 2024-01-10)');
\`\`\`

**Prevent overlapping numeric ranges:**
\`\`\`sql
CREATE TABLE ip_ranges (
  network text,
  ip_range int4range,
  EXCLUDE USING gist (ip_range WITH &&)
);
\`\`\`

**Use cases:**
- Meeting room bookings
- IP address ranges
- Employee schedules
- Resource allocation

**Benefits over triggers:**
- Declarative
- Guaranteed enforcement
- Works in concurrent transactions`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-44',
    topic: 'PostgreSQL',
    question: 'How do you use RETURNING clause?',
    answer: `RETURNING returns data from modified rows without a separate query.

**INSERT with RETURNING:**
\`\`\`sql
INSERT INTO users (name, email)
VALUES ('John', 'john@example.com')
RETURNING id, created_at;
\`\`\`

**UPDATE with RETURNING:**
\`\`\`sql
UPDATE users
SET status = 'active'
WHERE id = 1
RETURNING *;
\`\`\`

**DELETE with RETURNING:**
\`\`\`sql
DELETE FROM sessions
WHERE expires_at < NOW()
RETURNING id, user_id;
\`\`\`

**Use with CTE:**
\`\`\`sql
WITH deleted AS (
  DELETE FROM orders WHERE status = 'cancelled'
  RETURNING *
)
INSERT INTO archived_orders SELECT * FROM deleted;
\`\`\`

**Practical use:**
\`\`\`javascript
// Node.js example
const { rows } = await pool.query(
  'INSERT INTO users (name) VALUES ($1) RETURNING id',
  ['John']
);
const newId = rows[0].id;
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-45',
    topic: 'PostgreSQL',
    question: 'What are unlogged tables in PostgreSQL?',
    answer: `Unlogged tables don't write to WAL (Write-Ahead Log), making them faster but not durable.

**Create unlogged table:**
\`\`\`sql
CREATE UNLOGGED TABLE temp_imports (
  id serial,
  data jsonb
);
\`\`\`

**Characteristics:**
- Much faster writes (no WAL)
- Not crash-safe (TRUNCATED on crash)
- Not replicated to standbys
- Indexes are also unlogged

**Use cases:**
- Temporary processing data
- Import staging tables
- Cache tables
- Data that can be regenerated

**Convert to logged:**
\`\`\`sql
ALTER TABLE temp_imports SET LOGGED;
\`\`\`

**Best practice workflow:**
\`\`\`sql
-- 1. Create unlogged for fast import
CREATE UNLOGGED TABLE import_staging (...);

-- 2. Bulk import
COPY import_staging FROM '/path/to/data.csv';

-- 3. Process and insert to real table
INSERT INTO production_table SELECT * FROM import_staging;

-- 4. Drop staging table
DROP TABLE import_staging;
\`\`\``,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-46',
    topic: 'PostgreSQL',
    question: 'What is LISTEN/NOTIFY in PostgreSQL?',
    answer: `LISTEN/NOTIFY enables pub/sub messaging between database clients.

**Subscribe to channel:**
\`\`\`sql
LISTEN my_channel;
\`\`\`

**Send notification:**
\`\`\`sql
NOTIFY my_channel, 'Hello from PostgreSQL!';

-- Or
SELECT pg_notify('my_channel', 'message payload');
\`\`\`

**Node.js example:**
\`\`\`javascript
const { Client } = require('pg');
const client = new Client();

await client.connect();
await client.query('LISTEN my_channel');

client.on('notification', (msg) => {
  console.log('Channel:', msg.channel);
  console.log('Payload:', msg.payload);
});

// In another session:
// NOTIFY my_channel, '{"id": 1, "action": "created"}';
\`\`\`

**Use with triggers:**
\`\`\`sql
CREATE FUNCTION notify_changes() RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('table_changes', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
\`\`\`

**Use cases:** Real-time updates, cache invalidation, job queues`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-47',
    topic: 'PostgreSQL',
    question: 'What are foreign data wrappers (FDW)?',
    answer: `Foreign Data Wrappers allow querying external data sources as if they were PostgreSQL tables.

**postgres_fdw (other PostgreSQL servers):**
\`\`\`sql
CREATE EXTENSION postgres_fdw;

CREATE SERVER remote_server
FOREIGN DATA WRAPPER postgres_fdw
OPTIONS (host 'remote.example.com', dbname 'mydb');

CREATE USER MAPPING FOR current_user
SERVER remote_server
OPTIONS (user 'remote_user', password 'secret');

CREATE FOREIGN TABLE remote_users (
  id integer,
  name text
) SERVER remote_server OPTIONS (table_name 'users');

-- Query as normal table
SELECT * FROM remote_users;
\`\`\`

**file_fdw (CSV files):**
\`\`\`sql
CREATE EXTENSION file_fdw;

CREATE SERVER csv_server FOREIGN DATA WRAPPER file_fdw;

CREATE FOREIGN TABLE csv_data (
  col1 text,
  col2 integer
) SERVER csv_server OPTIONS (filename '/path/to/data.csv', format 'csv');
\`\`\`

**Use cases:**
- Federated queries
- Data migration
- ETL processes
- Sharding workaround`,
    difficulty: 'Hard'
  },
  {
    id: 'postgres-48',
    topic: 'PostgreSQL',
    question: 'What is the difference between SERIAL and IDENTITY?',
    answer: `**SERIAL (PostgreSQL-specific):**
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY
);
-- Creates sequence and sets DEFAULT
\`\`\`

**IDENTITY (SQL standard, PostgreSQL 10+):**
\`\`\`sql
CREATE TABLE users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

-- Or allow manual override
CREATE TABLE users (
  id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY
);
\`\`\`

**Differences:**
| Feature | SERIAL | IDENTITY |
|---------|--------|----------|
| Standard | PostgreSQL-specific | SQL standard |
| Manual insert | Allowed | ALWAYS blocks, BY DEFAULT allows |
| Sequence ownership | Separate object | Tied to column |
| Drop column | Sequence may remain | Sequence auto-dropped |

**ALWAYS vs BY DEFAULT:**
\`\`\`sql
-- GENERATED ALWAYS: Prevents manual ID
INSERT INTO users (id, name) VALUES (1, 'John');  -- Error

-- GENERATED BY DEFAULT: Allows manual ID
INSERT INTO users (id, name) VALUES (1, 'John');  -- OK
\`\`\`

**Recommendation:** Use IDENTITY for new projects.`,
    difficulty: 'Medium'
  },
  {
    id: 'postgres-49',
    topic: 'PostgreSQL',
    question: 'How do you handle date/time in PostgreSQL?',
    answer: `**Date/time types:**
\`\`\`sql
date           -- 2024-01-15
time           -- 14:30:00
timestamp      -- 2024-01-15 14:30:00 (no timezone)
timestamptz    -- 2024-01-15 14:30:00+00 (with timezone)
interval       -- 1 day 2 hours 30 minutes
\`\`\`

**Current date/time:**
\`\`\`sql
SELECT NOW();              -- Current timestamp with timezone
SELECT CURRENT_DATE;       -- Current date
SELECT CURRENT_TIME;       -- Current time
SELECT CURRENT_TIMESTAMP;  -- Current timestamp
\`\`\`

**Date arithmetic:**
\`\`\`sql
SELECT NOW() + INTERVAL '7 days';
SELECT order_date - INTERVAL '30 days';
SELECT age(birth_date);  -- Age from date to now
SELECT age('2024-01-01', '2000-01-01');  -- Age between dates
\`\`\`

**Extraction:**
\`\`\`sql
SELECT EXTRACT(year FROM created_at);
SELECT date_trunc('month', created_at);  -- Truncate to first of month
\`\`\`

**Timezone:**
\`\`\`sql
SET timezone = 'America/New_York';
SELECT NOW() AT TIME ZONE 'UTC';
\`\`\``,
    difficulty: 'Easy'
  },
  {
    id: 'postgres-50',
    topic: 'PostgreSQL',
    question: 'What are the best practices for PostgreSQL schema design?',
    answer: `**1. Choose appropriate data types:**
\`\`\`sql
-- Use specific types
email citext,      -- Case-insensitive text
price numeric,     -- Exact decimals, not float
uuid uuid,         -- Use UUID type, not varchar
\`\`\`

**2. Name conventions:**
- snake_case for tables and columns
- Plural table names (users, orders)
- Descriptive foreign keys (user_id, not uid)

**3. Always use primary keys:**
\`\`\`sql
id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY
\`\`\`

**4. Index foreign keys:**
\`\`\`sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
\`\`\`

**5. Use constraints:**
\`\`\`sql
email text UNIQUE NOT NULL CHECK (email ~* '^.+@.+$'),
status text CHECK (status IN ('active', 'inactive'))
\`\`\`

**6. Add timestamps:**
\`\`\`sql
created_at timestamptz DEFAULT NOW(),
updated_at timestamptz DEFAULT NOW()
\`\`\`

**7. Consider partitioning for large tables**

**8. Document with COMMENT:**
\`\`\`sql
COMMENT ON TABLE users IS 'Registered platform users';
\`\`\``,
    difficulty: 'Medium'
  }
];
