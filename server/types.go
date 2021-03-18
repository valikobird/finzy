package server

type Account struct {
	Id         int
	Name       string
	CurrencyId int
	Active     bool
}

type Currency struct {
	Id   int
	Name string
}
