import React, { FC } from "react";

import { Props, defaultData } from "./types";

const QuoteSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="QuoteSettings">
    <h5>Hourly Quotes</h5>
    <label>
      <input
        type="radio"
        checked={data.category === "developerexcuses"}
        onChange={() => setData({ category: "developerexcuses" })}
      />{" "}
      Developer Excuses
    </label>
    <p>
      Powered by{" "}
      <a
        href="http://www.developerexcuses.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Developer Excuses
      </a>
    </p>
    <label>
      <input
        type="radio"
        checked={data.category === "random"}
        onChange={() => setData({ category: "random" })}
      />{" "}
      Random
    </label>
    <p>
      Powered by{" "}
      <a
        href="https://github.com/lukePeavey/quotable"
        target="_blank"
        rel="noopener noreferrer"
      >
        Quotable
      </a>
    </p>
  </div>
);

export default QuoteSettings;
