# FairShare
> This application uses hyperledger fabric blockchain framework to create a shared ledger between charity organizations where each organization can share its records about aids provided to families, and access others.

## Table of Contents

1. [Introduction](#introduction)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](#installing-dependencies)
1. [How to Start](#how-to-start)
1. [Team](#team)

## Introduction

Fair Share is web application that was created to meet of the need for a unified source of information about families in need and what kind of aids they recieve, which will make the job of these organizations easier and more convenient, and most importantly; it will help in distributing the aids more fairly and in covering as much families needs as possible; hence each family has it's own history of aids provided to it by all of the registered organizations on this network.


## Usage

 This application is an interactive interface where user has different terms of reference depending on type he belongs to, since there are three types of users:
1. Guest: who could be any user, and he has the access to search about a specific charity organization and display information about this organization stored in the blockchain.
2. Organization: a charity org. that has an account on the website; and has the access to:
	a. add a new family: by providing its information to be saved in the ledger.
	b. add an aid to a specific family: specify information about this aid and has an option to add a proof which could be a digital form of an   official document.
	c. view the information of a family and has the option to view the last aid that has been given to this family and also the full history of the family aids.

3. Admin: who has the ability to :
	a. create new users: since this network is a private network and only verified orgs can have the right to write of the blockchain ledger; no sign up page is provided, instead; the admin user register new user which represents a specific org. to be part of this network. 
	


## Requirements

- Node.js - version 8.9.x or greater
- MacOSX, *nix, or Windows 10: Docker Docker version 17.06.2-ce or greater is required.
- Older versions of Windows: Docker Toolbox - again, Docker version Docker 17.06.2-ce or greater is required.
- Go programming language 1.9.x
-  cURL tool


Note: if you use windows or Ubuntu 16.04, you may need some extras to run Hyperledger Fabric please visit: http://hyperledger-fabric.readthedocs.io/en/release-1.1/prereqs.html for more details.


## Installing Dependencies
on terminal:
```sh
 curl -sSL https://goo.gl/6wtTN5 | bash -s 1.1.0
 ``` 
this will download all of the docker images needed to run a hyperledger fabric.

From within the root directory:

```sh
 cd app/
 npm install``` 
this will install all the dependencies required to run the project.


## How to Start

From within the root directory in the terminal:

```sh
 cd network/
 
 ./network.sh down

 ./network.sh up 
 ```
Now you have your hyperledger fabric network running, you can make sure that everything is going well by typing the following command on the terminal 

```sh
docker ps
```
you should see the following docker containers

![alt text](https://user-images.githubusercontent.com/25823515/40872699-302773de-665b-11e8-84b1-de478b4ff403.png)


```sh
 cd ../app 
 npm run server-dev
 ``` 
 on another terminal window from the root directory:

```sh
 cd app/
 npm run react-dev
 ```

Now the application is fully working, you can open it on your web browser at the addresss: http://localhost/3000


## Team
 - __Development Team Members__: 
[Alaa Migdady](https://github.com/alaamigdady), 
[Besslan Bzadough](https://github.com/Besslan), 
[Bushra Alabsi](https://github.com/BushraAlabsi), 
[Hanan Nouman](https://github.com/HananNouman), and 
[Mohamad Alkhaldi](https://github.com/MohamadAlkhaldi)