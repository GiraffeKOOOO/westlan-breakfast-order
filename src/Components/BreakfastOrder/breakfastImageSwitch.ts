// files
import { BREAKFAST_OPTION_COLOURS } from '../BreakfastOptions';
import burgerBlue from '../../assets/burger-blue.png';
import burgerGreen from '../../assets/burger-green.png';
import burgerOrange from '../../assets/burger-orange.png';
import burgerPink from '../../assets/burger-pink.png';
import burgerPurple from '../../assets/burger-purple.png';
import burgerWhite from '../../assets/burger-white.png';
import burgerYellow from '../../assets/burger-yellow.png';
import burgerGrey from '../../assets/burger-grey.png';

const breakfastImageSwitch = (colour: string) => {
  switch (colour) {
    case BREAKFAST_OPTION_COLOURS.SAUSAGE_AND_BACON:
      return burgerOrange;
    case BREAKFAST_OPTION_COLOURS.FAT_BASTARD:
      return burgerBlue;
    case BREAKFAST_OPTION_COLOURS.SAUSAGE_AND_EGG:
      return burgerPurple;
    case BREAKFAST_OPTION_COLOURS.EGG_AND_BACON:
      return burgerGreen;
    case BREAKFAST_OPTION_COLOURS.ONLY_BACON:
      return burgerYellow;
    case BREAKFAST_OPTION_COLOURS.ONLY_SAUSAGE:
      return burgerPink;
    case BREAKFAST_OPTION_COLOURS.ONLY_EGG:
      return burgerWhite;
    case 'DISABLED':
      return burgerGrey;
    default:
      return burgerOrange;
  }
};

export default breakfastImageSwitch;
