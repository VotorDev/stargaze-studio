import {
  FEATURED_IBC_TIA_FACTORY_ADDRESS,
  FEATURED_IBC_USDC_FACTORY_ADDRESS,
  FEATURED_VENDING_FACTORY_ADDRESS,
  FEATURED_VENDING_FACTORY_FLEX_ADDRESS,
  FEATURED_VENDING_IBC_TIA_FACTORY_FLEX_ADDRESS,
  FEATURED_VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS,
  OPEN_EDITION_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_ATOM_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_CRBRUS_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_FRNZ_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_HUAHUA_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_KUJI_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_NBTC_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_TIA_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_USDC_FACTORY_ADDRESS,
  OPEN_EDITION_IBC_USK_FACTORY_ADDRESS,
  OPEN_EDITION_NATIVE_BRNCH_FACTORY_ADDRESS,
  OPEN_EDITION_NATIVE_STRDST_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_ATOM_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_FRNZ_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_NBTC_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_TIA_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_USDC_FACTORY_ADDRESS,
  OPEN_EDITION_UPDATABLE_IBC_USK_FACTORY_ADDRESS,
  VENDING_FACTORY_ADDRESS,
  VENDING_FACTORY_FLEX_ADDRESS,
  VENDING_FACTORY_UPDATABLE_ADDRESS,
  VENDING_FACTORY_UPDATABLE_FLEX_ADDRESS,
  VENDING_IBC_ATOM_FACTORY_ADDRESS,
  VENDING_IBC_ATOM_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_ATOM_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_ATOM_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_CRBRUS_FACTORY_ADDRESS,
  VENDING_IBC_CRBRUS_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_HUAHUA_FACTORY_ADDRESS,
  VENDING_IBC_HUAHUA_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_KUJI_FACTORY_ADDRESS,
  VENDING_IBC_KUJI_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_NBTC_FACTORY_ADDRESS,
  VENDING_IBC_NBTC_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_NBTC_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_NBTC_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_TIA_FACTORY_ADDRESS,
  VENDING_IBC_TIA_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_TIA_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_TIA_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USDC_FACTORY_ADDRESS,
  VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USDC_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_USDC_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USK_FACTORY_ADDRESS,
  VENDING_IBC_USK_FACTORY_FLEX_ADDRESS,
  VENDING_IBC_USK_UPDATABLE_FACTORY_ADDRESS,
  VENDING_IBC_USK_UPDATABLE_FACTORY_FLEX_ADDRESS,
  VENDING_NATIVE_BRNCH_FACTORY_ADDRESS,
  VENDING_NATIVE_BRNCH_FLEX_FACTORY_ADDRESS,
  VENDING_NATIVE_BRNCH_UPDATABLE_FACTORY_ADDRESS,
  VENDING_NATIVE_STARDUST_FACTORY_ADDRESS,
  VENDING_NATIVE_STARDUST_UPDATABLE_FACTORY_ADDRESS,
  VENDING_NATIVE_STRDST_FLEX_FACTORY_ADDRESS,
} from 'utils/constants'

import type { TokenInfo } from './token'
import {
  ibcAtom,
  ibcCrbrus,
  ibcFrnz,
  ibcHuahua,
  ibcKuji,
  ibcNbtc,
  ibcTia,
  ibcUsdc,
  ibcUsk,
  nativeBrnch,
  nativeStardust,
  stars,
} from './token'

export interface MinterInfo {
  id: string
  factoryAddress: string
  supportedToken: TokenInfo
  updatable?: boolean
  flexible?: boolean
  featured?: boolean
}

export const openEditionStarsMinter: MinterInfo = {
  id: 'open-edition-stars-minter',
  factoryAddress: OPEN_EDITION_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: false,
  featured: false,
}

export const openEditionUpdatableStarsMinter: MinterInfo = {
  id: 'open-edition-updatable-stars-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: true,
  featured: false,
}

