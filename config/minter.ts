import {
  OPEN_EDITION_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_ATOM_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_FRNZ_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_USDC_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_ATOM_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_FRNZ_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_USDC_FACTORY_ADDRESS,
  VENDING_FACTORY_ADDRESS,
  VENDING_FACTORY_FLEX_ADDRESS,
  VENDING_FACTORY_UPDATABLE_ADDRESS,
  VENDING_FACTORY_UPDATABLE_FLEX_ADDRESS,
  VENDING_IBC_ATOM_FACTORY_ADDRESS,
  VENDING_IBC_ATOM_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_ATOM_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_ATOM_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USDC_FACTORY_ADDRESS,
  VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USDC_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_USDC_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USK_FACTORY_ADDRESS,
  VENDING_IBC_USK_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USK_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_USK_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_NATIVE_STARDUST_FACTORY_ADDRESS,
  VENDING_NATIVE_STARDUST_UPDATABLE_FACTORY_ADDRESS,
  VENDING_NATIVE_STRDST_FLEX_FACTORY_ADDRESS,
} from 'utils/constants'

import type { TokenInfo } from './token'
import { ibcAtom, ibcFrnz, ibcUsdc, ibcUsk, nativeStardust, stars } from './token'

export interface MinterInfo {
  id: string
  factoryAddress: string
  supportedToken: TokenInfo
  updatable?: boolean
  flexible?: boolean
}

export const openEditionStarsMinter: MinterInfo = {
  id: 'open-edition-stars-minter',
  factoryAddress: OPEN_EDITION_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: false,
}

export const openEditionUpdatableStarsMinter: MinterInfo = {
  id: 'open-edition-updatable-stars-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: true,
}

export const openEditionIbcAtomMinter: MinterInfo = {
  id: 'open-edition-ibc-atom-minter',
  factoryAddress: OPEN_EDITION_IBC_ATOM_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: false,
}

export const openEditionUpdatableIbcAtomMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-atom-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_ATOM_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: true,
}

export const openEditionIbcUsdcMinter: MinterInfo = {
  id: 'open-edition-ibc-usdc-minter',
  factoryAddress: OPEN_EDITION_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
}

export const openEditionUpdatableIbcUsdcMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-usdc-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: true,
}

export const openEditionIbcFrnzMinter: MinterInfo = {
  id: 'open-edition-ibc-frnz-minter',
  factoryAddress: OPEN_EDITION_IBC_FRNZ_FACTORY_ADDRESS,
  supportedToken: ibcFrnz,
  updatable: false,
}

export const openEditionUpdatableIbcFrnzMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-frnz-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_FRNZ_FACTORY_ADDRESS,
  supportedToken: ibcFrnz,
  updatable: true,
}

export const openEditionMinterList = [
  openEditionStarsMinter,
  openEditionUpdatableStarsMinter,
  openEditionUpdatableIbcAtomMinter,
  openEditionIbcAtomMinter,
  openEditionIbcFrnzMinter,
  openEditionUpdatableIbcFrnzMinter,
  openEditionIbcUsdcMinter,
  openEditionUpdatableIbcUsdcMinter,
]

export const vendingStarsMinter: MinterInfo = {
  id: 'vending-stars-minter',
  factoryAddress: VENDING_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: false,
  flexible: false,
}

export const vendingUpdatableStarsMinter: MinterInfo = {
  id: 'vending-updatable-stars-minter',
  factoryAddress: VENDING_FACTORY_UPDATABLE_ADDRESS,
  supportedToken: stars,
  updatable: true,
  flexible: false,
}

export const vendingIbcAtomMinter: MinterInfo = {
  id: 'vending-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: false,
  flexible: false,
}

export const vendingUpdatableIbcAtomMinter: MinterInfo = {
  id: 'vending-updatable-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: true,
  flexible: false,
}

export const vendingIbcUsdcMinter: MinterInfo = {
  id: 'vending-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  flexible: false,
}

export const vendingUpdatableIbcUsdcMinter: MinterInfo = {
  id: 'vending-updatable-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: true,
  flexible: false,
}

export const vendingIbcUskMinter: MinterInfo = {
  id: 'vending-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_FACTORY_ADDRESS,
  supportedToken: ibcUsk,
  updatable: false,
  flexible: false,
}

export const vendingUpdatableIbcUskMinter: MinterInfo = {
  id: 'vending-updatable-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcUsk,
  updatable: true,
  flexible: false,
}

export const vendingNativeStardustMinter: MinterInfo = {
  id: 'vending-native-stardust-minter',
  factoryAddress: VENDING_NATIVE_STARDUST_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: false,
  flexible: false,
}

export const vendingUpdatableNativeStardustMinter: MinterInfo = {
  id: 'vending-native-stardust-minter',
  factoryAddress: VENDING_NATIVE_STARDUST_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: true,
  flexible: false,
}

export const vendingMinterList = [
  vendingStarsMinter,
  vendingUpdatableStarsMinter,
  vendingIbcAtomMinter,
  vendingUpdatableIbcAtomMinter,
  vendingIbcUsdcMinter,
  vendingUpdatableIbcUsdcMinter,
  vendingIbcUskMinter,
  vendingUpdatableIbcUskMinter,
  vendingNativeStardustMinter,
  vendingUpdatableNativeStardustMinter,
]

export const flexibleVendingStarsMinter: MinterInfo = {
  id: 'flexible-vending-stars-minter',
  factoryAddress: VENDING_FACTORY_FLEX_ADDRESS,
  supportedToken: stars,
  updatable: false,
  flexible: true,
}

export const flexibleVendingUpdatableStarsMinter: MinterInfo = {
  id: 'flexible-vending-updatable-stars-minter',
  factoryAddress: VENDING_FACTORY_UPDATABLE_FLEX_ADDRESS,
  supportedToken: stars,
  updatable: true,
  flexible: true,
}

export const flexibleVendingIbcAtomMinter: MinterInfo = {
  id: 'flexible-vending-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcAtom,
  updatable: false,
  flexible: true,
}

export const flexibleVendingUpdatableIbcAtomMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcAtom,
  updatable: true,
  flexible: true,
}

export const flexibleVendingIbcUsdcMinter: MinterInfo = {
  id: 'flexible-vending-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  flexible: true,
}

export const flexibleVendingUpdatableIbcUsdcMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: true,
  flexible: true,
}

export const flexibleVendingIbcUskMinter: MinterInfo = {
  id: 'flexible-vending-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsk,
  updatable: false,
  flexible: true,
}

export const flexibleVendingUpdatableIbcUskMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsk,
  updatable: true,
  flexible: true,
}

export const flexibleVendingStrdstMinter: MinterInfo = {
  id: 'flexible-vending-native-strdst-minter',
  factoryAddress: VENDING_NATIVE_STRDST_FLEX_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: false,
  flexible: true,
}

export const flexibleVendingMinterList = [
  flexibleVendingStarsMinter,
  flexibleVendingUpdatableStarsMinter,
  flexibleVendingIbcAtomMinter,
  flexibleVendingUpdatableIbcAtomMinter,
  flexibleVendingIbcUsdcMinter,
  flexibleVendingUpdatableIbcUsdcMinter,
  flexibleVendingIbcUskMinter,
  flexibleVendingUpdatableIbcUskMinter,
  flexibleVendingStrdstMinter,
]
