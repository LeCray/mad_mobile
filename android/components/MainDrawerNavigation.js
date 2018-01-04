import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {Main} from './Main'


export const MainDrawerNavigation = StackNavigator({
	//Stack where hamburger is to be placed
	DrawerStack: { screen: Main }
	}, {
		navigationOptions: {
		title: 'Main',
		headerStyle: {backgroundColor: '#E73536'},
		headerTintColor: 'white'
	}
  
})

