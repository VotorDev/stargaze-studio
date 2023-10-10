/* eslint-disable import/no-default-export */

declare module '*.svg' {
  const Component: (props: import('react').SVGProps<SVGSVGElement>) => JSX.Element
  export default Component
}

declare module 'react-datetime-picker/dist/entry.nostyle' {
  export { default } from 'react-datetime-picker'
  export * from 'react-datetime-picker'
}

declare namespace NodeJS {
  declare interface ProcessEnv {
    readonly APP_VERSION: string

    readonly NEXT_PUBLIC_SG721_CODE_ID: string
    readonly NEXT_PUBLIC_SG721_UPDATABLE_CODE_ID: string
    readonly NEXT_PUBLIC_OPEN_EDITION_SG721_CODE_ID: string
    readonly NEXT_PUBLIC_OPEN_EDITION_SG721_UPDATABLE_CODE_ID: string
    readonly NEXT_PUBLIC_WHITELIST_CODE_ID: string
    readonly NEXT_PUBLIC_WHITELIST_FLEX_CODE_ID: string
    readonly NEXT_PUBLIC_VENDING_MINTER_CODE_ID: string
    readonly NEXT_PUBLIC_VENDING_MINTER_FLEX_CODE_ID: string
    readonly NEXT_PUBLIC_VENDING_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_FACTORY_UPDATABLE_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_FACTORY_FLEX_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_FACTORY_UPDATABLE_FLEX_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_ATOM_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_ATOM_UPDATABLE_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_USDC_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_USDC_UPDATABLE_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_ATOM_FACTORY_FLEX_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_ATOM_UPDATABLE_FACTORY_FLEX_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS: string
    readonly NEXT_PUBLIC_VENDING_IBC_USDC_UPDATABLE_FACTORY_FLEX_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_UPDATABLE_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_IBC_ATOM_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_UPDATABLE_IBC_ATOM_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_IBC_USDC_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_UPDATABLE_IBC_USDC_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_IBC_FRNZ_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_UPDATABLE_IBC_FRNZ_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_OPEN_EDITION_MINTER_CODE_ID: string
    readonly NEXT_PUBLIC_BASE_FACTORY_ADDRESS: string
    readonly NEXT_PUBLIC_BASE_FACTORY_UPDATABLE_ADDRESS: string
    readonly NEXT_PUBLIC_SG721_NAME_ADDRESS: string
    readonly NEXT_PUBLIC_ROYALTY_REGISTRY_ADDRESS: string
    readonly NEXT_PUBLIC_INFINITY_SWAP_PROTOCOL_ADDRESS: string
    readonly NEXT_PUBLIC_BASE_MINTER_CODE_ID: string
    readonly NEXT_PUBLIC_BADGE_HUB_CODE_ID: string
    readonly NEXT_PUBLIC_BADGE_HUB_ADDRESS: string
    readonly NEXT_PUBLIC_BADGE_NFT_CODE_ID: string
    readonly NEXT_PUBLIC_BADGE_NFT_ADDRESS: string
    readonly NEXT_PUBLIC_SPLITS_CODE_ID: string
    readonly NEXT_PUBLIC_CW4_GROUP_CODE_ID: string

    readonly NEXT_PUBLIC_PINATA_ENDPOINT_URL: string
    readonly NEXT_PUBLIC_API_URL: string
    readonly NEXT_PUBLIC_BLOCK_EXPLORER_URL: string
    readonly NEXT_PUBLIC_NETWORK: string
    readonly NEXT_PUBLIC_STARGAZE_WEBSITE_URL: string
    readonly NEXT_PUBLIC_WEBSITE_URL: string
    readonly NEXT_PUBLIC_SYNC_COLLECTIONS_API_URL: string
  }
}

type KeplrWindow = import('@keplr-wallet/types/src/window').Window

declare interface Window extends KeplrWindow {
  confetti?: (obj: any) => void
}

declare const __DEV__: boolean
declare const __PROD__: boolean

/* eslint-enable import/no-default-export */
