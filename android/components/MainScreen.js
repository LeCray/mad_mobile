import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {DrawerStack} from './DrawerStack';
//import {DataStream} from './Actions/DataStream'
import {Bookings} from './Actions/Bookings';
import {NewBooking} from './Actions/NewBooking';
import {Invoices} from './Actions/Invoices';
import {Csi} from './Actions/Csi';
import {Quotes} from './Actions/Quotes';
import OBDReader from './Actions/OBDReader';
import Settings from './Actions/Settings';
import RootRouter from './RootRouter';


export const MainScreen = StackNavigator({
	//Stack where hamburger is to be placed
	Main: { screen: DrawerStack },

	//Screens that are accessed by DashboardHome.js
	OBDReader: { screen: OBDReader},
	Settings: { screen: Settings },
	Bookings: { screen: Bookings },
	Invoices: { screen: Invoices},
	Csi: { screen: Csi},
	Quotes: { screen: Quotes},

	//New Booking Modal
	NewBooking: { screen: NewBooking}


	}, {
		navigationOptions: {
			title: 'M.A.D',
			headerStyle: {backgroundColor: '#E73536'},
			headerTintColor: 'white'
		}, 
	})

