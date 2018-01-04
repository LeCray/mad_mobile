import { StackNavigator, DrawerNavigator } from 'react-navigation';
import {DashboardHome} from	'./Dashboard/DashboardHome'




export const Main = DrawerNavigator ({

  DashboardHome: { screen: DashboardHome },
  
})


