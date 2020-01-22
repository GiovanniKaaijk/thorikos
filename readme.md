# Project Thorikos

A storytelling website to discover more about the collection of Thorikos. 
[Live demo](https://giovannikaaijk.github.io/thorikos/)

<img width="400" alt="Schermafbeelding 2020-01-22 om 10 45 45" src="https://user-images.githubusercontent.com/43671292/72883323-657bd800-3d04-11ea-953d-3c9c6f136883.png">
<img width="400" alt="Schermafbeelding 2020-01-22 om 10 45 10" src="https://user-images.githubusercontent.com/43671292/72883324-657bd800-3d04-11ea-9004-c5c18f5f69ca.png">
<img width="400" alt="Schermafbeelding 2020-01-22 om 10 44 59" src="https://user-images.githubusercontent.com/43671292/72883325-657bd800-3d04-11ea-92dd-aa22922340df.png">

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
  - [Keep up to date](#Keep-up-to-date)
- [The data](#Data)
- [Contributing](#Contributing)
- [License](#License)

## Description

For the Thorikos website we have created a website that introduces the story about Thorikos to the user. After the introduction, the user can view the data from Thorikos in an interactive visualization

## Interested in the project? Use the following steps to clone the project to your local computer:

## Before you clone

* Install Node.js
* Install a Code Editor
* An CLI(Command Line Interface) like bash or iTerm

## Used (necessary sources)

* NPM
* D3

* When cloned, use npm install to install all the packages at once

## Installation

```
git clone https://github.com/GiovanniKaaijk/frontend-data.git
```
Get into the right folder
```
cd frontend-data
```
Install used npm packages
```
npm install
```

## Keep up to date
Make sure you pull the repository once in a while since we are still working on this project, you can do this by using ```git pull```

## Data
The data comes in the following format:
```
id: id of the object
InventoryNumber: id of the object in the inventory
Initials: initials of finder
ExcavationDate: date of excavation
Context: [contextnumber, A/B/C/D in the context square]
Season: year of finding
ShapeObject: shape of the object
ShapeDetails: kind of object
Type: ""
Ware: ware of the object
Material: material used to create the object
ProductionPlace: local / import
Conservation: poor / good
Measurements: size
NbFragments: count of fragments
NbDiscarded: discarded fragments
JoinedTo_NbRemarks: ""
DescriptionAndRemarks: ""
Inclusions: ""
Fabric: ""
Glaze: glaze of the object
Decoraction_Stamp: ""
Chronology1stImpression: time period of the object
AbsoluteChronology: ""
ToBeDr_Ph: ""
Drawing: ""
Photo: true / false
PhotoFabric: true / false
Square: ""
Level: ""
ProcessedBy: the person who processed the object
Zone: "SURVEY"
Label: ""
Context_Survey_Homogenized: "T13-135-3"
dateContext: date + contextnumber to bind data
time: hour of finding the object (6-12)
visibility: Number
slopeGradient: Number
aspect: ""
surfaceCondition: dry / wet
soilTypes: type of soil
topography: hill / flat
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# License
[MIT](https://github.com/GiovanniKaaijk/thorikos/blob/master/LICENSE)
