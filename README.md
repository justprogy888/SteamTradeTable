# SteamTradeTable
Trade table, like tradeback and skins-table, but (almost) without limitations. 

_Only limitations is that it works only with steam market_(because steamwebapi.com doesn't support other markets, and it is only api that free and offers +/- accurate prices)

Needs an steamwebapi key

## How to start
- Go to https://www.steamwebapi.com/
- Press Login with Steam
- Proceed
- Copy the api key
- Insert it in modal window
## Guide
There are filters, button "Refresh", and table

Filters include "Price min.","Price max.","Sells min.","Profit min.","Profit max."

"Price min." and "Price max." - filter price (in dollars)

"Sells min." - how much the item was sold on steam market in the span of 7 days(minimum)

"Profit min." and "Profit max." - filter profit(in %)

Button "Refresh" - sends request to the api and refreshes the items

Click on item name to copy it.

**Important:**
_Items update every 30 minutes, so prices might not be accurate._

_To know when price for item was updated, double click on the item_

## How to make profit

- Choose your item
- Go to steam market and search
- Compare the buy request price with table price. If the difference is little, look to the next step
- Then look at the price graph of an item at the steam market. If there are at least 10 sales at the sell price, you're good to go
- Put your buy request at the highest buy request price + minimum 10 cents.
- Wait until you get the item
- Then put it on the market at the price on the table
  
