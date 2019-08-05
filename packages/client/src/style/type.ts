import { omit } from 'lodash';

export enum TypeSize {
  Canon,
  Trafalgar,
  Paragon,
  DoublePica,
  GreatPrimer,
  Pica,
  LongPrimer,
  Brevier,
  Minion,

  BodyCopy,
}

// export enum Typeface {
//     Primary,
//     Secondary,
// }

type FontMap = { [size in TypeSize]: any };

const standard: FontMap = {
  [TypeSize.Canon]: {
    'group-a': {
      fontSize: '28px',
      lineHeight: '32px',
    },
    'group-b': {
      fontSize: '32px',
      lineHeight: '36px',
    },
    'group-c': {
      fontSize: '52px',
      lineHeight: '56px',
    },
    'group-d': {
      fontSize: '44px',
      lineHeight: '48px',
    },
  },
  // 'canon-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //     'letter-spacing': '-1px',
  //   },
  // },
  [TypeSize.Trafalgar]: {
    'group-a': {
      fontSize: '20px',
      lineHeight: '24px',
    },
    'group-b': {
      fontSize: '24px',
      lineHeight: '28px',
    },
    'group-c': {
      fontSize: '36px',
      lineHeight: '40px',
    },
    'group-d': {
      fontSize: '32px',
      lineHeight: '36px',
    },
  },
  // 'trafalgar-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //     'letter-spacing': '-1px',
  //   },
  // },
  [TypeSize.Paragon]: {
    'group-a': {
      fontSize: '20px',
      lineHeight: '24px',
    },
    'group-b': {
      fontSize: '22px',
      lineHeight: '26px',
    },
    'group-c': {
      fontSize: '30px',
      lineHeight: '34px',
    },
    'group-d': {
      fontSize: '28px',
      lineHeight: '32px',
    },
  },
  // 'paragon-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //     'letter-spacing': '-1px',
  //   },
  // },
  [TypeSize.DoublePica]: {
    'group-a': {
      fontSize: '20px',
      lineHeight: '24px',
    },
    'group-c': {
      fontSize: '26px',
      lineHeight: '30px',
    },
    'group-d': {
      fontSize: '24px',
      lineHeight: '28px',
    },
  },
  // 'double-pica-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //     'letter-spacing': '-1px',
  //   },
  // },
  [TypeSize.GreatPrimer]: {
    'group-a': {
      fontSize: '18px',
      lineHeight: '22px',
    },
    'group-c': {
      fontSize: '21px',
      lineHeight: '24px',
    },
    'group-d': {
      fontSize: '20px',
    },
  },
  // 'great-primer-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //   },
  //   'group-b': {
  //     'letter-spacing': '-1px',
  //   },
  // },
  [TypeSize.Pica]: {
    'group-a': {
      fontSize: '15px',
      lineHeight: '20px',
    },
    'group-b': {
      fontSize: '16px',
      lineHeight: '20px',
    },
    'group-c': {
      fontSize: '18px',
      lineHeight: '22px',
    },
    'group-d': {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
  // 'pica-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //   },
  // },
  [TypeSize.LongPrimer]: {
    'group-a': {
      fontSize: '15px',
      lineHeight: '18px',
    },
    'group-c': {
      lineHeight: '20px',
    },
    'group-d': {
      fontSize: '14px',
      lineHeight: '18px',
    },
  },
  // 'long-primer-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //   },
  // },
  [TypeSize.Brevier]: {
    'group-a': {
      fontSize: '14px',
      lineHeight: '16px',
    },
    'group-b': {
      lineHeight: '18px',
    },
    'group-d': {
      fontSize: '13px',
      lineHeight: '16px',
    },
  },
  // 'brevier-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //   },
  // },
  [TypeSize.Minion]: {
    'group-a': {
      fontSize: '12px',
      lineHeight: '16px',
      textTransform: 'uppercase',
    },
    'group-c': {
      fontSize: '13px',
    },
    'group-d': {
      fontSize: '12px',
    },
  },
  // 'minion-bold': {
  //   'group-a': {
  //     'font-weight': 'bold',
  //   },
  // },
  [TypeSize.BodyCopy]: {
    'group-a': {
      fontSize: '15px',
      lineHeight: '20px',
    },
    'group-b': {
      fontSize: '16px',
      lineHeight: '22px',
    },
    'group-c': {
      fontSize: '18px',
      lineHeight: '24px',
    },
    'group-d': {
      fontSize: '19px',
      lineHeight: '28px',
    },
  },
};

export function type(
  typeSize: TypeSize,
  // typeface?: Typeface,
) {
  if (!standard.hasOwnProperty(typeSize)) {
    console.warn(`[css] "${typeSize}" isn't a font size.`);
    return { color: 'red !important' };
  }

  const keysToRemove: string[] = [];

  const process = (map: any) => {
    let processedMap = map;
    processedMap = omit(processedMap, keysToRemove);

    return processedMap;
  };

  const size: object = standard[typeSize];

  const fontMap = process(standard[typeSize]['group-a']);

  if (size.hasOwnProperty('group-b')) {
    fontMap['@media screen and (min-width: 320px)'] = process(
      standard[typeSize]['group-b'],
    );
  }

  if (size.hasOwnProperty('group-c')) {
    fontMap['@media screen and (min-width: 600px)'] = process(
      standard[typeSize]['group-c'],
    );
  }

  if (size.hasOwnProperty('group-d')) {
    fontMap['.feature-no-touch &'] = process(standard[typeSize]['group-d']);
  }
  //
  // if (typeface) {
  //     fontMap['fontFamily'] =
  //         typeface === Typeface.Secondary ? TYPE_SECONDARY : TYPE_PRIMARY;
  // }

  return fontMap;
}
