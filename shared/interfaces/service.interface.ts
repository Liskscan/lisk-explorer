import {
  Envelope,
  NetworkStatusDataType,
} from "@moosty/lisk-connection-provider"
import {
  AccountDataType,
  BlockDataType,
  ForgersDataType,
  PeersDataType,
  TransactionDataType,
  TransactionSchemasDataType,
} from "@moosty/lisk-service-provider"

export interface AccountEnvelope extends Omit<Envelope, "data"> {
  data?: AccountDataType[]
}

export interface TransactionEnvelope extends Omit<Envelope, "data"> {
  data?: TransactionDataType[]
}

export interface BlockEnvelope extends Omit<Envelope, "data"> {
  data?: BlockDataType[]
}

export interface SchemasEnvelope extends Omit<Envelope, "data"> {
  data?: TransactionSchemasDataType[]
}

export interface ForgersEnvelope extends Omit<Envelope, "data"> {
  data?: ForgersDataType[]
}

export interface PeersEnvelope extends Omit<Envelope, "data"> {
  data?: PeersDataType[]
}

export interface NetworkStatusEnvelope extends Omit<Envelope, "data"> {
  data?: NetworkStatusDataType
}

export interface SingleVoteReceived {
  id: string
  username?: string
  amount: string
  timestamp: number
  address: string
}
