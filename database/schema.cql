CREATE TABLE restaurant (
  ID uuid,
  REST_NAME varchar,
  MENU_NAME varchar,
  CATEGORIES_NAME varchar,
  ENTREES_NAME varchar,
  PRICE smallint,
  DESCRIPTION varchar,
  PHOTOURL varchar,
  VEGETARIAN boolean,
  NON_VEGETARIAN boolean,
  VEGAN boolean,
  GLUTEN_FREE boolean,
  PRIMARY KEY (ID)
);
