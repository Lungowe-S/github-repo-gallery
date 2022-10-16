/* ==== Global Variables ==== */

// Select the div with the class of overview
const overview = document.querySelector(".overview")
// GitHub username
const username = "Lungowe"
// Select the unordered list that will display the repos list
const repoList = document.querySelector(".repo-list")

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
    for (const repo of repos) {
        const listItem = document.createElement("li")
        listItem.classList.add("repo")
        listItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(listItem)
    }
}