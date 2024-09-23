# SteamTradeTable
Trade table, like tradeback and skins-table, but (almost) without limitations. 
_Only limitations is that it works only with steam market_(because steamwebapi.com doesn't support other markets, and it is only api that free and offers +/- accurate prices)
Needs an steamwebapi key
## How to use
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
_Items update every 30 minutes, so prices might not be accurate.To know when price for item was updated, double click on the item_
