import React from "react";

export default function SearchBar(props: {
  onContentChange: (value: string) => void
}) {
  const [value, setValue] = React.useState<string>("");
  
  function handleChange(newValue: string) {
    setValue(newValue);
    props.onContentChange(newValue);
  }

  return <input
    type="search"
    name={"検索"}
    placeholder={"探す"}
    value={value}
    onInput={(event) => handleChange(event.currentTarget.value)}
    className="w-full col-start-1 row-start-1 px-4 py-2 mb-2 text-gray-700 border-2 border-gray-700 rounded-md focus-within:border-primary focus:outline-none"
  />
}