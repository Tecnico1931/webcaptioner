export default () => {
  return {
    share: {
      roomId: null,
      ownerKey: null,
      url: null,
      expireDate: null,
    },
    roomMembershipId: null,
    roomLeaderToken: null,
    controls: {
      layout: {
        larger: false,
      },
      volumeMeter: {
        show: true,
        sensitivity: 'high',
      },
    },
    appearance: {
      text: {
        textColor: '#ffffff',
        textColorInterim: '#ffffff',
        fontFamily: 'Cousine',
        fontVariant: 'regular',
        textSize: "4", // em
        lineHeight: "1.2", // em
        letterSpacing: "0", // em
        textTransform: "uppercase", // or "capitalize" or "initial"
        alignment: {
          horizontal: 'full', // left, middle, right
          vertical: 'full', // top, middle, bottom, lowerThird
          padding: "0.25", // em
        }
      },
      shadow: {
        color: '#000000',
        opacity: '100',
        blurRadius: '0',
        offsetX: '0.05',
        offsetY: '0.05',
      },
      background: {
        color: '#000000',
        opacity: '100',
      },
    },
    wordReplacements: [],
    censor: {
      on: true,
      replaceWith: 'nothing', // or 'asterisks'
    },
    locale: {
      from: null,
      userDefault: null,
    },
    integrations: {
      dropbox: {
        accessToken: null,
        accountId: null,
      },
      vmix: {
        on: false,
        webControllerAddress: '',
      },
      webhooks: {
        on: false,
        url: '',
        method: 'POST',
        throttleMs: 200,
      },
    },
    donationDate: null,
    exp: [],
  };
};
