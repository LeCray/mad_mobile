import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {DrawerStack} from './DrawerStack'
import {Bookings} from './Actions/Bookings'


export const MainScreen = StackNavigator({
	//Stack where hamburger is to be placed
	Main: { screen: DrawerStack },
	Bookings: { screen: Bookings},
	}, {
		navigationOptions: {
			title: 'M.A.D',
			headerStyle: {backgroundColor: '#E73536'},
			headerTintColor: 'white'
		}, 
	})

