npm run nodemon to begin server


# Insights Service

As part of out latest MVP build we need to present a user with some insights about their spending. We need to build a server that returns JSON formatted insights. A list of transactions for a user can be retrieved at `GET http://54.154.227.172:3000/transactions`. The server should fetch this list, then calculate the insights below, and return them in the body of the response with a 200 response code. 

The api returns an array of transactions:

```json
[
  {
    "id": 1,
    "amount": 100,
    "merchant": "Tescos Ltd",
    "category": "food",
    "paymentDate": "2019-01-27T14:24:48.960Z"
  },
  {
    "id": 2,
    "amount": 20,
    "merchant": "TFL London",
    "category": "transport",
    "paymentDate": "2019-02-27T14:24:48.960Z"
  }
]
```

From this list we'll need to build a server that exposes the following routes, which calculate different insights about a users spending depending on which route is called:

1. `GET /insights/categories`

User Story: 
```
As a User
So that I can gain an understanding of my finances
I want to see an aggregated list of my transactions by category
```


returns the number, total and average value of all transactions grouped by the transaction category.

```json
{
  "food": {
    "totalNumber": 10,
    "totalValue": 400,
    "averageValue": 40
  },
  ...
}
```

2. `GET /insights/cashflow`

User Story:
```
As a User
So that I can gain an understanding of if i will run out of money
I want to see a breakdown of my spending by month
```

returns a daily cashflow of all transactions grouped by day. For days on which there is no data return 0 for all fields. 

```json
{
  "01/01/2019": {
    "totalNumber": 10,
    "totalValue": 400,
    "averageValue": 40
  },
  "02/01/2019": {
    "totalNumber": 10,
    "totalValue": 400,
    "averageValue": 40
  },
  "03/01/2019": {
    "totalNumber": 0,
    "totalValue": 0,
    "averageValue": 0
  },
}
```

## To Get Started

1. `git clone https://github.com/jigsaw-tech/recruitment.git`
2. `npm i`
3. `npm t`

## Some notes

1. all values are integer. Don't worry about dealing with floating point precisions, the front end can deal with the presentation logic.
2. you can use any npm package you like, but only with good reason! This includes the testing framework which you can change :)
3. We've provided some boilerplate code, but feel free to rearrange as you want...
4. There's a little test script we've written which will start the server, run the tests and pull it down again. But feel free to orchastrate your tests however you want!

## Things we value

1. Well tested code. Whatever framework you use, we like testing our code to have certainty it works
2. Simple code. It shouldn't take a PHD to understand code. If it's that complicated, we've done something wrong.
3. Code reuse. If there's an option to reuse some code, go for it!
