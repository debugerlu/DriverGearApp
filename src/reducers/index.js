import {combineReducers} from 'redux'
import auth from './auth'
import nav from './nav'
import newCar from './cars/newCar';
import oldCar from './cars/oldCar';
import damageCar from './cars/damageCar';
import userClickCar from './cars/userClickCar';
import userDownLoadCar from './cars/userDownLoadCar';
import carDetailReducers from './cars/carDetailReducers';
import carBrand from './cars/carBrand';
const reducers = combineReducers({
    nav,
    auth,
    newCar,
    oldCar,
    damageCar,
    userClickCar,
    userDownLoadCar,
    carDetailReducers,
    carBrand
});


export default reducers