export const openEditionIbcAtomMinter: MinterInfo = {
  id: 'open-edition-ibc-atom-minter',
  factoryAddress: OPEN_EDITION_IBC_ATOM_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: false,
  featured: false,
}

export const openEditionUpdatableIbcAtomMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-atom-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_ATOM_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: true,
  featured: false,
}

export const openEditionIbcUsdcMinter: MinterInfo = {
  id: 'open-edition-ibc-usdc-minter',
  factoryAddress: OPEN_EDITION_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  featured: false,
}

export const openEditionIbcTiaMinter: MinterInfo = {
  id: 'open-edition-ibc-tia-minter',
  factoryAddress: OPEN_EDITION_IBC_TIA_FACTORY_ADDRESS,
  supportedToken: ibcTia,
  updatable: false,
  featured: false,
}

export const openEditionIbcNbtcMinter: MinterInfo = {
  id: 'open-edition-ibc-nbtc-minter',
  factoryAddress: OPEN_EDITION_IBC_NBTC_FACTORY_ADDRESS,
  supportedToken: ibcNbtc,
  updatable: false,
  featured: false,
}

export const openEditionUpdatableIbcUsdcMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-usdc-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: true,
  featured: false,
}

export const openEditionUpdatableIbcTiaMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-tia-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_TIA_FACTORY_ADDRESS,
  supportedToken: ibcTia,
  updatable: true,
  featured: false,
}

export const openEditionUpdatableIbcNbtcMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-nbtc-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_NBTC_FACTORY_ADDRESS,
  supportedToken: ibcNbtc,
  updatable: true,
  featured: false,
}

export const openEditionIbcFrnzMinter: MinterInfo = {
  id: 'open-edition-ibc-frnz-minter',
  factoryAddress: OPEN_EDITION_IBC_FRNZ_FACTORY_ADDRESS,
  supportedToken: ibcFrnz,
  updatable: false,
  featured: false,
}

export const openEditionUpdatableIbcFrnzMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-frnz-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_FRNZ_FACTORY_ADDRESS,
  supportedToken: ibcFrnz,
  updatable: true,
  featured: false,
}

export const openEditionIbcUskMinter: MinterInfo = {
  id: 'open-edition-ibc-usk-minter',
  factoryAddress: OPEN_EDITION_IBC_USK_FACTORY_ADDRESS,
  supportedToken: ibcUsk,
  updatable: false,
  featured: false,
}

export const openEditionUpdatableIbcUskMinter: MinterInfo = {
  id: 'open-edition-updatable-ibc-usk-minter',
  factoryAddress: OPEN_EDITION_UPDATABLE_IBC_USK_FACTORY_ADDRESS,
  supportedToken: ibcUsk,
  updatable: true,
  featured: false,
}

export const openEditionIbcKujiMinter: MinterInfo = {
  id: 'open-edition-ibc-kuji-minter',
  factoryAddress: OPEN_EDITION_IBC_KUJI_FACTORY_ADDRESS,
  supportedToken: ibcKuji,
  updatable: false,
  featured: false,
}

export const openEditionIbcHuahuaMinter: MinterInfo = {
  id: 'open-edition-ibc-huahua-minter',
  factoryAddress: OPEN_EDITION_IBC_HUAHUA_FACTORY_ADDRESS,
  supportedToken: ibcHuahua,
  updatable: false,
  featured: false,
}

export const openEditionIbcCrbrusMinter: MinterInfo = {
  id: 'open-edition-ibc-crbrus-minter',
  factoryAddress: OPEN_EDITION_IBC_CRBRUS_FACTORY_ADDRESS,
  supportedToken: ibcCrbrus,
  updatable: false,
  featured: false,
}

export const openEditionNativeStrdstMinter: MinterInfo = {
  id: 'open-edition-native-strdst-minter',
  factoryAddress: OPEN_EDITION_NATIVE_STRDST_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: false,
  featured: false,
}

