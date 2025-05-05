const socialLocationSwitch = (buttonName: string) => {
  let url = 'https://westlan.co.uk';

  switch (buttonName) {
    case 'discord':
      url = 'https://discord.com/invite/bvMNNdR';
      break;
    case 'facebook':
      url = 'https://www.facebook.com/WestLANUK/';
      break;
    case 'steam':
      url = 'https://steamcommunity.com/groups/westlan';
      break;
    case 'youtube':
      url = 'https://www.youtube.com/channel/UCBkCvCVwzN_GBXS8Ywm2ZbQ';
      break;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
};

export default socialLocationSwitch;
