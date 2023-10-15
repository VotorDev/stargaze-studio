import clsx from 'clsx'
import { Conditional } from 'components/Conditional'
import { ContractPageHeader } from 'components/ContractPageHeader'
import { FormControl } from 'components/FormControl'
import { AddressInput } from 'components/forms/FormInput'
import { useInputState } from 'components/forms/FormInput.hooks'
import { JsonPreview } from 'components/JsonPreview'
import { LinkTabs } from 'components/LinkTabs'
import { openEditionMinterLinkTabs } from 'components/LinkTabs.data'
import { useContracts } from 'contexts/contracts'
import type { QueryType } from 'contracts/openEditionMinter/messages/query'
import { dispatchQuery, QUERY_LIST } from 'contracts/openEditionMinter/messages/query'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'
import { resolveAddress } from 'utils/resolveAddress'
import { useWallet } from 'utils/wallet'

const OpenEditionMinterQueryPage: NextPage = () => {
  const { openEditionMinter: contract } = useContracts()
  const wallet = useWallet()

  const contractState = useInputState({
    id: 'contract-address',
    name: 'contract-address',
    title: 'Open Edition Minter Address',
    subtitle: 'Address of the Open Edition Minter contract',
  })
  const contractAddress = contractState.value

  const addressState = useInputState({
    id: 'address',
    name: 'address',
    title: 'Address',
    subtitle: 'Address of the user - defaults to current address',
  })
  const address = addressState.value

  const [type, setType] = useState<QueryType>('config')

  const { data: response } = useQuery(
    [contractAddress, type, contract, wallet.address, address] as const,
    async ({ queryKey }) => {
      const [_contractAddress, _type, _contract, _wallet] = queryKey
      const messages = contract?.use(_contractAddress)
      const res = await resolveAddress(address, wallet).then(async (resolvedAddress) => {
        const result = await dispatchQuery({
          address: resolvedAddress,
          messages,
          type,
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
      enabled: Boolean(contractAddress && contract && wallet.isWalletConnected),
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
      <NextSeo title="Query Open Edition Minter Contract" />
      <ContractPageHeader
        description="Open Edition Minter contract allows multiple copies of a single NFT to be minted in a specified time interval."
        link={links.Documentation}
        title="Open Edition Minter Contract"
      />
      <LinkTabs activeIndex={0} data={openEditionMinterLinkTabs} />

      <div className="grid grid-cols-2 p-4 space-x-8">
        <div className="space-y-8">
          <AddressInput {...contractState} />
          <FormControl htmlId="contract-query-type" subtitle="Type of query to be dispatched" title="Query Type">
            <select
              className={clsx(
                'bg-white/10 rounded border-2 border-white/20 form-select',
                'placeholder:text-white/50',
                'focus:ring focus:ring-plumbus-20',
              )}
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
          <Conditional test={type === 'mint_count'}>
            <AddressInput {...addressState} />
          </Conditional>
        </div>
        <JsonPreview content={contractAddress ? { type, response } : null} title="Query Response" />
      </div>
    </section>
  )
}

export default withMetadata(OpenEditionMinterQueryPage, { center: false })
