/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { toUtf8 } from '@cosmjs/encoding'
import clsx from 'clsx'
import { Alert } from 'components/Alert'
import type { MintRule } from 'components/badges/creation/ImageUploadDetails'
import { Button } from 'components/Button'
import { Conditional } from 'components/Conditional'
import { ContractPageHeader } from 'components/ContractPageHeader'
import { ExecuteCombobox } from 'components/contracts/badgeHub/ExecuteCombobox'
import { useExecuteComboboxState } from 'components/contracts/badgeHub/ExecuteCombobox.hooks'
import { FormControl } from 'components/FormControl'
import { AddressList } from 'components/forms/AddressList'
import { useAddressListState } from 'components/forms/AddressList.hooks'
import { AddressInput, NumberInput } from 'components/forms/FormInput'
import { useInputState, useNumberInputState } from 'components/forms/FormInput.hooks'
import { InputDateTime } from 'components/InputDateTime'
import { JsonPreview } from 'components/JsonPreview'
import { LinkTabs } from 'components/LinkTabs'
import { badgeHubLinkTabs } from 'components/LinkTabs.data'
import { Tooltip } from 'components/Tooltip'
import { TransactionHash } from 'components/TransactionHash'
import { WhitelistUpload } from 'components/WhitelistUpload'
import { useContracts } from 'contexts/contracts'
import { useGlobalSettings } from 'contexts/globalSettings'
import type { Badge } from 'contracts/badgeHub'
import type { DispatchExecuteArgs } from 'contracts/badgeHub/messages/execute'
import { dispatchExecute, isEitherType, previewExecutePayload } from 'contracts/badgeHub/messages/execute'
import * as crypto from 'crypto'
import { toPng } from 'html-to-image'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import sizeof from 'object-sizeof'
import { QRCodeCanvas } from 'qrcode.react'
import type { FormEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaArrowRight, FaCopy, FaSave } from 'react-icons/fa'
import { useMutation } from 'react-query'
import * as secp256k1 from 'secp256k1'
import { copy } from 'utils/clipboard'
import { NETWORK } from 'utils/constants'
import { generateKeyPairs, sha256 } from 'utils/hash'
import { isValidAddress } from 'utils/isValidAddress'
import { withMetadata } from 'utils/layout'
import { links } from 'utils/links'
import { resolveAddress } from 'utils/resolveAddress'
import { truncateMiddle } from 'utils/text'
import { useWallet } from 'utils/wallet'

import { TextInput } from '../../../components/forms/FormInput'
import { MetadataAttributes } from '../../../components/forms/MetadataAttributes'
import { useMetadataAttributesState } from '../../../components/forms/MetadataAttributes.hooks'
import { BADGE_HUB_ADDRESS } from '../../../utils/constants'

