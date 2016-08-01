[![Stories in Ready](https://badge.waffle.io/lmizrahi12/BorrowMyBooks.png?label=ready&title=Ready)](https://waffle.io/lmizrahi12/BorrowMyBooks)
# BorrowMyBooks
## COMS3009: Software Design Project.

## Team
Our Team Name is: Massive Dynamic.

### The Scrum Master: Liron __[@lmizrahi12](https://github.com/lmizrahi12)__
### The Project Owner: Jason __[@TRex22](https://github.com/TRex22)__
### Software developer/designer: Marko __[@markovidalis](https://github.com/markovidalis)__

## Introduction
Massive Dynamic (MD) proposes a system which will help students trade, borrow and sell second hand books – mainly textbooks. The system’s main objective is to allow users to easily search for, locate and purchase the books through it. It will have gamification aspects like Uber where users can rate other users. Additionally, it will include a reporting function in order to allow reporting of abusive users. There will be an administrative profile/s in the system, to aid for the maintenance of the system. The technology we have chosen to implement this on is a web based technology, namely the MEAN stack. The system will not cover using online payment methods and will only facilitate the locating and transferral of physical goods.

## Purpose
MD is focused on building a system that will help facilitate the borrowing and/or selling of textbooks and other books between students. The system will not allow the transfer of copyrighted materials but will rather facilitate the lending and selling of second-hand textbooks. i.e. trading.

If a user has found a textbook which they would like to purchase, the seller is then contacted through contact details provided through the system and the purchaser can then buy the desired book.

The system will have a gamification function which will allow users to rate each other, similar to how the Uber app works. This rating will represent how users behave in their communications, transactions and reliability in the process of trading through the system. Any transactions made will be logged, which will allow the system to provide a history to the user.

Users can rate each other after a transaction is completed and also report users who abuse the system. These ‘bad’ users can then be suspended from the system, which is an administrative feature.

## Scope
The system will not include a mobile app. It will also not include any complex login profiles or file transferring. However there will be secure login with password salting and hashing. Besides regular user logins, there will also be admin logins with extra privileges.

It will consist of a web server and an html browser front-end. It will be a cash based trading platform and any transactions done will be in person. There will also be a post-transaction rating system in which other users are rated according to how well the transaction went. There will also be a reporting feature where a user may report another user. The system will also have a bug reporting system where users can report any bugs found on the site.

#Objectives
	- Secure login credentials using password salting
	- Ability for admin to manage users
	- Ability for users to communicate and trade books
	- Ability to rate users
	- Ability to report users

## Implementation
The server backend of the system will be built using the MEAN stack, which includes MongoDb for the database, nodejs for the server backend, and ExpressJS for the frontend. We want to also use PassportJS to help us with user logins. Our tests will be done with Mocha and Chai libraries. WinstonJS will be used to generate server logs to help us maintain server operation.