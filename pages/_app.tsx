import { AppProps } from "next/app"
import { CurrencyProvider } from "providers/CurrencyProvider"
import { ServiceEventsProvider } from "@moosty/lisk-service-events"
import { Footer, HeaderContainer } from "../containers/layout"
import { LiskServiceProvider } from "@moosty/lisk-service-provider"
import { MobileMenuBottom } from "@Components"
import "../styles/base.css"

export const LiskScan = ({ Component, pageProps }: AppProps) => {
  return (
      <LiskServiceProvider
        endpoints={[
          {
            host: process.env.NEXT_PUBLIC_NETWORK_WS!,
            type: "serviceRPC",
          },
          {
            host: process.env.NEXT_PUBLIC_NETWORK_HTTP!,
            type: "serviceHTTP",
          },
        ]}
      >
        <ServiceEventsProvider>
          <CurrencyProvider>
            <HeaderContainer />
            <Component {...pageProps} />
            <Footer />
            <MobileMenuBottom />
          </CurrencyProvider>
        </ServiceEventsProvider>
      </LiskServiceProvider>
  )
}

export default LiskScan
