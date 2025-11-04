// 보그 메인 페이지 데이터 바인딩 JS - main_data_binding.js

// 제이슨 가져오기
// (1) 배너정보 제이슨
import bannerData from "../data/banner_data.json" with { type: "json" };

// (2) 보그사이트정보 제이슨
import siteData from "../data/vogue_korea_data.json" with { type: "json" };

console.log("제이슨확인:", siteData);

// [1] 배너파트 데이터 바인딩하기 //////////
// 대상: .hero-slider .swiper-wrapper
document.querySelector(".hero-slider .swiper-wrapper").innerHTML = bannerData
  .map(
    (v) =>
      `
    <div class="swiper-slide">
        <img
        class="hero-image"
        src="./images/main_banner/banner_0${v.idx}.jpg"
        alt="Hero"
        />
        <div class="hero-text">
        <p>${v.category} | ${v.date}</p>
        <h1>${v.title}</h1>
        </div>
    </div>
`
  )
  .join("");

  // [2] TODAY'S STORIES 파트 데이터 바인딩하기 //////////
const todaysStories = siteData.sections.todaysStories;

// 대상: .todays-stories .stories-grid
document.querySelector(".todays-stories .stories-grid").innerHTML = `
  <!-- 메인 스토리 (좌측 큰 카드) -->
  <article class="main-story">
    <img
      class="main-story-image"
      src="${todaysStories.mainHighlight.image}"
      alt="${todaysStories.mainHighlight.title}"
    />
    <div class="main-story-overlay">
      <div class="main-story-meta">
        <span class="main-story-category">${todaysStories.mainHighlight.category}</span>
        <span class="main-story-date">${todaysStories.mainHighlight.date}</span>
      </div>
      <h3 class="main-story-title">
        ${todaysStories.mainHighlight.title}
      </h3>
    </div>
  </article>

  ${todaysStories.articles
    .map(
      (article) => `
  <!-- 서브 스토리 -->
  <article class="sub-story">
    <div class="sub-story-image-wrapper">
      <img
        class="sub-story-image"
        src="${article.image}"
        alt="${article.title}"
      />
    </div>
    <div class="sub-story-content">
      <div class="sub-story-category">${article.category}</div>
      <h3 class="sub-story-title">${article.title}</h3>
      <div class="sub-story-meta">
        <span class="date">${article.date}</span>
        <span class="divider">|</span>
        <span class="author">by ${article.author}</span>
      </div>
    </div>
  </article>
  `
    )
    .join("")}
`;


// [3] BEST STORIES 파트 데이터 바인딩하기 //////////
const bestStories = siteData.sections.bestStories;

// 대상: .best-stories-slider .swiper-wrapper
document.querySelector(".best-stories-slider .swiper-wrapper").innerHTML = 
  bestStories.articles
    .map(
      (article) => `
  <div class="swiper-slide">
    <article class="card">
      <div class="card-image">
        <div class="placeholder-img">
          <img
            src="${article.image}"
            alt="${article.title}"
          />
        </div>
      </div>
      <div class="card-content">
        <p class="category">${article.category}</p>
        <h3 class="s_tit">${article.title}</h3>
        <p class="date">${article.date}<span>by ${article.author}</span></p>
      </div>
    </article>
  </div>
  `
    )
    .join("");