const BadgeHubExecutePage: NextPage = () => {
  const { badgeHub: contract } = useContracts()
  const wallet = useWallet()
  const [lastTx, setLastTx] = useState('')
  const [badge, setBadge] = useState<Badge>()
  const { timezone } = useGlobalSettings()

  const [timestamp, setTimestamp] = useState<Date | undefined>(undefined)
  const [transferrable, setTransferrable] = useState<boolean>(false)
  const [createdBadgeId, setCreatedBadgeId] = useState<string | null>(null)
  const [createdBadgeKey, setCreatedBadgeKey] = useState<string | undefined>(undefined)
  const [resolvedOwnerAddress, setResolvedOwnerAddress] = useState<string>('')
  const [resolvedMinterAddress, setResolvedMinterAddress] = useState<string>('')
  const [signature, setSignature] = useState<string>('')
  const [ownerList, setOwnerList] = useState<string[]>([])
  const [editFee, setEditFee] = useState<number | undefined>(undefined)
  const [triggerDispatch, setTriggerDispatch] = useState<boolean>(false)
  const qrRef = useRef<HTMLDivElement>(null)
  const [numberOfKeys, setNumberOfKeys] = useState(0)
  const [keyPairs, setKeyPairs] = useState<{ publicKey: string; privateKey: string }[]>([])
  const [mintRule, setMintRule] = useState<MintRule>('by_key')

  const comboboxState = useExecuteComboboxState()
  const type = comboboxState.value?.id

  const badgeIdState = useNumberInputState({
    id: 'badge-id',
    name: 'badgeId',
    title: 'Badge ID',
    subtitle: 'Enter the badge ID',
    defaultValue: 1,
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
    defaultValue: BADGE_HUB_ADDRESS,
  })
  const contractAddress = contractState.value

  // Metadata related fields
  const managerState = useInputState({
    id: 'manager-address',
    name: 'manager',
    title: 'Manager',
    subtitle: 'Badge Hub Manager',
    defaultValue: wallet.address,
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
    title: 'Public Key',
    subtitle: 'Part of the key pair to be utilized for post-creation access control',
  })

  const ownerState = useInputState({
    id: 'owner-address',
    name: 'owner',
    title: 'Owner',
    subtitle: 'The owner of the badge',
    defaultValue: wallet.address,
  })

  const ownerListState = useAddressListState()

  const pubkeyState = useInputState({
    id: 'pubkey',
    name: 'pubkey',
    title: 'Pubkey',
    subtitle: 'The whitelisted public key authorized to mint a badge',
  })

  const privateKeyState = useInputState({
    id: 'privateKey',
    name: 'privateKey',
    title: 'Private Key',
    subtitle:
      type === 'mint_by_keys'
        ? 'The corresponding private key for the whitelisted public key'
        : 'The private key that was generated during badge creation',
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
    subtitle: 'Number of keys/owners to execute the action for (0 for all)',
  })

  const designatedMinterState = useInputState({
    id: 'designatedMinter',
    name: 'designatedMinter',
    title: 'Minter Address',
    subtitle: 'The address of the designated minter for this badge',
    defaultValue: wallet.address,
  })

  const showBadgeField = type === 'create_badge'
  const showMetadataField = isEitherType(type, ['create_badge', 'edit_badge'])
  const showIdField = isEitherType(type, [
    'edit_badge',
    'add_keys',
    'purge_keys',
    'purge_owners',
    'mint_by_key',
    'mint_by_keys',
    'mint_by_minter',
  ])
  const showLimitField = isEitherType(type, ['purge_keys', 'purge_owners'])
  const showNFTField = type === 'set_nft'
  const showOwnerField = isEitherType(type, ['mint_by_key', 'mint_by_keys'])
  const showOwnerListField = isEitherType(type, ['mint_by_minter'])
  const showPubkeyField = isEitherType(type, ['mint_by_keys'])
  const showPrivateKeyField = isEitherType(type, ['mint_by_key', 'mint_by_keys'])

  const messages = useMemo(() => contract?.use(contractState.value), [contract, wallet.address, contractState.value])
  const payload: DispatchExecuteArgs = {
    badge: {
      manager: badge?.manager || managerState.value,
      metadata: {
        name: nameState.value || undefined,
        description: descriptionState.value || undefined,
        image: imageState.value || undefined,
        image_data: imageDataState.value || undefined,
        external_url: externalUrlState.value || undefined,
        attributes:
          attributesState.values[0]?.trait_type && attributesState.values[0]?.value
            ? attributesState.values
                .map((attr) => ({
                  trait_type: attr.trait_type,
                  value: attr.value,
                }))
                .filter((attr) => attr.trait_type && attr.value)
            : undefined,
        background_color: backgroundColorState.value || undefined,
        animation_url: animationUrlState.value || undefined,
        youtube_url: youtubeUrlState.value || undefined,
      },
      transferrable,
      rule:
        mintRule === 'by_key'
          ? {
              by_key: keyState.value,
            }
          : mintRule === 'by_minter'
          ? {
              by_minter: resolvedMinterAddress,
            }
          : 'by_keys',
      expiry: timestamp ? timestamp.getTime() * 1000000 : undefined,
      max_supply: maxSupplyState.value || undefined,
    },
    metadata: {
      name: nameState.value || undefined,
      description: descriptionState.value || undefined,
      image: imageState.value || undefined,
      image_data: imageDataState.value || undefined,
      external_url: externalUrlState.value || undefined,
      attributes:
        attributesState.values[0]?.trait_type && attributesState.values[0]?.value
          ? attributesState.values
              .map((attr) => ({
                trait_type: attr.trait_type,
                value: attr.value,
              }))
              .filter((attr) => attr.trait_type && attr.value)
          : undefined,
      background_color: backgroundColorState.value || undefined,
      animation_url: animationUrlState.value || undefined,
      youtube_url: youtubeUrlState.value || undefined,
    },
    id: badgeIdState.value,
    owner: resolvedOwnerAddress,
    pubkey: pubkeyState.value,
    signature,
    keys: keyPairs.map((keyPair) => keyPair.publicKey),
    limit: limitState.value || undefined,
    owners: [
      ...new Set(
        ownerListState.values
          .map((a) => a.address.trim())
          .filter((address) => address !== '' && isValidAddress(address.trim()) && address.startsWith('stars'))
          .concat(ownerList),
      ),
    ],
    nft: nftState.value,
    editFee,
    contract: contractState.value,
    messages,
    txSigner: wallet.address || '',
    type,
  }
  const { isLoading, mutate } = useMutation(
    async (event: FormEvent) => {
      event.preventDefault()
      if (!type) {
        throw new Error('Please select message type!')
      }
      if (!wallet.isWalletConnected) {
        throw new Error('Please connect your wallet.')
      }
      if (contractState.value === '') {
        throw new Error('Please enter the contract address.')
      }
      if (type === 'edit_badge') {
        const client = await wallet.getCosmWasmClient()
        const feeRateRaw = await client.queryContractRaw(
          contractAddress,
          toUtf8(Buffer.from(Buffer.from('fee_rate').toString('hex'), 'hex').toString()),
        )
        const feeRate = JSON.parse(new TextDecoder().decode(feeRateRaw as Uint8Array))

        await toast
          .promise(
            client.queryContractSmart(contractAddress, {
              badge: { id: badgeIdState.value },
            }),
            {
              error: `Edit Fee calculation failed!`,
              loading: 'Calculating Edit Fee...',
              success: (currentBadge) => {
                console.log('Current badge: ', currentBadge)
                return `Current metadata is ${
                  Number(sizeof(currentBadge.metadata)) + Number(sizeof(currentBadge.metadata.attributes))
                } bytes in size.`
              },
            },
          )
          .then((currentBadge) => {
            // TODO - Go over the calculation
            const currentBadgeMetadataSize =
              Number(sizeof(currentBadge.metadata)) + Number(sizeof(currentBadge.metadata.attributes) * 2)
            console.log('Current badge metadata size: ', currentBadgeMetadataSize)
            const newBadgeMetadataSize =
              Number(sizeof(badge?.metadata)) + Number(sizeof(badge?.metadata.attributes)) * 2
            console.log('New badge metadata size: ', newBadgeMetadataSize)
            if (newBadgeMetadataSize > currentBadgeMetadataSize) {
              const calculatedFee = ((newBadgeMetadataSize - currentBadgeMetadataSize) * Number(feeRate.metadata)) / 2
              setEditFee(calculatedFee)
              setTriggerDispatch(!triggerDispatch)
            } else {
              setEditFee(undefined)
              setTriggerDispatch(!triggerDispatch)
            }
          })
          .catch((error) => {
            throw new Error(String(error).substring(String(error).lastIndexOf('Error:') + 7))
          })
      } else {
        const txHash = await toast.promise(dispatchExecute(payload), {
          error: `${type.charAt(0).toUpperCase() + type.slice(1)} execute failed!`,
          loading: 'Executing message...',
          success: (tx) => `Transaction ${tx.split(':')[0]} success!`,
        })
        if (txHash) {
          setLastTx(txHash.split(':')[0])
          setCreatedBadgeId(txHash.split(':')[1])
          badgeIdState.onChange(!isNaN(Number(txHash.split(':')[1])) ? Number(txHash.split(':')[1]) : 1)
        }
      }
    },
    {
      onError: (error) => {
        toast.error(String(error), { style: { maxWidth: 'none' } })
      },
    },
  )

  const handleGenerateKey = () => {
    let privKey: Buffer
    do {
      privKey = crypto.randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privKey))

    const privateKey = privKey.toString('hex')
    setCreatedBadgeKey(privateKey)
    console.log('Private Key: ', privateKey)

    const publicKey = Buffer.from(secp256k1.publicKeyCreate(privKey)).toString('hex')

    keyState.onChange(publicKey)
    setCreatedBadgeId(null)
  }

  const handleGenerateSignature = (id: number, owner: string, privateKey: string) => {
    try {
      const message = `claim badge ${id} for user ${owner}`

      const privKey = Buffer.from(privateKey, 'hex')
      // const pubKey = Buffer.from(secp256k1.publicKeyCreate(privKey, true))
      const msgBytes = Buffer.from(message, 'utf8')
      const msgHashBytes = sha256(msgBytes)
      const signedMessage = secp256k1.ecdsaSign(msgHashBytes, privKey)
      setSignature(Buffer.from(signedMessage.signature).toString('hex'))
    } catch (error) {
      console.log(error)
      toast.error('Error generating signature.')
    }
  }

  const handleDownloadQr = async () => {
    const qrElement = qrRef.current
    await toPng(qrElement as HTMLElement).then((dataUrl) => {
      const link = document.createElement('a')
      link.download = `badge-${createdBadgeId as string}.png`
      link.href = dataUrl
      link.click()
    })
  }
  const handleDownloadKeys = () => {
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(keyPairs)], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `badge-${badgeIdState.value}-keys.json`
    document.body.appendChild(element)
    element.click()
  }

  const copyClaimURL = async () => {
    const baseURL = NETWORK === 'testnet' ? 'https://badges.publicawesome.dev' : 'https://badges.stargaze.zone'
    const claimURL = `${baseURL}/?id=${createdBadgeId as string}&key=${createdBadgeKey as string}`
    await navigator.clipboard.writeText(claimURL)
    toast.success('Copied claim URL to clipboard')
  }

  const dispatchEditBadgeMessage = async () => {
    if (type) {
      const txHash = await toast.promise(dispatchExecute(payload), {
        error: `${type.charAt(0).toUpperCase() + type.slice(1)} execute failed!`,
        loading: 'Executing message...',
        success: (tx) => `Transaction ${tx} success!`,
      })
      if (txHash) {
        setLastTx(txHash)
      }
    }
  }

  useEffect(() => {
    if (numberOfKeys > 0) {
      setKeyPairs(generateKeyPairs(numberOfKeys))
    }
  }, [numberOfKeys])

  useEffect(() => {
    if (privateKeyState.value.length === 64 && resolvedOwnerAddress)
      handleGenerateSignature(badgeIdState.value, resolvedOwnerAddress, privateKeyState.value)
  }, [privateKeyState.value, resolvedOwnerAddress])

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
    if (attributesState.values.length === 0)
      attributesState.add({
        trait_type: '',
        value: '',
      })
  }, [])

  useEffect(() => {
    void dispatchEditBadgeMessage().catch((err) => {
      toast.error(String(err), { style: { maxWidth: 'none' } })
    })
  }, [triggerDispatch])

  const resolveOwnerAddress = async () => {
    await resolveAddress(ownerState.value.trim(), wallet).then((resolvedAddress) => {
      setResolvedOwnerAddress(resolvedAddress)
    })
  }
  useEffect(() => {
    void resolveOwnerAddress()
  }, [ownerState.value])

  const resolveMinterAddress = async () => {
    await resolveAddress(designatedMinterState.value.trim(), wallet).then((resolvedAddress) => {
      setResolvedMinterAddress(resolvedAddress)
    })
  }
  useEffect(() => {
    void resolveMinterAddress()
  }, [designatedMinterState.value])

  const resolveManagerAddress = async () => {
    await resolveAddress(managerState.value.trim(), wallet).then((resolvedAddress) => {
      setBadge({
        manager: resolvedAddress,
        metadata: {
          name: nameState.value || undefined,
          description: descriptionState.value || undefined,
          image: imageState.value || undefined,
          image_data: imageDataState.value || undefined,
          external_url: externalUrlState.value || undefined,
          attributes:
            attributesState.values[0]?.trait_type && attributesState.values[0]?.value
              ? attributesState.values
                  .map((attr) => ({
                    trait_type: attr.trait_type,
                    value: attr.value,
                  }))
                  .filter((attr) => attr.trait_type && attr.value)
              : undefined,
          background_color: backgroundColorState.value || undefined,
          animation_url: animationUrlState.value || undefined,
          youtube_url: youtubeUrlState.value || undefined,
        },
        transferrable,
        rule:
          mintRule === 'by_key'
            ? {
                by_key: keyState.value,
              }
            : mintRule === 'by_minter'
            ? {
                by_minter: resolvedMinterAddress,
              }
            : 'by_keys',
        expiry: timestamp ? timestamp.getTime() * 1000000 : undefined,
        max_supply: maxSupplyState.value || undefined,
      })
    })
  }

  useEffect(() => {
    void resolveManagerAddress()
  }, [managerState.value])

  useEffect(() => {
    setBadge({
      manager: managerState.value,
      metadata: {
        name: nameState.value || undefined,
        description: descriptionState.value || undefined,
        image: imageState.value || undefined,
        image_data: imageDataState.value || undefined,
        external_url: externalUrlState.value || undefined,
        attributes:
          attributesState.values[0]?.trait_type && attributesState.values[0]?.value
            ? attributesState.values
                .map((attr) => ({
                  trait_type: attr.trait_type,
                  value: attr.value,
                }))
                .filter((attr) => attr.trait_type && attr.value)
            : undefined,
        background_color: backgroundColorState.value || undefined,
        animation_url: animationUrlState.value || undefined,
        youtube_url: youtubeUrlState.value || undefined,
      },
      transferrable,
      rule:
        mintRule === 'by_key'
          ? {
              by_key: keyState.value,
            }
          : mintRule === 'by_minter'
          ? {
              by_minter: resolvedMinterAddress,
            }
          : 'by_keys',
      expiry: timestamp ? timestamp.getTime() * 1000000 : undefined,
      max_supply: maxSupplyState.value || undefined,
    })
  }, [
    managerState.value,
    nameState.value,
    descriptionState.value,
    imageState.value,
    imageDataState.value,
    externalUrlState.value,
    attributesState.values,
    backgroundColorState.value,
    animationUrlState.value,
    youtubeUrlState.value,
    transferrable,
    keyState.value,
    timestamp,
    maxSupplyState.value,
  ])

  return (
    <section className="py-6 px-12 space-y-4">
      <NextSeo title="Execute Badge Hub Contract" />
      <ContractPageHeader
        description="The Badge Hub contract dashboard is where event organizers create, mint, or edit badges."
        link={links.Documentation}
        title="Badge Hub Contract"
      />
      <LinkTabs activeIndex={2} data={badgeHubLinkTabs} />

      {showBadgeField && createdBadgeId && createdBadgeKey && mintRule === 'by_key' && (
        <div className="flex flex-row">
          <div className="ml-4">
            <div className="w-[384px] h-[384px]" ref={qrRef}>
              <QRCodeCanvas
                size={384}
                value={`${
                  NETWORK === 'testnet' ? 'https://badges.publicawesome.dev' : 'https://badges.stargaze.zone'
                }/?id=${createdBadgeId}&key=${createdBadgeKey}`}
              />
            </div>
            {/* <div className="flex flex-row items-center mt-2 space-x-2 w-[384px] h-12"> */}
            <div className="grid grid-cols-2 gap-2 mt-2 w-[384px]">
              <Button
                className="items-center w-full text-sm text-center rounded"
                leftIcon={<FaSave />}
                onClick={() => void handleDownloadQr()}
              >
                Download QR Code
              </Button>
              <Button
                className="w-full text-sm text-center rounded"
                isWide
                leftIcon={<FaCopy />}
                onClick={() => void copyClaimURL()}
                variant="solid"
              >
                Copy Claim URL
              </Button>
            </div>
          </div>
          <div className="ml-4">
            <Alert className="text-white" type="info">
              <div>
                <span className="font-bold text-white">Badge ID: </span>
                <span className="text-white/80">{createdBadgeId} </span>
              </div>

              <span className="font-bold text-white">Private Key:</span>
              <Tooltip label="Click to copy the private key">
                <button
                  className="group flex space-x-2 font-mono text-base text-white/80 hover:underline"
                  onClick={() => void copy(createdBadgeKey as string)}
                  type="button"
                >
                  <span>{truncateMiddle(createdBadgeKey ? createdBadgeKey : '', 32)}</span>
                  <FaCopy className="opacity-50 group-hover:opacity-100" />
                </button>
              </Tooltip>
            </Alert>
            <br />
            <Alert className="text-white" type="warning">
              Please make sure to save the Badge ID and the Private Key.
            </Alert>
          </div>
        </div>
      )}

      {showBadgeField && createdBadgeId && mintRule === 'by_keys' && (
        <Alert className="mt-5" type="info">
          <div className="ml-4 text-lg">
            Badge ID:{` ${createdBadgeId as string}`}
            <br />
            <div className="text-base">
              <div className="flex-row pt-4 mt-4 border-t-2">
                <span>
                  You may select Message Type {'>'} Add Keys to add whitelisted keys authorized to mint a badge.
                </span>
              </div>
            </div>
          </div>
        </Alert>
      )}

      {showBadgeField && createdBadgeId && mintRule === 'by_minter' && (
        <Alert className="mt-5" type="info">
          <div className="ml-4 text-lg">
            Badge successfully created with ID:{` ${createdBadgeId as string}`}
            <br />
            Designated Minter Address: {` ${resolvedMinterAddress}`}
            <br />
            <div className="text-base">
              <div className="flex-row pt-4 mt-4 border-t-2">
                <span>
                  You may select Message Type {'>'} Mint by Minter to mint badges using the designated minter wallet.
                </span>
              </div>
            </div>
          </div>
        </Alert>
      )}

      <form className="grid grid-cols-2 p-4 space-x-8" onSubmit={mutate}>
        <div className="space-y-8">
          <AddressInput {...contractState} />
          <ExecuteCombobox {...comboboxState} />
          <Conditional test={type === 'create_badge'}>
            <div className={clsx('flex flex-col space-y-2')}>
              <div>
                <div className="flex">
                  <span className="mt-1 text-base font-bold first-letter:capitalize">Mint Rule: </span>
                  <div className="ml-2 font-bold form-check form-check-inline">
                    <input
                      checked={mintRule === 'by_key'}
                      className="peer sr-only"
                      id="ruleRadio1"
                      name="ruletRadio1"
                      onClick={() => {
                        setMintRule('by_key')
                        setCreatedBadgeId(null)
                      }}
                      type="radio"
                    />
                    <label
                      className="inline-block py-1 px-2 text-base text-gray peer-checked:text-white hover:text-white peer-checked:bg-black hover:rounded-sm peer-checked:border-b-2 hover:border-b-2 peer-checked:border-plumbus hover:border-plumbus cursor-pointer form-check-label"
                      htmlFor="ruleRadio1"
                    >
                      By Key
                    </label>
                  </div>
                  <div className="ml-2 font-bold form-check form-check-inline">
                    <input
                      checked={mintRule === 'by_keys'}
                      className="peer sr-only"
                      id="ruleRadio2"
                      name="ruletRadio2"
                      onClick={() => {
                        setMintRule('by_keys')
                        setCreatedBadgeId(null)
                      }}
                      type="radio"
                    />
                    <label
                      className="inline-block py-1 px-2 text-base text-gray peer-checked:text-white hover:text-white peer-checked:bg-black hover:rounded-sm peer-checked:border-b-2 hover:border-b-2 peer-checked:border-plumbus hover:border-plumbus cursor-pointer form-check-label"
                      htmlFor="ruleRadio2"
                    >
                      By Keys
                    </label>
                  </div>
                  <div className="ml-2 font-bold form-check form-check-inline">
                    <input
                      checked={mintRule === 'by_minter'}
                      className="peer sr-only"
                      id="ruleRadio3"
                      name="ruletRadio3"
                      onClick={() => {
                        setMintRule('by_minter')
                        setCreatedBadgeId(null)
                      }}
                      type="radio"
                    />
                    <label
                      className="inline-block py-1 px-2 text-base text-gray peer-checked:text-white hover:text-white peer-checked:bg-black hover:rounded-sm peer-checked:border-b-2 hover:border-b-2 peer-checked:border-plumbus hover:border-plumbus cursor-pointer form-check-label"
                      htmlFor="ruleRadio3"
                    >
                      By Minter
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Conditional>
          {showIdField && <NumberInput {...badgeIdState} />}
          {showBadgeField && <AddressInput {...managerState} />}
          {showBadgeField && mintRule === 'by_key' && <TextInput {...keyState} />}
          {showBadgeField && mintRule === 'by_key' && <Button onClick={handleGenerateKey}>Generate Key</Button>}
          {showBadgeField && mintRule === 'by_minter' && <TextInput {...designatedMinterState} />}
          {showMetadataField && (
            <div className="p-4 rounded-md border-2 border-gray-800">
              <span className="text-gray-400">Metadata</span>
              <TextInput className="mt-2" {...nameState} />
              <TextInput className="mt-2" {...descriptionState} />
              <TextInput className="mt-2" {...imageState} />
              <TextInput className="mt-2" {...imageDataState} />
              <TextInput className="mt-2" {...externalUrlState} />
              <div className="mt-2">
                <MetadataAttributes
                  attributes={attributesState.entries}
                  onAdd={attributesState.add}
                  onChange={attributesState.update}
                  onRemove={attributesState.remove}
                  title="Traits"
                />
              </div>
              <TextInput className="mt-2" {...backgroundColorState} />
              <TextInput className="mt-2" {...animationUrlState} />
              <TextInput className="mt-2" {...youtubeUrlState} />
            </div>
          )}
          {showOwnerField && (
            <AddressInput
              className="mt-2"
              {...ownerState}
              subtitle="The address that the badge will be minted to"
              title="Owner"
            />
          )}
          <Conditional test={showOwnerListField}>
            <div className="mt-4">
              <AddressList
                entries={ownerListState.entries}
                isRequired
                onAdd={ownerListState.add}
                onChange={ownerListState.update}
                onRemove={ownerListState.remove}
                subtitle="Enter the owner addresses"
                title="Addresses"
              />
              <Alert className="mt-8" type="info">
                You may optionally choose a text file of additional owner addresses.
              </Alert>
              <WhitelistUpload onChange={setOwnerList} />
            </div>
          </Conditional>
          <Conditional test={type === 'add_keys'}>
            <div className="flex flex-row justify-start py-3 mt-4 mb-3 w-full rounded border-2 border-white/20">
              <div className="grid grid-cols-2 gap-24">
                <div className="flex flex-col ml-4">
                  <span className="font-bold">Number of Keys</span>
                  <span className="text-sm text-white/80">
                    The number of public keys to be whitelisted for minting badges
                  </span>
                </div>
                <input
                  className="p-2 mt-4 w-1/2 max-w-2xl h-1/2 bg-white/10 rounded border-2 border-white/20"
                  onChange={(e) => setNumberOfKeys(Number(e.target.value))}
                  required
                  type="number"
                  value={numberOfKeys}
                />
              </div>
            </div>
          </Conditional>

          <Conditional test={numberOfKeys > 0 && type === 'add_keys'}>
            <Alert type="info">
              <div className="pt-2">
                <span className="mt-2">
                  Make sure to download the whitelisted public keys together with their private key counterparts.
                </span>
                <Button className="mt-2" onClick={() => handleDownloadKeys()}>
                  Download Key Pairs
                </Button>
              </div>
            </Alert>
          </Conditional>
          {showLimitField && <NumberInput {...limitState} />}
          {showPubkeyField && <TextInput className="mt-2" {...pubkeyState} />}
          {showPrivateKeyField && <TextInput className="mt-2" {...privateKeyState} />}
          {showNFTField && <AddressInput {...nftState} />}
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
          <div className="pt-9">
            <Conditional test={showBadgeField}>
              <FormControl
                htmlId="expiry-date"
                subtitle={`Badge minting expiry date ${timezone === 'Local' ? '(local)' : '(UTC)'}`}
                title="Expiry Date"
              >
                <InputDateTime
                  minDate={
                    timezone === 'Local'
                      ? new Date()
                      : new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000)
                  }
                  onChange={(date) =>
                    setTimestamp(
                      timezone === 'Local'
                        ? date
                        : new Date(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000),
                    )
                  }
                  value={
                    timezone === 'Local'
                      ? timestamp
                      : timestamp
                      ? new Date(timestamp.getTime() + new Date().getTimezoneOffset() * 60 * 1000)
                      : undefined
                  }
                />
              </FormControl>
            </Conditional>
            {showBadgeField && <NumberInput className="mt-2" {...maxSupplyState} />}
            {showBadgeField && (
              <div className="mt-2 form-control">
                <label className="justify-start cursor-pointer label">
                  <span className="mr-4 font-bold">Transferrable</span>
                  <input
                    checked={transferrable}
                    className={`toggle ${transferrable ? `bg-stargaze` : `bg-gray-600`}`}
                    onClick={() => setTransferrable(!transferrable)}
                    type="checkbox"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  )
}

export default withMetadata(BadgeHubExecutePage, { center: false })
