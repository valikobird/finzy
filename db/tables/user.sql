-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    id     uuid    NOT NULL DEFAULT gen_random_uuid(),
    email  varchar NOT NULL,
    "name" varchar NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);
CREATE INDEX user_email_idx ON public."user" USING btree (email);
