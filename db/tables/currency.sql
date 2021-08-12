-- Drop table

-- DROP TABLE public.currency;

CREATE TABLE public.currency
(
    code       varchar NOT NULL,
    is_primary bool    NOT NULL,
    CONSTRAINT currency_pk PRIMARY KEY (code)
);
CREATE UNIQUE INDEX currency_code_idx ON public.currency USING btree (code);
