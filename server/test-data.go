package server

var testCurrencies = []Currency{
	{Id: 1, Name: "CLP"},
	{Id: 2, Name: "USD"},
}

var testAccounts = []Account{
	{Id: 1, Name: "Cash CLP", CurrencyId: 1, Active: true},
	{Id: 2, Name: "Cash USD", CurrencyId: 2, Active: true},
}
