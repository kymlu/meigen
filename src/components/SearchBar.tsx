import React from "react";
import Icon from "./Icon";
import { ICON } from "../data/icons";

export default function SearchBar(props: {
  onContentChange: (value: string) => void
}) {
  const [value, setValue] = React.useState<string>("");
  
  function handleChange(newValue: string) {
    setValue(newValue);
    props.onContentChange(newValue);
  }

  return <div className="flex">
    <input
      type="search"
      name={"検索"}
      placeholder={"探す"}
      value={value}
      onInput={(event) => handleChange(event.currentTarget.value)}
      className="w-full col-start-1 row-start-1 py-2 pl-12 pr-4 mb-2 text-gray-700 border-2 border-gray-700 rounded-md focus-within:border-primary focus:outline-none"
    />
    <div className="absolute p-2">
      <Icon src={ICON.search} alt="検索バー"/>
    </div>
  </div>
}