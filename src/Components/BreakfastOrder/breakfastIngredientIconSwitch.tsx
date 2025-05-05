// libraries
import { BsEggFried } from 'react-icons/bs';
import { GiSausage } from 'react-icons/gi';
import { FaBacon } from 'react-icons/fa';
// files
import { BREAKFAST_INGREDIENTS } from '../BreakfastOptions';

const breakfastIngredientIconSwitch = (ingredient: string) => {
  switch (ingredient) {
    case BREAKFAST_INGREDIENTS.SAUSAGE:
      return <GiSausage style={{ fontSize: '1.5rem' }} />;
    case BREAKFAST_INGREDIENTS.BACON:
      return <FaBacon style={{ fontSize: '1.5rem' }} />;
    case BREAKFAST_INGREDIENTS.EGG:
      return <BsEggFried style={{ fontSize: '1.5rem' }} />;
    default:
  }
};

export default breakfastIngredientIconSwitch;
