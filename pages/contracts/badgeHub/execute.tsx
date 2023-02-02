import { Button } from 'components/Button'
import { Conditional } from 'components/Conditional'
import { ContractPageHeader } from 'components/ContractPageHeader'
import { ExecuteCombobox } from 'components/contracts/badgeHub/ExecuteCombobox'
import { useExecuteComboboxState } from 'components/contracts/badgeHub/ExecuteCombobox.hooks'
import { FormControl } from 'components/FormControl'
import { AddressInput } from 'components/forms/FormInput'
import { useInputState, useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import { JsonPreview } from 'components/JsonPreview'
import { LinkTabs } from 'components/LinkTabs'
import { badgeHubLinkTabs } from 'components/LinkTabs.data'
import { TransactionHash } from 'components/TransactionHash'
import { useContracts } from 'contexts/contracts'
import { useWallet } from 'contexts/wallet'
import type { DispatchExecuteArgs } from 'contracts/badgeHub/messages/execute'
import { dispatchExecute, isEitherType, previewExecutePayload } from 'contracts/badgeHub/messages/execute'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaArrowRight } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'

import { useMetadataAttributesState } from '../../../components/forms/MetadataAttributes.hooks'

const BadgeHubExecutePage: NextPage = () => {
  const { badgeHub: contract } = useContracts()
  const wallet = useWallet()
  const [lastTx, setLastTx] = useState('')

  const [timestamp, setTimestamp] = useState<Date | undefined>(undefined)
  const [resolvedRecipientAddress, setResolvedRecipientAddress] = useState<string>('')
  const [transferrable, setTransferrable] = useState<boolean>(false)

  const comboboxState = useExecuteComboboxState()
  const type = comboboxState.value?.id

  const tokenIdState = useNumberInputState({
    id: 'token-id',
    name: 'tokenId',
    title: 'Token ID',
    subtitle: 'Enter the token ID',
  })

  const maxSupplyState = useNumberInputState({
    id: 'max-supply',
    name: 'max-supply',
    title: 'Max Supply',
    subtitle: 'Maximum number of badges that can be minted',
  })

  const contractState = useInputState({
    id: 'contract-address',
    name: 'contract-address',
    title: 'Badge Hub Address',
    subtitle: 'Address of the Badge Hub contract',
  })
  const contractAddress = contractState.value

  // Metadata related fields
  const managerState = useInputState({
    id: 'manager-address',
    name: 'manager',
    title: 'Manager',
    subtitle: 'Badge Hub Manager',
  })

  const nameState = useInputState({
    id: 'metadata-name',
    name: 'metadata-name',
    title: 'Name',
    subtitle: 'Name of the badge',
  })

  const descriptionState = useInputState({
    id: 'metadata-description',
    name: 'metadata-description',
    title: 'Description',
    subtitle: 'Description of the badge',
  })

  const imageState = useInputState({
    id: 'metadata-image',
    name: 'metadata-image',
    title: 'Image',
    subtitle: 'Badge Image URL',
  })

  const imageDataState = useInputState({
    id: 'metadata-image-data',
    name: 'metadata-image-data',
    title: 'Image Data',
    subtitle: 'Raw SVG image data',
  })

  const externalUrlState = useInputState({
    id: 'metadata-external-url',
    name: 'metadata-external-url',
    title: 'External URL',
    subtitle: 'External URL for the badge',
  })

  const attributesState = useMetadataAttributesState()

  const backgroundColorState = useInputState({
    id: 'metadata-background-color',
    name: 'metadata-background-color',
    title: 'Background Color',
    subtitle: 'Background color of the badge',
  })

  const animationUrlState = useInputState({
    id: 'metadata-animation-url',
    name: 'metadata-animation-url',
    title: 'Animation URL',
    subtitle: 'Animation URL for the badge',
  })

  const youtubeUrlState = useInputState({
    id: 'metadata-youtube-url',
    name: 'metadata-youtube-url',
    title: 'YouTube URL',
    subtitle: 'YouTube URL for the badge',
  })
  // Rules related fields
  const keyState = useInputState({
    id: 'key',
    name: 'key',
    title: 'Key',
    subtitle: 'The key generated for the badge',
  })

  const idState = useNumberInputState({
    id: 'id',
    name: 'id',
    title: 'ID',
    subtitle: 'The ID of the badge',
  })

  const ownerState = useInputState({
    id: 'owner-address',
    name: 'owner',
    title: 'Owner',
    subtitle: 'The owner of the badge',
  })

  const pubkeyState = useInputState({
    id: 'pubkey',
    name: 'pubkey',
    title: 'Pubkey',
    subtitle: 'The public key for the badge',
  })

  const signatureState = useInputState({
    id: 'signature',
    name: 'signature',
    title: 'Signature',
    subtitle: 'The signature for the badge',
  })

  const nftState = useInputState({
    id: 'nft-address',
    name: 'nft-address',
    title: 'NFT Contract Address',
    subtitle: 'The NFT Contract Address for the badge',
  })

  const limitState = useNumberInputState({
    id: 'limit',
    name: 'limit',
    title: 'Limit',
    subtitle: 'Number of keys/owners to execute the action for',
  })

  const showBadgeField = type === 'create_badge'
  const showMetadataField = isEitherType(type, ['create_badge', 'edit_badge'])
  const showIdField = type === 'edit_badge'

  const messages = useMemo(() => contract?.use(contractState.value), [contract, wallet.address, contractState.value])
  const payload: DispatchExecuteArgs = {
    badge: {
      manager: managerState.value,
      metadata: {
        name: nameState.value,
        description: descriptionState.value,
        image: imageState.value,
        image_data: imageDataState.value,
        external_url: externalUrlState.value,
        attributes: attributesState.values.map((attr) => ({
          trait_type: attr.trait_type,
          value: attr.value,
        })),
        background_color: backgroundColorState.value,
        animation_url: animationUrlState.value,
        youtube_url: youtubeUrlState.value,
      },
      transferrable,
      rule: {
        by_key: keyState.value,
      },
      max_supply: maxSupplyState.value,
    },
    metadata: {
      name: nameState.value,
      description: descriptionState.value,
      image: imageState.value,
      image_data: imageDataState.value,
      external_url: externalUrlState.value,
      attributes: attributesState.values.map((attr) => ({
        trait_type: attr.trait_type,
        value: attr.value,
      })),
      background_color: backgroundColorState.value,
      animation_url: animationUrlState.value,
      youtube_url: youtubeUrlState.value,
    },
    id: idState.value,
    owner: ownerState.value,
    pubkey: pubkeyState.value,
    signature: signatureState.value,
    keys: [],
    limit: limitState.value,
    owners: [],
    nft: nftState.value,
    contract: contractState.value,
    messages,
    txSigner: wallet.address,
    type,
  }
  const { isLoading, mutate } = useMutation(
    async (event: FormEvent) => {
      event.preventDefault()
      if (!type) {
        throw new Error('Please select message type!')
      }
      if (!wallet.initialized) {
        throw new Error('Please connect your wallet.')
      }
      if (contractState.value === '') {
        throw new Error('Please enter the contract address.')
      }
      const txHash = await toast.promise(dispatchExecute(payload), {
        error: `${type.charAt(0).toUpperCase() + type.slice(1)} execute failed!`,
        loading: 'Executing message...',
        success: (tx) => `Transaction ${tx} success!`,
      })
      if (txHash) {
        setLastTx(txHash)
      }
    },
    {
      onError: (error) => {
        toast.error(String(error), { style: { maxWidth: 'none' } })
      },
    },
  )

  const router = useRouter()

  useEffect(() => {
    if (contractAddress.length > 0) {
      void router.replace({ query: { contractAddress } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractAddress])
  useEffect(() => {
    const initial = new URL(document.URL).searchParams.get('contractAddress')
    if (initial && initial.length > 0) contractState.onChange(initial)
  }, [])

  return (
    <section className="py-6 px-12 space-y-4">
      <NextSeo title="Execute Vending Minter Contract" />
      <ContractPageHeader
        description="Vending Minter contract facilitates primary market vending machine style minting."
        link={links.Documentation}
        title="Vending Minter Contract"
      />
      <LinkTabs activeIndex={2} data={badgeHubLinkTabs} />

      <form className="grid grid-cols-2 p-4 space-x-8" onSubmit={mutate}>
        <div className="space-y-8">
          <AddressInput {...contractState} />
          <ExecuteCombobox {...comboboxState} />
          {showBadgeField && <AddressInput {...managerState} />}
          {/* TODO: Fix address execute message */}
          <Conditional test={showBadgeField}>
            <FormControl htmlId="expiry-date" subtitle="Badge minting expiry date" title="Expiry Date">
              <InputDateTime minDate={new Date()} onChange={(date) => setTimestamp(date)} value={timestamp} />
            </FormControl>
          </Conditional>
        </div>
        <div className="space-y-8">
          <div className="relative">
            <Button className="absolute top-0 right-0" isLoading={isLoading} rightIcon={<FaArrowRight />} type="submit">
              Execute
            </Button>
            <FormControl subtitle="View execution transaction hash" title="Transaction Hash">
              <TransactionHash hash={lastTx} />
            </FormControl>
          </div>
          <FormControl subtitle="View current message to be sent" title="Payload Preview">
            <JsonPreview content={previewExecutePayload(payload)} isCopyable />
          </FormControl>
        </div>
      </form>
    </section>
  )
}

export default withMetadata(BadgeHubExecutePage, { center: false })