export const openEditionNativeBrnchMinter: MinterInfo = {
  id: 'open-edition-native-brnch-minter',
  factoryAddress: OPEN_EDITION_NATIVE_BRNCH_FACTORY_ADDRESS,
  supportedToken: nativeBrnch,
  updatable: false,
  featured: false,
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
  openEditionIbcTiaMinter,
  openEditionUpdatableIbcTiaMinter,
  openEditionIbcNbtcMinter,
  openEditionUpdatableIbcNbtcMinter,
  openEditionIbcUskMinter,
  openEditionUpdatableIbcUskMinter,
  openEditionIbcKujiMinter,
  openEditionIbcHuahuaMinter,
  openEditionIbcCrbrusMinter,
  openEditionNativeStrdstMinter,
  openEditionNativeBrnchMinter,
]

export const vendingStarsMinter: MinterInfo = {
  id: 'vending-stars-minter',
  factoryAddress: VENDING_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingFeaturedStarsMinter: MinterInfo = {
  id: 'vending-stars-minter',
  factoryAddress: FEATURED_VENDING_FACTORY_ADDRESS,
  supportedToken: stars,
  updatable: false,
  flexible: false,
  featured: true,
}

export const vendingUpdatableStarsMinter: MinterInfo = {
  id: 'vending-updatable-stars-minter',
  factoryAddress: VENDING_FACTORY_UPDATABLE_ADDRESS,
  supportedToken: stars,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingIbcAtomMinter: MinterInfo = {
  id: 'vending-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingUpdatableIbcAtomMinter: MinterInfo = {
  id: 'vending-updatable-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcAtom,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingIbcUsdcMinter: MinterInfo = {
  id: 'vending-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingFeaturedIbcUsdcMinter: MinterInfo = {
  id: 'vending-featured-ibc-usdc-minter',
  factoryAddress: FEATURED_IBC_USDC_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  flexible: false,
  featured: true,
}

export const vendingIbcTiaMinter: MinterInfo = {
  id: 'vending-ibc-tia-minter',
  factoryAddress: VENDING_IBC_TIA_FACTORY_ADDRESS,
  supportedToken: ibcTia,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingFeaturedIbcTiaMinter: MinterInfo = {
  id: 'vending-featured-ibc-tia-minter',
  factoryAddress: FEATURED_IBC_TIA_FACTORY_ADDRESS,
  supportedToken: ibcTia,
  updatable: false,
  flexible: false,
  featured: true,
}

export const vendingIbcNbtcMinter: MinterInfo = {
  id: 'vending-ibc-nbtc-minter',
  factoryAddress: VENDING_IBC_NBTC_FACTORY_ADDRESS,
  supportedToken: ibcNbtc,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingUpdatableIbcUsdcMinter: MinterInfo = {
  id: 'vending-updatable-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingUpdatableIbcTiaMinter: MinterInfo = {
  id: 'vending-updatable-ibc-tia-minter',
  factoryAddress: VENDING_IBC_TIA_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcTia,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingUpdatableIbcNbtcMinter: MinterInfo = {
  id: 'vending-updatable-ibc-nbtc-minter',
  factoryAddress: VENDING_IBC_NBTC_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcNbtc,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingIbcUskMinter: MinterInfo = {
  id: 'vending-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_FACTORY_ADDRESS,
  supportedToken: ibcUsk,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingUpdatableIbcUskMinter: MinterInfo = {
  id: 'vending-updatable-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: ibcUsk,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingIbcKujiMinter: MinterInfo = {
  id: 'vending-ibc-kuji-minter',
  factoryAddress: VENDING_IBC_KUJI_FACTORY_ADDRESS,
  supportedToken: ibcKuji,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingIbcHuahuaMinter: MinterInfo = {
  id: 'vending-ibc-huahua-minter',
  factoryAddress: VENDING_IBC_HUAHUA_FACTORY_ADDRESS,
  supportedToken: ibcHuahua,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingIbcCrbrusMinter: MinterInfo = {
  id: 'vending-ibc-crbrus-minter',
  factoryAddress: VENDING_IBC_CRBRUS_FACTORY_ADDRESS,
  supportedToken: ibcCrbrus,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingNativeStardustMinter: MinterInfo = {
  id: 'vending-native-stardust-minter',
  factoryAddress: VENDING_NATIVE_STARDUST_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingUpdatableNativeStardustMinter: MinterInfo = {
  id: 'vending-native-stardust-minter',
  factoryAddress: VENDING_NATIVE_STARDUST_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingNativeBrnchMinter: MinterInfo = {
  id: 'vending-native-brnch-minter',
  factoryAddress: VENDING_NATIVE_BRNCH_FACTORY_ADDRESS,
  supportedToken: nativeBrnch,
  updatable: false,
  flexible: false,
  featured: false,
}

export const vendingUpdatableNativeBrnchMinter: MinterInfo = {
  id: 'vending-native-brnch-minter',
  factoryAddress: VENDING_NATIVE_BRNCH_UPDATABLE_FACTORY_ADDRESS,
  supportedToken: nativeBrnch,
  updatable: true,
  flexible: false,
  featured: false,
}

export const vendingMinterList = [
  vendingStarsMinter,
  vendingFeaturedStarsMinter,
  vendingUpdatableStarsMinter,
  vendingIbcAtomMinter,
  vendingUpdatableIbcAtomMinter,
  vendingIbcUsdcMinter,
  vendingFeaturedIbcUsdcMinter,
  vendingUpdatableIbcUsdcMinter,
  vendingIbcTiaMinter,
  vendingFeaturedIbcTiaMinter,
  vendingUpdatableIbcTiaMinter,
  vendingIbcNbtcMinter,
  vendingUpdatableIbcNbtcMinter,
  vendingIbcUskMinter,
  vendingUpdatableIbcUskMinter,
  vendingIbcKujiMinter,
  vendingIbcHuahuaMinter,
  vendingIbcCrbrusMinter,
  vendingNativeStardustMinter,
  vendingUpdatableNativeStardustMinter,
  vendingNativeBrnchMinter,
  vendingUpdatableNativeBrnchMinter,
]

export const flexibleVendingStarsMinter: MinterInfo = {
  id: 'flexible-vending-stars-minter',
  factoryAddress: VENDING_FACTORY_FLEX_ADDRESS,
  supportedToken: stars,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleFeaturedVendingStarsMinter: MinterInfo = {
  id: 'flexible-vending-stars-minter',
  factoryAddress: FEATURED_VENDING_FACTORY_FLEX_ADDRESS,
  supportedToken: stars,
  updatable: false,
  flexible: true,
  featured: true,
}

export const flexibleVendingUpdatableStarsMinter: MinterInfo = {
  id: 'flexible-vending-updatable-stars-minter',
  factoryAddress: VENDING_FACTORY_UPDATABLE_FLEX_ADDRESS,
  supportedToken: stars,
  updatable: true,
  flexible: true,
  featured: false,
}

export const flexibleVendingIbcAtomMinter: MinterInfo = {
  id: 'flexible-vending-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcAtom,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingUpdatableIbcAtomMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-atom-minter',
  factoryAddress: VENDING_IBC_ATOM_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcAtom,
  updatable: true,
  flexible: true,
  featured: false,
}

export const flexibleVendingIbcUsdcMinter: MinterInfo = {
  id: 'flexible-vending-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleFeaturedVendingIbcUsdcMinter: MinterInfo = {
  id: 'flexible-featured-vending-ibc-usdc-minter',
  factoryAddress: FEATURED_VENDING_IBC_USDC_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: false,
  flexible: true,
  featured: true,
}

export const flexibleVendingIbcTiaMinter: MinterInfo = {
  id: 'flexible-vending-ibc-tia-minter',
  factoryAddress: VENDING_IBC_TIA_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcTia,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleFeaturedVendingIbcTiaMinter: MinterInfo = {
  id: 'flexible-featured-vending-ibc-tia-minter',
  factoryAddress: FEATURED_VENDING_IBC_TIA_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcTia,
  updatable: false,
  flexible: true,
  featured: true,
}

export const flexibleVendingIbcNbtcMinter: MinterInfo = {
  id: 'flexible-vending-ibc-nbtc-minter',
  factoryAddress: VENDING_IBC_NBTC_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcNbtc,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingUpdatableIbcUsdcMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-usdc-minter',
  factoryAddress: VENDING_IBC_USDC_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsdc,
  updatable: true,
  flexible: true,
  featured: false,
}

export const flexibleVendingUpdatableIbcTiaMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-tia-minter',
  factoryAddress: VENDING_IBC_TIA_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcTia,
  updatable: true,
  flexible: true,
  featured: false,
}

export const flexibleVendingUpdatableIbcNbtcMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-nbtc-minter',
  factoryAddress: VENDING_IBC_NBTC_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcNbtc,
  updatable: true,
  flexible: true,
  featured: false,
}

export const flexibleVendingIbcUskMinter: MinterInfo = {
  id: 'flexible-vending-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsk,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingUpdatableIbcUskMinter: MinterInfo = {
  id: 'flexible-vending-updatable-ibc-usk-minter',
  factoryAddress: VENDING_IBC_USK_UPDATABLE_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcUsk,
  updatable: true,
  flexible: true,
  featured: false,
}

export const flexibleVendingIbcKujiMinter: MinterInfo = {
  id: 'flexible-vending-ibc-kuji-minter',
  factoryAddress: VENDING_IBC_KUJI_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcKuji,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingIbcHuahuaMinter: MinterInfo = {
  id: 'flexible-vending-ibc-huahua-minter',
  factoryAddress: VENDING_IBC_HUAHUA_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcHuahua,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingIbcCrbrusMinter: MinterInfo = {
  id: 'flexible-vending-ibc-crbrus-minter',
  factoryAddress: VENDING_IBC_CRBRUS_FACTORY_FLEX_ADDRESS,
  supportedToken: ibcCrbrus,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingStrdstMinter: MinterInfo = {
  id: 'flexible-vending-native-strdst-minter',
  factoryAddress: VENDING_NATIVE_STRDST_FLEX_FACTORY_ADDRESS,
  supportedToken: nativeStardust,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingBrnchMinter: MinterInfo = {
  id: 'flexible-vending-native-brnch-minter',
  factoryAddress: VENDING_NATIVE_BRNCH_FLEX_FACTORY_ADDRESS,
  supportedToken: nativeBrnch,
  updatable: false,
  flexible: true,
  featured: false,
}

export const flexibleVendingMinterList = [
  flexibleVendingStarsMinter,
  flexibleFeaturedVendingStarsMinter,
  flexibleVendingUpdatableStarsMinter,
  flexibleVendingIbcAtomMinter,
  flexibleVendingUpdatableIbcAtomMinter,
  flexibleVendingIbcUsdcMinter,
  flexibleFeaturedVendingIbcUsdcMinter,
  flexibleVendingUpdatableIbcUsdcMinter,
  flexibleVendingIbcTiaMinter,
  flexibleFeaturedVendingIbcTiaMinter,
  flexibleVendingUpdatableIbcTiaMinter,
  flexibleVendingIbcNbtcMinter,
  flexibleVendingUpdatableIbcNbtcMinter,
  flexibleVendingIbcUskMinter,
  flexibleVendingUpdatableIbcUskMinter,
  flexibleVendingIbcKujiMinter,
  flexibleVendingIbcHuahuaMinter,
  flexibleVendingIbcCrbrusMinter,
  flexibleVendingStrdstMinter,
  flexibleVendingBrnchMinter,
]
