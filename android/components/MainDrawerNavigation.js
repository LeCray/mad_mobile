import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {Main} from './Main'
import {Bookings} from './Actions/Bookings'


export const MainDrawerNavigation = StackNavigator({
	//Stack where hamburger is to be placed
	DrawerStack: { screen: Main }
	}, {
		navigationOptions: {
		title: 'M.A.D',
		headerStyle: {backgroundColor: '#E73536'},
		headerTintColor: 'white'
	},
	Bookings: { screen: Bookings}
  
})

