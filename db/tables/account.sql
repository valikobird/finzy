-- Drop table

-- DROP TABLE public.account;

CREATE TABLE public.account
(
    id         uuid      NOT NULL DEFAULT gen_random_uuid(),
    user_id    uuid      NOT NULL,
    title      varchar   NOT NULL,
    currency   varchar   NOT NULL,
    balance    _money    NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    CONSTRAINT account_pk PRIMARY KEY (id),
    CONSTRAINT account_fk FOREIGN KEY (user_id) REFERENCES public."user" (id) ON DELETE CASCADE,
    CONSTRAINT currency_fk FOREIGN KEY (currency) REFERENCES public.currency (code)
);
CREATE INDEX account_user_id_idx ON public.account USING btree (user_id);
