import { Avatar, Link } from "components/ui"
import { TableDelegateColsProp } from "../DelegateTable"
import { DelegateAccountData } from "@Types"

export const name = {
  value: "Name",
  format: (delegate: DelegateAccountData) => (
    <div className="flex flex-row items-center">
      <Avatar className="mr-2" address={delegate.summary.address} size={30} />
      <span className="font-medium text-onSurfacePrimaryMedium">
        <Link
          color="onSurfaceLinkHigh"
          href={`/account/[[...slug]]`}
          link={`/account/${delegate.summary.address}`}
        >
          {delegate.dpos?.delegate?.username}
        </Link>
      </span>
    </div>
  ),
} as TableDelegateColsProp
