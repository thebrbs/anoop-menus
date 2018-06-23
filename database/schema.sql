CREATE TABLE restaurant (
  REST_ID    SERIAL      NOT NULL,
  NAME       VARCHAR(30) NOT NULL,
  PRIMARY KEY (REST_ID),
  UNIQUE(NAME)
);

CREATE TABLE menus (
  REST_ID    INT          references restaurant(REST_ID),
  MENU_ID    SERIAL       NOT NULL,
  MENU_NAME  VARCHAR(20)  NOT NULL,
  PRIMARY KEY (MENU_ID)
);

CREATE TABLE menu_categories(
  MENU_ID         INT        references menus(MENU_ID),
  CATEGORIES_ID   SERIAL        NOT NULL,
  CATEGORIES_NAME VARCHAR(20)   NOT NULL,
  PRIMARY KEY (CATEGORIES_ID)
);

CREATE TABLE entrees(
  ENTREES_ID    SERIAL        NOT NULL,
  NAME          VARCHAR(25)   NOT NULL,
  PRICE         SMALLINT      NOT NULL,
  DESCRIPTION   VARCHAR(500),
  PHOTOURL      VARCHAR(125),
  PRIMARY KEY (ENTREES_ID)
);

CREATE TABLE filter_categories(
  FILTER_CATEGORIES_ID  SMALLINT   NOT NULL,
  VEGETARIAN            BOOLEAN,
  NON_VEGETARIAN        BOOLEAN,
  VEGAN                 BOOLEAN,
  GLUTEN_FREE           BOOLEAN,
  PRIMARY KEY(FILTER_CATEGORIES_ID)
);

CREATE TABLE categories_entrees(
  CATEGORIES_ID   INT    references menu_categories(CATEGORIES_ID),
  ENTREES_ID      INT    references entrees(ENTREES_ID)
);

CREATE TABLE entrees_filter_categories(
  ENTREES_ID            INT    references entrees(ENTREES_ID),
  FILTER_CATEGORIES_ID  INT    references filter_categories(FILTER_CATEGORIES_ID)
);
