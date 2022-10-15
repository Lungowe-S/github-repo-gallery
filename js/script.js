/* ==== Global Variables ==== */

// Select the div with the class of overview
const overview = document.querySelector(".overview")

// GitHub username
const username = "Lungowe"

/* ==== Fetch API/JSON Data ==== */
async function fetchProfile() {
    const request = await fetch(`https://api.github.com/users/${username}`)
    const response = await request.json()
    console.log(response)
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
}
