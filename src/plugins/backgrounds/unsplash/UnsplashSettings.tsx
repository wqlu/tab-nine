import React from "react";
import { Icon } from "../../../views/shared";
import { DebounceInput } from "../../shared";
import topics from "./topics.json";
import { defaultData, Props } from "./types";

const UnsplashSettings: React.FC<Props> = ({ data = defaultData, setData }) => (
  <div className="UnsplashSettings">
    <label>
      <span style={{ float: "right" }}>
        {data.paused ? <span className="text--grey">(Paused) </span> : null}
        <a onClick={() => setData({ ...data, paused: !data.paused })}>
          <Icon name={data.paused ? "play" : "pause"} />
        </a>
      </span>
      Show a new photo
      <select
        value={data.timeout}
        onChange={(event) =>
          setData({ ...data, timeout: Number(event.target.value) })
        }
      >
        <option value="0">Every new tab</option>
        <option value="300">Every 5 minutes</option>
        <option value="900">Every 15 minutes</option>
        <option value="3600">Every hour</option>
        <option value="86400">Every day</option>
        <option value="604800">Every week</option>
      </select>
    </label>

    <label>
      <input
        type="checkbox"
        checked={data.smoothTransition}
        onChange={(event) =>
          setData({ ...data, smoothTransition: !data.smoothTransition })
        }
      />{" "}
      Smooth image transition
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "official"}
        onChange={() => setData({ ...data, by: "official" })}
      />{" "}
      Official Collection
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "topics"}
        onChange={() => setData({ ...data, by: "topics" })}
      />{" "}
      Topics
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "search"}
        onChange={() => setData({ ...data, by: "search" })}
      />{" "}
      Search
    </label>

    <label>
      <input
        type="radio"
        checked={data.by === "collections"}
        onChange={() => setData({ ...data, by: "collections" })}
      />{" "}
      Collection
    </label>

    {data.by === "topics" && (
      <label>
        Topics
        <select
          multiple
          value={data.topics}
          onChange={(event) =>
            setData({
              ...data,
              topics: Array.prototype.filter
                .call(event.target.options, (option) => option.selected)
                .map((option) => option.value),
            })
          }
        >
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.title}
            </option>
          ))}
        </select>
        Tip: To select multiple topics, hold down{" "}
        {getOS() == "macos" ? "Command (⌘)" : "Control (CTRL)"} and click the topics.
      </label>
    )}

    {data.by === "search" && (
      <>
        <label>
          Tags
          <DebounceInput
            type="text"
            value={data.search}
            placeholder="Try landscapes or animals..."
            onChange={(value) => setData({ ...data, search: value })}
            wait={500}
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={data.featured}
            onChange={(event) => setData({ ...data, featured: !data.featured })}
          />{" "}
          Only featured images
        </label>
      </>
    )}

    {data.by === "collections" && (
      <label>
        Collection
        <DebounceInput
          type="text"
          value={data.collections}
          placeholder="Collection ID number"
          onChange={(value) => setData({ ...data, collections: value })}
          wait={500}
        />
      </label>
    )}
  </div>
);

function getOS() {
  let userAgent = window.navigator.userAgent.toLowerCase(),
    macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
    windowsPlatforms = /(win32|win64|windows|wince)/i,
    iosPlatforms = /(iphone|ipad|ipod)/i,
    os = null;

  if (macosPlatforms.test(userAgent)) {
    os = "macos";
  } else if (iosPlatforms.test(userAgent)) {
    os = "ios";
  } else if (windowsPlatforms.test(userAgent)) {
    os = "windows";
  } else if (/android/.test(userAgent)) {
    os = "android";
  } else if (!os && /linux/.test(userAgent)) {
    os = "linux";
  }

  return os;
}

export default UnsplashSettings;
