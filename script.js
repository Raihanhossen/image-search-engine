const accessKey = "mqqijJioTMfyqCqMRwA1Pfv8LBiDaRV-OnffatrR5D8";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = ""; // ✅ Clear old results on new search
    }

    const results = data.results;

    results.forEach((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        // Create image element
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        // Create link to Unsplash image
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);

        // Create credit text
        const credit = document.createElement("p");
        credit.innerHTML = `Photo by <a href="${result.user.links.html}" target="_blank">${result.user.name}</a> on Unsplash`;

        // Append elements to container
        imageContainer.appendChild(imageLink);
        imageContainer.appendChild(credit);
        searchResult.appendChild(imageContainer);
    });

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
