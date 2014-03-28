# Money Ticker
---

Money Ticker is a jQuery plugin for showing "live" savings or spending levels.

## Get Started

Just add a smidge of HTML and a dash of Javascript.

### HTML
```
    <div class="money-ticker"></div>
```

### Javascript
```
    $('.money-ticker').money_ticker();
```

That's it! :)

If you wish, you can instantiate multiple tickers on the same page, each with custom settings, by giving each ticker custom HTML data attributes.

## Individual Parameters
You can include the following parameters as __HTML data attributes__ on each ticker:

- `data-base-rate`: Defaults to 0
- `data-base-date`: Defaults to today (format: January 1, 2000 00:00:00)
- `data-update-interval`: Defaults to 1000 (every 1 second)
- `data-rate-increment`: Defaults to 1 (increments by 1 per `update-interval`)
- `data-currency-symbol`: Defaults to $ (USD)

```
    <div class="money-ticker" data-base-rate="100" data-update-interval="5000"></div>
```

## Global Parameters
If you have multiple tickers that share the similar parameters, you can declare them globally like so:

```
    $('.money-ticker').money_ticker({
        // Defaults to 0
        baseRate: 0,

        // Defaults to today
        baseDate: new Date(),

        // Defaults to 1000
        updateInterval: 1000,
        
        // Defaults to 1
        rateIncrement: 1,

        // Defaults to $
        currencySymbol: '$',
    });
```