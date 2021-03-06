SELECT r.name, m.menu_name, c.categories_name,
   e.name, e.price, e.description, e.photourl, e.categories
  FROM restaurant AS r
  INNER JOIN restaurant_menus AS rm
  ON rm.rest_id = r.rest_id
  INNER JOIN menus AS m
  ON m.menu_id = rm.menu_id
  INNER JOIN menu_categories AS mc
  ON m.menu_id = mc.menu_id
  INNER JOIN categories AS c
  ON mc.categories_id = c.categories_id
  INNER JOIN categories_entrees AS ce
  ON c.categories_id = ce.categories_id
  INNER JOIN entrees AS e
  ON ce.entrees_id = e.entrees_id
  WHERE r.rest_id = 456783;
