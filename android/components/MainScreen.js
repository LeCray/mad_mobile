import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {DrawerStack} from './DrawerStack'
import {DataStream} from './Actions/DataStream'
import {Bookings} from './Actions/Bookings'
import {Invoices} from './Actions/Invoices'
import {Cars} from './Actions/Cars'


export const MainScreen = StackNavigator({
	//Stack where hamburger is to be placed
	Main: { screen: DrawerStack },
	DataStream: { screen: DataStream},
	Bookings: { screen: Bookings },
	Invoices: { screen: Invoices},
	Cars: { screen: Cars},
	}, {
		navigationOptions: {
			title: 'M.A.D',
			headerStyle: {backgroundColor: '#E73536'},
			headerTintColor: 'white'
		}, 
	})

