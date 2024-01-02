import { clearSearchText, clearPushListener, setSearchFocus, showClearTextButton } from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp()
    }
})

const initApp = () => {
    setSearchFocus();

    const search = document.getElementById("search")
    search.addEventListener("input", showClearTextButton);
    const clear = document.getElementById("clear")
    clear.addEventListener("click", clearSearchText)
    clear.addEventListener("keydown", clearPushListener)
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
}

// procedural "workflow" function
const submitTheSearch = (event) => {
    event.preventDefault()
    // TODO delete search results
    // process the search
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();

}

const processTheSearch = async () => {
    //clear the stats line
    clearStatsLine()
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) buildSearchResults(resultArray)
    setStatsLine(resultArray.length)
}