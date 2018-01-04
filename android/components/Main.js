import { DrawerNavigator } from 'react-navigation';
import {DashboardHome} from	'./Dashboard/DashboardHome';
import {About} from	'./Extra/About';
import {Contact} from './Extra/Contact';




export const Main = DrawerNavigator ({

  DashboardHome: { screen: DashboardHome },
  About: { screen: About },
  Contact: { screen: Contact},
  
})


