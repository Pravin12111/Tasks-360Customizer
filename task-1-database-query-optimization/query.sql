select u.user_id,sum(o.amount) as total_amount
from users u
join orders o on u.user_id = o.user_id
where o.order_date >= now() - interval '1 month'
group by u.user_id
order by total_amount Desc
limit 5;