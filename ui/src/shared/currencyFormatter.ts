interface INumberFormatParams {
  locale: string;
  fractionDigits: number;
}

let formatters: { [name: string]: any } = {};

export default function currencyFormatter(currencyCode: string) {
  const getFormatter = (currencyCode: string) => {
    if (formatters[currencyCode]) {
      return formatters[currencyCode];
    }

    let params: INumberFormatParams;
    switch (currencyCode) {
      case "CLP":
        params = {
          locale: 'es-CL',
          fractionDigits: 0,
        };
        break;
      case "USD":
        params = {
          locale: 'en-US',
          fractionDigits: 2,
        };
        break;
      default:
        return;
    }

    const formatter = new Intl.NumberFormat(params.locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: params.fractionDigits,
    });

    formatters[currencyCode] = formatter;
    return formatter;
  }

  const format = (amount: number): string => {
    const formatter = getFormatter(currencyCode);
    return formatter
      ? formatter.format(amount)
      : `${amount}`;
  };

  return {
    format
  };
}
