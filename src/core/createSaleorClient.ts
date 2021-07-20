import { auth } from "./auth";
import { createApolloClient } from "../apollo";
import { SaleorClient, SaleorSDKConfig } from "./types";

export const createSaleorClient = ({
  apiUrl,
  channel,
}: SaleorSDKConfig): SaleorClient => {
  let _channel = channel;

  const setChannel = (channel: string): string => {
    _channel = channel;
    return _channel;
  };

  const apolloClient = createApolloClient(apiUrl);
  const coreInternals = { apolloClient, channel: _channel };
  const authSDK = auth(coreInternals);

  return {
    auth: authSDK,
    config: { channel: _channel, setChannel },
    _internal: { apolloClient },
  };
};
