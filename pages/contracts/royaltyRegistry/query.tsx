import clsx from 'clsx'
import { Conditional } from 'components/Conditional'
import { ContractPageHeader } from 'components/ContractPageHeader'
import { FormControl } from 'components/FormControl'
import { AddressInput } from 'components/forms/FormInput'
import { useInputState } from 'components/forms/FormInput.hooks'
import { JsonPreview } from 'components/JsonPreview'
import { LinkTabs } from 'components/LinkTabs'
import { royaltyRegistryLinkTabs } from 'components/LinkTabs.data'
import { useContracts } from 'contexts/contracts'
import { useWallet } from 'contexts/wallet'
import type { QueryType } from 'contracts/royaltyRegistry/messages/query'
import { dispatchQuery, QUERY_LIST } from 'contracts/royaltyRegistry/messages/query'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { INFINITY_SWAP_PROTOCOL_ADDRESS, ROYALTY_REGISTRY_ADDRESS } from 'utils/constants'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'
import { resolveAddress } from 'utils/resolveAddress'

import { protocolList } from './execute'

const RoyaltyRegistryQueryPage: NextPage = () => {
  const { royaltyRegistry: contract } = useContracts()
  const wallet = useWallet()

  const contractState = useInputState({
    id: 'contract-address',
    name: 'contract-address',
    title: 'Royalty Registry Address',
    subtitle: 'Address of the Royalty Registry contract',
    defaultValue: ROYALTY_REGISTRY_ADDRESS,
  })
  const contractAddress = contractState.value

  const collectionAddressState = useInputState({
    id: 'collection-address',
    name: 'collection-address',
    title: 'Collection Address',
    subtitle: 'Address of the collection',
  })

  const protocolAddressState = useInputState({
    id: 'protocol-address',
    name: 'protocol-address',
    title: 'Protocol Address',
    subtitle: 'Address of the protocol',
    defaultValue: INFINITY_SWAP_PROTOCOL_ADDRESS,
  })

  const collectionAddress = collectionAddressState.value
  const protocolAddress = protocolAddressState.value

  const [type, setType] = useState<QueryType>('config')
  const [manualProtocolInput, setManualProtocolInput] = useState(false)

  const { data: response } = useQuery(
    [contractAddress, type, contract, wallet, collectionAddress, protocolAddress] as const,
    async ({ queryKey }) => {
      const [_contractAddress, _type, _contract, _wallet, _collectionAddress, _protocolAddress] = queryKey
      const messages = contract?.use(contractAddress)
      const res = await resolveAddress(_collectionAddress, wallet).then(async (resolvedAddress) => {
        const result = await dispatchQuery({
          messages,
          type,
          collection: resolvedAddress,
          protocol: _protocolAddress,
        })
        return result
      })
      return res
    },
    {
      placeholderData: null,
      onError: (error: any) => {
        toast.error(error.message, { style: { maxWidth: 'none' } })
      },
      enabled: Boolean(contractAddress && contract && wallet),
    },
  )

  const router = useRouter()

  useEffect(() => {
    if (collectionAddress.length > 0) {
      void router.replace({ query: { collectionAddress } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionAddress])
  useEffect(() => {
    const initial = new URL(document.URL).searchParams.get('collectionAddress')
    if (initial && initial.length > 0) collectionAddressState.onChange(initial)
  }, [])

  return (
    <section className="py-6 px-12 space-y-4">
      <NextSeo title="Query Royalty Registry Contract" />
      <ContractPageHeader
        description="Royalty Registry allows NFT collection owners to define the royalties that should be paid to them."
        link={links.Documentation}
        title="Royalty Registry Contract"
      />
      <LinkTabs activeIndex={0} data={royaltyRegistryLinkTabs} />

      <div className="grid grid-cols-2 p-4 space-x-8">
        <div className="space-y-8">
          <AddressInput {...collectionAddressState} />
          <FormControl htmlId="contract-query-type" subtitle="Type of query to be dispatched" title="Query Type">
            <select
              className={clsx(
                'bg-white/10 rounded border-2 border-white/20 form-select',
                'placeholder:text-white/50',
                'focus:ring focus:ring-plumbus-20',
              )}
              defaultValue="config"
              id="contract-query-type"
              name="query-type"
              onChange={(e) => setType(e.target.value as QueryType)}
            >
              {QUERY_LIST.map(({ id, name }) => (
                <option key={`query-${id}`} className="mt-2 text-lg bg-[#1A1A1A]" value={id}>
                  {name}
                </option>
              ))}
            </select>
          </FormControl>
          <Conditional test={type === 'collection_royalty_protocol' || type === 'royalty_payment'}>
            <span className="mr-4 font-bold">Selected Protocol</span>
            <select
              className="py-2 px-4 placeholder:text-white/50 bg-white/10 rounded border-2 border-white/20 focus:ring focus:ring-plumbus-20"
              onChange={(e) => {
                if (e.target.value) {
                  protocolAddressState.onChange(e.target.value)
                  setManualProtocolInput(false)
                } else {
                  protocolAddressState.onChange('')
                  setManualProtocolInput(true)
                }
              }}
            >
              {protocolList.map((protocol) => (
                <option key={protocol.address} value={protocol.address}>
                  {protocol.name}
                </option>
              ))}
              <option value="">Manual Input</option>
            </select>
            <Conditional test={manualProtocolInput}>
              <AddressInput {...protocolAddressState} />
            </Conditional>
          </Conditional>
        </div>
        <JsonPreview content={contractAddress ? { type, response } : null} title="Query Response" />
      </div>
    </section>
  )
}

export default withMetadata(RoyaltyRegistryQueryPage, { center: false })
