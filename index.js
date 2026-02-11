const creatElement = (arr) => {
  const htmlElements = arr.map((el) => `<span class='btn'>${el}</span>`);
  return htmlElements.join(" ");
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json?.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickedBtn);
      clickedBtn.classList.add("active"); // add active class
      displayLevelWord(data?.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const detail = await res.json();
  displayWordDetail(detail?.data);
};
const displayWordDetail = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div class="">
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
          </div>
          <div class="">
          <h2>Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div class="">
          <h2>Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div class="">
          <h2>Synonym</h2>
          <div class="">
          ${creatElement(word.synonyms)}
        </div>
        </div>
  `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
     <div class="text-center col-span-full py-10 space-y-4 ">
     <img src="./assets/alert-error.png" class="mx-auto />
        <p class="text-sm font-medium text-gray-400 font-bangla">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-4xl font-medium font-bangla">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }
  for (let word of words) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-semibold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-medium">Meaning /Pronounciation</p>
        <div class="font-bangla text-xl font-semibold text-gray-600">
          "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"
        </div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
`;
    wordContainer.append(card);
  }
};

const displayLessons = (lessons) => {
  // 1. get the container
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get into every lessons
  for (let lesson of lessons) {
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson?.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson?.level_no}
        </button>
    `;
    // 4. append into container
    levelContainer.append(btnDiv);
  }
};
loadLessons();
