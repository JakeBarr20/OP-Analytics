# Open Powerlifting Analytics

Powerlifting is a strength sport that consists of a 1 rep max attempt of 3 compound movements, these movements are as followed, squat, bench press and deadlift. The term used to describe a competitor of this sport is called a Powerlifter. Open powerlifting is an online database that contains thousands of powerlifter competition results over many years now, this information is freely available to inspect however, the user interface is confusing, and the data is raw and not particularly useful. The aim of my project is to create a web tool that uses this data in a more functional manner, allowing users / powerlifters to run analytics on their accounts, filter through lifters or search via various categories, compare against a single lifter or a group of lifters where an average will be created for the parameters selected. An example would be, comparing against all the U83kg Junior Male powerlifters.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Make sure to install npm. [Here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is a useful website to do that.
If you struggle with any of the set up process, [here](https://youtu.be/PoeBjnEBfxw) is a demo youtube video of me setting it up.

## Getting Started

To run the project:

- clone the repo
- run 'cd BE'
- run 'node index.js' this will create the proxy server to connect to Open Powerlifting
- run 'cd ../FE'
- run 'npm install' to install all the dependencies
- run 'npm run dev' to compile the front end
- open your browser and enter 'localhost:3001/home' to access the home page

## The Project Stack

The project will be utalising the following technologies:

- Next.js / React.js
- Sass
- TypeScript
- Eslinter
- Firebase
- Open Powerlifting API
- Express Node proxy server
