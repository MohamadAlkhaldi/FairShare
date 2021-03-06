# FairShare
> This application uses hyperledger fabric blockchain framework to create a shared ledger between charity organizations where each organization can share its records about aids provided to families, and access others records.


## Table of Contents

1. [Introduction](#introduction)
1. [Functionalities](#Functionalities)
1. [Requirements](#requirements)
1. [Installing Dependencies](#installing-dependencies)
1. [How to Start](#how-to-start)
1. [Changing on the Network](#changing-on-the-network)
1. [Team](#team)


## Introduction

Fair Share is a web application that is created to meet the need for a unified source of information about families in need and what kind of aids they recieve, which will make the job of charity organizations easier and more convenient, and most importantly; it will help in distributing the aids more fairly and in covering as much families' needs as possible; hence each family has it's own history of aids provided to it by all of the registered organizations on this network.


## Functionalities

 This application is an interactive interface where user has different capabilities, since there are three types of users:
1. Guest: who could be any user, and he has the access to search about a specific charity organization and display its information stored in the blockchain.
2. Organization: a charity org. that has an account on the website; and has the access to:
	a. add a new family: by providing its information to be saved in the ledger.
		Note:in order to view the current state of the ledger using couchDb via this link: http://localhost:5984/_utils/#database/mychannel_mycc/_all_docs. 
	b. add an aid to a specific family: specify information about this aid and has an option to add a proof which could be a digital form of an   official document.
	c. view the information of a family: he has the option to view the last aid that has been given to this family and also the full history of the family aids.
3. Admin: who has the ability to :
	a. create new users: since this network is a private network and only verified orgs can have the right to write of the blockchain ledger; no sign up page is provided, instead; the admin register new user account which represents a specific org. (type 2 of users) to be part of this network. 


## Requirements

- Node.js - version 8.9.x or greater

- Docker:
   a. MacOSX, *nix, or Windows 10: Docker version 17.06.2-ce or greater is required.
   b. Older versions of Windows: Docker Toolbox - again, Docker version Docker 17.06.2-ce or greater is required.
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
 npm install
 ``` 
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

## Changing on the Network

 - At any point if you want to edit the chaincode you need to go down and up the network again.

 - if you want to change on the configuration of the network, you should go through a slightly different process:

	From within the root directory in the terminal:

```sh
 cd network/
 
 ./network.sh down

 ./network.sh generate 
 ```

then you need to copy the key of the CA from FairShare/network/crypto-config/peerOrganizations/org1.example.com/ca/ and paste it in the docker-compose-cli.yaml in the environment setting in the ca.example.com service then: 

```sh
  ./network.sh up
 ``` 


## Team
 - __Development Team Members__: 
[Alaa Migdady](https://github.com/alaamigdady), 
[Besslan Bzadough](https://github.com/Besslan), 
[Bushra Alabsi](https://github.com/BushraAlabsi), 
[Hanan Nouman](https://github.com/HananNouman), and 
[Mohamad Alkhaldi](https://github.com/MohamadAlkhaldi)