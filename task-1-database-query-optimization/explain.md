# Task 1: Database Query Optimization

## SQL Query
This query fetches the top 5 users with the highest total order amount in the last month.

## Indexing Strategy
- Add an index on `orders.user_id` to optimize the JOIN operation.
- Add an index on `orders.order_date` to optimize the filtering on order date.
- Composite index on `(user_id, order_date)` for better performance.
