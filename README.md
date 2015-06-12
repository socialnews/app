[![Stories in Ready](https://badge.waffle.io/socialnews/app.png?label=ready&title=Ready)](https://waffle.io/socialnews/app)
[![Join the chat at https://gitter.im/joshuavial/sustain](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/socialnews?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Social News
A multi-app system for crowdsourcing breaking news by scanning social media.

## Installing
```
git clone --recursive http://github.com/socialnews/app
npm install
npm i -g gulp
gulp update --all
```
Make sure you clone the repo with --recursive to get the submodules. If you miss this step you can add the submodules to your repo with
```
git submodule update --init --recursive
```

## Hypothesis
By creating an engaging game which rewards people for finding and sharing news we can agreggate lots of 'micro-editing decisions' into real time news streams that break both break social media echo chambers and remain relevant to a readers interests.

## Key Idea
We promote the idea of democratizing the news and that 'everyone can be an editor'. Every time you share something on social media with the hashtag of #news you earn editor points. If you share something early and it goes viral then you get lots of points, if you share late in it's spread then you get less.

We make it easy for people to build lists of the editors whose advice they want to follow (e.g. these 3 twitter lists) and present custom link agreggation feeds of breaking news.

Readers can subscribe to a stream and get a periodic email with the top links from a time period (daily, weekly) as well as easily see the streams they are following.

## Architecture
This repo acts as a hub connecting to the individual components of the system, stores our top level user stories and an easy way to deploy all of the components in one dev environment.

### Hub
A rails app which handles user authentication (twitter Oauth) and stores the user table and twitter keys. Acts as the central router which feeds the queues of the workers in the system.

### Client
Javascript client which renders the user interface

### Feeder (Twitter)
Receives tasks (with twitter access token attached) from the hub, manages rate limits and queries and sends the data to the aggregator

### Aggregator
Data store of all urls being shared, includes timestamp data of which users shared it and can answer questions like
* POST /shares {provider: 'twitter', link: 'some-url', editor: 'username', shared_at: timestamp} #add share to store
* GET /article?url=some-urlencoded-url #returns time series of editor details
* GET /shares/:editor_id/:provider #all the shares from an editor (provider is optional e.g. twitter, reddit etc.)

### Ranker
Analyse shares in the aggregator and give points to users based on their sharing activity
* have fun figuring out algorithms, think about how you can make it easy to trial different ranking algorithms

### Publisher
Stores the dynamic lists which cache stories based off input from aggregator and ranker
* POST /publications {id: 'unique string', twitter-list-id: 'joshuavial/inspiring'}
* GET /publication/:id #show current headlines for this publication
* POST /publications/:id/follow #user follows a publication (callback to hub to see who current user is)
* GET /publications #all publications for a user
* GET /all-publications #show all publications by rank

