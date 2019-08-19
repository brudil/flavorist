import { VendorFetcher, Vendor } from '../types';

function FlavorWestGeneric(url: string): VendorFetcher {
  return (x) =>
    new Promise((resolve, _reject) => {
      x(url, '.item', [
        {
          name: '.product-item-link | strip',
          url: '.product-item-link@href',
        },
      ])((_err, data: any[]) =>
        resolve(
          data.map((page: any) => ({
            name: page.name,
            url: page.url,
            density: null,
            vendor: Vendor.FlavorWest,
          })),
        ),
      );
    });
}

export const flavorWestFetchers = [
  FlavorWestGeneric(
    'https://www.flavorwest.com/water-soluble-flavoring.html?product_list_limit=all',
  ),
  FlavorWestGeneric(
    'https://www.flavorwest.com/natural-flavoring.html?product_list_limit=all',
  ),
];
