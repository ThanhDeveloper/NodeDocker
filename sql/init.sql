CREATE TABLE IF NOT EXISTS public.d_users
(
    id SERIAL,
    name text,
    age int,
    CONSTRAINT d_users_pkey PRIMARY KEY (id)
);

-- Filling of products
insert into d_users(name, age) values('Yua Mikami', 18);
insert into d_users(name, age) values('Maria ozawa', 24);
