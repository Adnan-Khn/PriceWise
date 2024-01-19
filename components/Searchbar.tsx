"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

function Searchbar() {
  const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }

    return false;
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(searchPrompt);
    const isValidLink = isValidAmazonProductURL(searchPrompt)
    //alert(isValidLink?"Valid Link":"InValid Link")
    if(!isValidLink){
        alert("Provide a Valid Link")
    }
    try{
        setIsLoading(true)
        //Scraper
        const  product = await scrapeAndStoreProduct(searchPrompt)
    }catch(error:any){
        console.log(error.message)
        setIsLoading(false)
    }finally{
        setIsLoading(false)
    }
    //setSearchPrompt("");

  }
  const [isLoading, setIsLoading] = useState(false);
  const [searchPrompt, setSearchPrompt] = useState("");

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
export default Searchbar;
