/* ==== Global Variables ==== */

// Select the div with the class of overview
const overview = document.querySelector(".overview")
// GitHub username
const username = "Lungowe"
// Select the unordered list that will display the repos list
const repoList = document.querySelector(".repo-list")
// Select the section with a class of repos
const repos = document.querySelector(".repos")
// Select the section with a class of repo-data
const repoData = document.querySelector(".repo-data")
// Select the 'Back to Repo Gallery' button
const backButton = document.querySelector(".view-repos")
// Select input with 'Search by name' placeholder
const filterInput = document.querySelector(".filter-repos")

/* ==== Fetch API/JSON Data ==== */
async function fetchProfile() {
    const request = await fetch(`https://api.github.com/users/${username}`)
    const response = await request.json()
    //console.log(response)
    displayInfo(response)
}

fetchProfile()

/* ==== Function to display the fetched user information ==== */
const displayInfo = (response) => {
    const div = document.createElement("div")
    div.classList.add("user-info")
    div.innerHTML = `<figure>
        <img alt="user avatar" src=${response.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${response.name}</p>
        <p><strong>Bio:</strong> ${response.bio}</p>
        <p><strong>Location:</strong> ${response.location}</p>
        <p><strong>Number of public repos:</strong> ${response.public_repos}</p>
    </div>`
    overview.append(div)
    fetchRepos()
}

/* ==== Async function to fetch your repos ==== */
async function fetchRepos() {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated?per_page=100?type=public`)
    const repos = await fetchRepos.json()
    //console.log(repos)
    displayRepos(repos)
}

//fetchRepos()

/* ===== Function to display info about your repos ==== */
const displayRepos = (repos) => {
    filterInput.classList.remove("hide")
    for (const repo of repos) {
        const listItem = document.createElement("li")
        listItem.classList.add("repo")
        listItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(listItem)
    }
}

/* ==== Click event on unordered list with a class of "repo-list" ==== */
repoList.addEventListener("click", e => {
    if (e.target.matches("h3")) {
        let repoName = e.target.textContent
        //console.log(repoName)
        getRepoInfo(repoName)
    }
})

/* ==== Async function to get repo specific info ==== */
async function getRepoInfo(repoName) {
    const getRepos = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await getRepos.json()
    //console.log(repoInfo)
    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json()
    //console.log(languageData)
    const languages = []
    for (let language in languageData) {
        languages.push(language)
    }
    //console.log(languages)
    displayRepoInfo(repoInfo, languages)
}

/* ==== Function to Display Specific Repo Info ==== */
const displayRepoInfo = (repoInfo, languages) => {
    repoData.innerHTML = ""
    const div = document.createElement("div")
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div)
    repoData.classList.remove("hide")
    repos.classList.add("hide")
    backButton.classList.remove("hide")
}

/* ==== Add a Click Event to the Back Button ==== */
backButton.addEventListener("click", e => {
    repos.classList.remove("hide")
    repoData.classList.add("hide")
    backButton.classList.add("hide")
})

/* ==== Add an Input Event to the Search Box ==== */
filterInput.addEventListener("input", e => {
    const searchText = e.target.value
    //console.log(searchValue)
    const repos = Array.from(document.querySelectorAll(".repo"))
    let lowercaseSearch = searchText.toLowerCase()
    for (const repo of repos) {
        const repoText = repo.textContent.toLowerCase()
        if (repoText.includes(lowercaseSearch)) {
            repo.classList.remove("hide")
        } else {
            repo.classList.add("hide")
        }
    }
})
