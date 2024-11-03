const locationSwitch = (buttonName: string) => {
  switch (buttonName) {
    case 'Events':
      window.location.href = 'https://westlan.co.uk/events';
      break;
    case 'Photos':
      window.location.href = 'https://westlan.co.uk/photos';
      break;
    case 'FAQs':
      window.location.href = 'https://westlan.co.uk/faqs';
      break;
    case 'Support':
      window.location.href = 'https://westlan.co.uk/support';
      break;
    default:
      window.location.href = 'https://westlan.co.uk';
  }
};

export default locationSwitch;
