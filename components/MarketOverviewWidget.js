import React from "react";
import dynamic from "next/dynamic";

const MarketOverviewNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.MarketOverview),
  {
    ssr: false,
  }
);
const MarketDataNoSSR = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.MarketData),
  {
    ssr: false,
  }
);

const Chart1 = () => {
  return (
    <div className="lg:flex lg:items-start  lg:mt-6">
      <div className="lg:w-2/3">
        <MarketOverviewNoSSR
          colorTheme="dark"
          height={600}
          width="100%"
          showFloatingTooltip
        />
      </div>
      <div className="lg:w-1/3">
        <MarketDataNoSSR
          colorTheme="dark"
          height={600}
          width="100%"
          showFloatingTooltip
        />
      </div>
    </div>
  );
};

export default Chart1;
